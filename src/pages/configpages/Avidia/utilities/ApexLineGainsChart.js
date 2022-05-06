import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [
          {
            name: "Event",
            data: [0, 20,
              39,
              56,
              70,
              80,
              88,
              94,
              97,
              99,
              100]
          },
          {
            name: "Non-event",
            data: [0,0,
              2,
              6,
              13,
              23,
              35,
              48,
              64,
              81,
              100]
          }
        ],
        options: {
          chart: {
            height: 300,
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
            categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: 'Cumulative Population Deciles'
            }
          },
          yaxis: {
            title: {
              text: 'Cumulative Events'
            },
            min: 0,
            max: 100
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

