import React, { Component } from "react";
import { Layout, Button, Popconfirm, message } from "antd";
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

import Loader from "../../../utilities/Loader";
import PageTitle from "../../../utilities/PageTitle";
import MuiTable from "../../../utilities/MuiTable";
import AddDataPipeline from "./AddDataPipeline";
import { PYTHON_API_ROOT, CONTEXT } from "../../../config";

const { Content } = Layout;

class DataQualityPipeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pipelines: null,
      apiResponse: {
        pipelines: null,
        dataQualityReport: false,
        processedRecords: false,
      },
      currentSelected: `pipelines`, // pipelines, new, processedRecords
      nodeList: [],

      isLoading: false,
    };
  }

  uniqId = () => `${+new Date()}`;

  componentDidMount() {
    this.getPipelines();
    this.nodeList();
  }

  getPipelines = async () => {
    this.setState({
      apiResponse: { ...this.state.apiResponse, pipelines: null },
    });
    let url = PYTHON_API_ROOT + `listTransformationFiles/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        console.log("PIPELINE RESPONSE")
        if (result.data.code === 200) {
          this.setState({
            apiResponse: { ...this.state.apiResponse, pipelines: 200 },
            pipelines:
              result.data.response.length > 0 ? result.data.response : null,
          });
        } else {
          this.setState({
            apiResponse: { ...this.state.apiResponse, pipelines: 400 },
          });
        }
      })
      .catch((err) => {
        console.error("dqEntitylistError..#", err);
        this.setState({
          apiResponse: { ...this.state.apiResponse, pipelines: 400 },
        });
      });
  };

  nodeList = () => {
    const url = CONTEXT + `/dqp/properties.json`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        console.log("nodeList", result);
        if (result.data.code === 200) {
          this.setState({
            nodeList:
              result.data.response.length > 0 ? result.data.response : null,
          });
        }
      })
      .catch((err) => {
        console.error("dqnodeList..#", err);
      });
  };

  setCurrentSelected = (page) => {
    this.setState({ currentSelected: page });
  };

  handleDelete = () => {
    console.log("handleDelete");
  };

  tableHeader = () => {
    return [
      {
        field: "pipeline",
        headerName: "Pipeline",
        flex: 1.2,
        renderCell: (params) => (
          <a className="text-primary">{params.row.pipeline}</a>
        ),
      },
      {
        field: "id",
        flex: 0.5,
        headerName: "Action",
        filterable: false,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const pipelineName = params.row.pipeline;
          return (
            <>
              <span title="Edit Pipeline">
                <a>
                  <EditTwoTone style={{ fontSize: "1.2rem" }} />
                </a>
              </span>
              <Popconfirm
                overlayClassName="pop-padding"
                title="Sure to delete?"
                onConfirm={() => {
                  this.handleDelete(pipelineName);
                }}
              >
                <a title="Delete Entity">
                  <DeleteOutlined
                    style={{
                      paddingLeft: "0.3rem",
                      fontSize: "1.2rem",
                      color: "#dc3545",
                    }}
                  />
                </a>
              </Popconfirm>
            </>
          );
        },
      },
      {
        field: "computeEngine",
        headerName: "Compute Engine",
        flex: 1,
      },
      {
        field: "frequency",
        headerName: "Frequency",
        flex: 1,
      },
      {
        field: "lastExecuted",
        headerName: "Last Executed",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
      }
    ];
  };

  handleSaveFlow = async (bodyFormData) => {
    console.log("bodyFormData121", bodyFormData);

    const url = PYTHON_API_ROOT + `dqAddTransformationDetails/${this.props.token}`;
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        console.log("handleSaveFlow", result.data.response);
        message.success('Data Pipeline saved successfully.');
      })
      .catch((err) => {
        message.error('Some error has occur.');
        console.error("handleSaveFlow..#", err);
      });
  };

  render() {
    //console.log("propsIndex121", this.props);
    return (
      <>
        {this.state.currentSelected === "pipelines" ? (
          <>
            <PageTitle
              title={"Data Pipeline"}
              marginLeft="1.5rem"
              extra={
                <>
                  <Button
                    className="float-right mt-4 mr-4 blue-bg"
                    type="primary"
                    onClick={() => {
                      this.setState((state) => ({
                        currentSelected: "new",
                        currentEntityId: null,
                      }));
                    }}
                  >
                    <i className="fa fa-plus"></i>&nbsp;Add New Pipeline
                  </Button>
                  <Button
                    className="float-right mt-4 mr-2"
                    onClick={() => {
                      this.getPipelines();
                    }}
                    title="Refresh"
                  >
                    <i className="fa fa-refresh"></i>
                  </Button>
                </>
              }
            />
            <Content style={{ padding: "4px 24px", minHeight: 280 }}>
              {this.state.apiResponse.pipelines ? (
                <>
                  <MuiTable
                    columns={this.tableHeader()}
                    rows={this.state.pipelines}
                    sortModel={[
                      {
                        field: "pipeline",
                        sort: "asc",
                      },
                    ]}
                  />
                </>
              ) : (
                <Loader style={{ marginLeft: "40%" }} />
              )}
            </Content>
          </>
        ) : (
          <>
            <AddDataPipeline
              nodeList={this.state.nodeList}
              setCurrentSelected={this.setCurrentSelected}
              handleSaveFlow={this.handleSaveFlow}
              uniqId={this.uniqId}
              token={this.props.token} 
            />
          </>
        )}
      </>
    );
  }
}
export default DataQualityPipeline;
