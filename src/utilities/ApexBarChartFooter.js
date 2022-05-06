import React from "react";
import ReactApexChart from "react-apexcharts";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardFooter } from "mdbreact";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [14, 12, 11, 11, 8, 6, 5, 3, 3, 2],
        },
      ],
      options: {
        chart: {
          type: "bar",
          //height: 365,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "flat",
          },
        },
        dataLabels: {
          enabled: false,
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
              // labels: {
              //   formatter: function(val) {
              //     return parseInt(val);
              //   },
              //   show: true,
              //   style: {
              //     colors: [],
              //     fontSize: "10px",
              //     fontFamily: "Helvetica, Arial, sans-serif",
              //     cssClass: "apexcharts-xaxis-label"
              //   }
              min: 0,
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
              labels: props.options.yaxisFormat
                ? props.options.yaxisFormat
                : {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                  },
              min: 0,
            },
      },
    };
  }

  render() {
    //console.log("series", this.props.series);
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
                type="bar"
                height={220}
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
