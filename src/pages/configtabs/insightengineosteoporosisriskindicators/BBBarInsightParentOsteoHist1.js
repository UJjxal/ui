import { bb } from "billboard.js";
import React, {Component} from "react";

// or as importing default

// 2) import css if your dev-env supports. If don't, include them via <link>
import "billboard.js/dist/billboard.css";

// or theme style. Find more themes from 'theme' folder
import "billboard.js/dist/theme/insight.css";
// import { ConsoleLogger } from "@aws-amplify/core";



export default class BarChartObsPerAdhRP extends Component {
  state={
    isChartRendered:false,
  }
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
          this.props.names
        ],
        colors:{
          "Osteoporosis":"#0d47a1",
          "No Osteoporosis":"#4285f4"
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
          // label:{text:"(mcg_L/mg_L)", position:"outer-center"}
        }
        },
        
      bindto: "#stackedBarChartIO2"
    });
   
    }

    componentDidUpdate(prevProps, prevState){
      this._renderChart();
    }  

    componentDidMount(){
      this._renderChart();
    }

  render() {
    
    return (
  
    <div id="stackedBarChartIO2" style={{"height":"23rem", "width":"98%"}}></div>
   
    );
  }
}