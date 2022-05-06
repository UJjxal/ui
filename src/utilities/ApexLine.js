/** DemoInsights  */
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Select } from "antd";
import { WidthProvider } from "react-grid-layout";

const { Option } = Select;

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "KPI",
          data: [
            4.8,
            4.7,
            4.56,
            5.02,
            4.82,
            4.77,
            5.49,
            6.14,
            5.16,
            4.54,
            4.0,
            13.33,
          ],
        },
      ],
    };
  }

  options = {
      chart: {
        id: "basic-bar",
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
        zoom: {
          enabled: false,
        },
      },
      tooltip: {
        custom: this.props.tooltipCustom
          ? function ({ series, seriesIndex, dataPointIndex, w }) {
              return (
                '<div className="arrow_box">' +
                "<span>" +
                series[seriesIndex][dataPointIndex] +
                "</span>" +
                "</div>"
              );
            }
          : undefined,
      },
      legend: {
        itemMargin: {
          vertical: 10,
        },
      },
      marker: {
        show: true,
      },
      stroke: {
        curve: "straight",
        width: 1.5,
      },
      colors: ["#0091D5", "#1C4E80", "#7D7D7D", "#CC0000"],
      dataLabels: {
        enabled: this.props.dataLabels ? this.props.dataLabels : false,
        enabledOnSeries: [0],
        formatter: function (val, opts) {
          return val.toString().substr(0, 1);
        },
        style: {
          colors: ["#043f75"],
        },
        background: {
          borderRadius: 10,
          foreColor: "#043f75",
          opacity: 1,
          width: "2px",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.props.categories ? this.props.categories : "",
        title: {
          text: this.props.xTitle ? this.props.xTitle : "",
        },
      },
      yaxis: {
        title: {
          text: this.props.yTitle ? this.props.yTitle : "",
        },
        tickAmount: this.props.tickAmount ? this.props.tickAmount : false,
        labels: {
          show: this.props.yaxisLabelShow === "false" ? false : true,
          formatter: (val) => this.props.formatter(val),
        },
      },
    };
  

  render() {
          return (
            <React.Fragment>
              <div className="mixed-chart">
                <Chart
                  // options={this.getOptions(color9, color8, color2, color1)}
                  options={this.options}
                  series={this.state.series}
                  type="line"
                  height={this.props.height ? this.props.height : 350}
                />
              </div>
            </React.Fragment>
          );
  }
}

export default App;
