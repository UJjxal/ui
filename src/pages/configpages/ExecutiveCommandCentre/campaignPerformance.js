import React, {useContext, useEffect, useState} from 'react';
import { Icon, Button } from '@material-ui/core';
import { Table } from "antd";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import SyncFusion from "../../../utilities/SyncFusion";
import { Link } from 'react-router-dom';
import { CONTEXT } from "../../../config";
import { AppContext } from "../../../AppProvider";
import PageTitle from '../../../utilities/PageTitle';

const CampaignPerformance = () => {
    const [treeLink, setTreeLink] = useState("#");
    const selectedTreeId = useContext(AppContext).selectedTemplateTreeID;
    const page = useContext(AppContext).pageContent.filter(page=>page.treeID===selectedTreeId);
    useEffect(()=>{
        if(page.length > 0){
           setTreeLink(page[0].link);
        }else{
            setTreeLink("#");
        }   
    },[])
    

    return <div className="container-fluid mt-3 mb-5">
      
        
       {selectedTreeId && treeLink!=="#" && <Button className="mx-3 mb-3 ml-3"variant="contained" color="primary" style={{ background: "#3f88c5"}}>
            { /* Sanjit - Set Tree Link from selected KPI Tree*/}
            <Link 
            to={`${CONTEXT}${treeLink}`}
            className="text-white">{`< Analysis Tree`}</Link>
        </Button>}
        <PageTitle title={"Campaign Performance"} marginLeft={0}/>
        <div className="container-fluid">
        <MDBRow>
            {
            tabDetails.map(({ label, value, percentage, icon, color, img }, i) => (
                <MDBCol md="3" key={i}>
                    <MDBCard>
                        <MDBCardBody className="px-3 py-2">
                        <div className="text-center">
                                <h6 className="text-left" style={{color:"#868686"}}>{label}</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="font-weight-bold mt-2 mb-0 text-left">{value}</h3>
                                <Icon className={`font-weight-bold align-text-top text-${color}`} style={{ fontSize: "2.3rem" }}>{icon}</Icon>
                            </div>
                        </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            ))
            }
        </MDBRow>
        </div>
        <div className="container-fluid my-5">
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Portfolio Balance</MDBCardTitle>
                            <ReactECharts option={optionsBalance}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Portfolio Accounts</MDBCardTitle>
                            <ReactECharts option={optionsBalance}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                 <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5" style={tableHeaderStyle}>Campaign Performance</MDBCardTitle>
                            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Lead to Conversion Ratio by Channel</MDBCardTitle>
                            <ReactECharts option={optionsChannel} style={{minHeight: "380px"}}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}

const optionsBalance = {
    tooltip: {
        trigger: 'axis',
        //formatter: '{b}:{c}%',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['BAU', 'AI Enabled Strategy'],
        top: "3%",
        textStyle:{
            fontSize: 14
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr'],
        splitLine: { show: false },
        //boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'value',
        splitLine: { show: false },
        min: 140,
        max: 200,
    },

    series: [
        {
            name: 'BAU',
            type: 'line',
            color: '#D5E3FA',
            barGap: 0,
            data: [158,161.16,164.38,169.31],
            lineStyle: {
                color: '#007bff',
                width: 3,
                type: 'solid'
            },
            symbolSize: 6,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#007bff',
                color: '#007bff'
            },
            label: {
                show: false,
                color: '#000',
                position: 'outside',
                formatter: '{c}%'
            },
        },
        {
            name: 'AI Enabled Strategy',
            type: 'line',
            color: '#92B4F3',
            barGap: 0,
            data: [158, 162.74, 170.87, 184.54],
            lineStyle: {
                color: '#1aaba3',
                width: 3,
                type: 'solid'
            },
            Symbol:'circle',
            symbolSize: 6,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#1aaba3',
                color: '#1aaba3'
            },
            label: {
                show: false,
                color: '#000',
                position: 'outside',
                formatter: '{c}%'
            }
        }
    ]
}
const optionsChannel = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}%',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['BAU', 'AI Enabled Strategy'],
        top: "3%",
        textStyle:{
            fontSize: 14
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['App', 'Email', 'Call Center', 'Web', 'Branch'],
        splitLine: { show: false },
        //boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'value',
        splitLine: { show: false },
    },

    series: [
        {
            name: 'BAU',
            type: 'bar',
            color: '#D5E3FA',
            barGap: 0,
            data: [3.4, 3.8, 2.8, 2.6, 2.2],
            label: {
                show: true,
                color: '#000',
                position: 'outside',
                formatter: '{c}%'
            },
        },
        {
            name: 'AI Enabled Strategy',
            type: 'bar',
            color: '#92B4F3',
            barGap: 0,
            data: [7.6, 7.3, 6.1, 5.2, 4.7],
            label: {
                show: true,
                color: '#000',
                position: 'outside',
                formatter: '{c}%'
            }
        }
    ]
};


const tabDetails = [
    { label: 'Sales increase for cross sell', value: '15%', percentage: '40%', icon: 'expand_less', color: 'success', img: 'sales-increase.svg' },
    { label: 'Increase in leads conversion ratio', value: '4%', percentage: '30%', icon: 'expand_less', color: 'success', img: 'balance-increase.svg' },
    { label: 'Growth in Digital Channel sales', value: '20%', percentage: '20%', icon: 'expand_less', color: 'success', img: 'channel-sales.svg' },
    { label: 'Growth in credit card conversions', value: '5%', percentage: '5%', icon: 'expand_less', color: 'success', img: 'traffic-conversion.svg' },
]

const columns = [
    {
        title: '',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'BAU',
        dataIndex: 'BAU',
        key: 'BAU',
      },
      {
        title: 'AI Enabled Strategy',
        dataIndex: 'AIEnabledStrategy',
        key: 'AIEnabledStrategy',
      },
      {
        title: 'Change over BAU',
        dataIndex: 'ChangeOverBAU',
        key: 'ChangeOverBAU',
      }
    ]
const dataSource = [
    {
        "key": <h6 className="m-0">Leads</h6>,
        "BAU": <h4 className="m-0">480,000</h4>,
        "AIEnabledStrategy": <h4 className="m-0">450,000</h4>,
        "ChangeOverBAU": 'NA'
    },
    {
        "key": <h6 className="m-0">Applications</h6>,
        "BAU": <h6><strong>34,600</strong><br/><small>7.2%</small></h6>,
        "AIEnabledStrategy": <h6><strong>59,000</strong><br/><small className="text-success">13.1%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">5.9%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
    {
        "key": <h6 className="m-0">Approvals</h6>,
        "BAU": <h6><strong>23,800</strong><br/><small>5.0%</small></h6>,
        "AIEnabledStrategy":<h6><strong>46,000</strong><br/><small className="text-success font-weight-bold">10.7%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">5.7%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
    {
        "key": <h6 className="m-0">Conversions</h6>,
        "BAU": <h6><strong>15,360</strong><br/><small>3.2%</small></h6>,
        "AIEnabledStrategy": <h6><strong>33,870</strong><br/><small className="text-success font-weight-bold">7.5%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">4.3%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
]
const tableHeaderStyle = {
    position: 'relative',
    left: '-1.25rem',
    top: '-1.25rem',
    background: '#D8DEE5',
    width: 'calc(100% + 40px)',
    height: '59px',
    margin: '0',
    lineHeight: '59px',
    paddingLeft: '30px',
}
export default CampaignPerformance;