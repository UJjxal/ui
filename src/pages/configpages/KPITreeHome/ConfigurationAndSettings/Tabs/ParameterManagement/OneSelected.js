import { Icon} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import ParameterForm from "./ParameterForm";

const OneSelected = ({ selectedItem, getParameterList, deleteParameter }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const setEdit = (val) => {
    setToggleEdit(val);
  };
  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <div className="d-flex justify-content-between border-bottom pb-3 mb-4">
        <div className="h-4 text-dark">
          {toggleEdit ? "Edit Parameter Details" : "Parameter Details"}
        </div>
        <div className="text-primary-blue">
          <Icon onClick={(e) => deleteParameter(selectedItem)} className="mr-3">
            delete_outlined
          </Icon>
          <Icon onClick={() => setEdit(true)}>edit_outlined</Icon>
        </div>
      </div>
      {toggleEdit ? (
        <ParameterForm
          setEdit={setEdit}
          selectedItem={selectedItem}
          getParameterList={getParameterList}
        />
      ) : (
        <div>
          <div>
            <div className="text-primary-default">Name</div>
            {selectedItem.parameterName}
          </div>
          <hr />
          <div>
            <div className="text-primary-default">Description</div>
            {selectedItem.parameterDescription}
          </div>
          <hr />
          <div>
            <div className="text-primary-default">Data Type</div>
            {selectedItem.parameterType}
          </div>
          <hr />
          <div>
            <div className="text-primary-default">Data Value</div>
            {selectedItem.parameterValue}
          </div>
        </div>
      )}
    </div>
  );
};

export default OneSelected;
