import React from "react";
import { TextField, Icon } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const classes = {
  control: {
    width: "15rem",
    marginLeft: "0rem",
  },
};

const AddAttributeRule = (props) => {
  let menuItem = [
    { key: "=", val: "=" },
    { key: ">", val: ">" },
    { key: "<", val: "<" },
    { key: ">=", val: ">=" },
    { key: "<=", val: "<=" },
  ];
  if (props.rule.type === "value") {
    menuItem = [
      ...menuItem,
      { key: "in", val: "in" },
      { key: "not in", val: "not in" },
      { key: "range", val: "Between range" },
    ];
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "0.5rem",
        }}
      >
        <div className="">
          <h7 className="ml-3 font-weight-bold">
            Rule {props.r + 1}
            {props.r !== 0 && (
              <Icon
                style={{
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={() =>
                  props.handleRemoveAttributeRuleClick(props.i, props.r)
                }
              >
                delete
              </Icon>
            )}
          </h7>
        </div>
        <div className="ml-3 float-left">
          {props.formSelectRuleField(
            "type",
            `Type`,
            { width: "15rem" },
            props.optType,
            props.i,
            props.r
          )}
        </div>
        <div className="ml-3 float-left">
          <TextField
            select
            disabled={
              ["dataType", "primaryKey"].includes(props.rule.type)
                ? true
                : false
            }
            className="custom-txtfield"
            style={{ width: "10rem" }}
            label="Severity"
            name="severity"
            variant="outlined"
            value={props.rule.severity || ""}
            onChange={(e) => props.handleSelectRuleChange(e, props.i, props.r)}
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
        {["dataType"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              select
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Data Type"
              name="dataType"
              variant="outlined"
              value={props.rule.dataType || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            >
              <MenuItem key="1" value="">
                Select Data Type
              </MenuItem>
              <MenuItem key="int" value="int">
                int
              </MenuItem>
              <MenuItem key="float" value="float">
                float
              </MenuItem>
              <MenuItem key="date" value="date">
                date
              </MenuItem>
              <MenuItem key="datetime" value="datetime">
                datetime
              </MenuItem>
              <MenuItem key="string" value="string">
                string
              </MenuItem>
            </TextField>
          </div>
        ) : null}
        {["", "length", "value"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              select
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Operator"
              name="operator"
              variant="outlined"
              value={props.rule.operator || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            >
              {menuItem.map((menuItem, m) => {
                return (
                  <MenuItem key={m} value={menuItem.key}>
                    {menuItem.val}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
        ) : null}
        {["length", "primaryKey"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              type="number"
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Value"
              name="value"
              variant="outlined"
              value={props.rule.value || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
              InputProps={{
                inputProps: {
                  max: props.rule.type==="primaryKey"?10:500,
                  min: 1,
                },
              }}
            />
          </div>
        ) : null}
        {["dateConversion"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              type="date"
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Input Format"
              name="inputFormat"
              variant="outlined"
              value={props.rule.inputFormat || "dd/mm/yyyy"}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue="dd/mm/yyyy"
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            />
          </div>
        ) : null}
        {["dateConversion"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              type="date"
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Output Format"
              name="outputFormat"
              variant="outlined"
              value={props.rule.outputFormat || "dd/mm/yyyy"}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue="dd/mm/yyyy"
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            />
          </div>
        ) : null}
        {["value"].includes(props.rule.type) ? (
          props.rule.operator === "range" ? (
            <>
            <div className="ml-3 float-left">
              <TextField
                className="custom-txtfield"
                style={{ width: "5rem" }}
                label="Min"
                name="min"
                variant="outlined"
                value={props.rule.min || ""}
                onChange={(e) =>
                  props.handleSelectRuleChange(e, props.i, props.r)
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
              value={props.rule.max || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
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
                value={props.rule.value || ""}
                onChange={(e) =>
                  props.handleSelectRuleChange(e, props.i, props.r)
                }
              />
            </div>
          )
        ) : null}
        
        {["custom"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Rule"
              name="ruleMaster"
              variant="outlined"
              value={props.rule.ruleMaster || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            />
          </div>
        ) : null}
        {["regEx"].includes(props.rule.type) ? (
          <div className="ml-3 float-left">
            <TextField
              className="custom-txtfield"
              style={{ width: "10rem" }}
              label="Value"
              name="value"
              variant="outlined"
              value={props.rule.ruleMaster || ""}
              onChange={(e) =>
                props.handleSelectRuleChange(e, props.i, props.r)
              }
            />
          </div>
        ) : null}

        <div className="clearfix"></div>
      </div>
    </>
  );
};
export default AddAttributeRule;
