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
      hyperFunnelOst: null,
      riskProfileOst: null,
    };
  }

  componentDidMount() {
    this.getStudyDesignDataOst(`${CONTEXT}/modelosteodata/`);
  }

  getStudyDesignDataOst = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "funnel/hyperfunnel.json",
      data: {
        id: "1234",
      },
    });
    this.setState({
      hyperFunnelOst: values.data,
      riskProfileOst: values.data.risk_profile,
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
                    {this.state.hyperFunnelOst ? (
                      <FusionChart
                        data={this.state.hyperFunnelOst.patient_filter}
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
                    Osteoporosis Risk Profile
                  </MDBCardTitle>
                  <MDBCardText
                    style={{ marginTop: "3rem", paddingBottom: "3rem" }}
                    className="text-center"
                  >
                    {this.state.riskProfileOst ? (
                      <DonutChart
                        type="pie"
                        series={this.state.riskProfileOst[0].series}
                        labels={this.state.riskProfileOst[0].labels}
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
