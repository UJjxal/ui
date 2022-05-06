import React from 'react';

// import Highcharts from "./highcharts.src.js";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

class LineBar3 extends React.Component {
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
							text: 'GTN',
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
									format: '{value}%',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
								title: {
									text: 'Effective Rebate %',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
							},
							{
								// Secondary yAxis
								title: {
									text: 'GTN %',
									style: {
										color: Highcharts.getOptions().colors[1],
									},
								},
								labels: {
									format: '{value}%',
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
								name: 'Scenario1 (GTN)',
								type: 'column',
								yAxis: 1,
								data: [86.58, 96.22, 85.6, 91.32, 90.96, 90.75, 96.31, 98.2],
								tooltip: {
									valueSuffix: '%',
								},
							},
							{
								name: 'Scenario2 (GTN)',
								type: 'column',
								yAxis: 1,
								data: [86.58, 62.69, 57.77, 60.57, 55.89, 50.43, 48.03, 52.79],
								tooltip: {
									valueSuffix: '%',
								},
							},
							{
								name: 'No Deal (GTN)',
								type: 'column',
								yAxis: 1,
								data: [86.58, 84.68, 81.83, 80.88, 75.9, 75.62, 74.4, 75.15],
								tooltip: {
									valueSuffix: '%',
								},
							},
							{
								name: 'Scenario1 (Rebate)',
								type: 'spline',
								data: [15, 15, 15, 15, 15, 15, 15, 15],
								tooltip: {
									valueSuffix: '%',
								},
							},
							{
								name: 'Scenario2 (Rebate)',
								type: 'spline',
								data: [10, 10, 10, 10, 10, 10, 10, 10],
								tooltip: {
									valueSuffix: '%',
								},
							},
						],
					}}
				/>
			</div>
		);
	}
}

export default LineBar3;
