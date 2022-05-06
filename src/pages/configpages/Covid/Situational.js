import React, { Component } from "react";
import { Layout, Avatar, Col, Row, Select, Card, Tabs } from "antd";
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
import Loader from "../../../utilities/Loader";
import ApexStack from "./ApexStack";
import ApexLine from "./ApexLine";
import ApexScatter from "./ApexScatter";

const { TabPane } = Tabs;

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
    let url = `${CONTEXT}/covid/situational.json`;
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
    const fieldSetdata = [
      {
        title: "Risk Indicators - Income",
        charts: [
          { key: "SalaryMisses", title: "Salary Misses (%)" },
          {
            key: "SalaryCreditk",
            title: "Average Salary Credit (in thousands)",
          },
          {
            key: "IncomeEstimatek",
            title: "Average Income Estimate (in thousands)",
          },
        ],
      },
      {
        title: "Risk Indicators - Employment",
        charts: [
          {
            key: "FASE",
            title: "FASE (%)",
          },
        ],
      },
    ];
    let colSize;
    let chartName;
    return (
      <React.Fragment>
        {/* {fieldSetdata.map(function (fieldSet) {
          return (
            <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
              <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
                {fieldSet.title}
              </legend>
              <Row>
                {(colSize = fieldSet.charts.length)}
                {(chartName = fieldSet.charts[0].key)}
                <Col span={Math.floor(24 / colSize)}>
                  {this.state.records ? (
                    <ApexLine
                      title={fieldSet.charts[0].title}
                      styleCard={{
                        boxShadow: "none",
                      }}
                      series={this.state.records[chartName].modeldata}
                      categories={this.state.records[chartName].xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </fieldset>
          );
        }, this.state.records)} */}

        <div style={{ margin: "20px 0", border: "1px solid #e8e8e8" }}>
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            //style={{ height: 220 }}
            className="tabCustomization"
          >
            <TabPane tab="Payroll and Income Trends" key={1}>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Salary Misses (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={24}
                      series={this.state.records.SalaryMisses.modeldata}
                      categories={this.state.records.SalaryMisses.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Salary Credit (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={16}
                      chartType="area"
                      series={this.state.records.SalaryCreditk.modeldata}
                      categories={this.state.records.SalaryCreditk.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average Income Estimate (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      yaxisMin={0}
                      yaxisMax={160}
                      series={this.state.records.IncomeEstimatek.modeldata}
                      categories={this.state.records.IncomeEstimatek.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average Income Estimate By Market Segments (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="bar"
                      yaxisMin={0}
                      yaxisMax={1480}
                      series={
                        this.state.records.IncomeEstimateTrendByMarketSegment
                          .modeldata
                      }
                      categories={
                        this.state.records.IncomeEstimateTrendByMarketSegment
                          .xaxis
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Employment Risk Metrics" key={2}>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="# Customers - FASE (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      series={this.state.records.FASE.modeldata}
                      categories={this.state.records.FASE.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <React.Fragment>
                      <ApexScatter
                        title="Employment Risk Score-June"
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="scatter"
                        xaxisTitle="DGI Score Final Metric"
                        yaxisTitle="# Commercial Customers"
                        series={this.state.records.EmploymentRisk.modeldata}
                        //categories={this.state.records.EmploymentRisk.xaxis}
                      />
                    </React.Fragment>
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>

        <div style={{ textAlign: "center" }}>
          <img src="/covid/downArrow.png" width="20%" />
        </div>

        <div style={{ margin: "20px 0", border: "1px solid #e8e8e8" }}>
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            //style={{ height: 220 }}
            className="tabCustomization"
          >
            <TabPane tab="Credit Utilization Behaviour" key={3}>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Spend (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      yaxisMin={0}
                      yaxisMax={8}
                      series={this.state.records.CreditCardSpend.modeldata}
                      categories={this.state.records.CreditCardSpend.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>

                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="% Payment Change in total balance"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={60}
                      series={
                        this.state.records.PctChangeTotalBalance.modeldata
                      }
                      categories={
                        this.state.records.PctChangeTotalBalance.xaxis
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>

              <Row>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Utilization (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisDecimalpt="1"
                      yaxisMin={40}
                      yaxisMax={60}
                      categories={
                        this.state.records.CreditCardUtilization.xaxis
                      }
                      series={
                        this.state.records.CreditCardUtilization.modeldata
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Overdraft Utilization (%)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisDecimalpt="1"
                      yaxisMin={0}
                      yaxisMax={8}
                      categories={
                        this.state.records.CreditCardOverdraftUtilization.xaxis
                      }
                      series={
                        this.state.records.CreditCardOverdraftUtilization
                          .modeldata
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Utilization By Risk Bands (%)"
                      chartType="bar"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisDecimalpt="1"
                      legendColor={[
                        "#d86462",
                        "#ec7f5e",
                        "#f99d5c",
                        "#ffbd5f",
                        "#a6bb6e",
                        "#6d9070",
                      ]}
                      categories={
                        this.state.records.CreditCardUtilizationByRiskBands
                          .xaxis
                      }
                      series={
                        this.state.records.CreditCardUtilizationByRiskBands
                          .modeldata
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12" style={{ padding: 5 }}>
                  {this.state.records ? (
                    <ApexLine
                      title="Credit Card Overdraft Utilization By Risk Bands (%)"
                      chartType="bar"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisDecimalpt="1"
                      legendColor={[
                        "#d86462",
                        "#ec7f5e",
                        "#f99d5c",
                        "#ffbd5f",
                        "#a6bb6e",
                        "#6d9070",
                      ]}
                      yaxisMin={0}
                      yaxisMax={20}
                      categories={
                        this.state.records
                          .CreditCardUtilizationOverdraftByRiskBands.xaxis
                      }
                      series={
                        this.state.records
                          .CreditCardUtilizationOverdraftByRiskBands.modeldata
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Account Liquidity Behaviour" key={4}>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average deposits (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={200}
                      chartType="area"
                      series={this.state.records.MonthlyDepositsk.modeldata}
                      categories={this.state.records.MonthlyDepositsk.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average deposits By Market Segments (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={2000}
                      chartType="bar"
                      series={
                        this.state.records.MonthlyDepositsByMrkSegment.modeldata
                      }
                      categories={
                        this.state.records.MonthlyDepositsByMrkSegment.xaxis
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average Withdrawals (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={200}
                      chartType="area"
                      series={this.state.records.MonthlyWithdrawlsk.modeldata}
                      categories={this.state.records.MonthlyWithdrawlsk.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="Average Balance (in thousands RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      chartType="area"
                      yaxisMin={0}
                      yaxisMax={120}
                      series={this.state.records.MonthlyLiquidityk.modeldata}
                      categories={this.state.records.MonthlyLiquidityk.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Loan Originations Behaviour" key={5}>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="New Loans (in thousands)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //chartType="area"
                      yaxisMin={0}
                      yaxisMax={12}
                      series={this.state.records.NewLoans.modeldata}
                      categories={this.state.records.NewLoans.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexLine
                      title="New Loans Portfolio (in bn RD$)"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      yaxisMin={0}
                      yaxisMax={4}
                      series={this.state.records.NewLoansPortfoliobn.modeldata}
                      categories={this.state.records.NewLoansPortfoliobn.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  {this.state.records ? (
                    <ApexStack
                      title="New Loans By Product (in thousands)"
                      //chartdirection="true"
                      //showYaxis="true"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //chartType="area"
                      //yaxisMin={1}
                      //yaxisMax={5}
                      series={this.state.records.NewLoanByProduct.modeldata}
                      categories={this.state.records.NewLoanByProduct.xaxis}
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
                <Col span="12">
                  {this.state.records ? (
                    <ApexStack
                      title="New Loans Portfolio By Product (in bn RD$)"
                      //chartdirection="true"
                      //showYaxis="true"
                      styleCard={{
                        boxShadow: "none",
                      }}
                      //yaxisMin={1}
                      //yaxisMax={5}
                      series={
                        this.state.records.NewLoanDisbursedByProduct.modeldata
                      }
                      categories={
                        this.state.records.NewLoanDisbursedByProduct.xaxis
                      }
                    />
                  ) : (
                    <Loader style={{ marginLeft: "40%" }} />
                  )}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>

        {/*       
        <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
          <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
            Risk Indicators - Income
          </legend>
          <Row>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Salary Misses (%)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  series={this.state.records.SalaryMisses.modeldata}
                  categories={this.state.records.SalaryMisses.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Salary Credit (in thousands RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  series={this.state.records.SalaryCreditk.modeldata}
                  categories={this.state.records.SalaryCreditk.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Average Income Estimate (in thousands RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.IncomeEstimatek.modeldata}
                  categories={this.state.records.IncomeEstimatek.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
        </fieldset>

        <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
          <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
            Risk Indicators - Employment
          </legend>
          <Row>
            <Col span="12">
              {this.state.records ? (
                <ApexLine
                  title="FASE (%)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  series={this.state.records.FASE.modeldata}
                  categories={this.state.records.FASE.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="12">
              {this.state.records ? (
                <ApexScatter
                  title="Employment Risk Score-June"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="scatter"
                  series={this.state.records.EmploymentRisk.modeldata}
                  //categories={this.state.records.EmploymentRisk.xaxis}
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
            Behavioural KPIs - Credit Utilization
          </legend>
          <Row>
            <Col span="12">
              {this.state.records ? (
                <ApexLine
                  title="Credit Card Spend (in bn RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  series={this.state.records.CreditCardSpend.modeldata}
                  categories={this.state.records.CreditCardSpend.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>

            <Col span="12">
              {this.state.records ? (
                <ApexLine
                  title="% Payment Change in total balance"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.PctChangeTotalBalance.modeldata}
                  categories={this.state.records.PctChangeTotalBalance.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>

          <Row>
            <Col span="12" style={{ padding: 5 }}>
              {this.state.records ? (
                <ApexLine
                  title="Credit Card Utilization (%)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisDecimalpt="1"
                  yaxisMin={45}
                  yaxisMax={55}
                  categories={this.state.records.CreditCardUtilization.xaxis}
                  series={this.state.records.CreditCardUtilization.modeldata}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="12" style={{ padding: 5 }}>
              {this.state.records ? (
                <ApexLine
                  title="Credit Card Overdraft Utilization (%)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisDecimalpt="1"
                  yaxisMin={0}
                  yaxisMax={7}
                  categories={
                    this.state.records.CreditCardOverdraftUtilization.xaxis
                  }
                  series={
                    this.state.records.CreditCardOverdraftUtilization.modeldata
                  }
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
          <Row>
            <Col span="12" style={{ padding: 5 }}>
              {this.state.records ? (
                <ApexLine
                  title="Credit Card Utilization By Risk Bands (%)"
                  chartType="bar"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisDecimalpt="1"
                  categories={
                    this.state.records.CreditCardUtilizationByRiskBands.xaxis
                  }
                  series={
                    this.state.records.CreditCardUtilizationByRiskBands
                      .modeldata
                  }
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="12" style={{ padding: 5 }}>
              {this.state.records ? (
                <ApexLine
                  title="Credit Card Overdraft Utilization By Risk Bands (%)"
                  chartType="bar"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisDecimalpt="1"
                  categories={
                    this.state.records.CreditCardUtilizationOverdraftByRiskBands
                      .xaxis
                  }
                  series={
                    this.state.records.CreditCardUtilizationOverdraftByRiskBands
                      .modeldata
                  }
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
        </fieldset>

        <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
          <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
            Behavioural KPIs - Account Liquidity
          </legend>
          <Row>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Average Monthly deposits (in thousands RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  series={this.state.records.MonthlyDepositsk.modeldata}
                  categories={this.state.records.MonthlyDepositsk.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Average Monthly Withdrawals (in thousands RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  series={this.state.records.MonthlyWithdrawlsk.modeldata}
                  categories={this.state.records.MonthlyWithdrawlsk.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="8">
              {this.state.records ? (
                <ApexLine
                  title="Average Monthly Liquidity (in thousands RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  chartType="area"
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.MonthlyLiquidityk.modeldata}
                  categories={this.state.records.MonthlyLiquidityk.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
        </fieldset>

        <fieldset style={{ border: "1px solid #e8e8e8", marginTop: 20 }}>
          <legend style={{ width: "auto", padding: "0 5px", fontSize: 15 }}>
            Behavioural KPIs - Loan Originations
          </legend>
          <Row>
            <Col span="12">
              {this.state.records ? (
                <ApexLine
                  title="New Loans (in thousands)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //chartType="area"
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.NewLoans.modeldata}
                  categories={this.state.records.NewLoans.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="12">
              {this.state.records ? (
                <ApexLine
                  title="New Loans Portfolio (in bn RD$)"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.NewLoansPortfoliobn.modeldata}
                  categories={this.state.records.NewLoansPortfoliobn.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
          <Row>
            <Col span="12">
              {this.state.records ? (
                <ApexStack
                  title="New Loans By Product (in thousands)"
                  chartdirection="true"
                  showYaxis="true"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //chartType="area"
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={this.state.records.NewLoanByProduct.modeldata}
                  categories={this.state.records.NewLoanByProduct.xaxis}
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
            <Col span="12">
              {this.state.records ? (
                <ApexStack
                  title="New Loans Portfolio By Product (in bn RD$)"
                  chartdirection="true"
                  showYaxis="true"
                  styleCard={{
                    boxShadow: "none",
                  }}
                  //yaxisMin={1}
                  //yaxisMax={5}
                  series={
                    this.state.records.NewLoanDisbursedByProduct.modeldata
                  }
                  categories={
                    this.state.records.NewLoanDisbursedByProduct.xaxis
                  }
                />
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Col>
          </Row>
        </fieldset>
       */}
      </React.Fragment>
    );
  }
}

export default Portfolio;
