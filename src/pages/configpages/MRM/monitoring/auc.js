import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import KsChart from "./ksChart";
import TableData from "../../../../utilities/Table";

export default class Auc extends Component {
  constructor(props) {
    super(props);
    //console.log("ROCCurve", props);

    this.state = {
      seriesModel: props.apiData.ROCCurve[0].TruePositiveRate,
      seriesRandom: props.apiData.ROCCurve[0].FalsePositiveRate,
      categories: props.apiData.ROCCurve[0].FalsePositiveRate,
      dataSource: props.apiData.ROCData[0],
      apiData: props.apiData,
    };
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      this.setState({
        seriesModel: this.props.apiData.ROCCurve[0].TruePositiveRate,
        seriesRandom: this.props.apiData.ROCCurve[0].FalsePositiveRate,
        categories: this.props.apiData.ROCCurve[0].FalsePositiveRate,
        dataSource: this.props.apiData.ROCData[0],
        apiData: this.props.apiData,
      });
    }
  }
  tableheader = () => {
    let ind=(typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':((typeof this.state.dataSource[0]['Score Bins']!== "undefined")?'Score Bins':'Score Decile');

    return [
      {
        title: ind,
        dataIndex: ind,
        align: 'left'
      },
      {
        title: 'FalsePositiveRate',
        dataIndex: 'FalsePositiveRate',
        align: 'right'
      },
      {
        title: 'TruePositiveRate',
        dataIndex: 'TruePositiveRate',
        align: 'right'
      }
    ]
  }

  render() {
    const series = [
      {
        name: "Model",
        data: this.state.seriesModel,
      },
      {
        name: "Random",
        data: this.state.seriesRandom,
      },
    ];

    const options = {
      xaxis: {
        categories: this.state.categories,
        labels: {
          offsetX: 0,
          offsetY: -5,
        },
        title: {
          text: "False Positive Rate",
          style: {
            fontWeight: 300,
          },
        },
        type: "numeric",
        min: 0,
        max: 1,
      },
      yaxis: {
        title: {
          text: "True Positive Rate",
          style: {
            fontWeight: 300,
          },
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(1);
          },
        },
        min: 0,
        //max: 1
      },
    };

    return (
      <div className="row mingap">
        <div className="col-md-6">
			<div className="border radius6 p10 bg-white">
				<div className="fs20">ROC Curve</div>
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
