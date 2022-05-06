import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import axios from "axios";
import ApexBSChart from "../../../../utilities/ApexBSChart";
import Loader from "../../../../utilities/Loader";
import { CONTEXT } from "../../../../config";

class BehaveInsights extends React.Component {
  constructor() {
    super();
    this.state = {
      AlbToCrt: null,
      AlbInUri: null,
      HemToCrt: null,
      CrtInUri: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/modelpatientdata/`;
    this.getAlbToCrt(url);
    this.getHemToCrt(url);
    this.getAlbInUri(url);
    this.getCrtInUri(url);
  }

  getAlbToCrt = async (selectedUrl) => {
    let url = selectedUrl + "biomarkerinsights/PHA_AlbToCrt.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      this.setState({ AlbToCrt: values.data });
    });
  };

  getHemToCrt = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/PHA_HemToCrt.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ HemToCrt: values.data });
  };

  getAlbInUri = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/PHA_AlbInUri.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ AlbInUri: values.data });
  };

  getCrtInUri = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "biomarkerinsights/PHA_CrtInUri.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ CrtInUri: values.data });
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
                    Albumin To Creatinine Ratio
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AlbToCrt ? (
                      <ApexBSChart
                        categories={this.state.AlbToCrt.categories}
                        series={this.state.AlbToCrt.modeldata}
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
                    Hematocrit
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.HemToCrt ? (
                      <ApexBSChart
                        series={this.state.HemToCrt.modeldata}
                        categories={this.state.HemToCrt.categories}
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
                    Urine Albumin (mg/L)
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AlbInUri ? (
                      <ApexBSChart
                        categories={this.state.AlbInUri.categories}
                        series={this.state.AlbInUri.modeldata}
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
                    Urine Creatinine (Mg/dL)
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.CrtInUri ? (
                      <ApexBSChart
                        categories={this.state.CrtInUri.categories}
                        series={this.state.CrtInUri.modeldata}
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
