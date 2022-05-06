import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { message } from "antd";
import axios from "axios";
import uuid from "react-uuid";
import { TextField, Icon } from "@material-ui/core";
import { API_ROOT, s3Url, CONTEXT, PYTHON_API_ROOT } from "../../../config";
import MenuItem from "@material-ui/core/MenuItem";

const textInputCategory = React.createRef();

const AddBusinessRule = (props) => {
  const [errors, setErrors] = useState({
    ruleDesc: "",
    ruleSubCategory: "",
    ruleQuery: "",
  });

  const handleSaveRules = () => {
    let formIsValid = false;
    let errorChk = {};
    if (formData.ruleDesc === "") {
      formIsValid = true;
      errorChk.ruleDesc = "border-red";
    }
    if (formData.ruleSubCategory === "") {
      formIsValid = true;
      errorChk.ruleSubCategory = "border-red";
    }
    if (formData.ruleQuery === "") {
      formIsValid = true;
      errorChk.ruleQuery = "border-red";
    }
    if (formIsValid) {
      setErrors(errorChk);
      console.log("error", errorChk);
      return false;
    }
    const key = "updatable";
    props.toggleAddBusinessRuleModal();
    message.loading({ content: "Saving...", key });
    //let api = formData.ruleId !== "" ? `editRuleFile` : `addRuleFile`;
    let data =
      formData.ruleId !== ""
        ? { ...formData, ruleAction: "modify" }
        : {
            ...formData,
            ruleId: uuid().split("-").join(""),
            ruleCategory: "Attribute Validation",
            ruleAction: "add",
          };
    let url = `${PYTHON_API_ROOT}addModifyRuleFile/${props.token}`;
    console.error("data121..#", data);
    axios({
      method: "post",
      url,
      data: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.error("res121..#", res);
        if (res.data.status === "success") {
          props.updateRuleDetails();
          formData.ruleId !== ""
            ? message.success({
                content: "Rule has been updated successfully!",
                key,
                duration: 4,
              })
            : message.success({
                content: "Rule has been saved successfully!",
                key,
                duration: 4,
              });
          setErrors({
            ruleDesc: "",
            ruleSubCategory: "",
            ruleQuery: "",
          });
        } else {
          message.error({ content: "Something went wrong!", key, duration: 4 });
        }
      })
      .catch((err) => {
        console.error("handleSaveRules..#", err);
      });
  };

  const [categories, setCategories] = useState();
  const [subcategories, setSubCategories] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const handleAddListItem = () => {
    setNewItem(true);
  };
  const addListItem = () => {
    let val = textInputCategory.current.value;
    if (val !== "") {
      setSubCategories([...subcategories, val]);
      setNewItem(false);
    } else {
      window.alert("Field can't be empty!");
    }
  };

  const [formData, setFormData] = useState({
    entityruleId: "",
    ruleId: "",
    ruleDesc: "",
    ruleCategory: categories,
    ruleSubCategory: subcategories,
    queryParams: "",
    ruleQuery: "",
    ruleAction: "modify",
  });

  const handleInputData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === `ruleCategory`) {
      setSubCategories(props.ruleSubCategory(e.target.value));
    }
  };

  const editFormData = (parms) => {
    if (!parms) {
      setSubCategories(
        props.ruleSubCategory(props.ruleDetails[0].ruleCategory)
      );
    }
    setFormData({
      entityruleId: "",
      ruleId: !parms ? props.ruleDetails[0].ruleId : "",
      ruleDesc: !parms ? props.ruleDetails[0].ruleDesc : "",
      ruleCategory: !parms ? props.ruleDetails[0].ruleCategory : "",
      ruleSubCategory: !parms ? props.ruleDetails[0].ruleSubCategory : "",
      queryParams: !parms ? props.ruleDetails[0].queryParams : "",
      ruleQuery: !parms ? props.ruleDetails[0].ruleQuery : "",
    });
  };

  const resetFormData = () => {
    editFormData(true);
    setNewItem(false);
    setErrors({
      ruleDesc: "",
      ruleSubCategory: "",
      ruleQuery: "",
    });
  };

  useEffect(() => {
    if (props.ruleDetails !== null) {
      editFormData(false);
    } else {
      editFormData(true);
    }
    if (props.ruleCategory !== null) {
      setCategories(props.ruleCategory);
    }
    //prepopulate sub-category
    setSubCategories(props.ruleSubCategory("Attribute Validation"));
  }, [props.ruleDetails, props.ruleCategory]);

  const {
    ruleDesc,
    ruleCategory,
    ruleSubCategory,
    queryParams,
    ruleQuery,
  } = formData;

  return (
    <React.Fragment>
      <MDBModal
        isOpen={props.addBusinessRuleModal}
        toggle={() => false}
        className="cascading-modal px-5 my-5"
        size="fluid"
        backdrop={`static`}
      >
        <div className="d-flex justify-content-between px-4 py-3 border-bottom">
          <h4 className="modal-title">Add New Rule</h4>
          <button
            type="button"
            className="close text-dark"
            aria-label="Close"
            onClick={() => {
              props.toggleAddBusinessRuleModal();
              resetFormData();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <MDBModalBody>
          <MDBRow className="mt-1">
            <MDBCol size="9">
              <TextField
                type={`text`}
                error={errors.ruleDesc === "border-red"}
                className={`custom-txtfield w-100`}
                label={`Rule Description`}
                name={`ruleDesc`}
                variant="outlined"
                value={ruleDesc}
                onChange={(e) => handleInputData(e)}
              ></TextField>
            </MDBCol>

            {/* <MDBCol size="3">
              <div className="d-flex align-items-center">
                {!newItem ? (
                  <>
                    <TextField
                      select
                      error={errors.ruleCategory === "border-red"}
                      className={`custom-txtfield w-100`}
                      label={`Category`}
                      name={`ruleCategory`}
                      variant="outlined"
                      value={ruleCategory}
                      onChange={(e) => handleInputData(e)}
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      {[...new Set(categories)].map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <a>
                      <Icon
                        title="Add new category"
                        style={{ verticalAlign: "middle" }}
                        className="text-primary ml-2"
                        onClick={() => handleAddListItem()}
                      >
                        add_circle_outline
                      </Icon>
                    </a>
                  </>
                ) : null}
              </div>
              {newItem ? (
                <div className="form-group d-flex align-items-center mb-0">
                  <input
                    type="text"
                    ref={textInputCategory}
                    className="form-control"
                    style={{ height: "43px" }}
                    placeholder="Type here..."
                  />
                  <a>
                    <Icon
                      title="Add"
                      style={{ verticalAlign: "middle" }}
                      className="text-success ml-2"
                      onClick={() => addListItem()}
                    >
                      done
                    </Icon>
                  </a>
                  <a>
                    <Icon
                      title="Cancel"
                      style={{ verticalAlign: "middle" }}
                      className="text-danger ml-2"
                      onClick={() => setNewItem(false)}
                    >
                      clear
                    </Icon>
                  </a>
                </div>
              ) : null}
            </MDBCol> */}

            <MDBCol size="3">
              <div className="d-flex align-items-center">
                {!newItem ? (
                  <>
                    <TextField
                      select
                      error={errors.ruleSubCategory === "border-red"}
                      className={`custom-txtfield w-100`}
                      label={`Category`}
                      name={`ruleSubCategory`}
                      variant="outlined"
                      value={ruleSubCategory}
                      onChange={(e) => handleInputData(e)}
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      {subcategories.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <a>
                      <Icon
                        title="Add new category"
                        style={{ verticalAlign: "middle" }}
                        className="text-primary ml-2"
                        onClick={() => handleAddListItem()}
                      >
                        add_circle_outline
                      </Icon>
                    </a>
                  </>
                ) : (
                  <div className="form-group d-flex align-items-center mb-0">
                    <input
                      type="text"
                      ref={textInputCategory}
                      className="form-control"
                      style={{ height: "43px" }}
                      placeholder="Type here..."
                    />
                    <a>
                      <Icon
                        title="Add"
                        style={{ verticalAlign: "middle" }}
                        className="text-success ml-2"
                        onClick={() => addListItem()}
                      >
                        done
                      </Icon>
                    </a>
                    <a>
                      <Icon
                        title="Cancel"
                        style={{ verticalAlign: "middle" }}
                        className="text-danger ml-2"
                        onClick={() => setNewItem(false)}
                      >
                        clear
                      </Icon>
                    </a>
                  </div>
                )}
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-4">
            {/* <MDBCol size="2">
                <TextField
                    type={`number`}
                    className={`custom-txtfield w-100`}
                    label={`Query Parameters`}
                    name={`queryParams`}
                    variant="outlined"
                    value={queryParams}
                    onChange={(e) => handleInputData(e)}
                ></TextField>
            </MDBCol> */}
            <MDBCol size="12">
              <TextField
                textarea
                error={errors.ruleQuery === "border-red"}
                multiline
                rows={10}
                rowsMax={4}
                className={`custom-txtfield w-100`}
                label={`Rule Query`}
                name={`ruleQuery`}
                variant="outlined"
                value={ruleQuery}
                onChange={(e) => handleInputData(e)}
              ></TextField>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <button
            className="ant-btn btn-light"
            onClick={() => {
              props.toggleAddBusinessRuleModal();
              resetFormData();
            }}
          >
            Close
          </button>
          <button className="ant-btn blue-bg" onClick={() => handleSaveRules()}>
            Save changes
          </button>
        </MDBModalFooter>
      </MDBModal>
    </React.Fragment>
  );
};
export default AddBusinessRule;
