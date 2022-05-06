import React, {useState, useEffect} from "react";
import {Chart} from "../../../../utilities/charts/Echarts";
import moment from "moment";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const AlertsRiskTypeDetail=(props)=>{
    //let colors=["#EDF2FB", "#E2EAFC", "#D7E3FC", "#CCDBFD", "#C1D3FE", "#B6CCFE", "#ABC4FF"];
    const [isLoading, setLoading]=useState(true);

    const [statusCount, setStatusCount]=useState({
        total:0,
        reputational:0,
        legalCriminal:0,
        GACP:0,
        legalCivil:0,
        regulatory:0,
        businessContinuity:0,
        financial:0
    });

    const [chartData, setChartData]=useState({
        xaxisData:[],
        series:[],
        legendData:[]
    });

    const setDummyData=()=>{
        statusCount.reputational=12;
        statusCount.legalCriminal=15;
        statusCount.GACP=2;
        statusCount.legalCivil=20;
        statusCount.regulatory=16;
        statusCount.businessContinuity=30;
        statusCount.financial=5;
        statusCount.total=statusCount.reputational+statusCount.legalCriminal+statusCount.GACP+statusCount.legalCivil+statusCount.regulatory+statusCount.businessContinuity+statusCount.financial;
        setStatusCount({...statusCount});

        let xaxisData=["20/04/21", "21/04/21", "22/04/21", "23/04/21", "24/04/21", "25/04/21", "26/04/21", "27/04/21", "28/04/21"];
        let series=[
            {
                name: 'Business Continuity',
                type: 'bar',
                barGap:0,
                data: [15, 25, 5, 5, 15, 25, 15, 5, 30]
            },
            {
                name: 'Legal Civil',
                type: 'bar',
                data: [5, 10, 10, 10, 5, 10, 5, 10, 20]
            },
            {
                name: 'Legal Criminal',
                type: 'bar',
                data: [10, 5, 5, 15, 10, 5, 10, 5, 15]
            },
            {
                name: 'Reputational',
                type: 'bar',
                data: [13, 7, 11, 14, 15, 5, 9, 7, 12]
            },
            {
                name: 'GACP',
                type: 'bar',
                data: [8, 3, 18, 2, 11, 8, 6, 2, 2]
            },
            {
                name: 'Ragulatory',
                type: 'bar',
                data: [9, 4, 19, 3, 12, 9, 7, 3, 16]
            },
            {
                name: 'Financial',
                type: 'bar',
                data: [7, 2, 17, 1, 10, 7, 5, 1, 5]
            }
        ];
        let legendData=[series[0].name, series[1].name, series[2].name, series[3].name, series[4].name, series[5].name, series[6].name];
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
        apiServices.summaryAndTrends("risktype", props.periodType)
        .then((result)=>{
            setLoading(false);
            if(result.data.code===200){
                statusCount.total=0;
                statusCount.reputational=0;
                statusCount.legalCriminal=0;
                statusCount.GACP=0;
                statusCount.legalCivil=0;
                statusCount.regulatory=0;
                statusCount.businessContinuity=0;
                statusCount.financial=0;

                let xaxisData=[];
                let series=[
                    {name: 'Reputational', type: 'bar', barGap:0, data: []},
                    {name: 'Legal Criminal', type: 'bar', data: []},
                    {name: 'GACP', type: 'bar', data: []},
                    {name: 'Legal Civil', type: 'bar', data: []},
                    {name: 'Regulatory', type: 'bar', data: []},
                    {name: 'Business Continuity', type: 'bar', data: []}, 
                    {name: 'Financial', type: 'bar', data: []}, 
                ];
                let legendData=[];

                result.data.response.data.forEach(v=>{
                    if(props.periodType==='daily'){
                        xaxisData.push(moment(new Date(v.date)).format('DD MMM'));
                    }else{
                        xaxisData.push(apiServices.monthName(v.month));
                    }

                    let flg1=0, flg2=0, flg3=0, flg4=0, flg5=0, flg6=0, flg7=0;
                    v.count_data.forEach(c=>{
                        if(c.risk_type==='Reputational'){
                            statusCount.reputational+=c.criteria_count;
                            series[0].data.push(c.criteria_count);
                            flg1=1;
                        }
                        if(c.risk_type==='Legal Criminal'){
                            statusCount.legalCriminal+=c.criteria_count;
                            series[1].data.push(c.criteria_count);
                            flg2=1;
                        }
                        if(c.risk_type==='GACP'){
                            statusCount.GACP+=c.criteria_count;
                            series[2].data.push(c.criteria_count);
                            flg3=1;
                        }
                        if(c.risk_type==='Legal Civil'){
                            statusCount.legalCivil+=c.criteria_count;
                            series[3].data.push(c.criteria_count);
                            flg4=1;
                        }
                        if(c.risk_type==='Regulatory'){
                            statusCount.regulatory+=c.criteria_count;
                            series[4].data.push(c.criteria_count);
                            flg5=1;
                        }
                        if(c.risk_type==='Business Continuity'){
                            statusCount.businessContinuity+=c.criteria_count;
                            series[5].data.push(c.criteria_count);
                            flg6=1;
                        }
                        if(c.risk_type==='Financial'){
                            statusCount.businessContinuity+=c.criteria_count;
                            series[6].data.push(c.criteria_count);
                            flg7=1;
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
                    if(!flg6){
                        series[5].data.push(0);
                    }
                    if(!flg7){
                        series[6].data.push(0);
                    }
                });
                legendData=[series[0].name, series[1].name, series[2].name, series[3].name, series[4].name, series[5].name, series[6].name];

                statusCount.total=statusCount.reputational+statusCount.legalCriminal+statusCount.GACP+statusCount.legalCivil+statusCount.regulatory+statusCount.businessContinuity+statusCount.financial;
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
            <div className="heading fs18 uc text-center">Action Taken by Risk Type</div>
            <div className="content">
                {isLoading?(
                    <div className="m-auto text-center" style={{height:'300px'}}>
                        <Loader />
                    </div>
                ):(
                    <>
                        <div className="mb5 d-flex text-right">
                            <div className="my-auto pr30 border-right">
                                <div className="fs14">Total Alerts</div>
                                <div className="bold600 fs22 pt2 purple-text">{statusCount.total}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">Business Continuity</div>
                                <div className="bold600 fs22 pt2">{statusCount.businessContinuity}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">Legal Civil</div>
                                <div className="bold600 fs22 pt2">{statusCount.legalCivil}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">Legal Criminal</div>
                                <div className="bold600 fs22 pt2">{statusCount.legalCriminal}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">Reputational</div>
                                <div className="bold600 fs22 pt2">{statusCount.reputational}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">GACP</div>
                                <div className="bold600 fs22 pt2">{statusCount.GACP}</div>
                            </div>
                            <div className="my-auto pl30 pr30 border-right">
                                <div className="fs14">Ragulatory</div>
                                <div className="bold600 fs22 pt2">{statusCount.regulatory}</div>
                            </div>
                            <div className="my-auto pl30">
                                <div className="fs14">Financial</div>
                                <div className="bold600 fs22 pt2">{statusCount.financial}</div>
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
export default AlertsRiskTypeDetail;
