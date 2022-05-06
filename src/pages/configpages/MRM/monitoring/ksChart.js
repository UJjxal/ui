import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = (props) => {
  const options = {
    chart: {
      id: props.options.chartId ? props.options.chartId : "kschart",
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
    xaxis: props.options.xaxis
      ? props.options.xaxis
      : {
          categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          title: {
            text: "Cumulative Population Deciles",
          },
        },

    yaxis: props.options.yaxis
      ? props.options.yaxis
      : {
          title: {
            //text: "Percentage"
          },
          min: 0,
          max: 100,
        },
  };

  //console.log("kschart121", props);
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={props.series}
        type="line"
        height={props.height ? props.height : 370}
        width={props.width ? props.width : "100%"}
      />
    </div>
  );
};
export default ApexChart;
