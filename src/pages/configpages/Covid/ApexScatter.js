// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import { MDBCard, MDBCardText, MDBCardTitle } from "mdbreact";

// export default class ApexChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       series: [
//         {
//           name: "SAMPLE A",
//           data: [
//             [16.4, 5.4],
//             [21.7, 2],
//             [25.4, 3],
//             [19, 2],
//             [10.9, 1],
//             [13.6, 3.2],
//             [10.9, 7.4],
//             [10.9, 0],
//             [10.9, 8.2],
//             [16.4, 0],
//             [16.4, 1.8],
//             [13.6, 0.3],
//             [13.6, 0],
//             [29.9, 0],
//             [27.1, 2.3],
//             [16.4, 0],
//             [13.6, 3.7],
//             [10.9, 5.2],
//             [16.4, 6.5],
//             [10.9, 0],
//             [24.5, 7.1],
//             [10.9, 0],
//             [8.1, 4.7],
//             [19, 0],
//             [21.7, 1.8],
//             [27.1, 0],
//             [24.5, 0],
//             [27.1, 0],
//             [29.9, 1.5],
//             [27.1, 0.8],
//             [22.1, 2],
//           ],
//         },
//         {
//           name: "SAMPLE B",
//           data: [
//             [36.4, 13.4],
//             [1.7, 11],
//             [5.4, 8],
//             [9, 17],
//             [1.9, 4],
//             [3.6, 12.2],
//             [1.9, 14.4],
//             [1.9, 9],
//             [1.9, 13.2],
//             [1.4, 7],
//             [6.4, 8.8],
//             [3.6, 4.3],
//             [1.6, 10],
//             [9.9, 2],
//             [7.1, 15],
//             [1.4, 0],
//             [3.6, 13.7],
//             [1.9, 15.2],
//             [6.4, 16.5],
//             [0.9, 10],
//             [4.5, 17.1],
//             [10.9, 10],
//             [0.1, 14.7],
//             [9, 10],
//             [12.7, 11.8],
//             [2.1, 10],
//             [2.5, 10],
//             [27.1, 10],
//             [2.9, 11.5],
//             [7.1, 10.8],
//             [2.1, 12],
//           ],
//         },
//         {
//           name: "SAMPLE C",
//           data: [
//             [21.7, 3],
//             [23.6, 3.5],
//             [24.6, 3],
//             [29.9, 3],
//             [21.7, 20],
//             [23, 2],
//             [10.9, 3],
//             [28, 4],
//             [27.1, 0.3],
//             [16.4, 4],
//             [13.6, 0],
//             [19, 5],
//             [22.4, 3],
//             [24.5, 3],
//             [32.6, 3],
//             [27.1, 4],
//             [29.6, 6],
//             [31.6, 8],
//             [21.6, 5],
//             [20.9, 4],
//             [22.4, 0],
//             [32.6, 10.3],
//             [29.7, 20.8],
//             [24.5, 0.8],
//             [21.4, 0],
//             [21.7, 6.9],
//             [28.6, 7.7],
//             [15.4, 0],
//             [18.1, 0],
//             [33.4, 0],
//             [16.4, 0],
//           ],
//         },
//       ],
//       options: {
//         chart: {
//           height: this.props.height ? this.props.height : 270,
//           type: "scatter",
//           zoom: {
//             enabled: true,
//             type: "xy",
//           },
//           toolbar: {
//             show: false,
//           },
//         },
//         tooltip: {
//           custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//             //console.log("tool1213", w.config.series);
//             console.log(
//               "tool1214",
//               w.config.series[seriesIndex].data[dataPointIndex][2]
//             );
//             return (
//               '<div class="arrow_box">' +
//               "<span>" +
//               w.config.series[seriesIndex].data[dataPointIndex][2] +
//               " : " +
//               series[seriesIndex][dataPointIndex] +
//               "</span>" +
//               "</div>"
//             );
//           },
//         },
//         xaxis: {
//           title: {
//             text: this.props.xaxisTitle ? this.props.xaxisTitle : "",
//             style: {
//               fontSize: "8px",
//               fontWeight: 400,
//             },
//           },
//           tickAmount: 10,
//           labels: {
//             formatter: function (val) {
//               return parseFloat(val).toFixed(1);
//             },
//           },
//         },
//         yaxis: {
//           title: {
//             text: this.props.yaxisTitle ? this.props.yaxisTitle : "",
//             style: {
//               fontSize: "8px",
//               fontWeight: 400,
//             },
//           },
//           tickAmount: 7,
//         },
//       },
//     };
//   }

//   render() {
//     //console.log("apex121", this.props);
//     return (
//       <MDBCard
//         style={this.props.styleCard ? this.props.styleCard : { padding: 5 }}
//       >
//         <MDBCardTitle
//           tag="h6"
//           style={{ color: "black", fontSize: 12 }}
//           className="text-center mb-0 pt-2"
//         >
//           {this.props.title ? this.props.title : ""}
//         </MDBCardTitle>
//         <MDBCardText>
//           <div id="chart">
//             <ReactApexChart
//               options={this.state.options}
//               series={this.props.series ? this.props.series : this.state.series}
//               type={this.props.chartType ? this.props.chartType : "line"}
//               height={this.props.height ? this.props.height : 270}
//             />
//           </div>
//         </MDBCardText>
//       </MDBCard>
//     );
//   }
// }

/** DemoInsights, FeatureImportance*3,  */
import React, { Component } from "react";
import { MDBCard, MDBCardText, MDBCardTitle } from "mdbreact";
import ReactEcharts from "echarts-for-react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * E-chart options
   */

  getOption() {
    const series = this.props.series.map((item) => {
      return {
        name: item.name,
        type: "scatter",
        data: item.data,
        showSymbol: false,
        smooth: true,
        markLine: item.markLine ? item.markLine : null,
      };
    });

    const option = {
      title: {
        show: false,
      },
      grid: {
        left: "3%",
        right: "3%",
        //bottom: "1%",
        top: "7%",
        containLabel: true,
      },
      tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        formatter: function (params) {
          if (params.value.length > 1) {
            return (
              params.value[2] +
              " <br/>" +
              "DGI Score Final Metric : " +
              params.value[0] +
              " <br/>" +
              "# Commercial Customers : " +
              params.value[1]
            );
          }
        },
        axisPointer: {
          show: true,
          type: "cross",
          lineStyle: {
            type: "dashed",
            width: 1,
          },
        },
      },
      legend: {
        data: ["No Impact", "Some Impact", "Moderate Impact", "Highest Impact"],
        bottom: "0",
      },
      xAxis: [
        {
          type: "value",
          scale: true,
          nameLocation: "middle",
          name: this.props.xaxisTitle ? this.props.xaxisTitle : "",
          nameTextStyle: { padding: 10 },
          axisLabel: {
            formatter: "{value}",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          nameLocation: "middle",
          nameGap: 45,
          name: this.props.yaxisTitle ? this.props.yaxisTitle : "",
          scale: true,
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: series,
      color: ["#6d9070", "#a6bb6e", "#ffbd5f", "#f99d5c", "#ec7f5e"],
    };

    return option;
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
          <React.Fragment>
            <ReactEcharts option={this.getOption()} />
          </React.Fragment>
        </MDBCardText>
      </MDBCard>
    );
  }
}

export default App;
