import { Button } from "@material-ui/core";
import React from "react";
import { CONTEXT } from "../../../../../../config";

const MultipleSelected = ({ selectedRows, onSelectChange, deleteParameter }) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex justify-content-center w-100">
        <img
          className="img-200"
          src={`${CONTEXT}/groups.svg`}
          alt="Group"
        />
      </div>
      <div className="align-items-center d-flex flex-column justify-content-center">
        <div className="h-3">{selectedRows.length} Parameters selected</div>
        <p>Uncheck and click on param name to see details of one.</p>
        <div className="d-flex justify-content-center w-100 pt-3">
          <Button
            type="submit"
            variant="contained"
            className="bg-primary-blue text-white mr-2"
            onClick={(e)=>deleteParameter(selectedRows)}
          >
            Delete Parameters ({selectedRows.length})
          </Button>
          <Button variant="outlined" onClick={() => onSelectChange([])}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleSelected;
