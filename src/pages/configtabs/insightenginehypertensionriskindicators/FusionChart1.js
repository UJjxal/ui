import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  FunnelSeries,
  AccumulationTooltip,
  AccumulationDataLabel
} from "@syncfusion/ej2-react-charts";

export default class Funnel extends React.Component {
  render() {
    return (
      <div className="control-pane">
        <div className="control-section row">
          <div className="col-lg-8">
            <AccumulationChartComponent
              id="funnel-chart"
              ref={funnel => (this.funnel = funnel)}
              //title="Analysis Patient Universe"
              load={this.load.bind(this)}
              tooltip={{
                enable: true,
                format: "${point.x} : <b>${point.y}</b>"
              }}
              resized={this.onChartResized.bind(this)}
              loaded={this.onChartLoad.bind(this)}
            >
              <Inject
                services={[
                  FunnelSeries,
                  AccumulationTooltip,
                  AccumulationDataLabel
                ]}
              />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective
                  dataSource={this.props.data}
                  xName="x"
                  yName="y"
                  type="Funnel"
                  width="50%"
                  height="90%"
                  gapRatio={0.03}
                  explode={false}
                  dataLabel={{
                    name: "y",
                    visible: true,
                    position: "Inside"
                    //connectorStyle: { length: "5%" }
                  }}
                ></AccumulationSeriesDirective>
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent>
          </div>
          <div className="col-lg-3 property-sectionX mt-5">
            {this.props.data
              .slice(0)
              .reverse()
              .map(ele => {
                return (
                  <div className="row" style={{ background: ele.fill }}>
                    <div className="col-lg-12 funnel-text-label">
                      {ele.text}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
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
    document.getElementById("funnel-chart").setAttribute("title", "");
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
      .getElementById("funnel-chart")
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
