import "./mrm.css";
import React, { useState, useEffect } from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Tabs, Tooltip, Table } from "antd";
import Comment from "./monitoring/Comment";
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

let defColors = ["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

function PBMktRisk1Page(props) {
	const [modelId, setModelId] = useState(props.modelId);
	const [data, setData] = useState(null);
	const [comments, setComments] = useState([
		{ sectionId: "ModelPerformance", comment: "" }, //index=0
		// { sectionId: "Discrimination", comment: "" }, //index=1
		// { sectionId: "CharacteristicStability", comment: "" }, //index=2
		// { sectionId: "RankOrdering", comment: "" }, //index=3
		// { sectionId: "PopulationStability", comment: "" }, //index=4
	])
	console.log("test com", comments[0].comment)

	useEffect(() => {
		if (!props.data) {
			setData(null);
			return;
		}
		if (!props.data.Model_Monitor) {
			setData(null);
			return;
		}
		setData(props.data);
	}, [props.data]);

	useEffect(() => {
		setModelId(props.modelId);
	}, [props.modelId]);


	let ksTestDataSource = [
		{
		  key: '1',
		  Test: 'KS Test',
		  'Test Value': 0.03,
		  Interpretation: 'Returns are not following Normal distribution',
		},
		{
			key: '2',
			test: 'Skewness',
			'Test Value': 0.001,
			Interpretation: 'Data is skewed left',
		},
		{
			key: '3',
			test: 'Kurtosis',
			'Test Value': 3.5,
			Interpretation: 'Distribution has thin bell with high peak',
		},
	];
	  
	let ksTestDataCols = [
		{
		  title: 'Test',
		  dataIndex: 'Test'
		},
		{
		  title: 'Test Value',
		  dataIndex: 'Test Value',
		  align: 'right'
		},
		{
		  title: 'Interpretation',
		  dataIndex: 'Interpretation'
		},
	];

	ksTestDataSource=[];
	if(data!==null && data?.Statical_Test_For_Normality[1]){
		let ksTbl=data.Statical_Test_For_Normality[1].table || [];
		ksTbl.forEach((v,i)=>{
			v.key=i;
			v['Test Value']=(v['Test Value']*1).toFixed(2);
		});
		ksTestDataSource=[...ksTbl];
	}

	return (
		<div className="mrm bold400">
			{/* <h3 style={{color:"rgb(14, 75, 113)"}}>Model Monitor</h3> */}

			{data !== null &&
				<Tabs type="card" defaultActiveKey="1" onChange={() => { }}>
					<TabPane tab={<Tooltip title="Model Performance"><div className="mrm-tab-title" style={{width:220}}>Model Performance</div></Tooltip>} key="1">
						<div className="row">
							<div className="col-md-6 form-group">
								<PortfolioTable data={data.Overall_Model_Performance[0].Validation_Result_Of_Portfolio_VaR} />
							</div>
							<div className="col-md-6 form-group">
								<HistoricalTable />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("ModelPerformance")}
									commentIndex={props.commentIndex[5].comment}
									id="ModelPerformance"
									onChange={(e) => props.handleChangecomment(5, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>
					<TabPane tab={<Tooltip title="Backtesting of VaR Forecasts"><div className="mrm-tab-title" style={{width:220}}>Backtesting of VaR Forecasts</div></Tooltip>} key="2">
						<div className="row">
							<div className="col-md-12 form-group">
								<LineAreaChart title="P&L and VaR Range (VaR, 95%)" data={data.Backtesting_Of_VaR_Forecasts.VaR_95[0]} />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("ModelPerformance")}
									commentIndex={props.commentIndex[6].comment}
									id="BacktestingVaRForecasts"
									onChange={(e) => props.handleChangecomment(6, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Statistical Tests: Normality"><div className="mrm-tab-title" style={{width:220}}>Statistical Tests: Normality</div></Tooltip>} key="3">
						<div className="row">
							<div className="col-md-6 form-group">
								<NormalityHistogramChart data={data.Statical_Test_For_Normality[0].Histogram} />
							</div>
							<div className="col-md-6 form-group">
								<div className="table-responsive">
									<Table 
										size="small"
										dataSource={ksTestDataSource} 
										columns={ksTestDataCols}
										pagination={false}
									/>
								</div>

								<div className="mt15 border radius6 bg-light p10">
									KS Test<br />
									{`P value < 0.05, states with 95% confidence that data does not fit the normal distribution`}<br /><br />

									Kurtosis<br />
									Kurtosis = 3 , Normal distribution<br />
									{`Kurtosis > 3 , Thin bell with high peak`}<br />
									{`Kurtosis < 3 , Thick bell with broad peak`}<br /><br />

									Skewness<br />
									Skewness = 0 , Normal Distribution<br />
									{`Skewness < 0 , Distribution is skewed towards left`}<br />
									{`Skewness > 0 Distribution is skewed towards right`}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("StatisticalTestsNormality")}
									commentIndex={props.commentIndex[12].comment}
									id="StatisticalTestsNormality"
									onChange={(e) => props.handleChangecomment(12, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>
				</Tabs>
			}
		</div>
	);
}

const Circle = (props) => {
	return (
		<div style={{ width: '20px', height: '20px', borderRadius: '100%', background: (props.color === 'green' ? '#26C281' : (props.color === 'red' ? '#F2784B' : (props.color === 'orange' ? 'orange' : '#95A5A6'))) }}>
		</div>
	)
}

function PortfolioTable(props) {
	const {data}=props;
	let records = [
		{ ConfidenceLevel: 'No. of Exceptions', status: 'green', var95: 0, key:0},
		{ ConfidenceLevel: 'No, of Theoretical Exceptions', status: '', var95: 13, key:1},
		{ ConfidenceLevel: 'k (Backtesting Parameter)', status: '', var95: 3.00, key:2}
	];

	return (
		<div className="card1">
			<div className="card-body1 p2">
				<div>
					<Table size="small" dataSource={records} pagination={false} scroll={{ y: 500 }} style={{ height: 275 }}>
						<ColumnGroup title={<div>BACKTESTING BIS II</div>} align="center">
							<Column
								title="Confidence Level"
								dataIndex="ConfidenceLevel"
								key="ConfidenceLevel"
								className="pl-4"
							/>
							<Column
								title=""
								dataIndex="status"
								key="status"
								align="center"
								render={status => (
									status ?
										<div className="d-flex justify-content-center">
											<Circle color={status} />
										</div> : <div> </div>
								)}
							/>
							<Column
								title="95%"
								dataIndex="var95"
								key="var95"
								align="center"
							/>
						</ColumnGroup>
					</Table>
				</div>
			</div>
		</div>
	)
}

function HistoricalTable() {
	let lineOptions = {
		// title: {
		// },
		tooltip: {
			trigger: 'item'
		},
		legend: {
			data: ['Var % 0f Equity', 'AR', 'CR']
		},
		grid: {
			// left: '3%',
			// right: '4%',
			// bottom: '3%',
			// containLabel: false,
			show: false
		},
		xAxis: {
			type: 'category',
			data: ['July-21', 'Aug-21', 'Sep-21', 'Oct-21']
		},
		yAxis: {
			type: 'value',
			splitLine: { show: false },
			min: 0,
			max: 2.5
		},
		series: [
			{
				name: 'Var % 0f Equity',
				type: 'line',
				// stack: 'Total',
				data: [0.37, 0.34, 0.30, 0.31],
				label: {
					show: true,
					position: "top",
					formatter: '{c} %'
				},
				symbol: 'rect',
				symbolSize: 10,
				lineStyle: {
					color: '#77b6ea',
					// width: 4,
					// type: 'dashed'
				},
				itemStyle: {
					// borderWidth: 2,
					borderColor: '#77b6ea',
					color: '#77b6ea'
				}
			},
			{
				name: 'AR',
				type: 'line',
				// stack: 'Total',
				data: [1.00, 1.00, 1.00, 1.00],
				label: {
					show: true,
					formatter: '{c} %'
				}
			},
			{
				name: 'CR',
				type: 'line',
				// stack: 'Total',
				data: [2.00, 2.00, 2.00, 2.00],
				label: {
					show: true,
					formatter: '{c} %'
				}
			}
		]
	};
	let barOptions = {
		xAxis: {
			type: 'category',
			data: ['July-21', 'Aug-21', 'Sep-21', 'Oct-21']
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 2,
			splitLine: { show: false }
		},
		grid: {
			// left: '3%',
			// right: '4%',
			top: '3%',
			// containLabel: false,
			// show: false
		},
		series: [
			{
				data: [1.15, 1.06, 0.95, 0.97],
				type: 'bar',
				label: {
					show: true,
					position: 'outside',
					color: '#000'
				},
				color: '#77b6ea',
				barWidth: 50,
			}
		]
	}
	// let records=[
	// 	{title:'Jan-20', var99status:'green', var95status:'red', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Feb-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Mar-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Apr-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
	// 	{title:'May-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Jun-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
	// 	{title:'Jul-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Aug-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Sep-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Oct-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
	// 	{title:'Nov-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
	// 	{title:'Dec-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
	// ];


	// let historicalData=[] ;

	// records.map((v,i)=>(
	// 	historicalData.push({
	// 		key:(i+1).toString() ,
	// 		...v
	// 	})
	// ))

	return (
		<div className="card1">
			<div className="card-body1 p-3 border radius6 bg-light1">
				<h5 className="card-title p-2 mb10">Portfolio VaR Evolution - (Basel, 95% Confidence)</h5>
					<ReactECharts option={lineOptions} opts={{renderer:'svg'}} />
					{/* <Table size="small" dataSource={historicalData} pagination={false}>
						<Column title="Month End" dataIndex="title" key="title"  />
						<ColumnGroup title={<div>VaR Historical <div>(Confidence Level)</div></div>} align="center">
							<Column 
								title="99%" 
								dataIndex="var99status" 
								align="center"
								key="var99status"
								render={var99status=>(
									<div className="d-flex justify-content-center">
										<Circle color={var99status} />
									</div>
								)}

							/>
							<Column 
								title="95%" 
								dataIndex="var95status" 
								align="center"
								key="var95status"
								render={var95status=>(
									<div className="d-flex justify-content-center">
										<Circle color={var95status} />
									</div>	
								)}
							/>
							
						</ColumnGroup>
						<ColumnGroup title={<div>CVaR Historical <div>(Confidence Level)</div></div>} align="center">
							<Column 
								title="99%" 
								dataIndex="cvar99status" 
								align="center"
								key="cvar99status"
								render={cvar99status=>(
									<div className="d-flex justify-content-center">
										<Circle color={cvar99status} />
									</div>
								)}
							/>
							<Column 
								title="95%" 
								dataIndex="cvar95status" 
								align="center"
								key="cvar95status"
								render={cvar95status=>(
									<div className="d-flex justify-content-center">
										<Circle color={cvar95status} />
									</div>	
								)}
							/>
						</ColumnGroup>
					</Table> */}


					{/* table changed to antd 

					<table className="table table-sm m-0">
						<thead className="table-text-vmid text-center bg-light">
							<tr>
								<th rowSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0, textAlign:'left'}}>Month End</th>
								<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>VaR Historical</th>
								<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>CVaR Historical</th>
							</tr>
							<tr>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
							</tr>
						</thead>
						<tbody className="bold600">
							{records.map((v,i)=>(
								<tr key={i}>
									<td>{v.title}</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.var99status} />
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.var95status} />
										</div>
									</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.cvar99status} />
										</div>
									</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.cvar95status} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>

				 */}
			</div>
			<div className="card-body1 p-3 border radius6 bg-light1 mt15">
				<h5 className="card-title p-2 mb10">Portfolio VaR Evolution - Amount</h5>
				<ReactECharts option={barOptions} opts={{renderer:'svg'}} style={{ height: '280px' }} />
			</div>
		</div>
	)
}

function LineAreaChart(props) {
	const {data}=props;
	const [options, setOptions] = useState(null);

	useEffect(() => {
		if (!data) {
			return;
		}
		let dates = data.chart.Date;
		let updata = data.chart.Up;
		let downdata = data.chart.Down;
		let linedata = data.chart.Return || [];
		let dots = data.chart.Dot;

		//let bblvals=[-251297268, -348134596, -331721355, -307113636, -490965216, -512381678, -490445942, -416178425];
		let bbledata = [];
		linedata.forEach((v, i) => {
			if (dots[i] === 1) {
				bbledata.push(v);
			} else {
				bbledata.push(null);
			}
		});

		let allvalues = updata.concat(linedata).concat(downdata);
		let min = allvalues[0] * 1;
		let max = allvalues[0] * 1;
		allvalues.forEach(v => {
			if (v * 1 < min) {
				min = v * 1;
			}
			if (v * 1 > max) {
				max = v * 1;
			}
		});

		let downMin = downdata[0] * 1;
		let lineMin = linedata[0] * 1;
		downdata.forEach(v => {
			if (v * 1 < downMin) {
				downMin = v * 1;
			}
		});
		linedata.forEach(v => {
			if (v * 1 < lineMin) {
				lineMin = v * 1;
			}
		});

		const opt = {
			grid: { top: 40, right: 10, bottom: 20, left: 60 },
			title: {
				left: 'center',
				text: props.title
			},
			tooltip: {
				trigger: 'axis',
				position: function (pt) {
					return [pt[0], '10%'];
				}
			},
			xAxis: {
				type: 'category',
				data: dates,
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				axisLabel: {
					formatter: function (val) {
						val = val * 1;
						return '$' + ((val < 0 ? '(' : '') + (Math.abs(val) / 1000000).toFixed(0) + (val < 0 ? ')' : '')) + 'M';
					}
				},
				min,
				max
			},
			/* dataZoom: [
				{
				  type: 'inside',
				  start: 0,
				  end: 20
				},
				{
				  start: 0,
				  end: 20
				}
			], */
			//color:["#777777", "#000000", "#777777"],
			color: [defColors[0], defColors[1], defColors[0], "#ff0000"],
			series: [
				{
					data: updata,
					type: 'line',
					areaStyle: {},
					symbol: 'none',
					smooth: true,
				},
				{
					data: linedata,
					type: 'line',
					smooth: true,
				},
				{
					data: downdata,
					type: 'line',
					areaStyle: {},
					symbol: 'none',
					smooth: true,
				},
				{
					name: "Anomaly",
					data: bbledata,
					type: 'scatter',
					smooth: true,
					itemStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(120, 36, 50, 0.5)',
						shadowOffsetY: 5,
						color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
							{
								offset: 0,
								color: 'rgb(251, 118, 123)'
							},
							{
								offset: 1,
								color: 'rgb(204, 46, 72)'
							}
						])
					}
				}
			],
			/* visualMap: {
				top: 50,
				right: 10,
				show:false,
				pieces: [
				  {
					gt: lineMin,
					lte: downMin,
					color: '#FF0000'
				  }
				],
				outOfRange: {
				  color: defColors[1]
				}
			} */
		};

		setOptions(opt);
	}, [data])


	const backtestingDataSource = [
		{
			key: '1',
			excessprobability: data.table[0]['Excess probability'],
			numberofobservations: data.table[0]['No of observation'],
			numberofexcesses: data.table[0]['Number of excesses'],
			backtesting: data.table[0]['K (Backtesting Parameter)']
		}
	]


	const backtestingCols = [
		{
			title: 'Excess probability',
			dataIndex: 'excessprobability',
			ellipsis: true
		},
		{
			title: 'Number of observations',
			dataIndex: 'numberofobservations',
			align: 'center',
			ellipsis: true
		},
		{
			title: 'Number of excesses',
			dataIndex: 'numberofexcesses',
			align: 'center',
			ellipsis: true
		},
		{
			title: 'K (Backtesting Parameter)',
			dataIndex: 'backtesting',
			align: 'center',
			ellipsis: true
		},
	];

	return (
		<>
			{options !== null &&
				<div className="p-3 border radius6 bg-light1">
					<ReactECharts option={options} opts={{renderer:'svg'}} style={{ height: '300px' }} />

					<div className="mt-3">
						<div className="">
							<Table
								size="small"
								dataSource={backtestingDataSource}
								columns={backtestingCols}
								pagination={false}
							/>
						</div>
					</div>
				</div>
			}
		</>
	);
}

function NormalityHistogramChart(props){
	const {data}=props;
	const [options, setOptions]=useState(null);

	useEffect(()=>{
		if(!data){
			return;
		}

		const opt={
			grid:{top: 30, right: 8, bottom: 80, left: 36},
			title:{
				left:'center',
				text:"P&L Distribution"
			},
			xAxis:{
			  type: 'category',
			  data: data.X,
			  axisLabel:{rotate:90},
			},
			yAxis: {
			  type: 'value',
			},
			series: [
			  {
				data: data.Y,
				type: 'bar',
				smooth: true,
			  },
			  {
				data: data.Y,
				type: 'line',
				smooth: true,
			  },
			],
			//color:["#3598DC", "#D91E18"],
			color:defColors,
			tooltip: {
			  trigger: 'axis',
			},
		};

		setOptions(opt);

	}, [data]);

	return (
		<div className="p-3 border radius6 bg-light1">
			{options!==null &&
				<ReactECharts option={options} opts={{renderer:'svg'}} style={{height:'445px'}} />
			}
		</div>
	);
}


export default PBMktRisk1Page;