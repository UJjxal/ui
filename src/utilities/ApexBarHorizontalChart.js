import React from "react";
import ReactApexChart from "react-apexcharts";
import { Select } from "antd";

const { Option } = Select;

const ApexChart = (props) => {
  console.log("ABHC", props);
  const options = {
    chart: {
      type: "bar",
      height: 365,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        endingShape: "flat",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: props.categories ? props.categories : ["No"],
    },
    yaxis: {
      tickAmount: 2,
      min: 0,
      //max: 25,
      labels: {
        // formatter: function (value) {
        //   return (value);
      },
    },
  };

  return (
    <React.Fragment>
      {props.dropdownOption ? (
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
            onChange={(e) => props.setFeatureList(e)}
          >
            {props.dropdownOption.map((el, index) => {
              return <Option value={el.key}>{el.value}</Option>;
            })}
          </Select>
        </div>
      ) : null}

      <div id="chart">
        <ReactApexChart
          options={props.options ? props.options : options}
          series={props.series}
          type="bar"
          height={365}
        />
      </div>
    </React.Fragment>
  );
};

export default ApexChart;
