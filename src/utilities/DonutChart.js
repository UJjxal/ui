import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: props.labels,
        colors: this.props.colors?this.props.colors:["#fa7171", "#26a69a",'#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
        legend: {
          show: this.props.disabledLegend?false:true,
          position: this.props.legendPos?this.props.legendPos:"bottom",
          horizontalAlign: 'left'
        },
        dataLabels: {
          enabled: false,
        }
      },
      series: props.series,
    };
  }

  render() {
    return (
      <div className="donut">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type={this.props.type ? this.props.type : "pie"}
          height={this.props.height ? this.props.height : 270}
        />
      </div>
    );
  }
}
