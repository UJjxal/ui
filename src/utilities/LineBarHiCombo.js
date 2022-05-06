import React from "react";

// import Highcharts from "./highcharts.src.js";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

class LineBarCombo extends React.Component {
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
                text: this.props.title
              },
            credits:{enabled:false},
            colors: this.props.colors,
            xAxis: [{
                categories: this.props.categories.data,
                crosshair: true
            }],
            yAxis: [{ // Secondary yAxis
               
                labels: {
                    format: this.props.format,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: this.props.yoppositeaxis,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite:true,
               
            }, { // Primary yAxis
                min: 0, 
                // max: 100,
                title: {
                    text: this.props.yaxis,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: false
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                alignColumns: false,
                x: 10,
                verticalAlign: 'bottom',
                y: 20,
                // floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: this.props.series
        }}
        />
      </div>
    );
  }
}

export default LineBarCombo;
