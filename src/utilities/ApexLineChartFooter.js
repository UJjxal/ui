import React from "react";
import ReactApexChart from "react-apexcharts";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter } from "mdbreact";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Event",
          data: [0, 20, 39, 56, 70, 80, 88, 94, 97, 99, 100],
        },
        {
          name: "Non-event",
          data: [0, 0, 2, 6, 13, 23, 35, 48, 64, 81, 100],
        },
      ],
      options: {
        chart: {
          //height: 270,
          //type: "scatter",
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
        colors: ["#77B6EA", "#0d47a1", "#008ffb"],
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: props.options.xaxis
          ? props.options.xaxis
          : {
              categories: props.options.xaxisCategories
                ? props.options.xaxisCategories
                : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              title: {
                text: props.options.xaxisTitle
                  ? props.options.xaxisTitle
                  : "Deciles",
                offsetY: 5,
                style: {
                  color: undefined,
                  fontSize: "12px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  cssClass: "apexcharts-xaxis-title",
                },
              },
              style: {
                fontWeight: 300,
              },
              labels: {
                formatter: function (val) {
                  return parseInt(val);
                },
                show: true,
                style: {
                  colors: [],
                  fontSize: "10px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  cssClass: "apexcharts-xaxis-label",
                },
              },
              // type: 'numeric',
              // tickAmount: 1,
              min: 0,
              // max:11,
              // range:1
            },

        yaxis: props.options.yaxis
          ? props.options.yaxis
          : {
              title: {
                text: props.options.yaxisTitle
                  ? props.options.yaxisTitle
                  : "Y-axis",
                style: {
                  fontWeight: 300,
                },
              },
              labels: {
                formatter: function (val) {
                  return parseInt(val); //val.toFixed(1);
                },
              },
              min: 0,
            },
      },
    };
  }

  render() {
    // console.log("recvd gains", this.props.series);
    return (
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle
            tag="h5"
            style={{ color: "black" }}
            className="text-center"
          >
            {this.props.title}
          </MDBCardTitle>
          {this.props.series ? (
            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.props.series}
                type="line"
                height={this.props.height ? this.props.height : 220}
              />
            </div>
          ) : (
            <div className="loader">Loading...</div>
          )}
        </MDBCardBody>
        {this.props.footer ? (
          <MDBCardFooter>
            <p>{this.props.footer}</p>
          </MDBCardFooter>
        ) : (
          ""
        )}
      </MDBCard>
    );
  }
}
