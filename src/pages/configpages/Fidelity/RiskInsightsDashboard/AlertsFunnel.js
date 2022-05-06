import React, {useState, useEffect, useRef} from "react";
import apiServices from "./apiServices";
import Loader from "../../../../utilities/Loader";
import util from "../../../../utilities/util";
import {STATICRISK360} from "../../../../config";
import {Progress} from 'antd';

const AlertsFunnel=(props)=>{
    const {periodType}=props;
    const mountedRef=useRef(true);

    const reqCount=useRef(0);
    const [isLoading, setLoading]=useState(true);
    
    const [statusCount, setStatusCount]=useState({
        total:0,
        cleared:0,
        riskMitigated:0,
        underReview:0,
    });
    const [actionTaken, setActionTaken]=useState(0);
    const [duplicates, setDuplicates]=useState(0);

    const setDummyData=()=>{
        statusCount.cleared=1500;
        statusCount.underReview=500;
        statusCount.riskMitigated=500;
        statusCount.total=statusCount.cleared+statusCount.underReview+statusCount.riskMitigated;
        setStatusCount({...statusCount});
        setActionTaken(100);
    }

    const getStatusCount=()=>{
        apiServices.summaryAndTrends("status", periodType)
        .then((result)=>{
            if(result.data.code===200){
                statusCount.total=0;
                statusCount.cleared=0;
                statusCount.riskMitigated=0;
                statusCount.underReview=0;
                result.data.response.data.forEach(v=>{
                    v.count_data.forEach(c=>{
                        if(c.status==='Cleared'){
                            statusCount.cleared+=c.criteria_count;
                        }
                        if(c.status==='Risk Mitigated'){
                            statusCount.riskMitigated+=c.criteria_count;
                        }
                        if(c.status==='Under Review'){
                            statusCount.underReview+=c.criteria_count;
                        }
                    })
                });
                statusCount.total=statusCount.cleared+statusCount.underReview+statusCount.riskMitigated;

                if(mountedRef.current){
                    setStatusCount({...statusCount});
                }
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            reqCount.current++;
            if(reqCount.current>=3){
                if(mountedRef.current){
                    setLoading(false);
                }
            }
        });
    }

    const getDuplicateCount=()=>{
        apiServices.summaryAndTrends("duplicate", periodType)
        .then((result)=>{
            if(result.data.code===200){
                let n=0;
                result.data.response.data.forEach(v=>{
                    v.count_data.forEach(c=>{
                        if(c.duplicate===1){
                            n+=c.criteria_count;
                        }
                    })
                });

                if(mountedRef.current){
                    setDuplicates(n);
                }
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            reqCount.current++;
            if(reqCount.current>=3){
                if(mountedRef.current){
                    setLoading(false);
                }
            }
        });
    }

    const getActionTakenCount=()=>{
        apiServices.summaryAndTrends("actiontaken", periodType)
        .then((result)=>{
            if(result.data.code===200){
                let n=0;
                result.data.response.data.forEach(v=>{
                    v.count_data.forEach(c=>{
                        if(c.action_taken==='Yes'){
                            n+=c.criteria_count;
                        }
                    })
                });

                if(mountedRef.current){
                    setActionTaken(n);
                }
            }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            reqCount.current++;
            if(reqCount.current>=3){
                if(mountedRef.current){
                    setLoading(false);
                }
            }
        });
    }


    useEffect(()=>{
        if (STATICRISK360){     // Set Static Risk360 data
            setLoading(false);
            setDummyData(); return;
        }
        reqCount.current=0;
        if(mountedRef.current){
            setLoading(true);
        }
        getStatusCount();
        getDuplicateCount();
        getActionTakenCount();

        // eslint-disable-next-line
    }, [periodType]);

    useEffect(()=>{
        return ()=>{
            mountedRef.current=false;
        }
        // eslint-disable-next-line
    }, []);

    const clearedPer=statusCount.cleared>0?(statusCount.cleared*100/statusCount.total).toFixed(0):0;
    const underReviewPer=statusCount.underReview>0?(statusCount.underReview*100/statusCount.total).toFixed(0):0;
    const riskMitigatedPer=statusCount.riskMitigated>0?(statusCount.riskMitigated*100/statusCount.total).toFixed(0):0;
    const actionTakenPer=actionTaken>0?(actionTaken*100/(statusCount.total-duplicates)).toFixed(0):0;

    return (
        <div>
            <div className="whitebx border">
                {/* <div className="heading">Alerts Funnel</div> */}

                {isLoading?(
                    <div className="m-auto text-center" style={{height:'292px'}}>
                        <Loader />
                    </div>
                ):(
                    <div>
                        <div className="position-relative" style={{overflow:'hidden'}}>
                            <div className="d-flex position-relative" style={{zIndex:2}}>
                                <div className="wper20 greybg31 border-right">
                                    <div className="greybg2 uc pt12 pb12 pl20 pr20 bold600">Alerts</div>
                                    <div className="pt20 pb15 pl20 pr20 position-relative">
                                        <div className="ht160 position-relative" style={{zIndex:2}}>
                                            <div className="bold600 fs22">{statusCount.total}</div>
                                            {/* <Progress percent={100} /> */}
                                        </div>
                                        {/* <BgDiv heightPer="100" /> */}
                                    </div>
                                </div>
                                <div className="wper20 greybg31 border-right">
                                    <div className="greybg2 uc pt12 pb12 pl20 pr20 bold600">Cleared</div>
                                    <div className="pt20 pb15 pl20 pr20 position-relative">
                                        <div className="ht160 position-relative" style={{zIndex:2}}>
                                            <div className="bold600 fs22">{statusCount.cleared}</div>
                                            <div className="pt5 fs16">
                                                {clearedPer}% of {statusCount.total}
                                                <div>
                                                    <Progress percent={clearedPer} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <BgDiv heightPer="60" /> */}
                                        <div className="pt10">
                                            <div><strong>Duplicate</strong> - {duplicates}</div>
                                            <div>{duplicates>0?(duplicates*100/statusCount.total).toFixed(0):0}% of {statusCount.total}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wper20 greybg31 border-right">
                                    <div className="greybg2 uc pt12 pb12 pl20 pr20 bold600">Under Review</div>
                                    <div className="pt20 pb15 pl20 pr20 position-relative">
                                        <div className="ht160 position-relative" style={{zIndex:2}}>
                                            <div className="bold600 fs22">{statusCount.underReview}</div>
                                            <div className="pt5 fs16">
                                                {underReviewPer}% of {statusCount.total}
                                                <div>
                                                    <Progress percent={underReviewPer} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <BgDiv heightPer="20" /> */}
                                    </div>
                                </div>
                                <div className="wper20 greybg31 border-right">
                                    <div className="greybg2 uc pt12 pb12 pl20 pr20 bold600">Risk Mitigated</div>
                                    <div className="pt20 pb15 pl20 pr20 position-relative">
                                        <div className="ht160 position-relative" style={{zIndex:2}}>
                                            <div className="bold600 fs22">{statusCount.riskMitigated}</div>
                                            <div className="pt5 fs16">
                                                {riskMitigatedPer}% of {statusCount.total}
                                                <div>
                                                    <Progress percent={underReviewPer} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <BgDiv heightPer="20" /> */}
                                        {/* <div className="pt10">
                                            <div><strong>Action Taken</strong> - 1,000</div>
                                            <div>4% of 25,000</div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="wper20 greybg31">
                                    <div className="greybg2 uc pt12 pb12 pl20 pr20 bold600">Action Taken</div>
                                    <div className="pt20 pb15 pl20 pr20 position-relative">
                                        <div className="ht160 position-relative" style={{zIndex:2}}>
                                            <div className="bold600 fs22">{actionTaken}</div>
                                            <div className="pt5 fs16">
                                                {actionTakenPer}% of {statusCount.total-duplicates}
                                                <div>
                                                    <Progress percent={actionTakenPer} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <BgDiv heightPer="4" /> */}
                                        <div className="pt10">
                                            <div><strong>*Under Action Taken</strong><br/>=Total Alerts - Duplicates</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute" style={{zIndex:1, left:'0', bottom:0, width:'100%'}}>
                                <svg viewBox="0 0 500 80" style={{width:'100%', strokeWidth:'0px'}} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M 0 80 C -60 0, 0 10, 100 40 S 320 50, 500 80" stroke="black" fill="#AFE3FC" style={{border:'none'}} />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default AlertsFunnel;
