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
import ApexBarChart from "../../../utilities/ApexBarChart";
import DonutChart from "../../../utilities/DonutChart";
import {CONTEXT} from '../../../config';

class BauProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      modelBar: null,
      tblChannelBAU: null,
      tblChannelMDL: null,
      tblCrossSell: null,
    };
  }

  componentDidMount() {
    this.getFunnelData(`${CONTEXT}/avidia/`);
  }

  getFunnelData = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "bauchannel.json",
      data: {
        id: "1234",
      },
    });
    this.setState({
      modelBar: values.data.modelBar,
      tblChannelBAU: values.data.tblChannelBAU,
      tblChannelMDL: values.data.tblChannelMDL,
      tblCrossSell: values.data.tblCrossSell,
      DonutChart: values.data.DonutChart,
    });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard style={{height:"15.4rem"}}>
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
                    DIGITAL CHANNEL MIX
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    <MDBRow style={{ fontSize: 23 }}>
                      <MDBCol size="8" className="p-2 pt-4 text-right">
                        2.2x improvement
                      </MDBCol>
                      <MDBCol size="3" className="p-2 pt-4">
                        <img
                          src={`${CONTEXT}/covid/GreenUp.png`}
                          width="30%"
                          style={{ margin: 5 }}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-4" style={{ fontSize: 23 }}>
                      <MDBCol>5%</MDBCol>
                      <MDBCol>11%</MDBCol>
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
              {/* <MDBCard>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "#fff",
                    fontSize: 16,
                    background: "#1261A0" }}
                    className="text-center p-3"
                  >
                    CHANNEL MIX (%)
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
              </MDBCard> */}

              <MDBCard>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                   tag="h6"
                   style={{ color: "#fff",
                   fontSize: 16,
                   background: "#1261A0" }}
                   className="text-center p-3"
                  >
                    CHANNEL MIX (%)
                  </MDBCardTitle>
                  <MDBCardText
                    //style={{ marginTop: "3rem", paddingBottom: "3rem" }}
                    className="text-center"
                  >
                    {this.state.DonutChart ? (
                      <MDBRow>
                        <MDBCol>
                        <MDBCard style={{boxShadow:"none"}}>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black",fontSize:15 }}
                    className="text-center "
                  >
                    BAU
                  </MDBCardTitle>
                  <MDBCardText
                    className="text-center"
                  >

                          <DonutChart
                            type="pie"
                            series={this.state.DonutChart[0].series}
                            labels={this.state.DonutChart[0].labels}
                            height={150}
                            type="donut"
                            disabledLegend={true}
                            colors={["#008ffb", "#83aef9", "#00e396", "#80e9b4", "#bdeed2"]}
                          />
                          </MDBCardText>
                          </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol>
                        <MDBCard style={{boxShadow:"none"}}>
                <MDBCardBody className="p-0">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black",fontSize:15,marginRight:"7rem" }}
                  >
                    Model
                  </MDBCardTitle>
                  <MDBCardText
                    className="text-center"
                  >
                          <DonutChart
                            type="pie"
                            series={this.state.DonutChart[1].series}
                            labels={this.state.DonutChart[1].labels}
                            height={150}
                            type="donut"
                            legendPos="right"
                            colors={["#008ffb", "#83aef9", "#00e396", "#80e9b4", "#bdeed2"]}
                          />
                          </MDBCardText>
                          </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
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
                    BAU VS MODEL ENABLED STRATEGY PERFORMANCE: CHANNEL LEVEL
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
                {this.state.tblChannelBAU ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.tblChannelBAU.column}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.tblChannelBAU.row} />
                  </MDBTable>
                ) : (
                  <Loader />
                )}
              </MDBCard>
            </MDBCol>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard className="mt-4">
                {this.state.tblChannelMDL ? (
                  <MDBTable responsive striped className="condensed-table">
                    <MDBTableHead
                      className="pb-0 pt-2"
                      columns={this.state.tblChannelMDL.column}
                      style={{ fontWeight: "bold" }}
                    />
                    <MDBTableBody rows={this.state.tblChannelMDL.row} />
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
