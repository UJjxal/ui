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
} from "mdbreact";
import Loader from "../../../utilities/Loader";
import SyncFusion from "../../../utilities/SyncFusion";
import TableCustom from "./TableCustom";
import { CONTEXT } from "../../../config";

const column = [
  "Credit Card",
  "ECL",
  "Auto Loans",
  "Personal Loans",
  "Mortgage",
  "Overall",
];

class StudyDesigns extends React.Component {
  constructor() {
    super();
    this.state = {
      funnel: null,
      tableData: null,
      crossSellRate: null,
    };
  }

  componentDidMount() {
    this.getFunnelData(`${CONTEXT}/avidia/`);
  }

  getFunnelData = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "productfunnel.json",
      data: {
        id: "1234",
      },
    });
    this.setState({
      funnel: values.data.funnel,
      tableData: values.data.tableData,
      crossSellRate: values.data.crossSellRate,
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
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Low Cross Sell Rate of 3.2% for existing cross sell
                    campaigns
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    <div className="control-pane">
                      <div className="control-section row">
                        <div className="col-lg-6 mt-3">
                          {this.state.funnel ? (
                            <SyncFusion
                              data={this.state.funnel}
                              id="product-funnel-chart"
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
                          {this.state.tableData ? (
                            <TableCustom
                              tableData={this.state.tableData}
                              column={column}
                            />
                          ) : (
                            <Loader />
                          )}
                        </div>
                      </div>
                    </div>
                    
                  </MDBCardText>
                  
                </MDBCardBody>
                {this.state.tableData ? (
                  <TableCustom tableData={this.state.crossSellRate} />
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
export default StudyDesigns;
