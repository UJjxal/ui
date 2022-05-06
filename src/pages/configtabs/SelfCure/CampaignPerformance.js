import React from "react";
import axios from "axios";
import { API_ROOT } from "../../../config";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import Loader from "../../../utilities/Loader";
import ApexBarChartFooter from "../../../utilities/ApexBarChartFooter";
import "antd/dist/antd.css";

class CampaignPerformance extends React.Component {
  constructor() {
    super();
    this.state = {
      testTable: null,
      controlTable: null,
      testControlChart: null,
    };
  }

  componentDidMount() {
    this.getTestTable("selfcure/");
    this.getControlTable("selfcure/");
    this.getTestControlChart("selfcure/");
  }

  getTestTable = (selectedUrl = null) => {
    let url = selectedUrl + "testtable.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      this.setState({ testTable: res.data });
    });
  };

  getControlTable = (selectedUrl = null) => {
    let url = selectedUrl + "controltable.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      this.setState({ controlTable: res.data });
    });
  };

  getTestControlChart = async (selectedUrl) => {
    let url = selectedUrl + "testControlChart.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      this.setState({ testControlChart: res.data });
    });
  };

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow className="mt-4">
          <MDBCol size="6">
            <MDBCard>
              <MDBCardTitle tag="h5" className="text-center mt-3">
                Model Enabled Contact Strategy (Test)
              </MDBCardTitle>
              <MDBCardText>
                {this.state.testTable ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.testTable.columns}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.testTable.rows} />
                  </MDBTable>
                ) : (
                  <Loader style={{ margin: "3% 49%" }} />
                )}
              </MDBCardText>
            </MDBCard>
          </MDBCol>
          <MDBCol size="6">
            <MDBCard style={{}} className="">
              <MDBCardTitle tag="h5" style={{}} className="text-center mt-3">
                BAU Control Strategy (Control)
              </MDBCardTitle>
              <MDBCardText>
                {this.state.controlTable ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.controlTable.columns}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.controlTable.rows} />
                  </MDBTable>
                ) : (
                  <Loader style={{ margin: "3% 49%" }} />
                )}
              </MDBCardText>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-4">
          <MDBCol>
            <MDBCard style={{}} className="">
              <MDBCardTitle
                tag="p"
                style={{ color: "black" }}
                className="text-center mt-3"
              >
                Incremental annual cost save opportunity of $2.2 MM based on
                test vs control results for campaign performance
              </MDBCardTitle>
              <MDBCardText></MDBCardText>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-4">
          {this.state.testControlChart ? (
            this.state.testControlChart.map(function (item, i) {
              return (
                <MDBCol size="4" key={i}>
                  <ApexBarChartFooter
                    title={item.title}
                    series={[
                      {
                        name: item.title,
                        data: item.values,
                      },
                    ]}
                    //footer={item.footer}
                    options={{
                      yaxisTitle: " ",
                      yaxisFormat: {
                        formatter: function (val) {
                          if (item.col_type === "perc") {
                            return val.toFixed(2);
                          }
                          if (item.col_type === "dollar") {
                            return "$" + parseInt(val);
                          }
                          return val.toFixed(1);
                        },
                      },
                      xaxisCategories: item.Decile,
                      xaxisTitle: " ",
                    }}
                  />
                </MDBCol>
              );
            })
          ) : (
            <Loader style={{ margin: "3% 49%" }} />
          )}
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default CampaignPerformance;
