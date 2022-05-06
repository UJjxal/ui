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


	const testDataSource = [
		{
			key: '1',
			test: 'KS Test',
			testvalue: 0.03,
			interpretation: 'Returns are not following Normal distribution',
		},
		{
			key: '2',
			test: 'Skewness',
			testvalue: 0.001,
			interpretation: 'Data is skewed left',
		},

		{
			key: '3',
			test: 'Kurtosis',
			testvalue: 3.5,
			interpretation: 'Distribution has thin bell with high peak',

		},

	];

	const testDataCols = [
		{
			title: 'Test',
			dataIndex: 'test',
			key: 'test',
		},
		{
			title: 'Test Value',
			dataIndex: 'testvalue',
			key: 'testvalue',
			align: 'right'
		},
		{
			title: 'Interpretation',
			dataIndex: 'interpretation',
			key: 'interpretation',
		},
	];

	return (
		<div className="mrm bold400">
			{/* <h3 style={{color:"rgb(14, 75, 113)"}}>Model Monitor</h3> */}

			{data !== null &&
				<Tabs type="card" defaultActiveKey="1" onChange={() => { }}>
					<TabPane tab={<Tooltip title="Model Performance"><div className="mrm-tab-title">Model Performance</div></Tooltip>} key="1">
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
					<TabPane tab={<Tooltip title="Backtesting of VaR Forecasts"><div className="mrm-tab-title">Backtesting of VaR Forecasts</div></Tooltip>} key="2">
						<div className="row">
							{/* <div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (VaR, 99%)" data={data.Backtesting_Of_VaR_Forecasts.VaR_99} />
							</div>
							<div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (CVaR, 99%)" data={data.Backtesting_Of_VaR_Forecasts.CVaR_99} />
							</div> */}
							<div className="col-md-12 form-group">
								<LineAreaChart title="P&L and VaR Range (VaR, 95%)" data={data.Backtesting_Of_VaR_Forecasts.VaR_95} />
							</div>
							{/* <div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (CVaR, 95%)" data={data.Backtesting_Of_VaR_Forecasts.CVaR_95} />
							</div> */}
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

					{/* <TabPane tab={<Tooltip title="Statistical Tests: Kupiec POF"><div className="mrm-tab-title">Statistical Tests: Kupiec POF</div></Tooltip>} key="3">
						<div className="row">
							<div className="col-md-6 form-group">
								<BarChart 
									title="Kupiec POF Test Results (VaR, 99%)" 
									data={data.Statical_Test_Kupeic_POF_Results.VaR_99}
								/>
							</div>
							<div className="col-md-6 form-group">
								<BarChart 
									title="Kupiec POF Test Results (CVaR, 99%)" 
									data={data.Statical_Test_Kupeic_POF_Results.CVaR_99}
								/>
							</div>
							<div className="col-md-6 form-group">
								<BarChart 
									title="Kupiec POF Test Results (VaR, 95%)" 
									data={data.Statical_Test_Kupeic_POF_Results.VaR_95}
								/>
							</div>
							<div className="col-md-6 form-group">
								<BarChart 
									title="Kupiec POF Test Results (CVaR, 95%)" 
									data={data.Statical_Test_Kupeic_POF_Results.CVaR_95}
								/>
							</div>
						</div>
					</TabPane> */}

					<TabPane tab={<Tooltip title="Statistical Tests: Normality"><div className="mrm-tab-title">Statistical Tests: Normality</div></Tooltip>} key="4">
						<div className="row">
							<div className="col-md-6 form-group">
								<NormalityHistogramChart data={data.Statical_Test_For_Normality[0].Histogram} />
							</div>
							<div className="col-md-6 form-group">
								<div className="table-responsive">
									<Table
										size="small"
										dataSource={testDataSource}
										columns={testDataCols}
										pagination={false}
									/>
									{/* table change to antd 

									<table className="table table-sm table-bordered m-0">
										<thead className="table-text-vmid bg-light">
											<tr>
												<th className="fs13 bold600">Test</th>
												<th className="text-center fs13 bold600">Test Value</th>
												<th className="fs13 bold600">Interpretation</th>
											</tr>
										</thead>
										<tbody className="bold600">
											<tr>
												<td>KS Test</td>
												<td className="text-center">0.03</td>
												<td>Returns are not following Normal distribution</td>
											</tr>
											<tr>
												<td>Skewness</td>
												<td className="text-center">0.001</td>
												<td>Data is skewed left</td>
											</tr>
											<tr>
												<td>Kurtosis</td>
												<td className="text-center">3.5</td>
												<td>Distribution has thin bell with high peak</td>
											</tr>
										</tbody>
									</table>

								*/}

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
									handleSubmitcomment={() => props.handleSubmitcomment("ModelPerformance")}
									commentIndex={props.commentIndex[7].comment}
									id="StatisticalTests"
									onChange={(e) => props.handleChangecomment(7, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					{/* <TabPane tab="" tab={<Tooltip title="Portfolo Composition"><div className="mrm-tab-title">Portfolo Composition</div></Tooltip>} key="5">
						<PortfolioComposition />
					</TabPane> */}

					<TabPane tab={<Tooltip title="VaR by Instrument"><div className="mrm-tab-title">VaR by Instrument</div></Tooltip>} key="6">
						<TopIndividualVaR data1={data.Top_Individual_VaR} data2={data.ContributorDiversifier} />
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("ModelPerformance")}
									commentIndex={props.commentIndex[8].comment}
									id="VaRInstrument"
									onChange={(e) => props.handleChangecomment(8, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					{/* <TabPane tab={<Tooltip title="Contributor/Diversifier to VaR"><div className="mrm-tab-title">Contributor/Diversifier to VaR</div></Tooltip>} key="7">
						<TopPortfolioVaR data={data.ContributorDiversifier} />
					</TabPane> */}
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
	const { data } = props;
	let records = [
		{ ConfidenceLevel: 'No. of Exceptions', status: 'green', var95: 0 },
		{ ConfidenceLevel: 'No, of Theoretical Exceptions', status: '', var95: 13 },
		{ ConfidenceLevel: 'k (Backtesting Parameter)', status: '', var95: 3.00 }
		// {title:'Excess probability', var99:'0.01', var99status:'', var95:'0.05', var95status:'', cvar99:'0.01', cvar99status:'', cvar95:'0.05', cvar95status:''},
		// {title:'No of observation', var99:'252', var99status:'', var95:'252', var95status:'', cvar99:'252', cvar99status:'', cvar95:'252', cvar95status:''},
		// {title:'Number of excesses', var99:'5', var99status:'green', var95:'16', var95status:'green', cvar99:'3', cvar99status:'green', cvar95:'20', cvar95status:'red'},
		// {title:'Range of excesses (Days)', var99:'0-6', var99status:'', var95:'7-18', var95status:'', cvar99:'0-6', cvar99status:'', cvar95:'7-18', cvar95status:''},
	];
	// const [records, setRecords]=useState([]);
	// useEffect(()=>{
	// 	let rs=[];
	// 	data.Heading.forEach((v,i)=>{
	// 		if(i<=3){
	// 			let ob={
	// 				title:v, 
	// 				var99:data.VaR_Confidence_Level_99[i]+'', 
	// 				var99status:i===2?(data.VaR_Confidence_Level_99[4].toLowerCase()):'',

	// 				var95:data.VaR_Confidence_Level_95[i]+'',
	// 				var95status:i===2?(data.VaR_Confidence_Level_95[4].toLowerCase()):'',

	// 				cvar99:data.CVaR_Confidence_Level_99[i]+'',
	// 				cvar99status:i===2?(data.CVaR_Confidence_Level_99[4].toLowerCase()):'',

	// 				cvar95:data.CVaR_Confidence_Level_95[i]+'',
	// 				cvar95status:i===2?(data.CVaR_Confidence_Level_95[4].toLowerCase()):'',
	// 			};
	// 			rs.push(ob);
	// 		}
	// 	});
	// 	setRecords(rs);
	// }, [data])

	// let ValidationResultsData=[] ;

	// records.forEach((v,i)=>{
	// 	  	ValidationResultsData.push({
	// 			key:(i+1).toString(),
	// 			vr_title:v.title, 
	// 			vr_total_var99:{
	// 				vr_99:v.var99 ,
	// 				vr_var99status:v.var99status ,
	// 			},
	// 			vr_total_var95:{
	// 				vr_95:v.var95 ,
	// 				vr_var95status:v.var95status ,
	// 			},
	// 			cvr_total_cvar99:{
	// 				cvr_99:v.cvar99 ,
	// 				cvr_cvar99status:v.cvar99status ,
	// 			},
	// 			cvr_total_cvar95:{
	// 				cvr_95:v.cvar95 ,
	// 				cvr_cvar95status:v.cvar95status ,
	// 			},

	// 		});
	// 	}
	// )


	return (
		<div className="card1">
			<div className="card-body1 p2">
				{/* <h5 className="card-title p-2 mb10">Validation Results Of Portfolio VaR Model</h5> */}
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
							{/* <Column 
								title="99%" 
								dataIndex="vr_total_var99" 
								align="center"
								key="vr_total_var99"
								render={vr_total_var99=>(
									<div className="d-flex justify-content-center">
										<div className="my-auto text-right w50">{vr_total_var99.vr_99}</div>
										{vr_total_var99.vr_var99status!=''?( 
											<div className="my-auto pl5">
												<Circle color={vr_total_var99.vr_var99status} />
											</div>
										):(
											<div style={{width:20}}>&nbsp;</div>
										)}
									</div>
								)}
								/>
							<Column 
								title="95%" 
								dataIndex="vr_total_var95" 
								align="center"
								key="vr_total_var95"
								render={vr_total_var95=>(
									<div className="d-flex justify-content-center">
										<div className="my-auto text-right w50">{vr_total_var95.vr_95}</div>
										{vr_total_var95.vr_var95status!=''?( 
											<div className="my-auto pl5">
												<Circle color={vr_total_var95.vr_var95status} />
											</div>
										):(
											<div style={{width:20}}>&nbsp;</div>
										)}
									</div>
								)}
							/> */}
						</ColumnGroup>

						{/* <ColumnGroup title={<div>CVaR Historical <div>(Confidence Level)</div></div>} align="center">
							<Column 
								title="99%" 
								dataIndex="cvr_total_cvar99" 
								align="center"
								key="cvr_total_cvar99"
								render={cvr_total_cvar99=>(
									<div className="d-flex justify-content-center">
										<div className="my-auto text-right w50">{cvr_total_cvar99.cvr_99}</div>
										{cvr_total_cvar99.cvr_cvar99status!=''?( 
											<div className="my-auto pl5">
												<Circle color={cvr_total_cvar99.cvr_cvar99status} />
											</div>
										):(
											<div style={{width:20}}>&nbsp;</div>
										)}
									</div>
								)}
								/>
							<Column 
								title="95%" 
								dataIndex="cvr_total_cvar95" 
								align="center"
								key="cvr_total_cvar95" 
								render={cvr_total_cvar95=>(
									<div className="d-flex justify-content-center">
										<div className="my-auto text-right w50">{cvr_total_cvar95.cvr_95}</div>
										{cvr_total_cvar95.cvr_cvar95status!=''?( 
											<div className="my-auto pl5">
												<Circle color={cvr_total_cvar95.cvr_cvar95status} />
											</div>
										):(
											<div style={{width:20}}>&nbsp;</div>
										)}
									</div>
								)}
							/>
						</ColumnGroup> */}
					</Table>


					{/* table changed to antd 
	
					 <table className="table table-sm m-0">
						<thead className="table-text-vmid text-center bg-light">
							<tr>
								<th rowSpan="2" className="bold600"></th>
								<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>VaR Historical</th>
								<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>CVaR Historical</th>
							</tr>
							<tr>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99% test</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
							</tr>
						</thead>
						<tbody className="">
							{records.map((v,i)=>(
								<tr key={i}>
									<td>{v.title}</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.var99}</div>
											{v.var99status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.var99status} />
											</div>
											}
										</div>
									</td>
									
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.var95}</div>
											{v.var95status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.var95status} />
											</div>
											}
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.cvar99}</div>
											{v.cvar99status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.cvar99status} />
											</div>
											}
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.cvar95}</div>
											{v.cvar95status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.cvar95status} />
											</div>
											}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table> 
				*/}

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
	const { data } = props;
	const [options, setOptions] = useState(null);

	useEffect(() => {
		if (!data) {
			return;
		}
		let dates = data.chart.Date;
		let updata = data.chart.Up;
		let downdata = data.chart.Down;
		let linedata = data.chart.Return;
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
			title: 'K (Backtesting Parameter',
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
							{ /* backtestingtable has changed to antd 

							<table className="table table-sm table-bordered m-0">
								<thead className="table-text-vmid bg-light">
									<tr>
										<th className="fs13 bold600">Excess probability TEST1234 </th>
										<th className="text-center fs13 bold600">Number of observations</th>
										<th className="text-center fs13 bold600">Number of excesses</th>
										<th className="text-center fs13 bold600">Range of excesses (days)</th>
									</tr>
								</thead>
								<tbody className="bold600">
									<tr>
										<td>{data.table[0]['Excess probability']}%</td>
										<td className="text-center">{data.table[0]['No of observation']} </td>
										<td className="text-center">{data.table[0]['Number of excesses']}</td>
										<td className="text-center">{data.table[0]['Range of excesses (days)']} test321</td>
									</tr>
								</tbody>
							</table>

							 table end */}
						</div>
					</div>
				</div>
			}
		</>
	);
}

function BarChart(props) {
	const { data } = props;
	const [options, setOptions] = useState(null);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		if (!data) {
			return;
		}

		let bardata = data[0].chart.Probability;
		let max = bardata[0].replace("%", "") * 1;
		bardata.forEach((v, i) => {
			//{value:1.31, itemStyle:{color:'#D91E18'}}
			if (data[0].chart.Highlight[i] === 1) {
				bardata[i] = v = { value: v.replace("%", ""), itemStyle: { color: '#D91E18' } }
			}

			let n;
			if (typeof v === "object") {
				v.value = v.value.replace("%", "");
				n = v.value * 1;
			} else {
				v = bardata[i] = v.replace("%", "");
				n = v * 1;
			}
			if (n > max) {
				max = n;
			}
		});
		let areadata = [];
		bardata.forEach((v, i) => {
			if (data[0].chart.GreenShade[i] === 1) {
				areadata.push(max + max * 10 / 100);
			} else {
				areadata.push(null);
			}
		});

		const opt = {
			grid: { top: 30, right: 10, bottom: 20, left: 80 },
			title: {
				left: 'center',
				text: props.title
			},
			xAxis: {
				type: 'category',
				data: data[0].chart.xaxis,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: function (v) {
						let n;
						if (typeof v === "object") {
							n = v.value * 1;
						} else {
							n = v * 1;
						}
						return n.toFixed(2) + '%';
					}
				},
			},
			//color:['#26C281', '#3598DC'],
			color: defColors,
			series: [
				{
					data: areadata,
					type: 'line',
					areaStyle: {},
					lineStyle: { width: 0 },
					symbol: 'none',
					//smooth: true,
					z: 1
				},
				{
					data: bardata,
					type: 'bar',
					smooth: true,
					z: 2
				},
			],
			tooltip: {
				trigger: 'axis',
			},
		};

		setOptions(opt);

		setRecords([{
			probability: data[1].table[0]['Excess probability'],
			observations: data[1].table[0]['No of observation'],
			no_of_excesses: data[1].table[0]['Number of excesses'],
			kupiec_value: data[1].table[0]['Theoretical_Kupiec_value'],
			cut_point: data[1].table[0]['Cut_point'],
			test_result: ""
		}]);
	}, [data]);



	let KupiecData = [];

	records.map((v, i) => (
		KupiecData.push({
			key: (i + 1).toString(),
			...v
		})
	))

	return (
		<div className="p-3 border radius6">
			{options !== null &&
				<ReactECharts option={options} opts={{renderer:'svg'}} style={{ height: '300px' }} />
			}
			<div className="mt-3">
				<div className="">
					{/* <Table dataSource={} columns={} pagination={false} /> */}
					<Table size="small" dataSource={KupiecData} pagination={false}>
						<Column title="Excess probability" dataIndex="probability" key="probability" ellipsis={true} />
						<Column
							title="Number of bservations"
							dataIndex="observations"
							align="center"
							key="observations"
							ellipsis={true}
							render={observations => (
								<div className="text-center text-danger">
									{observations}
								</div>
							)}
						/>
						<Column
							title="Number of excesses"
							dataIndex="no_of_excesses"
							align="center"
							key="no_of_excesses"
							ellipsis={true}
							render={no_of_excesses => (
								<div className="text-center text-danger">
									{no_of_excesses}
								</div>
							)}
						/>
						<Column
							title="Theoretical kupiec value"
							dataIndex="kupiec_value"
							align="center"
							key="kupiec_value"
							ellipsis={true}
						/>
						<Column
							title="Cut point"
							dataIndex="cut_point"
							align="center"
							key="cut_point"
							ellipsis={true}
						/>

					</Table>

					{/* Change to Antd table 

					<table className="table table-sm table-bordered m-0">
						<thead className="table-text-vmid bg-light">
							<tr>
								<th className="fs13 bold600">Excess probability</th>
								<th className="text-center fs13 bold600">Number of bservations</th>
								<th className="text-center fs13 bold600">Number of excesses</th>
								<th className="text-center fs13 bold600">Theoretical kupiec value</th>
								<th className="text-center fs13 bold600">Cut point</th>
								{/* <th className="text-center fs13 bold600">Test Result</th> */}{/*
							</tr>
						</thead>
						<tbody className="bold600">
							{records.map((v,i)=>(
								<tr key={i}>
									<td>{v.probability}</td>
									<td className="text-center text-danger">{v.observations}</td>
									<td className="text-center text-danger">{v.no_of_excesses}</td>
									<td className="text-center">{v.kupiec_value}</td>
									<td className="text-center">{v.cut_point}</td>
									{/* <td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.test_result} />
										</div>
									</td> */}
					{/*
								</tr>
							))}
						</tbody>
					</table>

					table end */}

				</div>
			</div>
		</div>
	);
}

function NormalityHistogramChart(props) {
	const { data } = props;
	const [options, setOptions] = useState(null);

	useEffect(() => {
		if (!data) {
			return;
		}

		const opt = {
			grid: { top: 30, right: 8, bottom: 80, left: 36 },
			title: {
				left: 'center',
				text: "P&L Distribution"
			},
			xAxis: {
				type: 'category',
				data: data.X,
				axisLabel: { rotate: 90 },
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
			color: defColors,
			tooltip: {
				trigger: 'axis',
			},
		};

		setOptions(opt);

	}, [data]);

	return (
		<div className="p-3 border radius6 bg-light1">
			{options !== null &&
				<ReactECharts option={options} opts={{renderer:'svg'}} style={{ height: '432px' }} />
			}
		</div>
	);
}

function PortfolioComposition() {
	let records1 = [
		{ title: 'Valores a N', marketValue: ['2,089', '1.9%'], var99: ['14', '2.9%'], var95: ['14', '2.9%'], cvar99: ['14', '2.9%'], cvar95: ['14', '2.9%'] },
		{ title: 'Vencimiento', marketValue: ['45,944', '40.8%'], var99: ['210', '42.8%'], var95: ['105', '43.3%'], cvar99: ['220', '43.9%'], cvar95: ['136', '38.3%'] },
		{ title: 'Venta', marketValue: ['64,674', '57.4%'], var99: ['267', '54.4%'], var95: ['132', '54.4%'], cvar99: ['271', '54.1%'], cvar95: ['208', '58.4%'] },
		{ title: 'Total', marketValue: ['1,12,708', ''], var99: ['491', ''], var95: ['243', ''], cvar99: ['502', ''], cvar95: ['356', ''], isTotal: true },
	];

	let records2 = [
		{ title: 'DOP', marketValue: ['84,157', '74.7%'], var99: ['376', '76.7%'], var95: ['184', '75.7%'], cvar99: ['382', '76.2%'], cvar95: ['275', '77.2%'] },
		{ title: 'USD', marketValue: ['28,550', '25.3%'], var99: ['115', '23.3%'], var95: ['59', '24.3%'], cvar99: ['120', '23.8%'], cvar95: ['81', '22.8%'] },
		{ title: 'Total', marketValue: ['1,12,708', ''], var99: ['491', ''], var95: ['243', ''], cvar99: ['502', ''], cvar95: ['356', ''], isTotal: true },
	];

	let InstrumentClassificationData = [];
	let CurrencyData = [];

	records1.map((v, i) => (
		InstrumentClassificationData.push({
			key: (i + 1).toString(),
			title: v.title,
			marketValue0: v.marketValue[0],
			marketValue1: v.marketValue[1],
			var99_0: v.var99[0],
			var99_1: v.var99[1],
			var95_0: v.var95[0],
			var95_1: v.var95[1],
			cvar99_0: v.cvar99[0],
			cvar99_1: v.cvar99[1],
			cvar95_0: v.cvar95[0],
			cvar95_1: v.cvar95[1],
		})
	))

	records2.map((v, i) => (
		CurrencyData.push({
			key: (i + 1).toString(),
			title: v.title,
			marketValue0: v.marketValue[0],
			marketValue1: v.marketValue[1],
			var99_0: v.var99[0],
			var99_1: v.var99[1],
			var95_0: v.var95[0],
			var95_1: v.var95[1],
			cvar99_0: v.cvar99[0],
			cvar99_1: v.cvar99[1],
			cvar95_0: v.cvar95[0],
			cvar95_1: v.cvar95[1],
		})
	))

	// let TableHead=(
	// 	<thead className="table-text-vmid text-center bg-light">
	// 		<tr>
	// 			<th rowSpan="2" className="bold600"></th>
	// 			<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>Market Value test567</th>

	// 			<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>VaR 99%</th>
	// 			<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>VaR 95%</th>
	// 			<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>CVaR 99%</th>
	// 			<th colSpan="2" className="bold600" style={{borderBottom:0, paddingBottom:0}}>CVaR 95%</th>
	// 		</tr>
	// 		<tr>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderRight:0}}>(DOP M)</th>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderLeft:0}}>% of Port.</th>

	// 			<th className="w120 nowrap" style={{borderTop:0, borderRight:0}}>(DOP M)</th>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderLeft:0}}>% of VaR</th>

	// 			<th className="w120 nowrap" style={{borderTop:0, borderRight:0}}>(DOP M)</th>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderLeft:0}}>% of VaR</th>

	// 			<th className="w120 nowrap" style={{borderTop:0, borderRight:0}}>(DOP M)</th>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderLeft:0}}>% of VaR</th>

	// 			<th className="w120 nowrap" style={{borderTop:0, borderRight:0}}>(DOP M)</th>
	// 			<th className="w120 nowrap" style={{borderTop:0, borderLeft:0}}>% of VaR</th>
	// 		</tr>
	// 	</thead>
	// );

	return (
		<div>
			<div className="card1">
				<div className="card-body1 p2">
					<h5 className="card-title p-2 mb10">Exposure and VaR by Instrument Classification</h5>
					<div className="table-responsive">

						<Table rowClassName={(record, index) => {
							return record.key === "4" ? "fontStyle" : "";
						}}
							size="small"
							dataSource={InstrumentClassificationData}
							pagination={false}
						>
							<Column title="" dataIndex="title" key="title" />
							<ColumnGroup title="Market Value">
								<Column
									title="(DOP M)"
									dataIndex="marketValue0"
									key="marketValue0"
									align="center"

								/>
								<Column
									title="% of Port."
									dataIndex="marketValue1"
									key="marketValue1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="VaR 99%">
								<Column
									title="(DOP M)"
									dataIndex="var99_0"
									key="var99_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="var99_1"
									key="var99_1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="VaR 95%">
								<Column
									title="(DOP M)"
									dataIndex="var95_0"
									key="var95_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="var95_1"
									key="var95_1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="CVaR 99%">
								<Column
									title="(DOP M)"
									dataIndex="cvar99_0"
									key="cvar99_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="cvar99_1"
									key="cvar99_1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="CVaR 95%">
								<Column
									title="(DOP M)"
									dataIndex="cvar95_0"
									key="cvar95_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="cvar95_1"
									key="cvar95_1"
									align="center"

								/>
							</ColumnGroup>

						</Table>
						{/* Table changed to Antd 

						<table className="table table-sm m-0">
							{TableHead}
							<tbody className="">
								{records1.map((v,i)=>(
									<tr key={i} className={v.isTotal===true?'bold600':''}>
										<td>{v.title}</td>
										
										<td className="text-center">{v.marketValue[0]}</td>
										<td className="text-center">{v.marketValue[1]}</td>
										
										<td className="text-center">{v.var99[0]}</td>
										<td className="text-center">{v.var99[1]}</td>

										<td className="text-center">{v.var95[0]}</td>
										<td className="text-center">{v.var95[1]}</td>

										<td className="text-center">{v.cvar99[0]}</td>
										<td className="text-center">{v.cvar99[1]}</td>

										<td className="text-center">{v.cvar95[0]}</td>
										<td className="text-center">{v.cvar95[1]}</td>
									</tr>
								))}
							</tbody>
						</table>

						*/}
					</div>
				</div>
			</div>

			<div className="card1 mt30">
				<div className="card-body1 p2">
					<h5 className="card-title p-2 mb10">Exposure and VaR by Currency</h5>
					<div className="table-responsive">

						<Table
							rowClassName={(record, index) => {
								return record.key === "4" ? "fontStyle" : "";
							}}
							size="small"
							dataSource={InstrumentClassificationData}
							pagination={false}>
							<Column title="" dataIndex="title" key="title" />
							<ColumnGroup title="Market Value">
								<Column
									title="(DOP M)"
									dataIndex="marketValue0"
									key="marketValue0"
									align="center"

								/>
								<Column
									title="% of Port."
									dataIndex="marketValue1"
									key="marketValue1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="VaR 99%">
								<Column
									title="(DOP M)"
									dataIndex="var99_0"
									key="var99_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="var99_1"
									key="var99_1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="VaR 95%">
								<Column
									title="(DOP M)"
									dataIndex="var95_0"
									key="var95_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="var95_1"
									key="var95_1"
									align="center"

								/>
							</ColumnGroup>
							<ColumnGroup title="CVaR 99%">
								<Column
									title="(DOP M)"
									dataIndex="cvar99_0"
									key="cvar99_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="cvar99_1"
									key="cvar99_1"
									align="center"
								/>
							</ColumnGroup>
							<ColumnGroup title="CVaR 95%">
								<Column
									title="(DOP M)"
									dataIndex="cvar95_0"
									key="cvar95_0"
									align="center"

								/>
								<Column
									title="% of VaR"
									dataIndex="cvar95_1"
									key="cvar95_1"
									align="center"

								/>
							</ColumnGroup>

						</Table>

						{/* table changed to antd 

						<table className="table table-sm m-0">
							{TableHead}
							<tbody className="">
								{records2.map((v,i)=>(
									<tr key={i} className={v.isTotal===true?'bold600':''}>
										<td>{v.title}</td>
										
										<td className="text-center">{v.marketValue[0]}</td>
										<td className="text-center">{v.marketValue[1]}</td>
										
										<td className="text-center">{v.var99[0]}</td>
										<td className="text-center">{v.var99[1]}</td>

										<td className="text-center">{v.var95[0]}</td>
										<td className="text-center">{v.var95[1]}</td>

										<td className="text-center">{v.cvar99[0]}</td>
										<td className="text-center">{v.cvar99[1]}</td>

										<td className="text-center">{v.cvar95[0]}</td>
										<td className="text-center">{v.cvar95[1]}</td>
									</tr>
								))}
							</tbody>
						</table>

						 */}
					</div>
				</div>
			</div>
		</div>
	)
}

function TopIndividualVaR(props) {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		setRecords(props.data1);
	}, [props.data1])


	return (
		<div className="card1">
			<div className="card-body1 p2">
				<div className="row">
					<div className="col-md-6">
						<h5 className="card-title p-2 mb10">Top 10 Individual VaR (95%)</h5>
						<div className="border radius6">
							<div className="table-responsive">
								<table className="table table-sm borderless m-0">
									<tbody>
										{records.map((v, i) => (
											<tr key={i}>
												<td>
													<div className="d-flex">
														<div className="my-auto wper40 pl20">
															{v.isin_var95}
														</div>
														<div className="my-auto wper60 pr20">
															<div className="mrm-tbl-perchart-bx">
																{v.var95 < 0 ? (
																	<span>({Math.abs(v.var95).toFixed(2)}%)</span>
																) : (
																	<span>{v.var95.toFixed(2)}%</span>
																)}
																<div className={"mrm-tbl-perchart " + (v.var95 >= 0 ? 'mrm-tbl-perchart-left' : 'mrm-tbl-perchart-right')} style={{ width: Math.abs(v.var95) + '%', background: defColors[0] }}></div>
															</div>
														</div>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<h5 className="card-title p-2 mb10">Top 5 Contributor/Diversifier of Portfolio VaR (95%)</h5>
						<div className="border radius6">
							<TopPortfolioVaR data={props.data2} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function TopPortfolioVaR(props) {
	const [records, setRecords] = useState([]);
	useEffect(() => {
		setRecords(props.data);
	}, [props.data])

	const TrRow = (props) => {
		const { v, i } = props;

		return (
			<tr>
				{i === 0 && v.var95 >= 0 &&
					<td className="position-relative" style={{ background: 'rgb(118 118 118)', borderRight: '3px solid #fff', borderTop: '1px solid #fff' }} rowSpan={records.filter(v => v.var95 >= 0).length}>
						<div className="mrm-tbl-perchart-rotate-lbl left1">Top 5 Contributor</div>
					</td>
				}
				{i === 0 && v.var95 < 0 &&
					<td className="position-relative" style={{ background: 'rgb(118 118 118)', borderRight: '3px solid #fff' }} rowSpan={records.filter(v => v.var95 < 0).length}>
						<div className="mrm-tbl-perchart-rotate-lbl left2">Top 5 Diversifier</div>
					</td>
				}

				<td>
					<div className="d-flex">
						<div className="my-auto wper40 pl20">
							{v.isin_var95}
						</div>
						<div className="my-auto wper60 pr20">
							<div className="mrm-tbl-perchart-bx">
								{v.var95 < 0 ? (
									<span>({Math.abs(v.var95).toFixed(2)})</span>
								) : (
									<span>{v.var95.toFixed(2)}</span>
								)}
								<div className={"mrm-tbl-perchart " + (v.var95 >= 0 ? 'mrm-tbl-perchart-left' : 'mrm-tbl-perchart-right')} style={{ width: Math.abs(v.var95) + '%', background: defColors[2] }}></div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		)
	}

	return (
		<div className="table-responsive">
			<table className="table table-sm table-borderless m-0">
				<tbody className="table-text-vmid">
					{records.filter(v => v.var95 >= 0).map((v, i) => (
						<TrRow key={i} i={i} v={v} />
					))}

					<tr>
						<td colSpan="5" style={{ padding: '2px 0' }}>
							<div style={{ borderTop: '1px solid rgb(30, 123, 165)' }}></div>
						</td>
					</tr>

					{records.filter(v => v.var95 < 0).map((v, i) => (
						<TrRow key={i} i={i} v={v} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PBMktRisk1Page;