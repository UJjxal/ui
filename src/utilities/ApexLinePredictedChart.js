import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [
          {
            name: "Actual",
            data: [11, 10.5, 8.0, 7.5, 6.3, 5.9, 4.8, 3.1, 2]
          },
          {
            name: "Predicted",
            data: [10.7, 10, 9.5, 8.4, 7.2, 6.4, 5.7, 4.2, 3.1, 2.4]
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
            // categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            title: {
              text: 'Event Deciles'
            }
          },
          yaxis: {
            title: {
              text: 'Event Rate %'
            },
            labels: {
              formatter: function (value) {
                return parseFloat(value).toFixed(1);
              }
            },
            min: 0,
            max: 10
          }
        },
      
      
      };
    }

  

    render() {
      // console.log("actual predicted", this.props.series);
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.props.series} type="line" height={270} />
</div>)}

      }

