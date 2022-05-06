import React from "react";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Loader from "../../../utilities/Loader";
import FeatureChart from "../../../utilities/ApexBarHorizontalChart";
import EventChart from "../../../utilities/ApexLineChart";
import EventBarChart from "../../../utilities/ApexBarModelEventPatient";
import TreeChart from "../../../utilities/TreeChart";

const featureChartDropdown = [
  { value: "All Variables", key: 0 },
  { value: "Laboratory and Dietary variables", key: 1 },
];

const FeatureImportance = () => {
  const legend = [
    { color: "green", label: "Low " },
    { color: "amber", label: "Medium " },
    { color: "red", label: "High " },
  ];
  return (
    <AppContext.Consumer>
      {({
        featureDropdowns,
        featureList,
        selectedFeatureData,
        selectedFeatureChartType,
        setFeatureData,
        setFeatureList,
        selectedFeatureList,
        selectedFeatureTree,
      }) => {
        console.log("selected feature tree", selectedFeatureTree);
        console.log("FeatureImp", selectedFeatureData);
        return (
          <MDBContainer fluid flexCenter className="mt-4">
            <MDBRow>
              <MDBCardGroup deck className="mt-1">
                <MDBCard style={{ width: "32.5rem" }} className="pl-1">
                  <MDBCardBody className="pl-1 pr-1">
                    <MDBCardTitle
                      tag="h5"
                      style={{ color: "black" }}
                      className="text-center "
                    >
                      Significant Feature List
                    </MDBCardTitle>
                    <MDBCardText className="text-center">
                      {selectedFeatureList ? (
                        <FeatureChart
                          dropdownOption={featureChartDropdown}
                          setFeatureList={setFeatureList}
                          series={[{ data: selectedFeatureList.data }]}
                          categories={selectedFeatureList.categories}
                        />
                      ) : (
                        <Loader />
                      )}
                      <h6 className="text-center">%Contribution</h6>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard style={{ width: "32.5rem" }} className="pl-1">
                  <MDBCardBody className="pl-1 pr-1">
                    <MDBCardTitle
                      tag="h5"
                      style={{ color: "black" }}
                      className="text-center"
                    >
                      Feature Distribution
                    </MDBCardTitle>

                    {selectedFeatureData ? (
                      selectedFeatureChartType == "categorical" ? (
                        <EventBarChart
                          series={selectedFeatureData}
                          dropdown={featureDropdowns}
                          setFeatureData={setFeatureData}
                          yaxisF="1"
                        />
                      ) : (
                        <EventChart
                          series={selectedFeatureData}
                          yaxisF="2"
                          yTitle="Event Rate"
                          xTitle="Feature Deciles"
                          dropdown={featureDropdowns}
                          setFeatureData={setFeatureData}
                        />
                      )
                    ) : null}
                  </MDBCardBody>
                </MDBCard>
              </MDBCardGroup>
            </MDBRow>
            <MDBRow>
              <MDBCardGroup deck className="mt-3">
                <MDBCard style={{ width: "67rem" }} className="pl-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center mt-3"
                  >
                    Decision Tree
                  </MDBCardTitle>
                  <MDBCardText>
                    {selectedFeatureTree ? (
                      <TreeChart
                        treeData={selectedFeatureTree}
                        legend={legend}
                      />
                    ) : null}
                  </MDBCardText>
                </MDBCard>
              </MDBCardGroup>
            </MDBRow>
          </MDBContainer>
        );
      }}
    </AppContext.Consumer>
  );
};
export default FeatureImportance;
