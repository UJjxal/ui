import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        options: {
          chart: {
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
          annotations:this.props.annotations,
          colors: this.props.colors?this.props.colors:['#00AE4B', '#5698D4', '#CECECE', '#FFC000'],
          dataLabels: {
            enabled: false, 
          },
          stroke: {
            curve: 'straight',
            width: 2,
            dashArray: this.props.dashArray?this.props.dashArray:null
          },
          
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: this.props.markers
          },
          tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
              return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>'
            }
          },
          xaxis: {
            categories: this.props.categories.data,
            title: {
              text: "",
              
            }
          },
          yaxis: {
            title: {
              text: this.props.yaxis
            },
            min: this.props.mintick,
            max: this.props.maxtick,
            tickAmount: this.props.tickAmount,
            labels: {
              show: true,
              formatter: (val)=>this.props.formatter(val) 
            }
          }
        },
      
      
      };
    }

  
    render() {
      console.log("chart data ms", this.props);
      return (
        

  <div id="linechart">
<ReactApexChart options={this.state.options} series={this.props.series} type="line" height={this.props.height} />
</div>)}

      }

