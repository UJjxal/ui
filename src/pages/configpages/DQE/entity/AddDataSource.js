import React, { useState } from "react";
import { Button,message } from "antd";
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import axios from "axios";
import uuid from "react-uuid";
import { TextField, Icon } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Loader from "../../../../utilities/Loader";
import { API_ROOT, CONTEXT, PYTHON_API_ROOT } from "../../../../config";
import MenuItem from "@material-ui/core/MenuItem";
import AddAttributeTable from "./AddAttributeTable";
import UploadFile from "./UploadFile";

const AddDataSource = (props) => {
  const [goalDisplay, setGoalDisplay] = useState(true);
  const [attributeDisplay, setAttributeDisplay] = useState(true);
  const goalbtnvalue = goalDisplay === false ? " EXPAND" : " COLLAPSE";
  const attributebtnvalue =
    attributeDisplay === false ? " EXPAND" : " COLLAPSE";
  const [errors, setError] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const tagsMaster = ['Firm'];

  const blankRule = { type: "", severity: "", operator: "" };
  const [attributesList, saveAttributesList] = useState([
    {
      attributeId: uuid().split("-").join(""),
      attributeName: "",
      attributeDesc: "",
      rules: [blankRule],
    },
  ]);

  const toggleGoalDisplay = () => {
    setGoalDisplay(!goalDisplay);
  };

  const toggleAttributeDisplay = () => {
    setAttributeDisplay(!attributeDisplay);
  };

  const handleSelectRuleChange = (e, i, r) => {
    const target = e.target;
    const list = [...attributesList];
    console.log("list121", target.name);
    if (r === "attribute") {
      list[i] = { ...list[i], [target.name]: target.value };
    } else {
      if (target.name === "type") {
        list[i].rules[r] = { ...list[i].rules[r], severity: "" };
      }
      list[i].rules[r] = { ...list[i].rules[r], [target.name]: target.value };
      if (["dataType", "primaryKey"].includes(target.value)) {
        list[i].rules[r] = { ...list[i].rules[r], severity: "reject" };
      }
    }

    console.log("handleSelectRuleChange121", list,'test');
    saveAttributesList(list);
  };

  const setEntityFieldVal = (e) => {
    let updateEntity = {};
    const target = e.target;
    console.log("target", target);
    console.log("121", target.name, target.value);
    // add tags save limit
    if(target.name=="entityTags" && target.value.length>5){
      window.alert("You have reached your maximum limit of tags!")
      target.value.pop();
    }
    updateEntity = { ...props.newEntity, [target.name]: target.value };
    if (target.name === "entityType" && target.value === "parquet") {
      updateEntity = { ...updateEntity, entitySeparator: "" };
    }
    
    console.log("updateEntity", updateEntity);
    props.setNewEntity(updateEntity);
  };

  const formInputField = (type = "input", name, label, style) => {
    let disabled,
      minDate = false;
    if (
      (props.currentEntityId && name === "entityName") ||
      (name === "entityFrequencyDay" &&
        props.newEntity.entityFrequency === "daily")
    ) {
      disabled = true;
    }
    // disabled past date
    if (name === "entityEffectiveStartDate" && props.currentEntityId === null) {
      minDate = props.currentDate();
    }
    if (name === "entityEffectiveEndDate") {
      minDate = props.newEntity.entityEffectiveStartDate;
    }

    return (
      <TextField
        type={type}
        disabled={disabled}
        style={style}
        className={`custom-txtfield ${errors[name]}`}
        label={label}
        name={name}
        variant="outlined"
        InputProps={
          type === "number"
            ? {
                inputProps: {
                  max: 366,
                  min: 1,
                },
              }
            : type === "date" && minDate
            ? { inputProps: { min: minDate } }
            : null
        }
        InputLabelProps={
          type === "date"
            ? {
                shrink: true,
              }
            : null
        }
        value={props.newEntity[name] || ""}
        defaultValue={props.newEntity[name]}
        onChange={setEntityFieldVal}
        autoComplete="off"
      ></TextField>
    );
  };

  const formSelectField = (name, label, style, opt) => {
    return (
      <TextField
        select
        disabled={
          props.newEntity.entityType === "parquet" && name === "entitySeparator"
            ? true
            : false
        }
        style={style}
        className={`custom-txtfield ${errors[name]}`}
        label={label}
        name={name}
        variant="outlined"
        value={props.newEntity[name] || ""}
        onChange={setEntityFieldVal}
      >
        {opt
          ? opt.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.val}
              </MenuItem>
            ))
          : null}
      </TextField>
    );
  };

  const saveAddEntityChange = () => {
    if (handleValidation()) {
      //formValid
      //alert("Form submitted");
      handleSaveEntity(props.newEntity);
    } else {
      window.alert("Form has errors! Please fill all required fields.");
    }
  };

  const handleValidation = () => {
    let reqEntity = [
      "entityName",
      //"entityCategory",
      "entityType",
      "entityFrequency",
      "entityFrequencyDay",
      "entityEffectiveStartDate",
    ];
    let errors = {};
    let formIsValid = true;

    reqEntity.map((req) => {
      if (!props.newEntity[req]) {
        formIsValid = false;
        errors[req] = "border-red";
      }
    });
    // check frequency Day value
    if (props.newEntity.entityFrequencyDay) {
      const freq = props.newEntity.entityFrequency;
      const freqDay = props.newEntity.entityFrequencyDay;
      switch (freq) {
        case "daily":
          if (freqDay != 1) {
            formIsValid = false;
            errors["entityFrequencyDay"] = "border-red";
          }
          break;

        case "weekly":
          if (freqDay > 7) {
            formIsValid = false;
            errors["entityFrequencyDay"] = "border-red";
          }
          break;

        case "monthly":
          if (freqDay > 31) {
            formIsValid = false;
            errors["entityFrequencyDay"] = "border-red";
          }
          break;

        case "yearly":
          if (freqDay > 366) {
            formIsValid = false;
            errors["entityFrequencyDay"] = "border-red";
          }
          break;
      }
    }
    // check start date
    const start = new Date(props.newEntity.entityEffectiveStartDate).setHours(
      0,
      0,
      0,
      0
    );
    if (
      props.newEntity.entityEffectiveStartDate &&
      props.currentEntityId === null
    ) {
      const now = new Date().setHours(0, 0, 0, 0);
      if (now.valueOf() > start.valueOf()) {
        formIsValid = false;
        errors["entityEffectiveStartDate"] = "border-red";
      }
    }
    // check end date
    if (props.newEntity.entityEffectiveEndDate) {
      const end = new Date(props.newEntity.entityEffectiveEndDate).setHours(
        0,
        0,
        0,
        0
      );
      if (start.valueOf() > end.valueOf()) {
        formIsValid = false;
        errors["entityEffectiveEndDate"] = "border-red";
      }
    }
    // console.log("length", formIsValid,props.newEntity.attributes);
    // check blank attributes
    if (props.newEntity.attributes.length > 0) {
      props.newEntity.attributes.map((attr) => {
        if (attr.attributeName === "") {
          formIsValid = false;
          console.log("handleValidation", "blank attribute", attr);
        }
        // check length in case of string
        if (attr.dataType === "string" && attr.length === "") {
          formIsValid = false;
          console.log("handleValidation", "length should be greater than 1");
        }
      });
      // check duplicate attribute
      const attrChk = props.newEntity.attributes.map(
        (attr) => attr.attributeName
      );
      const filtered = attrChk.filter(
        (attributeName, index) => attrChk.indexOf(attributeName) === index
      );
      if (attrChk.length !== filtered.length) {
        formIsValid = false;
        console.log("handleValidation", "duplicate attribute");
      }
    }
    console.log("length121", formIsValid);
    setError(errors);
    setFormValid(formIsValid);
    //setError
    return formIsValid;
  };

  const handleSaveEntity = async (data) => {
    //console.log("testdata", data);
    const bodyFormData = {
      ...data,
      entityAction: props.currentEntityId ? "Modify" : "New",
    };
    console.log("bodyFormData121", bodyFormData);
    const url = PYTHON_API_ROOT + `dqAddEntity/${props.token}`;
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        //console.log("handleSaveEntity", result.data.response);
        const resp = result.data.response;
        if (resp.code === 202) {
          setError({ ...errors, entityName: "border-red" });
          alert(resp.message);
        }
        if (resp.code === 200) {
          props.toggleAddDataSourceModal(true);
        }
      })
      .catch((err) => {
        console.error("handleSaveEntity..#", err);
      });
  };

  const handleKeyDown = (event) => {
    console.log("handleKeyDown", event.target.value);
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          //setValue([...value, event.target.value]);
          const target = {
            target: {
              name: "entityTags",
              value: [...props.newEntity.entityTags, event.target.value],
            },
          };
          setEntityFieldVal(target);
        }
        break;
      }
      default:
    }
  };

  return (
    <React.Fragment>
      <MDBModal
        isOpen={props.addDataSourceModal}
        //toggle={() => props.toggleAddDataSourceModal()}
        className="cascading-modal px-5 my-5"
        size="fluid"
        //size="lg"
      >
        <MDBModalBody className="pt-0 ml-3 .table-responsive">
          <MDBRow className="mt-1">
            <MDBCol className="p-0">
              <button
                type="button"
                className="close text-dark mt-4"
                aria-label="Close"
                onClick={() => props.toggleAddDataSourceModal()}
              >
                <span aria-hidden="true">×</span>
              </button>

              {props.currentEntityId ? (
                ""
              ) : (
                <UploadFile setNewEntity={props.setNewEntity} />
              )}

              <div className="mt-3">
                <h2 style={{ color: "#1E4564" }}>
                  {props.currentEntityId ? `Edit ` : `Add `}Entity
                </h2>
              </div>

              <div className="">
                <hr />
                <h5 style={{ fontWeight: "bold" }}>Entity</h5>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    color="primary"
                    className="blue-bg"
                    style={{
                      left: "-3rem",
                      top: "-2rem",
                    }}
                    onClick={toggleGoalDisplay}
                  >
                    <MDBIcon
                      icon={!goalDisplay ? "chevron-down" : "chevron-up"}
                    />
                    &nbsp; {goalbtnvalue}
                  </Button>
                </div>
              </div>
              <MDBRow className="d-flex justify-content-around">
                <MDBCol style={{ display: goalDisplay ? "block" : "none" }}>
                  <MDBRow>
                    <MDBCol>
                      <div className="float-left" style={{width: "50%"}}>
                        {formInputField(
                          "input",
                          "entityName",
                          `Entity Name *`,
                          {
                            width: "100%",
                          }
                        )}
                      </div>
                      {/* <div className="ml-3 float-left">
                        {formInputField("input", "entityCategory", `Source *`, {
                          width: "31rem",
                        })}
                        
                      </div> */}
                      <div className="float-left" style={{width: "48%"}}>
                        <Autocomplete
                          multiple
                          freeSolo
                          className={`custom-txtfield custom-txtfield-nomargin ${errors.entityTags}`}
                          options={tagsMaster}
                          getOptionLabel={(option) => option || ""}
                          value={props.newEntity.entityTags || ""}
                          onChange={(event, newValue) => {
                            console.log('event121',newValue);
                            const target = {target:{name:"entityTags",value:newValue}}
                            setEntityFieldVal(target)
                          }}
                          filterSelectedOptions
                          renderInput={(params) => {
                            params.inputProps.onKeyDown = handleKeyDown;
                            return (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Tags (use comma`,` for adding more tags)"
                                placeholder="Enter New Tag"
                                margin="normal"
                                style={{marginLeft:12}}
                                fullWidth
                              />
                            );
                          }}
                        /> 
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="mt-4">
                    <MDBCol>
                      <div className=" float-left" style={{width: "17%"}}>
                        {formSelectField(
                          "entityType",
                          `Data File Type *`,
                          { width: "100%" },
                          [
                            { key: "txt", val: "Txt" },
                            { key: "csv", val: "CSV" },
                            { key: "parquet", val: "Parquet" },
                          ]
                        )}
                      </div>
                      <div className="float-left" style={{width: "16%"}}>
                        {formSelectField(
                          "entitySeparator",
                          `Separator`,
                          { width: "94%", marginLeft: "12px" },
                          [
                            { key: "", val: "Select Separator" },
                            { key: "|", val: "Pipe (|)" },
                            { key: ",", val: "Comma (,)" },
                          ]
                        )}
                      </div>

                      <div className="float-left" style={{width: "17%"}}>
                        {formSelectField(
                          "entityFrequency",
                          `Frequency *`,
                          { width: "94%", marginLeft: "12px" },
                          [
                            { key: "yearly", val: "Yearly" },
                            { key: "monthly", val: "Monthly" },
                            { key: "weekly", val: "Weekly" },
                            { key: "daily", val: "Daily" },
                            //{ key: "hourly", val: "Hourly" },
                          ]
                        )}
                      </div>
                      <div className="float-left" style={{width: "16%"}}>
                        {formInputField(
                          "number",
                          "entityFrequencyDay",
                          `Frequency Period`,
                          {
                            width: "94%", marginLeft: "12px"
                          }
                        )}
                      </div>

                      <div className="float-left"  style={{width: "17%"}}>
                        {formInputField(
                          "date",
                          "entityEffectiveStartDate",
                          `Effective start date *`,
                          {
                            width: "94%", marginLeft: "12px"
                          }
                        )}
                      </div>

                      <div className="float-left"  style={{width: "16%"}}>
                        {formInputField(
                          "date",
                          "entityEffectiveEndDate",
                          `Effective end date`,
                          {
                            width: "94%", marginLeft: "12px"
                          }
                        )}
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>

              <div className="">
                <hr />
                <h5 style={{ fontWeight: "bold" }}>Attributes</h5>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    color="primary"
                    className="blue-bg"
                    style={{
                      left: "-3rem",
                      top: "-2rem",
                    }}
                    onClick={toggleAttributeDisplay}
                  >
                    <MDBIcon
                      icon={!attributeDisplay ? "chevron-down" : "chevron-up"}
                    />
                    &nbsp; {attributebtnvalue}
                  </Button>
                </div>
              </div>
              <MDBRow className="d-flex justify-content-around">
                <MDBCol
                  style={{ display: attributeDisplay ? "block" : "none" }}
                >
                  <AddAttributeTable
                    newEntity={props.newEntity}
                    setNewEntity={props.setNewEntity}
                    setFormValid={setFormValid}
                    token={props.token}
                    entities={props.entities}
                    currentEntityId={props.currentEntityId}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <Button onClick={() => props.toggleAddDataSourceModal()}>
            Close
          </Button>

          <Button
            type="primary"
            className="blue-bg"
            onClick={() => saveAddEntityChange()}
          >
            Save changes
          </Button>
        </MDBModalFooter>
      </MDBModal>
    </React.Fragment>
  );
};
export default AddDataSource;
