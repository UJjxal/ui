import "./mrm.css";
import React, {useState, useEffect} from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import {Tabs, Tooltip, Empty} from "antd";
import Comment from "./monitoring/Comment";
const {TabPane}=Tabs;

let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF", "#00FF00"];

function PbRiskLgd1(props){
	const [modelId, setModelId]=useState(props.modelId);
	const [data, setData]=useState(null);

	useEffect(()=>{
		setData(props.data.inmuebles);
		console.log("inmuebles", props.data)
	}, [props.data]);

	useEffect(()=>{
		setModelId(props.modelId);
	}, [props.modelId]);

	let tabs=[];
	if(data){
		for(let k in data){
			tabs.push(k);
		}
	}

	let lightBlueBoxStyle={background:"rgb(207, 223, 234)"};
	let blueBoxStyle={background:"rgb(143, 170, 220)", color:"#FFF"};

	return (
		<div className="mrm bold400">
			{/* <h3 style={{color:"rgb(14, 75, 113)"}}>Model Monitor</h3> */}

			{data!==null &&
				<div>
					<Tabs type="card" defaultActiveKey={0} onChange={()=>{}}>
						{tabs.map((tab, i)=>{
							let lt=data[tab].type_loan;
							let loanTypes=[];
							for(let k in lt){
								loanTypes.push({name:k, value:(lt[k]*1).toFixed(2)})
							}

							lt=data[tab].subtype_loan;
							let subLoanTypes=[];
							for(let k in lt){
								subLoanTypes.push({name:k, value:(lt[k]*1).toFixed(2)})
							}

							return (
								<TabPane tab={<Tooltip title={tab}><div className="mrm-tab-title">{tab}</div></Tooltip>} key={i}>
									{data[tab].lgd_mean*1===0 && data[tab].ead_sum*1===0 && data[tab].avg_default*1===0?(
										<div className="p-5">
											<Empty />
										</div>
									):(
										<div className="row">
											<div className="col-md-7 form-group">
												<div className="p-3 border radius6 mb40">
													<div className="row mb30">
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={lightBlueBoxStyle}>EAD</div>
														</div>
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={lightBlueBoxStyle}>LGD</div>
														</div>
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={lightBlueBoxStyle}>Avg Days to Default</div>
														</div>
													</div>

													<div className="row">
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={blueBoxStyle}>${(data[tab].ead_sum*1).toFixed(2)}</div>
														</div>
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={blueBoxStyle}>{(data[tab].lgd_mean*1).toFixed(2)}</div>
														</div>
														<div className="col-md-4">
															<div className="radius6 pl15 pr15 pt20 pb20 text-center bold600 fs18" style={blueBoxStyle}>{(data[tab].avg_default*1).toFixed(2)} Days</div>
														</div>
													</div>
												</div>

												<LGDYChart data={data[tab].line_chart} />
											</div>

											<div className="col-md-5 form-group">
												<div className="mb20">
													<LoanTypeChart 
														title="Type Of Loan" 
														data={loanTypes}
													/>
												</div>

												<div>
													<LoanTypeChart 
														title="Subtype of Loan" 
														data={subLoanTypes}
													/>
												</div>
											</div>
										</div>
									)}
								</TabPane>
							)
						})}
					</Tabs>

					<div className="row">
						<div className="col">
							<Comment 
								submittingcomment={props.submittingcomment}
								handleSubmitcomment={()=>props.handleSubmitcomment(modelId)}
								commentIndex={props.commentIndex[0].comment}
								id={modelId}
								onChange={(e)=>props.handleChangecomment(0, e.target.value)}
							/>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

function LGDYChart(props){
	const {data}=props;
	const [options, setOptions]=useState(null);

	useEffect(()=>{
		const opt = {
			//grid: {top: 40, right: 10, bottom: 50, left: 40},
			title: {
				left: 'center',
				text: "LGD Y-o-Y"
			},
			legend:{
				bottom:0, left:'center', icon:'roundRect', itemGap:25,
			},
			xAxis: {
			  type: 'category',
			  data: data.FECHA_YR,
			},
			yAxis: [
				{type:'value', name:'EAD'},
				{type:'value', name:'LGD'}
			],
			color:defColors,
			series: [
				{
					name:"EAD",
					data: data.EAD.map(v=>v.toFixed(2)),
					type: 'line',
					smooth: false,
					yAxisIndex:0
				},
			  	{
					name:"LGD",
					data: data.LGD.map(v=>v.toFixed(2)),
					type: 'line',
					smooth: false,
					yAxisIndex:1
			  	},
			],
			tooltip: {
			  trigger: 'axis',
			},
		};

		setOptions(opt);
	}, [data]);

	return (
		<div className="p-3 border radius6">
			{options!==null &&
				<ReactECharts option={options} opts={{renderer:'svg'}} style={{height:'413px'}} />
			}
		</div>
	);
}

function LoanTypeChart(props){
	const {title, data}=props;
	const [options, setOptions]=useState(null);

	useEffect(()=>{
		const opt = {
			title: {
				left: 'center',
				text: title
			},
			tooltip:{
				trigger: 'item'
			},
			/* legend:{
				bottom:'0', left:'center'
			}, */
			series:[
				{
					name: title,
					type: 'pie',
					//radius: ['40%', '70%'],
					label:{
						show:false,
						formatter:(params)=>{
							return params.name+' '+params.percent+'%';
						}
					},
					color:defColors,
					data:data
				}
			]
		};

		setOptions(opt);
	}, [data]);

	return (
		<div className="p-3 border radius6">
			{options!==null &&
				<div>
					<ReactECharts option={options} opts={{renderer:'svg'}} style={{height:'232px'}} />
					<div className={"d-flex flex-wrap noselect pt15 "+(data.length<=3?'justify-content-center':'')}>
						{data.map((v,i)=>(
							<div key={i} className="mb5 pl8 pr8 d-flex align-items-center">
								<div style={{width:24, height:14, borderRadius:'3px', background:defColors[i]}}></div> &nbsp; {v.name}
							</div>
						))}
					</div>
				</div>
			}
		</div>
	);
}


export default PbRiskLgd1;