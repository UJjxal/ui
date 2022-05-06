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
import TreeChart from "../../../utilities/TreeChart";
import { API_ROOT,CONTEXT } from "../../../config";

const featureChartDropdown = [
  { value: "All Variables", key: 0 },
  { value: "Laboratory and Dietary variables", key: 1 },
];

const legend = [
  { color: "green", label: "Low " },
  { color: "amber", label: "Medium " },
  { color: "red", label: "High " },
];

class FeatureImportance extends React.Component {
  constructor() {
    super();
    this.state = {
      featureDropdowns: null,
      selectedFeatureData: null,
      selectedFeatureChartType: null,
      featureList: null,
      selectedFeatureList: null,
      selectedFeatureTree: null,
      withObvTree: null,
      withoutObvTree: null,
      selectedFeatureTreeApi: null,
    };
  }

  componentDidMount() {
    const url = `${CONTEXT}/hypertension/`;//therapynonadherenceprediction/
    this.getModelFeatureImportanceDrop(url);
    this.getModelFeatureList(url);
    this.getFeatureTreeData1(url);
    this.getFeatureTreeData2(url);
    //this.getTreeDataByApi();
  }

  getModelFeatureImportanceDrop = async (selectedUrl = null) => {
    let url = selectedUrl + "featuredropdown.json";
    axios({
      method: "get",
      // url: 'https://incedocxresource.s3.ap-south-1.amazonaws.com/Growth+Engine/Cross+Sell+Framework/Credit+Card/mdlxscc2410/July+2019/Model+1/featuredropdown.json',
      url: url,
      data: {
        id: "1234",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((featureValues) => {
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

  setFeatureData = (e) => {
    const { featureDropdowns } = this.state;
    this.setState({
      selectedFeatureData: [
        { name: featureDropdowns[e].feature, data: featureDropdowns[e].values },
      ],
      selectedFeatureChartType: featureDropdowns[e].col_type,
    });
  };

  getModelFeatureList = (selectedUrl = null) => {
    // let url = "/modeldata/featureslist.json";
    let url = selectedUrl + "featureslist.json";

    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((values) => {
      let featureList = values.data;
      this.setState({ featureList, selectedFeatureList: featureList[0] });
    });
  };

  setFeatureList = (e) => {
    const { featureList, withObvTree, withoutObvTree } = this.state;

    if (e === 0) {
      this.setState({
        selectedFeatureTree: withObvTree,
        selectedFeatureList: featureList[e],
      });
    } else {
      this.setState({
        selectedFeatureTree: withoutObvTree,
        selectedFeatureList: featureList[e],
      });
    }
  };

  getFeatureTreeData1 = async (selectedUrl) => {
    let url = selectedUrl + "withobvtree.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((values) => {
      this.setState({
        withObvTree: values.data,
        selectedFeatureTree: values.data,
      });
    });
  };
  getFeatureTreeData2 = async (selectedUrl) => {
    let url = selectedUrl + "withoutobvtree.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((values) => {
      this.setState({ withoutObvTree: values.data });
    });
  };

  getTreeDataByApi = async () => {
    let url = API_ROOT + "rca/kpiTree";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      this.setState({
        selectedFeatureTreeApi: result.data.response,
      });
    });
  };

  render() {
    console.log("state121", this.state);
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
                  {this.state.selectedFeatureList ? (
                    <FeatureChart
                      dropdownOption={featureChartDropdown}
                      setFeatureList={this.setFeatureList}
                      series={[{ data: this.state.selectedFeatureList.data }]}
                      categories={this.state.selectedFeatureList.categories}
                    />
                  ) : (
                    <Loader />
                  )}
                  <h6 className="text-center">%Contribution</h6>
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
                  Feature Distribution
                </MDBCardTitle>

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
                ) : null}
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>
        <MDBRow>
          <MDBCardGroup deck className="mt-3">
            <MDBCard style={{ width: "67rem" }} className="pl-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center mt-3"
              >
                Decision Tree
              </MDBCardTitle>
              <MDBCardText>
                {/* {this.state.selectedFeatureTreeApi ? (
                  <TreeChart
                    treeData={this.state.selectedFeatureTreeApi}
                    legend={legend}
                  />
                ) : null} */}
                {this.state.selectedFeatureTree ? (
                  <TreeChart treeData={this.state.selectedFeatureTree} />
                ) : null}
              </MDBCardText>
            </MDBCard>
          </MDBCardGroup>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default FeatureImportance;
