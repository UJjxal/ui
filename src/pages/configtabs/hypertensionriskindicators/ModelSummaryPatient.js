import React from "react";
import { AppContext } from "../../../AppProvider";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import Loader from "../../../utilities/Loader";
import ModelChart from "../../../utilities/ReBarChart";
import ConfusionM from "../../../utilities/ConfusionM";

const ModelSummary = () => {
  return (
    <AppContext.Consumer>
      {({ modelOverview, confusionmatrix }) => {
        return (
          <MDBContainer fluid flexCenter>
            <MDBRow>
              <MDBCardGroup deck className="mt-3">
                <MDBCard style={{ width: "32.5rem" }}>
                  <MDBCardBody className="pb-1">
                    <MDBCardTitle
                      tag="h5"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Modeling Data Overview
                    </MDBCardTitle>
                    <MDBCardText className="text-center">
                      {modelOverview ? (
                        <React.Fragment>
                          {/* <OverviewChart series={[{name: 'Model Data',
        										data: modelOverview["Model Data"]}]}  categories={ ["No Hypertension", "Hypertension"]}/>*/}

                          <ModelChart
                            data={modelOverview["Model Data"]}
                            footerData={modelOverview.metrics}
                          />
                        </React.Fragment>
                      ) : (
                        <Loader />
                      )}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard style={{ width: "32.5rem" }} className="pl-1">
                  <MDBCardBody className="pl-1 pr-1">
                    <MDBCardTitle
                      tag="h5"
                      style={{ color: "black" }}
                      className="text-center "
                    >
                      Confusion Matrix
                    </MDBCardTitle>
                    <MDBCardText>
                      <ConfusionM confusionmatrix={confusionmatrix} />
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCardGroup>
            </MDBRow>
          </MDBContainer>
        );
      }}
    </AppContext.Consumer>
  );
};
export default ModelSummary;
