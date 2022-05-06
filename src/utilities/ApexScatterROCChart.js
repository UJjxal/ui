import React from "react";
import ReactApexChart from "react-apexcharts";
import { MDBInputNumeric } from "mdbreact";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "SAMPLE A",
          data: [
            [16.4, 5.4],
            [21.7, 2],
            [25.4, 3],
            [19, 2],
            [10.9, 1],
            [13.6, 3.2],
            [10.9, 7.4],
            [10.9, 0],
            [10.9, 8.2],
            [16.4, 0],
            [16.4, 1.8],
            [13.6, 0.3],
            [13.6, 0],
            [29.9, 0],
            [27.1, 2.3],
            [16.4, 0],
            [13.6, 3.7],
            [10.9, 5.2],
            [16.4, 6.5],
            [10.9, 0],
            [24.5, 7.1],
            [10.9, 0],
            [8.1, 4.7],
            [19, 0],
            [21.7, 1.8],
            [27.1, 0],
            [24.5, 0],
            [27.1, 0],
            [29.9, 1.5],
            [27.1, 0.8],
            [22.1, 2],
          ],
        },
        // {
        //   name: "SAMPLE B",
        //   data: [
        //   [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
        // },
      ],
      options: {
        chart: {
          height: 270,
          type: "scatter",
          dropShadow: {
            enabled: false,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          zoom: {
            enabled: true,
            type: "xy",
          },
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "straight",
          width: 1.5,
        },
        colors: ["#77B6EA", "#0d47a1"],
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          title: {
            text: "False Positive Rate",
            offsetY: 5,
            style: {
              color: undefined,
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-xaxis-title",
            },
          },
          offsetY: -3,
          tickAmount: 10,
          labels: {
            formatter: function (val) {
              return (parseFloat(val) * 10).toFixed(0);
            },
            show: true,
            style: {
              colors: [],
              fontSize: "10px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-xaxis-label",
            },
          },
          type: "numeric",
          tickAmount: 10,
          min: 0,
          max: 1.0,
          // range:100
        },
        yaxis: {
          title: {
            text: "True Positive Rate",
          },
          // tickAmount: 7,
          labels: {
            formatter: function (val) {
              return parseFloat(val).toFixed(1);
            },
          },
          min: 0,
          max: 1,
        },
      },
    };
  }

  render() {
    // console.log("ROC series:", this.props.series)
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type="line"
          height={270}
        />
      </div>
    );
  }
}
