import React from "react";
import axios from "axios";
import "chart.js";
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

import ApexBSChart from "../../../../utilities/ApexBSChart";
import ApexLineChart from "../../../../utilities/ApexLine";
import Loader from "../../../../utilities/Loader";
import { chartFormatPercent } from "../../../../utilities/commonfunctions";
import { CONTEXT } from "../../../../config";

class DemoInsights extends React.Component {
  constructor() {
    super();
    this.state = {
      GenderGroupDemo: null,
      StateWiseDemo: null,
      GenderAdhDemo: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/modeldata/`;
    this.getInsightGenderGroupDemo(url);
    this.getInsightStateWiseDemo(url);
    this.getInsightGenderAdhDemo(url);
  }

  getInsightGenderGroupDemo = async (selectedUrl) => {
    let url = selectedUrl + "demoinsights/Chart-1_Gender_groups.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      this.setState({ GenderGroupDemo: values.data });
    });
  };
  getInsightStateWiseDemo = async (selectedUrl) => {
    let StateWise = await axios({
      method: "get",
      url: selectedUrl + "demoinsights/Chart-2_state_wise_gender.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ StateWiseDemo: StateWise.data });
  };

  getInsightGenderAdhDemo = async (selectedUrl) => {
    let GenderAdh = await axios({
      method: "get",
      url: selectedUrl + "demoinsights/Chart-4__gender_Adherence_perc.json",
      data: {
        id: "1234",
      },
    });
    this.setState({ GenderAdhDemo: GenderAdh.data });
  };

  render() {
    const series = [
        {
          name: "",
          data: [36, 32, 27, 24, 18],
        },
      ],
      categories = ["TX", "NY", "LA", "FL", "CA"];
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-2 mt-4 ml-3">
          <MDBRow>
            <MDBCardGroup deck className="mt-1">
              <MDBCard style={{ width: "32rem" }}>
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk Profile across Patient Gender
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.GenderGroupDemo ? (
                      <ApexBSChart
                        categories={this.state.GenderGroupDemo.categories}
                        series={this.state.GenderGroupDemo.modeldata}
                      />
                    ) : (
                      <Loader />
                    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              <MDBCard style={{ width: "32rem" }} className="ml-1">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk Profile across multiple age groups
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.StateWiseDemo ? (
                      <ApexBSChart
                        categories={this.state.StateWiseDemo.categories}
                        series={this.state.StateWiseDemo.modeldata}
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
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Top 5 High Risk states
                  </MDBCardTitle>

                  <div style={{ width: "95%", paddingLeft: "3rem" }}>
                    <ApexLineChart
                      series={series}
                      categories={categories}
                      xTitle="states"
                      dataLabels="true"
                      yaxisF="2"
                      formatter={chartFormatPercent}
                      tooltipCustom="true"
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard style={{ width: "32rem" }} className="ml-1">
                <MDBCardBody className="pl-1 pr-1">
                  <MDBCardTitle
                    tag="h5"
                    style={{ color: "black" }}
                    className="text-center "
                  >
                    Risk Profile for Co-Morbidity Conditions
                  </MDBCardTitle>
                  <MDBCardText className="text-center">
                    {this.state.GenderAdhDemo ? (
                      <ApexBSChart
                        series={this.state.GenderAdhDemo.modeldata}
                        categories={this.state.GenderAdhDemo.categories}
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
export default DemoInsights;
