import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import backimage from "../../../assets/image_kpi-tree_domestic-revenue.svg";
import { NavLink } from "react-router-dom";
import { CONTEXT, GATEWAYBASED, PROJECT_ID } from "../../../config";
import { AppContext } from '../../../AppProvider';
import "antd/dist/antd.css";
import {
  MDBBtn,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBRow
} from "mdbreact";
// popover on the Yes and publish button

// class based  Overlay component
// not yet linked with onclick event of publish
const CreateAnalysisModal = (props) => {
  const font_style = {
    marginTop: "25px",
    fontSize: "16px",
    fontFamily: "Roboto",
    letterSpacing: "0.8px",
    lineHeight: "24px",
    textAlign: "left",
  };

  return (
    <AppContext.Consumer>
				{
					({
						
						selectedKPILink, selectedUsecaselink
					}) =>
    <MDBModal
      isOpen={props.displayNewAnalysisModal}
      className="cascading-modal my-5 px-5 "
      size="fluid"
      style={{ width: "100rem" }}
    >
      <MDBModalBody className="m-2">
        <MDBRow className="mt-1">
          <MDBCol className="m-3">
            <h4 style={{ height: "2rem", color: "#1E4564" }}>
              Create a New Analysis
            </h4>
            <div style={{ height: "12rem", width: "30rem" }}>
              <h6 style={font_style}>
                An Analysis can inform you about <b>Anomalies</b> and{" "}
                <b>Contributing Cohort</b> details for each node in a KPI Tree.
              </h6>
              <h6 style={font_style}>
                You can view how your node data changes over time to help
                <b> inform present and future situations</b>
              </h6>
              <h6 style={font_style}>
                First, we will name and define the goals of your Analysis, then
                define the settings.
              </h6>
            </div>
          </MDBCol>
          <MDBCol>
            <Card
              style={{
                backgroundImage: `url(${backimage})`,
                backgroundSize: "cover",
                backgroundColor: "#F4F5F7",
                marginTop: "2rem",
                height: "20rem",
              }}
            ></Card>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter className="d-flex flex-row align-items-center justify-content-between mb-3 ml-2">
        
        <Button
          variant="outlined"
          color="primary"
          style={{
            color: "#5AAFE3",
            height: "2.25rem",
            width: "6rem",
          }}
        >
         { <NavLink to={selectedKPILink?selectedKPILink:GATEWAYBASED?CONTEXT + selectedUsecaselink:"/"}>
          CANCEL
          </NavLink>}
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          style={{
            height: "2.25rem",
            width: "11rem",
            // marginLeft: "80rem",
            // marginRight: "-1.5rem",
            backgroundColor: "#3F88C5",
          }}
          onClick={props.acceptNewAnalysis}
        >
          Choose Settings
        </Button>
      </MDBModalFooter>
    </MDBModal>
}
</AppContext.Consumer>

  );
};

export default CreateAnalysisModal;
