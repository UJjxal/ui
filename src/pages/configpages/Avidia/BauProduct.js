import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import Loader from "../../../utilities/Loader";
import TableCustom from "./TableCustom";
import ApexBarChart from "../../../utilities/ApexBarChart";

import { CONTEXT } from "../../../config";

class BauProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      modelBar: null,
      tblProductBAU: null,
      tblProductMDL: null,
      tblCrossSell: null,
    };
  }

  componentDidMount() {
    this.getFunnelData(`${CONTEXT}/avidia/`);
  }

  getFunnelData = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "bauproduct.json",
      data: {
        id: "1234",
      },
    });
    this.setState({
      modelBar: values.data.modelBar,
      tblProductBAU: values.data.tblProductBAU,
      tblProductMDL: values.data.tblProductMDL,
      tblCrossSell: values.data.tblCrossSell,
    });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard style={{height:"10.9rem"}}>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                    tag="h6"
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      background: "#1261A0",
                    }}
                    className="text-center p-3"
                  >
                    CONVERSION RATE
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    <MDBRow style={{ fontSize: 20 }}>
                      <MDBCol size="8" className="p-2 text-right">
                        1.9x improvement
                      </MDBCol>
                      <MDBCol size="3" className="p-2 text-left">
                        <img
                          src={`${CONTEXT}/covid/GreenUp.png`}
                          width="30%"
                          style={{ margin: 5 }}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-2">
                      <MDBCol>4%</MDBCol>
                      <MDBCol>7.5%</MDBCol>
                    </MDBRow>
                    <MDBRow className="pb-2">
                      <MDBCol>BAU</MDBCol>
                      <MDBCol>MODEL</MDBCol>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol size="8" style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "#fff",
                    fontSize: 16,
                    background: "#1261A0" }}
                    className="text-center p-3"
                  >
                    PRODUCT LEVEL CROSS SELL RATE (%)
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.tblCrossSell ? (
                      <MDBTable responsive className="condensed-table">
                        <MDBTableHead
                          className="pb-0 pt-2"
                          columns={this.state.tblCrossSell.column}
                          style={{ fontWeight: "bold" }}
                        />
                        <MDBTableBody rows={this.state.tblCrossSell.row} />
                      </MDBTable>
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black", fontSize: 12 }}
                    className="text-center mb-0 pt-2"
                  >
                    BAU VS MODEL ENABLED STRATEGY PERFORMANCE: PRODUCT LEVEL
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.modelBar ? (
                      <ApexBarChart
                        styleCard={{
                          boxShadow: "none",
                        }}
                        chartType="bar"
                        categories={this.state.modelBar.xaxis}
                        series={this.state.modelBar.modeldata}
                      />
                    ) : (
                      <Loader style={{ marginLeft: "40%" }} />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard className="mt-4">
                {this.state.tblProductBAU ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.tblProductBAU.column}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.tblProductBAU.row} />
                  </MDBTable>
                ) : (
                  <Loader />
                )}
              </MDBCard>
            </MDBCol>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard className="mt-4">
                {this.state.tblProductMDL ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.tblProductMDL.column}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.tblProductMDL.row} />
                  </MDBTable>
                ) : (
                  <Loader />
                )}
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default BauProduct;
