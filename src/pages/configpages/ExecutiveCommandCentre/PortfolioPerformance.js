import React, { useEffect, useState } from "react";
import { CONTEXT } from '../../../config';
import axios from "axios";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from "mdbreact";
import { Icon } from '@material-ui/core';
import { Select } from 'antd';
// import EChart from "../../../utilities/EChartGlobal";
import EChart from "../../../utilities/EChartGlobal";
import Tiles from "../../../utilities/Tiles";
// import AntdDataTable from "../../../utilities/AntdDataTable";
import AntdDataTable from "./AntdDataTable";
import { Link } from 'react-router-dom';
import './index.css';

const { Option } = Select;

const PortfolioPerformance = (props) => {
  const [record, setRecord] = useState([])
  const [filterBalanceData, setFilterBalanceData] = useState({
    lineBalance: [],
    barBalance: []
  })
  const [filterAccountData, setFilterAccountData] = useState({
    lineAccount: [],
    barAccount: []
  })

  useEffect(() => {
    getData();

  }, [])

  const getData = async () => {
    let url = `${CONTEXT}/cjo/portfolio-performance.json`
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then((result) => {
      setRecord(result.data)
      setFilterBalanceData({
        lineBalance: result.data.PortfolioGrowthTrendsBalance?.AllProducts,
        barBalance: result.data.ACABalance?.AllProducts
      })
      setFilterAccountData({
        lineAccount: result.data.PortfolioGrowthTrendsAccounts?.AllProducts,
        barAccount: result.data.ACAAccounts?.AllProducts
      })
    })
  }
  const changeBalanceData = (e) => {
    switch (e) {
      case "allProducts":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.AllProducts,
          barBalance: record.ACABalance?.AllProducts
        })
        break;
      case "autoLoan":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.AutoLoan,
          barBalance: record.ACABalance?.AutoLoan
        })
        break;
      case "mortgage":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.Mortgage,
          barBalance: record.ACABalance?.Mortgage
        })
        break;
      case "creditCard":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.CreditCard,
          barBalance: record.ACABalance?.CreditCard,
        })
        break;
      case "personalLoan":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.PersonalLoan,
          barBalance: record.ACABalance?.PersonalLoan
        })
        break;
      case "ecl":
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.ECL,
          barBalance: record.ACABalance?.ECL
        })
        break;

      default:
        setFilterBalanceData({
          lineBalance: record.PortfolioGrowthTrendsBalance?.AllProducts,
          barBalance: record.ACABalance?.AllProducts
        })
    }
  }
  const changeAccountData = (e) => {
    switch (e) {
      case "allProducts":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.AllProducts,
          barAccount: record.ACAAccounts?.AllProducts
        })
        break;
      case "autoLoan":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.AutoLoan,
          barAccount: record.ACAAccounts?.AutoLoan
        })
        break;
      case "mortgage":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.Mortgage,
          barAccount: record.ACAAccounts?.Mortgage
        })
        break;
      case "creditCard":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.CreditCard,
          barAccount: record.ACAAccounts?.CreditCard,
        })
        break;
      case "personalLoan":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.PersonalLoan,
          barAccount: record.ACAAccounts?.PersonalLoan
        })
        break;
      case "ecl":
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.ECL,
          barAccount: record.ACAAccounts?.ECL
        })
        break;

      default:
        setFilterAccountData({
          lineAccount: record.PortfolioGrowthTrendsAccounts?.AllProducts,
          barAccount: record.ACAAccounts?.AllProducts
        })
    }
  }
  const tableHeader = () => {
    return [
      {
        title: '',
        dataIndex: 'Key',
        key: 'Key',
        width: 200,
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
  return (
    <div className="container-fluid my-4">
      <Tiles tileStyle={{ height: "94" }} tilesDetails={record.PortfolioPerformance?.TilesData ?? []} />
      <div className="container-fluid">
        <MDBRow className="my-4">
          <MDBCol md="9">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle tag="h5" style={tableHeaderStyle}>Portfolio Performance Scorecard <span style={{ fontSize: '14px' }}>(% Achieved based on Actual vs Target)</span></MDBCardTitle>
                <AntdDataTable rows={record.PortfolioPerformanceScoreboard?.TableData ?? []} columns={tableHeader()} pagination={false} />
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
              )) : []
            }
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-4">
          <MDBCol>
            <MDBCard>
              <MDBRow className="mx-2 mt-4">
                <MDBCol>
                  <Select defaultValue="allProducts" style={{ width: 240 }} onChange={e => changeBalanceData(e)}>
                    <Option value="allProducts">All Products</Option>
                    <Option value="autoLoan">Auto Loan</Option>
                    <Option value="mortgage">Mortgage</Option>
                    <Option value="creditCard">Credit Card</Option>
                    <Option value="personalLoan">Personal Loan</Option>
                    <Option value="ecl">ECL</Option>
                  </Select>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCardBody style={{ height: '400px' }}>
                    <MDBCardTitle tag="h6">YTD Portfolio Growth Trends Balance ($ mn)</MDBCardTitle><br/>
                    <EChart
                      barColor={["#007bff"]}
                      triggerAxis="axis"
                      xAxis={record.PortfolioGrowthTrendsBalance?.xaxis ?? []}
                      series={filterBalanceData.lineBalance}
                      mini={false}
                      seriesLabelShow={false}
                      lineStyle="normal"
                      minValue={filterBalanceData.lineBalance[0]?.min}
                      maxValue={filterBalanceData.lineBalance[0]?.max}
                    />
                  </MDBCardBody>
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody style={{ height: '400px' }}>
                    <MDBCardTitle tag="h6">Contribution of Acquisition, Cross Sell & Attrition in Growth of Portfolio Balance ($ mn)</MDBCardTitle>
                    <EChart
                      triggerAxis="axis"
                      xAxis={record.ACABalance?.xaxis ?? []}
                      series={filterBalanceData.barBalance}
                      mini={false}
                      seriesLabelShow={false}
                      // minValue={record.ACABalance?.min}
                      // maxValue={record.ACABalance?.max}
                      stack={"total"}
                      barColor={["#007bff", "#92B4F3", "#D5E3FA"]}
                    />
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-4">
          <MDBCol>
            <MDBCard>
              <MDBRow className="mx-2 mt-4">
                <MDBCol>
                  <Select defaultValue="allProducts" style={{ width: 240 }} onChange={e => changeAccountData(e)}>
                    <Option value="allProducts">All Products</Option>
                    <Option value="autoLoan">Auto Loan</Option>
                    <Option value="mortgage">Mortgage</Option>
                    <Option value="creditCard">Credit Card</Option>
                    <Option value="personalLoan">Personal Loan</Option>
                    <Option value="ecl">ECL</Option>
                  </Select>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCardBody style={{ height: '400px' }}>
                    <MDBCardTitle tag="h6">YTD Portfolio Growth Trends (# Accounts)</MDBCardTitle><br/>
                    <EChart
                      barColor={["#007bff"]}
                      triggerAxis="axis"
                      xAxis={record.PortfolioGrowthTrendsAccounts?.xaxis ?? []}
                      series={filterAccountData.lineAccount}
                      mini={false}
                      seriesLabelShow={false}
                      lineStyle="normal"
                      minValue={filterAccountData.lineAccount[0]?.min}
                      maxValue={filterAccountData.lineAccount[0]?.max}
                    />
                  </MDBCardBody>
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody style={{ height: '400px' }}>
                    <MDBCardTitle tag="h6">Contribution of Acquisition, Cross Sell & Attrition in Growth of Portfolio Accounts (# 1000s)</MDBCardTitle>
                    <EChart
                      triggerAxis="axis"
                      xAxis={record.ACAAccounts?.xaxis ?? []}
                      series={filterAccountData.barAccount}
                      mini={false}
                      seriesLabelShow={false}
                      minValue={filterAccountData.barAccount[0]?.min}
                      maxValue={filterAccountData.barAccount[0]?.max}
                      stack={"total"}
                      barColor={["#007bff", "#92B4F3", "#D5E3FA"]}
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
export default PortfolioPerformance