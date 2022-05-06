import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  FunnelSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
  pointByIndex,
  Padding,
} from "@syncfusion/ej2-react-charts";

export default class SyncFusion extends React.Component {
  render() {
    return (
      <>
        <AccumulationChartComponent
          id={this.props.id?this.props.id:"funnel-chart"}
          ref={(funnel) => (this.funnel = funnel)}
          //title="Analysis Patient Universe"
          load={this.load.bind(this)}
          tooltip={{
            enable: this.props.disabledTooltip?false:true,
            format: "${point.x} : <b>${point.y}</b>",
          }}
          resized={this.onChartResized.bind(this)}
          loaded={this.onChartLoad.bind(this)}
          pointRender={
            this.props.pointRender
              ? (args) => {
                  //console.log("121", args);
                  args.fill = args.series.resultData[args.point.index].fill;
                }
              : null
          }
        >
          <Inject
            services={[
              FunnelSeries,
              AccumulationTooltip,
              AccumulationDataLabel,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={this.props.data}
              xName="x"
              yName="y"
              type="Funnel"
              width={this.props.width?this.props.width:"50%"}
              height="90%"
              gapRatio={0.03}
              explode={false}
              dataLabel={{
                name: this.props.display ? this.props.display : "x",
                visible: true,
                position: "Inside",
                //connectorStyle: { length: "5%" }
              }}
              
            ></AccumulationSeriesDirective>
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </>
    );
  }
  pyramidneckWidth(e) {
    let neckWidth = document.getElementById("pyramidNeckWidth").value;
    this.funnel.series[0].neckWidth = neckWidth + "%";
    document.getElementById("neckWidth").innerHTML = neckWidth + "%";
    this.funnel.removeSvg();
    this.funnel.refreshSeries();
    this.funnel.refreshChart();
  }
  pyramidneckHeight(e) {
    let neckHeight = document.getElementById("pyramidNeckHeight").value;
    this.funnel.series[0].neckHeight = neckHeight + "%";
    document.getElementById("neckHeight").innerHTML = neckHeight + "%";
    this.funnel.series[0].animation.enable = false;
    this.funnel.removeSvg();
    this.funnel.refreshSeries();
    this.funnel.refreshChart();
  }
  onChartLoad(args) {
    document.getElementById(this.props.id?this.props.id:"funnel-chart").setAttribute("title", "");
  }
  load(args) {
    let selectedTheme = ""; //location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    if (
      args.accumulation.availableSize.width <
      args.accumulation.availableSize.height
    ) {
      args.accumulation.series[0].width = "80%";
      args.accumulation.series[0].height = "70%";
    }
  }
  onChartResized(args) {
    let bounds = document
      .getElementById(this.props.id?this.props.id:"funnel-chart")
      .getBoundingClientRect();
    if (bounds.width < bounds.height) {
      args.accumulation.series[0].width = "40%";
      args.accumulation.series[0].height = "70%";
    } else {
      args.accumulation.series[0].width = "30%";
      args.accumulation.series[0].height = "80%";
    }
  }
}
