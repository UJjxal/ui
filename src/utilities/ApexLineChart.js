/** DemoInsights, FeatureImportance*3,  */
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { AppContext } from "../AppProvider";
import { Select } from "antd";

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
        {
          name: "Low Acceptance Range",
          data: [4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0],
        },
        {
          name: "High Acceptance Range",
          data: [
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
            10.0,
          ],
        },
        {
          name: "Anomaly",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            13.33,
          ],
        },
      ],
    };
  }

  getOptions(color9, color8, color2, color1) {
    return {
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
      markers: {
        size: [0, 0, 0, 6],
        //offsetX: -3,
        // discrete: [
        //   {
        //     seriesIndex: 0,
        //     dataPointIndex: 11,
        //     fillColor: "#CC0000",
        //     strokeColor: "#fff",
        //     size: 5,
        //   },
        // ],
      },
      stroke: {
        width: [3, 1, 1, 3],
        curve: "straight",
        dashArray: [0, 8, 8, 0], // gap between dashes
        //width: 1.5,
      },
      colors: [color8, color9, color2, "#CC0000"],
      dataLabels: {
        enabled: this.props.dataLabels ? this.props.dataLabels : false,
        enabledOnSeries: [0],
        formatter: function (val, opts) {
          return val.toString().substr(0, 1);
        },
        style: {
          colors: ["#043f75"],
        },
        background: { borderRadius: 10, foreColor: "#043f75", opacity: 1 },
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
        min: 0,
        max: this.props.noMax
          ? this.props.noMax
          : function (max) {
              return max + (max < 1 ? 0 : 5);
            },
        tickAmount: this.props.tickAmount ? this.props.tickAmount : false,
        labels: {
          show: this.props.yaxisLabelShow === "false" ? false : true,
          formatter: (val) => this.props.formatter(val),
          // formatter: this.props.yaxisF
          //   ? (value) => {
          //       return value.toFixed(this.props.yaxisF);
          //     }
          //   : this.props.yaxisLabelOnlyNum === "true"
          //   ? function (value) {
          //       return value;
          //     }
          //   : function (value) {
          //       return value.toFixed(1) + "%";
          //     },
        },
      },
    };
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ theme }) => {
          const { color8, color9, color2, color1 } = theme;

          return (
            <React.Fragment>
              {this.props.dropdown ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.92fr auto",
                  }}
                >
                  <h6 className="pt-2 pl-4">
                    Select Feature
                    <img
                      alt="right arrow"
                      src="./right.svg"
                      style={{
                        height: "1rem",
                        width: "1rem",
                        marginLeft: "0.5rem",
                      }}
                    />
                  </h6>
                  <Select
                    defaultValue={0}
                    style={{ width: 240 }}
                    onChange={(e) => this.props.setFeatureData(e)}
                  >
                    {this.props.dropdown
                      ? this.props.dropdown.map((el, index) => {
                          return <Option value={index}>{el.feature}</Option>;
                        })
                      : null}
                  </Select>
                </div>
              ) : null}

              <div className="mixed-chart">
                <Chart
                  options={this.getOptions(color9, color8, color2, color1)}
                  series={this.props.series}
                  type="line"
                  height={this.props.height ? this.props.height : 350}
                />
              </div>
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default App;
