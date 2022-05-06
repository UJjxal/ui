import React, { Component } from "react";
import { Tabs, Col, Row, Select, Card, Statistic } from "antd";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";
import {CONTEXT} from '../../../config';
import axios from "axios";
import "../../configpages/MRM/mrm.css";

import Breadcrumb from "../../../utilities/Breadcrumb";
import TableData from "../../../utilities/Table";
import DonutChart from "../../../utilities/DonutChart";
import Loader from "../../../utilities/Loader";
import ApexStack from "./ApexStack";
import ApexLine from "./ApexLine";

const { Option } = Select;
const { TabPane } = Tabs;

const cards = [
  {
    title: "$ Loan Portfolio (in bn RD$)",
    value: "85.8",
    suffix: "",
    prefix: "down",
    color: "#0d47a1",
    icon: "RedDown",
  },
  {
    title: "Net Portfolio Exposure (in bn RD$)",
    value: "4.9",
    suffix: "",
    prefix: "up",
    color: "#0d47a1",
    icon: "RedUp",
  },
  {
    title: "% Accounts in Normalization",
    value: "8.4",
    suffix: "",
    prefix: "up",
    color: "#0d47a1",
    icon: "RedUp",
  },
  {
    title: "# Accounts - Skip Payments (in k)",
    value: "0",
    suffix: "",
    prefix: "down",
    color: "#0d47a1",
    icon: "GreenDown",
  },
];

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = async () => {
    let url = `${CONTEXT}/covid/portfolio.json`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      //console.log("data121", result.data);
      this.setState({
        records: result.data,
      });
    });
  };

  onChange = () => {};

  render() {
    return (
      <React.Fragment>
        <Card>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              {cards.map((card) => {
                return (
                  <Col span={6}>
                    <div class="card">
                      <div
                        class="card-header"
                        style={{
                          padding: ".75rem 0",
                          textAlign: "center",
                          background: card.color,
                          color: "#fff",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        class="card-body"
                        style={{
                          padding: ".75rem 0",
                          textAlign: "center",
                          fontSize: 30,
                        }}
                      >
                        <div class="card-title">
                          {card.value}
                          <img
                            src={`${CONTEXT}/covid/${card.icon}.png`}
                            width="10%"
                            style={{ margin: 5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          <div style={{ margin: "20px 0", border: "1px solid #e8e8e8" }}>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              //style={{ height: 220 }}
              className="tabCustomization tabWidth"
            >
              <TabPane tab="Macroeconomic Trends" key={1}>
                <Row>
                  <Col span="8">
                    {this.state.records ? (
                      <ApexLine
                        title="COVID Cases & Recoveries (in thousands)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        yaxisMin={0}
                        yaxisMax={100}
                        series={
                          this.state.records.COVIDCases.MonetaryPolicyRate
                        }
                        categories={this.state.records.COVIDCases.xaxis}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="8">
                    {this.state.records ? (
                      <ApexLine
                        title="Consumer Price Index"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        yaxisMin={130}
                        yaxisMax={140}
                        series={
                          this.state.records.ConsumerPriceIndex
                            .ConsumerPriceIndex
                        }
                        categories={this.state.records.ConsumerPriceIndex.xaxis}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="8">
                    {this.state.records ? (
                      <ApexLine
                        title="Monetary Policy Rate (%)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        yaxisMin={1}
                        yaxisMax={5}
                        series={
                          this.state.records.MonetaryPolicyRate
                            .MonetaryPolicyRate
                        }
                        categories={this.state.records.MonetaryPolicyRate.xaxis}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Portfolio Balance Trends" key={2}>
                <Row>
                  <Col span="11">
                    {this.state.records ? (
                      <ApexLine
                        title="Portfolio Balance Trend (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        categories={
                          this.state.records.PortfolioBalanceTrend.xaxis
                        }
                        series={
                          this.state.records.PortfolioBalanceTrend.modeldata
                        }
                        //yaxisDecimalpt="1"
                        yaxisMin={80}
                        yaxisMax={90}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="1" style={{ textAlign: "center" }}>
                    <img
                      src={`${CONTEXT}/covid/rightArrow.png`}
                      width="50%"
                      style={{ marginTop: "6rem" }}
                    />
                  </Col>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexStack
                        title="Portfolio Balance Trend By Risk Bands"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        legendColor={[
                          "#d86462",
                          "#ec7f5e",
                          "#f99d5c",
                          "#ffbd5f",
                          "#a6bb6e",
                          "#6d9070",
                        ]}
                        categories={this.state.records.PortfolioBalTrend.xaxis}
                        series={this.state.records.PortfolioBalTrend.modeldata}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Portfolio Balance Trend By Market Segment (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="bar"
                        categories={
                          this.state.records
                            .PortfolioBalanceTrendByMarketSegment.xaxis
                        }
                        series={
                          this.state.records
                            .PortfolioBalanceTrendByMarketSegment.modeldata
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Portfolio Balance Trend By Product (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="bar"
                        categories={
                          this.state.records.PortfolioBalanceTrendByProduct
                            .xaxis
                        }
                        series={
                          this.state.records.PortfolioBalanceTrendByProduct
                            .modeldata
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Risk Exposure Trends" key={3}>
                <Row>
                  <Col span="11">
                    {this.state.records ? (
                      <ApexLine
                        title="Portfolio Risk Exposure (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        categories={
                          this.state.records.PortfolioRiskExposure.xaxis
                        }
                        series={
                          this.state.records.PortfolioRiskExposure.modeldata
                        }
                        //yaxisDecimalpt="1"
                        yaxisMin={0}
                        yaxisMax={6}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="1" style={{ textAlign: "center" }}>
                    <img
                      src={`${CONTEXT}/covid/rightArrow.png`}
                      width="50%"
                      style={{ marginTop: "6rem" }}
                    />
                  </Col>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Risk Exposure by Risk Bands (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        //yaxisDecimalpt="1"
                        yaxisMin={0}
                        yaxisMax={5}
                        legendColor={[
                          "#ec7f5e",
                          "#f99d5c",
                          "#ffbd5f",
                          "#a6bb6e",
                          "#6d9070",
                        ]}
                        categories={this.state.records.exposureAmount.xaxis}
                        series={this.state.records.exposureAmount.modeldata}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>

                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Risk Exposure By Market Segments (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="bar"
                        yaxisMin={0}
                        yaxisMax={4}
                        categories={
                          this.state.records
                            .PortfolioRiskExposureTrendByMarketSegment.xaxis
                        }
                        series={
                          this.state.records
                            .PortfolioRiskExposureTrendByMarketSegment.modeldata
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>

                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Risk Exposure By Product (in bn RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="bar"
                        yaxisMin={0}
                        yaxisMax={4}
                        categories={
                          this.state.records.PortfolioRiskExposureTrendByProduct
                            .xaxis
                        }
                        series={
                          this.state.records.PortfolioRiskExposureTrendByProduct
                            .modeldata
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Payment Behaviour" key={4}>
                <Row>
                  <Col span="12" style={{ padding: 5 }}>
                    {this.state.records ? (
                      <ApexLine
                        title="# Accounts in Skip Payments (in thousands)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        yaxisMin={0}
                        yaxisMax={160}
                        series={this.state.records.paymentholiday.LOAN_SKIP}
                        categories={this.state.records.paymentholiday.xaxis}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="12" style={{ padding: 5 }}>
                    {this.state.records ? (
                      <ApexStack
                        title="Payment on Portfolio by Schedule"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        categories={
                          this.state.records.PaymentPortfolioSchedule.xaxis
                        }
                        series={
                          this.state.records.PaymentPortfolioSchedule.modeldata
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Average Late Fee Assessed (in thousands RD$)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        yaxisMin={0}
                        yaxisMax={360}
                        series={this.state.records.LateFeeAssessed.modeldata}
                        categories={this.state.records.LateFeeAssessed.xaxis}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="12">
                    {this.state.records ? (
                      <ApexLine
                        title="Credit Card Bill Payment Misses ($)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="area"
                        yaxisMin={0}
                        yaxisMax={40}
                        series={
                          this.state.records.CardBillPaymentMiss.modeldata
                        }
                        categories={
                          this.state.records.CardBillPaymentMiss.xaxis
                        }
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="DPD Risk Trends" key={5}>
                <Row>
                  <Col span="12" style={{ padding: 5 }}>
                    {this.state.records ? (
                      <React.Fragment>
                        <ApexStack
                          chartdirection="true"
                          showYaxis="true"
                          title="DPD Distribution (%)"
                          styleCard={{
                            boxShadow: "none",
                          }}
                          categories={
                            this.state.records.DPDDistributionJan20.xaxis
                          }
                          series={
                            this.state.records.DPDDistributionJan20.modeldata
                          }
                        />
                      </React.Fragment>
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                  <Col span="12" style={{ padding: 5 }}>
                    {this.state.records ? (
                      <ApexLine
                        title="DPD Distribution Month-on-Month (%)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        yaxisMin={0}
                        yaxisMax={24}
                        categories={this.state.records.DPDDistribution.xaxis}
                        series={this.state.records.DPDDistribution.modeldata}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Col>
                </Row>
              </TabPane>
            </Tabs>

            {/* <fieldset style={{ border: "1px solid #e8e8e8" }}>
              <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
                Post COVID Macroeconomic Trends
              </legend>
              <Row>
                <Col span="8">
                  {this.state.records ? (
                    <ApexLine
                      title="COVID Cases & Recoveries (in thousands)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      series={this.state.records.COVIDCases.MonetaryPolicyRate}
                      categories={this.state.records.COVIDCases.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="8">
                  {this.state.records ? (
                    <ApexLine
                      title="Consumer Price Index"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      series={
                        this.state.records.ConsumerPriceIndex.ConsumerPriceIndex
                      }
                      categories={this.state.records.ConsumerPriceIndex.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="8">
                  {this.state.records ? (
                    <ApexLine
                      title="Monetary Policy Rate (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      yaxisMin={1}
                      yaxisMax={5}
                      series={
                        this.state.records.MonetaryPolicyRate.MonetaryPolicyRate
                      }
                      categories={this.state.records.MonetaryPolicyRate.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </fieldset>

            <div style={{ textAlign: "center" }}>
              <img src="/covid/downArrow.png" width="20%" />
            </div>

            <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
              <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
                BPD Portfolio Risk Trends
              </legend>
              <Row>
                <Col span="11">
                  {this.state.records ? (
                    <ApexLine
                      title="Portfolio Balance Trend (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      categories={
                        this.state.records.PortfolioBalanceTrend.xaxis
                      }
                      series={
                        this.state.records.PortfolioBalanceTrend.modeldata
                      }
                      //yaxisDecimalpt="1"
                      yaxisMin={80}
                      yaxisMax={90}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="1" style={{ textAlign: "center" }}>
                  <img
                    src="/covid/rightArrow.png"
                    width="50%"
                    style={{ marginTop: "6rem" }}
                  />
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexStack
                      title="Portfolio Balance Trend By Risk Bands"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      categories={this.state.records.PortfolioBalTrend.xaxis}
                      series={this.state.records.PortfolioBalTrend.modeldata}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="11">
                  {this.state.records ? (
                    <ApexLine
                      title="Portfolio Risk Exposure (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      categories={
                        this.state.records.PortfolioRiskExposure.xaxis
                      }
                      series={
                        this.state.records.PortfolioRiskExposure.modeldata
                      }
                      //yaxisDecimalpt="1"
                      yaxisMin={1}
                      yaxisMax={6}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="1" style={{ textAlign: "center" }}>
                  <img
                    src="/covid/rightArrow.png"
                    width="50%"
                    style={{ marginTop: "6rem" }}
                  />
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Risk Exposure by Risk Bands (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisDecimalpt="1"
                      yaxisMin={0}
                      yaxisMax={5}
                      categories={this.state.records.exposureAmount.xaxis}
                      series={this.state.records.exposureAmount.modeldata}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </fieldset>

            <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
              <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
                Shift in Payment Behaviour
              </legend>
              <Row>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="# Accounts in Skip Payments (in thousands)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      series={this.state.records.paymentholiday.LOAN_SKIP}
                      categories={this.state.records.paymentholiday.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexStack
                      title="Payment on Portfolio by Schedule"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      categories={
                        this.state.records.PaymentPortfolioSchedule.xaxis
                      }
                      series={
                        this.state.records.PaymentPortfolioSchedule.modeldata
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average Late Fee Assessed (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      series={this.state.records.LateFeeAssessed.modeldata}
                      categories={this.state.records.LateFeeAssessed.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Bill Payment Misses ($)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      series={this.state.records.CardBillPaymentMiss.modeldata}
                      categories={this.state.records.CardBillPaymentMiss.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </fieldset>

            <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
              <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
                DPD Risk Trends
              </legend>
              <Row>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <React.Fragment>
                      <ApexStack
                        chartdirection="true"
                        showYaxis="true"
                        title="DPD Distribution (%)"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        categories={
                          this.state.records.DPDDistributionJan20.xaxis
                        }
                        series={
                          this.state.records.DPDDistributionJan20.modeldata
                        }
                      />
                    </React.Fragment>
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="DPD Distribution Month-on-Month (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      categories={this.state.records.DPDDistribution.xaxis}
                      series={this.state.records.DPDDistribution.modeldata}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </fieldset> */}
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default Portfolio;
