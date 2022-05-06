import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import Loader from "../../../utilities/Loader";
import ConfusionM from "../../../utilities/ConfusionM";
import PredictedChart from "../../../utilities/ApexLinePredictedChart";
import ScatterChart from "../../../utilities/ApexScatterROCChart";
import { CONTEXT } from "../../../config";

class ModelStats extends React.Component {
  constructor() {
    super();
    this.state = {
      confusionmatrix: null,
      ModelStatROCValues: [],
      actualValues: [],
      predictedValues: [],
    };
  }

  getConfusionMatrix = (selectedUrl = null) => {
    let url = selectedUrl + "confusionmatrix.json";
    // let url = "./therapydata/confusionmatrix.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      let confusionmatrix = values.data.rows;
      this.setState({ confusionmatrix });
    });
  };

  getModelStatROCValues = (selectedUrl = null) => {
    //  let url = "/therapydata/auc_roc_data.json";
    let url = selectedUrl + "auc_roc_data.json";

    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((ROCValues) => {
      // console.log("now recieved",ROCValues.data );
      // ROCValues = ROCValues.data.split(" ").map(el=>parseFloat(el);
      ROCValues = ROCValues.data[0].value;
      this.setState({ ModelStatROCValues: ROCValues });
    });
  };

  getActualPredicted = (selectedUrl = null) => {
    // let url = "/modeldata/predictedactual.json";
    let url = selectedUrl + "predictedactual.json";
    axios({
      method: "get",
      url: url,

      data: {
        id: "1234",
      },
    }).then((values) => {
      // console.log('actual data:', values.data);
      let actualValues = [];
      let predictedValues = [];

      values.data.forEach((row) => {
        if (row.type == "actual") {
          actualValues = row.values.map((el) => el.toFixed(2));
        } else {
          predictedValues = row.values.map((el) => el.toFixed(2));
        }
      });

      this.setState({ actualValues, predictedValues });
    });
  };

  componentDidMount() {
    const url = `${CONTEXT}/therapynonadherenceprediction/`;
    this.getConfusionMatrix(url);
    this.getModelStatROCValues(url);
    this.getActualPredicted(url);
  }

  render() {
    let series = [
      {
        name: "Random",
        data: [
          [0, 0],
          [1, 1],
        ],
      },
      {
        name: "Model",
        data: this.state.ModelStatROCValues,
      },
    ];

    let actualPredictedSeries = [
      {
        name: "Actual",
        data: this.state.actualValues,
      },
      {
        name: "Predicted",
        data: this.state.predictedValues,
      },
    ];

    return (
      <MDBContainer fluid flexCenter className="mb-2 mt-4">
        <MDBRow>
          <MDBCardGroup deck className="mt-1">
            <MDBCard style={{ width: "24rem" }} className="pl-1">
              <MDBCardBody className="pl-1 pr-1">
                <MDBCardTitle
                  tag="h5"
                  style={{ color: "black" }}
                  className="text-center "
                >
                  Confusion Matrix
                </MDBCardTitle>
                <MDBCardText>
                  {this.state.confusionmatrix ? (
                    <ConfusionM confusionmatrix={this.state.confusionmatrix} />
                  ) : (
                    <Loader />
                  )}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: "24rem" }}>
              <MDBCardBody className="pl-1 pr-1">
                <MDBCardTitle
                  tag="h5"
                  style={{ color: "black" }}
                  className="text-center"
                >
                  ROC Curve
                </MDBCardTitle>
                <MDBCardText></MDBCardText>
                {this.state.ModelStatROCValues ? (
                  <ScatterChart series={series} />
                ) : (
                  <Loader />
                )}
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: "24rem" }}>
              <MDBCardBody className="pl-1 pr-1">
                <MDBCardTitle
                  tag="h6"
                  style={{ color: "black", fontSize: "1.2rem" }}
                  className="text-center"
                >
                  Actual vs Predicted Error
                </MDBCardTitle>
                <MDBCardText></MDBCardText>
                {this.state.actualValues ? (
                  <PredictedChart series={actualPredictedSeries} />
                ) : (
                  <Loader />
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>

        <MDBRow>
          <MDBCardGroup deck className="mt-3">
            <MDBCard style={{ minWidth: "32.1rem", marginLeft: "1.3rem" }}>
              <MDBCardBody>
                <MDBCardText>
                  <h6 className="mt-10">
                    <strong>ROC Curve</strong>
                    <MDBIcon
                      icon="circle"
                      className="ml-2 green-text"
                      aria-hidden="true"
                    />
                  </h6>
                  <p>Area under Curve (AUC) – 0.81</p>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: "40rem" }}>
              <MDBCardBody>
                <MDBCardText>
                  <h6>
                    Rank Ordering
                    <MDBIcon
                      icon="circle"
                      className="mr-3 green-text"
                      style={{ float: "right" }}
                      aria-hidden="true"
                    />
                  </h6>
                  <p className="mt-3" style={{ fontSize: "1.2rem" }}>
                    No Rank Order Breaks
                  </p>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default ModelStats;
