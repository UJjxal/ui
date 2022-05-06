import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [
          {
            name: "Random",
            data: [0, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00]
          },
          {
            name: "Model",
            data: [0, 0.40, 0.70, 0.80, 0.85, 0.88, 0.90, 0.94, 0.96, 0.98, 1.00]
          }
        ],
        options: {
          chart: {
            height: 270,
            type: 'line',
            dropShadow: {
              enabled: false,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          title: {
            text: 'ROC Curve',
            align: 'center'
          },
          colors: ['#77B6EA', '#0d47a1'],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
            width: 2
          },
          
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 0
          },
          xaxis: {
            categories: ["0", ".1", ".2", ".3", ".4", ".5", ".6", ".7", ".8", ".9", "1"],
            title: {
              text: 'False Positive Rate'
            }
          },
          yaxis: {
            title: {
              text: 'True Positive Rate'
            },
            min: 0.0,
            max: 1.00
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={270} />
</div>)}

      }

