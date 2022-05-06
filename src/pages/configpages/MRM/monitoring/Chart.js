import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: props.series,
      categories: props.categories,
    };
  }

  componentDidUpdate() {
    console.log("rankChart121");
  }

  render() {
    let options = {
      chart: {
        id: "rankOrdering",
        height: 300,
        type: "line",
        dropShadow: {
          enabled: false,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#0d47a1"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: this.state.categories,
        title: {
          text: "Score Decile",
          style: {
            fontWeight: 300,
          },
        },
        min: 0,
      },
      yaxis: {
        tickAmount: 6,
        min: 0,
        max: 60,
        title: {
          text: "Events Rate %",
          style: {
            fontWeight: 300,
          },
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },
    };
    console.log("kschart121", this.props);
    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={this.props.series}
          type="line"
          height={this.props.height ? this.props.height : 370}
        />
      </div>
    );
  }
}
export default ApexChart;
