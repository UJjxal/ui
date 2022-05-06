import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        options: {
          chart: {
            toolbar: {
              show: false
            } 
          },
          plotOptions: {
            bar: {
             
              distributed: true
            }
          },
          colors: [function({ value, seriesIndex, w }) {
            
          let barData = w.config.series[0].data[seriesIndex].y;
          let valueChange = barData[1] - barData[0]; 
          
            if (valueChange >= 0 ) {
                return '#00AE4B'
            } else {
                return '#5698D4'
            }
        
          }],
          dataLabels: {
            enabled: true, 
            formatter: function (val, opts) {
              console.log("opts are", opts);
              let barData = opts.w.config.series[0].data[opts.dataPointIndex].y;
              let valueChange = barData[1] - barData[0]; 
              return Math.abs(valueChange);
          },
          style:{
            colors:['#111']
          }
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
            size: 6
          },
          tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>'
            }
          },
          yaxis: {
            title: {
              text: this.props.yaxis
            },
            min: 0,
            labels: {
              show: true,
              formatter: (val)=>this.props.formatter(val) 
            }
          }
         
         
        }
      
      
      };
    }

  
    render() {
      console.log("chart data", this.props);
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.props.series} type="rangeBar" height={this.props.height} />
</div>)}

      }
