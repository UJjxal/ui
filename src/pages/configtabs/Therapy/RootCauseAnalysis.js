import React from "react";
import { AppContext } from "../../../AppProvider";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";
import { Select } from "antd";

import Loader from "../../../utilities/Loader";
import ApexLineChart from "../../../utilities/ApexLineChart";
import MDBDataTable from "../../../utilities/MDBDataTable";
import CardList from "../../../utilities/CardList";
const { Option } = Select;

const RootCauseAnalysis = () => {
  return (
    <AppContext.Consumer>
      {({ nodeDropdowns, setRootCause, selectedNodeData }) => {
        return (
          <MDBContainer fluid flexCenter>
            <MDBRow>
              <MDBCard
                className="mt-3"
                style={{ width: "68rem", margin: "1rem 1rem 0 1rem" }}
              >
                <MDBCardBody>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "0.20fr auto",
                    }}
                  >
                    <h6 className="pt-2 pl-4">Select Node</h6>
                    <Select
                      defaultValue={0}
                      style={{ width: 240 }}
                      onChange={(e) => setRootCause(e)}
                    >
                      {nodeDropdowns
                        ? nodeDropdowns.map((el, index) => {
                            return (
                              <Option value={index}>{el.dropdownVal}</Option>
                            );
                          })
                        : null}
                    </Select>
                  </div>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCard
                        style={{ width: "42rem", marginLeft: "1rem" }}
                        className="mt-3"
                      >
                        <MDBCardTitle
                          tag="h5"
                          className="pl-3 pt-2"
                          style={{ color: "black" }}
                        >
                          {selectedNodeData
                            ? selectedNodeData.selectedNode
                            : ""}
                        </MDBCardTitle>
                        <MDBCardText className="text-center">
                          {selectedNodeData ? (
                            <ApexLineChart
                              series={selectedNodeData.lineChart}
                              categories={selectedNodeData.xaxis}
                              yaxisLabelShow="false"
                              height="300"
                            />
                          ) : (
                            <Loader />
                          )}
                        </MDBCardText>
                      </MDBCard>

                      <MDBCard
                        style={{ width: "22rem", marginLeft: "1rem" }}
                        className="mt-3"
                      >
                        <MDBCardTitle
                          tag="h5"
                          className="pl-3 pt-2"
                          style={{ color: "black" }}
                        >
                          Personal Loans
                        </MDBCardTitle>
                        <MDBCardText
                          style={{ maxHeight: 315, overflowY: "scroll" }}
                        >
                          {selectedNodeData ? (
                            <CardList
                              listData={selectedNodeData.personalLoan}
                            />
                          ) : (
                            <Loader />
                          )}
                        </MDBCardText>
                      </MDBCard>
                    </MDBRow>

                    <MDBRow>
                      <MDBCard
                        style={{ width: "65rem", marginLeft: "1rem" }}
                        className="mt-3"
                      >
                        <MDBCardTitle
                          tag="h5"
                          className="pl-3 pt-2"
                          style={{ color: "black" }}
                        >
                          Cohort Analysis
                        </MDBCardTitle>
                        <MDBCardText>
                          <MDBCardBody className="pl-1 pr-1 pb-0 pt-0 ">
                            {selectedNodeData ? (
                              <MDBDataTable
                                mdbDataTable={selectedNodeData.dataTable}
                              />
                            ) : (
                              <Loader width="none" />
                            )}
                          </MDBCardBody>
                        </MDBCardText>
                      </MDBCard>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBContainer>
        );
      }}
    </AppContext.Consumer>
  );
};
export default RootCauseAnalysis;
