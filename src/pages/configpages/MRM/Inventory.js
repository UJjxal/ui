/** Model Inventory - list of all model */
import React, { Component } from "react";
import { Layout, Avatar, Button, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { uploadFile } from "react-s3";
import "./mrm.css";

import { AppContext } from "../../../../src/AppProvider";
import { API_ROOT, aws, CONTEXT, STATICMRM } from "../../../config";
import TableData from "../../../utilities/Table";
import Loader from "../../../utilities/Loader";
import AddModel from "./AddModel";
import PageTitle from "../../../utilities/PageTitle";
import util from "../../../utilities/util";

const { Content } = Layout;
const { Option } = Select;

function Icon(props) {
  let { type, ...rest } = props;

  return (
    <i className="fa fa-circle" {...rest}></i>
  )
}

class ModelInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      modelsList: null,
      invModels: null,
      invSelected: '',
      setModelSelected: null,
      modal: false,
      bankSelected: '',
      commentModel: false,
      commentText: null,
      repoModel: false,
      repoText: null
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  /** call at once when component render */
  componentDidMount() {
    this.getModelList();
  }

  /** get all list of models by calling API */
  getModelList = async () => {
    this.setState({
      apiResponse: null,
      invModels: null,
      modelsList: null,
    });
    try {
      // console.log("inventoryget121");
      let filename = "data.json";
      let url = STATICMRM
        ? `${CONTEXT}/mrm/` + filename
        : API_ROOT + `modelInventory/${this.props.token}`;
      axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          result.data.response.sort((a,b)=>a.modelId.localeCompare(b.modelId));
          result.data.response.forEach((v,i)=>{
            v.key=i+'';
          });

          this.setState({ filteredData: result.data.response })
          //console.log("Inventoryresult", result);
          if (result.data.code === 200) {
            this.setState({
              apiResponse: 200,
              invModels: result.data.response.length > 0 ? result.data.response : null,
              modelsList: result.data.response,
            });
          } else {
            this.setState({
              apiResponse: 400,
            });
          }
        })
        .catch((err) => {
          console.error("error1212", err);
          this.setState({
            apiResponse: 400,
          });
        });
    } catch (error) {
      console.log("error121", error);
      this.setState({
        apiResponse: 400,
      });
    }
  };

  /** call when the change the value of Bank dropdown */
  handleBankOnChange = value => {
    let inputVal = Object.assign({},
      value !== '' ? { bank: value } : null,
      this.state.invSelected !== '' ? { modelType: this.state.invSelected } : null
    );

    const filteredData = this.state.modelsList.filter(function (o) {
      return Object.keys(inputVal).every(function (k) {
        if (o[k] !== undefined)
          return o[k].split(',').some(function (v) {
            return v === inputVal[k];
          });
      });
    });

    this.setState({
      invModels: filteredData,
      bankSelected: value
    })
  };

  /** call when the change the value of business function dropdown */
  inventoryOnChange = value => {
    let inputVal = Object.assign({},
      value !== '' ? { modelType: value } : null,
      this.state.bankSelected !== '' ? { bank: this.state.bankSelected } : null
    );

    const filteredData = this.state.modelsList.filter(function (o) {
      return Object.keys(inputVal).every(function (k) {
        if (o[k] !== undefined)
          return o[k].split(',').some(function (v) {
            return v === inputVal[k];
          });
      });
    });

    this.setState({
      invModels: filteredData,
      invSelected: value
    })
  };

  /** internal calling function for change camel to snake case */
  camelToSnakeCase = (str) => {
    let i,
      frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  /** capital first letter from string */
  getDisplayTxt(str) {
    const header = str.replace("_", "");
    const result = str.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  /** open edit model pop-up */
  handleEditModel = (modelId) => {
    this.setState((state) => ({
      modal: !state.modal,
      currentModelId: modelId,
    }));
  };

  addTemplate = (modelId) => {
    // const response = confirm('Are you sure, You want to upload new baseline file?');
    // if(response){
    //   this.setState((state) => ({
    //     modal: !state.modal,
    //     currentModelId:modelId
    //   }))
    // }
  };

  /** remove model by call API */
  removeModel = (modelId) => {
    const response = window.confirm("Are you sure you want to delete?");
    if (response) {
      let url = API_ROOT + `modelDatadelete/${modelId}/${this.props.token}`;
      axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          //console.log("removeModel", result);
          if (result.data.code === 200) {
            this.setState({
              apiResponse: 200,
            });
			this.getModelList();
          } else {
            this.setState({
              apiResponse: 400,
            });
          }
        })
        .catch((err) => {
          console.error("error1212", err);
          this.setState({
            apiResponse: 400,
          });
        });

      //call list function again
      //this.getModelList();
    }
  };

  /** show comment box */
  showCommentModal = (text) => {
    this.setState({
      commentModel: true,
      commentText: text
    });
  };
  hideCommentModal = () => {
    this.setState({
      commentModel: false,
    });
  };
  showRepoModal = (text) => {
    this.setState({
      repoModel: true,
      repoText: text
    });
  };
  hideRepoModal = () => {
    this.setState({
      repoModel: false,
    });
  };

  setModelSelected(e) {
    console.log(e)
  }
  // async componentDidMount() {
  //   const { data: models } = await Http.get("data.json");
  //   this.setModelSelected(6);
  //   this.setState({ data: models, enterpriseData: models, invModels: models });
  // }

  // setModelSelected = (modelId) => {
  //   this.setState({ modelSelected: modelId });
  //   this.setState({ pageTitle: "Model Monitor" });
  //   this.setState({ menuSelectedKey: "2" });
  //   this.getModelDetails(modelId);
  // };

  /** change table header value or hide some columns from api */
  tableHeader = (record, setModelSelected) => {
    if (record) {
      let headers = Object.keys(record);
      return headers
        .filter((header) => {
          return (
            header !== "modelType" &&
            header !== "csiStatus" &&
            header !== "psiStatus" &&
            header !== "discriminationStatus" &&
            header !== "rankOrderingStatus" &&
            header !== "objective" &&
            header !== "key" &&
            header !== "validator" &&
            header !== "developer" &&
            header !== "riskManager" &&
            header !== "creationDate" &&
            header !== "bank" &&
            header !== "businessSponsor"
          );
        })
        .map((header) => {
          if (header === "modelId") {
            return {
              title: this.getDisplayTxt(header),
              dataIndex: header,
              key: header,
              render: (text, record) => (
                <AppContext.Consumer>
                  {({ modelSelectedByInventory, pageContent }) => {
                    return (
                      <Button
                        className="p-0"
                        type="link"
                        onClick={() => {
                          modelSelectedByInventory(record.key);
                          setModelSelected(record.modelId);
                        }}
                      >
                        <Link to={CONTEXT + pageContent.filter(page => page.displayName === "Model Monitor")[0].link}>
                          {text}
                        </Link>
                      </Button>
                    );
                    /* return(
                      <button
                      className="w-100 text-left border-0"
                      style={(record.status !== "Active") ? { pointerEvents: "none" } : { background: "#f5f5f5" }}
                      >
                      <Link onClick={() => modelSelectedByInventory(record.key)} to={CONTEXT + pageContent.filter(page => page.displayName === "Model Monitor")[0].link}>
                        <span
                        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                        onClick={() => setModelSelected(record.modelId)}>
                        {text}{" "}
                        </span>
                      </Link>
                      </button>
                    ) */
                  }
                  }
                </AppContext.Consumer>
              ),
            };
          }
          if (header === "riskRatingStatus") {
            return {
              title: "Risk Rating",
              dataIndex: header,
              key: header,
              render: (text) => {
                return {
                  children: (
                    <Avatar
                      style={{
                        backgroundColor: text,
                        verticalAlign: "middle",
                        display: "block",
                        margin: "auto"
                      }}
                      size="small"
                    />
                  ),
                };
              },
            };
          }
          if (header === "materialityStatus") {
            return {
              title: "Materiality",
              dataIndex: header,
              key: header,
              render:(text)=>{
				return text==='red'?'High':(text==='green'?'Low':'Medium');
                /* return {
                  children: (
                    <Avatar
                      style={{
                        backgroundColor: text,
                        verticalAlign: "middle",
                        display: "block",
                        margin: "auto"
                      }}
                      size="small"
                    />
                  ),
                }; */
              },
            };
          }
          if (header === "comments") {
            return {
              title: this.getDisplayTxt(header),
              dataIndex: header,
              key: header,
              align: 'center',
              render: (text) => {
                return {
                  children: (<>
                    <i title="Show comment"
                      className="fa fa-comments"
                      style={{
                        fontSize: "22px",
                        color: "cornflowerblue",
                        display: "block",
                        cursor: "pointer"
                      }}
                      onClick={() => this.showCommentModal(text)}
                      type="message"></i>
                  </>),
                };
              },
            };
          }
          if (header === "repository") {
            return {
              title: this.getDisplayTxt(header),
              dataIndex: header,
              key: header,
              align: 'center',
              render: (text) => {
                return {
                  children: (
                    <i
                      title={text}
                      className="fa fa-folder-open"
                      style={{
                        fontSize: "22px",
                        color: "cornflowerblue",
                        display: "block",
                        cursor: "pointer"
                      }}
                      type="folder-open"
                      onClick={() => this.showRepoModal(text)}
                    ></i>
                    // <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>{text}</span>
                  ),
                };
              },
            };
          }
          if (header === "Actions") {
            return {
              title: this.getDisplayTxt(header),
              dataIndex: header,
              key: header,
              render: (text, record) => {
                return {
                  children: (
                    <React.Fragment>
                      <span className="d-flex justify-content-between">
                        <i
                          className="fa fa-pen"
                          style={{
                            fontSize: "18px",
                            color: "cornflowerblue",
                            display: "block",
                          }}
                          type="sync"
                          onClick={() => this.updateModel(record)}
                          title="Update Model"
                        ></i>
                        <i
                          className="fa fa-edit"
                          style={{
                            fontSize: "18px",
                            display: "block",
                            margin: "0 5px"
                          }}
                          type="edit"
                          title="Edit Model"
                          onClick={() => this.handleEditModel(record.modelId)}
                        ></i>
                        <i
                          className="fa fa-trash"
                          style={{
                            fontSize: "18px",
                            color: "#dc3545",
                            display: "block",
                          }}
                          onClick={() => this.removeModel(record.modelId)}
                          type="delete"
                          title="Remove Model"
                        ></i>
                      </span>
                    </React.Fragment>
                  ),
                };
              },
            };
          }
          if (header === "prioritization") {
            return {
              title: "Prioritization",
              dataIndex: header,
              key: header,
              render: (text) => {
                return {
                  children: (
                    <Avatar
                      style={{
                        backgroundColor: text,
                        verticalAlign: "middle",
                        display: "block",
                        margin: "auto"
                      }}
                      size="small"
                    />
                  ),
                };
              },
            };
          }
          return {
            title: this.getDisplayTxt(header),
            dataIndex: header,
            key: header,
          };
        });
    }
  };

  /** call the edit/save function on modelId condition */
  addModelList = (data) => {
    if (data.currentModelId) {
      this.editModel(data);
    } else {
      this.saveModel(data);
    }

    //this.getModelList();
    this.toggleModal();
  };

  onUploadFile = (data) => {
    if (data.uploadMetrics) {
      let file = data.uploadMetrics;
      const dir = `${aws.dirName}/${data.modelType}/${data.modelId}/developmentSet`;
      const config = {
        bucketName: aws.bucketName,
        dirName: dir,
        region: aws.region,
        accessKeyId: aws.accessKeyId,
        secretAccessKey: aws.secretAccessKey,
      };

      uploadFile(file, config)
        .then((res) => {
          console.log("pload121", res);
          //alert("File uploaded successfully.");
        })
        .catch((err) => console.error("error121", err));
    }
  };

  editModel = async (data) => {
    //console.log("testdata", data);
    const bodyFormData = { ...data };
    //console.log("data121", bodyFormData);
    let url = API_ROOT + `modelDataedit/${this.props.token}`;

    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      console.log("editModel", result);
	  this.getModelList();
    });
  };

  /** update model's value */
  updateModel = async (record) => {
    const response = window.confirm("Are you sure you want to update?");
    if (response) {
      let data = { "modelType": record.modelType, "modelId": record.modelId, "bank": record.bank };
      let url = API_ROOT + `modelDataupdate/${this.props.token}`;
      axios({
        method: "post",
        url: url,
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          console.log("updateModel", result);
          this.getModelList();
        })
        .catch((err) => {
          console.error("error1212", err);
        });
    }
  };

  /** save model by calling api */
  saveModel = async (data) => {
    const bodyFormData = { ...data };
    //bodyFormData.append("Upload_Metrics", data.Upload_Metrics);

    //console.log("data121", bodyFormData);
    let url = API_ROOT + `modelDatapost/${this.props.token}`; //s3Url("addModel");

    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      if (result.data.code === 400) {
        window.alert(result.data.message)
      }else{
		this.getModelList();
	  }
      console.log("saveModelResp121", result);
    });
  };

  /** download all models into a file by calling api */
  exportInventory = () => {
    let exportUrl = API_ROOT + `getInventoryFileObject/${this.props.token}`;
    axios.get(exportUrl)
      .then((file) => {
        window.open(file.data.response, '_blank');
      });
  }

  render() {
    const filteredBankUser = util.mrmUsersEmail().filter(option => (option.email === util.getEmailID()))
    const bankOption = [...new Set(filteredBankUser.length === 0 ? util.mrmUsersEmail().map(item => item.bank) : filteredBankUser.map(item => item.bank))];
    const invModelsFilteredList = (arr1, arr2) => {
      let res = [];
      res = arr1?.filter(el => {
         var arr = arr2.find(element => {
            return element === el.bank;
         });
         return arr ? true : false
      });
      return res;
   }

    // const bankOptions = ["Banco Popular Dominicano", "Popular Bank"]; // STATICMRM ? ['Bank A', 'Bank B'] : ["Banco Popular Dominicano", "Popular Bank"];
    const businessOptions = ['Risk', 'Market Risk', 'Marketing'];

    return (
      <div className="bold400">
        <PageTitle title={"Model Inventory"} marginLeft="25px" />
        <Content className="antd-tbl-custom" style={{ padding: "4px 24px", minHeight: 280 }}>
          {this.state.apiResponse ? (
            <TableData
              size="small"
              className="pd10"
              rowClassName="rowSubTable"
              title={
                <>
                <div className="d-flex">
                  <div style={{width: '200px', marginRight: '5px'}} className="antd-lbl-input">
                    <div className="lbl ">Bank</div>
                    <Select
                      bordered={false}
                      className="w-100"
                      // style={{ width: 200, marginRight: "5px" }}
                      placeholder="Select Bank"
                      onChange={this.handleBankOnChange}>
                      <Option value="">All Models</Option>
                      {bankOption.map(option => ( 
                        <Option key={option}>{option}</Option>
                      ))}
                    </Select>
                  </div>
                  <div style={{width: '200px'}} className="antd-lbl-input">
                    <div className="lbl ">Business Function</div>
                    <Select
                      bordered={false}
                      className="w-100"
                      // style={{ width: 270 }}
                      placeholder="Select Business Function"
                      onChange={this.inventoryOnChange}>
                      <Option value="">Portfolio</Option>
                      {businessOptions.map(option => (
                        <Option key={option}>{option}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
                  {/* <Select
                    defaultValue={
                      this.state.bankSelected
                        ? this.state.bankSelected
                        : "Select Bank"
                    }
                    showSearch
                    style={{ width: 200,marginRight:5 }}
                    placeholder="Select Bank"
                    optionFilterProp="children"
                    onChange={this.handleBankOnChange}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="all">All Models</Option>
                    <Option value="Banco Popular Dominicano">
                      Banco Popular Dominicano
                    </Option>
                    <Option value="Popular Bank">Popular Bank</Option>
                  </Select>
                  <Dropdown
                    onChange={this.inventoryOnChange}
                    selected={this.state.invSelected}
                  /> */}
                </>
              }
              extra={<div>
                <Button
                  className="blue-bg"
                  type="primary"
                  // type="success"
                  onClick={() =>
                    this.setState((state) => ({
                      modal: !state.modal,
                      currentModelId: null,
                    }))
                  }
                >
                  <i className="fa fa-plus"></i>&nbsp;Add New Model
                </Button>
                <Button
                  className="ml-2 blue-bg"
                  type="primary"
                  // type="success"
                  onClick={this.exportInventory}>
                  <i className="fa fa-file-export"></i>&nbsp;Export Inventory
                </Button>
              </div>
              }
              pagination="true"
              column={
                this.state.invModels
                  ? this.tableHeader(
                    this.state.invModels[0],
                    this.setModelSelected
                  )
                  : this.state.invModels
              }
              dataSource={invModelsFilteredList(this.state.invModels, bankOption)}
            //scrollX="true"
            />
          ) : this.state.invModels == null ? (
            // "No Records"
            <Loader style={{ marginLeft: "10%" }} />
          ) : (
            <Loader style={{ marginLeft: "40%" }} />
          )}
          <AddModel
            modal={this.state.modal}
            toggleModal={this.toggleModal}
            addModelList={this.addModelList}
            invState={this.state}
          />
        </Content>
        <Modal
          title="Comment"
          visible={this.state.commentModel}
          onCancel={this.hideCommentModal}
          cancelText="Close"
          footer={null}
        >
          <p>{this.state.commentText}</p>
        </Modal>
        <Modal
          title="Repository URL"
          visible={this.state.repoModel}
          onCancel={this.hideRepoModal}
          cancelText="Close"
          footer={null}
        >
          <p><a href={this.state.repoText} target="_blank">{this.state.repoText}</a></p>
        </Modal>
      </div>
    );
  }
}

export default ModelInventory;
