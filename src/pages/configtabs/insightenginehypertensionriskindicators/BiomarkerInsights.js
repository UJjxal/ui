import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import { AppContext } from "../../../AppProvider";
import ApexBSChart from "../../../utilities/ApexBSChart";
import Loader from "../../../utilities/Loader";

const BehaveInsights = () => {
  return (
    <AppContext.Consumer>
      {({ AlbToCrt, AlbInUri, HemToCrt, CrtInUri }) => {
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
                        Albumin To Creatinine Ratio
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {AlbToCrt ? (
                          <ApexBSChart
                            categories={AlbToCrt.categories}
                            series={AlbToCrt.modeldata}
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
                        Hematocrit
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {HemToCrt ? (
                          <ApexBSChart
                            series={HemToCrt.modeldata}
                            categories={HemToCrt.categories}
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
                        Urine Albumin (mg/L)
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {AlbInUri ? (
                          <ApexBSChart
                            categories={AlbInUri.categories}
                            series={AlbInUri.modeldata}
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
                        Urine Creatinine (Mg/dL)
                      </MDBCardTitle>
                      <MDBCardText className="text-center">
                        {CrtInUri ? (
                          <ApexBSChart
                            categories={CrtInUri.categories}
                            series={CrtInUri.modeldata}
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
