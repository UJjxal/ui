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
import util from "../../../utilities/util";
import './index.css';

const { Option } = Select;

const AttritionPerformance = () => {
    const [record, setRecord] = useState([])
    const [filterAttrition, setFilterAttrition] = useState({})

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let url = `${CONTEXT}/cjo/attrition.json`
        axios({
            method: "get",
            url: url,
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then((result) => {
            setRecord(result.data)
            setFilterAttrition(result.data.AttritionRateByProduct?.AllProducts,)
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
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            },
            {
                title: 'Mortgage',
                dataIndex: 'Mortgage',
                key: 'Mortgage',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            },
            {
                title: 'Personal Loan',
                dataIndex: 'PersonalLoan',
                key: 'PersonalLoan',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            },
            {
                title: 'Auto Loan',
                dataIndex: 'AutoLoan',
                key: 'AutoLoan',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            },
            {
                title: 'ECL',
                dataIndex: 'ECL',
                key: 'ECL',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            },
            {
                title: 'All Products',
                dataIndex: 'AllProducts',
                key: 'AllProducts',
                className: "p-0 text-center",
                width: 100,
                render: (text, record) => <div className="p-3 font-weight-bolder">{util.numberFormatSeparator(text)}</div>,
            }
        ]
    }
    const changeAttritionData = (e) => {
        switch (e) {
            case "allProducts":
                setFilterAttrition(record.AttritionRateByProduct?.AllProducts)
                break;
            case "autoLoan":
                setFilterAttrition(record.AttritionRateByProduct?.AutoLoan)
                break;
            case "mortgage":
                setFilterAttrition(record.AttritionRateByProduct?.Mortgage)
                break;
            case "creditCard":
                setFilterAttrition(record.AttritionRateByProduct?.CreditCard)
                break;
            case "personalLoan":
                setFilterAttrition(record.AttritionRateByProduct?.PersonalLoan)
                break;
            case "ecl":
                setFilterAttrition(record.AttritionRateByProduct?.ECL)
                break;

            default:
                setFilterAttrition(record.AttritionRateByProduct?.AllProducts)
        }
    }
    return (
        <div className="container-fluid my-4">
            <Tiles tileStyle={{ height: "94" }} tilesDetails={record.AttritionPerformance?.TilesData ?? []} />
            <div className="container-fluid">
                <MDBRow className="my-4">
                    <MDBCol md="9">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5" style={tableHeaderStyle}>Sales Performance Scorecard  (# Accounts)</MDBCardTitle>
                                <AntdDataTable rows={record.AttritionPerformanceScoreboard?.TableData ?? []} columns={tableHeader()} pagination={false} />
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
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <Select defaultValue="allProducts" style={{ width: 240 }} onChange={e => changeAttritionData(e)}>
                                    <Option value="allProducts">All Products</Option>
                                    <Option value="autoLoan">Auto Loan</Option>
                                    <Option value="mortgage">Mortgage</Option>
                                    <Option value="creditCard">Credit Card</Option>
                                    <Option value="personalLoan">Personal Loan</Option>
                                    <Option value="ecl">ECL</Option>
                                </Select>
                            </MDBCardBody>
                            <MDBCardBody style={{ height: '400px' }}>
                                <MDBCardTitle tag="h5">Attrition Rate Trends (YTD)</MDBCardTitle>
                                <EChart
                                    toolTipFormatter={'{b}: {c}%'}
                                    barColor={["#007bff"]}
                                    triggerAxis="item"
                                    xAxis={record.AttritionRateByProduct?.xaxis ?? []}
                                    series={filterAttrition}
                                    mini={false}
                                    seriesLabelShow={false}
                                    lineStyle="normal"
                                    minValue={filterAttrition[0]?.min}
                                    maxValue={filterAttrition[0]?.max}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody style={{ height: '400px' }}>
                                <MDBCardTitle tag="h5">Reasons for Attrition</MDBCardTitle>
                                <EChart
                                    triggerAxis="axis"
                                    toolTipFormatter={'{b}: {c}%'}
                                    // xAxis={record.AttritionReason?.xaxis ?? []}
                                    yAxis={record.AttritionReason?.yaxis ?? []}
                                    series={record.AttritionReason?.Reasons ?? []}
                                    mini={false}
                                    seriesLabelShow={false}
                                    // minValue={record.AttritionReason?.Reasons.min ?? []}
                                    // maxValue={record.AttritionReason?.Reasons.max ?? []}
                                    stack={"total"}
                                    barColor={["#007bff"]}
                                />
                            </MDBCardBody>
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

export default AttritionPerformance