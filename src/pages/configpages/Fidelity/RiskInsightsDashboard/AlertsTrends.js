import React, {useState, useEffect, useRef} from "react";
import {Chart} from "../../../../utilities/charts/Echarts";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const AlertsRiskLevel=(props)=>{
    const mountedRef=useRef(true);
    const [chartData, setChartData]=useState({series:[], legendData:[], xaxisData:[], colors:[]});
    const [isLoading, setLoading]=useState(true);

    const setDummyData=()=>{
        let series=[
            {
                name: 'Email VM/BU',
                type: 'line',
                data: [30, 5, 20, 3, 3, 3, 3, 3, 10]
            },
            {
                name: 'Email to VRO CODE',
                type: 'line',
                data: [22, 20, 40, 5, 10, 20, 5, 10, 0]
            },
            {
                name: 'No Action Taken',
                type: 'line',
                data: [10, 30, 60, 50, 30, 50, 60, 30, 50]
            }
        ];
        let legendData=[];
        series.forEach(v=>{
            legendData.push(v.name);
        })
        let xaxisData=["FCS", "Vendor", "WAS", "AAP", "CAIR", "Credit", "Diversified", "Family Office", "FCAT"];

        setChartData({series, legendData, xaxisData, colors:["#F47935", "#A39AF3", "#61D21B"]});
    }

    const getData=()=>{
        if(mountedRef.current){
            setLoading(true);
        }
        apiServices.summaryAndTrends("requestor", props.periodType).then((result)=>{
            if(result.data.code===200){
                let data=result.data.response.data;
                let clrs=["#F47935", "#A39AF3", "#61D21B", "#0d47a1", "#1e7ba5", "#F08080", "#FF0000", "#8B0000", "#FF1493", "#FFD700", "#9370DB", "#00CED1"];
                let series=[], legendData=[], xaxisData=[], emailTos=[], colors=[];

                data.forEach(d=>{
                    d.result.forEach(v=>{
                        if(xaxisData.indexOf(v.requestor)<0){
                            xaxisData.push(v.requestor);
                        }
                        v.action_count.forEach(v1=>{
                            if(emailTos.indexOf(v1.escalated_to)<0){
                                emailTos.push(v1.escalated_to);
                            }
                        })
                    })
                });
                xaxisData.sort();
                emailTos.sort();

                let flg=0;
                data.forEach(d=>{d.result.forEach(v=>{
                    if(v.no_action_count*1){
                        flg=1;
                    }
                })});
                if(flg){
                    emailTos.push("No Action Taken");
                }

                emailTos.forEach((name,i)=>{
                    if(name==='No Action Taken'){
                        colors.push("#77B6EA");
                    }else{
                        colors.push(clrs[i]);
                    }

                    let srs={name:(name!=='No Action Taken'?'Email To ':'')+name, type:'line', data:[]};
                    xaxisData.forEach(requestor=>{
                        let n=0;
                        data.forEach(d=>{d.result.forEach(v=>{
                            if(v.requestor===requestor){
                                if(name==='No Action Taken'){
                                    n+=v.no_action_count*1;
                                }else{
                                    v.action_count.forEach(v1=>{
                                        if(v1.escalated_to===name){
                                            n+=v1.actioned_count*1;
                                        }
                                    });
                                }
                            }
                        })});
                        srs.data.push(n);
                    });
                    series.push(srs);
                });

                series.forEach(v=>{
                    legendData.push(v.name);
                });

                if(mountedRef.current){
                    setChartData({series, legendData, xaxisData, colors});
                }
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            if(mountedRef.current){
                setLoading(false);
            }
        });
    }

    useEffect(()=>{
        if (STATICRISK360){     // Set Static Risk360 data
            setLoading(false);
            setDummyData(); return;
        }
        getData();

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
            <div className="heading uc text-center fs18">Alerts Trend by Requestor w.r.t Action Taken</div>
            <div className="content">
                {isLoading?(
                    <div className="m-auto text-center" style={{height:'400px'}}>
                        <Loader />
                    </div>
                ):(
                    <>
                        {chartData.legendData.length?(
                            <Chart 
                                width="100%"
                                height="500px"
                                tooltip={{trigger:'axis'}}
                                //legendData={chartData.legendData}
                                xaxis={{data:chartData.xaxisData}}
                                yaxis={{title:"No. of Alerts", nameGapY:40}}
                                series={chartData.series}
                                color={chartData.colors}
                                grid={
                                    {left:'5%', right:'2%', top:'10%', bottom:'0%', containLabel:true}
                                }
                                legend={{
                                    show:true,
                                    data:chartData.legendData,
                                    itemWidth:12,
                                    itemHeight:12,
                                    icon:'rect',
                                    itemGap:12,
                                }}
                                textStyle={{fontSize:11}}
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
