// import { LeftCircleTwoTone } from "@ant-design/icons";
import React, {useState, useEffect, useRef} from "react";

//import CustomTable from "../../../utilities/CustomTable/Table";
//import {Card} from 'antd';
//import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {Modal, Button, Table, Tooltip, Input, Select,InputNumber} from "antd";

import regeneronService from "../../../services/regeneronService";
import Loader from "../../../utilities/Loader";
import FilterList from "./FilterList";
import USAJSON from "./USA.json";
import EmailerTemplate from "./EmailerTemplate";
import multipleUser from "../../../assets/Regeneron/multipleUser.png";
import filterImg from "../../../assets/Regeneron/filter.svg";
import './assests/regeneron.css';

let $=window.$;
let wh=$(window).height();

const PreEventAnalysis = () => {
    const [heights, setHeights]=useState({
		chartHeight:200,
	});
    let locale = {
        emptyText: (
          <span>
            <p><img alt="" src={multipleUser} /></p>
            <b style={{color:"#000"}}>Please select 1 Sales Teams & Impacted Plan for HCP list</b>
          </span>
        )
    };
    const [rowsSalesTeam, setRowsSalesTeam]=useState([]);
    const [allRowsSalesTeam, setAllRowsSalesTeam]=useState([]);
    const [isStFilterVisible, setStFilterVisible]=useState(false);
    const [stRules, setStRules]=useState([{}]);

    const [rowsHcp, setRowsHcp]=useState([]);
    const [rowsPlanChange, setRowsPlanChange]=useState([]);
    const [changeFrTo, setRowsChangeFrTo]=useState(false);
    const [mapState, setMapState] = useState([]);
    const filter = useRef();
    const [isEmailerModalVisible, setIsEmailerModalVisible]= useState(false)
    const [selectedHCP, setSelectedHCP] = useState({count:0,locale:locale});
    const [selectedRowST, setSelectedRowST] = useState([]);

    const showEmailerModal=()=>{
        //console.log('selectedHCP121',selectedHCP);
        if(selectedHCP.count>0){
            setIsEmailerModalVisible(true);
        }
        return false;
    }

    const handleOk = () => {
        setIsEmailerModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsEmailerModalVisible(false);
    };

    const rowSelection={
        selectedRowKeys:selectedRowST,
        onChange:(selectedRowKeys, selectedRows)=>{
            setSelectedRowST(selectedRowKeys);
            let selSaleTeam = {};
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows, selectedRows.length);
            if(selectedRows.length===0){
                setRowsHcp([]);
                setSelectedHCP({count:0,locale:locale});
                return false;
            }
            
            if(selectedRows.length===1){
                //Impacted HCP api call
                const arg = {...filter.current,state:selectedRows[0].state};
                //console.log('222211',arg,filter);
                if("plan_name" in arg && arg.plan_name!==undefined){
                    getImpactedHCP(arg);
                }
            } 
            let selStates = selectedRows.map(s=>s.state).filter((v, i, a) => a.indexOf(v) === i);
            let sumImpactedHcp = sum(selectedRows.map(s=>s['HCPs_impacted)']));

            selSaleTeam = {
                count:selectedRows.length,
                selectedRows:selectedRows,
                filter:filter.current,
                selStates:selStates,
                sumImpactedHcp:sumImpactedHcp
            }
            
            if(selectedRows.length>1){
                setRowsHcp([])
                locale = {
                    emptyText: (
                      <span>
                        <p><img alt="" src={multipleUser} /></p>
                        <b style={{color:"#000"}}>{selectedRows.length} Sales Teams Selected</b>
                        <p>Select only 1 Sales rep. for HCP list</p>
                      </span>
                    )
                };
                //selected states
            }
            selSaleTeam = {...selSaleTeam,locale:locale};
            setSelectedHCP(selSaleTeam);
        },
        getCheckboxProps:(record)=>({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    //
    const sum = (array)=>{
        return array.reduce((a, b) => a + b, 0);
    }

    let tableHeaderPlanChange=[
        {
            dataIndex: "plan_name",
            title: "Plan Name",
            sorter: (a, b) => a.plan_name.localeCompare(b.plan_name),
            ellipsis: true,
        },
        {
            dataIndex: "state",
            title: "Region",
            width:100
        },
        {
            dataIndex: "type_of_impact",
            title: "Type of Impact",
            width:130
        }
    ];

    let tableHeaderSalesTeam=[
        {
            title: "Rep Name",
            dataIndex: "selling_team_name",
            //width:"30%"
        },
        {
            title: "Region",
            dataIndex: "state",
        },
        {
            title:"% High Impact HCP",
            dataIndex:"Percent_High_HCP_Impacted",
            align:"right",
            render:(text)=>{
                return parseFloat(text).toFixed(1);
            }
        },
        {
            title:"% High Tenure HCP",
            dataIndex:"Percent_High_Tenure_Impacted",
            align:"right",
            render:(text)=>{
                return parseFloat(text).toFixed(1);
            }
        },
        {
            title: "HCP Impacted",
            dataIndex: "HCPs_impacted)",
            align:"right",
        },
        {
            title: "Patients Impacted",
            dataIndex: "Patients_impacted)",
            align:"right",
        }
    ];

    let tableHeaderHcp=[
        {
            dataIndex: "HCP",
            title: "HCP",
        },
        {
            dataIndex: "planname",
            title: "Plan Name",
            //sorter: (a, b) => a.plan_name.localeCompare(b.plan_name),
            ellipsis: true,
            width:120
        },
        {
            dataIndex: "level_of_impact",
            title: "Impact Level",
        },
        {
            dataIndex: "state",
            title: "Region",
        },
        {
            dataIndex: "zip",
            title: "Zip Code",
        },
        {
            dataIndex: "patients_impacted",
            title: "Patients Impacted",
            align:'right'
        },
        {
            dataIndex:"YoY_Rx_Growth_21",
            title:"Growth in Rx(Y-O-Y)",
            align:'right',
            render:(text,row,index)=>{
                return `${text} (${row.YoY_Rx_Growth_Percentage}%)`;
            }
        },
        {
            dataIndex:"YoY_Revenue_Growth_21",
            title:"Growth in Revenue(k$)",
            align:'right'
        }
    ];
    
    let wh=$(window).height();
    let ch=wh-79;
    let t1h=200;
    let t2h=200;
    let t3h=195;

    // on change state field
    const OnChangeState =  (val) =>{
        setRowsHcp([]);
        if(val.plan_name===""){
            delete val.plan_name;
        }
        if(val){
            //Impacted Sale Team api call
            getImpactedSaleTeam(val);
            //Plan Change Type api call
            getPlanChange(val)
        }
        //update map
        updateMap(val.state);
    }

    // on change sale team field
    const OnChangeSaleTeam =  (val) =>{
        setRowsHcp([]);
        if(val.plan_name===""){
            delete val.plan_name;
        }
        if(val){
            //Impacted Sale Team api call
            getImpactedSaleTeam(val);
        }
    }

    // on change Impacted Plan
    const OnChangeImpactedPlan=(val)=>{
        //console.log('32val',val);
        filter.current = val;
        setRowsHcp([]);
        setRowsChangeFrTo([]);
        if(val){
            //Impacted Sale Team api call
            getImpactedSaleTeam(val);
            //Impacted HCP api call
            //getImpactedHCP(val);
            //Plan Change Type api call
            getPlanChange(val)
            //Change From To table data
            getChangeFrTo(val)
        }
    }

    //on change change dropdown
    const OnChangeChange = (val)=>{
        setRowsChangeFrTo([]);
        if(val){
            //Plan Change Type api call
            getPlanChange(val)
        }
    }

    //get Impacted Sale Team table data
    const getImpactedSaleTeam = (parameter)=>{
        setSelectedRowST([]);
        setSelectedHCP({count:0,locale:locale});
        setRowsSalesTeam(null);
        regeneronService.maImpactedSaleTeam(parameter).then(({data})=>{
            //console.log('maImpactedSaleTeam121',data);
            if(data.body){
                data.body.forEach((v,i)=>{
                    v.key=i;
                });
                setRowsSalesTeam([...data.body]);
                setAllRowsSalesTeam([...data.body]);
            }
        });
    }

    //get Impacted HCP table data
    const getImpactedHCP = (parameter)=>{
        if(parameter.plan_ref_id===""){
            delete parameter.plan_ref_id;
        }
        setRowsHcp(null);
        regeneronService.maImpactedHcp(parameter).then(({data})=>{
            //console.log('maImpactedHcp121',data);
            if(data.body){
                data.body.forEach((v,i)=>{
                    v.key=i;
                });
                setRowsHcp(data.body)
            }
        });
    }

    //get Impacted Plan Change table data
    const getPlanChange = (parameter)=>{
        setRowsPlanChange(null);
        regeneronService.maPlanChange(parameter).then(({data})=>{
            //console.log('maPlanChange121',data);
            if(data.body){
                data.body.forEach((v,i)=>{
                    v.key=i;
                });
                setRowsPlanChange(data.body);
                const states = data.body.map(s=>{return s.state});
                //console.log('states121',states);
                //update map
                updateMap(states);
            }
        });
    }

    //get Impacted Plan Change table data
    const getChangeFrTo = (parameter)=>{
        setRowsChangeFrTo(null);
        try {
            regeneronService.maChangeFrTo(parameter).then(({data})=>{
                //console.log('maChangeFrTo121',data);
                if(data.body){
                    data.body.forEach((v,i)=>{
                        v.key=i;
                    });
                    setRowsChangeFrTo(data.body)
                }
                
            });
        } catch (error) {
            console.log('Error getChangeFrTo');
        }
        
    }

    //color selected state
    const updateMap = (selStates) =>{
        const colorStates = selStates.map(code=>{
            return {name:getNameFrCode(code),value:1}
        });
        let states = [{"name": "Alabama", "value": 0}, {"name": "Alaska", "value": 0}, {"name": "Arizona", "value": 0}, {"name": "Arkansas", "value": 0}, {"name": "California", "value": 0}, {"name": "Colorado", "value": 0}, {"name": "Connecticut", "value": 0}, {"name": "Delaware", "value": 0}, {"name": "District of Columbia", "value": 0}, {"name": "Florida", "value": 0}, {"name": "Georgia", "value": 0}, {"name": "Hawaii", "value": 0}, {"name": "Idaho", "value": 0}, {"name": "Illinois", "value": 0}, {"name": "Indiana", "value": 0}, {"name": "Iowa", "value": 0}, {"name": "Kansas", "value": 0}, {"name": "Kentucky", "value": 0}, {"name": "Louisiana", "value": 0}, {"name": "Maine", "value": 0}, {"name": "Maryland", "value": 0}, {"name": "Massachusetts", "value": 0}, {"name": "Michigan", "value": 0}, {"name": "Minnesota", "value": 0}, {"name": "Mississippi", "value": 0}, {"name": "Missouri", "value": 0}, {"name": "Montana", "value": 0}, {"name": "Nebraska", "value": 0}, {"name": "Nevada", "value": 0}, {"name": "New Hampshire", "value": 0}, {"name": "New Jersey", "value": 0}, {"name": "New Mexico", "value": 0}, {"name": "New York", "value": 0}, {"name": "North Carolina", "value": 0}, {"name": "North Dakota", "value": 0}, {"name": "Ohio", "value": 0}, {"name": "Oklahoma", "value": 0}, {"name": "Oregon", "value": 0}, {"name": "Pennsylvania", "value": 0}, {"name": "Rhode Island", "value": 0}, {"name": "South Carolina", "value": 0}, {"name": "South Dakota", "value": 0}, {"name": "Tennessee", "value": 0}, {"name": "Texas", "value": 0}, {"name": "Utah", "value": 0}, {"name": "Vermont", "value": 0}, {"name": "Virginia", "value": 0}, {"name": "Washington", "value": 0}, {"name": "West Virginia", "value": 0}, {"name": "Wisconsin", "value": 0}, {"name": "Wyoming", "value": 0}, {"name": "Puerto Rico", "value": 0}];
        //console.log('selected states 12-',[...states,...colorStates]);
        setMapState([...states,...colorStates]);
    }

    const getNameFrCode = (code)=>{
        const statesCode = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MH": "Marshall Islands",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        }
        return statesCode[code];
    }

    //get map data
    // const getMapData = ()=>{
    //     regeneronService.maMapState().then(({data})=>{
    //         //console.log('maPlanChange121',data);
    //         setMapData(data.body)
    //     });
    // }

    useEffect(()=>{
        getPlanChange()
        getImpactedSaleTeam();
        // eslint-disable-next-line
    }, []);

    const Planchanges=(props)=>{
        //console.log(props.changeFrTo, 'sssss')
        let data= props.changeFrTo?props.changeFrTo:[];
        const [firstOnly, setFirstOnly]=useState(props.firstOnly)
        const [records, setRecords]=useState([]);

        const toggleSeeAll=()=>{
            setFirstOnly(firstOnly===true?false:true);
        }

        useEffect(()=>{
            if(firstOnly===true){
                setRecords([data[0]]);
            }else{
                setRecords([...data]);
            }
        }, [firstOnly])

        return(
            <>
                {typeof records[0]!== "undefined" &&
                <div>
                    {!firstOnly &&
                        <div style={{height:'42px'}}>&nbsp;</div>
                    }
                    <div className={"border radius6 pt5 pb5 pl10 pr10 "+(!firstOnly?'bg-white shadow position-absolute w-100':'')} style={!firstOnly?{zIndex:'1000', top:'0', left:'0'}:{}}>
                        {records.map((v,i)=>(
                            <div key={i} className="d-flex justify-content-between pt3 pb3">
                                <div className="my-auto wper15">{v.type_of_change}</div>
                                <div className="my-auto wper30">
                                    <div className="ellipsis w-100">
                                        <Tooltip placement="bottomLeft" title={<div style={{height:"100px",overflow:"auto"}}>{v.From}</div>}>{v.From}</Tooltip>
                                    </div>
                                </div>
                                <div className="my-auto wper5 text-center">
                                    {/* <i className="fa fa-caret-right"></i> */}
                                    <i className="fas fa-greater-than"></i>
                                </div>
                                <div className="my-auto wper30">
                                    <div className="ellipsis w-100">
                                        <Tooltip placement="bottomLeft" title={<div style={{height:"100px",overflow:"auto"}}>{v.To}</div>}>{v.To}</Tooltip>
                                    </div>
                                </div>
                                <div className="my-auto wper10 text-right">Effective: {v.Period}</div>
                                
                                <div className="my-auto wper10 text-right">
                                    {i===0 &&
                                        <Button type="default" size="small" shape="round" onClick={toggleSeeAll}>{data.length===1?"1 Event":`${data.length} Events`}</Button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </>
        )
    }

    return (
        <div className="pt15 pb15 pl25 pr25 bold400 antd-tbl-white-th overflow-auto" style={{height:ch/* , background:'#f7f7f7' */}}>
            <h3 style={{color:"rgb(14, 75, 113)"}}>Pre Event Analysis</h3>

            <FilterList OnChangeImpactedPlan={OnChangeImpactedPlan} OnChangeState={OnChangeState} OnChangeSaleTeam={OnChangeSaleTeam} OnChangeChange={OnChangeChange}/>

            <div className="pt10 w-100">
                <div className="position-relative">
                    <Planchanges firstOnly={true} changeFrTo={changeFrTo} />
                </div>
            </div>

            
            <div className="row mt-4">
                <div className="col-md-4">
                    <div>
                        <StatesMapChart height={300} mapState={mapState}/>
                    </div>

                    <div className="pt15">
                        <div className="fs18 bold500 mb5">Plan Change Type of Impact</div>
                        <div className="border radius6 pt2">
                            {/* {rowsPlanChange===null?(
                                <Loader style={{ marginLeft: "50%" }} type="ThreeDots"/>
                            ):null} */}

                            <Table 
                                columns={tableHeaderPlanChange} 
                                dataSource={rowsPlanChange} 
                                pagination={false} 
                                bordered={false}
                                scroll={{y:t1h}}
                                size="small"
                                loading={rowsPlanChange===null?{indicator:<Loader style={{marginTop:"12%"}} type="ThreeDots"/>}:false}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-8 pt10 radius6" style={{background:'#F4F5F7'}}>
                    <div className="mb5 d-flex">
                        <div className="fs18 bold500 my-auto">
                            <div className="d-flex">
                                <div className="my-auto">
                                    Impacted Sales Team
                                </div>
                                <div className="my-auto pl5">
                                    <div 
                                        className={isStFilterVisible===true?"cpointer w30 text-center border bg-light":"cpointer w30 text-center"}
                                        style={{borderRadius:'50%'}}
                                        onClick={()=>{
                                            setStFilterVisible(!isStFilterVisible);
                                        }}
                                    >
                                        {/* <i className="fa fa-filter fs13"></i> */}
                                        <img src={filterImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="my-auto ml-auto">
                            <Button className="radius6" type="primary" style={{background:'#065baa'}} onClick={showEmailerModal}>Trigger Email {selectedHCP.count>0?`(${selectedHCP.count})`:''}</Button>
                            <Modal 
                                title={                
                                    <div className="wper100">
                                        <div className="col-12" style={{fontSize:"24px",margin:"2px", fontWeight: "bold",paddingLeft:'35px'}}>Send To</div>
                                    </div>                                        
                                }
                                visible={isEmailerModalVisible}
                                onOk={handleOk} 
                                onCancel={handleCancel}
                                centered="true"
                                closable={false}
                                okText="Send"
                                width="70vw"
                                footer={
                                    <div className="d-flex justify-content-center">
                                        <Button onClick={handleCancel} className="mr5 radius6">
                                        Cancel
                                        </Button>
                                        <Button className="radius6" type="primary" onClick={handleOk} style={{background:'#065baa'}}>
                                        Trigger Email
                                        </Button>
                                    </div>
                                }

                                style={{top:20}}
                                bodyStyle={{height:wh-160}}
                            >
 
                                 <EmailerTemplate selectedHCP={selectedHCP} handleCancel={handleCancel} getNameFrCode={getNameFrCode}/>

                            </Modal>

                                
                        </div>
                    </div>

                    <div className="position-relative">
                        {isStFilterVisible===true &&
                        <div className="border radius6 p15 shadow bg-white w-100" style={{position:'absolute', zIndex:'1', top:'0', left:'0'}}>
                            <TableFilter 
                                columns={tableHeaderSalesTeam} 
                                setVisible={setStFilterVisible} 
                                dataSource={allRowsSalesTeam} 
                                setDataSource={setRowsSalesTeam} 
                                rules={stRules}
                                setRules={setStRules}
                            />
                        </div>}

                        <div className="border radius6 pt2">
                            <Table 
                                columns={tableHeaderSalesTeam} 
                                dataSource={rowsSalesTeam} 
                                pagination={false} 
                                bordered={false}
                                scroll={{y:t2h}}
                                size="small"
                                rowSelection={{type:'checkbox', ...rowSelection}}
                                loading={rowsSalesTeam===null?{indicator:<Loader style={{marginTop:"7%"}} type="ThreeDots"/>}:false}
                            />
                        </div>
                    </div>

                    <div className="pt20">
                        <div className="fs18 bold500 mb5">Impacted HCP List</div>
                        <div className="border radius6 pt2">
                            <Table 
                                locale={selectedHCP.locale} 
                                columns={tableHeaderHcp} 
                                dataSource={rowsHcp} 
                                pagination={false} 
                                bordered={false}
                                scroll={{y:t3h}}
                                size="small"
                                loading={rowsHcp===null?{indicator:<Loader style={{marginTop:"7%"}} type="ThreeDots"/>}:false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatesMapChart(props){
    let chartRef=useRef();
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
                roam: true,
                zoom: 1.45,
                map: 'USA',
                silent: true,//remove background onhover
                emphasis: {
                    label: {
                        show: true
                    }
                },
                itemStyle:{areaColor:"#fff"},
                data: props.mapState?props.mapState:[
                { name: 'Alabama', value: 4822023 },
                { name: 'Alaska', value: 731449 },
                { name: 'Arizona', value: 6553255 },
                { name: 'Arkansas', value: 2949131 },
                { name: 'California', value: 38041430 },
                { name: 'Colorado', value: 5187582 },
                { name: 'Connecticut', value: 3590347 },
                { name: 'Delaware', value: 917092 },
                { name: 'District of Columbia', value: 632323 },
                { name: 'Florida', value: 19317568 },
                { name: 'Georgia', value: 9919945 },
                { name: 'Hawaii', value: 1392313 },
                { name: 'Idaho', value: 1595728 },
                { name: 'Illinois', value: 12875255 },
                { name: 'Indiana', value: 6537334 },
                { name: 'Iowa', value: 3074186 },
                { name: 'Kansas', value: 2885905 },
                { name: 'Kentucky', value: 4380415 },
                { name: 'Louisiana', value: 4601893 },
                { name: 'Maine', value: 1329192 },
                { name: 'Maryland', value: 5884563 },
                { name: 'Massachusetts', value: 6646144 },
                { name: 'Michigan', value: 9883360 },
                { name: 'Minnesota', value: 5379139 },
                { name: 'Mississippi', value: 2984926 },
                { name: 'Missouri', value: 6021988 },
                { name: 'Montana', value: 1005141 },
                { name: 'Nebraska', value: 1855525 },
                { name: 'Nevada', value: 2758931 },
                { name: 'New Hampshire', value: 1320718 },
                { name: 'New Jersey', value: 8864590 },
                { name: 'New Mexico', value: 2085538 },
                { name: 'New York', value: 19570261 },
                { name: 'North Carolina', value: 9752073 },
                { name: 'North Dakota', value: 699628 },
                { name: 'Ohio', value: 11544225 },
                { name: 'Oklahoma', value: 3814820 },
                { name: 'Oregon', value: 3899353 },
                { name: 'Pennsylvania', value: 12763536 },
                { name: 'Rhode Island', value: 1050292 },
                { name: 'South Carolina', value: 4723723 },
                { name: 'South Dakota', value: 833354 },
                { name: 'Tennessee', value: 6456243 },
                { name: 'Texas', value: 26059203 },
                { name: 'Utah', value: 2855287 },
                { name: 'Vermont', value: 626011 },
                { name: 'Virginia', value: 8185867 },
                { name: 'Washington', value: 6897012 },
                { name: 'West Virginia', value: 1855413 },
                { name: 'Wisconsin', value: 5726398 },
                { name: 'Wyoming', value: 576412 },
                { name: 'Puerto Rico', value: 3667084 }
                ]
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

function TableFilter(props){
    const {columns, setVisible, dataSource, setDataSource, rules, setRules}=props;
    const extraColsAdd = columns.filter(fd=>fd.dataIndex!=="state" && fd.dataIndex!=="selling_team_name");
    const [filters, setFilters]=useState([...rules]);
    let operators=[
        {label:'=', value:'='},
        {label:'!=', value:'!='},
        {label:'>', value:'>'},
        {label:'<', value:'<'},
        {label:'>=', value:'>='},
        {label:'<=', value:'<='},
        {label:'contains', value:'Contains'},
        //{label:'between', value:'Between'},
    ];

    const filterRecords=()=>{
        let results=[];
        dataSource.forEach((v)=>{
            let flg=1;
            filters.forEach((r)=>{
                let val=v[r.column]+"";
				let data=r.value+"";
                val=val.toLowerCase();
				data=data.toLowerCase();

                switch (r.operator) {
					case "=":
						if(!(val===data)){
							flg = 0;
						}
					break;
					case "!=":
						if(!(val!==data)){
							flg = 0;
						}
					break;
					case "<":
						if(!(val * 1 < data * 1)){
							flg = 0;
						}
					break;
					case ">":
						if (!(val * 1 > data * 1)) {
							flg = 0;
						}
					break;
					case "<=":
						if (!(val * 1 <= data * 1)) {
							flg = 0;
						}
					break;
					case ">=":
						if (!(val * 1 >= data * 1)) {
							flg = 0;
						}
					break;
					case "contains":
						let sourceData=(val+"");
						let searchData=(data+"").split(",");
						let f=0;
						for(let i=0; i < searchData.length; i++){
							let str=searchData[i].trim();
							if(sourceData.indexOf(str)>=0){
								f=1;
							}
						}

						if(!(f===1)){
							flg=0;
						}
					break;
					// case "between":	
					// 	if (!(val*1 <= endData*1) || !(val*1>=startData*1) || (val+'').length===0){
					// 		flg=0;
					// 	}
					// break;
					default:
				}
            });
            if(flg){
				results.push({ ...v });
			}
        });
        setDataSource(results);
        setRules([...filters]);
        setVisible(false);
    }

    return(
        <div>
            <div className="table-responsive">
                <table className="table table-sm table-borderless">
                    <tbody className="table-text-vmid">
                        {filters.map((v,i)=>(
                            <tr key={i}>
                                <td>
                                    <div className="d-flex">
                                        {i>0 &&
                                        <div className="my-auto pr10">
                                            <div className="pl8 pr8 bg-light">AND</div>
                                        </div>}
                                        <div className="my-auto flex-grow-1">
                                            <div className="antd-lbl-input">
                                                <div className="lbl">Column</div>
                                                <Select 
                                                    className="w-100" 
                                                    showSearch
                                                    allowClear
                                                    bordered={false}
                                                    placeholder="--Select--"
                                                    value={v.column}
                                                    options={extraColsAdd.map(v=>{return {label:v.title, value:v.dataIndex}})}
                                                    onChange={e=>{
                                                        v.column=e;
                                                        setFilters([...filters])
                                                    }}
                                                >
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="w250 pl20 pr20">
                                    <div className="antd-lbl-input">
                                        <div className="lbl">Operator</div>
                                        <Select 
                                            className="w-100" 
                                            showSearch
                                            allowClear
                                            bordered={false}
                                            placeholder="--Select--"
                                            value={v.operator}
                                            options={operators}
                                            onChange={e=>{
                                                v.operator=e;
                                                setFilters([...filters])
                                            }}
                                        >
                                        </Select>
                                    </div>
                                </td>

                                <td className="w300 pr20">
                                    <div className="antd-lbl-input">
                                        <div className="lbl">Value</div>
                                        <InputNumber
                                            allowClear
                                            className={'w-100'}
                                            bordered={false}
                                            value={v.value}
                                            onChange={value=>{
                                                v.value=value;
                                                setFilters([...filters])
                                            }}
                                        />
                                    </div>
                                </td>

                                <td className="w30 text-right">
                                    {i>0 &&
                                        <i className="fa fa-times fa-2x text-primary cpointer" onClick={()=>{
                                            filters.splice(i, 1);
                                            setFilters([...filters]);
                                        }}></i>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex">
                <div className="my-auto">
                    <Button className="radius6" onClick={()=>{filters.push({}); setFilters([...filters])}}  style={{border:'1px solid #043365'}}>
                        <i className="fa fa-plus mr5"></i> Add Filter
                    </Button>
                </div>
                <div className="my-auto ml-auto">
                    <Button className="radius6" type="primary" onClick={filterRecords} style={{background:'#043365'}}>Done</Button>
                </div>
            </div>
        </div>
    );
}

export default PreEventAnalysis;