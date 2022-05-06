import React from 'react';
import { Icon } from '@material-ui/core';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactECharts from 'echarts-for-react';

const ProductLevelPerformance = () => {
    return <div className="container-fluid my-5">
        <div className="container-fluid my-5">
            <MDBRow>
                <MDBCol md="9">
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">Portfolio Size ($ Mn)</MDBCardTitle>
                                <MDBCardText className="text-center">
                                <ReactECharts option={optionsSize}/>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-4">
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">Portfolio Accounts (# mn)</MDBCardTitle>
                                <MDBCardText className="text-center">
                                <ReactECharts option={optionsAccounts}/>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBCol>
                <MDBCol md="3">
                    <MDBCard className="h-100">
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Key Insights</MDBCardTitle>
                            {
                                keyInsights.map(({title, description, link}, i) => (
                                    <div key={i} className="pb-4 mb-4 border-bottom">
                                        <div className="d-flex justify-content-between">
                                            <div className="text-primary bold600 fs16 cursor-pointer">{title}</div>
                                            {/* <Icon className="text-primary">device_hub</Icon> */}
                                        </div>
                                        <div className="pt5 pb5">{description}</div>
                                    </div>
                                ))
                            }
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}
const optionsSize = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        top: '5%',
        left: '5%',
        right: '2%',
    },
    legend: {
        data: ['Overall', 'ECL','Credit Cards','Personal Loan', 'Auto Loan','Mortgage'],
        bottom: 0
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        type: 'value',
    },
    series: [
    {
        name: 'ECL',
        type: 'bar',
        stack: 'total',
        itemStyle: {color: '#FCEFC8'},
        emphasis: {
            focus: 'series'
        },
        data: [62.1, 61.56, 62.01, 60.75, 61.11, 59.4, 58.41, 58.5, 57.69, 58.05, 58.23, 56.88,]
    },{
        name: 'Credit Cards',
        type: 'bar',
        stack: 'total',
        itemStyle: {color: '#D3E9D7'},
        emphasis: {
            focus: 'series'
        },
        data: [213.9, 212.04, 213.59, 209.25, 210.49, 204.6, 201.19, 201.5, 198.71, 199.95, 200.57, 195.92,]
    },{
        name: 'Personal Loan',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [276, 273.6, 275.6, 270, 271.6, 264, 259.6, 260, 256.4, 258, 258.8, 252.8],
        itemStyle:{color: "#F9E0CB"}
    },{
        name: 'Auto Loan',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [75.9, 75.24, 75.79, 74.25, 74.69, 72.6, 71.39, 71.5, 70.51, 70.95, 71.17, 69.52],
        itemStyle:{color: "#D5E3FA"}
    },{
        name: 'Mortgage',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [62.1, 61.56, 62.01, 60.75, 61.11, 59.4, 58.41, 58.5, 57.69, 58.05, 58.23, 56.88,],
        itemStyle:{color: "#D2EFF7"}
    },
    ]
};
const optionsAccounts = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        top: '5%',
        left: '5%',
        right: '2%',
    },
    legend: {
        data: ['Overall', 'ECL','Credit Cards','Personal Loan', 'Auto Loan','Mortgage'],
        bottom: 0
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        type: 'value',
    },
    series: [
    {
        name: 'ECL',
        type: 'bar',
        stack: 'total',
        itemStyle: {color: '#FCEFC8'},
        emphasis: {
            focus: 'series'
        },
        data: [0.153, 0.1512, 0.1539, 0.1521, 0.1494, 0.1449, 0.1449, 0.1422, 0.1305, 0.1269, 0.126, 0.117,]
    },{
        name: 'Credit Cards',
        type: 'bar',
        stack: 'total',
        itemStyle: {color: '#D3E9D7'},
        emphasis: {
            focus: 'series'
        },
        data: [0.527, 0.5208, 0.5301, 0.5239, 0.5146, 0.4991, 0.4991, 0.4898, 0.4495, 0.4371, 0.434, 0.403,]
    },{
        name: 'Personal Loan',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [0.68, 0.672, 0.684, 0.676, 0.664, 0.644, 0.644, 0.632, 0.58, 0.564, 0.56, 0.52,],
        itemStyle:{color: "#F9E0CB"}
    },{
        name: 'Auto Loan',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [0.187, 0.1848, 0.1881, 0.1859, 0.1826, 0.1771, 0.1771, 0.1738, 0.1595, 0.1551, 0.154, 0.143,],
        itemStyle:{color: "#D5E3FA"}
    },{
        name: 'Mortgage',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        data: [0.153, 0.1512, 0.1539, 0.1521, 0.1494, 0.1449, 0.1449, 0.1422, 0.1305, 0.1269, 0.126, 0.117],
        itemStyle:{color: "#D2EFF7"}
    },
    ]
};


const keyInsights = [
    {title: 'Portfolio Size', description: '4% decrease in portfolio balance over past 12 months period', link: ''},
    {title: 'Channel Distribution', description: 'Digital Sales account for only 4% of overall credit product sales', link: ''},
    {title: 'Sales Conversion', description: 'Lead to conversion ratio of credit products has gone down to 7.5% from 8.4%', link: ''},
    {title: 'Channel Distribution', description: 'Branch sales account for nearly 70% of the overall annual sales', link: ''},
    {title: 'Channel Distribution', description: 'Branch sales account for nearly 70% of the overall annual sales', link: ''}
]
export default ProductLevelPerformance;