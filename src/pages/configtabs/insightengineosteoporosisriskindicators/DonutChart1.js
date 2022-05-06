import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart:  {
          height: 270
        },
        labels: props.labels,
        colors: ["#fa7171", "#26a69a"],
        legend: {
          position: "top"
        }
      },
      series: props.series
    };
  }

  render() {
    return (
      <div className="donut">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type={this.props.type ? this.props.type : "pie"}
          height={270}
        />
      </div>
    );
  }
}
