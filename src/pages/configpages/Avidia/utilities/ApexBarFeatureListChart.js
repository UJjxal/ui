import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          data: [23, 17, 11, 11, 9, 7, 7, 7, 6, 4 ]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true,
              endingShape:'flat'
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [
              
              'Behaviour Score',
              'Debt to Income ratio',
              'Length of Relationship',
              'Credit Share of Wallet',
              
              'Market Segment',
              
              
              'Balance on existing card',
              'Complaints in the last 6 months',
              
              'Number of products owned',
              'Total loan outstanding',
              'Others'
              
            ],
          },
          yaxis:{
            tickAmount: 2,
            min: 0,
            max: 24,
            labels: {
              formatter: function (value) {
                return (value);
              }
            }
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
</div>
      )}
      }