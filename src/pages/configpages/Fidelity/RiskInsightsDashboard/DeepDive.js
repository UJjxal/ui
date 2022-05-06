import React, {useState, useEffect} from "react";
import {Button} from "antd";
import AlertsDetail from "./AlertsDetail";
import AlertsRiskLevelDetail from "./AlertsRiskLevelDetail";
import AlertsRiskTypeDetail from "./AlertsRiskTypeDetail";
import AlertsCaseTypeDetail from "./AlertsCaseTypeDetail";
import apiServices from "./apiServices";

const DeepDive=()=>{
    apiServices.page='Deepdive';
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
                            Risk Insights - <span className="bold500">Deep Dive</span>
                        </div>
                        <div className="my-auto ml-auto">
                            <Button size="large" onClick={()=>changePeriod('daily')} className={`${periodType==='daily'?'bg-primary':''}`} style={{height:'44px', borderTopRightRadius:0, borderBottomRightRadius:0}}>Daily</Button>
                            <Button size="large" onClick={()=>changePeriod('monthly')} className={`${periodType==='monthly'?'bg-primary':''}`} style={{height:'44px', borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Monthly</Button>
                            <Button size="large" onClick={()=>changePeriod('yeartodate')} className={`${periodType==='yeartodate'?'bg-primary':''}`} style={{height:'44px', borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Year To Date</Button>
                        </div>
                    </div>

                    <div className="mb20">
                        <div className="mb20">
                            <AlertsDetail periodType={periodType} />
                        </div>

                        <div className="mb20">
                            <AlertsRiskLevelDetail periodType={periodType} />
                        </div>

                        <div className="mb20">
                            <AlertsRiskTypeDetail periodType={periodType} />
                        </div>

                        <div className="mb20">
                            <AlertsCaseTypeDetail periodType={periodType} />
                        </div>
                    </div>
                </div>
            ):null}
        </div>
    );
}
export default DeepDive;
