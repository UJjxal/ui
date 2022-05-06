import React from 'react';

// import Highcharts from "./highcharts.src.js";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

class LineBar5 extends React.Component {
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
									"Q1'20",
									"Q2'20",
									"Q3'20",
									"Q4'20",
									"Q1'21",
									"Q2'21",
									"Q3'21",
									"Q4'21",
									"Q1'22",
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
							x: 25,
							verticalAlign: 'bottom',
							y: 14,
							floating: true,
							backgroundColor:
								Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)', // theme
						},
						series: [
							{
								name: 'E to P',
								type: 'column',
								yAxis: 1,
								data: [
									30113930,
									33611051,
									34528705,
									34896699,
									34933592,
									34814563,
									34524184,
									34831576,
									35428759,
								],
								tooltip: {
									valueSuffix: '',
								},
							},
							{
								name: 'E to E',
								type: 'column',
								yAxis: 1,
								data: [
									30113930,
									30113930,
									30113930,
									30113930,
									30113930,
									30113930,
									30113930,
									30113930,
									30113930,
								],
								tooltip: {
									valueSuffix: '',
								},
							},
							{
								name: 'ROC',
								type: 'spline',
								data: [0.0, 0.07, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1],
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

export default LineBar5;
