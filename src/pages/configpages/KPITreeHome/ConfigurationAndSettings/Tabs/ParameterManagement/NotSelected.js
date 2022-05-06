import { Icon } from "@material-ui/core";
import React from "react";
import { CONTEXT } from "../../../../../../config";

const NotSelected = () => {
  return (
    <div className="text-center">
      <img className="img-200" src={`${CONTEXT}/groups.svg`} alt="No Parameters selected" />
        <div className="h-3">No Parameter selected</div>
        <p>Select a parameters to see its details</p>
    </div>
  );
};

export default NotSelected;
