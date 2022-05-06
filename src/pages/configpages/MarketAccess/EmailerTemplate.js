import React,{useEffect, useState, useRef} from "react"
import * as echarts from 'echarts';
import { Button,Table } from "antd";

import USAJSON from "./USA.json";
import regeneronService from "../../../services/regeneronService";

import r from "./../../../assets/Regeneron/Regeneron-R.png"
import e from "./../../../assets/Regeneron/Regeneron-E.png"
import g from "./../../../assets/Regeneron/Regeneron-G.png"
import n from "./../../../assets/Regeneron/Regeneron-N.png"
import o from "./../../../assets/Regeneron/Regeneron-O.png"
import './assests/emailerCSS.css'

let EmailerTemplate=(props)=>{
    const {handleCancel,selectedHCP,getNameFrCode} = props;

    console.log('pop12',selectedHCP);
    let [emailInfo,setEmailInfo]=useState({
        fieldteams:'Eylea Medical Specialists, Reimbursement Managers' ,
        brand:'EYLEA',
        healthplan:selectedHCP.filter?selectedHCP.filter.plan_name:'',
        effectivedate:'1st April 2020',
        effectedgeo: selectedHCP.selStates? selectedHCP.selStates.map(s=>getNameFrCode(s)):[
            'NEW YORK',
            'NEW JERSEY',
            'CONNECTICUT'
        ],
        planbackground:"The purpose of this message is to inform you that Aetna National Health Plans has conducted a className review of the anti-VEGF class for its commercially insured lives. As a result, Aetna has revised its Clinical Policy Bulletin to reflect coverage updates for select products. These updates apply to Aetna's commercially insured patients only, and are effective as of April 1, 2020.",
        updatedplans:[
            "Aetna is continuing to cover EYLEA (aflibercept) Injection for its commercially insured patients. EYLEA is designated as an anti-VEGF least-cost, medically necessary brand for all FDA-approved indications, as well as Avastin® (bevacizumab) and its biosimilars (Mvasi and Zirabev) Diabetic retinopathy Diabetic macular edema Macular edema following retinal vein occlusion (including central retinal vein occlusion (CRVO) and brand retinal vein occlusion (BRVO)) Neovascular (wet) AMD",
            "Aetna considers Brolucizumab-dbll intravitreal injection (Beovu) medically necessary for the treatment of neovascular (wet) age-related macular degeneration.",
            "Aetna considers Lucentis to be medically necessary for all FDA approved indications only if a patient has a contraindication, intolerance, or ineffective response to all least-costly anti-VEGF brands, including EYLEA, Avastin and2 biosimilars for Avastin",
        ],
        totalHCPs: selectedHCP.sumImpactedHcp?selectedHCP.sumImpactedHcp:200,
        nextsteps:"These tools will allow you to better understand the particular access dynamics at both the territory and HCP-level. Continue to leverage these and all other resources as appropriate to pre-call plan and collaborate with your RBM. Consistently leveraging these resources will help to reinforce EYLEA reimbursement confidence and to drive earlier initiation of EYLEA for appropriate patients."
    })
    const [top5HCP, setTop5HCP] = useState([]);

    let [mapState, setMapState] = useState([]);


    let impactedHCPCols=[
        { 
            title:'SN',
            dataIndex:'serialnumber',
            key:'serialnumber' ,
            width: '5%',
            render(text, record) {
                return {
                props: {
                    style: { fontWeight:"bold" }
                },
                children: <div>{text}</div>
                };
            },
        },
        { title:'Name',
          dataIndex:'HCP',
          key:'HCP' ,
          width: '80%',
          render(text, record) {
            return {
              props: {
                style: { fontWeight:"bold" }
              },
              children: <div>{text}</div>
            };
          },

        },

        { title:'Level',
          dataIndex:'level_of_impact',
          key:'level_of_impact' ,
          width: '15%',

          render(text, record) {
            return {
              props: {
                style: { color: (text) =="HIGH" ? "purple" : "orange",
                fontWeight:"bold" } 
    
              },
              children: <div>{text}</div>
            };
        },

        },

    ]

    //color selected state
    const updateMap = (selStates) =>{
        //console.log('updateMap',selStates);
        const colorStates = selStates.map(code=>{
            return {name:getNameFrCode(code),value:1}
        });
        let states = [{"name": "Alabama", "value": 0}, {"name": "Alaska", "value": 0}, {"name": "Arizona", "value": 0}, {"name": "Arkansas", "value": 0}, {"name": "California", "value": 0}, {"name": "Colorado", "value": 0}, {"name": "Connecticut", "value": 0}, {"name": "Delaware", "value": 0}, {"name": "District of Columbia", "value": 0}, {"name": "Florida", "value": 0}, {"name": "Georgia", "value": 0}, {"name": "Hawaii", "value": 0}, {"name": "Idaho", "value": 0}, {"name": "Illinois", "value": 0}, {"name": "Indiana", "value": 0}, {"name": "Iowa", "value": 0}, {"name": "Kansas", "value": 0}, {"name": "Kentucky", "value": 0}, {"name": "Louisiana", "value": 0}, {"name": "Maine", "value": 0}, {"name": "Maryland", "value": 0}, {"name": "Massachusetts", "value": 0}, {"name": "Michigan", "value": 0}, {"name": "Minnesota", "value": 0}, {"name": "Mississippi", "value": 0}, {"name": "Missouri", "value": 0}, {"name": "Montana", "value": 0}, {"name": "Nebraska", "value": 0}, {"name": "Nevada", "value": 0}, {"name": "New Hampshire", "value": 0}, {"name": "New Jersey", "value": 0}, {"name": "New Mexico", "value": 0}, {"name": "New York", "value": 0}, {"name": "North Carolina", "value": 0}, {"name": "North Dakota", "value": 0}, {"name": "Ohio", "value": 0}, {"name": "Oklahoma", "value": 0}, {"name": "Oregon", "value": 0}, {"name": "Pennsylvania", "value": 0}, {"name": "Rhode Island", "value": 0}, {"name": "South Carolina", "value": 0}, {"name": "South Dakota", "value": 0}, {"name": "Tennessee", "value": 0}, {"name": "Texas", "value": 0}, {"name": "Utah", "value": 0}, {"name": "Vermont", "value": 0}, {"name": "Virginia", "value": 0}, {"name": "Washington", "value": 0}, {"name": "West Virginia", "value": 0}, {"name": "Wisconsin", "value": 0}, {"name": "Wyoming", "value": 0}, {"name": "Puerto Rico", "value": 0}];
        //console.log('selected states 12-',[...states,...colorStates]);
        setMapState([...states,...colorStates]);
    }

    //get top 5 HCP
    const getTopHCP = (parameter)=>{
        regeneronService.maTop5HCP(parameter).then(({data})=>{
            //console.log('maImpactedSaleTeam121',data);
            if(data.body){
                data.body.forEach((v,i)=>{
                    v.key=i;
                });
                const top5HCP = data.body;
                setTop5HCP(top5HCP);
            }
        });
    }

    useEffect(()=>{
        //console.log('hello e',props);
        //update map
        updateMap(props.selectedHCP.selStates)
        // top 5 HCP
        getTopHCP({...props.selectedHCP.filter,state:props.selectedHCP.selStates});
        setEmailInfo({...emailInfo,
            healthplan:selectedHCP.filter?selectedHCP.filter.plan_name:'',
            effectivedate:'1st April 2020',
            effectedgeo: selectedHCP.selStates? selectedHCP.selStates.map(s=>getNameFrCode(s)):[],
            totalHCPs: selectedHCP.sumImpactedHcp?selectedHCP.sumImpactedHcp:'',
        });
        // eslint-disable-next-line
    }, [selectedHCP, selectedHCP.selStates, selectedHCP.filter, selectedHCP.sumImpactedHcp]);

    return(
        <div className="container fontModal">
            <div className="row pdrow pt-0 pb-0">
                <div className="col-12"  >  
                    <span>
                        <Button style={{borderRadius:"15px",margin:"2px",background:"rgba(6, 91, 170,0.2)",fontSize:"12px"}} >
                        Pedro Lopez &nbsp;<i className="fas fa-times"></i>
                        </Button>
                    </span>
                    <span>
                        <Button style={{borderRadius:"15px",margin:"5px",background:"rgba(6, 91, 170,0.2)",fontSize:"12px"}} >
                            Daniel Canago &nbsp;<i className="fas fa-times"></i>
                        </Button>
                    </span>
                    <span>
                        <Button style={{borderRadius:"15px",margin:"5px",background:"rgba(6, 91, 170,0.2)",fontSize:"12px"}} >
                        Samuel Little &nbsp;<i className="fas fa-times"></i>
                        </Button>
                    </span>
                </div>
            </div>

            <div className="row pdrow">
                <div className="col-12" style={{fontSize:"24px",margin:"2px", fontWeight: "bold"}}>               
                    Preview
                </div>
            </div>

            <div style={{border:'2px solid rgba(6, 91, 170, 0.4)', borderRadius:'10px'}}>

                <div className="row pdrow">
                    <div className="col-6" style={{color: "#065BAA"}}>
                        Internal Etna Commercial plan
                    </div>
                    
                    <div className="col-6 d-flex justify-content-end" >
                        <img className="photo" src={r} />
                        <img className="photo" src={e} />
                        <img className="photo" src={g} />
                        <img className="photo" src={e} />
                        <img className="photo" src={n} />
                        <img className="photo" src={e} />
                        <img className="photo" src={r} />
                        <img className="photo" src={o} />
                        <img className="photo" src={n} />
                    </div>              
                </div>

                <div className="row pdrow">
                    <div className="col-12">
                        <div className="rectangle72">
                        
                            <div className="row pdrow"  style={{fontStyle: "italic"}}>
                                <div className="col  pt-0 pb-0" style={{fontSize: "15px",fontWeight:'bold'}}>FIELD TEAMS</div>
                                <div className="boxes col-auto">ACCESS</div>
                            </div>

                            <div className="row pdrow">
                                <div className="col-12">
                                <div className="blueColored  pt-0 pb-0"  style={{fontSize: "20px"}}>{emailInfo.fieldteams}</div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
        
                <div className="row pdrow">
                    <div className="col-12">
                        <div className="rectangle70">
                            <div className="row pdrow">
                        
                                <div className="col-4">
                                    <div className="row pdrow pt-0 pb-0" style={{fontStyle: "italic",fontWeight:'bold'}}>
                                        BRAND
                                    </div>
                                    <div className="row pdrow blueColored  pt-0 pb-0" style={{fontSize: "20px"}}>
                                    {emailInfo.brand}
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="row pdrow  pt-0 pb-0" style={{fontStyle: "italic",fontWeight:'bold'}}>
                                        HEALTH PLAN
                                    </div>     
                                    <div className="row pdrow blueColored  pt-0 pb-0 " style={{fontSize: "20px"}}>
                                        {emailInfo.healthplan}
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="row pdrow  pt-0 pb-0">
                                        <div style={{fontStyle: "italic",fontWeight:'bold'}}>EFFECTIVE DATE</div>
                                    </div>

                                    <div className="row pdrow  pt-0 pb-0">
                                        <div style={{fontSize: "20px"}} className="blueColored">
                                            {emailInfo.effectivedate}
                                        </div>
                                    </div>  
                                </div>
                            </div>
            
                            <div className="row pdrow">            
                                <div className="row pdrow " style={{fontStyle: "italic",fontWeight:'bold'}}>
                                    <div className="col-12">EFFECTED GEOGRAPHIES</div>
                                </div>
                                <div className="col-12">
                                    <div className="row pdrow">
                                        <div className="col-6 blueColored">
                                            <ul style={{listStyleType:"none"}}>
                                        
                                                {
                                                    emailInfo.effectedgeo.map(region=>(
                                                        <li key={region}>{region}</li>
                                                    ))
                                                }
                    
                                            </ul>            
                                        </div>
        
                                        <div className="col-4  pt-0 pb-0">
                                        
                                            <StatesMapChart height={150} mapState={mapState}/>
                                        
                                        </div>
                                    </div>
                                </div>       
                            </div>                
                        </div>
                    </div>
                </div>
        
                <div className="row pdrow" style={{marginTop:"20px"}}>
                    <div className="col-12">
                        <div className="rectangle90">

                            <div className="row pdrow">
                                <div className="col-12">
                                    <div className="headings">PLAN BACKGROUND</div>
                                    <div>
                                    {emailInfo.planbackground}
                                    </div>
                                </div>
                            </div>

                            <div className="row pdrow">
                                
                                <div className="col-12">
                                    <div className="headings" >PLAN UPDATE</div>
                                    <ul>          
                                        {
                                            emailInfo.updatedplans.map(plan=>{
                                            return <li key={plan}>{plan}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pdrow">
                    <div className="col-12">
                        <div className="rectangle73">

                            <div className="row pdrow m-0 p-0">
                                <div className="boxes col-3" style={{textAlign:'left'}}>IMPACTED HCPS</div>
                            </div>

                            <div className="row pdrow">
                                <div className="col-6">
                                    
                                    <div className="row">
                                        <div className="col-12">
                                        <div className="headings">TOP 5 IMPACTED HCPS</div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">

                                        <div className="col-6">
                    
                                        <Table 
                                            columns={impactedHCPCols} 
                                            dataSource={top5HCP} 
                                            bordered={false}
                                            showHeader={false}
                                            pagination={false} 
                                            size={"small"}
                                    
                                        />

                                        </div>
                                    </div>
                                </div>
                            
                                <div className="col-6">
                                    <div className="row pdrow">
                                        <div className="headings col-12">
                                        TOTAL IMPACTED HCP IN YOUR TERRITORY
                                        </div>
                                    </div>

                                    <div className="row pdrow" style={{fontSize: "36px", fontFamily: "Roboto Condensed" }}>
                                        <span className="blueColored col-12"><strong> {emailInfo.totalHCPs} </strong></span>
                                    </div>
                                    
                                    <div className="row pdrow" style={{textAlign: "center"}}>
                                        <div className="col-9">
                                        <div className="row">
                                        <div className="col-10 pr-0">
                                                <Button className="cancelbuttonhcp w-100" onClick={()=>handleCancel()} style={{borderRight:'0px'}}>
                                                    Click here for HCP Target List &nbsp;&nbsp; 
                                                </Button>
                                        </div>

                                        <div className="col-2"  style={{padding:'0px',flex:'0 0 0',background:'#065BAA'}}>
                                            <Button className="cancelbuttonhcp" onClick={()=>handleCancel()} style={{padding:'0px', borderLeft:'0px'}}>
                                            <i className="fas fa-arrow-right fa-lg" style={{background:'#065BAA', color:'white',size:'100px',backgroundSize:'cover'}}></i>
                                            </Button>
                                        </div>

                                        </div>

                                                
                                        </div>
                                    </div>
                                </div>            
                            </div>
                        </div>      
                    </div>
                </div>  
                
                <div className="row pdrow">
                    <div className="col-12">
                        <div className="rectangle93">

                            <div className="row pdrow m-0 p-0">
                                <div className="boxes col-3"  style={{textAlign: 'left'}}>REQUIRED NEXT STEPS</div>
                            </div>

                            <div className="row pdrow">
                                <div className="col-12">
                            {emailInfo.nextsteps}  
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatesMapChart(props){
    let chartRef=useRef();

    useEffect(()=>{
        console.log('StatesMapChart',props)
        // eslint-disable-next-line
    }, [props.mapState]);
    
    const initChart=()=>{
        var chartDom = chartRef.current;
        var myChart = echarts.init(chartDom);
        var option;

        var usaJson=USAJSON;
        myChart.showLoading();
        myChart.hideLoading();
        echarts.registerMap('USA', usaJson, {
            Alaska: {
            left: -131,
            top: 25,
            width: 15
            },
            Hawaii: {
            left: -110,
            top: 28,
            width: 5
            },
            'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2
            }
        });
        option = {
            tooltip: {
            trigger: 'none',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                const value = (params.value + '').split('.');
                const valueStr = value[0].replace(
                /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                '$1,'
                );
                return params.seriesName + '<br/>' + params.name + ': ' + valueStr;
            }
            },
            visualMap: {
                show:false,
                left: 'right',
                min: 0,
                max: 1,
                inRange: {
                    color: ['#ffffff','#518CC4']
                },
                //text: ['High', 'Low'],
                calculable: true
            },
            toolbox: {
            show: false,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
            },
            series: [
            {
                name: 'Region',
                type: 'map',
                zoom: 1.25,
                roam: true,
                map: 'USA',
                silent: true,//remove background onhover
                emphasis: {
                label: {
                    show: true
                }
                },
                itemStyle:{areaColor:"#fff"},
                data: props.mapState?props.mapState:[]
            }
            ]
        };
        myChart.setOption(option);

        option && myChart.setOption(option);
    }

    useEffect(()=>{
        initChart();
    })

    return (
        <div className="">
            <div ref={chartRef} style={{height:props.height}}></div>
        </div>
    );
}
export default EmailerTemplate;