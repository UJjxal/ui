import React, { Component } from "react";
import axios from "axios";
import { Layout } from "antd";
import { Row, Col, Card, Modal, Drawer } from "antd";

import PageTitle from "../../../../utilities/PageTitle";
import { API_ROOT, CONTEXT, STATICMRM } from "../../../../config";

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    Model_Id: "MDL_RISK_PERSONALES_001",
    Materiality: "red",
    Risk_Rating: "orange",
  },
  {
    key: "2",
    Model_Id: "MDL_RISK_PERSONALES_002",
    Materiality: "red",
    Risk_Rating: "orange",
  },
  {
    key: "3",
    Model_Id: "MDL_RISK_PERSONALES_003",
    Materiality: "red",
    Risk_Rating: "orange",
  },
  {
    key: "4",
    Model_Id: "MDL_RISK_PERSONALES_004",
    Materiality: "red",
    Risk_Rating: "orange",
  },
];

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      readMoreDrawer: { visible: false, title: null, comment: null },
      addFileModel: false,
      file: "",
      fileExt: "",
      apiData: [],
    };
  }

  componentDidMount() {
    const apiData = [
      {
        id: "1",
        fileName: "Risk Governance Playbook",
        filePath: "Risk_Governance_Playbook_Detailed.pdf",
        comments:
          "The document provides comprehensive guidance on effective model risk management policy across all aspects of model lifecycle.",
      },
      {
        id: "2",
        fileName: "MRM Checklist",
        filePath: "ModelRiskMonitoringChecklist.pdf",
        comments:
          "The checklist details the roles and responsibilities for effective Model Risk Monitoring policy across all aspects of model lifecycle.",
      },
      {
        id: "3",
        fileName: "Materiality Documentation",
        filePath: "BenchmarkValue.xlsx",
        comments:
          "The materiality documentation provides a detailed look into the calculation of the materiality across all models.",
      },
    ];

    if (STATICMRM) {
      this.setState({ apiData })
    } else {
      this.getListData();
    }
  }

  /** get all files detail by api*/
  getListData = () => {
    let api = API_ROOT + `getFileObjectDetails/${this.props.token}`;
    axios.get(api).then((res) => {
      console.log(res.data);
      this.setState({
        apiData: res.data.response,
      });
    });
  };

  handleAddFileModel = () => {
    this.setState({
      addFileModel: true,
    });
  };
  handleAddFileModelOk = () => {
    this.setState({
      addFileModel: false,
    });
  };
  handleAddFileModelCancel = () => {
    this.setState({
      addFileModel: false,
    });
  };

  /** call by click on readmore text in file box */
  readMoreDrawer = (text) => {
    this.setState({
      readMoreDrawer: {
        visible: true,
        title: text.fileName,
        comment: text.comments,
      },
    });
  };

  readMoreDrawerOnClose = () => {
    this.setState({
      readMoreDrawer: { visible: false, title: null, comment: null },
    });
  };

  /** upload a file */
  handleUploadFile(e) {
    this.setState({
      file: e.target.files[0],
      fileExt: "." + e.target.files[0].name.split(".")[1],
    });
  }

  /** upload a file */
  async hadleFormSubmit(e) {
    e.preventDefault();
    let url = API_ROOT + `putObject/${this.props.token}`;
    const formData = new FormData();
    formData.append("uploadFileContent", this.state.file);
    formData.append("uploadFileExt", this.state.fileExt);
    formData.append("uploadFileName", e.target.uploadFileName.value);
    formData.append("uploadComment", e.target.uploadComment.value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        //'token': this.props.token
      },
    };

    this.setState({
      addFileModel: false,
    });
    axios
      .post(url, formData, {})
      .then((res) => {
        this.getListData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** download a file */
  downloadFile = (filename) => {
    let downloadurl =
      API_ROOT + `getFileObject/${filename}/${this.props.token}`;
    axios.get(downloadurl).then((file) => {
      window.open(file.data.response, "_blank");
    });
  };

  render() {
    const rgdData = this.state.apiData
      ? this.state.apiData.map((item, i) => {
          let comment = item.comments;
          if (comment.length > 100) {
            comment = comment.substring(0, 99) + "...";
          }
          return (
            <Col span={8} className="px-2" key={i}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="d-flex" style={{ minHeight: "135px" }}>
                  <div className="pr-4 flex-grow-1">
                    <h5 style={{ fontWeight: "600" }}>{item.fileName}</h5>
                    <p style={{ fontSize: "0.9rem", color: "#000" }}>
                      {comment}
                      {comment.length > 100 ? (
                        <a
                          className="text-primary"
                          onClick={() => this.readMoreDrawer(item)}
                        >
                          Read more
                        </a>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <a target="_blank">
                      {/* <Icon type="file-pdf" style={{ fontSize: "40px" }} /> */}
                    </a>
                    {STATICMRM ?
                    <a target="_blank" href={`${CONTEXT}/mrm/${item.filePath}`}>
                      {/* <Icon type="download" style={{ fontSize: "40px" }} /> */}
                      <i className="fa fa-download" style={{ fontSize: "40px" }}></i>
                    </a>
                    :
                    <button onClick={() => this.downloadFile(item.filePath)} className="border-0 bg-white">
                      {/* <Icon type="download" style={{ fontSize: "30px", color: "#a2a2a2" }} /> */}
                      <i className="fa fa-download" style={{ fontSize: "40px" }}></i>
                    </button>
                    }
                  </div>
                </div>
              </Card>
            </Col>
          );
        })
      : null;

    return (
      <React.Fragment>
        <PageTitle title={"Risk Governance Documentation"} />
        
        <Content style={{ padding: "4px 24px", minHeight: 280 }}>
          <Row>{rgdData}</Row>
          <Row>
            <Col className="text-right">
              <button
                onClick={this.handleAddFileModel}
                className="btn btn-primary"
                style={{ background: "#203864 !important" }}
              >
                Add file
              </button>
            </Col>
          </Row>
        </Content>
        <Modal
          title="Add File"
          visible={this.state.addFileModel}
          onOk={this.handleAddFileModelOk}
          onCancel={this.handleAddFileModelCancel}
          footer={false}
        >
          <form onSubmit={(e) => this.hadleFormSubmit(e)}>
            <div className="form-group">
              <input
                className="form-control"
                name="uploadFileContent"
                type="file"
                onChange={(e) => this.handleUploadFile(e)}
              />
            </div>
            <div className="d-flex">
              <div className="form-group flex-grow-1 mr-2">
                <input
                  className="form-control"
                  name="uploadFileName"
                  type="text"
                  placeholder="File name"
                />
              </div>
              <div className="form-group w-25">
                <input
                  className="form-control"
                  name="uploadFileExt"
                  type="text"
                  value={this.state.fileExt}
                  disabled
                  placeholder="File ext."
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="uploadComment"
                placeholder="Comments"
              ></textarea>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Modal>
        <Drawer
          title={this.state.readMoreDrawer.title}
          placement={"top"}
          closable={false}
          onClose={this.readMoreDrawerOnClose}
          visible={this.state.readMoreDrawer.visible}
          key={"top"}
        >
          <p>{this.state.readMoreDrawer.comment}</p>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default Portfolio;
