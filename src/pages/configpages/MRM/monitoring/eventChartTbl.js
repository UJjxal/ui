import React, {useState, useEffect} from "react";
import { Row, Col, Card } from "antd";

import KsChart from "./ksChart";
import ReactECharts from 'echarts-for-react';
import TableData from "../../../../utilities/Table";
let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

export default function EventChartTbl(props){
	const [tblData, setTblData]=useState([]);
	const [chartOptions, setChartOptions]=useState(null);

	const tblHeders=[
		{
		  title: 'Rating',
		  dataIndex: 'Rating',
		  align: 'left'
		},
		{
		  title: 'Good Customers',
		  dataIndex: 'Good_Customers',
		  align: 'right'
		},
		{
		  title: 'Bad Customers',
		  dataIndex: 'Bad_Customers',
		  align: 'right'
		},
		{
		  title: 'Event Rate',
		  dataIndex: 'Event_Rate',
		  align: 'right'
		}
	];

	useEffect(()=>{
		let records=props.apiData.EventBarPlot[0];
		records.forEach((v,i)=>{v.key=i;});
		setTblData(records);

		const opt = {
			grid: {top: 30, right: 40, bottom: 50, left: 60},
			title: {
				left: 'center',
				text: ""
			},
			legend:{
				bottom:'0', left:'center', icon:'roundRect', itemGap:25,
			},
			xAxis: {
			  type: 'category',
			  data: [8,7,6,5,4,3,2,1],
			},
			// yAxis: {
			// 	type: 'value'
			// },
			color:[defColors[0], defColors[1], "#91CC75"],
			yAxis: [
				{
					type: 'value',
					name: 'Count of Good/Bad',
					//min: 0,
					//max: 150,
					splitLine: { show: false }
					// interval: 5,
					// axisLabel: {
					//   formatter: '{value} ml'
					// }
				  },
				  {
					type: 'value',
					name: 'Event Rate',
					//min: 0,
					//max: 10,
					splitLine: { show: false },
					// interval: 5,
					axisLabel: {
					  formatter: '{value} %'
					}
				  }
			],
			series: [
			  {
				name:'Good Customers',
				data: records.map(v=>v.Good_Customers),
				type: 'bar',
				smooth: true,
				yAxisIndex:0,
			  },
			  {
				name:'Bad Customers',
				data: records.map(v=>v.Bad_Customers),
				type: 'bar',
				smooth: true,
				yAxisIndex:0,
			  },
			  {
				name:'Event Rate',
				data: records.map(v=>v.Event_Rate),
				type: 'line',
				smooth: true,
				yAxisIndex:1,
			  }
			],
			tooltip: {
			  trigger: 'axis',
			},
		};
		setChartOptions(opt);

	}, [props.apiData])

	return(
		<div className="row mingap">
			<div className="col-md-6">
				<div className="border radius6 p10 bg-white">
					<div className="fs20">Event Distribution Chart</div>
					<div>
						{chartOptions!==null &&
							<ReactECharts option={chartOptions} opts={{renderer:'svg'}} style={{height:'320px'}} />
  						}
					</div>
				</div>
			</div>

			<div className="col-md-6">
				<TableData
					rowClassName="rowSubTable"
					dataSource={tblData}
					tblScroll={{y:400}}
					noBordered={true}
					cardStyle={{padding:0}}
					column={tblHeders}
					size="small"
				/>
			</div>
		</div>
	);
}