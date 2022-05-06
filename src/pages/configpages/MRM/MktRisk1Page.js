import "./mrm.css";
import React, {useState, useEffect} from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import {Tabs, Tooltip, Table} from "antd";
import Comment from "./monitoring/Comment";
const {TabPane}=Tabs;
const { Column, ColumnGroup } = Table;

let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

function MktRisk1Page(props){
	const [modelId, setModelId]=useState(props.modelId);
	const [data, setData]=useState(null);

	useEffect(()=>{
		if(!props.data){
			setData(null);
			return;
		}
		if(!props.data.Model_Monitor){
			setData(null);
			return;
		}
		setData(props.data);
	}, [props.data]);

	useEffect(()=>{
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

			{data!==null &&
				<Tabs type="card" defaultActiveKey="1" onChange={()=>{}}>
					<TabPane tab={<Tooltip title="Model Performance"><div className="mrm-tab-title">Model Performance</div></Tooltip>} key="1">
						<div className="row">
							<div className="col-md-6 form-group">
								<PortfolioTable data={data.Overall_Model_Performance[0].Validation_Result_Of_Portfolio_VaR} modelId={modelId} />
							</div>
							<div className="col-md-6 form-group">
								<HistoricalTable modelId={modelId} />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("modelPerformanceMktRisk")}
									commentIndex={props.commentIndex[9].comment}
									id="modelPerformanceMktRisk"
									onChange={(e) => props.handleChangecomment(9, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Backtesting of VaR Forecasts"><div className="mrm-tab-title">Backtesting of VaR Forecasts</div></Tooltip>} key="2">
						<div className="row">
							<div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (VaR, 99%)" data={data.Backtesting_Of_VaR_Forecasts.VaR_99} />
							</div>
							<div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (CVaR, 99%)" data={data.Backtesting_Of_VaR_Forecasts.CVaR_99} />
							</div>
							<div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (VaR, 95%)" data={data.Backtesting_Of_VaR_Forecasts.VaR_95} />
							</div>
							<div className="col-md-6 form-group">
								<LineAreaChart title="P&L and VaR Range (CVaR, 95%)" data={data.Backtesting_Of_VaR_Forecasts.CVaR_95} />
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("BacktestingVaRForecastsMktRisk")}
									commentIndex={props.commentIndex[10].comment}
									id="BacktestingVaRForecastsMktRisk"
									onChange={(e) => props.handleChangecomment(10, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Statistical Tests"><div className="mrm-tab-title">Statistical Tests</div></Tooltip>} key="3">
						<div className="row">
							<div className="col-md-6 form-group">
								<BarChart 
									title="Kupiec POF Test Results (VaR, 99%)" 
									data={data.Statical_Test_Kupeic_POF_Results.VaR_99}
								/>
							</div>
							<div className="col-md-6 form-group">
								<BarChart 
									title="DE Test Results (CVaR, 99%)" 
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
									title="DE Test Results (CVaR, 95%)" 
									data={data.Statical_Test_Kupeic_POF_Results.CVaR_95}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("StatisticalTestsPOF")}
									commentIndex={props.commentIndex[11].comment}
									id="StatisticalTestsPOF"
									onChange={(e) => props.handleChangecomment(11, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Statistical Tests: Normality"><div className="mrm-tab-title">Statistical Tests: Normality</div></Tooltip>} key="4">
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

					<TabPane tab="" tab={<Tooltip title="Portfolo Composition"><div className="mrm-tab-title">Portfolo Composition</div></Tooltip>} key="5">
						<PortfolioComposition data={data.Port_Comp} />
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("PortfolioComposition")}
									commentIndex={props.commentIndex[13].comment}
									id="PortfolioComposition"
									onChange={(e) => props.handleChangecomment(13, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Top Individual VaR"><div className="mrm-tab-title">Top Individual VaR</div></Tooltip>} key="6">
						<TopIndividualVaR data={data.Top_Individual_VaR} />
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("TopIndividualVaR")}
									commentIndex={props.commentIndex[14].comment}
									id="TopIndividualVaR"
									onChange={(e) => props.handleChangecomment(14, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>

					<TabPane tab={<Tooltip title="Contributor/Diversifier to VaR"><div className="mrm-tab-title">Contributor/Diversifier to VaR</div></Tooltip>} key="7">
						<TopPortfolioVaR data={data.ContributorDiversifier} />
						<div className="row">
							<div className="col">
								<Comment 
									submittingcomment={props.submittingcomment}
									handleSubmitcomment={() => props.handleSubmitcomment("ContributorVaR")}
									commentIndex={props.commentIndex[15].comment}
									id="ContributorVaR"
									onChange={(e) => props.handleChangecomment(15, e.target.value)}
								/>
							</div>
						</div>
					</TabPane>
				</Tabs>
			}
		</div>
	);
}

const Circle=(props)=>{
	return (
		<div style={{width:'20px', height:'20px', borderRadius:'100%', background:(props.color==='green'?'#26C281':(props.color==='red'?'#F2784B':(props.color==='orange'?'orange':'#95A5A6')))}}>
		</div>
	)
}

function PortfolioTable(props){
	const {data, modelId}=props;
	/* let records=[
		{title:'Excess probability', var99:'0.01', var99status:'', var95:'0.05', var95status:'', cvar99:'0.01', cvar99status:'', cvar95:'0.05', cvar95status:''},
		{title:'No of observation', var99:'252', var99status:'', var95:'252', var95status:'', cvar99:'252', cvar99status:'', cvar95:'252', cvar95status:''},
		{title:'Number of excesses', var99:'5', var99status:'green', var95:'16', var95status:'green', cvar99:'3', cvar99status:'green', cvar95:'20', cvar95status:'red'},
		{title:'Range of excesses (Days)', var99:'0-6', var99status:'', var95:'7-18', var95status:'', cvar99:'0-6', cvar99status:'', cvar95:'7-18', cvar95status:''},
	]; */
	const [records, setRecords]=useState([]);
	useEffect(()=>{
		let rs=[];
		data.Heading.forEach((v,i)=>{
			if(i!==4){
				let ob={
					title:v, 
					var99:data.VaR_Confidence_Level_99[i]+'', 
					var99status:i===2?(data.VaR_Confidence_Level_99[4].toLowerCase()):'',

					var95:data.VaR_Confidence_Level_95[i]+'',
					var95status:i===2?(data.VaR_Confidence_Level_95[4].toLowerCase()):'',

					cvar99:data.CVaR_Confidence_Level_99[i]+'',
					cvar99status:i===2?(data.CVaR_Confidence_Level_99[4].toLowerCase()):'',

					cvar95:data.CVaR_Confidence_Level_95[i]+'',
					cvar95status:i===2?(data.CVaR_Confidence_Level_95[4].toLowerCase()):'',
				};
				rs.push(ob);
			}
		});
		setRecords(rs);
	}, [data])

	let ValidationResultsData=[] ;

	records.forEach((v,i)=>{
		  	ValidationResultsData.push({
				key:(i+1).toString(),
				vr_title:v.title, 
				vr_total_var99:{
					vr_99:v.var99 ,
					vr_var99status:v.var99status ,
				},
				vr_total_var95:{
					vr_95:v.var95 ,
					vr_var95status:v.var95status ,
				},
				cvr_total_cvar99:{
					cvr_99:v.cvar99 ,
					cvr_cvar99status:v.cvar99status ,
				},
				cvr_total_cvar95:{
					cvr_95:v.cvar95 ,
					cvr_cvar95status:v.cvar95status ,
				},
				
			});
		}
	)


	return(
		<div className="card1">
			<div className="card-body1 p2">
				<h5 className="card-title p-2 mb10">Validation Results Of Portfolio VaR Model ({modelId==='MKT_RISK2'?'30-Jun-2021':'30-Nov-2021'})</h5>
				<div>
					<Table size="small" dataSource={ValidationResultsData} pagination={false} scroll={{y:500}} style={{height:610}}>
						<Column title="" dataIndex="vr_title" key="vr_title"  />
						<ColumnGroup title={<div>VaR {modelId==='MKT_RISK2'?'Parametric':'Historical'} <div>(Confidence Level)</div></div>} align="center">
							<Column 
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
							/>
						</ColumnGroup>

						<ColumnGroup title={<div>CVaR {modelId==='MKT_RISK2'?'Parametric':'Historical'} <div>(Confidence Level)</div></div>} align="center">
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
						</ColumnGroup>
					</Table>
				</div>
			</div>
		</div>
	)
}

function HistoricalTable(props){
	const {modelId}=props;
	let records=[
		{title:'Jan-20', var99status:'green', var95status:'red', cvar99status:'green', cvar95status:'green'},
		{title:'Feb-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Mar-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Apr-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
		{title:'May-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Jun-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
		{title:'Jul-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Aug-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Sep-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Oct-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Nov-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
		{title:'Dec-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
	];

	
	let historicalData=[] ;

	records.map((v,i)=>(
		historicalData.push({
			key:(i+1).toString() ,
			...v
		})
	))
	
	return(
		<div className="card1">
			<div className="card-body1 p2">
				<h5 className="card-title p-2 mb10">Historical Model Performance</h5>
				<div className="">
					<Table size="small" dataSource={historicalData} pagination={false}>
						<Column title="Month End" dataIndex="title" key="title"  />
						<ColumnGroup title={<div>VaR {modelId==='MKT_RISK2'?'Parametric':'Historical'} <div>(Confidence Level)</div></div>} align="center">
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
						<ColumnGroup title={<div>CVaR {modelId==='MKT_RISK2'?'Parametric':'Historical'} <div>(Confidence Level)</div></div>} align="center">
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
					</Table>


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
			</div>
		</div>
	)
}

function LineAreaChart(props){
	const {data}=props;
	//console.log("sat", data);
	let cdata=typeof data[0]!== "undefined"?{chart:data[0].chart, table:(data[1]?data[1].table:data[0].table)}:{...data};
	const [options, setOptions]=useState(null);

	useEffect(()=>{
		if(!data){
			return;
		}

		let dates=cdata.chart.Date;
		let updata=cdata.chart.Up;
		let downdata=cdata.chart.Down;
		let linedata=cdata.chart.Return;
		let dots=cdata.chart.Dot || [];

		//let bblvals=[-251297268, -348134596, -331721355, -307113636, -490965216, -512381678, -490445942, -416178425];
		let bbledata=[];
		linedata.forEach((v,i)=>{
			if(dots[i]===1){
				bbledata.push(v);
			}else{
				bbledata.push(null);
			}
		});

		let allvalues=updata.concat(linedata).concat(downdata);
		let min=allvalues[0]*1;
		let max=allvalues[0]*1;
		allvalues.forEach(v=>{
			if(v*1<min){
				min=v*1;
			}
			if(v*1>max){
				max=v*1;
			}
		});

		let downMin=downdata[0]*1;
		let lineMin=linedata[0]*1;
		downdata.forEach(v=>{
			if(v*1<downMin){
				downMin=v*1;
			}
		});
		linedata.forEach(v=>{
			if(v*1<lineMin){
				lineMin=v*1;
			}
		});

		const opt={
			grid: {top: 40, right: 10, bottom: 20, left: 60},
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
				formatter:function(val){
					val=val*1;
					return ((val<0?'(':'')+(Math.abs(val)/1000000).toFixed(0)+(val<0?')':''))+'M';
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
			color:[defColors[0], defColors[1], defColors[0], "#ff0000"],
			series: [
			  {
				data: updata,
				type: 'line',
				areaStyle:{},
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
				areaStyle:{},
				symbol: 'none',
				smooth: true,
			  },
			  {
				name:"Anomaly",
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

	
	const backtestingDataSource=[
		{
			key:'1' ,
			excessprobability:cdata.table[0]['Excess probability'] ,
			numberofobservations:cdata.table[0]['No of observation'],
			numberofexcesses:cdata.table[0]['Number of excesses'],
			rangeofexcesses:cdata.table[0]['Range of excesses (days)'] || cdata.table[0]['Range_of_excesses']
		}
	]


	const backtestingCols = [
		{
		  title: 'Excess probability',
		  dataIndex: 'excessprobability',
		  ellipsis:true
		},
		{
		  title: 'Number of observations',
		  dataIndex: 'numberofobservations',
		  align: 'center',
		  ellipsis:true
		},
		{
		  title: 'Number of excesses',
		  dataIndex: 'numberofexcesses',
		  align: 'center',
		  ellipsis:true
		},
		{
			title: 'Range of excesses (days)',
			dataIndex: 'rangeofexcesses',
			align: 'center',
			ellipsis:true
		},
	];

	return (
		<>
			{options!==null &&
				<div className="p-3 border radius6 bg-light1">
					<ReactECharts option={options} opts={{renderer:'svg'}} style={{height:'300px'}} />

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

function BarChart(props){
	const {data}=props;
	const [options, setOptions]=useState(null);
	const [records, setRecords]=useState([]);

	useEffect(()=>{
		if(!data){
			return;
		}
		
		let bardata=data[0].chart.Probability;
		let max=bardata[0].replace("%", "")*1;
		bardata.forEach((v,i)=>{
			//{value:1.31, itemStyle:{color:'#D91E18'}}
			if(data[0].chart.Highlight[i]*1===1){
				bardata[i]=v={value:v.replace("%", ""), itemStyle:{color:'#D91E18'}}
			}

			let n;
			if(typeof v === "object"){
				v.value=v.value.replace("%", "");
				n=v.value*1;
			}else{
				v=bardata[i]=v.replace("%", "");
				n=v*1;
			}
			if(n>max){
				max=n;
			}
		});
		let areadata=[];
		let greenShade=data[0].chart.GreenShade || data[0].chart['Green Shade'];
		bardata.forEach((v,i)=>{
			if(greenShade && greenShade[i]*1===1){
				areadata.push(max+max*10/100);
			}else{
				areadata.push(null);
			}
		});

		const opt = {
			grid: {top: 30, right: 10, bottom: 20, left: 80},
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
				formatter:function(v){
					let n;
					if(typeof v === "object"){
						n=v.value*1;
					}else{
						n=v*1;
					}
					return n.toFixed(2)+'%';
				}
			  },
			},
			//color:['#26C281', '#3598DC'],
			color:defColors,
			series: [
			  {
				data: areadata,
				type: 'line',
				areaStyle:{},
				lineStyle:{width:0},
				symbol: 'none',
				//smooth: true,
				z:1
			  },
			  {
				data: bardata,
				type: 'bar',
				smooth: true,
				z:2
			  },
			],
			tooltip: {
			  trigger: 'axis',
			},
		};

		setOptions(opt);

		let tbl=data[1]?data[1].table:data[0].table;
		setRecords([{
			probability:tbl[0]['Excess probability'],
			observations:tbl[0]['No of observation'],
			no_of_excesses:tbl[0]['Number of excesses'],
			kupiec_value:tbl[0]['Theoretical_Kupiec_value'] || tbl[0]['Theoretical Kupiec value'],
			cut_point:tbl[0]['Cut_point'] || tbl[0]['Cut point'],
			test_result:""
		}]);

		console.log("saty "+props.title, data, areadata)
	}, [data]);

	let KupiecData=[] ;

	records.map((v,i)=>(
		KupiecData.push({
			key:(i+1).toString() ,
			...v
		})
	))

	return (
		<div className="p-3 border radius6">
			{options!==null &&
				<ReactECharts option={options} opts1={{renderer:'svg'}} style={{height:'300px'}} />
			}
			<div className="mt-3">
				<div className="">
					{/* <Table dataSource={} columns={} pagination={false} /> */}
					<Table size="small" dataSource={KupiecData} pagination={false}>
						<Column title="Excess probability" dataIndex="probability" key="probability" ellipsis={true}  />
						<Column 
							title="Number of bservations" 
							dataIndex="observations" 
							align="center"
							key="observations"
							ellipsis={true}
							render={observations=>(
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
							render={no_of_excesses=>(
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
				</div>
			</div>
		</div>
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

function PortfolioComposition(props){
	let {data}=props;
	const [records1, setRecords1]=useState([]);
	const [records2, setRecords2]=useState([]);

	let rec1=[
		{title:'Valores a N', marketValue:['2,089', '1.9%'], var99:['14', '2.9%'], var95:['14', '2.9%'], cvar99:['14', '2.9%'], cvar95:['14', '2.9%']},
		{title:'Vencimiento', marketValue:['45,944', '40.8%'], var99:['210', '42.8%'], var95:['105', '43.3%'], cvar99:['220', '43.9%'], cvar95:['136', '38.3%']},
		{title:'Venta', marketValue:['64,674', '57.4%'], var99:['267', '54.4%'], var95:['132', '54.4%'], cvar99:['271', '54.1%'], cvar95:['208', '58.4%']},
		{title:'Total', marketValue:['1,12,708', ''], var99:['491', ''], var95:['243', ''], cvar99:['502', ''], cvar95:['356', ''], isTotal:true},
	];

	let rec2=[
		{title:'DOP', marketValue:['84,157', '74.7%'], var99:['376', '76.7%'], var95:['184', '75.7%'], cvar99:['382', '76.2%'], cvar95:['275', '77.2%']},
		{title:'USD', marketValue:['28,550', '25.3%'], var99:['115', '23.3%'], var95:['59', '24.3%'], cvar99:['120', '23.8%'], cvar95:['81', '22.8%']},
		{title:'Total', marketValue:['1,12,708', ''], var99:['491', ''], var95:['243', ''], cvar99:['502', ''], cvar95:['356', ''], isTotal:true},
	];

	let InstrumentClassificationData=[] ;
	let CurrencyData=[] ;

	records1.map((v,i)=>(
		InstrumentClassificationData.push({
			key:(i+1).toString() ,
			title:v.title,
			marketValue0:v.marketValue[0] ,
			marketValue1:v.marketValue[1] ,
			var99_0:v.var99[0] ,
			var99_1:v.var99[1] ,
			var95_0:v.var95[0] ,
			var95_1:v.var95[1] ,
			cvar99_0:v.cvar99[0] ,
			cvar99_1:v.cvar99[1] ,
			cvar95_0:v.cvar95[0] ,
			cvar95_1:v.cvar95[1] ,
		})
	))

	records2.map((v,i)=>(
		CurrencyData.push({
			key:(i+1).toString() ,
			title:v.title,
			marketValue0:v.marketValue[0] ,
			marketValue1:v.marketValue[1] ,
			var99_0:v.var99[0] ,
			var99_1:v.var99[1] ,
			var95_0:v.var95[0] ,
			var95_1:v.var95[1] ,
			cvar99_0:v.cvar99[0] ,
			cvar99_1:v.cvar99[1] ,
			cvar95_0:v.cvar95[0] ,
			cvar95_1:v.cvar95[1] ,
		})
	))

	useEffect(()=>{
		data[0].forEach((v,ind)=>{
			if(ind===0) return;
			let i=ind-1;
			rec1[i].marketValue=[v['Market Value'].toFixed(2), i===3?'':v['Market Value_%'].toFixed(2)+'%'];
			rec1[i].var99=[v['VaR 99'].toFixed(2), i===3?'':v['VaR 99%'].toFixed(2)+'%'];
			rec1[i].var95=[v['VaR 95'].toFixed(2), i===3?'':v['VaR 95%'].toFixed(2)+'%'];
			rec1[i].cvar99=[v['CVaR 99'].toFixed(2), i===3?'':v['CVaR 99%'].toFixed(2)+'%'];
			rec1[i].cvar95=[v['CVaR 95'].toFixed(2), i===3?'':v['CVaR 95%'].toFixed(2)+'%'];
		});
		data[1].forEach((v,ind)=>{
			if(ind===0) return;
			let i=ind-1;
			rec2[i].marketValue=[v['Market Value'].toFixed(2), i===2?'':v['Market Value_%'].toFixed(2)+'%'];
			rec2[i].var99=[v['VaR 99'].toFixed(2), i===2?'':v['VaR 99%'].toFixed(2)+'%'];
			rec2[i].var95=[v['VaR 95'].toFixed(2), i===2?'':v['VaR 95%'].toFixed(2)+'%'];
			rec2[i].cvar99=[v['CVaR 99'].toFixed(2), i===2?'':v['CVaR 99%'].toFixed(2)+'%'];
			rec2[i].cvar95=[v['CVaR 95'].toFixed(2), i===2?'':v['CVaR 95%'].toFixed(2)+'%'];
		});

		setRecords1([...rec1]);
		setRecords2([...rec2]);
	}, [data]);

	return(
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
							<Column title="" dataIndex="title" key="title"  />
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
					</div>
				</div>
			</div>

			<div className="card1 mt30">
				<div className="card-body1 p2">
					<h5 className="card-title p-2 mb10">Exposure and VaR by Currency</h5>
					<div className="table-responsive">

						<Table 
							rowClassName={(record, index) => {
								return record.key === "3" ? "fontStyle" : "";
							}} 
							size="small" 
							dataSource={CurrencyData} 
							pagination={false}>
							<Column title="" dataIndex="title" key="title"  />
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
					</div>
				</div>
			</div>
		</div>
	)
}

function TopIndividualVaR(props){
	/* let records=[
		{isin_var99:'DO1002216526', var99:3, isin_var95:'DO1002212020', var95:8, isin_cvar99:'DO1005204214', cvar99:4, isin_cvar95:'DO1002219017', cvar95:5},
		{isin_var99:'DO1002216625', var99:2.9, isin_var95:'DO1002212822', var95:3.8, isin_cvar99:'DO1005204412', cvar99:3.9, isin_cvar95:'DO1002219124', cvar95:4.8},
		{isin_var99:'DO1002216724', var99:2.8, isin_var95:'DO1002213325', var95:3.6, isin_cvar99:'DO1005204719', cvar99:3.8, isin_cvar95:'DO1002219322', cvar95:4.6},
		{isin_var99:'DO1002217128', var99:2.7, isin_var95:'DO1002213820', var95:3.4, isin_cvar99:'DO1005205013', cvar99:3.7, isin_cvar95:'DO1002220023', cvar95:4.2},
		{isin_var99:'DO1002217227', var99:2.6, isin_var95:'DO1002213929', var95:3.2, isin_cvar99:'DO1005205112', cvar99:3.6, isin_cvar95:'DO1002219926', cvar95:4.4},
		{isin_var99:'DO1002217425', var99:2.5, isin_var95:'DO1002214521', var95:3, isin_cvar99:'DO1005205310', cvar99:3.5, isin_cvar95:'DO1002220528', cvar95:4},
		{isin_var99:'DO1002218423', var99:2.4, isin_var95:'DO1002215726', var95:2.8, isin_cvar99:'DO1005205419', cvar99:3.4, isin_cvar95:'DO1002220627', cvar95:3.8},
		{isin_var99:'DO1002218522', var99:2.3, isin_var95:'DO1002215825', var95:2.6, isin_cvar99:'DO1005205617', cvar99:3.3, isin_cvar95:'DO1002220718', cvar95:3.6},
		{isin_var99:'DO1002218621', var99:2.2, isin_var95:'DO1002216112', var95:2.4, isin_cvar99:'DO1005205914', cvar99:3.2, isin_cvar95:'DO1002221427', cvar95:3.4},
		{isin_var99:'DO1002218720', var99:2.1, isin_var95:'DO1002216427', var95:2.2, isin_cvar99:'DO1005206011', cvar99:3.1, isin_cvar95:'DO1002257728', cvar95:3.2},
	]; */
	
	const [records, setRecords]=useState([]);
	useEffect(()=>{
		let records=props.data;
		/* records.forEach(v=>{
			v.var99*=10;
			v.var95*=10;
			v.cvar99*=10;
			v.cvar95*=10;
		}) */
		setRecords(records);
	}, [props.data])


	return(
		<div className="card1">
			<div className="card-body1 p2">
				<h5 className="card-title p-2 mb10">Top 10 Instruments by Individual VaR</h5>
				<div className="border radius6">
					<div className="table-responsive">
						<table className="table table-sm borderless m-0">
							<thead className="table-text-vmid text-center bg-light1 theadcolor">
								<tr>
									<th className="w-25">VaR 99%</th>
									<th className="w-25">VaR 95%</th>
									<th className="w-25">CVaR 99%</th>
									<th className="w-25">CVaR 95%</th>
								</tr>
							</thead>

							<tbody>
								{records.map((v,i)=>(
									<tr key={i}>
										<td className="greybg1">
											<div className="d-flex">
												<div className="my-auto wper40 pl20">
													{v.isin_var99}
												</div>
												<div className="my-auto wper60 pr20">
													<div className="mrm-tbl-perchart-bx">
														{v.var99<0?(
															<span>({Math.abs(v.var99).toFixed(2)}%)</span>
														):(
															<span>{v.var99.toFixed(2)}%</span>
														)}
														
														<div className={"mrm-tbl-perchart "+(v.var99>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(10*v.var99)+'%', background:defColors[0]}}></div>
													</div>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex">
												<div className="my-auto wper40 pl20">
													{v.isin_var95}
												</div>
												<div className="my-auto wper60 pr20">
													<div className="mrm-tbl-perchart-bx">
														{v.var95<0?(
															<span>({Math.abs(v.var95).toFixed(2)}%)</span>
														):(
															<span>{v.var95.toFixed(2)}%</span>
														)}
														<div className={"mrm-tbl-perchart "+(v.var95>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(10*v.var95)+'%', background:defColors[2]}}></div>
													</div>
												</div>
											</div>
										</td>

										<td className="greybg1">
											<div className="d-flex">
												<div className="my-auto wper40 pl20">
													{v.isin_cvar99}
												</div>
												<div className="my-auto wper60 pr20">
													<div className="mrm-tbl-perchart-bx">
														{v.cvar99<0?(
															<span>({Math.abs(v.cvar99).toFixed(2)}%)</span>
														):(
															<span>{v.cvar99.toFixed(2)}%</span>
														)}
														<div className={"mrm-tbl-perchart "+(v.cvar99>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(10*v.cvar99)+'%', background:defColors[3]}}></div>
													</div>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex">
												<div className="my-auto wper40 pl20">
													{v.isin_cvar95}
												</div>
												<div className="my-auto wper60 pr20">
													<div className="mrm-tbl-perchart-bx">
														{v.cvar95<0?(
															<span>({Math.abs(v.cvar95).toFixed(2)}%)</span>
														):(
															<span>{v.cvar95.toFixed(2)}%</span>
														)}
														<div className={"mrm-tbl-perchart "+(v.cvar95>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(10*v.cvar95)+'%', background:defColors[4]}}></div>
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
		</div>
	)
}

function TopPortfolioVaR(props){
	/* let records=[
		{isin_var99:'DO1002216526', var99:57.9, isin_var95:'DO1002212020', var95:72.4, isin_cvar99:'DO1005204214', cvar99:50.7, isin_cvar95:'DO1002219017', cvar95:86.9},
		{isin_var99:'DO1002216625', var99:43.3, isin_var95:'DO1002212822', var95:54.2, isin_cvar99:'DO1005204412', cvar99:37.9, isin_cvar95:'DO1002219124', cvar95:65.0}, 
		{isin_var99:'DO1002216724', var99:38.6, isin_var95:'DO1002213325', var95:48.2, isin_cvar99:'DO1005204719', cvar99:33.8, isin_cvar95:'DO1002219322', cvar95:57.9}, 
		{isin_var99:'DO1002217128', var99:33.0, isin_var95:'DO1002213820', var95:41.2, isin_cvar99:'DO1005205013', cvar99:28.9, isin_cvar95:'DO1002219926', cvar95:49.5}, 
		{isin_var99:'DO1002217227', var99:29.8, isin_var95:'DO1002213929', var95:37.2, isin_cvar99:'DO1005205112', cvar99:26.0, isin_cvar95:'DO1002220023', cvar95:44.6}, 
		{isin_var99:'DO1002217425', var99:-29.8, isin_var95:'DO1002214521', var95:-37.2, isin_cvar99:'DO1005205310', cvar99:-26.0, isin_cvar95:'DO1002220528', cvar95:-44.6},
		{isin_var99:'DO1002218423', var99:-33.0, isin_var95:'DO1002215726', var95:-41.2, isin_cvar99:'DO1005205419', cvar99:-28.9, isin_cvar95:'DO1002220627', cvar95:-49.5},
		{isin_var99:'DO1002218522', var99:-38.6, isin_var95:'DO1002215825', var95:-48.2, isin_cvar99:'DO1005205617', cvar99:-33.8, isin_cvar95:'DO1002220718', cvar95:-57.9},
		{isin_var99:'DO1002218621', var99:-43.3, isin_var95:'DO1002216112', var95:-54.2, isin_cvar99:'DO1005205914', cvar99:-37.9, isin_cvar95:'DO1002221427', cvar95:-65.0},
		{isin_var99:'DO1002218720', var99:-57.9, isin_var95:'DO1002216427', var95:-72.4, isin_cvar99:'DO1005206011', cvar99:-50.7, isin_cvar95:'DO1002257728', cvar95:-86.9},
	]; */

	const [records, setRecords]=useState([]);
	useEffect(()=>{
		setRecords(props.data);
	}, [props.data])

	const TrRow=(props)=>{
		const {v, i}=props;

		return(
			<tr>
				{i===0 && v.var99>=0 &&
					<td className="position-relative" style={{background:'rgb(118 118 118)', borderRight:'3px solid #fff', borderTop:'1px solid #fff'}} rowSpan={records.filter(v=>v.var99>=0).length}>
						<div className="mrm-tbl-perchart-rotate-lbl left1">Top 5 Contributor</div>
					</td>
				}
				{i===0 && v.var99<0 &&
					<td className="position-relative" style={{background:'rgb(118 118 118)', borderRight:'3px solid #fff'}} rowSpan={records.filter(v=>v.var99<0).length}>
						<div className="mrm-tbl-perchart-rotate-lbl left2">Top 5 Diversifier</div>
					</td>
				}

				<td className="greybg1">
					<div className="d-flex">
						<div className="my-auto wper40 pl20">
							{v.isin_var99}
						</div>
						<div className="my-auto wper60 pr20">
							<div className="mrm-tbl-perchart-bx">
								{v.var99<0?(
									<span>({Math.abs(v.var99).toFixed(2)})</span>
								):(
									<span>{v.var99.toFixed(2)}</span>
								)}
								
								<div className={"mrm-tbl-perchart "+(v.var99>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(v.var99)+'%', background:defColors[0]}}></div>
							</div>
						</div>
					</div>
				</td>
				<td>
					<div className="d-flex">
						<div className="my-auto wper40 pl20">
							{v.isin_var95}
						</div>
						<div className="my-auto wper60 pr20">
							<div className="mrm-tbl-perchart-bx">
								{v.var95<0?(
									<span>({Math.abs(v.var95).toFixed(2)})</span>
								):(
									<span>{v.var95.toFixed(2)}</span>
								)}
								<div className={"mrm-tbl-perchart "+(v.var95>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(v.var95)+'%', background:defColors[2]}}></div>
							</div>
						</div>
					</div>
				</td>

				<td className="greybg1">
					<div className="d-flex">
						<div className="my-auto wper40 pl20">
							{v.isin_cvar99}
						</div>
						<div className="my-auto wper60 pr20">
							<div className="mrm-tbl-perchart-bx">
								{v.cvar99<0?(
									<span>({Math.abs(v.cvar99).toFixed(2)})</span>
								):(
									<span>{v.cvar99.toFixed(2)}</span>
								)}
								<div className={"mrm-tbl-perchart "+(v.cvar99>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(v.cvar99)+'%', background:defColors[3]}}></div>
							</div>
						</div>
					</div>
				</td>
				<td>
					<div className="d-flex">
						<div className="my-auto wper40 pl20">
							{v.isin_cvar95}
						</div>
						<div className="my-auto wper60 pr20">
							<div className="mrm-tbl-perchart-bx">
								{v.cvar95<0?(
									<span>({Math.abs(v.cvar95).toFixed(2)})</span>
								):(
									<span>{v.cvar95.toFixed(2)}</span>
								)}
								<div className={"mrm-tbl-perchart "+(v.cvar95>=0?'mrm-tbl-perchart-left':'mrm-tbl-perchart-right')} style={{width:Math.abs(v.cvar95)+'%', background:defColors[4]}}></div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		)
	}

	return(
		<div className="card1">
			<div className="card-body1 p2">
				<h5 className="card-title p-2 mb10">Top 5 Contributor and Diversifier of Portfolio VaR</h5>
				<div className="border radius6">
					<div className="table-responsive">
						<table className="table table-sm table-borderless m-0">
							<thead className="table-text-vmid text-center theadcolor">
								<th className="w40" style={{borderRight:0}}></th>
								<th className="" style={{borderLeft:0}}>VaR 99%</th>
								<th className="">VaR 95%</th>
								<th className="">CVaR 99%</th>
								<th className="">CVaR 95%</th>
							</thead>

							<tbody className="table-text-vmid">
								{records.filter(v=>v.var99>=0).map((v,i)=>(
									<TrRow key={i} i={i} v={v} />
								))}

								<tr>
									<td colSpan="5" style={{padding:'2px 0'}}>
										<div style={{borderTop:'1px solid rgb(30, 123, 165)'}}></div>
									</td>
								</tr>
								
								{records.filter(v=>v.var99<0).map((v,i)=>(
									<TrRow key={i} i={i} v={v} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MktRisk1Page;