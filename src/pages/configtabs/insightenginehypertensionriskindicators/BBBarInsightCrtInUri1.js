import { bb } from "billboard.js";
import React, {Component} from "react";

// or as importing default

// 2) import css if your dev-env supports. If don't, include them via <link>
import "billboard.js/dist/billboard.css";

// or theme style. Find more themes from 'theme' folder
import "billboard.js/dist/theme/insight.css";
// import { ConsoleLogger } from "@aws-amplify/core";



export default class BarChartAvgMonCostRP extends Component {
  
  _renderChart(){
    bb.generate({
      data: {
        x:"x",
        columns: [
      ["x",...this.props.categories],    
      ...this.props.data
        ],
        type: "bar",
        groups: [
          // [
          //   "0", "1 to 2", "3 & above"
          // ]
          this.props.names
        ],
        colors:{
          "No Hypertension":"#0d47a1",
          "Hypertension":"#4285F4"

        },
        labels: {
          show: true,
			format: function (v, id, i, j) {
				// var formatPercent = d3.format(",%");
				return (v + "%");
			},
      colors: "white",
      centered: true
    }
      },
      grid: {
        y: {
          lines: [
            {
              value: 0
            }
          ]
        }
      },
      bar: {
        width: {
          ratio: 0.9,
          max: 60
        }
      },
      axis: {
        x: {
          type: "category",
          // label:{text:"Mg_dL", position:"outer-center"}
        }
        },
        legend:{
          padding:40
        },
        
      bindto: "#stackedBarChart50"
    });
   
    }

    componentDidUpdate(prevProps, prevState){
      this._renderChart();
    }  

    componentDidMount(){
      this._renderChart();
    }

  render() {
    //console.log("chart props", this.props.highdata);
    return (
    // <div id="wrapper">
    <div id="stackedBarChart50" style={{"height":"23rem", "width":"98%"}}></div>
    //</div>
    );
  }
}