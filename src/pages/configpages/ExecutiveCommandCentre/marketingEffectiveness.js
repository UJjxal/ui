import React from 'react';
import { Icon } from '@material-ui/core';
import { Table } from "antd";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import SyncFusion from "../../../utilities/SyncFusion";

const MarketingEffectiveness = () => {
    return <div className="container-fluid my-5">
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
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5" style={tableHeaderStyle}>Campaign Performance</MDBCardTitle>
                            {/* <ReactECharts option={OptionsFunnelBau} style={{minHeight: "500px"}}/> */}
                            {/* <SyncFusion
                                data={optionsBau}
                                id="business-funnel-chart"
                                display="display"
                                pointRender={true}
                                width="90%"
                                disabledTooltip={true}
                            /> */}
                            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-4">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Lead to Conversion Ratio by Channel</MDBCardTitle>
                            <ReactECharts option={optionsChannel} style={{minHeight: "600px"}}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Lead to Conversion Ratio by Product</MDBCardTitle>
                            <ReactECharts option={optionsProduct} style={{minHeight: "600px"}}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    </div>
}

const OptionsFunnelBau = {
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name:'Lead Conversion - BAU',
            type:'funnel',
            left: '20%',
            top: '5%',
            bottom: 0,
            width: '60%',
            min: 0,
            //max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                color: '#000',
                position: 'outside',
                fontWeight: 'bold',
                formatter: '{b}: {c}'
            },
            labelLine: {
                length: 30,
                lineStyle: {
                    width: 1,
                    type: 'solid',
                    color: '#000'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                {value: 15360, name: 'Conversions', itemStyle: {color: "#E9F0FD"}},
                {value: 23800, name: 'Approvals', itemStyle: {color: "#D5E3FA"}},
                {value: 34600, name: 'Applications', itemStyle: {color: "#B3CBF6"}},
                {value: 480000, name: 'Leads', itemStyle: {color: "#92B4F3"}}
            ]
        }
    ]
};
const OptionsFunnelStrategy = {
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name:'Lead Conversion - BAU',
            type:'funnel',
            left: '20%',
            top: '5%',
            bottom: 0,
            width: '60%',
            min: 0,
            //max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                color: '#000',
                position: 'outside',
                fontWeight: 'bold',
                formatter: '{b}: {c}'
            },
            labelLine: {
                length: 30,
                lineStyle: {
                    width: 1,
                    type: 'solid',
                    color: '#000'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                {value: 33870, name: 'Conversions', itemStyle: {color: "#ccc"}},
                {value: 46000, name: 'Approvals', itemStyle: {color: "#999"}},
                {value: 59000, name: 'Applications', itemStyle: {color: "#ddd"}},
                {value: 450000, name: 'Leads', itemStyle: {color: "#666"}}
            ]
        }
    ]
};

const optionsBau = [
    {
      "x": "Conversions",
      "y": "1",
      "display": "Conversions : 27,648",
      "fill": "#58CCED"
    },
    {
      "x": "Approvals",
      "y": "1",
      "display": "Approvals : 46,080",
      "fill": "#3895D3"
    },
    {
      "x": "Applications",
      "y": "1",
      "display": "Applications : 57,600",
      "fill": "#1261A0"
    },
    {
      "x": "Leads",
      "y": "1",
      "display": "Leads : 480,000",
      "fill": "#072F5F"
    }
];
const optionsStrategy = [
    {
        "x": "Conversions",
        "y": "1",
        "display": "Conversions : 25,920",
        "fill": "#58CCED"
    },
    {
        "x": "Approvals",
        "y": "1",
        "display": "Approvals : 43,200",
        "fill": "#3895D3"
    },
    {
        "x": "Applications",
        "y": "1",
        "display": "Applications : 54,000",
        "fill": "#1261A0"
    },
    {
        "x": "Leads",
        "y": "1",
        "display": "Leads : 450,000",
        "fill": "#072F5F"
    }
];

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

const optionsProduct = {
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
        type: 'value',
        boundaryGap: [0, 0.02],
        splitLine: { show: false },
    },
    yAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Credit Cards', 'Personal Loans', 'ECL', 'Mortgage', 'Auto Loans'],
    },

    series: [
        {
            name: 'BAU',
            type: 'bar',
            color: '#D5E3FA',
            barGap: 0,
            data: [3.6, 3.5, 2.3, 3.2, 2.6],
            label: {
                show: true,
                color: '#000',
                position: 'right',
                formatter: '{c}%'
            },
        },
        {
            name: 'AI Enabled Strategy',
            type: 'bar',
            color: '#92B4F3',
            barGap: 0,
            data: [7.8, 7.6, 4.1, 3.8, 3.8],
            label: {
                show: true,
                color: '#000',
                position: 'right',
                formatter: '{c}%'
            },
        }
    ]
};

const tabDetails = [
    { label: 'Sales increase for cross sell', value: '40%', percentage: '40%', icon: 'expand_less', color: 'success', img: 'sales-increase.svg' },
    { label: 'Increase in leads conversion ratio', value: '30%', percentage: '30%', icon: 'expand_less', color: 'success', img: 'balance-increase.svg' },
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
export default MarketingEffectiveness;