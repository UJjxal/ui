import React, { useState, useEffect } from "react";
import Loader from "../../../../utilities/Loader";
import SQLEditor from "../../../../utilities/SQLEditor";
import {
  Typeahead,
  Menu,
  MenuItem as Submenu,
} from "react-bootstrap-typeahead";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  TextField,
  Icon,
  Button,
  InputLabel,
  Checkbox,
  Input,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Tree, Popover } from "antd";
import {
  dataCatalog,
  addDataCatalog,
  updateDataCatalog,
  deleteDataCatalog,
} from "../../../../components/DataCatalog";
import { unitList, operatorList } from "../../../../utilities/AllTables";

const getDataValue = (value, valueType) => {
  let wherePosition = value.indexOf("WHERE:");
  let fromPosition = value.indexOf("FROM:");

  return valueType === "FROM"
    ? [value.slice(fromPosition + 5, wherePosition)].join("")
    : [value.slice(wherePosition + 6, value.length)].join("");
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1px",
  },
}));

const useStylesSelect = makeStyles({
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
});

//******Checkbox - For Parent Node, checkbox copies the primary to the below metrics values
//******Select component to select metrics */

const NodeDrawer = (props) => {
  const classes = useStyles();
  const [selectedMetric, setSelectedMetric] = useState("");
  const [selectedNode, setSelectedNode] = useState("");

  const changeDataNode = (value, indx) => {
    props.setDataNode(value, props.selectedRndIndex, indx);
  };

  const setFocus = (indx) => {
    props.setDataFieldFocus(props.selectedRndIndex, indx);
  };

  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
  };
  const cleanupClose = () => {
    let error = "";
    if (!props.selectedRnd.dataNode) {
      error = props.validateFormulaNode(
        props.selectedRnd.displayName,
        props.selectedRnd.formula,
        props.selectedRndFuntionOptions
      );
    } else {
      error = props.validateDataNode(props.selectedRnd.displayName);
    }

    setSelectedMetric(
      (prev) => "",
      props.onClose(props.selectedRndIndex, props.selectedRnd.dataNode, error)
    );
  };

  const classesSelect = useStylesSelect();

  return (
    <>
      <Drawer
        title=""
        width={415}
        closable={false}
        onClose={() => cleanupClose()}
        visible={props.visible}
        drawerStyle={{
          backgroundColor: props.theme.color3,
          color: props.theme.color6,
        }}
      >
        <div
          className="text-center"
          style={{ color: "red", fontWeight: "bold" }}
        >
          {props.selectedRnd.error}
        </div>
        <h4 className="mb-2 text-center" style={{ color: props.theme.color6 }}>
          Node Details
        </h4>
        <h5 className="mb-1" style={{ color: props.theme.color6 }}>
          Title
        </h5>
        <TextField
          label=""
          id="outlined-size-normal"
          value={props.selectedRnd.displayName}
          placeholder="Node Name"
          variant="outlined"
          autoComplete="off"
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "4px",
          }}
          onChange={(e) => {
            let error = "";
            if (!props.selectedRnd.dataNode) {
              error = props.validateFormulaNode(
                e.target.value,
                props.selectedRnd.formula,
                props.selectedRndFuntionOptions
              );
              // error = props.validateNode(e.target.value);
            } else {
              error = props.validateDataNode(e.target.value);
            }
            props.setDisplayName(
              props.selectedRnd.nodeId,
              e.target.value,
              props.selectedRndIndex,
              error
            );
          }}
        />
        <h5 className="mt-3 mb-1" style={{ color: props.theme.color6 }}>
          Node Type
        </h5>

        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="node-type"
            name="node-type"
            value={props.selectedRnd.dataNode ? "Leaf" : "Parent"}
            // onChange={(e) =>props.setElementType(e.target.value, props.selectedRnd.nodeId, props.selectedRndIndex)}
          >
            {props.elementList.map((list) => (
              <FormControlLabel
                value={list.element}
                control={
                  <Radio
                    className={`text-${props.theme.color6}`}
                    color="primary"
                  />
                }
                label={list.element}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {props.selectedRnd.dataNode ? (
          <h5 className="mt-2 mb-1" style={{ color: props.theme.color6 }}>
            Metric Queries
          </h5>
        ) : (
          <h5 className="mt-2" style={{ color: props.theme.color6 }}>
            Leaf Relationships
          </h5>
        )}

        {!props.selectedRnd.dataNode &&
          props.selectedRnd.formula.map((el, i) => (
            <>
              <div className="d-flex flex-row justify-content-between mt-2 mb-1">
                <div className="d-flex flex-row">
                  {/* Allow Change of Unit*/}
                  <Select
                    className={
                      props.theme.color6 === "white" && classesSelect.select
                    }
                    inputProps={
                      props.theme.color6 === "white" && {
                        classes: {
                          icon: classesSelect.icon,
                          root: classesSelect.root,
                        },
                      }
                    }
                    labelId="demo-simple-select-outlined-label"
                    name="unit"
                    value={el.unit}
                    id={el.key}
                    onChange={(e) =>
                      props.changeMetricsUnit(
                        e,
                        props.selectedRndIndex,
                        i,
                        props.selectedRnd.dataNode
                      )
                    }
                    label="Unit"
                  >
                    {unitList.map((unit, i) => (
                      <MenuItem key={i} value={unit.value}>
                        {unit.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Replace name with changeable Alias*/}
                  {/* {el.name} */}
                  <Input
                    className={`${
                      props.theme.color6 === "white" && classesSelect.select
                    } ml-1 text-${props.theme.color6}`}
                    value={el.alias}
                    placeholder={el.name}
                    onChange={(e) =>
                      props.changeMetricsAlias(
                        e,
                        props.selectedRndIndex,
                        i,
                        props.selectedRnd.dataNode
                      )
                    }
                  />
                </div>
                {/* Suppress Metric Display */}
                <IconButton
                  className={`text-${props.theme.color6}`}
                  color="primary"
                  aria-label="toggle metrics visibility"
                  onClick={(e) =>
                    props.changeMetricsShow(
                      e,
                      props.selectedRndIndex,
                      i,
                      props.selectedRnd.dataNode
                    )
                  }
                >
                  {el.show ? (
                    <Visibility className={`text-${props.theme.color6}`} />
                  ) : (
                    <VisibilityOff className={`text-${props.theme.color6}`} />
                  )}
                </IconButton>
              </div>

              <Typeahead
                {...el.value}
                flip={true}
                size={"large"}
                defaultSelected={el.value}
                selected={el.value}
                id="kpi-visual-input"
                filterBy={props.filterBy}
                style={{
                  display: !props.selectedRnd.dataNode ? "block" : "none",
                }}
                renderMenu={(results, menuProps) => (
                  <Menu {...menuProps}>
                    {
                      <Submenu
                        className="font-weight-bold"
                        option={results[results.length - 1]}
                      >
                        {results[results.length - 1].label}{" "}
                      </Submenu>
                    }
                    {results.map((result, index) => (
                      <Submenu option={result} position={index}>
                        {index < results.length - 1 && result.label}
                      </Submenu>
                    ))}
                  </Menu>
                )}
                allowNew
                multiple
                placeholder="Set function..."
                newSelectionPrefix="Insert operator or value: "
                onChange={(event) => {
                  {
                    i !== 0 &&
                      props.setSameAsPrimarytoFalse(props.selectedRndIndex, i);
                  }
                  let error = props.validateFormulaNode(
                    props.selectedRnd.displayName,
                    event,
                    props.selectedRndFuntionOptions,
                    i
                  );

                  {
                    i === 0
                      ? props.addRelation(
                          props.selectedRnd.nodeId,
                          event,
                          props.selectedRndIndex,
                          i,
                          error
                        )
                      : props.checkMetricEntry(
                          props.selectedRnd.nodeId,
                          event,
                          props.selectedRndIndex,
                          i,
                          error
                        );
                  }
                }}
                options={
                  props.selectedRndFuntionOptions
                    ? props.selectedRndFuntionOptions
                    : [{ label: "No IDs" }]
                }
              />
              {i !== 0 && (
                // <div className="d-flex flex-row align-items-start">
                   <div className="d-inline">
                  <Checkbox
                    className={`${classes.root} text-${props.theme.color6}`}
                    size="small"
                    checked={el.sameasprimary ? el.sameasprimary : false}
                    onChange={(e) =>
                      props.changeSameAsPrimary(e, props.selectedRndIndex, i)
                    }
                    name={el.name + i}
                    color="primary"
                  />
                  <span className="font-weight-bold">Copy Primary</span>
                </div>
              )}
              {
                  //Sanjit - Add Side drawer for python operator selection

                  <Button
                    className={`text-${props.theme.color6}`}
                    style={{
                      display: "flex", float:"right"
                    }}
                    color="primary"
                    onClick={() =>
                      props.showChildrenDrawer(
                        props.selectedRndIndex,
                        i,
                        "operators"
                      )
                    }
                  >
                    ADD FUNCTION
                  </Button>
                }
            </>
          ))}

        {props.selectedRnd.dataNode && (
          <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <InputLabel
              className={`text-${props.theme.color6}`}
              id="demo-simple-select-outlined-label"
            >
              Select Metrics
            </InputLabel>
            <Select
              className={props.theme.color6 === "white" && classesSelect.root}
              inputProps={
                props.theme.color6 === "white" && {
                  classes: {
                    icon: classesSelect.icon,
                    root: classesSelect.root,
                  },
                }
              }
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedMetric}
              onChange={(e) => handleMetricChange(e)}
              label="Select Metrics"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.selectedRnd.dataValue.map((avlMetrics) => (
                <MenuItem value={avlMetrics.key}>{avlMetrics.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {props.selectedRnd.dataNode &&
          props.selectedRnd.dataValue.map((el, i) => (
            <div
              style={{ display: selectedMetric === el.key ? "block" : "none" }}
            >
              <div className="mt-3 mb-1 d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  {/* Allow Change of Unit*/}
                  <Select
                    className={
                      props.theme.color6 === "white" && classesSelect.select
                    }
                    inputProps={
                      props.theme.color6 === "white" && {
                        classes: {
                          icon: classesSelect.icon,
                          root: classesSelect.root,
                        },
                      }
                    }
                    labelId="demo-simple-select-outlined-label"
                    name="unit"
                    value={el.unit}
                    id={el.key}
                    onChange={(e) =>
                      props.changeMetricsUnit(
                        e,
                        props.selectedRndIndex,
                        i,
                        props.selectedRnd.dataNode
                      )
                    }
                    label="Unit"
                  >
                    {unitList.map((unit, i) => (
                      <MenuItem key={i} value={unit.value}>
                        {unit.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Replace name with changeable Alias*/}
                  {/* {el.name} */}
                  <Input
                    className={`${
                      props.theme.color6 === "white" && classesSelect.select
                    } ml-1 text-${props.theme.color6}`}
                    value={el.alias}
                    placeholder={el.name}
                    onChange={(e) =>
                      props.changeMetricsAlias(
                        e,
                        props.selectedRndIndex,
                        i,
                        props.selectedRnd.dataNode
                      )
                    }
                  />
                  {/* Suppress Metric Display */}
                  <IconButton
                    className={`text-${props.theme.color6}`}
                    color="primary"
                    aria-label="toggle metrics visibility"
                    onClick={(e) =>
                      props.changeMetricsShow(
                        e,
                        props.selectedRndIndex,
                        i,
                        props.selectedRnd.dataNode
                      )
                    }
                  >
                    {el.show ? (
                      <Visibility className={`text-${props.theme.color6}`} />
                    ) : (
                      <VisibilityOff className={`text-${props.theme.color6}`} />
                    )}
                  </IconButton>
                </div>
                <Button
                  className={`text-${props.theme.color6}`}
                  style={{
                    display: props.selectedRnd.dataNode ? "block" : "none",
                  }}
                  onClick={() =>
                    props.setDataNode(
                      props.resetMetricQuery(el.key, "node"),
                      props.selectedRndIndex,
                      i
                    )
                  }
                >
                  <Icon style={{ margin: "0px", paddingTop: "3px" }}>
                    update
                  </Icon>
                </Button>
              </div>

              <SQLEditor
                style={{
                  display: selectedMetric === el.key ? "block" : "none",
                }}
                height={"22rem"}
                width={"100%"}
                value={el.value}
                callChange={changeDataNode}
                callFocus={setFocus}
                dataNodeIndex={i}
                customDropDown={props.optionsForEditorTable}
                selectedRndIndex={props.selectedRndIndex} //LC-1081 Set parameter on cursor
              />
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Button
                  className={`text-${props.theme.color6}`}
                  style={{
                    display: props.selectedRnd.dataNode ? "block" : "none",
                  }}
                  color="primary"
                  onClick={() =>
                    props.showChildrenDrawer(
                      props.selectedRndIndex,
                      i,
                      "column"
                    )
                  }
                >
                  SELECT COLUMN
                </Button>
                <Button
                  className={`text-${props.theme.color6}`}
                  style={{
                    display: props.selectedRnd.dataNode ? "block" : "none",
                  }}
                  color="primary"
                  onClick={() =>
                    props.showChildrenDrawer(
                      props.selectedRndIndex,
                      i,
                      "parameter"
                    )
                  }
                >
                  SELECT PARAMETER
                </Button>
              </div>
            </div>
          ))}

        <h5 className="mt-3 mb-1" style={{ color: props.theme.color6 }}>
          Notes
        </h5>

        <TextField
          multiline
          rows={4}
          placeholder="Insert Notes"
          variant="outlined"
          style={{
            borderRadius: "4px",
            width: "100%",
            fontSize: "1rem",
            background: "#fff",
          }}
          value={props.selectedRnd.relation}
          autoComplete="off"
          onChange={(e) => {
            props.setRelationString(e.target.value, props.selectedRndIndex);
          }}
        />

        <div className="d-flex flex-row justify-content-between mt-3">
          <Button
            className={
              props.theme.color6 === "white" && `text-white border border-white`
            }
            variant="outlined"
            type="primary"
            onClick={() => cleanupClose()}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              display: props.selectedRnd.nodeId === "1" ? "none" : "block",
            }}
            onClick={() => props.removeCard(props.selectedRnd.nodeId)}
          >
            Delete Node
          </Button>
        </div>
        <Drawer
          //LC-723 Parameterized SQL Queries
          title={
            props.drawerSelected === "parameter"
              ? "Available Parameters"
              : props.drawerSelected === "column"
              ? "Available Data Tables"
              : "Available Operators"
          }
          width={420}
          onClose={props.onChildrenDrawerClose}
          visible={props.childrenDrawer}
        >
          {
            //LC-723 Parameterized SQL Queries
            props.drawerSelected === "parameter" && (
              <ParameterTreeList
                treeData={props.allParametersList.map((parm) => {
                  return {
                    key: "{" + parm.parameterName + "}",
                    title: parm.parameterName,
                    value: parm.parameterValue,
                  };
                })}
                onSelectTableData={props.onSelectTableData}
              />
            )
          }
          {props.drawerSelected === "column" && (
            <TreeList
              token={props.token}
              onSelectTableData={props.onSelectTableData}
            />
          )}
          {props.drawerSelected === "operators" && (
            <OperatorTreeList
              treeData={operatorList.map((parm) => {
                return {
                  key: parm.label,
                  title: parm.label,
                };
              })}
              onSelectTableData={props.onSelectOperator}
            />
          )}
        </Drawer>
      </Drawer>
    </>
  );
};

export const TreeList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    optionsForDataField: [],
    optionsForDataTable: [],
    optionsForEditorTable: [],
  });

  const showChild = (i) => {
    let toggler = document.querySelectorAll(".tree-list > li > span");
    toggler[i].closest("li").childNodes[1].classList.toggle("d-none");
  };
  const showTextarea = (i, idx) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    toggler[i].childNodes[1].childNodes[idx].childNodes[1].classList.toggle(
      "d-none"
    );
  };
  const getTextareaValue = (i, idx) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    let value =
      toggler[i].childNodes[1].childNodes[idx].childNodes[1].querySelector(
        "textarea"
      ).value;
    props.onSelectTableData([value]);
  };
  const addNewItem = (i) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    toggler[i]
      .querySelector("ul li.add-new-item > div")
      .classList.toggle("d-none");
  };

  const checkDuplicate = (entity, fieldname) => {
    return data[`optionsForDataField`]
      .filter((i) => i.key === entity)[0]
      .children.map((j) => j.title === fieldname)[0];
  };

  const addData = (i, type, entity, schema, columnFilter) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    let fieldname = toggler[i].querySelector(
      "ul li.add-new-item > div > input"
    ).value;
    let expression = toggler[i].querySelector(
      "ul li.add-new-item > div > textarea"
    ).value;

    if (fieldname.length < 1) {
      alert(`Please add column name!`);
      return false;
    }

    const duplicate = checkDuplicate(entity, fieldname);
    if (!duplicate) {
      addDataCatalog({
        entity: entity,
        expression: expression,
        fieldName: fieldname,
        schema: schema,
        type: type,
        columnFilter: "false",
      })
        .then((response) => {
          if (response.status === 200) {
            toggler[i]
              .querySelector("ul li.add-new-item > div")
              .classList.toggle("d-none");
            alert(`Column added successfully!`);
            getDataCatalog();
          }
        })
        .catch((error) => console.error(error.message));
    } else {
      window.alert("Column already exists!");
    }
  };

  const updateData = (i, idx, type, entity, fieldname_old, schema) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    let fieldname =
      toggler[i].childNodes[1].childNodes[idx].childNodes[1].querySelector(
        "input"
      ).value;
    let expression =
      toggler[i].childNodes[1].childNodes[idx].childNodes[1].querySelector(
        "textarea"
      ).value;

    if (fieldname.length < 1) {
      alert(`Please add column name!`);
      return false;
    }

    const self = fieldname === fieldname_old;
    const duplicate = checkDuplicate(entity, fieldname);

    if (duplicate && !self) {
      window.alert("Column already exists!");
      return false;
    }

    if (
      window.confirm(
        "This will overwrite the current expression entry. Are you sure you want to update?"
      )
    ) {
      //if expression needs to be update, then add expression
      let filtered = data[`optionsForDataField`].filter(
        (item) => item.title === entity
      );
      updateDataCatalog({
        entity: entity,
        expression: expression,
        fieldName: fieldname_old,
        fieldNameNew: fieldname,
        schema: schema,
        columnFilter: filtered.length ? filtered[0].columnFilter : "false",
      })
        .then((response) => {
          if (response.status === 200) {
            toggler[i].childNodes[1].childNodes[
              idx
            ].childNodes[1].classList.toggle("d-none");
            alert(`Column updated successfully!`);
            getDataCatalog();
          }
        })
        .catch((error) => console.error(error.message));
    }
  };

  const deleteData = (i, idx, entity, fieldname, schema) => {
    let toggler = document.querySelectorAll(".tree-list > li");
    if (window.confirm("Are you sure you want to delete?")) {
      deleteDataCatalog({
        entity: entity,
        fieldName: fieldname,
        schema: schema,
      })
        .then((response) => {
          if (response.status === 200) {
            toggler[i].childNodes[1].childNodes[
              idx
            ].childNodes[1].classList.toggle("d-none");
            alert(`Column deleted successfully!`);
            getDataCatalog();
          }
        })
        .catch((error) => console.error(error.message));
    }
  };

  const getDataCatalog = () => {
    setIsLoading(true);
    dataCatalog(props.token)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    getDataCatalog();
  }, []);

  return (
    <>
      {!isLoading ? (
        <ul
          className="tree-list list-inline"
          style={{ font: "Roberto", fontWeight: "bold" }}
        >
          {data[`optionsForDataField`].map((x, i) => (
            <li key={i} className="my-1 cursor-pointer">
              <span onClick={() => showChild(i)}>
                <Icon className="align-middle">arrow_right</Icon>
                {x.title}
              </span>
              <ul className="list-inline pl-4 d-none">
                <li className="add-new-item">
                  <Button color="primary" onClick={() => addNewItem(i)}>
                    <Icon className="align-middle" style={{ fontSize: "1rem" }}>
                      add
                    </Icon>
                    Add new column
                  </Button>
                  <div className="position-relative border rounded mb-2 d-none">
                    <input
                      className="form-control border-bottom"
                      placeholder="Column name..."
                      style={{ border: 0, borderRadius: 0, boxShadow: "none" }}
                    />
                    <textarea
                      className="form-control border-0"
                      placeholder="Write expression here..."
                      style={{ boxShadow: "none" }}
                    />
                    <div className="d-flex justify-content-between">
                      <Button
                        color="primary"
                        onClick={() =>
                          addData(i, x.type, x.title, x.schema, x.columnFilter)
                        }
                      >
                        ADD
                      </Button>
                      <Button color="primary" onClick={() => addNewItem(i)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </li>
                {x.children.map((w, idx) => (
                  <li key={idx} className="py-1 pl-2 cursor-pointer">
                    <span onClick={() => showTextarea(i, idx + 1)}>
                      {w.title}
                    </span>
                    <div className="position-relative border rounded my-2 d-none">
                      {x.children.length > 1 && (
                        <Button
                          color="primary"
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "-36px",
                          }}
                          onClick={() =>
                            deleteData(i, idx + 1, x.title, w.title, x.schema)
                          }
                        >
                          <Icon className="align-middle" title="Delete Column">
                            delete_forever
                          </Icon>
                        </Button>
                      )}
                      <Button
                        color="primary"
                        style={{ position: "absolute", right: 0, top: 0 }}
                        onClick={() => props.onSelectTableData([w.title])}
                      >
                        {`USE COLUMN`}
                      </Button>
                      <input
                        className="form-control border-bottom"
                        placeholder="Column name..."
                        defaultValue={w.title}
                        style={{
                          border: 0,
                          borderRadius: 0,
                          boxShadow: "none",
                        }}
                      />
                      <textarea
                        className="form-control border-0"
                        placeholder="Write expression here..."
                        defaultValue={w.expression}
                        style={{ boxShadow: "none" }}
                      />
                      <div className="d-flex justify-content-between">
                        <Button
                          color="primary"
                          onClick={() =>
                            updateData(
                              i,
                              idx + 1,
                              x.type,
                              x.title,
                              w.title,
                              x.schema
                            )
                          }
                        >
                          UPDATE
                        </Button>
                        {w.expression.length > 0 && (
                          <Button
                            color="primary"
                            onClick={() => getTextareaValue(i, idx + 1)}
                          >
                            USE EXPRESSION
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <Loader className="mt-0 text-center" />
      )}
    </>
  );
};

export const ParameterTreeList = ({ treeData, onSelectTableData }) => {
  const showChild = (i) => {
    let toggler = document.querySelectorAll(".tree-list > li > span");
    toggler[i].closest("li").childNodes[1].classList.toggle("d-none");
  };

  return (
    <>
      <ul
        className="tree-list list-inline"
        style={{ font: "Roberto", fontWeight: "bold" }}
      >
        {treeData.map((item, index) => (
          <li className="my-1 cursor-pointer">
            <span>
              <Icon onClick={() => showChild(index)} className="align-middle">
                arrow_right
              </Icon>
              <span onClick={(e) => onSelectTableData([item.key])}>
                {item.title}
              </span>
            </span>
            <ul className="border font-weight-normal list-inline pl-4 d-none">
              <li
                className="py-1 pl-2"
                onClick={(e) => onSelectTableData([item.key])}
              >
                <span>{item.value ? item.value : "N/A"}</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export const OperatorTreeList = ({ treeData, onSelectTableData }) => {
 
  return (
    <>
      <ul
        className="tree-list list-inline"
        style={{ font: "Roberto", fontWeight: "bold" }}
      >
        {treeData.map((item, index) => (
          <li className="my-1 cursor-pointer">
            <span onClick={(e) => onSelectTableData([item.key])}>
            <Popover
            className="text-center"
            content={
              <div className="p-2">
                <span><b>{operatorList[index].description}</b></span>
              </div>
              }
              trigger="hover">
              <Icon className="align-middle mr-2" style={{fontSize:"1.2rem"}}>info</Icon>
              </Popover>
              <span >
                {item.title}
              </span>
            </span>
            {/* <ul className="border font-weight-normal list-inline pl-4 d-none">
              <li
                className="py-1 pl-2"
                onClick={(e) => onSelectTableData([item.key])}
              >
                <span>{item.value ? item.value : "N/A"}</span>
              </li>
            </ul> */}
          </li>
        ))}
      </ul>
    </>
  );
};
export default NodeDrawer;
