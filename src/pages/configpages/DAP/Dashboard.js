import React, {useState, useContext} from 'react';
import { Icon } from '@material-ui/core';
import { Table } from "antd";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import { CONTEXT } from "../../../config";
import { Link } from 'react-router-dom';
import { AppContext } from "../../../AppProvider";

const Dashboard = () => {
    const {pageContent} = useContext(AppContext);
    const [keyInsights, setKeyInsights] = useState([
        { title: 'Collection Rate ($)', description: 'Overall collection rate has decreased by more than 10%', link:pageContent.filter(page=>page.treeID===10)[0].link},
        { title: 'Collection Rate (# Account)', description: 'Collection Rate by account has decreased by 4%', link: pageContent.filter(page=>page.treeID===10)[0].link },
        { title: 'Outstanding Balance', description: '$ balance in DPD 90+ bucket has increased by 3%', link: pageContent.filter(page=>page.treeID===10)[0].link },
        { title: 'Roll Rate', description: 'Shift to higher DPD buckets (e.g 30-60) observed in the past 12 months', link: pageContent.filter(page=>page.treeID===10)[0].link },
        
    ])
    return <div className="container-fluid my-5">
        <div className="container-fluid">
            <MDBRow>
                {
                    tabDetails.map(({ label, value, percentage, icon, color }, i) => (
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
                <MDBCol md="9">
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Collections Performance - Auto Lending Portfolio</MDBCardTitle>
                                    <ReactECharts option={optionsCollectionPerformance} style={{ minHeight: '500px' }} />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="3">
                    <MDBCardTitle tag="h5">Key Insights</MDBCardTitle>
                    {
                        keyInsights.map(({ title, description, link }, i) => (
                            <MDBCard key={i} className="mb-3">
                                <MDBCardBody>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-primary bold600 fs16 cursor-pointer">{title}</div>
                                            {link ?
                                                <Link to={CONTEXT + link}><Icon className="text-primary">device_hub</Icon></Link>
                                                : <Link><Icon className="text-primary">device_hub</Icon></Link>
                                            }
                                        </div>
                                        <div className="pt5 pb5">{description}</div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        ))
                    }
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <MDBCol>
                    <MDBCard>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Current Outstanding Balance Distribution (By DPD Buckets)</MDBCardTitle>
                                    <ReactECharts option={optionsDoughnut} style={{ minHeight: '400px' }} />
                                </MDBCardBody>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBCardBody className="m-2" style={{border: '1px solid #f0f0f0', borderRadius: '4px' }}>
                                    <MDBCardTitle tag="h5" style={tableHeaderStyle}>Current Outstanding Balance Distribution (By DPD Buckets)</MDBCardTitle>
                                    <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">M-O-M Portfolio Balance (By DPD Buckets)</MDBCardTitle>
                            <ReactECharts option={optionsBalance} style={{ minHeight: '350px' }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}

const optionsCollectionPerformance = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['Outstanding Balance ($ mn)', 'Payments ($ mn)', 'Collection Rate (%)'],
    },
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisPointer: {
            type: 'shadow'
        }
    },
    yAxis: [{
        type: 'value',
        min: 100,
        max: 200,
        splitLine: { show: false },
        position: 'left'
    },
    {
        type: 'value',
        min: 50,
        max: 100,
        position: 'right',
        splitLine: { show: false },
        axisLabel: {
            formatter: '{value} %'
        }
    }
    ],
    series: [{
        name: 'Outstanding Balance ($ mn)',
        data: [165, 164, 163, 162, 164, 159, 161, 160, 164, 161, 163, 166],
        type: 'bar',
        color: '#D5E3FA',
        barGap: 0
    },
    {
        name: 'Payments ($ mn)',
        data: [140.25, 144.32, 141.81, 136.08, 134.48, 130.38, 127.19, 123.2, 124.64, 119.14, 118.99, 117.86],
        type: 'bar',
        color: '#92B4F3',
        barGap: 0
    },
    {
        name: 'Collection Rate (%)',
        type: 'line',
        color: '#92B4F3',
        barGap: 0,
        data: [85, 88, 87, 84, 82, 82, 79, 77, 76, 74, 73, 71],
        yAxisIndex: 1,
        lineStyle: {
            color: '#007bff',
            width: 3,
            type: 'solid'
        },
        Symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
            borderWidth: 2,
            borderColor: '#007bff',
            color: '#007bff'
        },
        label: {
            position: 'outside',
            formatter: '{a} %'
        },
    },
    ]
};

const optionsBalance = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '2%',
        right: '2%',
        left: '8%'
    },
    legend: {
        data: ['DPD0-30', 'DPD30-60', 'DPD60-90', 'DPD90+'],
        bottom: 0
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        type: 'value',
        splitLine: { show: false },
    },
    series: [
        {
            name: 'DPD0-30',
            type: 'line',
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                color: '#719DEF',
                width: 3,
                type: 'solid'
            },
            itemStyle: {
                color: '#719DEF',
                borderWidth: 2,
                color: '#719DEF'
            },
            data: [132, 130, 127, 125, 125, 119, 119, 117, 118, 121, 114, 118],
        }, {
            name: 'DPD30-60',
            type: 'line',
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                color: '#92B4F3',
                width: 3,
                type: 'solid'
            },
            itemStyle: {
                color: '#92B4F3',
                borderWidth: 2,
                color: '#92B4F3'
            },
            data: [17, 16, 16, 18, 18, 19, 19, 21, 21, 22, 23, 24],
        }, {
            name: 'DPD60-90',
            type: 'line',
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                color: '#007bff',
                width: 3,
                type: 'solid'
            },
            itemStyle: {
                borderWidth: 2,
                borderColor: '#007bff',
                color: '#007bff'
            },
            data: [5, 6, 7, 6, 7, 6, 6, 8, 8, 10, 11, 12]

        }, {
            name: 'DPD90+',
            type: 'line',
            emphasis: {
                focus: 'series'
            },
            lineStyle: {
                color: '#1aaba3',
                width: 3,
                type: 'solid'
            },
            itemStyle: {
                borderWidth: 2,
                borderColor: '#1aaba3',
                color: '#1aaba3'
            },
            data: [12, 11, 13, 14, 15, 14, 16, 16, 16, 17, 16, 17]
        }
    ]
};

const optionsDoughnut = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%',
    },
    series: [
        {
            type: 'pie',
            radius: ['40%', '70%'],
            height: '450px',
            color: ['#719DEF', '#92B4F3', '#007bff', '#83b2af', '#569f9a', '#2a7873'],
            data: [
                { value: 70, name: 'DPD 0-30' },
                { value: 14, name: 'DPD 30-60' },
                { value: 5, name: 'DPD 60-90' },
                { value: 4, name: 'DPD 90-120' },
                { value: 3.5, name: 'DPD 120-150' },
                { value: 3.2, name: 'DPD 150-180' }
            ],
            label: {
                color: '#000',
                formatter: '{b}\n{c}%',
                minMargin: 5,
                edgeDistance: 10,
                lineHeight: 15,
            }
        }
    ]

}

const tabDetails = [
    { label: 'Outstanding Balance ($ mn)', value: '$171', percentage: '4%', icon: 'expand_less', color: 'success' },
    { label: 'Accounts in Collection', value: '41,250', percentage: '1.2%', icon: 'expand_less', color: 'success' },
    { label: 'Collection Rate (By Balance)', value: '71%', percentage: '14%', icon: 'expand_more', color: 'danger' },
    { label: 'Collection Rate (By Account)', value: '85%', percentage: '4%', icon: 'expand_more', color: 'danger' },
]


const columns = [
    {
        title: 'DPD',
        dataIndex: 'DPD',
        key: 'DPD',
    },
    {
        title: 'Balance ($ mn)',
        dataIndex: 'Balance',
        key: 'Balance',
    },
    {
        title: 'Contribution (%)',
        dataIndex: 'Contribution',
        key: 'Contribution',
    }
]

const dataSource = [
    {
        "DPD": <h6 className="m-0">DPD 0-30</h6>,
        "Balance": <h6 className="m-0">117.99</h6>,
        "Contribution": <h6 className="m-0">70%</h6>
    },
    {
        "DPD": <h6 className="m-0">DPD 30-60</h6>,
        "Balance": <h6 className="m-0">23.94</h6>,
        "Contribution": <h6 className="m-0">14%</h6>
    },
    {
       "DPD": <h6 className="m-0">DPD 60-90</h6>,
       "Balance": <h6 className="m-0">11.97</h6>,
       "Contribution": <h6 className="m-0">5%</h6>
    },
    {
        "DPD": <h6 className="m-0">DPD 90-120</h6>,
        "Balance": <h6 className="m-0">8.55</h6>,
        "Contribution": <h6 className="m-0">4%</h6>
    },
    {
        "DPD": <h6 className="m-0">DPD 120-150</h6>,
        "Balance": <h6 className="m-0">5.13</h6>,
        "Contribution": <h6 className="m-0">3.5%</h6>
    },
    {
        "DPD": <h6 className="m-0">DPD 150-180</h6>,
        "Balance": <h6 className="m-0">3.42</h6>,
        "Contribution": <h6 className="m-0">3.2%</h6>
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
export default Dashboard;