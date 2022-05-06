import React from "react";
import axios from "axios";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdbreact";

import Loader from "../../../utilities/Loader";
import FeatureChart from "../../../utilities/ApexBarHorizontalChart";
import EventChart from "../../../utilities/ApexLineChart";
import EventBarChart from "../../../utilities/ApexBarModelEventPatient";

import "antd/dist/antd.css";

class FeatureImportance extends React.Component {
  constructor() {
    super();
    this.state = {
      featureDropdowns : null,
      selectedFeatureData : null,
        featureList : null,
        selectedFeatureChartType : null,
    };
  }

  componentDidMount() {
    this.getModelFeatureImportanceDrop("hypertensionriskindicators/");
    this.getModelFeatureList("hypertensionriskindicators/");
  }

  getModelFeatureImportanceDrop = async (selectedUrl = null) => {
    let url = selectedUrl + "featuredropdown.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((featureValues) => {
      //console.log("feature data123", url);
      this.setState({
        featureDropdowns: featureValues.data,
        selectedFeatureData: [
          {
            name: featureValues.data[0].feature,
            data: featureValues.data[0].values,
          },
        ],
        selectedFeatureChartType: featureValues.data[0].col_type,
      });
    });
  };

  getModelFeatureList = (selectedUrl = null) => {
    let url = selectedUrl + "featureslist (2).json";

    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      let featureList = values.data;
      console.log("Feature List", values);
      this.setState({ featureList, selectedFeatureList: featureList[0] });
    });
  };

  setFeatureData = (e) => {
    const { featureDropdowns } = this.state;
    this.setState({
      selectedFeatureData: [
        { name: featureDropdowns[e].feature, data: featureDropdowns[e].values },
      ],
      selectedFeatureChartType: featureDropdowns[e].col_type,
    });
  };

  render(){
    return (
      <MDBContainer fluid flexCenter className="mt-4">
        <MDBRow>
          <MDBCardGroup deck className="mt-1">
            <MDBCard style={{ width: "32.5rem" }} className="pl-1">
              <MDBCardBody className="pl-1 pr-1">
                <MDBCardTitle
                  tag="h5"
                  style={{ color: "black" }}
                  className="text-center "
                >
                  Significant Feature List
                </MDBCardTitle>
                <MDBCardText className="text-center">
                  {this.state.featureList ? (
                    <FeatureChart
                      series={[
                        {
                          data: this.state.featureList.data,
                        },
                      ]}
                      categories={this.state.featureList.categories}
                    />
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
                  className="text-center"
                >
                  Relationship with Model Event
                </MDBCardTitle>
                <MDBCardText className="text-center">
                  {this.state.selectedFeatureData ? (
                    this.state.selectedFeatureChartType == "categorical" ? (
                      <EventBarChart
                        series={this.state.selectedFeatureData}
                        dropdown={this.state.featureDropdowns}
                        setFeatureData={this.setFeatureData}
                        yaxisF="1"
                      />
                    ) : (
                      <EventChart
                        series={this.state.selectedFeatureData}
                        yaxisF="2"
                        yTitle="Event Rate"
                        xTitle="Feature Deciles"
                        dropdown={this.state.featureDropdowns}
                        setFeatureData={this.setFeatureData}
                      />
                    )
                  ) : (
                    <Loader />
                  )}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>
      </MDBContainer>
    );
  }

  
};
export default FeatureImportance;
