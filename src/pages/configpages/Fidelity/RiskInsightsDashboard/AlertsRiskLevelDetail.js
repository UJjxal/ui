import React, {useState, useEffect} from "react";
import {Chart} from "../../../../utilities/charts/Echarts";
import moment from "moment";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const AlertsRiskLevelDetail=(props)=>{
    //let colors=["#A2D2FF", "#BDE0FE", "#FFAFCC", "#FFC8DD", "#CDB4DB"];
    const [isLoading, setLoading]=useState(true);
    
    const [statusCount, setStatusCount]=useState({
        total:0,
        veryLow:0,
        low:0,
        high:0,
        medium:0,
        mediumLow:0,
    });

    const [chartData, setChartData]=useState({
        xaxisData:[],
        series:[],
        legendData:[]
    });

    const setDummyData=()=>{
        statusCount.veryLow=25;
        statusCount.low=35;
        statusCount.mediumLow=20;
        statusCount.medium=15;
        statusCount.high=5;
        statusCount.total=statusCount.veryLow+statusCount.low+statusCount.mediumLow+statusCount.medium+statusCount.high;
        setStatusCount({...statusCount});

        let series=[
            {
                name: 'Very Low',
                type: 'bar',
                barGap:0,
                data: [15, 25, 5, 5, 15, 25, 15, 5, 15, 18, 25]
            },
            {
                name: 'Low',
                type: 'bar',
                data: [5, 10, 10, 10, 5, 10, 5, 10, 5, 4, 35]
            },
            {
                name: 'Medium Low',
                type: 'bar',
                data: [10, 5, 5, 15, 10, 5, 10, 5, 10, 11, 20]
            },
            {
                name: 'Medium',
                type: 'bar',
                data: [13, 7, 11, 14, 15, 5, 9, 7, 13, 4, 15]
            },
            {
                name: 'High',
                type: 'bar',
                data: [8, 3, 18, 2, 11, 8, 6, 2, 14, 6, 5]
            }
        ];
        let legendData=[series[0].name, series[1].name, series[2].name, series[3].name, series[4].name];
        let xaxisData=["04/21", "03/21", "02/21", "12/20", "11/20", "10/20", "09/20", "08/20", "07/20", "06/20", "05/20"];
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
        apiServices.summaryAndTrends("risklevel", props.periodType)
        .then((result)=>{
            setLoading(false);
            if(result.data.code===200){
                statusCount.total=0;
                statusCount.veryLow=0;
                statusCount.low=0;
                statusCount.mediumLow=0;
                statusCount.medium=0;
                statusCount.high=0;

                let xaxisData=[];
                let series=[
                    {name: 'Very Low', type: 'bar', barGap:0, data: []},
                    {name: 'Low', type: 'bar', data: []},
                    {name: 'Medium Low', type: 'bar', data: []},
                    {name: 'Medium', type: 'bar', data: []},
                    {name: 'High', type: 'bar', data: []},
                ];
                let legendData=[];

                result.data.response.data.forEach(v=>{
                    if(props.periodType==='daily'){
                        xaxisData.push(moment(new Date(v.date)).format('DD MMM'));
                    }else{
                        xaxisData.push(apiServices.monthName(v.month));
                    }

                    let flg1=0, flg2=0, flg3=0, flg4=0, flg5=0;
                    v.count_data.forEach(c=>{
                        if(c.risk_level==='Very Low'){
                            statusCount.veryLow+=c.criteria_count;
                            series[0].data.push(c.criteria_count);
                            flg1=1;
                        }
                        if(c.risk_level==='Low'){
                            statusCount.low+=c.criteria_count;
                            series[1].data.push(c.criteria_count);
                            flg2=1;
                        }
                        if(c.risk_level==='Medium Low'){
                            statusCount.mediumLow+=c.criteria_count;
                            series[2].data.push(c.criteria_count);
                            flg3=1;
                        }
                        if(c.risk_level==='Medium'){
                            statusCount.medium+=c.criteria_count;
                            series[3].data.push(c.criteria_count);
                            flg4=1;
                        }
                        if(c.risk_level==='High'){
                            statusCount.high+=c.criteria_count;
                            series[4].data.push(c.criteria_count);
                            flg5=1;
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
                    if(!flg4){
                        series[3].data.push(0);
                    }
                    if(!flg5){
                        series[4].data.push(0);
                    }
                });
                legendData=[series[0].name, series[1].name, series[2].name, series[3].name, series[4].name];

                statusCount.total=statusCount.veryLow+statusCount.low+statusCount.mediumLow+statusCount.medium+statusCount.high;
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
            <div className="heading fs18 uc text-center">Action Taken by Risk Level</div>
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
                                <div className="fs14">Very Low</div>
                                <div className="bold600 fs22 pt2">{statusCount.veryLow}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Low</div>
                                <div className="bold600 fs22 pt2">{statusCount.low}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Medium Low</div>
                                <div className="bold600 fs22 pt2">{statusCount.mediumLow}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Medium</div>
                                <div className="bold600 fs22 pt2">{statusCount.medium}</div>
                            </div>
                            <div className="my-auto pl50">
                                <div className="fs14">High</div>
                                <div className="bold600 fs22 pt2">{statusCount.high}</div>
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
export default AlertsRiskLevelDetail;
