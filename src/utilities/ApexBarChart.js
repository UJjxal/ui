import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = (props) => {
  const options = {
    chart: {
      height: 200,
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
      formatter: function (val) {
        return val.toLocaleString();
      },

      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758","#3895D3"],
      },
    },

    xaxis: {
      categories: props.categories,
      position: "bottom",
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={props.series}
        type={"bar"}
        height={300}
      />
    </div>
  );
};

export default ApexChart;
