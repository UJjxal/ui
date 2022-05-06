import React from "react";
import axios from "axios";
import { API_ROOT } from "../../../config";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdbreact";
import Loader from "../../../utilities/Loader";
import TreeChart from "../../../utilities/TreeChart";
import "antd/dist/antd.css";

const legend = [
  { color: "green", label: "Low Risk" },
  { color: "amber", label: "Medium Risk" },
  { color: "red", label: "High Risk" },
];

class SelfCureKpi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kpiTreeApi: null,
      code: null,
    };
  }

  componentDidMount() {
    this.getTreeDataByApi();
  }

  getTreeDataByApi = async () => {
    let url =
      API_ROOT + "kpiTree/" + this.props.treeId + "/";
    axios({
      method: "get",
      url: url,
      data: {
        tree_id: "1",
      },
      headers: { Authorization: `Bearer ${this.props.token}`, "Access-Control-Allow-Origin": "*", }
    }).then((result) => {
      if (result.data.code === 200) {
        this.setState({
          kpiTreeApi: result.data.response,
          code: 200,
        });
      } else {
        this.setState({
          code: result.data.code,
        });
        this.props.setAPICallErrors(result.data.message);
      }
    });
  };

  render() {
    return (
      <MDBContainer fluid className="mt-4">
        <MDBRow>
          <MDBCol>
            <MDBCard style={{}} className="">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center mt-3"
              >
                KPI Tree Framework to identify opportunities to improve
                operational efficiency
              </MDBCardTitle>
              <MDBCardText>
              {this.state.code ? (
                  this.state.kpiTreeApi.length>0 ? (
                    <TreeChart
                      treeData={this.state.kpiTreeApi}
                      legend={legend}
                    />
                  ) : null
                ) : (
                
                  <Loader
                    style={{ marginLeft: "30rem", marginBottom: "1rem" }}
                  />
                )}
              </MDBCardText>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default SelfCureKpi;
