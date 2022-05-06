import React from "react";
import { AppContext } from "../../../AppProvider";
//import Loader from "react-loader-spinner";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import ApexBSChart from "../../../utilities/ApexBSChart";
import Loader from "../../../utilities/Loader";

const BehaveInsights = () => {
  return (
    <AppContext.Consumer>
      {({
        AgeOsteoHist,
        GenderOsteoHist,
        ParentOsteoHist,
        HipFractureHist,
      }) => {
        return (
          <React.Fragment>
            <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
              <MDBRow>
                <MDBCardGroup deck className="mt-1">
                  <MDBCard style={{ width: "32rem" }}>
                    <MDBCardBody className="pl-1 pr-1">
                      <MDBCardTitle
                        tag="h6"
                        style={{ color: "black" }}
                        className="text-center "
                      >
                        Age
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {AgeOsteoHist ? (
                          <ApexBSChart
                            categories={AgeOsteoHist.categories}
                            series={AgeOsteoHist.modeldata}
                          />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard style={{ width: "32rem" }} className="ml-3">
                    <MDBCardBody className="pl-2 pr-1">
                      <MDBCardTitle
                        tag="h6"
                        style={{ color: "black" }}
                        className="text-center "
                      >
                        Gender
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {GenderOsteoHist ? (
                          <ApexBSChart
                            series={GenderOsteoHist.modeldata}
                            categories={GenderOsteoHist.categories}
                          />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCardGroup>
              </MDBRow>

              <MDBRow>
                <MDBCardGroup deck className="mt-3">
                  <MDBCard style={{ width: "32rem" }} className="">
                    <MDBCardBody className="pl-1 pr-1">
                      <MDBCardTitle
                        tag="h6"
                        style={{ color: "black" }}
                        className="text-center "
                      >
                        Parent's Osteoporosis History
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {ParentOsteoHist ? (
                          <ApexBSChart
                            categories={ParentOsteoHist.categories}
                            series={ParentOsteoHist.modeldata}
                          />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                  <MDBCard style={{ width: "32rem" }}>
                    <MDBCardBody className="pl-1 pr-1">
                      <MDBCardTitle
                        tag="h6"
                        style={{ color: "black" }}
                        className="text-center "
                      >
                        Hip Fracture History
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {HipFractureHist ? (
                          <ApexBSChart
                            categories={HipFractureHist.categories}
                            series={HipFractureHist.modeldata}
                          />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCardGroup>
              </MDBRow>
            </MDBContainer>
          </React.Fragment>
        );
      }}
    </AppContext.Consumer>
  );
};
export default BehaveInsights;
