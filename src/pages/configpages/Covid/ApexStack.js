import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { MDBCard, MDBCardText, MDBCardTitle } from "mdbreact";

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

  getOptions() {
    return {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
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
          horizontal: this.props.chartdirection
            ? this.props.chartdirection
            : false,
          columnWidth: this.props.categories.length > 5 ? "90%" : "40%",
          //endingShape: "rounded",
        },
      },
      colors: this.props.legendColor
        ? this.props.legendColor
        : ["#004c6d", "#106389", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff"],
      xaxis: {
        //type: "datetime",
        categories: this.props.categories
          ? this.props.categories
          : ["GMT 1", "GMT 2", "GMT 3", "GMT 4", "GMT 5", "GMT 6"],
        lines: {
          show: false,
        },
      },
      yaxis: {
        show: this.props.showYaxis ? this.props.showYaxis : false,
      },
      legend: {
        position: "bottom",
        fontSize: "10px",
      },
      fill: {
        opacity: 1,
      },
    };
  }

  render() {
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
              options={this.getOptions()}
              series={this.props.series}
              type="bar"
              height={270}
            />
          </div>
        </MDBCardText>
      </MDBCard>
    );
  }
}

export default ApexChart;
