import React from "react";
import { AppContext } from "../../../AppProvider";
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
import DonutChart from "../../../utilities/DonutChart";
import FusionChart from "../../../utilities/FusionChart";

const StudyDesigns = () => {
  return (
    <AppContext.Consumer>
      {({ hyperFunnel, riskProfile }) => {
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
                        {hyperFunnel ? (
                          <FusionChart data={hyperFunnel.patient_filter} />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol
                  sm="12"
                  className=""
                  style={{ padding: "0 2rem 0 .25rem" }}
                >
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
                        {riskProfile ? (
                          <DonutChart
                            type="pie"
                            series={riskProfile[0].series}
                            labels={riskProfile[0].labels}
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
      }}
    </AppContext.Consumer>
  );
};
export default StudyDesigns;
