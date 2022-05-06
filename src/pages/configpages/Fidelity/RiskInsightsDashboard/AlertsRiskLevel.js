import React, {useState, useEffect, useRef} from "react";
import {Chart} from "../../../../utilities/charts/Echarts";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const AlertsRiskLevel=(props)=>{
    let colors=["#A2D2FF", "#BDE0FE", "#CDB4DB", "#FFC8DD", "#FFAFCC"];

    const mountedRef=useRef(true);
    const [isLoading, setLoading]=useState(true);
    const [series, setSeries]=useState([]);

    const setDummyData=()=>{
        let data=[
            {value:25, name:'Very Low'},
            {value:35, name:'Low'},
            {value:5, name:'High'},
            {value:15, name:'Medium'},
            {value:20, name:'Medium Low'},
        ];
        let total=0;
        data.forEach(v=>{
            total+=v.value;
        });
        let srs=[
            {
                name: '',
                type: 'pie',
                radius: ["30%", "70%"],
                label: {
                    formatter:(arg)=>arg.name+'\n\n'+(Math.round(arg.value*100/total)+'% ~ '+arg.value),
                    color:"#000000",
                    fontSize:12,
                    fontWeight:"bold"
                }, 
                data,
            }
        ];

        setSeries(srs);
    }

    useEffect(()=>{
        if (STATICRISK360){     // Set Static Risk360 data
            setLoading(false);
            setDummyData(); return;
        }
        if(mountedRef.current){
            setLoading(true);
        }
        apiServices.summaryAndTrends("risklevel", props.periodType)
        .then((result)=>{
            if(result.data.code===200){
                let data=[
                    {value:0, name:'Very Low'},
                    {value:0, name:'Low'},
                    {value:0, name:'High'},
                    {value:0, name:'Medium'},
                    {value:0, name:'Medium Low'},
                ];
                result.data.response.data.forEach(v=>{
                    v.count_data.forEach(c=>{
                        if(c.risk_level==='Very Low'){
                            data[0].value+=c.criteria_count;
                        }
                        if(c.risk_level==='Low'){
                            data[1].value+=c.criteria_count;
                        }
                        if(c.risk_level==='High'){
                            data[2].value+=c.criteria_count;
                        }
                        if(c.risk_level==='Medium'){
                            data[3].value+=c.criteria_count;
                        }
                        if(c.risk_level==='Medium Low'){
                            data[4].value+=c.criteria_count;
                        }
                    })
                });

                let total=0;
                let finalData=[];
                data.forEach(v=>{
                    total+=v.value;
                    if(v.value>0){
                        finalData.push(v);
                    }
                });

                let srs=[
                    {
                        name: '',
                        type: 'pie',
                        radius: ["30%", "70%"],
                        label: {
                            formatter:(arg)=>arg.name+'\n\n'+(Math.round(arg.value*100/total)+'% ~ '+arg.value),
                            color:"#000000",
                            fontSize:12,
                            fontWeight:"bold"
                        }, 
                        data:finalData,
                    }
                ]

                if(mountedRef.current){
                    setSeries(srs);
                }
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            if(mountedRef.current){
                setLoading(false);
            }
        });

        // eslint-disable-next-line
    }, [props.periodType]);

    useEffect(()=>{
        return ()=>{
            mountedRef.current=false;
        }
        // eslint-disable-next-line
    }, []);
    

    return (
        <div className="whitebx">
            <div className="heading uc text-center fs18">Action Taken by Risk Level</div>
            <div className="content1">
                {isLoading?(
                    <div className="m-auto text-center" style={{height:'200px'}}>
                        <Loader />
                    </div>
                ):(
                    <>
                        {series[0]?.data.length?(
                            <Chart 
                                //title={{text:props.periodType}}
                                width="100%"
                                height="300px"
                                tooltip={{trigger:'item'}}
                                series={series}
                                color={colors}
                                grid={
                                    {left:'10%', right:'10%', top:'10%', bottom:'10%', containLabel:true}
                                }
                            />
                        ):(
                            <div className="text-secondary text-center" style={{height:'300px', paddingTop:'50px'}}>No Data</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default AlertsRiskLevel;
