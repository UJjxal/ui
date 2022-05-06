// import { LeftCircleTwoTone } from "@ant-design/icons";
import React, {useState, useEffect, useRef} from "react";
//import CustomTable from "../../../utilities/CustomTable/Table";
import Card from "../../../utilities/Card";
//import {Card} from 'antd';
//import ReactECharts from 'echarts-for-react';
import FilterList from "./FilterList";
import {Table} from "antd";
let $=window.$;

const EmailTriggerModule = () => {
    const [heights, setHeights]=useState({
		chartHeight:200,
	});

    let tableHeaderPlanChange=[
        {
            dataIndex: "planName",
            title: "Plan Name"
        },
        {
            dataIndex: "states",
            title: "States",
        },
        {
            dataIndex: "change",
            title: "Change",
        },
        {
            dataIndex: "typeOfImpact",
            title: "Type of Impact",
        }
    ];
    let rowsPlanChange=[
        {planName: 'Plan 1', states: 'FL', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 2', states: 'TX', change: "<<Text>>", typeOfImpact: "Negative"},
        {planName: 'Plan 3', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
        {planName: 'Plan 4', states: 'MI', change: "<<Text>>", typeOfImpact: "Positive"},
    ];
    rowsPlanChange.forEach((v,i)=>{
        v.key=i;
    });

    let tableHeaderSalesTeam=[
        {
            title: "Rep Name",
            dataIndex: "repName",
        },
        {
            title: "Region",
            dataIndex: "region",
        },
        {
            title: "HCP Impacted",
            dataIndex: "hcpImpacted",
            align:"right"
        },
        {
            title: "Patients Impacted",
            dataIndex: "patientsImpacted",
            align:"right"
        }
    ];
    let rowsSalesTeam=[
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'ABC', region: 'FL', hcpImpacted: 2054, patientsImpacted: 22546},
        {repName: 'DEF', region: 'TX', hcpImpacted: 1723, patientsImpacted: 20644},
        {repName: 'LMN', region: 'MI', hcpImpacted: 1711, patientsImpacted: 17345},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
        {repName: 'XYZ', region: 'AZ', hcpImpacted: 1175, patientsImpacted: 15653},
    ];
    rowsSalesTeam.forEach((v,i)=>{
        v.key=i;
    });

    
    let tableHeaderHcp=[
            {
                dataIndex: "name",
                title: "HCP",
            },
            {
                dataIndex: "region",
                title: "Region",
            },
            {
                dataIndex: "address",
                title: "Address",
            },
            {
                dataIndex: "zipcode",
                title: "Zip Code",
            },
            {
                dataIndex: "patientsImpacted",
                title: "Patients Impacted",
            },
            {
                dataIndex:"growthInRx",
                title:"Growth in Rx(Y-O-Y)"
            },
            {
                dataIndex:"growthInRevenue",
                title:"Growth in Revenue($, 000)",
                align:'right'
            }
        ];
        let rowsHcp=[
            { name: 'ABC', region: 'FL', address: "123", zipcode: 30022, patientsImpacted:'2054 (80%)',growthInRx:'456 (12%)', growthInRevenue:45 },
            { name: 'DEF', region: 'FL', address: "123", zipcode: 30021, patientsImpacted:'1723 (73%)',growthInRx:'324 (18%)', growthInRevenue:53 },
            { name: 'LMN', region: 'FL', address: "1456", zipcode: 30020, patientsImpacted:'1711 (46%)',growthInRx:'345 (19%)', growthInRevenue:34 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'ABC', region: 'FL', address: "123", zipcode: 30022, patientsImpacted:'2054 (80%)',growthInRx:'456 (12%)', growthInRevenue:45 },
            { name: 'DEF', region: 'FL', address: "123", zipcode: 30021, patientsImpacted:'1723 (73%)',growthInRx:'324 (18%)', growthInRevenue:53 },
            { name: 'LMN', region: 'FL', address: "1456", zipcode: 30020, patientsImpacted:'1711 (46%)',growthInRx:'345 (19%)', growthInRevenue:34 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
            { name: 'XYZ', region: 'FL', address: "546", zipcode: 30025, patientsImpacted:'1175 (26%)',growthInRx:'234 (11%)', growthInRevenue:41 },
        ];

    rowsHcp.forEach((v,i)=>{
        v.key=i;
    });

    let wh=$(window).height();
    let ch=wh-79;
    let t1h=200;
    let t2h=220;
    let t3h=200;
      
    return (
        <div className="pt15 pb15 pl25 pr25 bold400 antd-tbl-white-th overflow-auto" style={{height:ch/* , background:'#f7f7f7' */}}>
            <h3 style={{color:"rgb(14, 75, 113)"}}>Email Trigger Module</h3>

            <FilterList />

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="pb20">
                        <Card 
                            cardClass="whitebx border radius6"
                            heading="Impacted Sales Team"
                            content={
                                <div className="pl20 pr20 pb20">
                                    <div className="border radius6 pt2">
                                        <Table 
                                            className="components-table-demo-nested"
                                            columns={tableHeaderSalesTeam} 
                                            dataSource={rowsSalesTeam} 
                                            pagination={false} 
                                            bordered={false}
                                            scroll={{y:t1h}}
                                            size="small"
                                        />
                                    </div>
                                </div>
                            }
                        >
                        </Card>
                    </div>
                </div>
                <div className="col-md-4">
                    <Card 
                        cardClass="whitebx border radius6"
                        heading="Plan Change Type of Impact"
                        content={
                            <div className="pl20 pr20 pb20">
                                <div className="border radius6 pt2 pb2">
                                    <Table 
                                        columns={tableHeaderPlanChange} 
                                        dataSource={rowsPlanChange} 
                                        pagination={false} 
                                        bordered={false}
                                        scroll={{y:t2h}}
                                        size="small"
                                    />
                                </div>
                            </div>
                        }
                    >
                    </Card>
                </div>
                <div className="col-md-8">
                    <Card 
                        cardClass="whitebx border radius6"
                        heading="Sales Team: ABC, Impacted HCP List"
                        content={
                            <div className="pl20 pr20 pb20">
                                <div className="border radius6 pt2">
                                    <Table 
                                        columns={tableHeaderHcp} 
                                        dataSource={rowsHcp} 
                                        pagination={false} 
                                        bordered={false}
                                        scroll={{y:t3h}}
                                        size="small"
                                    />
                                </div>
                            </div>
                        }
                    >
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default EmailTriggerModule;