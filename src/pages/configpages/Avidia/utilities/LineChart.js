import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

const options = {
  /* tooltips: {
    enabled: false,
    custom: CustomTooltips
  }, */
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
      }
      },
    //  {
    //     scaleLabel: {
    //       display: true,
    //       labelString:  'Cumulative Events',
    //       fontSize:8  
    //     }
    //   }
    ],
    yAxes: [
      {
        gridLines: {
          display: true
        },
        ticks: {
          beginAtZero: false,
          
      }
      },
    //   {
    //     scaleLabel: {
    //       display: true,
    //       labelString:  'Cumulative Population Deciles',
    //       fontSize:8
    //     }
    //   }
    ]
  },
  legend: {
    labels: {
      boxWidth: 18,
      boxHeight: 0.5,
      fontSize:8
    }
  },
  plugins: {
       datalabels: {
        display: false,
        anchor: 'center',
        align:'top',
        clamp:true,
        offset:-6
      } 
  } 
};

export default class LineChart extends Component {
  render() {
    return (
      <div className="line_wrapper" style={{ width: "100%", height: "75%", margin:"2%", marginTop:"6%" }}>
        <Line data={this.props.line} height={50} width={90} options={options} />
      </div>
    );
  }
}
