import React, { useState, useEffect } from "react";
import { Chart } from "../../../../utilities/charts/Echarts";
import apiServices from "./apiServices";
import moment from "moment";
import Loader from "../../../../utilities/Loader";

const CreateChart = (props) => {
    let clrs = ["#F47935", "#A39AF3", "#61D21B", "#0d47a1", "#1e7ba5", "#F08080", "#FF0000", "#8B0000", "#FF1493", "#FFD700", "#9370DB", "#00CED1"];
    let colors = [];
    let { data } = props;
    let legendData = [];
    data.series.forEach((v, i) => {
        legendData.push(v.name);
        if (v.name === 'No Action Taken') {
            colors.push("#77B6EA");
        } else {
            colors.push(clrs[i]);
        }
    });

    return (
        <Chart
            title={{ text: data.name, left: 'center' }}
            width="100%"
            height="300px"
            tooltip={{ trigger: 'axis' }}
            //legendData={legendData}
            //legendPosition="bottom"
            //legendVerticalDistance={-5}
            legend={{
                top: 'bottom',
                left: 'center',
                show: true,
                data: legendData,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'rect',
                itemGap: 10,
            }}

            xaxis={{ data: data.xaxis }}
            yaxis={{ title: "No. of Alerts", nameGapY: 40 }}
            //nameGapY={45}
            series={data.series}
            color={colors}
            grid={
                { left: '10%', right: '2%', top: '10%', bottom: '12%', containLabel: true }
            }
            textStyle={{ fontSize: 10 }}
        />
    )
}


const AlertsCaseTypeDetail = (props) => {
    const [counts, setCounts] = useState({ total: 0, action: 0, noaction: 0 });
    const [charts, setChartsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getData = () => {
        setLoading(true);
        apiServices.summaryAndTrends("requestor", props.periodType).then((result) => {
            setLoading(false);
            if (result.data.code === 200) {
                let data = result.data.response.data;
                let total = 0, action = 0, noaction = 0, requestors = [], xaxis = [];

                data.forEach(d => {
                    if (props.periodType === 'daily') {
                        xaxis.push(moment(new Date(d.date)).format('DD MMM'));
                    } else {
                        xaxis.push(apiServices.monthName(d.month));
                    }

                    d.result.forEach(v => {
                        if (requestors.indexOf(v.requestor) < 0) {
                            requestors.push(v.requestor);
                        }

                        noaction += v.no_action_count * 1
                        v.action_count.forEach(v1 => {
                            action += v1.actioned_count * 1
                        })
                    })
                });
                total = action + noaction;
                setCounts({ total, action, noaction });

                requestors.sort();
                let allCharts = [];
                requestors.forEach(requestor => {
                    let emailTos = [], emailToCounts = [];
                    let flg = 0;
                    data.forEach((d, di) => {
                        d.result.forEach(v => {
                            if (v.requestor === requestor) {
                                v.action_count.forEach(v1 => {
                                    if (emailTos.indexOf(v1.escalated_to) < 0) {
                                        emailTos.push(v1.escalated_to);
                                    }

                                    emailToCounts.push({ name: v1.escalated_to, count: v1.actioned_count * 1, dt: xaxis[di] });
                                });
                                emailToCounts.push({ name: "No Action Taken", count: v.no_action_count * 1, dt: xaxis[di] });
                                if (v.no_action_count * 1 > 0) {
                                    flg = 1;
                                }
                            }
                        });
                    });
                    if (flg) {
                        emailTos.push("No Action Taken");
                    }

                    let dtl = { name: requestor, xaxis: xaxis, series: [] };
                    emailTos.forEach((name) => {
                        let srs = { name: (name !== 'No Action Taken' ? 'Email To ' : '') + name, type: 'bar', barGap: 0, data: [] };
                        xaxis.forEach(dt => {
                            let flg = 0;
                            emailToCounts.forEach(v => {
                                if (name === v.name && dt === v.dt) {
                                    flg = 1;
                                    srs.data.push(v.count);
                                }
                            });
                            if (!flg) {
                                srs.data.push(0);
                            }
                        });

                        dtl.series.push(srs);
                    });

                    allCharts.push(yearToDateData(JSON.parse(JSON.stringify(dtl))));
                });
                setChartsData(allCharts);
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
           
        });
    }

    const yearToDateData = (dataOb) => {
        if (props.periodType === 'yeartodate') {
            dataOb.xaxis = ['Year To Date'];
            dataOb.series.forEach(srs => {
                let total = 0;
                srs.data.forEach(n => {
                    total += n * 1;
                });
                srs.data = [total];
            })
        }

        return dataOb;
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [props.periodType]);


    return (
        <div className="whitebx">
            <div className="heading fs18 uc text-center">Alerts Trend by Requestor w.r.t Action Taken</div>
            <div className="content">
                {isLoading ? (
                    <div className="m-auto text-center" style={{ height: '300px' }}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="mb30 d-flex text-right">
                            <div className="my-auto pr50 border-right">
                                <div className="fs14">Total Alerts</div>
                                <div className="bold600 fs22 pt2 purple-text">{counts.total}</div>
                            </div>
                            <div className="my-auto pl50 pr50 border-right">
                                <div className="fs14">Action Taken</div>
                                <div className="bold600 fs22 pt2">{counts.action}</div>
                            </div>
                            <div className="my-auto pl50">
                                <div className="fs14">No Action Taken</div>
                                <div className="bold600 fs22 pt2">{counts.noaction}</div>
                            </div>
                        </div>

                        <div className="row mingap">
                            {charts.map((chart, i) => {
                                return chart.series.length > 0 ? <div key={i} className="col-md-6 mb40">
                                    <CreateChart
                                        data={chart}
                                    />
                                </div> : null
                            }
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default AlertsCaseTypeDetail;
