import React, { useState, useEffect, useRef } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { Button } from "antd";
import axios from "axios";
import { TextField, Icon } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import Loader from "../../../../utilities/Loader";
import { API_ROOT, PYTHON_API_ROOT } from "../../../../config";

const AddRuleTable = (props) => {
  //console.log("props121", props);
  const [regExResp, setRegExResp] = useState(false);
  const [loadingAttr, setLoadingAttr] = useState(false);
  const [attributes, setAttributes] = useState(false);
  const ref0 = useRef();
  const usedRules = [];

  useEffect(() => {
    const attr = props.entity.attributes[props.attrIndex];
    console.log("useEffect1212..", attr);
    if (typeof props.attrIndex !== undefined) {
      try {
        const rules = props.entity.attributes[props.attrIndex].rules;
        const entity = rules.filter((rule) => rule["entity"] !== undefined);
        if (entity.length > 0) {
          getAttributeByEntity(entity[0].entity);
        }
        console.log("useEffect121##", rules, entity);
        //setAttributes(false);
        //getAttributeByEntity(target.value);
      } catch (error) {
        console.log("useEffectCatch##", error);
      }
    }
  }, [props.attrIndex]);

  const optType = [
    { key: "", val: "Select" },
    { key: "regEx", val: "regEx" },
    { key: "value", val: "Value" },
    { key: "lookup", val: "Lookup" },
    { key: "custom", val: "Custom" },
  ];

  const operators = [
    { key: "=", val: "=" },
    { key: ">", val: ">" },
    { key: "<", val: "<" },
    { key: ">=", val: ">=" },
    { key: "<=", val: "<=" },
    { key: "in", val: "in" },
    { key: "not in", val: "not in" },
    { key: "range", val: "Between range" },
  ];

  const handleAddRule = () => {
    let UpdateEntity = { ...props.entity };
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const rule = {
      id: id,
      type: "",
      severity: "",
      operator: "",
    };
    //console.log("UpdateEntity121", UpdateEntity.attributes[props.attrIndex].rules);
    UpdateEntity.attributes[props.attrIndex].rules.push(rule);
    //console.log("UpdateEntity122", UpdateEntity);
    props.setNewEntity(UpdateEntity);
  };

  const handleRemoveRule = (index) => {
    let UpdateEntity = { ...props.entity };
    UpdateEntity.attributes[props.attrIndex].rules.splice(index, 1);
    props.setNewEntity(UpdateEntity);
  };

  const handleOnChangeRule = (e, r) => {
    //console.log("handleOnChangeRule121event", e);
    const target = e.target;
    const list = { ...props.entity };
    let currentRule = list.attributes[props.attrIndex].rules[r];

    if (target.name === "type") {
      delete currentRule.severity;
      delete currentRule.value;
      delete currentRule.min;
      delete currentRule.max;
      setAttributes(false);
      delete currentRule.operator;
      if (target.value === "") {
        delete currentRule.entity;
        delete currentRule.attribute;
      }
    }
    if (target.name === "entity" && target.value) {
      setAttributes(false);
      setLoadingAttr(true);
      getAttributeByEntity(target.value);
    }
    list.attributes[props.attrIndex].rules[r] = {
      ...currentRule,
      [target.name]: target.value,
    };
    //console.log("handleOnChangeRule122", list);
    props.setNewEntity(list);
  };

  const getAttributeByEntity = (val) => {
    const entityDtl = props.entities.filter((item) => item.entityName === val);
    const entityId = entityDtl[0].entityId;
    //console.log("entity121", entityDtl);

    const url = PYTHON_API_ROOT + `dqAttributeList/${entityId}/${props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        //console.log("getAttributeByEntity121", result.data.response);
        setLoadingAttr(false);
        setAttributes(result.data.response);
      })
      .catch((err) => {
        setLoadingAttr(false);
        console.error("checkRegEx..#", err);
      });
  };

  const checkRegEx = (val) => {
    let dataExample = "";
    if (typeof props.attrIndex !== "undefined" && props.attrIndex !== null) {
      dataExample = props.attributes[props.attrIndex].dataExamples;
    }

    if (dataExample && val) {
      setRegExResp("loading");
      const url = PYTHON_API_ROOT + `patternMatch/${props.token}`;
      axios({
        method: "post",
        url: url,
        data: { pattern: val, inputstring: dataExample },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          setRegExResp(result.data.response);
        })
        .catch((err) => {
          console.error("checkRegEx..#", err);
        });
    } else {
      window.alert("Please write some sample text in 'Data Examples'");
    }
    //setRegExResp(false);
  };

  const getDataTypeImg = (name) => {
    return name ? (
      <img
        src={require(`../../../../assets/dqe/${name}.png`)}
        style={{ width: "1.5rem", paddingRight: "0.5rem" }}
      />
    ) : null;
  };

  if (typeof props.attrIndex !== "undefined" && props.attrIndex !== null) {
    props.attributes[props.attrIndex].rules.forEach((rule) => {
      usedRules.push(rule.type);
    });
  }

  return (
    <>
      <MDBModal
        isOpen={props.addRuleModal}
        className="cascading-modal px-5 my-5"
        //size="fluid"
        size="lg"
      >
        <MDBModalBody className="pt-0 ml-3 .table-responsive">
          <MDBRow className="mt-1" key="1">
            <MDBCol className="p-0">
              <button
                type="button"
                className="close text-dark mt-4"
                aria-label="Close"
                onClick={() => props.toggleAddRuleModal()}
              >
                <span aria-hidden="true">×</span>
              </button>

              <div className="mt-3">
                <h2 style={{ color: "#1E4564" }} className="mb-0">
                  Add Rule
                  {typeof props.attrIndex !== "undefined" &&
                  props.attrIndex !== null ? (
                    <span
                      style={{ fontSize: "1.3rem", fontWeight: "normal" }}
                    >{` [${
                      props.attributes[props.attrIndex].attributeName
                    }]`}</span>
                  ) : (
                    ""
                  )}
                </h2>
              </div>

              {typeof props.attrIndex !== "undefined" &&
              props.attrIndex !== null ? (
                <MDBRow key="2">
                  <MDBCol>
                    <p>
                      <b>Data Examples: </b>
                      {`${props.attributes[props.attrIndex].dataExamples}`}
                    </p>
                  </MDBCol>
                </MDBRow>
              ) : null}

              <MDBRow className="d-flex justify-content-around" key="3">
                <MDBCol>
                  <div
                    style={{
                      overflowY: "scroll",
                      maxHeight: "13rem",
                      overflowX: "hidden",
                    }}
                  >
                    {typeof props.attrIndex !== "undefined" &&
                    props.attrIndex !== null
                      ? props.attributes[props.attrIndex].rules.map(
                          (rule, r) => {
                            return (
                              <MDBRow key={`4${r}`}>
                                <MDBCol>
                                  <div className="">
                                    <h7 className="ml-3 font-weight-bold">
                                      Rule {r + 1}
                                      {r !== 0 && (
                                        <Icon
                                          style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                          }}
                                          onClick={() => handleRemoveRule(r)}
                                        >
                                          delete
                                        </Icon>
                                      )}
                                    </h7>
                                  </div>
                                  <div className="float-left">
                                    <TextField
                                      select
                                      style={{ width: "6rem" }}
                                      className="custom-txtfield"
                                      label={"Select"}
                                      name="type"
                                      variant="outlined"
                                      value={rule.type || ""}
                                      onChange={(e) => handleOnChangeRule(e, r)}
                                    >
                                      {optType
                                        ? optType.map((option) => (
                                            <MenuItem
                                              key={option.key}
                                              value={option.key}
                                              disabled={
                                                usedRules.includes(option.key)
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {option.val}
                                            </MenuItem>
                                          ))
                                        : null}
                                    </TextField>
                                  </div>

                                  <div className="ml-3 float-left">
                                    <TextField
                                      select
                                      className="custom-txtfield"
                                      style={{ width: "6rem" }}
                                      label="Severity"
                                      name="severity"
                                      variant="outlined"
                                      value={rule.severity || ""}
                                      onChange={(e) => handleOnChangeRule(e, r)}
                                    >
                                      <MenuItem key="1" value="">
                                        Select Severity
                                      </MenuItem>
                                      <MenuItem key="reject" value="reject">
                                        Reject
                                      </MenuItem>
                                      <MenuItem key="warn" value="warn">
                                        Warn
                                      </MenuItem>
                                    </TextField>
                                  </div>
                                  {["value"].includes(rule.type) ? (
                                    <div className="float-left ml-3">
                                      <TextField
                                        select
                                        style={{ width: "10rem" }}
                                        className="custom-txtfield"
                                        label={"Operator"}
                                        name="operator"
                                        variant="outlined"
                                        value={rule.operator || ""}
                                        onChange={(e) =>
                                          handleOnChangeRule(e, r)
                                        }
                                      >
                                        {operators
                                          ? operators.map((option) => (
                                              <MenuItem
                                                key={option.key}
                                                value={option.key}
                                              >
                                                {option.val}
                                              </MenuItem>
                                            ))
                                          : null}
                                      </TextField>
                                    </div>
                                  ) : null}

                                  {["value", "regEx"].includes(rule.type) ? (
                                    rule.operator === "range" ? (
                                      <>
                                        <div className="ml-3 float-left">
                                          <TextField
                                            className="custom-txtfield"
                                            style={{ width: "5rem" }}
                                            label="Min"
                                            name="min"
                                            variant="outlined"
                                            value={rule.min || ""}
                                            onChange={(e) =>
                                              handleOnChangeRule(e, r)
                                            }
                                          />
                                        </div>
                                        <div className="ml-3 float-left">
                                          <TextField
                                            className="custom-txtfield"
                                            style={{ width: "5rem" }}
                                            label="Max"
                                            name="max"
                                            variant="outlined"
                                            value={rule.max || ""}
                                            onChange={(e) =>
                                              handleOnChangeRule(e, r)
                                            }
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <div className="ml-3 float-left">
                                        <TextField
                                          className="custom-txtfield"
                                          style={{ width: "10rem" }}
                                          label="Value"
                                          name="value"
                                          variant="outlined"
                                          value={rule.value || ""}
                                          onChange={(e) =>
                                            handleOnChangeRule(e, r)
                                          }
                                        />
                                      </div>
                                    )
                                  ) : null}

                                  {["custom"].includes(rule.type) ? (
                                    <div className="float-left ml-3">
                                      <TextField
                                        select
                                        style={{ width: "21rem" }}
                                        className="custom-txtfield"
                                        label={"Rule"}
                                        name="ruleId"
                                        variant="outlined"
                                        value={rule.ruleId || ""}
                                        onChange={(e) =>
                                          handleOnChangeRule(e, r)
                                        }
                                      >
                                        {props.ruleMaster
                                          ? props.ruleMaster.map((option) => (
                                              <MenuItem
                                                key={option.ruleId}
                                                value={option.ruleDesc}
                                              >
                                                {option.ruleDesc}
                                              </MenuItem>
                                            ))
                                          : null}
                                      </TextField>
                                    </div>
                                  ) : null}

                                  {["regEx"].includes(rule.type) ? (
                                    <div className="float-left ml-3">
                                      <a
                                        className="text-primary"
                                        onClick={() => checkRegEx(rule.value)}
                                        title="Validate RegEx"
                                      >
                                        Validate
                                      </a>
                                      <div
                                        className="ml-2"
                                        style={{ float: "right" }}
                                      >
                                        {regExResp === "loading" ? (
                                          <Loader
                                            type="TailSpin"
                                            style={{ margin: 0 }}
                                          />
                                        ) : regExResp === "successful" ? (
                                          <CheckCircleIcon
                                            style={{ fill: "#28a745" }}
                                          />
                                        ) : regExResp === "unsuccessful" ? (
                                          <CancelIcon
                                            style={{ fill: "#CC0000" }}
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ) : null}

                                  {["lookup"].includes(rule.type) &&
                                  props.entities ? (
                                    <>
                                      <div className="float-left ml-3">
                                        <Autocomplete
                                          //freeSolo
                                          //disableClearable
                                          ref={ref0}
                                          style={{ width: "17rem" }}
                                          options={props.entities}
                                          className="custom-txtfield"
                                          autoHighlight
                                          getOptionLabel={(option) =>
                                            option.entityName
                                          }
                                          onChange={(e) => {
                                            const target = {
                                              target: {
                                                name: ref0.current.getAttribute(
                                                  "name"
                                                ),
                                                value: e.target.textContent,
                                              },
                                            };
                                            handleOnChangeRule(target, r);
                                          }}
                                          name="entity"
                                          defaultValue={
                                            props.entities[
                                              props.entities.findIndex(
                                                (obj) =>
                                                  obj.entityName === rule.entity
                                              )
                                            ] || ""
                                          }
                                          renderOption={(option) => (
                                            <React.Fragment>
                                              {option.entityName}
                                            </React.Fragment>
                                          )}
                                          selectOnFocus
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Entity"
                                              variant="outlined"
                                              name="entity"
                                              value={rule.entity || ""}
                                              inputProps={{
                                                ...params.inputProps,
                                                autoComplete: "new-password", // disable autocomplete and autofill
                                              }}
                                            />
                                          )}
                                        />
                                        {/* <TextField
                                          select
                                          style={{ width: "10rem" }}
                                          className="custom-txtfield"
                                          label={"Entity"}
                                          name="entity"
                                          variant="outlined"
                                          value={rule.entity || ""}
                                          onChange={(e) =>
                                            handleOnChangeRule(e, r)
                                          }
                                        >
                                          {props.entities
                                            ? props.entities.map((option) => (
                                                <MenuItem
                                                  key={option.entityId}
                                                  value={option.entityName}
                                                >
                                                  {option.entityName}
                                                </MenuItem>
                                              ))
                                            : null}
                                        </TextField> */}
                                      </div>
                                      <div className="float-left ml-3">
                                        {loadingAttr ? (
                                          <Loader
                                            type="TailSpin"
                                            style={{ margin: 0 }}
                                          />
                                        ) : null}
                                        {attributes ? (
                                          <TextField
                                            select
                                            style={{ width: "8rem" }}
                                            className="custom-txtfield"
                                            label={"Attribute"}
                                            name="attribute"
                                            variant="outlined"
                                            value={rule.attribute || ""}
                                            onChange={(e) =>
                                              handleOnChangeRule(e, r)
                                            }
                                          >
                                            {attributes
                                              ? attributes.map((option) => (
                                                  <MenuItem
                                                    key={option.attributeName}
                                                    value={option.attributeName}
                                                  >
                                                    {getDataTypeImg(
                                                      option.dataType
                                                    )}{" "}
                                                    {`${option.attributeName}`}
                                                  </MenuItem>
                                                ))
                                              : null}
                                          </TextField>
                                        ) : null}
                                      </div>
                                    </>
                                  ) : null}
                                </MDBCol>
                              </MDBRow>
                            );
                          }
                        )
                      : null}
                  </div>

                  <Button
                    type="primary"
                    className="blue-bg pull-right mr-2 mt-2"
                    onClick={() => handleAddRule()}
                  >
                    + Add Rule
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <Button onClick={() => props.toggleAddRuleModal()}>Close</Button>
          {/* <MDBBtn
            color="primary"
            className="blue-bg"
            //onClick={() => saveAddEntityChange()}
          >
            Save changes
          </MDBBtn> */}
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};
export default AddRuleTable;
