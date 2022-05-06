import React from "react";
import ReactApexChart from "react-apexcharts";
import { MDBCard, MDBCardText, MDBCardTitle } from "mdbreact";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Actual",
          data: [11, 10.5, 8.0, 7.5, 6.3, 5.9, 4.8, 3.1, 2],
        },
        {
          name: "Predicted",
          data: [10.7, 10, 9.5, 8.4, 7.2, 6.4, 5.7, 4.2, 3.1, 2.4],
        },
      ],
      options: {
        chart: {
          //height: 270,
          type: props.chartType ? props.chartType : "line",
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
        colors: this.props.legendColor
          ? this.props.legendColor
          : ["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 3,
        },
        labels: props.labels ? props.labels : "",
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
          categories: props.categories
            ? props.categories
            : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          title: {
            text: props.xaxisTitle ? props.xaxisTitle : "",
          },
          tickAmount: 12,
        },
        tooltip: {
          y: {
            formatter: function (
              value,
              { series, seriesIndex, dataPointIndex, w }
            ) {
              return value;
            },
          },
        },
        yaxis: {
          show: props.hideYaxis ? false : true,
          title: {
            text: props.yaxisTitle ? props.yaxisTitle : "",
          },
          tickAmount: 4,
          labels: {
            formatter: function (value) {
              return parseFloat(value).toFixed(
                props.yaxisDecimalpt ? props.yaxisDecimalpt : 0
              );
            },
          },
          min: function (min) {
            return props.yaxisMin
              ? props.yaxisMin
              : props.yaxisMin === 0
              ? 0
              : min;
          },
          max: function (max) {
            return props.yaxisMax ? props.yaxisMax : max;
          },
        },
        legend: { fontSize: "10px" },
      },
    };
  }

  render() {
    console.log("apex121", this.props);
    return (
      <MDBCard
        style={this.props.styleCard ? this.props.styleCard : { padding: 5 }}
      >
        <MDBCardTitle
          tag="h6"
          style={{ color: "black", fontSize: 12 }}
          className="text-center mb-0 pt-2"
        >
          {this.props.title ? this.props.title : ""}
        </MDBCardTitle>
        <MDBCardText>
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.props.series ? this.props.series : this.state.series}
              type={this.props.chartType ? this.props.chartType : "line"}
              height={this.props.height ? this.props.height : 270}
            />
          </div>
        </MDBCardText>
      </MDBCard>
    );
  }
}
