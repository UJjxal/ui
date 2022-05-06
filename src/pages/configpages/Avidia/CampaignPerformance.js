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
import SyncFusion from "../../../utilities/SyncFusion";
import {CONTEXT} from '../../../config';
import TableCustom from "./TableCustom";

const columnProd = [
  {
    label: "Product",
    field: "product",
  },
  {
    label: "Credit Card",
    field: "credit_card",
  },
  {
    label: "ECL",
    field: "ecl",
  },
  {
    label: "Auto Loans",
    field: "auto_Loans",
  },
  {
    label: "Personal Loans",
    field: "personal_Loans",
  },
  {
    label: "Mortgage",
    field: "mortgage",
  },
  {
    label: "Overall",
    field: "overall",
  },
];
const columnChannel = [
  {
    label: "Channel",
    field: "channel",
  },
  {
    label: "Branch",
    field: "branch",
  },
  {
    label: "Call Center​",
    field: "call_center",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "App",
    field: "app",
  },
  {
    label: "Web",
    field: "web",
  },
  {
    label: "Overall",
    field: "overall",
  },
];

class CampaignPerformance extends React.Component {
  constructor() {
    super();
    this.state = {
      strategy: null,
      business: null,
      tblChannelStg: null,
      tblProductStg: null,
    };
  }

  componentDidMount() {
    this.getFunnelData(`${CONTEXT}/avidia/`);
  }

  getFunnelData = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "campaignperformance.json",
      data: {
        id: "1234",
      },
    });
    //console.log('avidiaOut',values);
    this.setState({
      strategy: values.data.strategy,
      business: values.data.business,
      tblChannelStg: values.data.tblChannelStg,
      tblProductStg: values.data.tblProductStg,
    });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCol style={{ padding: "0px 2rem 1rem 0" }}>
              <MDBCard>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardText className="text-center">
                    <div className="control-pane">
                      <div className="control-section row">
                        <div className="col-lg-6">
                          <h5>Business As Usual</h5>
                          {this.state.business ? (
                            <SyncFusion
                              data={this.state.business}
                              id="business-funnel-chart"
                              display="display"
                              pointRender={true}
                              width="90%"
                              disabledTooltip={true}
                            />
                          ) : (
                            <Loader />
                          )}
                        </div>

                        <div className="col-lg-6">
                        <h5>Model Enabled Strategy</h5>
                          {this.state.strategy ? (
                            <SyncFusion
                              data={this.state.strategy}
                              id="strategy-funnel-chart"
                              display="display"
                              pointRender={true}
                              width="90%"
                              disabledTooltip={true}
                            />
                          ) : (
                            <Loader />
                          )}
                        </div>
                      </div>
                      <MDBCard className="mt-4">
                        {this.state.tblProductStg ? (
                          <MDBTable
                            responsive
                            striped
                            className="condensed-table"
                          >
                            <MDBTableHead
                              className="pb-0 pt-2"
                              columns={columnProd}
                              style={{ fontWeight: "bold" }}
                            />
                            <MDBTableBody rows={this.state.tblProductStg} />
                          </MDBTable>
                        ) : (
                          <Loader />
                        )}
                      </MDBCard>
                      <MDBCard className="mt-4">
                        {this.state.tblChannelStg ? (
                          <MDBTable
                            responsive
                            striped
                            className="condensed-table"
                          >
                            <MDBTableHead
                              className="pb-0 pt-2"
                              columns={columnChannel}
                              style={{ fontWeight: "bold" }}
                            />
                            <MDBTableBody rows={this.state.tblChannelStg} />
                          </MDBTable>
                        ) : (
                          <Loader />
                        )}
                      </MDBCard>
                    </div>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default CampaignPerformance;
