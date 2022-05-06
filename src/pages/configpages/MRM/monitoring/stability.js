import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";

import TableData from "../../../../utilities/Table";
import BarChart from "./barChart";

class Stability extends Component {
  constructor(props) {
    super(props);
    //console.log("Stability", props.apiData.PSI[0]);

    this.state = {
      modal: false,
      seriesActual: props.apiData.PSI[0].Actual,
      seriesExpected: props.apiData.PSI[0].Expected,
      categories: props.apiData.PSI[0].Score_Decile || props.apiData.PSI[0].Rating,
      dataSource: props.apiData.PSIData[0],
      monthlyPSI: props.apiData.MonthlyPSI ? props.apiData.MonthlyPSI : null,
      apiData: props.apiData,
    };
  }

  componentDidUpdate() {
    if (this.state.apiData != this.props.apiData) {
      this.setState({
        seriesActual: this.props.apiData.PSI[0].Actual,
        seriesExpected: this.props.apiData.PSI[0].Expected,
        categories: this.props.apiData.PSI[0].Score_Decile || this.props.apiData.PSI[0].Rating,
        dataSource: this.props.apiData.PSIData[0],
        monthlyPSI: this.props.apiData.MonthlyPSI,
        apiData: this.props.apiData,
      });
    }
  }

  calculatePsi(records) {
    let sum = records.reduce(function (total, record) {
      //console.log("acc121", total);
      //console.log("record121", record["Contribution To PSI"]);
      return total + record["Contribution To PSI"];
    }, 0);
    //console.log("sum121", sum.toFixed(3));
    return sum.toFixed(3);
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
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
        title: "Expected %",
        dataIndex: "Expected %",
        align: "right"
      },
      {
        title: "Actual %",
        dataIndex: "Actual %",
        align: "right"
      },
      {
        title: "Actual-Expected",
        dataIndex: "Actual-Expected",
        align: "right"
      },
      {
        title: "ln(Actual/Expected)",
        dataIndex: "ln(Actual/Expected)",
        align: "right"
      },
      {
        title: "Contribution To PSI",
        dataIndex: "Contribution To PSI",
        align: "right"
      }
    ]
  }

  render() {
    const threshold = (
      <div>
        <p>Thresholds:</p>
        <p>
          0.1 or Less: Little or no difference between two score distributions
        </p>
        <p>
          0.1 to 0.25: Moderate change detected between the two score
          distributions. More analysis is required.
        </p>
        <p>
          More than 0.25: Large shift. The population should be looked at on
          individual characteristic basis for root cause analysis
        </p>
      </div>
    );
    const series = [
      {
        name: "Actual",
        data: this.state.seriesActual,
      },
      {
        name: "Expected",
        data: this.state.seriesExpected,
      },
    ];
    const options = {
      title: {
        text: "Distribution of Population",
      },
      xaxis: {
        categories: this.state.categories,
        title: {
          text: "Population Distribution",
          style: {
            fontWeight: 300,
          },
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%";
          },
        },
      },
      yaxis: {
        title: {
          text: "Score Range",
          style: {
            fontWeight: 300,
          },
        },
      },
    };

    return (
      <div style={{ background: "#fff" }}>
        <Row>
          <Col style={{width:'100%'}}>
            <TableData
              size="small"
              rowClassName="rowSubTable"
              dataSource={this.state.dataSource}
              noBordered={true}
              cardStyle={{padding:0}}
              tblScroll={{y:350}}
              column={this.tableheader()}
            />
          </Col>
        </Row>
        <Row style={{ margin: "0 0 20px" }}>
          <Col
            style={{
              padding: "5px",
              background: "#203864",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div>
              Population Stability Index ={" "}
              {this.calculatePsi(this.state.dataSource)}
            </div>
          </Col>
        </Row>

        <div className="border radius6 p10">
			<div className="row">
				<div className="col-md-6">
					<BarChart
						series={series}
						options={options}
						chartId={"popstability"}
					/>
				</div>
				<div className="col-md-6">
					{this.state.monthlyPSI ? <Button
					type="success"
					style={{ float: "right" }}
					onClick={() =>
						this.setState((state) => ({
						modal: !state.modal,
						}))
					}
					>
					Monthly PSI value
					</Button> : ''}
					<div className="border radius6 bg-light p10">
					  {threshold}
					</div>
				</div>
			</div>
		</div>

        <MDBModal
          isOpen={this.state.modal}
          toggle={() => this.toggleModal()}
          size="lg"
        >
          <div
            className="modal-header"
            style={{ background: "rgb(32, 56, 100)" }}
          >
            <h4 className="title m-0 white-text">Monthly PSI</h4>
            <span
              //type="button"
              className="close white-text"
              onClick={() => this.toggleModal()}
              style={{ opacity: 1 }}
            >
              <span aria-hidden="true">×</span>
            </span>
          </div>
          <MDBModalBody>
            <TableData
              size="small"
              rowClassName="rowSubTable"
              dataSource={this.state.monthlyPSI ? this.state.monthlyPSI : null}
              tblScroll={{y:400}}
              noBordered={true}
              cardStyle={{padding:0}}
            />
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default Stability;
