import React, { Component } from "react";
import { Row, Col, Button, Avatar } from "antd";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";

import TableData from "../../../../utilities/Table";
import BarChart from "./barChart";

class DataMonitoring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      seriesData: props.chartData.CSI[0].CSI_Score,
      categories: props.chartData.CSI[0].Variable,
      dataSource: props.chartData.CSIData[0],
      monthlyCSI: props.chartData.MonthlyCSI ? props.chartData.MonthlyCSI : null,
      chartData: props.chartData,
    };
  }

  componentDidUpdate() {
    if (this.state.chartData != this.props.chartData) {
      this.setState({
        seriesData: this.props.chartData.CSI[0].CSI_Score,
        categories: this.props.chartData.CSI[0].Variable,
        dataSource: this.props.chartData.CSIData[0],
        monthlyCSI: this.props.chartData.MonthlyCSI ? this.props.chartData.MonthlyCSI : null,
        chartData: this.props.chartData,
      });
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  tableheader = () => {
    return [
      {
        title: 'Variable',
        dataIndex: 'Variable'
      },
      {
        title: 'CSI Score',
        dataIndex: 'CSI Score',
        align: 'right'
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        align: 'center',
        render: (text) => {
          return {
            children: (
              <Avatar
                style={{
                  backgroundColor: text,
                  verticalAlign: "middle",
                  // display: "block",
                }}
                size="small"
              />
            ),
          };
        },
      }
    ]
  }
  render() {
    const series = [
      {
        data: this.state.seriesData,
      },
    ];
    const options = {
      title: {
        text: "CSI Scores For Significant Variables",
      },
      xaxis: {
        categories: this.state.categories,
        title: {
          style: {
            fontWeight: 300,
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
      },
    };
    
    return (
      <div style={{ background: "#fff" }}>
		<div className="row">
			<div className="col-md-6">
				<div className="border radius6 p10">
					<BarChart
						series={series}
						options={options}
						chartId={"charstability"}
					/>
				</div>
			</div>

			<div className="col-md-6">
				{this.state.dataSource ? ( <>
				<div
					className="ant-row"
					style={{ width: "100%", padding: "0 0 3px 0" }}
				>
				{this.state.monthlyCSI ? <Button
					onClick={() =>
					this.setState((state) => ({
						modal: !state.modal,
					}))
					}
				>
					Monthly CSI value
				</Button> : ""}
				</div>

				<TableData
					size="small"
					rowClassName="rowSubTable"
					column={this.tableheader()}
					dataSource={this.state.dataSource}
					tblScroll={{y:375}}
					noBordered={true}
					cardStyle={{padding:0}}
				/>
				</>) : null}
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
            <h4 className="title m-0 white-text">Monthly CSI</h4>
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
              dataSource={this.state.monthlyCSI}
              noBordered={true}
              cardStyle={{padding:0}}
            />
          </MDBModalBody>
          {/* <MDBModalFooter>
            <MDBBtn color="light" onClick={() => this.toggleModal()}>
              Close
            </MDBBtn>
          </MDBModalFooter> */}
        </MDBModal>
      </div>
    );
  }
}

export default DataMonitoring;
