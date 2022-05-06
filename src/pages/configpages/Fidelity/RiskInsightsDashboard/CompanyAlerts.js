import React, {useState, useEffect, useRef} from "react";
import CustomTable from "../../../../utilities/CustomTable/Table";
// import CustomTable from "../../../../utilities/AntCustomTable/Table";
import {companiesNames} from "./companiesNames";
import apiServices from "./apiServices";
import moment from "moment";
import Loader from "../../../../utilities/Loader";
import {STATICRISK360} from "../../../../config";

const CompanyAlerts=(props)=>{
    const mountedRef=useRef(true);
    const [isLoading, setLoading]=useState(true);

    let [alerts, setAlerts]=useState({
        header:[],
        result:[],
    });

    let [findings, setFindings]=useState({
        header:[],
        result:[],
    });

    const setDummyData=()=>{
        let header=[
            {field:'company', headerName:'Company Name', width:300},
        ];
        for(let i=1; i<=30; i++){
            let d=i>9?i:('0'+i);
            let dateKey='f'+d+'0421';
            let dateLabel=moment(new Date("2021-04-"+d)).format("MMM, DD");
            header.push({field:dateKey, headerName:dateLabel, width:150, type:'number'});
        }

        let result=[];
        companiesNames.forEach(c=>{
            let data={company:c};
            for(let i=1; i<=30; i++){
                let d=i>9?i:('0'+i);
                let dateKey='f'+d+'0421';
                data[dateKey]=Math.floor(Math.random() * 60) + 1;
            }
            result.push(data);
        });

        setAlerts({header, result});
        setFindings({header, result});
    }

    const getList=()=>{
        if (STATICRISK360){     // Set Static Risk360 data
            setLoading(false);
            setDummyData(); return;
        }
        if(mountedRef.current){
            setLoading(true);
        }

        let header=[{field:'company', headerName:'Company Name'}];
        if(props.periodType==='daily'){
            header[0].width=300;
        }else{
            header[0].flex=1;
        }
        
        let alertsResult=[], findingResults=[];

        let companiesNames=[], columns=[];

        apiServices.companyAlertsAndFindings(props.periodType)
        .then((result)=>{
            if(result.data.code===200){
                result.data.response.forEach(v=>{
                    if(companiesNames.indexOf(v.caseId)<0){
                        companiesNames.push(v.caseId);
                    }
                    let dt=moment(new Date(v.dateAdded)).format('YYYY-MM-DD');
                    v.dt=dt;
                    if(columns.indexOf(dt)<0){
                        columns.push(dt);
                    }
                });
                companiesNames.sort();
                columns.sort();

                columns.forEach(dt=>{
                    let label=moment(new Date(dt)).format(props.periodType==='daily'?'MMM, DD':'MMM, YYYY');
                    header.push({field:dt, headerName:label, width:150, type:'number', useInFilter:true});
                });

                companiesNames.forEach(c=>{
                    let data1={company:c}, data2={company:c};
                    columns.forEach(dt=>{
                        let ac=0, fc=0;
                        result.data.response.forEach(v=>{
                            if(v.dt===dt && c===v.caseId){
                                ac+=v.alertCount;
                                fc+=v.findingsCount;
                            }
                        });
                        
                        data1[dt]=ac;
                        data2[dt]=fc;
                    });

                    alertsResult.push(data1);
                    findingResults.push(data2);
                });

                if(mountedRef.current){
                    setAlerts(yearToDateData({header, result:alertsResult}));
                    setFindings(yearToDateData({header, result:findingResults}));
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

    const yearToDateData=(dataOb, col)=>{
        if(props.periodType==='yeartodate'){
            let newHeader=[dataOb.header[0], {field:'total', headerName:'Year To Date', width:200, type:'number', useInFilter:true}];
            let newResult=[];
            dataOb.result.forEach(v=>{
                let total=0;
                let d={company:v.company};
                for(let i in v){
                    if(i!=='company'){
                        total+=v[i];
                    }
                }
                d.total=total;
                newResult.push(d);
            });

            return {header:newHeader, result:newResult};
        }
        return dataOb;
    }

    useEffect(()=>{
        getList();
        // eslint-disable-next-line
    }, [props.periodType]);

    useEffect(()=>{
        return ()=>{
            mountedRef.current=false;
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="mb20">
                <div className="whitebx title-filter">
                    <div className="heading uc fs18">Entity - Alerts</div>
                    <div className="content">
                        {isLoading?(
                            <div className="m-auto text-center" style={{height:'300px'}}>
                                <Loader />
                            </div>
                        ):(
                            <CustomTable
                                header={alerts.header}
                                result={alerts.result}
                                height={600}
                                pageSize={10}
                                filterBtn={true}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="mb20">
                <div className="whitebx title-filter">
                    <div className="heading uc fs18">Entity - Findings</div>
                    <div className="content">
                        {isLoading?(
                            <div className="m-auto text-center" style={{height:'300px'}}>
                                <Loader />
                            </div>
                        ):(
                            <CustomTable
                                header={findings.header}
                                result={findings.result}
                                height={600}
                                pageSize={10}
                                filterBtn={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default CompanyAlerts;
