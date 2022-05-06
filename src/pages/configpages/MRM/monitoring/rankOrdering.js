import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import TableData from "../../../../utilities/Table";
import Chart from "./ksChart";

class RankOrdering extends Component {
  constructor(props) {
    super(props);
    //console.log("Ranking121", props);

    this.state = {
      seriesActual: props.rankData.Actual_Bad,
      seriesExpected: props.rankData.Expected_Bad,
      categories: props.rankData.Score_Decile || props.rankData.Rating,
      dataSource: props.table,
      rankData: props.rankData,
    };
  }

  componentDidMount() {
    console.log("componentDidMount1213");
  }

  componentDidUpdate() {
    console.log("componentDidUp1213");
    if (this.state.rankData != this.props.rankData) {
      this.setState({
        seriesActual: this.props.rankData.Actual_Bad,
        seriesExpected: this.props.rankData.Expected_Bad,
        categories: this.props.rankData.Score_Decile || this.props.rankData.Rating,
        dataSource: this.props.table,
        rankData: this.props.rankData,
      });
    }
  }
  tableheader = () => {
    let title=(typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':((typeof this.state.dataSource[0]['Score Bins']!== "undefined")?'Score Bins':'Score Decile');
    let ind=(typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':((typeof this.state.dataSource[0]['Score Bins']!== "undefined")?'Score Bins':((typeof this.state.dataSource[0].Score_Decile!== "undefined")?'Score_Decile':'Score Decile'));

    return [
      {
        title: title,
        dataIndex: ind,
        align: 'left'
      },
      {
        title: "Actual % Bad",
        dataIndex: (typeof this.state.dataSource[0]['Actual % Bad']!== "undefined")?'Actual % Bad':'Actual Bad %',
        align: "right"
      },
      {
        title: "Expected % Bad",
        dataIndex: (typeof this.state.dataSource[0]['Expected % Bad']!== "undefined")?'Expected % Bad':'Expected Bad %',
        align: "right"
      }
    ]
  }

  render() {
    const seriesNew = [
      {
        name: "Actual Event %",
        data: this.state.seriesActual,
      },
      {
        name: "Expected Event %",
        data: this.state.seriesExpected,
      },
    ];
    const optionsNew = {
      xaxis: {
        categories: this.state.categories,
        title: {
          text: (typeof this.state.dataSource[0].Rating!== "undefined")?'Rating':((typeof this.state.dataSource[0]['Score Bins']!== "undefined")?'Score Bins':'Score Decile'),
          style: {
            fontWeight: 300,
          },
        },
        min: 0,
      },
      yaxis: {
        tickAmount: 6,
        min: 0,
        //max: 60,
        title: {
          text: "Events Rate %",
          style: {
            fontWeight: 300,
          },
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },
    };

    //console.log("Ranking1212", this.props);
    return (
      <Row style={{ background: "#fff" }}>
        <Col span={12}>
          <div className="border radius6 p15">
            <Chart
              chartId="ranking"
              series={seriesNew}
              options={optionsNew}
              //categories={this.state.categories}
              height={350}
            />
          </div>
        </Col>
        <Col span={12} className="pdLeft">
          <TableData
            size="small"
            class="subTable"
            rowClassName="rowSubTable"
            dataSource={this.state.dataSource}
            tblScroll={{y:356}}
            noBordered={true}
						cardStyle={{padding:0}}
            column={this.tableheader()}
          />
        </Col>
      </Row>
    );
  }
}

export default RankOrdering;
