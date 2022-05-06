/** DemoInsights, FeatureImportance*3,  */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class EChart extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	/**
	 * E-chart options
	 */
	getOption() {
		const series = this.props.series.map((item) => {
			return {
				type: 'line',
				showSymbol: false,
				smooth: true,
				name: item.name,
				data: item.data,
				lineStyle:
					item.name !== 'KPI'
						? {
								color: item.name === 'High Acceptance Range' ? '#CC0000' : '#238823',
								type: 'dashed',
								width: 1,
						  }
						: null,
				markPoint: item.markPoint
					? {
							symbolSize: this.props.mini === true ? 10 : 30,
							data: item.markPoint.map((point) => {
								return {
									xAxis: point.xAxis,
									yAxis: point.yAxis,
									symbol: 'circle',
									symbolSize: this.props.mini === true ? 3 : 10,
									itemStyle: {
										color: '#CC0000',
									},
								};
							}),
					  }
					: null,
			};
		});

		const option = {
			title: {
				text: this.props.title,
				//subtext: "subtitle",
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
			
				top: this.props.mini ?2:25,

				padding: [5, 5, 0, 0],
				textStyle: {
					fontSize: this.props.mini ? 8 : 12,
				},
			},
			toolbox: {
				show: this.props.mini === true ? false : true,
				feature: {
					// dataZoom: {
					//   yAxisIndex: "none",
					// },
					//dataView: { readOnly: false },
					magicType: {
						type: ['line', 'bar'],
						title: { line: 'Line', bar: 'Bar' },
					},
					//restore: {title: "Restore"},
					saveAsImage: { title: 'Save Image' },
				},
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: this.props.xAxis,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: (value) => this.yaxisFormatter(value),
				},
				boundaryGap: [0, '100%'],
				min: function (value) {
					return Math.floor(value.min - value.min * 0.02);
				},
				max: function (value) {
					return Math.ceil(value.max + value.max * 0.1);
				},
				scale: true,
				axisLine: { onZero: false },
			},
			series: series,
			dataZoom:
				this.props.mini === true
					? [
							{
								id: 'dataZoomX',
								type: 'slider',
								xAxisIndex: [0],
								filterMode: 'filter',
								handleSize: '70%',
								textStyle: {
									fontSize: 6,
								},
								handleIcon:
									'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z', //
							},
					  ]
					: [
							// {
							//   type: "inside",
							//   start: 0,
							//   end: 100,
							// },
							// {
							//   start: 0,
							//   end: 100,
							//   handleSize: "80%",
							//   bottom: "0",
							// },
							{
								id: 'dataZoomX',
								type: 'slider',
								xAxisIndex: [0],
								filterMode: 'filter',
								handleSize: '80%',
								textStyle: {
									fontSize: 8,
								},
								handleIcon:
									'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z', //
							},
							// {
							//   id: "dataZoomY",
							//   rangeMode: ["value", 100],
							//   type: "slider",
							//   yAxisIndex: [0],
							//   filterMode: "empty",
							//   handleSize: "80%",
							//   handleIcon:
							//     "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z", //
							// },
					  ],
			color: ['#065196', '#238823', '#CC0000', '#1890ff', '#c1c1c1'],
		};

		return option;
	}

	yaxisFormatter(value) {
		if (this.props.chartType === '$' && value.toString().length > 9) {
			let newVal = (value / 1000000000).toFixed(0) + 'Bn';
			return `${newVal} ${this.props.chartType}`;
		}
		if (this.props.chartType === '$' && value.toString().length > 6) {
			let newVal = (value / 1000000).toFixed(0) + 'Mn';
			return `${newVal} ${this.props.chartType}`;
		}
		return `${value} ${this.props.chartType}`;
	}

	render() {
		return (
			<React.Fragment>
				<ReactEcharts style={{ height: '100%' }} option={this.getOption()} />
			</React.Fragment>
		);
	}
}

export default EChart;
