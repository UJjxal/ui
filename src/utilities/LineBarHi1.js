import React from "react";

// import Highcharts from "./highcharts.src.js";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

class LineBarHi1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount() {
        
  }
  render() {
    return (
      <div style={{height:"18rem"}}>
        <HighchartsReact
          constructorType={"chart"}
          containerProps={{ style: { height: "100%" } }}
          highcharts={Highcharts}
          options={{
            chart: {
                zoomType: 'xy',
            },
            title: {
                text: "GTN"
              },
            credits:{enabled:false},
            
            xAxis: [{
                categories: ["2020Q1",
                "2020Q2",
                "2020Q3",
                "2020Q4",
                "2021Q1",
                "2021Q2",
                "2021Q3",
                "2021Q4"],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Effective Rebate %',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'GTN %',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'bottom',
                x: 10,
                verticalAlign: 'top',
                y: 10,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Scenario1 (GTN contracted)',
                type: 'column',
                yAxis: 1,
                data: [86.58,
                    96.54,
                    85.92,
                    91.39,
                    91.08,
                    90.74,
                    95.98,
                    98.45],
                tooltip: {
                    valueSuffix: '%'
                }
        
            },{
              name: 'Scenario1 (GTN no deal)',
              type: 'column',
              yAxis: 1,
              data: [86.58,
				84.68,
				81.83,
				80.88,
				75.90,
				75.62,
				74.40,
				75.15],
              tooltip: {
                  valueSuffix: '%'
              }
      
          }, {
                name: 'Scenario1 (Rebate)',
                type: 'spline',
                data: [15,
                    15,
                    15,
                    15,
                    15,
                    15,
                    15,
                    15],
                tooltip: {
                    valueSuffix: '%'
                }
            
          }
          ]
        }}
        />
      </div>
    );
  }
}

export default LineBarHi1;
