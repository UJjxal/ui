import React, { Component } from "react";
import {
	Layout,
	Row,
	Col,
	Input,
	Form,
	Button,
	Tabs,
	Alert,
} from "antd";
import axios from "axios";
//import {PDFExport} from "@progress/kendo-react-pdf";
import {drawDOM, exportPDF} from '@progress/kendo-drawing';
import ApexCharts from "apexcharts";

import { AppContext } from "../../../../AppProvider";
import Loader from "../../../../utilities/Loader";
import Discrimination from "./discrimination";
import MonitoringFilter from "./monitoringFilter";
import Stability from "./stability";
import DataMonitoring from "./dataMonitoring";
import { API_ROOT, s3Url, CONTEXT, STATICMRM } from "../../../../config";
import ConfusionRecall from "./confusion";
import KsChartTbl from "./ksChartTbl";
import GiniChartTbl from "./giniChartTbl";
import EventChartTbl from "./eventChartTbl";
import RankOrdering from "./rankOrdering";
import Divergence from "./divergence";
import DataOverview from "./dataOverview";

import Auc from "./auc";
import "../mrm.css";
//import ReactECharts from 'echarts-for-react';
import MktRisk1Page from "../MktRisk1Page";
import PBMktRisk1Page from "../PBMktRisk1Page";
import PbRiskLgd1 from "../PbRiskLgd1";
import Comment from './Comment';
import util from "../../../../utilities/util";

const { Content } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;
//let defColors = ["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];
const $=window.$;

let pdfHtml=[];
async function generateHtmlForPdf(){
	pdfHtml=['<h3 class="mb15" style="color: rgb(14, 75, 113); font-size:20px">Model Monitor</h3>'];
	let obj=$("#pageContentBx");
	let filterHtml=obj.find(".filter-bx").html();
	pdfHtml.push(filterHtml);

	let tabs=obj.find(".tabs-bx .ant-tabs");
	let n=tabs.find(".ant-tabs-nav .ant-tabs-tab-btn").length;
	for(let i=0; i<n; i++){
		let tabBtn=tabs.find(".ant-tabs-nav .ant-tabs-tab-btn").eq(i);
		tabBtn.click();
		await util.sleep(500);

		let accordianBtn=tabs.find(".ant-collapse-header[aria-expanded='false']");
		if(accordianBtn.length){
			accordianBtn.click();
			await util.sleep(500);
		}

		let expandBtn=tabs.find(".ant-table-row-expand-icon-collapsed");
		if(expandBtn.length){
			expandBtn.click();
			await util.sleep(500);
		}

		let tabContentOb=tabs.find(".ant-tabs-content-holder .ant-tabs-tabpane").eq(i).clone();
		tabContentOb.find(".MuiFormControl-root").parent().remove();


		let h=`<div class="border mb15">
					<div class="text-primary bold600 mb15 p10 bg-light">${tabBtn.text()}</div>
					<div class="p10">${tabContentOb.html()}</div>
			</div>
			<div class="page-break"></div>`;
		
		pdfHtml.push(h);
	}
}

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
		const defaultSelected = this.props.match ? this.props.match.params.id : null;

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
				{sectionId: "DataOverview", comment: "" }, //index=0
				{sectionId: "Discrimination", comment: "" }, //index=1
				{sectionId: "CharacteristicStability", comment: "" }, //index=2
				{sectionId: "RankOrdering", comment: "" }, //index=3
				{sectionId: "PopulationStability", comment: "" }, //index=4
				{sectionId: "ModelPerformance", comment: "" },
				{sectionId: "BacktestingVaRForecasts", comment: "" },
				{sectionId: "StatisticalTests", comment: "" },
				{sectionId: "VaRInstrument", comment: "" },
				{sectionId: "modelPerformanceMktRisk", comment: "" },
				{sectionId: "BacktestingVaRForecastsMktRisk", comment: "" },
				{sectionId: "StatisticalTestsPOF", comment: "" },
				{sectionId: "StatisticalTestsNormality", comment: "" },
				{sectionId: "PortfolioComposition", comment: "" },
				{sectionId: "TopIndividualVaR", comment: "" },
				{sectionId: "ContributorVaR", comment: "" },

				{sectionId: "PB_RISK_LGD1", comment: "" },
				{sectionId: "PB_RISK_LGD2", comment: "" },
			],
			submittingcomment: false,
			modelId: "",
			isNewDetailPage: false
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
			? `${CONTEXT}/mrm/` + filename
			: API_ROOT + `modelInventory/${this.props.token}`;

		axios({
			method: "get",
			url: url,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		}).then((result) => {
			console.log("getModelList", this.props.modelIdByInventory, result);
			if (result.data.code === 200) {
				result.data.response.sort((a,b)=>a.modelId.localeCompare(b.modelId));
				result.data.response.forEach((v,i)=>{
					v.key=i+'';
				});

				this.setState({
					modelsList: result.data.response,
					apiListResponse: 200,
				});
			} else {
				//this.props.setAPICallErrors(result.data.message);
				this.setState({
					apiListResponse: 404,
				});
			}
		}).then(res => {
			if (this.props.modelIdByInventory && this.state.modelIdParms) {
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
		let model = data.filter((el) => el.key === val)[0];
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
			isNewDetailPage: ['MKT_RISK1', 'MKT_RISK2', 'PB_MKT_RISK1', 'PB_RISK_LGD1', 'PB_RISK_LGD2'].indexOf(model.modelId)>=0, //model.isNewDetailPage === 1,
			apiResponse: null
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
				? `${CONTEXT}/mrm/${filename}.json`
				: API_ROOT + `getModelComment/${modelId}/${this.props.token}`;
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
			console.log('comments', res.data);

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
				? `${CONTEXT}/mrm/${filename}.json`
				: API_ROOT + `modelMonitoring/${modelId}/${this.props.token}`;

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
				//console.log("getModelDetails", reponse.data);

				if (STATICMRM || (!STATICMRM && reponse.data.code === 200)) {
					let records = STATICMRM ? reponse.data:this.correctJsonFormat(reponse.data);

					if (records["DataOverview"]){
						if (records["Discrimination_Table"] || records["Final_Rating"] || records["Quantitative_Rating"] || records["Qualitative_Rating"]) {
							let disData=this.getModalDiscriminationData(records);
							records.discrimination=disData;
						}
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
						if (records['Model_Monitor'] || records['inmuebles']) {
							this.setState({
								apiResponse: 200,
								modelDetails: records,
								RankOrdering: null,
								PSI: null,
								CSI: null,
								modelId,
							});
							this.getModelComments(modelId);
						} else {
							this.setState({
								apiResponse: 404,
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
						apiResponse: 404,
					});
				}
			}).catch((e) => {
				console.log("error", e);
				this.setState({
					apiResponse: 404,
				});
			});
		}
	}

	getModalDiscriminationData=(records)=>{
		let apiData={}, k;
		for(k in records){
			if(k!=='Final_Rating' && k!=='Quantitative_Rating' && k!=='Qualitative_Rating'){
				apiData[k]=records[k];
			}
		}

		let discs=[];
		if(records["Final_Rating"]){
			for(k in records["Final_Rating"]){
				apiData[k]=records["Final_Rating"][k];
			}
			discs.push({label:'Final Rating', apiData:{...apiData}});
		}
		if(records["Quantitative_Rating"]){
			for(k in records["Quantitative_Rating"]){
				apiData[k]=records["Quantitative_Rating"][k];
			}
			discs.push({label:'Quantitative Rating', apiData:{...apiData}});
		}
		if(records["Qualitative_Rating"]){
			for(k in records["Qualitative_Rating"]){
				apiData[k]=records["Qualitative_Rating"][k];
			}
			discs.push({label:'Qualitative Rating', apiData:{...apiData}});
		}
		if(discs.length===0){
			discs.push({label:'', apiData:{...apiData}});
		}

		let allDisData=[];

		discs.forEach(v=>{
			const disData=v.apiData["Discrimination_Table"][0].map((item) => {
				if (item.Metric === "F1 Score") {
					return {
						...item,
						expandRow: <ConfusionRecall apiData={v.apiData} />,
					};
				} else if (item.Metric === "KS Statistic") {
					return {
						...item,
						expandRow: <KsChartTbl apiData={v.apiData} />,
					};
				} else if (item.Metric === "AUC") {
					return {
						...item,
						expandRow: <Auc apiData={v.apiData} />,
					};
				} else if (item.Metric === "Gini Score") {
					return {
						...item,
						expandRow: <GiniChartTbl apiData={v.apiData} />,
					};
				} 
				else if (item.Metric === "Event Distribution By Rating") {
					return {
						...item,
						expandRow: <EventChartTbl apiData={v.apiData} />,
					};
				} 
				else if (item.Metric === "Divergence") {
					return {
						...item,
						expandRow: <Divergence apiData={v.apiData} />,
					};
				} else {
					return item;
				}
			});

			allDisData.push({label:v.label, disData});
		});

		return allDisData;
	}

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

	handleChangecomment=(commentIndex, comment)=>{
		let {comments}=this.state;
		comments[commentIndex].comment=comment;
		this.setState({comments});
	};

	pdfBase64=()=>new Promise((resolve, reject)=>{
        let gridElement=document.getElementById('pdfContentBx');
        drawDOM(gridElement, {paperSize: "A2", margin: "2cm", scale: 0.7, keepTogether: ".ant-card", forcePageBreak: ".page-break"}).then((group)=>{
            return exportPDF(group);
        }).then((dataUri) => {
            let base64=dataUri.split(';base64,')[1];
            //console.log(base64);
            resolve(base64);
        });
    })

	downloadPdfNew=async()=>{
		util.showLoader();
		generateHtmlForPdf();
		setTimeout(async()=>{
			let html='<div class="mrm">'+pdfHtml.join("")+'</div>';
			$("#pdfContentBx").html(html);
			let pdfbase64=await this.pdfBase64();
			//console.log(pdfbase64);
			util.downloadPDFFromBase64(pdfbase64, this.state.modelId);
			util.hideLoader();
		}, 10000);
	}

	render() {
		
		return (
			<div className="antd-tbl-custom bold400">
				<AppContext.Consumer>
					{({ }) => {
						return (
							<React.Fragment>
								<div className="d-flex justify-content-between" style={{margin: '10px 25px 0 25px'}}>
									<h3 style={{color: 'rgb(14, 75, 113)'}} className="mb-0">Model Monitor</h3>
									<div>
										<Button
											className='k-button blue-bg mt5 ml-2'
											onClick={this.downloadPdfNew}
										>
											Download PDF
										</Button>
									</div>
								</div>

								<div id="pageContentBx">
									{this.state.apiListResponse ? (
										<>
											{this.state.apiListResponse === 404 ? (
												<div className="p50 text-center">Not Found</div>
											) : (
												<Content style={{ padding: "4px 24px", minHeight: 280 }}>
													<div className="filter-bx"> 
														<MonitoringFilter
															onChange={this.handleOnChange}
															modelData={{ ...this.state }}
															isNewDetailPage={this.state.isNewDetailPage}
														/>

														{this.state.modelDetails !== null &&
															<Row>
																<Col className="w-100">
																	<div className="border radius6 p15">
																		<strong>MODEL OBJECTIVE:</strong> {this.state.objective}
																	</div>
																</Col>
															</Row>
														}
													</div>

													{this.state.apiResponse ? (
														<div className="mrm">
															{this.state.apiResponse === 404 ? (
																<div className="p50 text-center">Not Found</div>
															) : (
																<div className="tabs-bx">
																	{this.state.isNewDetailPage === true ? (
																		<div>
																			{(this.state.modelId === 'MKT_RISK1' || this.state.modelId === 'MKT_RISK2') && 
																			<MktRisk1Page 
								 												data={this.state.modelDetails} 
																				modelId={this.state.modelId} 
																				submittingcomment={this.state.submittingcomment}
																				handleSubmitcomment={this.handleSubmitcomment}
																				handleChangecomment={this.handleChangecomment}	
																				setModelComments={this.setModelComments}
																				commentIndex={this.state.comments}
																			/>}
																			{this.state.modelId === 'PB_MKT_RISK1' && 
																			<PBMktRisk1Page 
																				data={this.state.modelDetails} 
																				modelId={this.state.modelId}  
																				submittingcomment={this.state.submittingcomment}
																				handleSubmitcomment={this.handleSubmitcomment}
																				handleChangecomment={this.handleChangecomment}	
																				setModelComments={this.setModelComments}
																				commentIndex={this.state.comments}
																			/>}
																			{(this.state.modelId === 'PB_RISK_LGD1' || this.state.modelId === 'PB_RISK_LGD2') && 
																			<PbRiskLgd1 
																				data={this.state.modelDetails} 
																				modelId={this.state.modelId}  
																				submittingcomment={this.state.submittingcomment}
																				handleSubmitcomment={this.handleSubmitcomment}
																				handleChangecomment={this.handleChangecomment}	
																				setModelComments={this.setModelComments}
																				commentIndex={this.state.comments}
																			/>}
																		</div>
																	) : (
																		<Tabs
																			type="card"
																			defaultActiveKey="1"
																			tabPosition="top"
																			//style={{ height: 220 }}
																			className="tabWidthMM"
																		>
																			{this.state.modelDetails.DataOverview ? (
																				<TabPane tab="Data Overview" key={1}>
																					<DataOverview apiData={this.state.modelDetails} />
																					{this.state.modelDetails?.DataOverview[0].map(item => {
																						let dev = Object.values(item)[2]
																						let val = Object.values(item)[3]
																						if(item.key === 3){
																							if(dev == 0 && val >= 1){
																								return(
																									<Alert className="mt-3" message="Model validation may not be accurate as there are no defaults in the development set." type="info" showIcon banner />
																								)
																							}else if(dev == 0 && val == 0){
																								return(
																									<Alert className="mt-3" message="Model validation  is not possible as there are no defaults in the development or validation set." type="info" showIcon banner />	
																								)
																							}else if(dev == '-' && val == 0){
																								return(
																									<Alert className="mt-3" message="Model validation may not be accurate as there are no defaults in the development set." type="info" showIcon banner />	
																								)
																							}
																							
																						}
																						
																					})}
																					
																					<Comment
																						submittingcomment={this.state.submittingcomment}
																						handleSubmitcomment={() => this.handleSubmitcomment("DataOverview")}
																						commentIndex={this.state.comments[0].comment}
																						id="DataOverview"
																						onChange={(e) => this.handleChangecomment(0, e.target.value)}
																					/>
																				</TabPane>
																			) : null}

																			{(this.state.modelDetails.Discrimination_Table || this.state.modelDetails.Final_Rating || this.state.modelDetails.Quantitative_Rating || this.state.modelDetails.Qualitative_Rating) ? (
																			<TabPane tab="Model Discrimination" key={2}>
																				{this.state.modelDetails ? (
																					<Discrimination apiData={this.state.modelDetails} />
																				) : (
																					<span>Loading...</span>
																				)}
																				<Comment
																					submittingcomment={this.state.submittingcomment}
																					handleSubmitcomment={() => this.handleSubmitcomment("Discrimination")}
																					comment={this.state.comments[1].comment}
																					id="Discrimination"
																					onChange={(e) => this.handleChangecomment(1, e.target.value)}
																				/>
																			</TabPane>
																			):null}

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
																					<Comment
																						submittingcomment={this.state.submittingcomment}
																						handleSubmitcomment={() => this.handleSubmitcomment("RankOrdering")}
																						comment={this.state.comments[3].comment}
																						id="RankOrdering"
																						onChange={(e) => this.handleChangecomment(3, e.target.value)}
																					/>
																				</TabPane>
																			) : null}

																			{this.state.PSI ? (
																				<TabPane tab="Population Stability" key={4}>
																					{this.state.modelDetails ? (
																						<Stability apiData={this.state.modelDetails} />
																					) : (
																						<span>Loading...</span>
																					)}
																					<Comment
																						submittingcomment={this.state.submittingcomment}
																						handleSubmitcomment={() => this.handleSubmitcomment("PopulationStability")}
																						comment={this.state.comments[4].comment}
																						id="PopulationStability"
																						onChange={(e) => this.handleChangecomment(4, e.target.value)}
																					/>
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
																					<Comment
																						submittingcomment={this.state.submittingcomment}
																						handleSubmitcomment={() => this.handleSubmitcomment("CharacteristicStability")}
																						comment={this.state.comments[2].comment}
																						id="CharacteristicStability"
																						onChange={(e) => this.handleChangecomment(2, e.target.value)}
																					/>
																				</TabPane>
																			) : null}
																		</Tabs>
																	)}
																</div>
															)}
														</div>
													) : (
														<div>
															{this.state.modelId.length ? (
																<Loader style={{ marginLeft: "40%" }} />
															) : (
																<div className="p50 text-center">Please Select Model ID or Any Filter</div>
															)}
														</div>
													)}
												</Content>
											)}
										</>
									) : (
										<div>
											{this.state.modelId.length ? (
												<Loader style={{ marginLeft: "40%" }} />
											) : (
												<div className="p50 text-center">Please Select Model ID or Any Filter</div>
											)}
										</div>
									)}
								</div>
							</React.Fragment>
						);
					}}
				</AppContext.Consumer>

				{this.state.selected ? (
					<div id="pdfContentBxParent" style={{position: "absolute", left:"-3000px", top:0, width:'100%'}}>
						<div id="pdfContentBx">
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

// export default Monitoring;

export default props => (
	<AppContext.Consumer>
		{({ modelIdByInventory }) => {
			return <Monitoring {...props} modelIdByInventory={modelIdByInventory} />
		}}
	</AppContext.Consumer>
)
