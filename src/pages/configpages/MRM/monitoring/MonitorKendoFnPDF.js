import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Collapse,
  Icon,
  Input,
  List,
  Comment,
  Form,
  Button,
  Tabs,
} from "antd";

import TableData from "../../../../utilities/Table";
import MonitoringFilter from "./monitoringFilter";
import ConfusionRecall from "./confusion";
import Divergence from "./divergence";

const MonitorKendoFnPdf = (props) => {
  console.log("props121", props);
  const divergence = [0, 1, 2, 3];
  const monthlyPSI = [
    { key: 0, date: "31/01/2018", monthly_psi: 0.253 },
    { key: 1, date: "28/02/2018", monthly_psi: 0.294 },
    { key: 2, date: "31/03/2018", monthly_psi: 0.299 },
    { key: 3, date: "30/04/2018", monthly_psi: 0.265 },
    { key: 4, date: "31/05/2018", monthly_psi: 0.254 },
    { key: 5, date: "30/06/2018", monthly_psi: 0.305 },
    { key: 6, date: "31/07/2018", monthly_psi: 0.273 },
  ];
  const monthlyCSI = [
    { key: 0, date: "31/01/2018", monthly_psi: 0.253 },
    { key: 1, date: "28/02/2018", monthly_psi: 0.294 },
    { key: 2, date: "31/03/2018", monthly_psi: 0.299 },
    { key: 3, date: "30/04/2018", monthly_psi: 0.265 },
    { key: 4, date: "31/05/2018", monthly_psi: 0.254 },
    { key: 5, date: "30/06/2018", monthly_psi: 0.305 },
    { key: 6, date: "31/07/2018", monthly_psi: 0.273 },
  ];

  return (
    <React.Fragment>
      {props.apiData.rankingOrderPdf ? (
        <React.Fragment>
          <MonitoringFilter modelData={props.apiData} />

          <Row>
            <Col>
              <Card
                className="ant-card-small"
                title="MODEL OBJECTIVE"
                style={{ margin: "5px 0" }}
              >
                <div>
                  <p>{props.apiData.objective}</p>
                </div>
              </Card>
            </Col>
          </Row>

          <div className="section-title">Data Overview</div>
          <TableData
            class="subTable"
            rowClassName="rowSubTable"
            dataSource={props.apiData.modelDetails.DataOverview[0]}
          />

          {props.apiData.comments[0].comment !== "" ? (
            <Row>
              <Col>
                <Card className="ant-card-small" title="Comment">
                  <div>{props.apiData.comments[0].comment}</div>
                </Card>
              </Col>
            </Row>
          ) : null}

          <div className="section-title page-break">Model Discrimination</div>
          <TableData
            bordered={false}
            dataSource={props.apiData.modelDetails.discrimination[0].disData}
            expand={true}
          />

          <ConfusionRecall apiData={props.apiData.modelDetails} />

          <Row className="d-flex">
            <Col span={12}>
              <Card
                className="ant-card-small nopadding"
                title={<span style={{ fontSize: "20px" }}>KS Chart</span>}
              >
                <div
                  className="App"
                  style={{
                    background: props.apiData.kscurvePdf,
                    // width: 500,
                    //height: 350,
                  }}
                />
                <img
                  src={props.apiData.kscurvePdf}
                  className="w-100"
                  alt="Chart"
                />
              </Card>
            </Col>
            <Col span={12} className="pdLeft ant-col-inner">
              <TableData
                rowClassName="rowSubTable"
                dataSource={props.apiData.modelDetails.KSCurveData[0]}
                scroll={true}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card
                className="ant-card-small nopadding"
                title={<span style={{ fontSize: "20px" }}>ROC Curve</span>}
              >
                <img src={props.apiData.rocCurvePdf} alt="Chart" />
              </Card>
            </Col>
            <Col span={12} className="pdLeft ant-col-inner">
              <TableData
                rowClassName="rowSubTable"
                dataSource={props.apiData.modelDetails.ROCData[0]}
                scroll={true}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card
                className="ant-card-small nopadding"
                title={
                  <span style={{ fontSize: "20px" }}>Lorenz Curve Chart</span>
                }
              >
                <img src={props.apiData.lorenzCurvePdf} alt="Chart" />
              </Card>
            </Col>
            <Col span={12} className="pdLeft ant-col-inner">
              <TableData
                rowClassName="rowSubTable"
                dataSource={props.apiData.modelDetails.LorenzCurveData[0]}
                scroll={true}
              />
            </Col>
          </Row>

          {props.apiData.modelDetails.DivergenceData ? (
            <Row className="d-flex">
              <Col span={12}>
                <Card
                  className="ant-card-small nopadding h-100"
                  title={
                    <span style={{ fontSize: "20px" }}>Divergence Chart</span>
                  }
                >
                  <img src={props.apiData.divergenceCurvePdf} alt="Chart" />
                </Card>
              </Col>

              <Col span={12} className="pdLeft">
                <Card
                  className="ant-card-small nopadding"
                  title={
                    <span style={{ fontSize: "20px" }}>Divergence Summary</span>
                  }
                >
                  <div
                    className="event-data-metric"
                    style={{ padding: "5% 0px 16% 0" }}
                  >
                    {divergence.map(function (i) {
                      return (
                        <Row gutter={[24, 48]} key={i}>
                          <Col key="{++i}">
                            <div>
                              <p className="mb">
                                {
                                  props.apiData.modelDetails.DivergenceData[0][
                                    i
                                  ].Metric
                                }
                              </p>
                              <p className="mb">
                                {
                                  props.apiData.modelDetails.DivergenceData[0][
                                    i
                                  ].Value
                                }
                              </p>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
                  </div>
                </Card>
              </Col>
            </Row>
          ) : null}

          {props.apiData.comments[1].comment !== "" ? (
            <Row>
              <Col>
                <Card className="ant-card-small" title="Comment">
                  <div>{props.apiData.comments[1].comment}</div>
                </Card>
              </Col>
            </Row>
          ) : null}

          <div className="section-title page-break">Rank Ordering</div>
          <Row style={{ background: "#fff" }}>
            <Col span={12}>
              <Card
                className="ant-card-small nopadding"
                title={<span style={{ fontSize: "20px" }}></span>}
              >
                <div
                  className="App"
                  style={{
                    background: props.apiData.rankingOrderPdf,
                  }}
                />
                <img src={props.apiData.rankingOrderPdf} alt="Chart" />
              </Card>
            </Col>
            <Col span={12} className="pdLeft ant-col-inner">
              <TableData
                class="subTable"
                rowClassName="rowSubTable"
                dataSource={props.apiData.modelDetails.RankOrderingData[0]}
              />
            </Col>
          </Row>
          {props.apiData.comments[3].comment !== "" ? (
            <Row>
              <Col>
                <Card className="ant-card-small" title="Comment">
                  <div>{props.apiData.comments[3].comment}</div>
                </Card>
              </Col>
            </Row>
          ) : null}

          {props.apiData.modelDetails.PSIData ? (
            <>
              <div className="section-title page-break">
                Population Stability
              </div>
              <Row>
                <Col span={24}>
                  <TableData
                    class="subTable"
                    rowClassName="rowSubTable"
                    dataSource={props.apiData.modelDetails.PSIData[0]}
                  />
                </Col>
              </Row>
              <Row className="d-flex">
                <Col span={24}>
                  <div className="section-title text-center">
                    {`Population Stability Index = ` +
                      calculatePsi(props.apiData.modelDetails.PSIData[0])}
                  </div>
                </Col>
              </Row>
              <Row className="d-flex">
                <Col span={12}>
                  <Card
                    className="ant-card-small nopadding"
                    title={<span style={{ fontSize: "20px" }}></span>}
                  >
                    <div
                      className="App"
                      style={{
                        background: props.apiData.psiBarPdf,
                      }}
                    />
                    <img
                      src={props.apiData.psiBarPdf}
                      alt="Chart"
                      className="w-100 p-2"
                    />
                  </Card>
                </Col>
                <Col span={12} className="pdLeft ant-col-inner">
                  <Card className="ant-card-small nopadding h-100">
                    <div
                      style={{
                        background: "rgb(32, 56, 100)",
                        color: "#fff",
                        padding: "10px",
                        margin: "40px",
                      }}
                    >
                      <div>
                        <p>Thresholds:</p>
                        <p>
                          0.1 or Less: Little or no difference between two score
                          distributions
                        </p>
                        <p>
                          0.1 to 0.25: Some change has taken place, but it is
                          too small to determine whether it is an isolated
                          incident or a part of a longer trend
                        </p>
                        <p>
                          {">"} 0.25: Large shift. The population should be
                          looked at on individual characteristic basis for root
                          cause analysis
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex">
                <Col span={24}>
                  <TableData
                    className="subTable"
                    rowClassName="rowSubTable"
                    dataSource={props.apiData.modelDetails.MonthlyPSI}
                  />
                </Col>
              </Row>
              {props.apiData.comments[4].comment !== "" ? (
                <Row>
                  <Col>
                    <Card className="ant-card-small" title="Comment">
                      <div>{props.apiData.comments[4].comment}</div>
                    </Card>
                  </Col>
                </Row>
              ) : null}
            </>
          ) : null}
          {props.apiData.modelDetails.CSIData ? (
            <>
              <div className="section-title page-break">
                Characteristic Stability
              </div>
              <Row className="d-flex">
                <Col span={12}>
                  <Card
                    className="ant-card-small nopadding h-100"
                    title={<span style={{ fontSize: "20px" }}></span>}
                  >
                    <div
                      className="App"
                      style={{
                        background: props.apiData.csiBarPdf,
                      }}
                    />
                    <img
                      src={props.apiData.csiBarPdf}
                      alt="Chart"
                      className="w-100 p-2"
                    />
                  </Card>
                </Col>
                <Col span={12} className="pdLeft ant-col-inner">
                  <TableData
                    className="subTable"
                    rowClassName="rowSubTable"
                    dataSource={props.apiData.modelDetails.CSIData[0]}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <TableData
                    className="subTable"
                    rowClassName="rowSubTable"
                    dataSource={props.apiData.modelDetails.MonthlyCSI}
                  />
                </Col>
              </Row>
              {props.apiData.comments[2].comment !== "" ? (
                <Row>
                  <Col>
                    <Card className="ant-card-small" title="Comment">
                      <div>{props.apiData.comments[2].comment}</div>
                    </Card>
                  </Col>
                </Row>
              ) : null}
            </>
          ) : null}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

function calculatePsi(records) {
  let sum = records.reduce(function (total, record) {
    return total + record["Contribution To PSI"];
  }, 0);
  return sum.toFixed(3);
}

export default MonitorKendoFnPdf;
