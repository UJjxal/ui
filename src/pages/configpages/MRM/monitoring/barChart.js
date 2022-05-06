import React from "react";
import ReactApexChart from "react-apexcharts";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    console.log("sat constructor121", props);

    this.state = {
      /*series: [
        {
          name: "Actual",
          data: [9, 13, 14, 14, 12, 10, 8, 6, 6, 6]
        },
        {
          name: "Ideal",
          data: [-8, -9, -9, -10, -11, -12, -13, -10, -9, -8]
        }
      ],*/
      options: {
        chart: {
          id: props.chartId,
          type: "bar",
          height: 440,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#0d47a1"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: props.options.yaxis
          ? props.options.yaxis
          : {
              min: -15,
              max: 15,
              title: {
                text: "Score Range",
              },
            },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val;
            },
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "%";
            },
          },
        },
        title: props.options.title
          ? props.options.title
          : {
              text: "Distribution of Population",
            },
        xaxis: props.options.xaxis
          ? props.options.xaxis
          : {
              categories: [
                ">520",
                "471-520",
                "441-470",
                "411-440",
                "381-410",
                "351-380",
                "321-350",
                "291-320",
                "251-290",
                "<251",
              ],
              title: {
                text: "Population Distribution",
              },
              labels: {
                formatter: function (val) {
                  return Math.abs(Math.round(val)) + "%";
                },
              },
            },
      },
    };
  }

  render() {
    return (
      <div id={this.props.chartId}>
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type="bar"
          height={this.props.height ? this.props.height : 400}
        />
      </div>
    );
  }
}
