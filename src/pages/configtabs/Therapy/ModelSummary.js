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
  MDBCardFooter,
} from "mdbreact";

import Loader from "../../../utilities/Loader";
import MDBTable from "../../../utilities/MDBTable";
import ModelChart from "../../../utilities/ReBarChart";
import ROCChart from "../../../utilities/ApexScatterROCChart";
import EventBarChart from "../../../utilities/ApexBarModelEventPatient";
import { CONTEXT } from "../../../config";

class ModelSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      ModelStatROCValues: [],
      modelTable: [],
      performanceTable: [],
      modelOverview: null,
    };
  }

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

  getModelTable = (selectedUrl = null) => {
    // let url = "/therapydata/modeltable.json";
    let url = selectedUrl + "modeltable.json";
    // console.log("selected Url:", selectedUrl);
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      // console.log("model table",res.data);
      this.setState({ modelTable: res.data });
    });
  };

  getPerformanceTable = (selectedUrl = null) => {
    // let url = "/therapydata/performancetable.json";
    let url = selectedUrl + "performancetable.json";
    // console.log("selected Url:", selectedUrl);
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      // console.log("performance table",res.data);
      this.setState({ performanceTable: res.data });
    });
  };

  getModelOverview = (selectedUrl = null) => {
    // let url = "/therapydata/modeldataoverview.json";
    let url = selectedUrl + "modeldataoverview(1).json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      console.log("model overview123", res.data);
      let modelOverview= {
      data:[
        {
          data: res.data[0].values,
        }
      ],
      categories: res.data[0].categories
    }
      this.setState({ modelOverview});
    });
  };

  componentDidMount() {
    const url = `${CONTEXT}/therapynonadherenceprediction/`;
    this.getModelOverview(url);
    this.getModelStatROCValues(url);
    this.getModelTable(url);
    this.getPerformanceTable(url);
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
    return (
      <MDBContainer fluid flexCenter>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90% auto",
            alignItems: "right",
          }}
        >
          <div></div>
          <div>
            <img
              alt="download file"
              src={`${CONTEXT}/word-grey.png`}
              style={{
                height: "1.2rem",
                width: "1.2rem",
                backgroundColor: "white",
                marginRight: "1rem",
              }}
            />
            <img
              alt="download code"
              src={`${CONTEXT}/code-grey.png`}
              style={{ height: "1.2rem", width: "1.2rem" }}
            />
          </div>
        </div>

        <MDBCardGroup deck className="mt-1">
          <MDBCard style={{ width: "66.8rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1 pb-0 pt-0 text-center">
              <MDBCardText>
                {this.state.modelTable ? (
                  <MDBTable
                    columns={this.state.modelTable.columns}
                    rows={this.state.modelTable.rows}
                  />
                ) : (
                  <Loader style={{ marginTop: "0" }} />
                )}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>

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
                      {/* <ModelChart
                        data={this.state.modelOverview.data}
                        footerData={this.state.modelOverview.metrics}
                      /> */}
                      <EventBarChart
                        series={this.state.modelOverview.data}
                        categories={this.state.modelOverview.categories}
                        footer={"Sample Size=962    Event Rate=14.9%"}
                      />
                    </React.Fragment>
                  ) : (
                    <Loader />
                  )}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBCard style={{ width: "32.5rem" }}>
              <MDBCardBody className="pb-1 pl-2">
                <MDBCardTitle
                  tag="h5"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Performance Stats
                </MDBCardTitle>
                <MDBCardText>
                  <MDBRow>
                    <MDBCard style={{ width: "15rem" }}>
                      <MDBCardText className="text-center">
                        {this.state.performanceTable ? (
                          <MDBTable
                            columns={this.state.performanceTable.columns}
                            rows={this.state.performanceTable.rows}
                            className="condensed-table text-center"
                          />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCard>

                    <MDBCard style={{ width: "15rem" }}>
                      <MDBCardText>
                        {this.state.ModelStatROCValues ? (
                          <ROCChart series={series} />
                        ) : (
                          <Loader />
                        )}
                      </MDBCardText>
                    </MDBCard>
                  </MDBRow>
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
