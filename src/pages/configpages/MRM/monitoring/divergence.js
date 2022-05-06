import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import KsChart from "./ksChart";

export default class Divergence extends Component {
  constructor(props) {
    super(props);
    //console.log("Divergence", props);
    if (props.apiData.DivergenceCurve) {
      this.state = {
        EventData: props.apiData.DivergenceCurve[0].Events,
        NonEventData: props.apiData.DivergenceCurve[0].Non_Events,
        categories: props.apiData.DivergenceCurve[0].Score,
        DivergenceData: props.apiData.DivergenceData[0],
        apiData: props.apiData,
      };
    }
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      if (this.props.apiData.DivergenceCurve) {
        this.setState({
          EventData: this.props.apiData.DivergenceCurve[0].Events,
          NonEventData: this.props.apiData.DivergenceCurve[0].Non_Events,
          categories: this.props.apiData.DivergenceCurve[0].Score,
          DivergenceData: this.props.apiData.DivergenceData[0],
          apiData: this.props.apiData,
        });
      }
    }
  }

  render() {
    const series = [
      {
        name: "Events",
        type: "area",
        data: this.state.EventData,
      },
      {
        name: "Non-Events",
        type: "area",
        data: this.state.NonEventData,
      },
    ];

    const options = {
      xaxis: {
        categories: this.state.categories,
        title: {
          text: "Score Bins",
          style: {
            fontWeight: 300,
          },
        },
        min: 0,
      },
      yaxis: [
        {
          title: {
            text: "Events",
            style: {
              fontWeight: 300,
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Non-Events",
            style: {
              fontWeight: 300,
            },
          },
        },
      ],
    };

    return (
		<div className="row mingap">
			<div className="col-md-7">
				<div className="border radius6 p10 bg-white">
					<div className="fs20">Divergence Chart</div>
					<KsChart series={series} options={options} />
				</div>
			</div>

			<div className="col-md-5">
				<div className="border radius6 p10 bg-white">
					<div className="fs20">Divergence Summary</div>
					<div
						className="event-data-metric"
						style={{margin:0, padding:'55px 0 50px 0'}}
					>
						<Row gutter={[24, 24]}>
							<Col key="1" style={{width:'100%'}}>
								<div style={{padding:'5px'}}>
									<p className="mb">{this.state.DivergenceData[0].Metric}</p>
									<p className="mb">{this.state.DivergenceData[0].Value}</p>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col key="2" style={{width:'100%'}}>
								<div style={{padding:'5px'}}>
									<p className="mb">{this.state.DivergenceData[1].Metric}</p>
									<p className="mb">{this.state.DivergenceData[1].Value}</p>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col key="3" style={{width:'100%'}}>
								<div style={{padding:'5px'}}>
									<p className="mb">{this.state.DivergenceData[2].Metric}</p>
									<p className="mb">{this.state.DivergenceData[2].Value}</p>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col key="4" style={{width:'100%'}}>
								<div style={{padding:'5px'}}>
									<p className="mb">{this.state.DivergenceData[3].Metric}</p>
									<p className="mb">{this.state.DivergenceData[3].Value}</p>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
      </div>
    );
  }
}
