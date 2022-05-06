import React from "react";
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import util from "../../../../utilities/util";

const KPIAnalysisParameters = ({
  parameterList,
  formControl,
  availableParameterList,
  handleAddParameterClick,
  handleSelectedParameterChange,
  handleRemoveParameterClick,
  handleParameterQuery
}) => {
  return (
    <>
      <div
        style={{
          overflowY: "scroll",
          height: "36rem",
          boxShadow: "inset 0px -11px 11px -10px #f1f0f0",
        }}
      >
        {parameterList.map((parm, listIdx) => {
          return (
            <div id="metrics-section" key={listIdx}>
              <div className="mt-2 ml-2">
                <span className="ml-5 font-weight-bold d-flex flex-row align-items-end">
                  <span>Parameter {listIdx + 1}</span>
                  {listIdx !== 0 ? (
                    <Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveParameterClick(listIdx)}
                    >
                      delete
                    </Icon>
                  ) : (
                    <span>-Primary parameter</span>
                  )}
                </span>
              </div>
              <div className="mt-3 ml-5">
                <span className="ml-5 font-weight-bold">Parameter Name</span>
                <span style={{ fontSize: "12px" }}>
                  <i>(Examples: Param1,Param2,Param3 etc.)</i>
                </span>
              </div>
              <div className="ml-5">
                <FormControl variant="outlined" className={formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Available Parameters
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={parm.key}
                    onChange={(e) => handleSelectedParameterChange(e, listIdx)}
                    label="Available Metrics"
                  >
                    {availableParameterList.map((avlMetrics, i) => (
                      <MenuItem key={i} value={avlMetrics.key}>
                        {avlMetrics.parameterName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="ml-5">
                <span className="ml-5 font-weight-bold">Description</span>
              </div>
              <div className="ml-5">
                <FormControl className={formControl}>
                  <TextField
                    multiline
                    rows={4}
                    disabled={true}
                    name="parameterDescription"
                    value={parm.parameterDescription}
                    variant="outlined"
                    placeholder="Description"
                  />
                </FormControl>
              </div>
              <div className="ml-5">
                <span className="ml-5 font-weight-bold">Data Type</span>
              </div>
              <div className="ml-5">
                <FormControl className={formControl}>
                  <TextField
                    disabled={true}
                    name="parameterType"
                    value={parm.parameterType}
                    variant="outlined"
                    placeholder="Data Type"
                  />
                </FormControl>
              </div>
              <div className="ml-5">
                <span className="ml-5 font-weight-bold">Data Value</span>
              </div>
              <div className="ml-5">
                <FormControl className={formControl}>
               
          <TextField
            size="small"
            label={parm.parameterType != 'DATE' && 'Value'}
            onChange={(e) => handleParameterQuery(e.target.value, listIdx, `input`)}
            name="parameterValue"
            value={parm.parameterValue}
            variant="outlined"
            type={`${parm.parameterType}`}
            InputProps={{
              onKeyDown: parm.parameterType==="NUMBER" && util.blockInvalidChar,
            }}
            required
          />
       
                  {/* <TextField 
                    name="parameterValue"
                    value={parm.parameterValue}
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Data Value"
                    onChange={(e) => handleParameterQuery(e.target.value, listIdx, `input`)}
                  /> */}
                </FormControl>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        component="button"
        variant="body2"
        style={{
          marginLeft: "6rem",
          marginTop: "1rem",
        }}
        onClick={() => handleAddParameterClick()}
      >
        + ADD NEW PARAMETER
      </Button>
    </>
  );
};

export default KPIAnalysisParameters;
