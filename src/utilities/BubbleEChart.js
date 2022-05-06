import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
// import { data } from "./data.js";



class BubbleEChart extends Component {
  state={
  option : {
    backgroundColor: "#ffffff",
    title: {
      text: this.props.mini?"":this.props.title
    },
    toolbox:{
      show:this.props.mini?false:true,
      feature:{
        saveAsImage: { title: "Save Image" },
      }
    },
    legend: {
      right: 20,
      top:5,
      data: ["Anomaly", "Normal"],
      padding:[5,5,0,0],
      textStyle:{
        fontSize: this.props.mini?8:12
      }
    },
    xAxis: {
      name: "Tenure(in Months)",
    nameLocation: "center",
    nameTextStyle: {
      verticalAlign: "top",
      padding: [4, 3],
      fontSize:this.props.mini?8:15
    },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    yAxis: {
      name:this.props.yAxis,
    nameLocation: "middle",
    nameTextStyle: {
      align: "center",
      padding: [24, 3],
      fontSize:this.props.mini?8:15
    },
    axisLabel:{
      show:this.props.mini?false:true
    },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      scale: true
    },
    series: [
      {
        name: "Normal",
        data: this.props.data[0],
        type: "scatter",
        symbolSize: function (data) {
          return data[2] === 0 ? 7  : 7;
        },
        emphasis: {
          label: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: "top"
          }
        },
        itemStyle: {
          // shadowBlur: 10,
          // shadowColor: "rgba(120, 36, 50, 0.5)",
          // shadowOffsetY: 5,
          color: "#3F6C51"
        }
      },
      {
        name: "Anomaly",
        data: this.props.data[1],
        type: "scatter",
        symbolSize: function (data) {
          return data[2] === 0 ? 7 : 7;
        },
        emphasis: {
          label: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: "top"
          }
        },
        itemStyle: {
          // shadowBlur: 10,
          // shadowColor: "rgba(25, 100, 150, 0.5)",
          // shadowOffsetY: 5,
          color: "#B60000"
        }
      }
    ]
  }}

  /**
   * E-chart options
   */

  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "100%" }} option={this.state.option} />
      </React.Fragment>
    );
  }
}

export default BubbleEChart;
