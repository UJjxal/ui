import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27],
        },
      ],
    };
  }

  options = {
    chart: {
      height: 350,
      type: "bar",
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: this.props.categories.length > 5 ? "90%" : "40%",
      },
    },
    colors: [
      "#1C4E80",
      "#0091D5",
      "#F0F0F0",
      "#4285f4",
      "#5d95f0",
      "#6592db",
      "#7899cf",
    ],

    xaxis: {
      categories: this.props.categories
        ? this.props.categories
        : ["GMT 1", "GMT 2", "GMT 3", "GMT 4", "GMT 5", "GMT 6"],
      lines: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  render() {
      return (
      <div id="chart">
        <ReactApexChart
          // options={this.getOptions(color9, color8, color5)}
          options={this.options}
          series={this.props.series}
          type={"bar"}
          height={300}
        />
      </div>
    );
  }
}

export default ApexChart;
