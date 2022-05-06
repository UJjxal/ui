import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { AppContext } from '../../../AppProvider';
import "antd/dist/antd.css";
import {
  MDBBtn,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBIframe
} from "mdbreact";

const DeepAnalysisModal = (props) => {
  const font_style = {
    marginTop: "25px",
    fontSize: "16px",
    fontFamily: "Roboto",
    letterSpacing: "0.8px",
    lineHeight: "24px",
    textAlign: "left",
  };

  return (
    
    <MDBModal
      isOpen={props.deepAnalysisModal}
      className="cascading-modal my-5 px-5 "
      size="fluid"
      style={{ width: "100rem"}}
    >
      <MDBModalBody className="m-2">
      <button type="button" className="close text-dark mt-4" aria-label="Close" onClick={props.toggleDeepAnalysisModal}>
					<span aria-hidden="true">×</span>
				</button>
        <MDBRow className="mt-1">
          <MDBCol className="m-3">
            <h4 style={{ height: "2rem", color: "#1E4564" }}>
              Deep-Dive Analysis
            </h4>
            <MDBIframe src={props.deepAnalysisUrl} />
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
          onClick={props.toggleDeepAnalysisModal}
        >
        CANCEL
        </Button>
        
        </MDBModalFooter>
    </MDBModal>


  );
};

export default DeepAnalysisModal;
