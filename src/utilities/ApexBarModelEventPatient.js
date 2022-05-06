import React from "react";
import ReactApexChart from "react-apexcharts";

import { Select } from "antd";

const { Option } = Select;

export default class ApexChart extends React.Component {
  render() {
    console.log("series data1", this.props.series);
    let maxCount = 0;
    let categories = this.props.categories
      ? this.props.categories
      : ["No Hypertension", "Hypertension"];

    if (this.props.series) {
      this.props.series.forEach((bar) => {
        bar.data.forEach((val) => {
          if (val > maxCount) {
            maxCount = val;
          }
        });
      });
    }
    console.log("series data2", this.props.series);

    const options2 = {
      chart: {
        //height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
          columnWidth: "30rem",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: this.props.dataLabelsPercentage
          ? function (value, { seriesIndex, dataPointIndex, w }) {
              return value + "%";
            }
          : function (value, { seriesIndex, dataPointIndex, w }) {
              return value;
            },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: categories,
        position: "bottom",
        title: {
          text: this.props.xTitle ? this.props.xTitle : "",
        },
        labels: {
          offsetY: -5,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        title: {
          text: this.props.yTitle ? this.props.yTitle : "",
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          formatter: function (value) {
            return value;
          },
          show: true,
        },
      },
      title: {
        text: "",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444",
        },
      },
    };

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

        <div id="chart">
          <ReactApexChart
            options={options2}
            series={this.props.series}
            type="bar"
            height={this.props.height ? this.props.height : 350}
          />
        </div>
        {this.props.footer &&  <p><b>{this.props.footer}</b></p>}
      </React.Fragment>
    );
  }
}
