import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import KsChart from "./ksChart";
import TableData from "../../../../utilities/Table";

export default class GiniChartTbl extends Component {
  constructor(props) {
    super(props);
    //console.log("KsChart", props);
    this.state = {
      seriesEvent: props.apiData.LorenzCurve[0].Cumulative_Event,
      seriesTotal: props.apiData.LorenzCurve[0].Cumulative_Total,
      categories: props.apiData.LorenzCurve[0].Cumulative_Total,
      dataSource: props.apiData.LorenzCurveData[0],
      apiData: props.apiData,
    };
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      this.setState({
        seriesEvent: this.props.apiData.LorenzCurve[0].Cumulative_Event,
        seriesTotal: this.props.apiData.LorenzCurve[0].Cumulative_Total,
        categories: this.props.apiData.LorenzCurve[0].Cumulative_Total,
        dataSource: this.props.apiData.LorenzCurveData[0],
        apiData: this.props.apiData,
      });
    }
  }
  tableheader = () => {
    let ind=(typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':((typeof this.state.dataSource[0]['Score Bins']!== "undefined")?'Score Bins':'Score Decile');
    let ind1=(typeof this.state.dataSource[0]['Cumulative % Event']!== "undefined")?'Cumulative % Event':'Cumulative Event %';
    let ind2=(typeof this.state.dataSource[0]['Cumulative % Total']!== "undefined")?'Cumulative % Total':'Cumulative Total %';

    return [
      {
        title: ind,
        dataIndex: ind,
        align: 'left'
      },
      {
        title: 'Cumulative % Event',
        dataIndex: ind1,
        align: 'right'
      },
      {
        title: 'Cumulative % Total',
        dataIndex: ind2,
        align: 'right'
      }
    ]
  }
  render() {
    const series = [
      {
        name: "Model",
        data: this.state.seriesEvent,
      },
      {
        name: "Random",
        data: this.state.seriesTotal,
      },
    ];
    const options = {
      xaxis: {
        categories: this.state.categories,
        title: {
          text: "Cumulative Population %",
          style: {
            fontWeight: 300,
          },
        },
        min: 0,
      },
      yaxis: {
        title: {
          text: "Cumulative Events %",
          style: {
            fontWeight: 300,
          },
        },
        labels: {
          formatter: function (value) {
            return value;
          },
        },
        min: 0,
        max: 100,
      },
    };

    return (
		<div className="row mingap">
			<div className="col-md-6">
				<div className="border radius6 p10 bg-white">
					<div className="fs20">Lorenz Curve Chart</div>
					<KsChart series={series} options={options} />
				</div>
			</div>
			<div className="col-md-6">
				<TableData
					rowClassName="rowSubTable"
					dataSource={this.state.dataSource}
					tblScroll={{y:400}}
					noBordered={true}
					cardStyle={{padding:0}}
          column={this.tableheader()}
          size="small"
				/>
			</div>
		</div>
    );
  }
}
