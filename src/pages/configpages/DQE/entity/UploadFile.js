import React, { useState } from "react";
import uuid from "react-uuid";
import { Menu, Dropdown, Button, message, Icon } from "antd";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import {
  DownOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { CONTEXT } from "../../../../config";
import { TextField } from "@material-ui/core";

const UploadFile = (props) => {
  const [modal, setModal] = useState(false);
  const [actionKey, setActionKey] = useState(false);

  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      //console.log('e121',e.target.result);
      let attributes = [];
      let data = {};
      //Split csv file data by new line so that we can skip first row which is header
      let jsonData = reader.result.split("\n");
      jsonData.forEach((element, index) => {
        if (index) {
          //Split csv file data by comma so that we will have column data
          const elementRaw = element.split(",");
          // update entity object
          if (elementRaw[0]) {
            let entity = {
              entityId: uuid().split("-").join(""),
              entityName: elementRaw[0],
              entityCategory: elementRaw[1],
              entityType: elementRaw[2],
              entitySeparator: "",
              entityFrequency: elementRaw[3],
              entityFrequencyDay: elementRaw[4],
              entityEffectiveStartDate: elementRaw[5],
              entityEffectiveEndDate: elementRaw[6],
              entityTags: []
            };
            data = { ...entity };
          }
          // update entity object
          if (element && elementRaw[8]) {
            let param = {
              id: (+new Date() + Math.floor(Math.random() * 999999)).toString(
                36
              ),
              attributeId: uuid().split("-").join(""),
              attributeName: elementRaw[8],
              attributeDesc: elementRaw[9],
              dataExamples: elementRaw[10],
              isPK: elementRaw[11],
              isNullable: elementRaw[12],
              dataType: ["int", "float", "date", "datetime"].includes(
                elementRaw[13]
              )
                ? elementRaw[13]
                : "string",
              length: ["string", "int", ""].includes(elementRaw[13])
                ? elementRaw[14]
                : "",
              dateFormat: ["date", "datetime"].includes(elementRaw[13])
                ? elementRaw[15]
                : "",
              rules: [{ type: "", severity: "", operator: "" }],
            };
            attributes.push(param);
          }
        }
      });
      const updatedEntity = { ...data, attributes: attributes };
      //console.log("updatedEntity121", updatedEntity);
      props.setNewEntity(updatedEntity);
    };
    reader.readAsText(files);
    toggleModal();
  };

  function handleMenuClick(e) {
    //message.info("Click on menu item.");
    //console.log("click", e);
    if (e.key !== "2") {
      setActionKey(e.key);
      toggleModal();
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <CloudUploadOutlined
          style={{ fontSize: 18, verticalAlign: "text-bottom" }}
        />{" "}
        Upload Schema Definition
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" href={`${CONTEXT}/dqe/template.csv`} download>
          <CloudDownloadOutlined
            style={{ fontSize: 18, verticalAlign: "text-bottom" }}
          />{" "}
          Download Schema Definition Template
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <InfoCircleOutlined
          style={{ fontSize: 18, verticalAlign: "text-bottom" }}
        />{" "}
        Infer Parquet data
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        className="float-right mt-3 mr-3"
        placement="bottomRight"
      >
        <Button>
          Action <DownOutlined />
        </Button>
      </Dropdown>

      {/* <TextField
        type="file"
        style={{ width: "15rem" }}
        className="custom-txtfield close text-dark mt-2 mr-4"
        label="File Upload"
        name="file"
        variant="outlined"
        //value={entity[name] || ""}
        //defaultValue={entity[name]}
        onChange={(e) => handleFiles(e.target.files[0])}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}

      <MDBModal isOpen={modal} className="cascading-modal px-5 my-5" size="lg">
        <MDBModalBody className="pt-0 ml-3 .table-responsive">
          <MDBRow className="mt-1">
            <MDBCol className="p-0">
              <button
                type="button"
                className="close text-dark mt-4"
                aria-label="Close"
                onClick={() => toggleModal()}
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="mt-3">
                <h2 style={{ color: "#1E4564" }}>
                  {actionKey == 1 ? ` ` : ` `}
                </h2>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-around">
            <MDBCol>
              {actionKey == 1 ? (
                <>
                  {/* <TextField
                    type="file"
                    className="custom-txtfield text-dark mt-2 mr-4"
                    label="File Upload"
                    name="file"
                    variant="outlined"
                    //value={entity[name] || ""}
                    onChange={(e) => handleFiles(e.target.files[0])}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                  <div><label>File Upload</label></div>
                  <div className="form-control" style={{height:'auto'}}>
                    <input type="file" name="file" onChange={(e)=>handleFiles(e.target.files[0])} />
                  </div>
                </>
              ) : (
                <TextField
                  className="custom-txtfield text-dark mt-2 mr-4"
                  style={{ width: "100%" }}
                  label="S3 Path"
                  name="s3_path"
                  variant="outlined"
                  //value={s3_path || ""}
                  //onChange={(e) => handleFiles(e.target.files[0])}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <Button onClick={() => toggleModal()}>Close</Button>

          {/* <Button
            type="primary"
            className="blue-bg"
            //onClick={() => saveAddEntityChange()}
          >
            Save changes
          </Button> */}
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};
export default UploadFile;
