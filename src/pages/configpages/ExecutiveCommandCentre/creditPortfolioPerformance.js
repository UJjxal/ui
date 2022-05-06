import React, {useContext, useState} from 'react';
import { Icon } from '@material-ui/core';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import { CONTEXT } from "../../../config";
import { Link } from 'react-router-dom';
import { AppContext } from "../../../AppProvider";

const CreditPortfolioPerformance = () => {
    
    const {pageContent} = useContext(AppContext);
    console.log("PAGE CONTENT", pageContent);
    const [keyInsights, setKeyInsights] = useState(
        [
        {title: 'Portfolio Balance', description: '6% decrease in portfolio balance over past 12 months period', link:pageContent.filter(page=>page.treeID===2)[0].link},
        {title: 'Channel Distribution', description: 'Digital Sales account for only 4% of overall credit product sales', link:pageContent.filter(page=>page.treeID===1)[0].link},
        {title: 'Sales Conversion', description: 'Lead to conversion ratio of credit products has decreased to 5.8% from 6.4%', link: ''},
        {title: 'Portfolio Accounts', description: 'Average balance per account has increased by 2%', link: ''}
    ]
    )

    return <div className="container-fluid my-5">
        <div className="container-fluid">
        <MDBRow>
            {
            tabDetails.map(({ label, value, percentage, icon, color }, i) => (
                <MDBCol md="3" key={i}>
                    <MDBCard>
                        <MDBCardBody className="px-3 py-2">
                        <div className="d-flex justify-content-between align-items-center text-center">
                            <div>
                                <h6 style={{color:"#868686"}}>{label}</h6>
                                <h3 className="font-weight-bold mt-2 mb-0 text-left">{value}</h3>
                            </div>
                            <div>
                                <h3 className="m-0"><Icon className={`font-weight-bold text-${color}`} style={{ fontSize: "2.3rem" }}>{icon}</Icon></h3>
                                <h6 className={`font-weight-bold text-${color}`}>{percentage}</h6>
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
                                <MDBCardTitle tag="h5">Portfolio Performance</MDBCardTitle>
                                    <ReactECharts option={optionsSize} style={{minHeight: '500px'}}/>
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
                                                    <Link to={CONTEXT+link}><Icon className="text-primary">device_hub</Icon></Link>
                                                    :<Link><Icon className="text-primary">device_hub</Icon></Link>
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
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Channel Distribution Mix - % (Current)</MDBCardTitle>
                            <ReactECharts option={optionsDoughnut} style={{ minHeight: '450px' }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Channel Distribution (Sales - $'0000)</MDBCardTitle>
                            <ReactECharts option={optionsStacked} style={{ minHeight: '450px' }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}

const optionsSize = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['Portfolio Balance', 'Portfolio Accounts'],
        bottom: 0
    },
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: [{
        type: 'value',
        name:'Balance($ mn)',
        min: 600,
        max: 700,
        position: 'left',
        splitLine: { show: false },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#000'
            }
        },
    },{
        type: 'value',
        name:'Accounts(# mn)',
        min: 1,
        max: 1.6,
        position: 'right',
        splitLine: { show: false },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#000'
            }
        },
    }],
    series: [{
        name:'Portfolio Balance',
        data: [674, 671, 669, 668, 670, 660, 649, 650, 641, 645, 647, 632],
        type: 'line',
        lineStyle: {
            color: '#007bff',
            width: 3,
            type: 'solid'
        },
        Symbol:'circle',
        symbolSize: 6,
        itemStyle: {
            borderWidth: 2,
            borderColor: '#007bff',
            color: '#007bff'
        }
    },{
        name:'Portfolio Accounts',
        data: [1.42, 1.41, 1.39, 1.38, 1.41, 1.37, 1.36, 1.35, 1.38, 1.34, 1.33, 1.3],
        type: 'line',
        yAxisIndex: 1,
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
        }
    }]
};

const optionsStacked = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '2%',
        right: '2%',
        left: '8%'
    },
    legend: {
        data: ['Email', 'App', 'Web', 'Call Center', 'Branch'],
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
        name: 'Branch',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        itemStyle: { color: '#719DEF' },
        data: [155.81, 197.38, 148.92, 168.75, 172.72, 149.04, 169.2, 144.13, 205.86, 185.61, 184.1, 180.6],
    },{
        name: 'Call Center',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        itemStyle: { color: '#92B4F3' },
        data: [59.67, 73.25, 48.65, 48.83, 72.52, 59.29, 57.81, 51.36, 74.61, 71.55, 66.41, 64.5],
    },{
        name: 'Email',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        itemStyle: { color: '#B3CBF6' },
        data: [3.32, 4.59, 3.88, 4.5, 5.72, 4.86, 4.7, 4.87, 6.86, 6.99, 7.23, 7.44]

    },{
        name: 'App',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        itemStyle: { color: '#D5E3FA' },
        data: [1.11, 1.25, 1.12, 1.46, 1.52, 1.4, 1.65, 1.32, 2.34, 2.69, 2.63, 2.58]
    },{
        name: 'Web',
        type: 'bar',
        stack: 'total',
        emphasis: {
            focus: 'series'
        },
        itemStyle: { color: '#E9F0FD' },
        data: [1.11, 1.53, 1.43, 1.46, 1.52, 1.4, 1.65, 1.32, 2.34, 2.15, 2.63, 2.58]
    }
    ]
};

const optionsDoughnut = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
    },
    series: [{
        top: '2%',
        bottom:'1%',
        left: '2%',
        right: '2%',
        breadcrumb: false,
        label: {
            fontSize: 16,
            formatter: '{b} ({c}%)',
          },
        type: 'treemap',
        data: [{
            name: 'Tree1',
            value: 30,
            children: [{
                name: 'Email',
                value: 3,
                itemStyle:{
                    color: "#B3CBF6"
                },
            },{
                name: 'Web',
                value: 1,
                itemStyle:{
                    color: "#E9F0FD"
                },
                label:{color: '#000'},
            },{
                name: 'App',
                value: 1,
                itemStyle:{
                    color: "#D5E3FA"
                },
                label:{color: '#000'},
            },{
                name: 'Call Center',
                value: 25,
                itemStyle:{
                    color: "#92B4F3"
                }
            }]
        }, {
            name: 'Branch',
            value: 70,
            itemStyle:{
                    color: "#719DEF"
                }
        }]
    }]
}

const tabDetails = [
    { label: 'Active Accounts', value: '1,321,543', percentage: '8.2%', icon: 'expand_more', color: 'danger' },
    { label: 'Portfolio Balance ($mn)', value: '$ 632', percentage: '6.1%', icon: 'expand_more', color: 'danger' },
    { label: 'Leads to Conversion', value: '5.8%', percentage: '10.5%', icon: 'expand_more', color: 'danger' },
    { label: 'Digital Sales', value: '4%', percentage: '1.2%', icon: 'expand_less', color: 'success' },
]

export default CreditPortfolioPerformance;
