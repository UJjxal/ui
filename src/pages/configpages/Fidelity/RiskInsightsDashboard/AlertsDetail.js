import React, {useState, useEffect} from "react";
import {Chart} from "../../../../utilities/charts/Echarts";
import moment from "moment";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const AlertsDetail=(props)=>{
    //let colors=["#2ED051", "#E9B42E", "#6A68FB"];
    const [isLoading, setLoading]=useState(true);
        
    const [statusCount, setStatusCount]=useState({
        total:0,
        cleared:0,
        riskMitigated:0,
        underReview:0,
    });

    const [chartData, setChartData]=useState({
        xaxisData:[],
        series:[],
        legendData:[]
    });

    const setDummyData=()=>{ 
        statusCount.cleared=1500;
        statusCount.underReview=500;
        statusCount.riskMitigated=500;
        statusCount.total=statusCount.cleared+statusCount.underReview+statusCount.riskMitigated;
        setStatusCount({...statusCount});

        let xaxisData=["04/21", "03/21", "02/21", "12/20", "11/20", "10/20", "09/20", "08/20", "07/20"];
        let series=[
            {
                name: 'Cleared Alerts',
                type: 'bar',
                barGap:0,
                data: [1800, 1400, 1500, 1600, 1300, 1100, 1700, 1800, 1500]
            },
            {
                name: 'Cases Under Review',
                type: 'bar',
                data: [400, 300, 450, 350, 650, 200, 280, 400, 500]
            },
            {
                name: 'Cases Risk Mitigated',
                type: 'bar',
                data: [300, 250, 500, 150, 100, 500, 100, 500, 500]
            }
        ];
        let legendData=[series[0].name, series[1].name, series[2].name];
        setChartData({xaxisData, series, legendData});
    }

    const yearToDateData=(dataOb)=>{
        if(props.periodType==='yeartodate'){
            dataOb.xaxisData=['Year To Date'];
            dataOb.series.forEach(srs=>{
                let total=0;
                srs.data.forEach(n=>{
                    total+=n*1;
                });
                srs.data=[total];
            })
        }

        return dataOb;
    }

    useEffect(()=>{

        if (STATICRISK360){     // Set Static Risk360 data
            setLoading(false);
             setDummyData(); return;
        }
        setLoading(true);
        apiServices.summaryAndTrends("status", props.periodType)
        .then((result)=>{
            setLoading(false);
            if(result.data.code===200){
                statusCount.total=0;
                statusCount.cleared=0;
                statusCount.riskMitigated=0;
                statusCount.underReview=0;

                let xaxisData=[];
                let series=[
                    {name: 'Cleared Alerts', type: 'bar', barGap:0, data: []},
                    {name: 'Cases Under Review', type: 'bar', data: []},
                    {name: 'Cases Risk Mitigated', type: 'bar', data: []}
                ];
                let legendData=[];

                result.data.response.data.forEach(v=>{
                    if(props.periodType==='daily'){
                        xaxisData.push(moment(new Date(v.date)).format('DD MMM'));
                    }else{
                        xaxisData.push(apiServices.monthName(v.month));
                    }

                    let flg1=0, flg2=0, flg3=0;
                    v.count_data.forEach(c=>{
                        if(c.status==='Cleared'){
                            statusCount.cleared+=c.criteria_count;
                            series[0].data.push(c.criteria_count);
                            flg1=1;
                        }
                        if(c.status==='Under Review'){
                            statusCount.underReview+=c.criteria_count;
                            series[1].data.push(c.criteria_count);
                            flg2=1;
                        }
                        if(c.status==='Risk Mitigated'){
                            statusCount.riskMitigated+=c.criteria_count;
                            series[2].data.push(c.criteria_count);
                            flg3=1;
                        }
                    });
                    if(!flg1){
                        series[0].data.push(0);
                    }
                    if(!flg2){
                        series[1].data.push(0);
                    }
                    if(!flg3){
                        series[2].data.push(0);
                    }
                });
                legendData=[series[0].name, series[1].name, series[2].name];

                statusCount.total=statusCount.cleared+statusCount.underReview+statusCount.riskMitigated;
                setStatusCount({...statusCount});

                setChartData(yearToDateData({xaxisData, series, legendData}));
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
        });

        // eslint-disable-next-line
    }, [props.periodType]);

    return (
        <div className="whitebx">
            <div className="heading fs18 uc text-center">Alerts Summary</div>
            <div className="content">
                {isLoading?(
                    <div className="m-auto text-center" style={{height:'300px'}}>
                        <Loader />
                    </div>
                ):(
                    <>
                        <div className="mb5 d-flex text-right">
                            <div className="my-auto pr50 border-right">
                                <div className="fs14">Total Alerts</div>
                                <div className="bold600 fs22 pt2 purple-text">{statusCount.total}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Cleared Alerts</div>
                                <div className="bold600 fs22 pt2">{statusCount.cleared}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Cases Under Review</div>
                                <div className="bold600 fs22 pt2">{statusCount.underReview}</div>
                            </div>
                            <div className="my-auto pl50">
                                <div className="fs14">Cases Risk Mitigated</div>
                                <div className="bold600 fs22 pt2">{statusCount.riskMitigated}</div>
                            </div>
                        </div>

                        <Chart 
                            width="100%"
                            height="500px"
                            tooltip={{trigger:'axis'}}
                            legendData={chartData.legendData}
                            legendPosition="bottom"
                            xaxis={{data:chartData.xaxisData}}
                            yaxis={{title:"No. of Alerts", nameGapY:50}}
                            //nameGapY={50}
                            series={chartData.series}
                            //color={colors}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
export default AlertsDetail;
