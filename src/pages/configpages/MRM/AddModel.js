import React, { Component } from "react";
import { CONTEXT } from "../../../config";
import { Input, Select } from "antd";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";

const InputGroup = Input.Group;
const { Option } = Select;
const textInput = React.createRef();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: "",
      modelId: "",
      modelName: "",
      businessSponsor: "",
      developer: "",
      validator: "",
      //riskRatingStatus: "",
      materialityStatus: "",
      status: "",
      repository: "",
      creationDate: "",
      objective: "",
      comments: "",
      lastDateOfImplementation: "",
      riskManager: "",
      bank: "",
      addListInput: false,
      modelTypeOptions: [
          {label: "Risk", value: "Risk"},
          {label: "Market Risk", value: "Market Risk"},
          {label: "Marketing", value: "Marketing"}
        ]
    };
  }

  componentDidUpdate() {
    //console.log("component", this.props);
    if (this.state.currentModelId !== this.props.invState.currentModelId) {
      const currentModel =
        this.props.invState.currentModelId === null
          ? null
          : this.props.invState.invModels.filter(
              (item) => item.modelId === this.props.invState.currentModelId
            )[0];
      //console.log('current121',currentModel);
      this.setState({
        currentModelId: currentModel
          ? this.props.invState.currentModelId
          : null,
        modelId: currentModel ? this.props.invState.currentModelId : null,
        modelName: currentModel ? currentModel.modelName : "",
        modelType: currentModel ? currentModel.modelType : "",
        businessSponsor: currentModel ? currentModel.businessSponsor : "",
        developer: currentModel ? currentModel.developer : "",
        validator: currentModel ? currentModel.validator : "",
        creationDate: currentModel ? currentModel.creationDate : "",
        lastDateOfImplementation: currentModel
          ? currentModel.lastDateOfImplementation
          : "",
        objective: currentModel ? currentModel.objective : "",
        comments: currentModel ? currentModel.comments : "",
        materialityStatus: currentModel ? currentModel.materialityStatus : "",
        riskManager: currentModel ? currentModel.riskManager : "",
        bank: currentModel ? currentModel.bank : "",
      });
    }
  }

  changeHandler = (event, fieldName = null) => {
    if (
      fieldName === "modelType" ||
      fieldName === "materialityStatus" ||
      fieldName === "bank"
    ) {
      this.setState({ [fieldName]: event });
    } else {
      let name = event.target.name;
      let fieldValue = event.target.value;
      this.setState({ [name]: fieldValue });
    }
  };

  saveChange = (addModelList) => {
    let {modelId, modelName, modelType, materialityStatus, bank} = this.state;
    //console.log("state121", this.state);
    //this.onUploadFile();
    //this.saveModel();
    if (modelType === "" || modelType === null) {
      alert("Please select Business Function.");
      return false;
    } else if (materialityStatus === "" || materialityStatus === null) {
      alert("Please select Materiality");
    } else if (modelId === "" || modelId === null) {
      alert("Model Id can't be empty.");
      return false;
    } else if (modelName === "" || modelName === null) {
      alert("Model name can't be empty.");
      return false;
    } else if (bank === "" || bank === null) {
      alert("Please select Bank.");
      return false;
    } else {
      addModelList(this.state);
      if (this.state.currentModelId) {
        alert("Model edit request was successful.");
      }
      else {
        alert("Model add request was successful.");
      }
    }
  };

  
  handleAddListItem = () => {
    this.setState({
      addListInput: true,
    });
  };
  addListItem = () => {
    let val = textInput.current.value;
    this.setState({
     modelTypeOptions: [...this.state.modelTypeOptions, {label: val, value: val}],
     addListInput: false
    });
  };

  render() {

    return (
      <React.Fragment>
        <MDBModal
          isOpen={this.props.modal}
          toggle={() => this.props.toggleModal()}
          //className="cascading-modal"
          size="lg"
        >
          <div
            className="modal-header"
            style={{ background: "rgb(32, 56, 100)" }}
          >
            <h4 className="title m-0 white-text">
              {this.props.invState.currentModelId
                ? `Edit (${this.props.invState.currentModelId})`
                : "Add Model"}
            </h4>
            <span
              //type="button"
              className="close white-text"
              onClick={() => this.props.toggleModal()}
              style={{ opacity: 1 }}
            >
              <span aria-hidden="true">×</span>
            </span>
          </div>
          <MDBModalBody>
            <form className="grey-text text-left m-2" id="modalForm">
              <MDBRow>
                {/* {this.props.invState.currentModelId === null ? ( */}
                  <MDBCol size="4">
                    <div className="form-group">
                      <label htmlFor="modelName" className="m-0 addModelLbl">
                        Business Function<sup>*</sup>
                      </label>
                      <div className="d-flex">
                        <Select
                          value={this.state.modelType}
                          name="modelType"
                          onChange={(ev) => this.changeHandler(ev, "modelType")}
                          style={{width:'200px'}}
                        >
                          <Option value="">Select Business Function</Option>
                          {
                            this.state.modelTypeOptions.map((opt,i) => {
                              return <Option key={i} className="text-capitalize" value={opt.value}>{opt.label}</Option>
                            })
                          }
                        </Select>
                        <input type="button" value="+" title="Add new item" className="form-control w-25 ml-2 h-auto p-0" onClick={this.handleAddListItem} />
                      </div>
                    </div>
                    {this.state.addListInput ? <div className="form-group d-flex">
                      <input type="text" ref={textInput} className="form-control" placeholder="Type here..." />
                      <input type="button" value="Add" className="form-control w-25 ml-2" onClick={this.addListItem} />
                    </div> : null}
                  </MDBCol>
                {/* ) : null} */}
                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="materiality" className="m-0 addModelLbl">
                      Materiality<sup>*</sup>
                    </label>
                    <div>
                      <Select
                        value={this.state.materialityStatus}
                        name="materialityStatus"
                        onChange={(ev) =>
                          this.changeHandler(ev, "materialityStatus")
                        }
                        style={{width:'180px'}}
                      >
                        <Option value="">Select Materiality</Option>
                        <Option value="red">High</Option>
                        <Option value="orange">Medium</Option>
                        <Option value="green">Low</Option>
                      </Select>
                    </div>
                  </div>
                </MDBCol>

                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="Bank" className="m-0 addModelLbl">
                      Bank<sup>*</sup>
                    </label>
                    <Select
                      value={this.state.bank}
                      name="bank"
                      onChange={(ev) => this.changeHandler(ev, "bank")}
                    >
                      <Option value="">Select Bank</Option>
                      <Option value="Banco Popular Dominicano">
                        Banco Popular Dominicano
                      </Option>
                      <Option value="Popular Bank">Popular Bank</Option>
                    </Select>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                {this.props.invState.currentModelId === null ? (
                  <MDBCol size="4">
                    <div className="form-group">
                      <label htmlFor="modelId" className="m-0 addModelLbl">
                        Model Id<sup>*</sup>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="modelId"
                        className="form-control"
                        name="modelId"
                        onChange={this.changeHandler}
                        value={this.state.modelId}
                      ></input>
                    </div>
                  </MDBCol>
                ) : null}
                <MDBCol size="8">
                  <div className="form-group">
                    <label htmlFor="modelName" className="m-0 addModelLbl">
                      Model Name<sup>*</sup>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelName"
                      className="form-control"
                      name="modelName"
                      onChange={this.changeHandler}
                      value={this.state.modelName}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label
                      htmlFor="businessSponsor"
                      className="m-0 addModelLbl"
                    >
                      Business Sponsor
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="businessSponsor"
                      className="form-control"
                      name="businessSponsor"
                      onChange={this.changeHandler}
                      value={this.state.businessSponsor}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelValidator" className="m-0 addModelLbl">
                      Model Developer
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelDeveloper"
                      className="form-control"
                      name="developer"
                      onChange={this.changeHandler}
                      value={this.state.developer}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelValidator" className="m-0 addModelLbl">
                      Model Validator
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelValidator"
                      className="form-control"
                      name="validator"
                      onChange={this.changeHandler}
                      value={this.state.validator}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="riskManager" className="m-0 addModelLbl">
                      Risk Manager
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="riskManager"
                      className="form-control"
                      name="riskManager"
                      onChange={this.changeHandler}
                      value={this.state.riskManager}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="creationDate" className="m-0 addModelLbl">
                      Model Creation Date
                    </label>
                    <input
                      autoComplete="off"
                      type="date"
                      id="creationDate"
                      className="form-control"
                      name="creationDate"
                      onChange={this.changeHandler}
                      value={this.state.creationDate}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol size="4">
                  <div className="form-group">
                    <label
                      htmlFor="lastDateOfImplementation"
                      className="m-0 addModelLbl"
                    >
                      Last Date of Implementation
                    </label>
                    <input
                      autoComplete="off"
                      type="date"
                      id="lastDateOfImplementation"
                      className="form-control"
                      name="lastDateOfImplementation"
                      onChange={this.changeHandler}
                      value={this.state.lastDateOfImplementation}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelObjective" className="m-0 addModelLbl">
                      Model Objective
                    </label>
                    <textarea
                      className="form-control"
                      id="modelObjective"
                      rows="2"
                      name="objective"
                      onChange={this.changeHandler}
                      value={this.state.objective}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="comment" className="m-0 addModelLbl">
                      Comments
                    </label>
                    <textarea
                      className="form-control"
                      id="comments"
                      rows="2"
                      name="comments"
                      onChange={this.changeHandler}
                      value={this.state.comments}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <div style={{ fontSize: 9, float: "right" }}>
                All fields marked with * are mandatory.
              </div>
              <div style={{ float: "clear" }}>&nbsp;</div>
              <div style={{ fontSize: 9, float: "right" }}>
                <a
                  style={{ fontSize: 9 }}
                  href={`..${CONTEXT}/mrm/Template_Development.xlsx`}
                  target="_blank"
                  key="1"
                  download
                >
                  Download Model Baseline Metrics template.{" "}
                  <MDBIcon
                    icon="file-excel"
                    style={{ fontSize: 9, color: "green" }}
                  />
                </a>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="light" onClick={() => this.props.toggleModal()}>
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => this.saveChange(this.props.addModelList)}
            >
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}
