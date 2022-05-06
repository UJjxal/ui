import React, {useContext, useEffect, useState} from 'react';
import { Icon, Button } from '@material-ui/core';
import { Table } from "antd";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import { AppContext } from "../../../AppProvider";
import PageTitle from '../../../utilities/PageTitle';
import { Link } from 'react-router-dom';
import { CONTEXT } from "../../../config";

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
          
       {selectedTreeId && treeLink!=="#" && <Button className="mx-3 mb-3"variant="contained" color="primary" style={{ background: "#3f88c5"}}>
            { /* Sanjit - Set Tree Link from selected KPI Tree*/}
            <Link 
            to={`${CONTEXT}${treeLink}`}
            className="text-white">{`< Analysis Tree`}</Link>
        </Button>}
        <PageTitle title={"Collection Performance"} marginLeft={0}/>
        <div className="container-fluid">
            <MDBRow>
                {
                    tabDetails.map(({ label, value, percentage, icon, color, img }, i) => (
                        <MDBCol md="3" key={i}>
                            <MDBCard>
                                <MDBCardBody className="px-3 py-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 style={{ color: "#868686" }}>{label}</h6>
                                            <h3 className="font-weight-bold mt-2 mb-0 text-left">{value}</h3>
                                        </div>
                                        <div>
                                            <h3 className="m-0"><Icon className={`font-weight-bold text-${color}`} style={{ fontSize: "2.3rem" }}>{icon}</Icon></h3>
                                            <h6 className={`font-weight-bold text-${color} text-center`}>{percentage}</h6>
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
                            <MDBCardTitle tag="h5">Collection Rate</MDBCardTitle>
                            <ReactECharts option={optionsCollectionRate} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Payments ($ mn)</MDBCardTitle>
                            <ReactECharts option={optionsPaymentMade} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5" style={tableHeaderStyle}>ML Enabled Performance</MDBCardTitle>
                            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <MDBCol>
                    <MDBCard className="d-flex justify-content-center">
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Roll Rate Analysis</MDBCardTitle>
                                    <ReactECharts style={{height: '400px'}} option={optionsRollRateAnalysis} />
                                </MDBCardBody>
                            </MDBCol>
                            <MDBCol  md="6">
                                <MDBCardBody className="m-2" style={{border: '1px solid #f0f0f0', borderRadius: '4px' }}>
                                    <MDBCardTitle tag="h5" style={tableHeaderStyle}>Roll Rate Analysis</MDBCardTitle>
                                    <Table dataSource={dataSourceAnalysis} columns={columnsAnalysis} pagination={false} bordered />
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}

const optionsCollectionRate = {
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        formatter: '{b}: {c}%'
    },
    legend: {
        data: ['BAU', 'ML Enabled Strategy'],
        top: "3%",
        textStyle: {
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
        splitLine: { show: false }
    },
    yAxis: {
        type: 'value',
        splitLine: { show: false },
        min: 0,
        max: 100,
    },
    series: [
        {
            name: 'BAU',
            type: 'line',
            color: '#D5E3FA',
            data: [75, 73, 72, 70],
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
            name: 'ML Enabled Strategy',
            type: 'line',
            color: '#92B4F3',
            data: [81, 85, 88, 90],
            lineStyle: {
                color: '#1aaba3',
                width: 3,
                type: 'solid'
            },
            Symbol: 'circle',
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
const optionsPaymentMade = {

    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['BAU', 'ML Enabled Strategy'],
        textStyle: {
            fontSize: 14
        }
    },
    grid: {
        top: '15%',
        left: '5%',
        right: '5%'
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr'],
        axisPointer: {
            type: 'shadow'
        }
    },
    yAxis: [{
        type: 'value',
        min: 100,
        max: 130,
        splitLine: { show: false },
    }
    ],
    series: [{
        name: 'BAU',
         data: [121, 122, 120, 117],
        type: 'bar',
        color: '#D5E3FA',
        barGap: 0,
        label: {
            show: true,
            color: '#000',
            position: 'outside',
            // formatter: '{c}%'
        },
    },
    {
        name: 'ML Enabled Strategy',
        data: [121, 124, 126, 129],
        type: 'bar',
        color: '#92B4F3',
        barGap: 0,
        label: {
            show: true,
            color: '#000',
            position: 'outside',
            // formatter: '{c}%'
        },
    }
    ]
};
const optionsRollRateAnalysis = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%',
    },
    legend: {
        data: ['BAU (%)', 'ML Enabled Strategy (%)'],
        textStyle: {
            fontSize: 14
        }
    },
    grid: {
        top: '15%',
        left: '10%',
        right: '5%',
    },
    xAxis: {
        type: 'category',
        data: ['0-30 to 30-60', '30-60 to 60-90', '60-90 to 90-120', '90-120 to 120-150', '120-150 to 150-180'],
        axisPointer: {
            type: 'shadow'
        },
        axisLabel: { interval: 0, rotate: 20 }
    },
    yAxis: [{
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { show: false },
        axisLabel: {
            formatter: '{value} %'
        }
    }
    ],
    series: [{
        name: 'BAU (%)',
        data: [20, 35, 80, 87, 91],
        type: 'bar',
        color: '#D5E3FA',
        barGap: 0,
        label: {
            show: true,
            color: '#000',
            position: 'outside',
            formatter: '{c}%'
        },
    },
    {
        name: 'ML Enabled Strategy (%)',
        data: [20, 33, 75, 81, 84],
        type: 'bar',
        color: '#92B4F3',
        barGap: 0,
        label: {
            show: true,
            color: '#000',
            position: 'outside',
            formatter: '{c}%'
        },
    }
    ]
};


const tabDetails = [
    { label: 'Collection Rate', value: '80%', percentage: '9%', icon: 'expand_less', color: 'success', img: 'balance-increase.svg' },
    { label: 'Payments ($ mn)', value: '$129', percentage: '8%', icon: 'expand_less', color: 'success', img: 'sales-increase.svg' },
    { label: 'RPC Rate', value: '90%', percentage: '5%', icon: 'expand_less', color: 'success', img: 'channel-sales.svg' },
    { label: 'Promise Kept', value: '53%', percentage: '8%', icon: 'expand_less', color: 'success', img: 'traffic-conversion.svg' },
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
        title: 'ML Enabled Strategy',
        dataIndex: 'MLEnabledStrategy',
        key: 'MLEnabledStrategy',
    },
    {
        title: 'Change over BAU',
        dataIndex: 'ChangeOverBAU',
        key: 'ChangeOverBAU',
    }
]
const dataSource = [
    {
        "key": <h6 className="m-0">Customers Contacted</h6>,
        "BAU": <h5 className="m-0">9120</h5>,
        "MLEnabledStrategy": <h5 className="m-0">9120</h5>,
        "ChangeOverBAU": 'NA'
    },
    {
        "key": <h6 className="m-0">RPC Rate</h6>,
        "BAU": <h6><strong>7752</strong><br /><small>85%</small></h6>,
        "MLEnabledStrategy": <h6><strong>8208</strong><br /><small className="text-success">90%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">5%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
    {
        "key": <h6 className="m-0">Promise Made</h6>,
        "BAU": <h6><strong>5425</strong><br /><small>60%</small></h6>,
        "MLEnabledStrategy": <h6><strong>6840</strong><br /><small className="text-success font-weight-bold">70%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">10%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
    {
        "key": <h6 className="m-0">Promise Kept</h6>,
        "BAU": <h6><strong>4104</strong><br /><small>45%</small></h6>,
        "MLEnabledStrategy": <h6><strong>6384</strong><br /><small className="text-success font-weight-bold">53%</small></h6>,
        "ChangeOverBAU": <h4 className="text-success">8%<Icon className="align-text-top">arrow_upward</Icon></h4>
    },
]

const columnsAnalysis = [
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
        title: 'ML Enabled Strategy',
        dataIndex: 'MLEnabledStrategy',
        key: 'MLEnabledStrategy',
    }
]
const dataSourceAnalysis = [
    {
        "key": <h6 className="m-0">0-30 to 30-60</h6>,
        "BAU": <h6 className="m-0"><strong>20%</strong></h6>,
        "MLEnabledStrategy": <h6 className="m-0"><strong>20%</strong></h6>
    },
    {
        "key": <h6 className="m-0">30-60 to 60-90</h6>,
        "BAU": <h6><strong>35%</strong></h6>,
        "MLEnabledStrategy": <h6><strong>33%</strong></h6>
    },
    {
        "key": <h6 className="m-0">60-90 to 90-120</h6>,
        "BAU": <h6><strong>80%</strong></h6>,
        "MLEnabledStrategy": <h6><strong>75%</strong></h6>
    },
    {
        "key": <h6 className="m-0">90-120 to 120-150</h6>,
        "BAU": <h6><strong>87%</strong></h6>,
        "MLEnabledStrategy": <h6><strong>81%</strong></h6>
    },
    {
        "key": <h6 className="m-0">120-150 to 150-180</h6>,
        "BAU": <h6><strong>91%</strong></h6>,
        "MLEnabledStrategy": <h6><strong>84%</strong></h6>
    }
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