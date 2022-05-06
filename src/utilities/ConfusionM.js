/** configtabs/Hypertension/ModelSummaryPatient */
import React from "react";

const ConfusionMatrix = (props) => {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center", marginTop: "3.5rem" }}>Predicted</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7% 93%",
          gridTemplateRows: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
          }}
        >
          Actual
        </div>
        <div className="row-2-col-2">
          <div />
          <button className="segment-header-button segment-data23 no-border">
            <p className="segment-p">0</p>
          </button>
          <button className="segment-header-button segment-data23 no-border">
            <p className="segment-p">1</p>
          </button>

          <div className="segment-row segment-data23">
            <p className="segment-q">0</p>
          </div>
          <button className="segment-button segment-data11 no-border">
            <p className="segment-p">
              {props.confusionmatrix ? (
                props.confusionmatrix[0].negative
              ) : (
                <span>...</span>
              )}
            </p>
          </button>

          <button className="segment-button segment-data11 no-border">
            <p className="segment-p">
              {props.confusionmatrix ? (
                props.confusionmatrix[0].positive
              ) : (
                <span>...</span>
              )}
            </p>
          </button>

          <div className="segment-row segment-data23">
            <p className="segment-q">1</p>
          </div>
          <button className="segment-button segment-data21 no-border">
            <p className="segment-p">
              {props.confusionmatrix ? (
                props.confusionmatrix[1].negative
              ) : (
                <span>...</span>
              )}
            </p>
          </button>

          <button className="segment-button segment-data21 no-border">
            <p className="segment-p">
              {props.confusionmatrix ? (
                props.confusionmatrix[1].positive
              ) : (
                <span>...</span>
              )}
            </p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfusionMatrix;
