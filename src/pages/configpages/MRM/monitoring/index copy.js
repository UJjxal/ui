import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Input,
  Form,
  Button,
  Tabs,
  Collapse
} from "antd";
import axios from "axios";
import { PDFExport } from "@progress/kendo-react-pdf";
import ApexCharts from "apexcharts";

import { AppContext } from "../../../../AppProvider";
import Loader from "../../../../utilities/Loader";
import PageTitle from "../../../../utilities/PageTitle";
import Discrimination from "./discrimination";
import MonitoringFilter from "./monitoringFilter";
import Stability from "./stability";
import DataMonitoring from "./dataMonitoring";
import { API_ROOT, s3Url, CONTEXT, STATICMRM } from "../../../../config";
import ConfusionRecall from "./confusion";
import KsChartTbl from "./ksChartTbl";
import GiniChartTbl from "./giniChartTbl";
import RankOrdering from "./rankOrdering";
import Divergence from "./divergence";
import DataOverview from "./dataOverview";

import Monitorpdf from "./MonitorKendoFnPDF";
import Auc from "./auc";
import Chart from "./ksChart";
import BarChart from "./barChart";
import "../mrm.css";
import { TextField } from "@material-ui/core";
//import ReactECharts from 'echarts-for-react';
import NewDetailPage from "../NewDetailPage";

const { Content } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;
let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div style={{ background: "#fff", marginRight: "0" }}>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        style={{ float: "left", margin: "1%" }}
      >
        Add Comment
      </Button>
      <TextArea
        rows={2}
        onChange={onChange}
        value={value}
        style={{ margin: "1%", width: "80%" }}
      />
    </Form.Item>
  </div>
);

class Monitoring extends Component {
  constructor(props) {
    super(props);
    const defaultSelected=this.props.match?this.props.match.params.id:null;

    this.state = {
      apiListResponse: null,
      apiResponse: null,
      selected: defaultSelected,
      riskRatingStatus: "orange",
      discriminationStatus: "green",
      rankOrderingStatus: "orange",
      psiStatus: "green",
      csiStatus: "orange",
      apiData: [],
      modelDetails: null,
      modelsList: null,
      modelIdParms: true,
      objective: "",
      RankOrdering: null,

      comments: [
        { sectionId: "DataOverview", comment: "" }, //index=0
        { sectionId: "Discrimination", comment: "" }, //index=1
        { sectionId: "CharacteristicStability", comment: "" }, //index=2
        { sectionId: "RankOrdering", comment: "" }, //index=3
        { sectionId: "PopulationStability", comment: "" }, //index=4
      ],
      submittingcomment: false,
      modelId: "",
	  isNewDetalPage:false
    };
  }

  /** calling once when component is render */
  componentDidMount() {
    this.getModelList();
    //this.getModelDetails(this.state.selected);
  }

  /** get all models list */
  getModelList = async () => {
   let filename = "data.json";
  
   let url = STATICMRM
   ?`${CONTEXT}/mrm/` + filename
   :API_ROOT + `modelInventory/${this.props.token}`;

    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      //console.log("getModelList", result);
     if (result.data.code === 200) {
        this.setState({
          modelsList: result.data.response,
          apiListResponse: 200,
        });
     } else {
        //this.props.setAPICallErrors(result.data.message);
     }
    }).then(res => {
      if (this.props.modelIdByInventory !== null && this.state.modelIdParms) {
        this.handleOnChange(this.props.modelIdByInventory, this.state.modelsList);
        this.setState({
          modelIdParms: false
        });
      }
    });
    //data.discrimination = disData;
    //this.setState({ apiData: data });
  };

  /** calling when change any value from model detail box */
  handleOnChange = (val, data) => {
    //console.log("handleOnChangeval121", val);
    //console.log("handleOnChange121", data);
    let model=data.filter((el) => el.key === val)[0];
    this.setState({
      selected: val,
      modelId: model.modelId,
      riskRatingStatus: model.riskRatingStatus,
      discriminationStatus: model.discriminationStatus,
      rankOrderingStatus: model.rankOrderingStatus,
      psiStatus: model.psiStatus,
      csiStatus: model.csiStatus,
      objective: model.objective,
      rankingOrderPdf: null,
	    isNewDetalPage:model.isNewDetailPage===1
    });
    this.getModelDetails(val);
  };

  /** get image of chart data to display in pdf */
  getDataUri = (chartId) => {
    try {
      ApexCharts.exec(chartId, "dataURI").then((uri) => {
        // console.log("uri recvd", uri);
        this.setState({ [chartId]: uri.imgURI });
      });
    } catch (error) {
      console.log("error121", error);
    }
  };

  /** download pdf */
  downloadPdf = () => {
    this.pdfExportComponent.save();
  };

  /** creating pdf */
  creatingPdf = () => {
    this.getDataUri("kscurvePdf");
    this.getDataUri("psiBarPdf");
    this.getDataUri("csiBarPdf");
    this.getDataUri("rocCurvePdf");
    this.getDataUri("lorenzCurvePdf");
    this.getDataUri("divergenceCurvePdf");
    this.getDataUri("rankingOrderPdf");
  };

  /** get model risk detail by api */
  getModelRisk = (modelId) => {
    let url = s3Url("risk") + modelId;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    }).then((reponse) => {
      //console.log('reponseRisk121', reponse);
    });
  };

  /** get model's comments by api */
  getModelComments = (modelId) => {
   let filename = 'comments';
    if (modelId) {
    const url = STATICMRM
                ?`${CONTEXT}/mrm/${filename}.json`
                :API_ROOT + `getModelComment/${modelId}/${this.props.token}`;
      axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        responseType: "json",
      }).then((res) => {
        // console.log('comments', res.data);
        if (res.data.code === 200) {
          if (res.data.response.length > 0) {
            let comments = [...this.state.comments];

            res.data.response.forEach((entry) => {
              //[{sectionId: "DataOverview", comment: "A. "}, {sectionId: "DataOverview", comment: "A. "}]

              let findSection = comments.findIndex(
                (c) => c.sectionId === entry.sectionId
              );
              if (findSection > -1) {
                comments[findSection].comment = entry.comment;
              }
            });
            this.setState({ comments });
          }
        }
      });
    }
  };

  /** save model comments */
  setModelComments = (modelId, section, comment) => {
    //console.log("Submitting comments", modelId, section, comment);
    this.setState({ submittingcomment: true });
    let url = API_ROOT + `/addComment/${this.props.token}`;

    axios({
      method: "post",
      url: url,
      data: {
        modelId: modelId,
        sectionId: section,
        comment: comment,
      },
      responseType: "json",
    }).then((res) => {
      // console.log('comments', res.data);

      this.setState({ submittingcomment: false });
      this.getModelComments(modelId);
    });
  };

  /** update json format */
  correctJsonFormat = (record, key) => {
    //console.log('str121', record.response);
    let newRecord = [];
    try {
      let recordResponse = record.response;
      // recordResponse[Object.keys(recordResponse)[0]] = recordResponse[
      //   Object.keys(recordResponse)[0]
      // ].replace(/'':/g, '"_":');
      // console.log("key111", recordResponse);

      for (let index = 0; index < 21; index++) {
        let key = Object.keys(recordResponse)[index];
        newRecord[key] = JSON.parse(recordResponse[key].replace(/'/g, '"'));
        //newRecord[key] = JSON.parse(recordResponse[key]);
      }
      //console.log("newRecordstr121", newRecord);
    } catch (error) {
      //	console.log('errorJsonFormat', error);
    }

    return newRecord;
  };

  /** get a model details */
  getModelDetails = async (selected) => {
    let filename = "Final";
    let modelId = "";
    //console.log("selected", selected);
    if (selected) {
      if (this.state.modelsList) {
        modelId = this.state.modelsList.filter((el) => el.key === selected)[0].modelId;
        filename = modelId;
      }

      STATICMRM && this.getModelRisk(filename);
      let url = STATICMRM
                ?`${CONTEXT}/mrm/${filename}.json`
                :API_ROOT + `modelMonitoring/${modelId}/${this.props.token}`;

      axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        responseType: "json",
      }).then((reponse) => {
        console.log("getModelDetails", reponse.data);

      if (STATICMRM || (!STATICMRM && reponse.data.code === 200)) {
          let records = STATICMRM ?reponse.data
                                  :this.correctJsonFormat(reponse.data);

          if (records["Discrimination_Table"]) {
            const disData = records["Discrimination_Table"][0].map((item) => {
              if (item.Metric === "F1 Score") {
                return {
                  ...item,
                  expandRow: <ConfusionRecall apiData={records} />,
                };
              } else if (item.Metric === "KS Statistic") {
                return {
                  ...item,
                  expandRow: <KsChartTbl apiData={records} />,
                };
              } else if (item.Metric === "AUC") {
                return {
                  ...item,
                  expandRow: <Auc apiData={records} />,
                };
              } else if (item.Metric === "Gini Score") {
                return {
                  ...item,
                  expandRow: <GiniChartTbl apiData={records} />,
                };
              } else if (item.Metric === "Divergence") {
                return {
                  ...item,
                  expandRow: <Divergence apiData={records} />,
                };
              } else {
                return item;
              }
            });
            records.discrimination = disData;
            //console.log("records121", records);
            this.setState({
              apiResponse: 200,
              modelDetails: records,
              RankOrdering: records.RankOrdering ? records.RankOrdering : null,
              PSI: records.PSI ? records.PSI : null,
              CSI: records.CSI ? records.CSI : null,
              modelId,
            });
            //
            //Get Model Comments
            this.getModelComments(modelId);
          } else {
			  if(records['Model_Monitor']){
				this.setState({
					apiResponse: 200,
					modelDetails: records,
					RankOrdering: null,
					PSI: null,
					CSI: null,
					modelId,
				});
			  }else{
				this.setState({
					apiResponse: null,
					modelDetails: null,
					RankOrdering: null,
					PSI: null,
					CSI: null,
					modelId,
				});
			}
          }
        } else {
          this.setState({
            apiResponse: 400,
          });
        }
      });
    }
  };

  /** set discrimination data as per rendering requirement */
  setDiscriminationData = (data) => {
    //console.log("setDiscriminationData", data);
    const disData = data.Discrimination_Table[0].map((item) => {
      if (item.Metric === "F1 Score") {
        return {
          ...item,
          expandRow: <ConfusionRecall apiData={data} />,
        };
      } else if (item.Metric === "KS Statistic") {
        return {
          ...item,
          expandRow: <KsChartTbl apiData={data} />,
        };
      } else if (item.Metric === "AUC") {
        return {
          ...item,
          expandRow: <Auc apiData={data} />,
        };
      } else if (item.Metric === "Gini Score") {
        return {
          ...item,
          expandRow: <GiniChartTbl apiData={data} />,
        };
      } else if (item.Metric === "Divergence") {
        return {
          ...item,
          expandRow: <Divergence apiData={data} />,
        };
      } else {
        return item;
      }
    });
    data.discrimination = disData;
    this.setState({ apiData: data });
  };

  handleSubmitcomment = (placePosition) => {
    let { comments } = this.state;
    let sectionIndex = comments.findIndex((c) => c.sectionId === placePosition);
    let commentValue = comments[sectionIndex].comment;
    this.setModelComments(this.state.modelId, placePosition, commentValue);
  };

  handleChangecomment = (commentIndex, comment) => {
    let { comments } = this.state;
    comments[commentIndex].comment = comment;
    this.setState({ comments });
  };

  render() {
	  return <div>hhh</div>;
    /** as per pdf requirement convert chart into images */
    let rankingSeriesNew,
      rankingOptionsNew,
      ksSeries,
      ksOptions,
      psiSeries,
      psiOptions,
      csiSeries,
      csiOptions,
      rocSeries,
      rocOptions,
      lorenzSeries,
      lorenzOptions,
      divergenceSeries,
      divergenceOptions = "";
    if (this.state.modelDetails) {
      rankingSeriesNew = [
        {
          name: "Actual Event %",
          data: this.state.modelDetails.RankOrdering ? this.state.modelDetails.RankOrdering[0].Actual_Bad : null,
        },
        {
          name: "Expected Event %",
          data: this.state.modelDetails.RankOrdering ? this.state.modelDetails.RankOrdering[0].Expected_Bad : null,
        },
      ];
      rankingOptionsNew = {
        chartId: "rankingOrderPdf",
        xaxis: {
          categories: this.state.modelDetails.RankOrdering ? this.state.modelDetails.RankOrdering[0].Score_Decile : null,
          title: {
            text: "Score Decile",
            style: {
              fontWeight: 300,
            },
          },
          min: 0,
        },
        yaxis: {
          tickAmount: 6,
          min: 0,
          //max: 60,
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
      ksSeries = [
        {
          name: "Event %",
          data: this.state.modelDetails.KSCurve ? this.state.modelDetails.KSCurve[0].cum_eventrate : null,
        },
        {
          name: "Non-event %",
          data: this.state.modelDetails.KSCurve ? this.state.modelDetails.KSCurve[0].cum_noneventrate : null,
        },
      ];
      ksOptions = {
        chartId: "kscurvePdf",
        xaxis: {
          categories: this.state.modelDetails.KSCurve ? this.state.modelDetails.KSCurve[0].Score_Decile : null,
          title: {
            text: "Score Decile",
            style: {
              fontWeight: 300,
            },
          },
          min: 0,
        },
        yaxis: {
          title: {
            text: "Cumulative Event/ Non-Event %",
            style: {
              fontWeight: 300,
            },
          },
          labels: {
            formatter: function (value) {
              return value;
            },
          },
          min: 0,
          max: 100,
        },
      };
      psiSeries = [
        {
          name: "Actual",
          data: this.state.modelDetails.PSI ? this.state.modelDetails.PSI[0].Actual : null,
        },
        {
          name: "Expected",
          data: this.state.modelDetails.PSI ? this.state.modelDetails.PSI[0].Expected : null,
        },
      ];
      psiOptions = {
        chartId: "psiBarPdf",
        xaxis: {
          categories: this.state.modelDetails.PSI ? this.state.modelDetails.PSI[0].Score_Decile : null,
          title: {
            text: "Population Distribution",
            style: {
              fontWeight: 300,
            },
          },
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "%";
            },
          },
        },
        yaxis: {
          title: {
            text: "Score Range",
            style: {
              fontWeight: 300,
            },
          },
        },
      };
      csiSeries = this.state.modelDetails.CSI
        ? [
            {
              data: this.state.modelDetails.CSI[0].CSI_Score,
            },
          ]
        : null;
      csiOptions = this.state.modelDetails.CSI
        ? {
            chartId: "csiBarPdf",
            title: {
              text: "CSI Scores For Significant Variables",
            },
            xaxis: {
              categories: this.state.modelDetails.CSI ? this.state.modelDetails.CSI[0].Variable : null,
              title: {
                style: {
                  fontWeight: 300,
                },
              },
            },
            yaxis: {
              title: {
                text: "",
              },
            },
          }
        : null;
      rocSeries = [
        {
          name: "Model",
          data: this.state.modelDetails.ROCCurve ? this.state.modelDetails.ROCCurve[0].TruePositiveRate : null,
        },
        {
          name: "Random",
          data: this.state.modelDetails.ROCCurve ? this.state.modelDetails.ROCCurve[0].FalsePositiveRate : null,
        },
      ];
      rocOptions = {
        chartId: "rocCurvePdf",
        xaxis: {
          categories: this.state.modelDetails.ROCCurve ? this.state.modelDetails.ROCCurve[0].FalsePositiveRate : null,
          labels: {
            offsetX: 0,
            offsetY: -5,
          },
          title: {
            text: "False Positive Rate",
            style: {
              fontWeight: 300,
            },
          },
          type: "numeric",
          min: 0,
          max: 1,
        },
        yaxis: {
          title: {
            text: "True Positive Rate",
            style: {
              fontWeight: 300,
            },
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(1);
            },
          },
          min: 0,
          //max: 1
        },
      };
      lorenzSeries = [
        {
          name: "Model",
          data: this.state.modelDetails.LorenzCurve ? this.state.modelDetails.LorenzCurve[0].Cumulative_Event : null,
        },
        {
          name: "Random",
          data: this.state.modelDetails.LorenzCurve ? this.state.modelDetails.LorenzCurve[0].Cumulative_Total : null,
        },
      ];
      lorenzOptions = {
        chartId: "lorenzCurvePdf",
        xaxis: {
          categories: this.state.modelDetails.LorenzCurve ? this.state.modelDetails.LorenzCurve[0].Cumulative_Total : null,
          title: {
            text: "Cumulative Population %",
            style: {
              fontWeight: 300,
            },
          },
          min: 0,
        },
        yaxis: {
          title: {
            text: "Cumulative Events %",
            style: {
              fontWeight: 300,
            },
          },
          labels: {
            formatter: function (value) {
              return value;
            },
          },
          min: 0,
          max: 100,
        },
      };
      divergenceSeries = [
        {
          name: "Events",
          type: "area",
          data: this.state.modelDetails.DivergenceCurve ? this.state.modelDetails.DivergenceCurve[0].Events : null,
        },
        {
          name: "Non-Events",
          type: "area",
          data: this.state.modelDetails.DivergenceCurve ? this.state.modelDetails.DivergenceCurve[0].Non_Events : null,
        },
      ];
      divergenceOptions = {
        chartId: "divergenceCurvePdf",
        xaxis: {
          categories: this.state.modelDetails.DivergenceCurve ? this.state.modelDetails.DivergenceCurve[0].Score : null,
          title: {
            text: "Score Bins",
            style: {
              fontWeight: 300,
            },
          },
          min: 0,
        },
        yaxis: [
          {
            title: {
              text: "Events",
              style: {
                fontWeight: 300,
              },
            },
          },
          {
            opposite: true,
            title: {
              text: "Non-Events",
              style: {
                fontWeight: 300,
              },
            },
          },
        ],
      };
    }

    return (
      <React.Fragment>
        <AppContext.Consumer>
          {({}) => {

            return (
              <React.Fragment>
                <button
                  style={{ position: "absolute", left: "87%", top: "3px" }}
                  className="k-button"
                  onClick={() => this.creatingPdf()}
                >
                  Create PDF
                </button>
                {this.state.rankingOrderPdf ? (
                  <button
                    style={{ position: "absolute", left: "87%", top: "3px" }}
                    className="k-button"
                    onClick={() => this.downloadPdf()}
                  >
                    Download PDF
                  </button>
                ) : null}

                {/* <Breadcrumb title="Model Monitor" /> */}
                <PageTitle title={"Model Monitor"} />
                {this.state.apiListResponse ? (
                  <Content style={{ padding: "4px 24px", minHeight: 280 }}>
                    <MonitoringFilter
                      onChange={this.handleOnChange}
                      modelData={this.state}
                    />

                    <Row>
                      <Col className="w-100">
                        <div className="mb15">
                          <Card title="MODEL OBJECTIVE" size="small">
                            {this.state.objective}
                          </Card>
                        </div>
                      </Col>
                    </Row>

                    {this.state.apiResponse ? (
						<div>
							{this.state.isNewDetalPage===true?(
								<div>
									<NewDetailPage data={this.state} />
								</div>
							):(
								<div className="mrm">
									<Tabs
										defaultActiveKey="1"
										tabPosition="top"
										//style={{ height: 220 }}
										className="tabCustomization tabWidthMM"
									>
										{this.state.modelDetails.DataOverview ? (
										<TabPane tab="Data Overview" key={1}>
											<DataOverview apiData={this.state.modelDetails} />
                        {/* {this.state.modelId==='INTERNAL_RATING' &&
                          <div className="mt-2 mb-2 pl-2 pr-2">
                            <Collapse defaultActiveKey={[]}>
                              <Collapse.Panel header="View Chart" key="1" extra={<i className="fa fa-line-chart"></i>}>
                                <ReactECharts 
                                  option={{
                                    grid:{top: 30, right: 8, bottom:50, left: 50},
                                    title:{
                                      top:'bottom',
                                      left:'center',
                                      text:"Score Decile"
                                    },
                                    xAxis:{
                                    type: 'category',
                                    data: ['0', '1', '2', '4', '6', '8', '10', '12'],
                                    },
                                    yAxis: {
                                    type: 'value',
                                    },
                                    series: [
                                      {
                                        data: [5, 10, 100, 300, 150, 100, 50, 5],
                                        type: 'line',
                                        smooth: true,
                                      }
                                    ],
                                    
                                    color:defColors,
                                    tooltip: {
                                      trigger: 'axis',
                                    },
                                  }} 
                                  style={{height:'300px'}} 
                                />
                              </Collapse.Panel>
                            </Collapse>
                          </div>
                          } */}

											<div className="d-flex flex-row justify-content-between align-items-start p-2">
											<Button
												className="mr-2"
												type="primary"
												onClick={() =>
												this.handleSubmitcomment("DataOverview")
												}
											>
												{this.state.submittingcomment ? (
												<Loader
													type="TailSpin"
													color="#000000"
													height={20}
													style={{ color: "#000000" }}
												/>
												) : (
												"Submit Comment"
												)}
											</Button>

											<TextField
												label=""
												multiline
												rows={3}
												id="DataOverview"
												value={this.state.comments[0].comment}
												placeholder="Add Comment"
												variant="outlined"
												autoComplete="off"
												style={{
												width: "90%",
												backgroundColor: "#fff",
												borderRadius: "4px",
												}}
												onChange={(e) =>
												this.handleChangecomment(0, e.target.value)
												}
											/>
											</div>
										</TabPane>
										) : null}

										<TabPane tab="Model Discrimination" key={2}>
										{this.state.modelDetails ? (
											<Discrimination apiData={this.state.modelDetails} />
										) : (
											<span>Loading...</span>
										)}
										<div className="d-flex flex-row justify-content-between align-items-start p-2">
											{this.state.submittingcomment ? (
											<Loader
												type="TailSpin"
												color="#000000"
												height={20}
												style={{ color: "#000000" }}
											/>
											) : (
											<Button
												onClick={() =>
												this.handleSubmitcomment("Discrimination")
												}
												className="mr-2"
												type="primary"
											>
												Submit Comment
											</Button>
											)}
											<TextField
											label=""
											multiline
											rows={3}
											id="Discrimination"
											value={this.state.comments[1].comment}
											placeholder="Add Comment"
											variant="outlined"
											autoComplete="off"
											style={{
												width: "90%",
												backgroundColor: "#fff",
												borderRadius: "4px",
											}}
											onChange={(e) =>
												this.handleChangecomment(1, e.target.value)
											}
											/>
										</div>
										</TabPane>

										{this.state.RankOrdering ? (
										<TabPane tab="Rank Ordering" key={3}>
											{this.state.modelDetails ? (
											<RankOrdering
												rankData={
												this.state.modelDetails.RankOrdering[0]
												}
												table={
												this.state.modelDetails.RankOrderingData[0]
												}
											/>
											) : (
											<span>Loading...</span>
											)}
											<div className="d-flex flex-row justify-content-between align-items-start p-2">
											<Button
												onClick={() =>
												this.handleSubmitcomment("RankOrdering")
												}
												className="mr-2"
												type="primary"
											>
												{this.state.submittingcomment ? (
												<Loader
													type="TailSpin"
													color="#000000"
													height={20}
													style={{ color: "#000000" }}
												/>
												) : (
												"Submit Comment"
												)}
											</Button>

											<TextField
												label=""
												multiline
												rows={3}
												id="RankOrdering"
												value={this.state.comments[3].comment}
												placeholder="Add Comment"
												variant="outlined"
												autoComplete="off"
												style={{
												width: "90%",
												backgroundColor: "#fff",
												borderRadius: "4px",
												}}
												onChange={(e) =>
												this.handleChangecomment(3, e.target.value)
												}
											/>
											</div>
										</TabPane>
										) : null}

										{this.state.PSI ? (
										<TabPane tab="Population Stability" key={4}>
											{this.state.modelDetails ? (
											<Stability apiData={this.state.modelDetails} />
											) : (
											<span>Loading...</span>
											)}
											<div className="d-flex flex-row justify-content-between align-items-start p-2">
											<Button
												onClick={() =>
												this.handleSubmitcomment(
													"PopulationStability"
												)
												}
												className="mr-2"
												type="primary"
											>
												{this.state.submittingcomment ? (
												<Loader
													type="TailSpin"
													color="#000000"
													height={20}
													style={{ color: "#000000" }}
												/>
												) : (
												"Submit Comment"
												)}
											</Button>

											<TextField
												label=""
												multiline
												rows={3}
												id="PopulationStability"
												value={this.state.comments[4].comment}
												placeholder="Add Comment"
												variant="outlined"
												autoComplete="off"
												style={{
												width: "90%",
												backgroundColor: "#fff",
												borderRadius: "4px",
												}}
												onChange={(e) =>
												this.handleChangecomment(4, e.target.value)
												}
											/>
											</div>
										</TabPane>
										) : null}

										{this.state.CSI ? (
										<TabPane tab="Characteristic Stability" key={5}>
											{this.state.modelDetails ? (
											<DataMonitoring
												chartData={this.state.modelDetails}
											/>
											) : (
											<span>Loading...</span>
											)}

											<div className="d-flex flex-row justify-content-between align-items-start p-2">
											<Button
												onClick={() =>
												this.handleSubmitcomment(
													"CharacteristicStability"
												)
												}
												className="mr-2"
												type="primary"
											>
												{this.state.submittingcomment ? (
												<Loader
													type="TailSpin"
													color="#000000"
													height={20}
													style={{ color: "#000000" }}
												/>
												) : (
												"Submit Comment"
												)}
											</Button>

											<TextField
												label=""
												multiline
												rows={3}
												id="CharacteristicStability"
												value={this.state.comments[2].comment}
												placeholder="Add Comment"
												variant="outlined"
												autoComplete="off"
												style={{
												width: "90%",
												backgroundColor: "#fff",
												borderRadius: "4px",
												}}
												onChange={(e) =>
												this.handleChangecomment(2, e.target.value)
												}
											/>
											</div>
										</TabPane>
										) : null}
									</Tabs>
								</div>
							)}
						</div>
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </Content>
                ) : (
                  <Loader style={{ marginLeft: "40%" }} />
                )}
              </React.Fragment>
            );
          }}
        </AppContext.Consumer>
        {this.state.selected ? (
          <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
            {this.state.modelDetails ? (
              <React.Fragment>
                {this.state.RankOrdering ? ( 
                <>
                  <Chart
                    series={rankingSeriesNew}
                    options={rankingOptionsNew}
                    height={350}
                    width={"500"}
                  />
                  <Chart
                    series={ksSeries}
                    options={ksOptions}
                    height={350}
                    width={"500"}
                  />
                  <Chart
                    series={rocSeries}
                    options={rocOptions}
                    height={350}
                    width={"500"}
                  />
                  <Chart
                    series={lorenzSeries}
                    options={lorenzOptions}
                    height={350}
                    width={"500"}
                  />
                  <Chart
                    series={divergenceSeries}
                    options={divergenceOptions}
                    height={350}
                    width={"500"}
                  />
                </>) : null}
                {this.state.PSI ? (
                    <BarChart
                      series={psiSeries}
                      options={psiOptions}
                      chartId={"psiBarPdf"}
                      height={350}
                    />
                ) : null}
                {this.state.CSI ? (
                    <BarChart
                      series={csiSeries}
                      options={csiOptions}
                      chartId={"csiBarPdf"}
                      height={350}
                    />
                ) : null}
              </React.Fragment>
            ) : null}
            <PDFExport
              forcePageBreak=".page-break"
              keepTogether=".ant-card"
              paperSize="A2"
              margin="2cm"
              ref={(component) => (this.pdfExportComponent = component)}
            >
              <Monitorpdf selected={this.state.selected} apiData={this.state} />
            </PDFExport>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

// export default Monitoring;

export default props => ( <AppContext.Consumer>
  {({modelIdByInventory}) => {
     return <Monitoring {...props} modelIdByInventory={modelIdByInventory} />
  }}
</AppContext.Consumer>
)
