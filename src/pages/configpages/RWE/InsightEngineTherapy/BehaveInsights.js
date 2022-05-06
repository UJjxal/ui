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
// import ApexBarPercEdaInsight from '../../utilities/ApexBarPercEdaInsight';

import ApexBSChart from "../../../../utilities/ApexBSChart";
import Loader from "../../../../utilities/Loader";
import { CONTEXT } from "../../../../config";

class BehaveInsights extends React.Component {
  constructor() {
    super();
    this.state = {
      MonMedRP: null,
      AvgMonCostRP: null,
      MultiDrugRP: null,
      ObsPerAdhRP: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/modeldata/`;
    this.getMonMedRP(url);
    this.getAvgMonCostRP(url);
    this.getMultiDrugRP(url);
    this.getObsPerAdhRP(url);
  }

  getMonMedRP = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "behaveinsights/RP_MonMed.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ MonMedRP: values.data });
  };

  getAvgMonCostRP = async (selectedUrl) => {
    let url = selectedUrl + "behaveinsights/RP_AvgMonCost.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      this.setState({ AvgMonCostRP: values.data });
    });
  };

  getMultiDrugRP = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "behaveinsights/RP_MultiDrug.json",
      data: {
        id: "1234",
      },
    });
    // console.log("zerogroup", ZeroGroup.data);
    this.setState({ MultiDrugRP: values.data });
  };

  getObsPerAdhRP = async (selectedUrl) => {
    let values = await axios({
      method: "get",
      url: selectedUrl + "behaveinsights/RP_ObsPerAdh.json",
      data: {
        id: "1234",
      },
    });
    // console.log("Gender Adh data", GenderAdh.data);
    this.setState({ ObsPerAdhRP: values.data });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCardGroup deck className="mt-1">
              <MDBCard style={{ width: "32rem" }} className="">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk profile across Monthly Medication Gap
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.MonMedRP ? (
                      <ApexBSChart
                        categories={this.state.MonMedRP.categories}
                        series={this.state.MonMedRP.modeldata}
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
                    Risk Profile across Pre-Period Adherence
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.ObsPerAdhRP ? (
                      <ApexBSChart
                        categories={this.state.ObsPerAdhRP.categories}
                        series={this.state.ObsPerAdhRP.modeldata}
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
              <MDBCard style={{ width: "32rem" }} className="ml-3">
                <MDBCardBody className="pl-2 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk Profile across Patients with multiple drug therapy
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.MultiDrugRP ? (
                      <ApexBSChart
                        series={this.state.MultiDrugRP.modeldata}
                        categories={this.state.MultiDrugRP.categories}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              <MDBCard style={{ width: "32rem" }} className="ml-1.5">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h6"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk Profile across Average Monthly Rx Cost
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.AvgMonCostRP ? (
                      <ApexBSChart
                        categories={this.state.AvgMonCostRP.categories}
                        series={this.state.AvgMonCostRP.modeldata}
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
