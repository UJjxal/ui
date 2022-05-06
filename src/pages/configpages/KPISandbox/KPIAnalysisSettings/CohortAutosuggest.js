import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const CohortAutosuggest = ({
  input,
  options,
  value,
  label,
  margin,
  required,
  returnId,
  cohortIndex,
  handler
}) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) =>
    //   (typeof option === "string" && returnId
    //     ? options.find((c) => c._id === option)
    //     : option
    //   )?.name
    option
    }
    value={value}
    onChange={(event, newValue) => {
        console.log("new value", newValue);
      handler(input, newValue, cohortIndex);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        margin={margin}
        required={required}
        variant="outlined"
      />
    )}
  />
);


export default CohortAutosuggest;
