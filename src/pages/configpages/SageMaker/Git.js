import React, { Component } from "react";
import { Layout } from "antd";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

import TableData from "../../../utilities/Table";
import Loader from "../../../utilities/Loader";

const { Content } = Layout;

class GitRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: 200,
      repoList: null,
      instanceList:null
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    this.setState({
      repoList: [
        {
          key: 1,
          name: "amit.maan-firstNotebook",
          status: "Pending",
          url: "https://github.com/ITSL-Engg/IDSP-IncedoDataSciencePlatform.git",
          creation: "Sept 14, 2020 11:56 UTC",
        },
      ],
      instanceList: [
        {
          key: 1,
          name: "amit.maan-firstNotebook",
          status: "Pending",
          instance: "ml.mt.medium",
          creation: "Sept 14, 2020 11:56 UTC",
        },
      ],
    });
    console.log("git list");
    // let url = "./mrm/data13.json";

    // axios({
    //   method: "get",
    //   url: url,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // }).then((result) => {
    //   console.log("result...", result);
    //   if (result.data.code === 200) {
    //     this.setState({
    //       apiResponse: 200,
    //       invModels: result.data.response,
    //       modelsList: result.data.response,
    //     });
    //   } else {
    //     this.setState({
    //       apiResponse: 400,
    //     });
    //     this.props.setAPICallErrors(result.data.message);
    //   }
    // }).catch((err) =>{
    //   console.error("error1212", err);
    //   this.setState({
    //     apiResponse: 400,
    //   });
    // });
  };

  tableHeader = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Instance",
        dataIndex: "instance",
        key: "instance",
      },
      {
        title: "Creation Time",
        dataIndex: "creation",
        key: "creation",
      },
    ];
  };
  
  tableRepoHeader = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url",
      },
      {
        title: "Creation Time",
        dataIndex: "creation",
        key: "creation",
      },
    ];
  }
  render() {
    console.log("check1212", this.state);
    return (
      <React.Fragment>
        {/* <PageTitle title={"Git repositories"} /> */}
        <Content style={{ minHeight: 280 }}>
          {this.state.apiResponse ? (
            <React.Fragment>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBCard>
                    <MDBCardBody className="pl-1 pr-1">
                      <MDBCardTitle tag="h5" style={{ color: "black" }}>
                        Git repositories
                      </MDBCardTitle>
                      <hr/>
                      <MDBCardText className="">
                      <TableData
                          className="pd10"
                          pagination="true"
                          column={this.tableRepoHeader()}
                          dataSource={this.state.repoList}
                          //scrollX="true"
                        />
                       
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBCard>
                    <MDBCardBody className="pl-1 pr-1">
                      <MDBCardTitle tag="h5" style={{ color: "black" }}>
                        Associated as default repository for notebook
                        instance(s)
                      </MDBCardTitle>
                      <MDBCardText className="">
                        <TableData
                          className="pd10"
                          pagination="true"
                          column={this.tableHeader()}
                          dataSource={this.state.instanceList}
                          //scrollX="true"
                        />
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </React.Fragment>
          ) : (
            <Loader style={{ marginLeft: "40%" }} />
          )}
        </Content>
      </React.Fragment>
    );
  }
}

export default GitRepository;
