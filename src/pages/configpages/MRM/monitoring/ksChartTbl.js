import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import KsChart from "./ksChart";
import TableData from "../../../../utilities/Table";

export default class KsChartTbl extends Component {
  constructor(props) {
    super(props);
    //console.log("KsChart", props);
    this.state = {
      seriesEvent: props.apiData.KSCurve[0].cum_eventrate,
      seriesNonEvent: props.apiData.KSCurve[0].cum_noneventrate,
      categories: this.props.apiData.KSCurve[0].Score_Decile || this.props.apiData.KSCurve[0].Rating,
      dataSource: props.apiData.KSCurveData[0],
    };
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      this.setState({
        seriesEvent: this.props.apiData.KSCurve[0].cum_eventrate,
        seriesNonEvent: this.props.apiData.KSCurve[0].cum_noneventrate,
        categories: this.props.apiData.KSCurve[0].Score_Decile || this.props.apiData.KSCurve[0].Rating,
        dataSource: this.props.apiData.KSCurveData[0],
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
        title: 'Cumulative Event %',
        dataIndex: 'Cumulative Event %',
        align: 'right'
      },
      {
        title: 'Cumulative Non Event %',
        dataIndex: 'Cumulative Non Event %',
        align: 'right'
      },
      {
        title: 'KS',
        dataIndex: 'KS',
        align: 'right'
      }
    ]
  }

  render() {
    const series = [
      {
        name: "Event %",
        data: this.state.seriesEvent,
      },
      {
        name: "Non-event %",
        data: this.state.seriesNonEvent,
      },
    ];
    const options = {
      xaxis: {
        categories: this.state.categories,
        title: {
          text: (typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':'Score Decile',
          style: {
            fontWeight: 300,
          },
        },
        min: 0,
      },
      yaxis: {
        title: {
          text: "Cumulative Event/ Non-Event %",
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
				<div className="fs20">KS Chart</div>
				<KsChart series={series} options={options} />
			</div>
        </div>
        <div className="col-md-6">
          <TableData
            size="small"
            rowClassName="rowSubTable"
            dataSource={this.state.dataSource}
            tblScroll={{y:400}}
            noBordered={true}
            cardStyle={{padding:0}}
            column={this.tableheader()}
          />
        </div>
      </div>
    );
  }
}
