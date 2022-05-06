import React, { useState } from "react";
import { Drawer, Radio } from "antd";
import {
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
} from "@material-ui/core";

const EditNodeDrawer = (props) => {
  return (
    <>
      <Drawer
        title="Node Details"
        width={415}
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
        className="border-0"
      >
        <TextField
          value={props.selectedNode.name}
          fullWidth
          label="Node Name"
          variant="outlined"
          className="pb-4"
        />
        <div className="d-flex justify-content-around">
          <Button
            type="submit"
            className="bg-primary-blue text-white mr-2"
            fullWidth
          >
            Save
          </Button>
          <Button
            variant="outlined"
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default EditNodeDrawer;
