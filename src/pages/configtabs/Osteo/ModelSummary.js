import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import ModelChart from "../../../utilities/ReBarChart";
import Loader from "../../../utilities/Loader";
import ConfusionM from "../../../utilities/ConfusionM";
import { CONTEXT } from "../../../config";

class ModelSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      modelOverview: null,
      confusionmatrix: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/osteoporosisriskindicators/`;
    this.getModelOverview(url);
    this.getConfusionMatrix(url);
  }

  getModelOverview = (selectedUrl = null) => {
    let url = selectedUrl + "modeldataoverview.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      this.setState({ modelOverview: res.data });
    });
  };

  getConfusionMatrix = (selectedUrl = null) => {
    let url = selectedUrl + "confusionmatrix.json";
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

  render() {
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
                  {this.state.modelOverview ? (
                    <React.Fragment>
                      {/* <OverviewChart series={[{name: 'Model Data',
                data: modelOverview["Model Data"]}]}  categories= {["No Osteoporosis History", "Osteoporosis History"]}/> */}
                      <ModelChart
                        data={this.state.modelOverview["Model Data"]}
                        footerData={this.state.modelOverview.metrics}
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
                  <ConfusionM confusionmatrix={this.state.confusionmatrix} />
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default ModelSummary;
