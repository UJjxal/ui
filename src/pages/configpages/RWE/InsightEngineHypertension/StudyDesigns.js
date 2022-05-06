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

import Loader from "../../../../utilities/Loader";
import DonutChart from "../../../../utilities/DonutChart";
import FusionChart from "../../../../utilities/FusionChart";
import { CONTEXT } from "../../../../config";

class StudyDesigns extends React.Component {
  constructor() {
    super();
    this.state = {
      hyperFunnel: null,
      riskProfile: null,
    };
  }

  componentDidMount() {
    this.getHyperFunnelData(`${CONTEXT}/modelpatientdata/`);
  }

  getHyperFunnelData = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "funnel/hyperfunnel.json",
      data: {
        id: "1234",
      },
    });
    this.setState({
      hyperFunnel: values.data,
      riskProfile: values.data.risk_profile,
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
                    Respondent Cohort Selection
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.hyperFunnel ? (
                      <FusionChart
                        data={this.state.hyperFunnel.patient_filter}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol sm="12" className="" style={{ padding: "0 2rem 0 .25rem" }}>
              <MDBCard style={{ height: "21.2rem" }} className="ml-1">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Hypertension Risk Profile
                  </MDBCardTitle>
                  <MDBCardText
                    style={{ marginTop: "3rem", paddingBottom: "3rem" }}
                    className="text-center"
                  >
                    {this.state.riskProfile ? (
                      <DonutChart
                        type="pie"
                        series={this.state.riskProfile[0].series}
                        labels={this.state.riskProfile[0].labels}
                      />
                    ) : (
                      <Loader />
                    )}
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
export default StudyDesigns;
