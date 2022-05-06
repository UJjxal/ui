import React, { Component } from "react";
import { AppContext } from "../../../AppProvider";
import axios from "axios";
import uuid from "react-uuid";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBCollapse,
  MDBBadge,
} from "mdbreact";
import { CONTEXT } from "../../../config";

export default class extends Component {
  state = {
    collapseID: "",
    newTags: [],
    newSourceName: "",
    newDescription: "",
    fileArray: [],
  };

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  addTags = (e) => {
    let tags = this.state.newTags;

    if (e.key === "Enter") {
      if (e.target.value !== "") {
        e.preventDefault();

        tags.push({ id: e.target.value, value: e.target.value });

        this.setState({ newTags: tags });
        e.target.value = "";
      }
    }
  };

  removeTag = (e) => {
    let tags = this.state.newTags;
    tags = tags.filter((tag) => {
      return tag.id != e;
    });
    this.setState({ newTags: tags });
  };

  saveFile = (
    selectedSourceId,
    selectedSource,
    selectedDesc,
    selectedTags,
    selectedFileArray,
    setCatalogData,
    togglePrimary
  ) => {
    if (selectedFileArray.length > 0) {
      let newCatalog = {
        sourceId: null,
        sourceName: selectedSource,
        description: selectedDesc,
        tags: selectedTags,
        fileArray: selectedFileArray,
      };
      if (selectedSourceId == null) {
        newCatalog.sourceId = uuid();
      } else {
        newCatalog.sourceId = selectedSourceId;
      }
      setCatalogData(newCatalog);
      togglePrimary();
    }
  };

  setCancel = (onCancel) => {
    //onCancel();
    this.props.togglePrimary();
  };

  onUploadFile = (e) => {
    let uploaded = e.target.files;
    let fileArray = [];

    Array.from(uploaded).forEach((file, index) => {
      let fileObj = { name: "", size: "", id: "", data: "" };
      fileObj.name = file.name;
      fileObj.size = file.size;
      fileObj.id = index;
      // fileObj.data = <Spinner />;
      fileArray.push(fileObj);
    });

    let formData = new FormData();
    formData.append("files[]", uploaded[0]);

    axios
      .post("http://10.11.199.36:5000/dct/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let res_data = res.data;
        console.log(res_data);
        // fileArray[0].data = res_data;
        // this.setState({ fileArray });
      });
    this.setState({ fileArray });
  };

  render() {
    return (
      <AppContext.Consumer>
        {({
          selectedSourceId,
          setSelectedSource,
          selectedSource,
          setSelectedDesc,
          selectedDesc,
          selectedTags,
          setSelectedTags,
          onUploadFile,
          tagValue,
          selectedFileArray,
          setCatalogData,
          onCancel,
        }) => {
          return (
            <React.Fragment>
              <MDBModal
                isOpen={this.props.primary}
                toggle={() => this.setCancel(onCancel)}
                className="cascading-modal"
                size="lg"
              >
                <div className="modal-header primary-color white-text">
                  <h4 className="title">
                    {/* <MDBIcon icon='pencil-alt' /> Add Catalog */}
                    <MDBIcon icon="dice-d6 fa-2x" />{" "}
                    {selectedSourceId ? `Edit Catalog` : `Add Catalog`}
                  </h4>
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.setCancel(onCancel)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <MDBModalBody>
                  <div
                    className="pr-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gridTemplateRows: "1fr 1fr",
                      gridGap: "2%",
                    }}
                  >
                    <MDBBtn
                      color="white"
                      className="m-2 btn-secondary"
                      style={{ border: "2px solid grey" }}
                      onClick={this.toggleCollapse("basicCollapse")}
                    >
                      <img src={`${CONTEXT}/dataProfiler/CSV1.png`} style={{ height: "4rem" }} />
                    </MDBBtn>
                    <MDBBtn
                      color=""
                      className="m-2"
                      style={{ border: "2px solid grey", cursor: "default" }}
                    >
                      {/* <img src="/AWS_S3_disable.png" style={{ height: "4rem" }} /> */}
                      <img src={`${CONTEXT}/dataProfiler/D233FA30.png`} style={{ height: "4rem" }} />
                    </MDBBtn>

                    <MDBBtn
                      // block
                      color="white"
                      className="m-2"
                      style={{ border: "2px solid grey", cursor: "default" }}
                    >
                      <img src={`${CONTEXT}/dataProfiler/azure_logo.png`} style={{ height: "4rem" }} />
                    </MDBBtn>
                    <MDBBtn
                      color="white"
                      className="m-2"
                      style={{ border: "2px solid grey", cursor: "default" }}
                    >
                      <img src={`${CONTEXT}/dataProfiler/excel-logo.png`} style={{ height: "2rem" }} />
                    </MDBBtn>
                    <MDBBtn
                      color=""
                      className="m-2"
                      style={{ border: "2px solid grey", cursor: "default" }}
                    >
                      <img src={`${CONTEXT}/dataProfiler/sql-server.png`} style={{ height: "4rem" }} />
                    </MDBBtn>
                  </div>
                  <MDBCollapse
                    id="basicCollapse"
                    isOpen={this.state.collapseID}
                  >
                    <form className="grey-text text-left">
                      <MDBInput
                        size="sm"
                        label="Source Name"
                        // icon='user'

                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={selectedSource}
                        onChange={setSelectedSource}
                      />
                      <MDBInput
                        size="sm"
                        label="Description"
                        // icon='envelope'
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={selectedDesc}
                        onChange={setSelectedDesc}
                      />
                      {selectedTags?selectedTags.map((tag) => {
                        return (
                          <MDBBadge pill color="primary">
                            {tag}
                          </MDBBadge>
                        );
                      }):null}
                      <MDBInput
                        size="sm"
                        label="Tags"
                        // icon='tag'
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onKeyPress={setSelectedTags}
                        value={tagValue}
                      />
                      <MDBInput
                        group
                        multiple
                        size="sm"
                        type="file"
                        style={{ border: "none" }}
                        onChange={onUploadFile}
                      />
                    </form>
                  </MDBCollapse>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={() => this.setCancel(onCancel)}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn
                    color="primary"
                    onClick={() =>
                      this.saveFile(
                        selectedSourceId,
                        selectedSource,
                        selectedDesc,
                        selectedTags,
                        selectedFileArray,
                        setCatalogData,
                        this.props.togglePrimary
                      )
                    }
                  >
                    Save changes
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModal>
            </React.Fragment>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
