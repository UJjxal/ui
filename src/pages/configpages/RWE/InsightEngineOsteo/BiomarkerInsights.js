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

import ApexBSChart from "../../../../utilities/ApexBSChart";
import Loader from "../../../../utilities/Loader";
import { CONTEXT } from "../../../../config";

class BehaveInsights extends React.Component {
  constructor() {
    super();
    this.state = {
      AgeOsteoHist: null,
      GenderOsteoHist: null,
      ParentOsteoHist: null,
      HipFractureHist: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/modelosteodata/`;
    this.getAgeOsteoHist(url);
    this.getGenderOsteoHist(url);
    this.getParentOsteoHist(url);
    this.getHipFractureHist(url);
  }

  getAgeOsteoHist = async (selectedUrl) => {
    let url = selectedUrl + "biomarkerinsights/AgeOsteoHist.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      this.setState({ AgeOsteoHist: values.data });
    });
  };

  getGenderOsteoHist = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/GenderOsteoHist.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ GenderOsteoHist: values.data });
  };

  getParentOsteoHist = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/ParentOsteoHist.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ ParentOsteoHist: values.data });
  };

  getHipFractureHist = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/HipFractureHist.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ HipFractureHist: values.data });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCardGroup deck className="mt-1">
              <MDBCard style={{ width: "32rem" }}>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Age
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AgeOsteoHist ? (
                      <ApexBSChart
                        categories={this.state.AgeOsteoHist.categories}
                        series={this.state.AgeOsteoHist.modeldata}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

              <MDBCard style={{ width: "32rem" }} className="ml-3">
                <MDBCardBody className="pl-2 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Gender
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.GenderOsteoHist ? (
                      <ApexBSChart
                        series={this.state.GenderOsteoHist.modeldata}
                        categories={this.state.GenderOsteoHist.categories}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCardGroup>
          </MDBRow>

          <MDBRow>
            <MDBCardGroup deck className="mt-3">
              <MDBCard style={{ width: "32rem" }} className="">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Parent's Osteoporosis History
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.ParentOsteoHist ? (
                      <ApexBSChart
                        categories={this.state.ParentOsteoHist.categories}
                        series={this.state.ParentOsteoHist.modeldata}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              <MDBCard style={{ width: "32rem" }}>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Hip Fracture History
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.HipFractureHist ? (
                      <ApexBSChart
                        categories={this.state.HipFractureHist.categories}
                        series={this.state.HipFractureHist.modeldata}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCardGroup>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default BehaveInsights;
