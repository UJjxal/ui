import React from "react";
import axios from "axios";
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
    const url = `${CONTEXT}/hypertension/`;
    this.getModelOverview(url);
    this.getConfusionMatrix(url);
  }

  getModelOverview = (selectedUrl = null) => {
    // let url = "/therapydata/modeldataoverview.json";
    let url = selectedUrl + "modeldataoverview.json";
    // console.log("selected Url:", selectedUrl);
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      // console.log("model overview",res.data);
      this.setState({ modelOverview: res.data });
    });
  };

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
      // console.log("confusion matrix", values.data.rows);
      this.setState({ confusionmatrix });
    });
  };

  render() {
    return (
      <AppContext.Consumer>
        {({ modelOverview, confusionmatrix }) => {
          console.log("modelOverview121", modelOverview);
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
                              data: this.state.modelOverview["Model Data"]}]}  categories={ ["No Hypertension", "Hypertension"]}/>*/}

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
                        <ConfusionM
                          confusionmatrix={this.state.confusionmatrix}
                        />
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
  }
}
export default ModelSummary;
