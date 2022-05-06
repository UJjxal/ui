import React, { useEffect, useState } from "react";
import { CONTEXT } from '../../../config';
import axios from "axios";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import { Icon } from '@material-ui/core';
import { Select } from 'antd';
import EChart from "../../../utilities/EChartGlobal";
import Tiles from "../../../utilities/Tiles";
// import AntdDataTable from "../../../utilities/AntdDataTable";
import AntdDataTable from "./AntdDataTable";
import { Link } from 'react-router-dom';
import './index.css';

const { Option } = Select;

const CrossSellPerformance = () => {
    const [record, setRecord] = useState([])
    const [filterAnalysis, setFilterAnaysis] = useState({
        funnelAnalysis: [],
        tableAnalysis: []
    })
    const [filterTrends, setFilterTrends] = useState({
        lineTrends: [],
        lineTrendsByChannel: []
    })

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let url = `${CONTEXT}/cjo/cross-sell.json`
        axios({
            method: "get",
            url: url,
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then((result) => {
            setRecord(result.data)
            setFilterAnaysis({
                funnelAnalysis: result.data.CrossSellFunnel?.AllProducts,
                tableAnalysis: result.data.LTCRatioByChannel?.TableData.AllProducts
            })
            setFilterTrends({
                lineTrends: result.data.TrendsByProduct?.AllProducts,
                lineTrendsByChannel: result.data.TrendsByChannel?.AllProducts
            })
        })
    }
    const tableHeader = () => {
        return [
            {
                title: 'By Products',
                dataIndex: 'ByProducts',
                key: 'ByProducts',
                width: 100,
                className: "p-0 font-weight-bold",
                render: (text, record) => <div className="px-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'Credit Card',
                dataIndex: 'CreditCard',
                key: 'CreditCard',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.CreditCard > 100 ? '#b2d8b8' : record.CreditCard == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'Mortgage',
                dataIndex: 'Mortgage',
                key: 'Mortgage',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.Mortgage > 100 ? '#b2d8b8' : record.Mortgage == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'Personal Loan',
                dataIndex: 'PersonalLoan',
                key: 'PersonalLoan',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.PersonalLoan > 100 ? '#b2d8b8' : record.PersonalLoan == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'Auto Loan',
                dataIndex: 'AutoLoan',
                key: 'AutoLoan',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.AutoLoan > 100 ? '#b2d8b8' : record.AutoLoan == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'ECL',
                dataIndex: 'ECL',
                key: 'ECL',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.ECL > 100 ? '#b2d8b8' : record.ECL == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            },
            {
                title: 'All Products',
                dataIndex: 'AllProducts',
                key: 'AllProducts',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div style={{ backgroundColor: record.AllProducts > 100 ? '#b2d8b8' : record.AllProducts == 100 ? '#f9e29d' : '#ecb1ab' }} className="p-3 font-weight-bolder">{text}</div>,
            }
        ]
    }
    const tableHeaderByChannel = () => {
        return [
            {
                title: 'Call Center',
                dataIndex: 'CallCenter',
                key: 'CallCenter',
                width: 100,
                render: (text, record) => <div className="font-weight-bolder">{text}%</div>,
            },
            {
                title: 'Email',
                dataIndex: 'Email',
                key: 'Email',
                width: 100,
                render: (text, record) => <div className="font-weight-bolder">{text}%</div>,
            },
            {
                title: 'App',
                dataIndex: 'App',
                key: 'App',
                width: 100,
                render: (text, record) => <div className="font-weight-bolder">{text}%</div>,
            },
            {
                title: 'Web',
                dataIndex: 'Web',
                key: 'Web',
                width: 100,
                render: (text, record) => <div className="font-weight-bolder">{text}%</div>,
            },
            {
                title: 'Branch',
                dataIndex: 'Branch',
                key: 'Branch',
                width: 100,
                render: (text, record) => <div className="font-weight-bolder">{text}%</div>,
            }
        ]
    }
    const changeAnalysisData = (e) => {
        switch (e) {
            case "allProducts":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.AllProducts,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.AllProducts
                })
                break;
            case "autoLoan":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.AutoLoan,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.AutoLoan
                })
                break;
            case "mortgage":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.Mortgage,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.Mortgage
                })
                break;
            case "creditCard":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.CreditCard,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.CreditCard,
                })
                break;
            case "personalLoan":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.PersonalLoan,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.PersonalLoan
                })
                break;
            case "ecl":
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.ECL,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.ECL
                })
                break;

            default:
                setFilterAnaysis({
                    funnelAnalysis: record.CrossSellFunnel?.AllProducts,
                    tableAnalysis: record.LTCRatioByChannel?.TableData.AllProducts
                })
        }
    }
    const changeTrendsData = (e) => {
        switch (e) {
            case "allProducts":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.AllProducts,
                    lineTrendsByChannel: record.TrendsByChannel?.AllProducts
                })
                break;
            case "autoLoan":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.AutoLoan,
                    lineTrendsByChannel: record.TrendsByChannel?.AutoLoan
                })
                break;
            case "mortgage":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.Mortgage,
                    lineTrendsByChannel: record.TrendsByChannel?.Mortgage
                })
                break;
            case "creditCard":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.CreditCard,
                    lineTrendsByChannel: record.TrendsByChannel?.CreditCard,
                })
                break;
            case "personalLoan":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.PersonalLoan,
                    lineTrendsByChannel: record.TrendsByChannel?.PersonalLoan
                })
                break;
            case "ecl":
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.ECL,
                    lineTrendsByChannel: record.TrendsByChannel?.ECL
                })
                break;

            default:
                setFilterTrends({
                    lineTrends: record.TrendsByProduct?.AllProducts,
                    lineTrendsByChannel: record.TrendsByChannel?.AllProducts
                })
        }
    }
    return (
        <div className="container-fluid my-4">
            <Tiles tileStyle={{ height: "94" }} tilesDetails={record.CrossSellPerformance?.TilesData ?? []} />
            <div className="container-fluid">
                <MDBRow className="mt-4">
                    <MDBCol md="9">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5" style={tableHeaderStyle}>Cross Sell Performance Scorecard  (# Accounts)- Actual vs Target</MDBCardTitle>
                                <AntdDataTable rows={record.CrossSellPerformanceScoreboard?.TableData ?? []} columns={tableHeader()} pagination={false} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3">
                        <MDBCardTitle tag="h5">Key Insights</MDBCardTitle>
                        {
                            record.KeyInsights ? record.KeyInsights.map(({ title, description, link }, i) => (
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
                            )) : <div>No Data</div>
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow className="my-4">
                    <MDBCol>
                        <MDBCard>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCardBody>
                                        <Select defaultValue="allProducts" style={{ width: 240 }} onChange={e => changeAnalysisData(e)}>
                                            <Option value="allProducts">All Products</Option>
                                            <Option value="autoLoan">Auto Loan</Option>
                                            <Option value="mortgage">Mortgage</Option>
                                            <Option value="creditCard">Credit Card</Option>
                                            <Option value="personalLoan">Personal Loan</Option>
                                            <Option value="ecl">ECL</Option>
                                        </Select>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBCardBody style={{ height: '400px' }}>
                                        <MDBCardTitle tag="h6">Cross Sell Performance- Funnel Analysis</MDBCardTitle>
                                        <EChart
                                            funnelChart={true}
                                            triggerAxis="item"
                                            series={filterAnalysis.funnelAnalysis ?? []}
                                            mini={false}
                                            seriesLabelShow={true}
                                            barColor={["#92B4F3", "#007bff", "#5e9fe5", "#D5E3FA"]}
                                        />
                                    </MDBCardBody>
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBCardBody className="mr-2 rounded" style={{border: '1px solid #f0f0f0'}}>
                                        <MDBCardTitle tag="h6" style={tableHeaderStyle}>Lead to Conversion Ratio (By Channels)</MDBCardTitle>
                                        <AntdDataTable rows={filterAnalysis.tableAnalysis ?? []} columns={tableHeaderByChannel()} pagination={false} />
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="my-4">
                    <MDBCol>
                        <MDBCard>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCardBody>
                                        <Select defaultValue="allProducts" style={{ width: 240 }} onChange={e => changeTrendsData(e)}>
                                            <Option value="allProducts">All Products</Option>
                                            <Option value="autoLoan">Auto Loan</Option>
                                            <Option value="mortgage">Mortgage</Option>
                                            <Option value="creditCard">Credit Card</Option>
                                            <Option value="personalLoan">Personal Loan</Option>
                                            <Option value="ecl">ECL</Option>
                                        </Select>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBCardBody style={{ height: '400px' }}>
                                        <MDBCardTitle tag="h6">Lead to Conversion Trends (YTD)</MDBCardTitle>
                                        <EChart
                                            toolTipFormatter={'{b}: {c}%'}
                                            barColor={["#007bff"]}
                                            triggerAxis="item"
                                            xAxis={record.TrendsByProduct?.xaxis ?? []}
                                            series={filterTrends.lineTrends}
                                            mini={false}
                                            seriesLabelShow={false}
                                            lineStyle="normal"
                                            minValue={filterTrends.lineTrends[0]?.min}
                                            maxValue={filterTrends.lineTrends[0]?.max}
                                        />
                                    </MDBCardBody>
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBCardBody style={{ height: '400px' }}>
                                        <MDBCardTitle tag="h6"> Lead to Conversion Trends (YTD) (By Channels)</MDBCardTitle>
                                        <EChart
                                            toolTipFormatter={'{b}: {c}%'}
                                            // lineColor="#007bff"
                                            barColor={["#92B4F3", "#5d90c6", "#5e9fe5", "#D5E3FA", "#007bff"]}
                                            triggerAxis="item"
                                            xAxis={record.TrendsByChannel?.xaxis ?? []}
                                            series={filterTrends.lineTrendsByChannel}
                                            mini={false}
                                            seriesLabelShow={false}
                                            lineStyle="normal"
                                            minValue={record.TrendsByChannel?.min}
                                            maxValue={record.TrendsByChannel?.max}
                                        />
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}
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
export default CrossSellPerformance