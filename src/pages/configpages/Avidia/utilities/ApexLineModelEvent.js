import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        // series: [
        //   {
        //     data: this.props.data
        //   }
        // ],
        options: {
          chart: {
            height: 350,
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
          colors: ['#77B6EA'],
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
          tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>'
            }
          },
          xaxis: {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: 'Feature Deciles'
            }
          },
          yaxis: {
            title: {
              text: 'Event Rate'
            },
            min: 0,
            max: 16
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.props.data} type="line" height={350} />
</div>)}

      }

