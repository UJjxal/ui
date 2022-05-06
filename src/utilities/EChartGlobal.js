/** DemoInsights, FeatureImportance*3,  */
import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class EChart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * E-chart options
   */
  getOption() {
    const series = this.props.series.length > 0 ? this.props.series.map((item) => {
      return {
        type: item.type ? item.type : "line",
        smooth: true,
        name: item.name,
        data: item.data,
        lineStyle: {
          // color: this.props.lineColor ? this.props.lineColor : '#007bff',
          width: 3,
          type: 'solid'
        },
        Symbol: 'circle',
        symbolSize: 6,
        stack: this.props.seriesStack ? this.props.seriesStack : false,
        label: {
          show: this.props.seriesLabelShow ? true : false,
          // position: "inside",
          // color: '#fff'
        },
        emphasis: {
          focus: 'series'
        },
      };
    }) : null;

    const option = {
      title: {
        text: this.props.title,
      },
      tooltip: {
        trigger: this.props.triggerAxis ? this.props.triggerAxis : "axis",
        formatter: this.props.toolTipFormatter && this.props.toolTipFormatter
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      legend: {
        top: this.props.mini ? 2 : 25,

        padding: [5, 5, 0, 0],
        textStyle: {
          fontSize: this.props.mini ? 8 : 12,
        },
      },
      xAxis: {
        type: this.props.xAxis ? "category" : "value",
        // boundaryGap: false,
        data: this.props.xAxis ? this.props.xAxis : [],
        axisLine: {
          show: this.props.funnelChart == true ? false : true, // Hide full Line
        },
        splitLine: { show: false },
      },
      yAxis: {
        splitLine: { show: false },
        boundaryGap: [0, "100%"],
        type: this.props.yAxis ? "category" : "value",
        data: this.props.yAxis && this.props.yAxis,
        min: this.props.minValue,
        max: this.props.maxValue,
        axisLine: {
          show: this.props.funnelChart == true ? false : true, // Hide full Line
        }
      },
      series: series,
      color: this.props.barColor
        ? this.props.barColor
        : ["#065196", "#238823", "#CC0000", "#1890ff"],
    };

    return option;
  }

  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "100%" }} option={this.getOption()} />
      </React.Fragment>
    );
  }
}

export default EChart;
