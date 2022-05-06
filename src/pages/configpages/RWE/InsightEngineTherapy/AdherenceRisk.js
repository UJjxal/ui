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
import FusionChart from "../../../../utilities/FusionChart";
import DonutChart from "../../../../utilities/DonutChart";
import ApexBarModelEventPatient from "../../../../utilities/ApexBarModelEventPatient";
import { CONTEXT } from "../../../../config";

class AdherenceRisk extends React.Component {
  constructor() {
    super();
    this.state = {
      AdherenceRisk: null,
    };
  }

  componentDidMount() {
    this.getFunnelData(`${CONTEXT}/modeldata/`);
  }

  // Get data for Adherence Risk Page
  getFunnelData = async (selectedUrl) => {
    console.log("selectedUrl123", selectedUrl);
    let AdherenceRisk = await axios({
      method: "get",
      url: selectedUrl + "adherencerisk/AdherenceRisk.json",
      data: {
        id: "1234",
      },
    });
    console.log("AdherenceRisk123", AdherenceRisk.data);
    this.setState({ AdherenceRisk: AdherenceRisk.data });
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
                    Analysis Patient Universe
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AdherenceRisk ? (
                      <FusionChart
                        data={this.state.AdherenceRisk.patient_filter}
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
            <MDBCol sm="9" className="p-0">
              <MDBCard style={{ width: "" }}>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Likelihood of Therapy Non-Adherence
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AdherenceRisk ? (
                      <ApexBarModelEventPatient
                        categories={
                          this.state.AdherenceRisk.probability_distribution[0]
                            .categories
                        }
                        series={
                          this.state.AdherenceRisk.probability_distribution
                        }
                        yTitle="Percentage"
                        xTitle="Non-Adherence Propensity"
                        dataLabelsPercentage="true"
                        height="250"
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="3" className="" style={{ padding: "0 2rem 0 .25rem" }}>
              <MDBCard style={{ height: "21.2rem" }} className="ml-1">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Non-Adherence Risk Profile
                  </MDBCardTitle>
                  <MDBCardText
                    style={{ marginTop: "3rem" }}
                    className="text-center"
                  >
                    {this.state.AdherenceRisk ? (
                      <DonutChart
                        type="pie"
                        series={this.state.AdherenceRisk.risk_profile[0].series}
                        labels={this.state.AdherenceRisk.risk_profile[0].labels}
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
export default AdherenceRisk;
