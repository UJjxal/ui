import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MuiTable.css"; // remove Hide option from columnMenu

const DataGridTbl = (props) => {
  // call this function if Table header is not passed
  const tableHeader = () => {
    const record = props.rows;
    var column = [];
    if (record) {
      var keys = Object.keys(props.rows[0]);
      keys.forEach((item, index) => {
        column.push({
          field: item,
          //flex: 1,
          width: 200,
          cellClassName: props.errorColumn === item ? "border-error" : "",
          hide: props.showDefaultColumn
            ? index > props.showDefaultColumn && item != props.errorColumn
              ? true
              : false
            : false,
          headerName: item,
          // headerName:
          //   item.charAt(0).toUpperCase() +
          //   item
          //     .slice(1)
          //     .replace(/([A-Z])/g, " $1")
          //     .trim(),
        });
      });
    }
    return column;
  };

  /**temp function for rows */
  const getRowData = (data = []) => {
    let rows = [];
    try {
      data.forEach((data, index) => {
        rows.push({ ...data, id: index });
      });
    } catch (error) {
      console.log("getRowData", error);
    }
    return rows;
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      {props.rows ? (
        <DataGrid
          rows={getRowData(props.rows)}
          columns={props.columns ? props.columns : tableHeader()}
          sortModel={props.sortModel ? props.sortModel : null}
          showToolbar={props.showToolbar ? true : false}
          disableColumnSelector={false}
        />
      ) : null}
    </div>
    // remove Hide option from columnMenu in CSS
  );
};

export default DataGridTbl;
