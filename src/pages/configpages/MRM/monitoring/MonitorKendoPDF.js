import React, { Component } from "react";
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

import ApexCharts from "apexcharts";

import { AppContext } from "../../../../AppProvider";
import Breadcrumb from "../../../../utilities/Breadcrumb";
import Discrimination from "./discrimination";
import MonitoringFilter from "./monitoringFilter";
import Stability from "./stability";
import DataMonitoring from "./dataMonitoring";

import ConfusionRecall from "./confusion";
import KsChartTbl from "./ksChartTbl";
import GiniChartTbl from "./giniChartTbl";
import RankOrdering from "./rankOrdering";
import Divergence from "./divergence";
import DataOverview from "./dataOverview";
// import {
//   Chart,
//   ChartLegend,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
//   ChartCategoryAxis,
//   ChartCategoryAxisItem
// } from "@progress/kendo-react-charts";

import Auc from "./auc";
import "../mrm.css";

import TableData from "../../../../utilities/Table";
import Chart from "./ksChart";
import PageTitle from "../../../../utilities/PageTitle";

const { Content } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;

function callback(key) {
  console.log("Expand", key);
}
const panelHeader = {
    background: "rgb(32, 56, 100)",
  },
  panelHeading = {
    color: "#fff",
    fontWeight: "bold",
  };

const CommentList = ({ comments }) => (
  <List
    style={{ height: "" }}
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "comments" : "comment"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

class MonitorKendoPdf extends Component {
  constructor(props) {
    super(props);
    //console.log("constructorpdf121", props);

    this.state = {
      rankingOrderPdf: null,
      selected: 6,
      apiData: null,
      modelDetails: null,
    };
  }

  getDataUri = async (chartId) => {
    ApexCharts.exec(chartId, "dataURI").then((uri) => {
      console.log("uri recvd", uri);
      this.setState({ [chartId]: uri.imgURI });
    });
  };

  getSvg = (chartId) => {
    try {
      const chartInstance = window.Apex._chartInstances.find(
        (chart) => chart.id === chartId
      );
      // const base64 = await chartInstance.chart.dataURI();
      console.log("Chart Instance", chartInstance);
      const paper = chartInstance.chart.paper();
      const svg = paper.svg();
      console.log(svg);
      const dataUri = `url("data:image/svg+xml;base64,${btoa(svg)}")`;
      console.log("data uri", dataUri);
      this.setState({ [chartId]: dataUri });
    } catch (error) {
      console.log("getSvgERROR_PDF", error);
    }
    // return base64;
  };

  componentDidMount() {
    //console.log("componentDidMount pdf1211", this.props);
    // this.getDataUri();
  }

  //   static getDerivedStateFromProps(props, state) {
  //     console.log('getDerivedStateFromProps121');
  //     if (props.apiData !== state.apiData) {
  //         console.log('getDerivedStateFromProps1212');
  //       const modelDetails = props.apiData.modelDetails;
  //       if (modelDetails) {
  //         let rankingOrderPdf = "";
  //         console.log('modelDetails121',modelDetails);
  //         try {
  //             ApexCharts.exec("rankingOrderPdf", "dataURI").then((uri) => {
  //                 console.log("try uri recvd121", uri);
  //                 rankingOrderPdf = uri.imgURI;

  //             });
  //         } catch (error) {
  //             console.log("error121", error);
  //         }

  //         console.log("uri recvd121", rankingOrderPdf);

  //         return {
  //           rankingOrderPdf: rankingOrderPdf,
  //           selected: props.selected,
  //           apiData: props.apiData,
  //           modelDetails: modelDetails ? modelDetails : null,
  //           rankOrdering: modelDetails ? modelDetails.RankOrdering[0] : null,
  //           rankOrderingData: modelDetails
  //             ? modelDetails.RankOrderingData[0]
  //             : null,
  //         };
  //       }
  //     }
  //   }

  componentDidUpdate() {
    console.log("componentDidUpdate Pdf121", this.props);
    if (this.props.apiData != this.state.apiData) {
      console.log("ifcondUpd1212", this.props);
      const modelDetails = this.props.apiData.modelDetails;
      if (modelDetails) {
        console.log("modelDetails121", modelDetails);
        this.getDataUri("rankingOrderPdf");

        console.log("state121", this.state);
        //this.getSvg("kscurvePdf");
        this.setState({
          selected: this.props.selected,
          apiData: this.props.apiData,
          modelDetails: modelDetails ? modelDetails : null,
          rankOrdering: modelDetails ? modelDetails.RankOrdering[0] : null,
          rankOrderingData: modelDetails
            ? modelDetails.RankOrderingData[0]
            : null,
        });
      }
    }
  }

  render() {
    //console.log("render Pdf121", this.this.);
    let rankingSeriesNew = "";
    let rankingOptionsNew = "";
    if (this.state.rankOrdering) {
      rankingSeriesNew = [
        {
          name: "Actual Event %",
          data: this.state.rankOrdering.Actual_Bad,
        },
        {
          name: "Expected Event %",
          data: this.state.rankOrdering.Expected_Bad,
        },
      ];
      rankingOptionsNew = {
        xaxis: {
          categories: this.state.rankOrdering.Score_Decile || this.state.rankOrdering.Rating,
          title: {
            text: this.state.rankOrdering.Score_Decile?"Score Decile":"Rating",
            style: {
              fontWeight: 300,
            },
          },
          min: 0,
        },
        yaxis: {
          tickAmount: 6,
          min: 0,
          max: 60,
          title: {
            text: "Events Rate %",
            style: {
              fontWeight: 300,
            },
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
        },
      };
    }
    console.log("render121", this.state);
    return (
      <React.Fragment>
        <PageTitle title={"Model Monitor"} />
        <Content style={{ padding: "4px 24px", minHeight: 280 }}>
          {this.state.modelDetails ? (
            <React.Fragment>
              <MonitoringFilter
                onChange={this.handleOnChange}
                modelData={this.state.apiData}
              />

              <Row>
                <Col>
                  <Card
                    className="ant-card-small"
                    title="MODEL OBJECTIVE"
                    style={{ margin: "5px 0" }}
                  >
                    <div>
                      <p>{this.state.apiData.objective}</p>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Data Overview */}
              <TableData
                class="subTable"
                rowClassName="rowSubTable"
                dataSource={this.state.apiData.modelDetails.DataOverview[0]}
              />

              {/* Discrimination */}
              <TableData
                bordered={false}
                dataSource={this.state.apiData.modelDetails.discrimination}
                expand={true}
              />
              <ConfusionRecall apiData={this.state.apiData.modelDetails} />
              {/* <KsChartTbl apiData={this.state.apiData.modelDetails} /> */}
              <Row>
                <Col span={12}>
                  <Card
                    className="ant-card-small nopadding"
                    title={<span style={{ fontSize: "20px" }}>KS Chart</span>}
                  >
                    <div
                      className="App"
                      style={{
                        background: this.state.kscurvePdf,
                        width: 500,
                        height: 350,
                      }}
                    />
                  </Card>
                </Col>
                <Col span={12} className="pdLeft">
                  <TableData
                    rowClassName="rowSubTable"
                    dataSource={this.state.modelDetails.KSCurveData[0]}
                    scroll={true}
                  />
                </Col>
              </Row>
              {/* RankOrdering */}
              <Row style={{ background: "#fff" }}>
                <Col span={12}>
                  <Card
                    className="ant-card-small nopadding"
                    title={<span style={{ fontSize: "20px" }}></span>}
                  >
                    {this.state.rankingOrderPdf ? (
                      <React.Fragment>
                        <div
                          className="App"
                          style={{
                            background: this.state.rankingOrderPdf,
                          }}
                        />
                        <img src={this.state.rankingOrderPdf} alt="Image" />
                        <span>{this.state.rankingOrderPdf}</span>
                      </React.Fragment>
                    ) : null}
                  </Card>
                </Col>
                <Col span={12} className="pdLeft">
                  <TableData
                    class="subTable"
                    rowClassName="rowSubTable"
                    dataSource={this.state.rankOrderingData}
                  />
                </Col>
              </Row>
              <Auc apiData={this.state.apiData.modelDetails} />
              <GiniChartTbl apiData={this.state.apiData.modelDetails} />
              <Divergence apiData={this.state.apiData.modelDetails} />

              <Stability apiData={this.state.apiData.modelDetails} />

              <DataMonitoring chartData={this.state.apiData.modelDetails} />
            </React.Fragment>
          ) : null}
        </Content>
      </React.Fragment>
    );
  }
}

export default MonitorKendoPdf;
