import React from "react";
import { Row, Col, Card } from "antd";

const labelth = {
    textAlign: "center",
    background: "#f2f2f2",
  },
  valuetd = {
    textAlign: "center",
    background: "#8faadc",
    padding: "10px 0",
    color: "#fff",
  },
  valuetd2 = {
    textAlign: "center",
    background: "#cfdfea",
    padding: "10px 0",
  };
export default class Confusion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confusion: [
        {
          label: props.apiData.ConfusionMatrix[0][0].label,
          negative: props.apiData.ConfusionMatrix[0][0].negative,
          positive: props.apiData.ConfusionMatrix[0][0].positive,
        },
        {
          label: props.apiData.ConfusionMatrix[0][1].label,
          negative: props.apiData.ConfusionMatrix[0][1].negative,
          positive: props.apiData.ConfusionMatrix[0][1].positive,
        },
      ],
      EventDataMetric: [
        {
          label: props.apiData.EventDataMetric[0][0].Metric,
          value: props.apiData.EventDataMetric[0][0].Value,
        },
        {
          label: props.apiData.EventDataMetric[0][1].Metric,
          value: props.apiData.EventDataMetric[0][1].Value,
        },
        {
          label: props.apiData.EventDataMetric[0][2].Metric,
          value: props.apiData.EventDataMetric[0][2].Value,
        },
        {
          label: props.apiData.EventDataMetric[0][3].Metric,
          value: props.apiData.EventDataMetric[0][3].Value,
        },
      ],
      apiData: props.apiData,
    };
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      this.setState({
        confusion: [
          {
            label: this.props.apiData.ConfusionMatrix[0][0].label,
            negative: this.props.apiData.ConfusionMatrix[0][0].negative,
            positive: this.props.apiData.ConfusionMatrix[0][0].positive,
          },
          {
            label: this.props.apiData.ConfusionMatrix[0][1].label,
            negative: this.props.apiData.ConfusionMatrix[0][1].negative,
            positive: this.props.apiData.ConfusionMatrix[0][1].positive,
          },
        ],
        EventDataMetric: [
          {
            label: this.props.apiData.EventDataMetric[0][0].Metric,
            value: this.props.apiData.EventDataMetric[0][0].Value,
          },
          {
            label: this.props.apiData.EventDataMetric[0][1].Metric,
            value: this.props.apiData.EventDataMetric[0][1].Value,
          },
          {
            label: this.props.apiData.EventDataMetric[0][2].Metric,
            value: this.props.apiData.EventDataMetric[0][2].Value,
          },
          {
            label: this.props.apiData.EventDataMetric[0][3].Metric,
            value: this.props.apiData.EventDataMetric[0][3].Value,
          },
        ],
        apiData: this.props.apiData,
      });
    }
  }

  render() {
    return (
      <div className="row mingap">
        <div className="col-md-6">
			<div className="border radius6 p10 bg-white">
				<div className="fs20">Confusion Matrix</div>
				<table style={{ borderSpacing: "1px", padding: "15px 0 15px 0px", width: "100%" }}>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td
							colSpan="2"
							style={{ textAlign: "center", fontWeight: "500" }}
							>
							Predicted
							</td>
						</tr>
					<tr>
						<td></td>
						<td></td>

						<td style={labelth}>{this.state.confusion[0].label}</td>
						<td style={labelth}>{this.state.confusion[1].label}</td>
					</tr>
					<tr>
						<td
						rowSpan="2"
						style={{
							writingMode: "vertical-lr",
							transform: "rotate(270deg)",
							textAlign: "center",
							width: "60px",
							fontWeight: "500",
						}}
						>
						Actual
						</td>
						<td style={labelth}>{this.state.confusion[0].label}</td>
						<td style={valuetd}>{this.state.confusion[0].negative}</td>
						<td style={valuetd}>{this.state.confusion[0].positive}</td>
					</tr>
					<tr>
						<td style={labelth}>{this.state.confusion[1].label}</td>
						<td style={valuetd2}>{this.state.confusion[1].negative}</td>
						<td style={valuetd2}>{this.state.confusion[1].positive}</td>
					</tr>
					</tbody>
				</table>
			</div>
        </div>

        <div className="col-md-6">
			<div className="border radius6 p10 bg-white">
				<div className="fs20">Event Classification Summary</div>
				<div className="event-data-metric p15" style={{margin:0}}>
					<Row gutter={[24, 24]}>
						<Col key="1" span={12}>
							<div>
								<p className="mb">{this.state.EventDataMetric[0].label}</p>
								<p className="mb">{this.state.EventDataMetric[0].value}</p>
							</div>
						</Col>
						<Col key="2" span={12}>
							<div>
								<p className="mb">{this.state.EventDataMetric[1].label}</p>
								<p className="mb">{this.state.EventDataMetric[1].value}</p>
							</div>
						</Col>
					</Row>
					<Row gutter={[24, 24]}>
						<Col key="3" span={12}>
							<div>
								<p className="mb">{this.state.EventDataMetric[2].label}</p>
								<p className="mb">{this.state.EventDataMetric[2].value}</p>
							</div>
						</Col>
						<Col key="4" span={12}>
							<div>
								<p className="mb">{this.state.EventDataMetric[3].label}</p>
								<p className="mb">{this.state.EventDataMetric[3].value}</p>
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
