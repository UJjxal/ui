import React, {useState} from "react";
import {Button} from "antd";
import {FilterFilled} from "@ant-design/icons";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import AlertsFunnel from "./AlertsFunnel";
import AlertsRiskLevel from "./AlertsRiskLevel";
import AlertsRiskType from "./AlertsRiskType";
import AlertsTrends from "./AlertsTrends";
import CompanyAlerts from "./CompanyAlerts";
import CompanyFindings from "./CompanyFindings";
import moment from "moment";

const RiskInsightDashboard=(props)=>{
    const [filterData, setFilterData]=useState({
        alertType:'All'
    });
    const handleAlertTypeChange=(e)=>{
        setFilterData({...filterData, alertType:e.target.value});
    }

    return (
        <div className="container-fluid greybg1 pt20 pb20 bold400">
            <div className="mb15 d-flex">
                <div className="my-auto uc fs18 bold400">
                    Risk Insights - <span className="bold500">Overview</span>
                </div>

                <div className="my-auto ml-auto">
                    <div className="d-flex">
                        <div className="my-auto">
                            <Button size="large" className="blue-bg" style={{borderTopRightRadius:0, borderBottomRightRadius:0, height:'44px'}}>Daily</Button>
                            <Button size="large" className="radius0" style={{height:'44px'}}>Monthly</Button>
                            {/* <Button size="large" className="radius0" style={{height:'44px'}}>Quarterly</Button> */}
                            {/* <Button size="large" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, height:'44px'}}>Custom</Button> */}
                        </div>
                        {/* <div className="my-auto w200 mr10">
                            <TextField
                                select
                                style={{width: "100%", background:"#FFF"}}
                                className="custom-txtfield"
                                label={"Filter By"}
                                variant="outlined"
                                value={filterData.alertType || ''}
                                onChange={handleAlertTypeChange}
                            >
                                <MenuItem value="All">All ALerts</MenuItem>
                                {["Reputational", "Legal Criminal", "GACP", "Legal Civil", "Regulaotory", "Business Continuity"].map((v,i)=>(
                                    <MenuItem key={i} value={v}>{v}</MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="my-auto mr10">
                            <Button size="large" style={{height:'44px'}}><i className="fa fa-download"></i>&nbsp;Download Report</Button>
                        </div>

                        <div className="my-auto">
                            <Button size="large" style={{borderColor:"#205684", height:'44px'}}>
                                <FilterFilled
                                    style={{ verticalAlign: "middle", color: "#205684" }}
                                />
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mb20">
                <AlertsFunnel token={props.token} />
            </div>

            <div className="row mb20">
                <div className="col-md-6">
                    <AlertsRiskLevel token={props.token} />
                </div>

                <div className="col-md-6">
                    <AlertsRiskType token={props.token} />
                </div>
            </div>

            <div className="mb20">
                <AlertsTrends token={props.token} />
            </div>

            <div className="mb20">
                <CompanyAlerts token={props.token} />
            </div>
            <div className="mb20">
                <CompanyFindings token={props.token} />
            </div>
        </div>
    );
}
export default RiskInsightDashboard;
