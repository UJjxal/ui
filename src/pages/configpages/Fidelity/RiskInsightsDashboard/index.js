import React, {useState, useEffect, useRef} from "react";
import {Button} from "antd";

import AlertsFunnel from "./AlertsFunnel";
import AlertsRiskLevel from "./AlertsRiskLevel";
import AlertsRiskType from "./AlertsRiskType";
import AlertsTrends from "./AlertsTrends";
import CompanyAlerts from "./CompanyAlerts";
import apiServices from "./apiServices";
//import CompanyFindings from "./CompanyFindings";
//import moment from "moment";
//import Loader from "react-loader-spinner";

const RiskInsightDashboard=()=>{
    apiServices.page='Overview';
    const [showContent, setShowContent]=useState(true);
    const [periodType, setPeriodType]=useState('daily');
    
    const changePeriod=(p)=>{
        if(periodType===p){
            return;
        }
        setShowContent(false);
        setPeriodType(p);
    }

    useEffect(()=>{
        setShowContent(true);
        // eslint-disable-next-line
    }, [periodType]);
    
    return (
        <div className="container-fluid greybg1 pt20 pb20 bold400">
            {showContent?(
                <div>
                    <div className="mb15 d-flex">
                        <div className="my-auto uc fs18 bold400">
                            Risk Insights - <span className="bold500">Overview</span>
                        </div>

                        <div className="my-auto ml-auto">
                            <div className="d-flex">
                                {/* <div className="my-auto pr5">
                                    {isAjax && <Loader width="30" height="30" color="#00BFFF" />}
                                </div> */}
                                <div className="my-auto">
                                    <Button size="large" onClick={()=>changePeriod('daily')} className={`${periodType==='daily'?'bg-primary':''}`} style={{height:'44px', borderTopRightRadius:0, borderBottomRightRadius:0}}>
                                        Daily
                                    </Button>
                                    <Button size="large" onClick={()=>changePeriod('monthly')} className={`${periodType==='monthly'?'bg-primary':''}`} style={{height:'44px', borderTopLeftRadius:0, borderBottomLeftRadius:0}}>
                                        Monthly
                                    </Button>
                                    <Button size="large" onClick={()=>changePeriod('yeartodate')} className={`${periodType==='yeartodate'?'bg-primary':''}`} style={{height:'44px', borderTopLeftRadius:0, borderBottomLeftRadius:0}}>
                                        Year To Date
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mb20">
                        <AlertsFunnel periodType={periodType} />
                    </div>

                    <div className="row mingap mb20">
                        <div className="col-md-6">
                            <AlertsRiskLevel periodType={periodType} />
                        </div>

                        <div className="col-md-6">
                            <AlertsRiskType periodType={periodType} />
                        </div>
                    </div>

                    <div className="mb20">
                        <AlertsTrends periodType={periodType} />
                    </div>

                    <CompanyAlerts periodType={periodType} />
                </div>
            ):null}
        </div>
    );
}
export default RiskInsightDashboard;
