import React from 'react';

// import Highcharts from "./highcharts.src.js";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

class LineBar4 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}
	render() {
		return (
			<div style={{ height: '18rem' }}>
				<HighchartsReact
					constructorType={'chart'}
					containerProps={{ style: { height: '100%' } }}
					highcharts={Highcharts}
					options={{
						chart: {
							zoomType: 'xy',
						},
						title: {
							text: 'ROC',
						},
						credits: { enabled: false },

						xAxis: [
							{
								categories: [
									'2020Q1',
									'2020Q2',
									'2020Q3',
									'2020Q4',
									'2021Q1',
									'2021Q2',
									'2021Q3',
									'2021Q4',
								],
								crosshair: true,
							},
						],
						yAxis: [
							{
								// Primary yAxis
								labels: {
									format: '{value}',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
								title: {
									text: '',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
							},
							{
								// Secondary yAxis
								title: {
									text: 'Million ($)',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
								labels: {
									format: '{value}',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
								opposite: true,
							},
						],
						tooltip: {
							shared: true,
						},
						legend: {
							layout: 'horizontal',
							align: 'bottom',
							x: 0,
							verticalAlign: 'top',
							y: 10,
							floating: true,
							backgroundColor:
								Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)', // theme
						},
						series: [
							{
								name: 'Scenario1 (Net Contract Profit)',
								type: 'column',
								yAxis: 1,
								data: [86.0, 88.3, 71.54, 67.99, 61.87, 63.24, 68.9, 68.91],
								tooltip: {
									valueSuffix: '',
								},
							},
							{
								name: 'Scenario2 (Net Contract Profit)',
								type: 'column',
								yAxis: 1,
								data: [86.0, 57.53, 48.28, 52.59, 41.13, 32.32, 28.9, 34.07],
								tooltip: {
									valueSuffix: '',
								},
							},
							{
								name: 'No Deal Profit',
								type: 'column',
								yAxis: 1,
								data: [75.12, 66.72, 62.01, 63.65, 51.39, 43.14, 43.48, 49.07],
								tooltip: {
									valueSuffix: '',
								},
							},

							{
								name: 'ROC_Scenario1',
								type: 'spline',
								data: [2.0, 1.83, 1.08, 1.15, 0.97, 1.34, 0.38, -0.16],
								tooltip: {
									valueSuffix: '',
								},
							},
							{
								name: 'ROC_Scenario2',
								type: 'line',
								data: [1.48, 1.19, 0.73, 0.76, 0.6, 0.75, 0.19, -0.08],
								tooltip: {
									valueSuffix: '',
								},
							},
						],
					}}
				/>
			</div>
		);
	}
}

export default LineBar4;
