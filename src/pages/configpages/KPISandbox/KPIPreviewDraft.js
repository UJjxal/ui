import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import KPISampleTree from "./KPISampleTree";

import { MDBCol, MDBModal, MDBModalBody, MDBRow, MDBIcon } from "mdbreact";

const Test = (props) => {
  let history = useHistory();
  return (
    <MDBModal
      isOpen={props.previewModal}
      toggle={props.togglePreviewModal}
      className="cascading-modal my-5 px-5 "
      size="fluid"
      style={{ width: "85% !important", top: "0px !important" }}
    >
      <MDBModalBody className="table-responsive">
        <MDBRow className="ml-4 mt-2">
          <MDBCol className="d-flex flex-column">
            <h2>Preview Mode</h2>

            <div style={{ fontSize: "1rem" }}>
              Are you ready to request a review of your Analysis or to publish
              the analysis?
            </div>
            <div style={{ fontSize: "1rem" }}>
              {" "}
              Once your analysis is published, you can still make edits to it
            </div>
          </MDBCol>
          <MDBCol className="d-flex flex-row justify-content-end align-items-start">
            <MDBIcon
              onClick={props.togglePreviewModal}
              style={{ fontSize: "1rem", cursor: "pointer" }}
              icon="times"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2 mb-4">
          <MDBCol className="d-flex justify-content-center align-items-center">
            <Button
              className="mr-2"
              variant="outlined"
              color="primary"
              style={{ cursor: "pointer" }}
              onClick={props.togglePreviewModal}
            >
              Edit Analysis
            </Button>

            <Button
              type="primary"
              style={{
                background: "#3F88C5",
                color: "#ffffff",
                borderRadius: "4px",
              }}
              onClick={async () => {
                await props.saveData(props.setKPITreeData, "Published");
                history.goBack(1);
              }}
            >
              Publish Analysis
            </Button>
          </MDBCol>
        </MDBRow>

        <MDBRow
          style={{ borderColor: "#676767" }}
          className="ml-4 mr-4 p-4 border-top border-right border-left"
        >
          <MDBCol className="d-flex flex-column mt-4">
            <h2 style={{ color: "#1E4564" }}>{props.analysisName}</h2>
            <h6>{props.analysisGoal}</h6>
          </MDBCol>
        </MDBRow>
        <MDBRow
          style={{ borderColor: "#676767" }}
          className="ml-4 mr-4 border-right border-left border-bottom"
        >
          <KPISampleTree
            sampleTree={props.sampleTree}
            colorThreshold={props.colorThreshold}
          />
        </MDBRow>
      </MDBModalBody>
    </MDBModal>
  );
};

export default Test;
