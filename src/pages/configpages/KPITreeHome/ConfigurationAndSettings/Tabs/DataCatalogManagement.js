import React, { useEffect, useState, useCallback } from "react";
import {
  Icon,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment, Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  dataCatalog,
  addDataCatalog,
  updateDataCatalog,
  updateDataCatalogTable,
  deleteDataCatalog,
} from "./../../../../../components/DataCatalog";

const DataCatalogManagement = () => {
  const [newTable, setNewTable] = useState(false);
  const [newColumn, setNewColumn] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [data, setData] = useState({
    optionsForDataField: [],
    optionsForDataTable: [],
    optionsForEditorTable: [],
  });
  const [table, setTable] = useState([]);
  const [column, setColumn] = useState([]);
  const [selected, setSelected] = useState({
    schema: "",
    entity: "",
    fieldName: "",
    expression: "",
    type: "",
    columnFilter: false,
    filterExpression: "",
  });
  const [isAlert, setAlert] = useState({status: false, severity: 'success', origin:"right", message: ''});

  const getDataCatalog = () => {
    dataCatalog()
      .then((response) => setData(response))
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    getDataCatalog();
  }, []);

  // handle value for dropdowns

  const handleSchema = (value) => {
    const filteredTable = data[`optionsForDataField`].filter(
      (item) => item.schema === value
    );
    setTable(filteredTable);
    setSelected({
      ...selected,
      schema: value,
      entity: "",
      fieldName: "",
      expression: "",
    });
  };
  const handleDataTable = (value) => {
    const filteredColumn = data[`optionsForDataField`].filter(
      (item) => item.key === value
    );
    setColumn(filteredColumn[0].children);
    setSelected({
      ...selected,
      entity: value,
      type: filteredColumn[0].type,
      fieldName: "",
      columnFilter: false,
      expression: "",
    });
  };
  const handleDataField = (value) => {
    const filteredExpression = column.filter((item) => item.title === value);
    setSelected({
      ...selected,
      expression: filteredExpression[0].expression,
      fieldName: value,
      columnFilter:
      filteredExpression[0].columnFilter && filteredExpression[0].columnFilter.length > 0
          ? JSON.parse(filteredExpression[0].columnFilter)
          : "false",
      filterExpression: filteredExpression[0].filterExpression,
    });
  };

  // handle data table

  const handleEditTable = (value) => {
    if (selected.entity === "") {
      //alert(`Please select table!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please select table!'});
      return false;
    }
    setNewTable(true);
    setEditTable(true);
    setSelected({
      ...selected,
      entity: selected.entity || "",
      entity_old: value,
    });
  };

  const handleAddDataTable = () => {
    if (selected.entity === "") {
      //alert(`Please add table name!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please add table name!'});
      return false;
    }

    const duplicate = table.find((x) => x.key === selected.entity);
    if (duplicate !== undefined) {
      //window.alert("Table already exists!");
      setAlert({status:true, severity:"error", origin:"right", message: 'Table already exists!'});
      return false;
    }

    const data = {
      ...selected,
      fieldName: "temp",
      expression: "",
      type: "DataField",
    };

    addDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Table added successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Table added successfully!'});
          setNewTable(false);
          setTable([]);
          getDataCatalog();
          setSelected({ ...selected, schema: "", entity: "" });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataTable = () => {
    if (selected.entity === "") {
      //alert(`Please add table name!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please add table name!'});
      return false;
    }

    const self = selected.entity === selected.entity_old;
    const duplicate = column.find((x) => x.key === selected.entity);
    if (duplicate !== undefined && !self) {
      window.alert("Table already exists!");
      return false;
    }

    const data = {
      schema: selected.schema,
      entityNew: selected.entity,
      entity: selected.entity_old,
    };

    updateDataCatalogTable(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Table updated successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Table updated successfully!'});
          setNewTable(false);
          setTable([]);
          getDataCatalog();
          setSelected({
            ...selected,
            schema: "",
            entity: "",
            fieldname: "",
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteDataTable = () => {
    if (selected.entity === "") {
      //alert(`Please select table!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please select table!'});
      return false;
    }

    if (!window.confirm("Are you sure you want to delete?")) {
      return false;
    }

    const data = { schema: selected.schema, entity: selected.entity };

    deleteDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Table deleted successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Table deleted successfully!'});
          setTable([]);
          setColumn([]);
          getDataCatalog();
          setSelected({
            ...selected,
            schema: "",
            entity: "",
            fieldName: "",
            columnFilter: false,
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  // handle data field

  const handleEditColumn = (value) => {
    if (selected.fieldName === "") {
      //alert(`Please select column!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please select column!'});
      return false;
    }
    setNewColumn(true);
    setEditColumn(true);
    setSelected({
      ...selected,
      fieldNameNew: selected.fieldName || "",
      fieldName: value,
    });
  };

  const handleAddDataField = () => {
    if (selected.fieldName === "") {
      //alert(`Please add column name!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please add column name!'});
      return false;
    }

    const duplicate = column.find((x) => x.key === selected.fieldName);
    if (duplicate !== undefined) {
      //window.alert("Column already exists!");
      setAlert({status:true, severity:"error", origin:"right", message: 'Column already exists!'});
      return false;
    }

    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
      expression: selected.expression,
      type: selected.type,
      columnFilter: false,
    };

    addDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Column added successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Column added successfully!'});
          setNewColumn(false);
          getDataCatalog();
          setSelected({ 
            schema: selected.schema,
            entity: "",
            fieldName: "",
            expression: "",
            type: "",
            columnFilter: false,
            filterExpression: ""});
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataField = () => {
    if (selected.fieldName === "") {
      //alert(`Please add column name!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please add column name!'});
      return false;
    }

    const self = selected.fieldName === selected["fieldNameNew"];
    const duplicate = column.find((x) => x.key === selected.fieldName);
    if (duplicate !== undefined && !self) {
      //window.alert("Column already exists!");
      setAlert({status:true, severity:"error", origin:"right", message: 'Column already exists!'});
      return false;
    }

    let data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
      expression: selected.expression,
      type: selected.type,
      columnFilter: selected.columnFilter,
      filterExpression: selected.filterExpression,
    };

    if('fieldNameNew' in selected){
      data = {...data, fieldNameNew: selected['fieldNameNew']}
    }

    updateDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Column data updated successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Column data updated successfully!'});
          setNewColumn(false);
          setColumn([]);
          getDataCatalog();
          setSelected({
            schema: "",
            entity: "",
            fieldName: "",
            expression: "",
            type: "",
            columnFilter: false,
            filterExpression: ""
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteDataField = () => {
    if (selected.fieldName === "") {
      //alert(`Please select column!`);
      setAlert({status:true, severity:"error", origin:"right", message: 'Please select column!'});
      return false;
    }

    if (column.length < 2) {
      //alert("Column list can't be empty!");
      setAlert({status:true, severity:"error", origin:"right", message: `Column list can't be empty!`});
      return false;
    }

    if (!window.confirm("Are you sure you want to delete?")) {
      return false;
    }

    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
    };

    deleteDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Column deleted successfully!`);
          setAlert({status:true, severity:"success", origin:"right", message: 'Column deleted successfully!'});
          setColumn([]);
          getDataCatalog();
          setSelected({
            ...selected,
            entity: "",
            fieldName: "",
            columnFilter: false,
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataExpression = () => {
    if (selected.fieldName === "") {
      //alert(`Please select column!`);
      setAlert({status:true, severity:"error", origin:"right", message: `Please select column!`});
      return false;
    }
    if (selected.columnFilter === true && selected.filterExpression === "") {
      //alert(`Please add filter expression!`);
      setAlert({status:true, severity:"error", origin:"right", message: `Please add filter expression!`});
      return false;
    }
    handleUpdateDataField();
  };

  // handle cloumn as filter

  const handleColumnFilter = (val) => {
    if (selected.fieldName === "") {
      //alert(`Please select column!`);
      setAlert({status:true, severity:"error", origin:"right", message: `Please select column!`});
      return false;
    }

    setSelected({ ...selected, columnFilter: val });

    // const data = {
    //   action: `column`,
    //   schema: selected.schema,
    //   entity: selected.entity,
    //   //fieldNameNew: selected.fieldName,
    //   fieldName: selected.fieldName,
    //   expression: selected.expression,
    //   type: selected.type,
    //   columnFilter: val,
    //   filterExpression: selected.filterExpression,
    // };

    // updateDataCatalog(data)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       alert(`Column Filter updated!`);
    //       getDataCatalog();
    //       setSelected({ ...selected, entity: "", fieldName: "", columnFilter: false });
    //     }
    //   })
    //   .catch((error) => console.error(error.message));
  };

  const handleColumnFilterExpression = () => {
    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
      expression: selected.expression,
      type: selected.type,
      columnFilter: selected.columnFilter,
      filterExpression: selected.filterExpression,
    };

    updateDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          //alert(`Filter Expression updated!`);
          setAlert({status:true, severity:"success", origin:"right", message: `Filter Expression updated!`});
          getDataCatalog();
          setColumn([]);
          setSelected({
            ...selected,
            filterExpression: selected.filterExpression,
            entity: "",
            fieldName: "",
            columnFilter: false
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (<>
    <div className="d-flex flex-column">
      <h6 className="mb-4">Data Catalog Management</h6>
      <FormControl variant="outlined" style={{ width: "25rem" }}>
        <InputLabel id="demo-simple-select-outlined-label">
          Select Schema
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selected.schema}
          onChange={(event) => handleSchema(event.target.value)}
          label="Select Schema"
          placeholder="Select Schema"
        >
          {[
            ...new Map(
              data["optionsForDataField"].map((item) => [item[`schema`], item])
            ).values(),
          ].map(({ schema }, i) => (
            <MenuItem key={i} value={schema}>
              {schema}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="d-flex align-center mt-5">
        <div className="position-relative">
          {!newTable ? (
            <FormControl variant="outlined" style={{ width: "25rem" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Select Table
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selected.entity}
                onChange={(event) => handleDataTable(event.target.value)}
                label="Select Table"
                placeholder="Select Table"
              >
                {table.map(({ key, title }) => (
                  <MenuItem key={key} value={key}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl variant="outlined" style={{ width: "25rem" }}>
              <InputLabel htmlFor="demo-simple-select-outlined-label">
                Add Table
              </InputLabel>
              <OutlinedInput
                id="demo-simple-select-outlined-label"
                label="Add Table"
                placeholder="Add Table"
                value={selected.entity}
                onChange={(event) =>
                  setSelected({ ...selected, entity: event.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    {!editTable ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={selected.schema !== "" ? false : true}
                        style={{ backgroundColor: "#3f88c5" }}
                        onClick={() => handleAddDataTable()}
                      >
                        {`+ Add Table`}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#3f88c5" }}
                        onClick={() => handleUpdateDataTable()}
                      >
                        {`Update`}
                      </Button>
                    )}
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          )}
          <Button
            color="primary"
            className="outline-none"
            style={{ position: "absolute", right: 0, bottom: "-36px" }}
            onClick={() => {
              setNewTable(!newTable);
              setEditTable(false);
              setNewColumn(false);
              setColumn([]);
              setSelected({
                ...selected,
                entity: "",
                fieldName: "",
                expression: "",
              });
            }}
          >
            {!newTable ? `+ Add New Table` : `Select from existing table`}
          </Button>
        </div>
        {!newTable && (
          <>
            <Button color="primary" className="ml-3 outline-none">
              <Icon
                className="align-middle"
                title="Edit Table"
                onClick={() => handleEditTable(selected.entity)}
              >
                drive_file_rename_outline
              </Icon>
            </Button>
            <Button color="primary" className="outline-none">
              <Icon
                className="align-middle"
                title="Delete Table"
                onClick={() => handleDeleteDataTable()}
              >
                delete_forever
              </Icon>
            </Button>
          </>
        )}
      </div>
      {!newTable && (
        <div className="d-flex align-center mt-5 pt-3">
          <div className="position-relative">
            {!newColumn ? (
              <FormControl variant="outlined" style={{ width: "25rem" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Column
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selected.fieldName}
                  onChange={(event) => handleDataField(event.target.value)}
                  label="Select Column"
                  placeholder="Select Column"
                >
                  {column.map(({ key, title }) => (
                    <MenuItem key={key} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl variant="outlined" style={{ width: "25rem" }}>
                <InputLabel htmlFor="demo-simple-select-outlined-label">
                  Add Column
                </InputLabel>
                <OutlinedInput
                  id="demo-simple-select-outlined-label"
                  label="Add Column"
                  placeholder="Add Column"
                  value={("fieldNameNew" in selected) ? selected["fieldNameNew"] : selected.fieldName}
                  onChange={(event) =>
                    editColumn ?
                      setSelected({ ...selected, fieldNameNew: event.target.value }) :
                      setSelected({ ...selected, fieldName: event.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {!editColumn ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={selected.entity !== "" ? false : true}
                          style={{ backgroundColor: "#3f88c5" }}
                          onClick={() => handleAddDataField()}
                        >
                          {`+ Add Column`}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "#3f88c5" }}
                          onClick={() => handleUpdateDataField()}
                        >
                          {`Update`}
                        </Button>
                      )}
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            )}
            <Button
              color="primary"
              className="outline-none"
              style={{ position: "absolute", right: 0, bottom: "-36px" }}
              onClick={() => {
                setNewColumn(!newColumn);
                setEditColumn(false);
                setSelected({
                  schema: selected.schema,
                  entity: selected.entity,
                  fieldName: "",
                  expression: "",
                  type: "",
                  columnFilter: false,
                  filterExpression: ""
                });
              }}
            >
              {!newColumn ? `+ Add New Column` : `Select from existing Columns`}
            </Button>
          </div>
          {!newColumn && (
            <>
              <Button
                color="primary"
                className="ml-3 outline-none"
                onClick={() => handleEditColumn(selected.fieldName)}
              >
                <Icon className="align-middle" title="Edit Column">
                  drive_file_rename_outline
                </Icon>
              </Button>
              <Button
                color="primary"
                className="outline-none"
                onClick={() => handleDeleteDataField()}
              >
                <Icon className="align-middle" title="Delete Column">
                  delete_forever
                </Icon>
              </Button>
            </>
          )}
        </div>
      )}
      {!newColumn && !newTable && (
        <>
          <FormControlLabel
            style={{ width: "14rem" }}
            label="Use this column as filter"
            control={
              <Checkbox
                color="primary"
                checked={selected.columnFilter}
                onChange={(e) => handleColumnFilter(!selected.columnFilter)}
              />
            }
          />
          {selected.columnFilter && selected.fieldName !== "" && (
            <>
              <h6 className="mt-5 pt-3">Filter Expression</h6>
              <div className="border rounded" style={{ width: "25rem" }}>
                <textarea
                  className="form-control border-0"
                  placeholder="Write expression here..."
                  style={{ boxShadow: "none", minHeight: "90px" }}
                  value={selected.filterExpression}
                  onChange={(event) =>
                    setSelected({
                      ...selected,
                      filterExpression: event.target.value,
                    })
                  }
                />
                {/* <div className="text-right">
                  <Button
                    color="primary"
                    className="outline-none"
                    onClick={() => handleColumnFilterExpression()}
                  >
                    Submit
                  </Button>
                </div> */}
              </div>
            </>
          )}
          <h6 className="mt-5 pt-3">Expression</h6>
          <div className="border rounded mb-3" style={{ width: "42rem" }}>
            <textarea
              className="form-control border-0"
              placeholder="Write expression here..."
              style={{ boxShadow: "none", minHeight: "90px" }}
              value={selected.expression}
              onChange={(event) =>
                setSelected({ ...selected, expression: event.target.value })
              }
            />
            {/* <div className="text-right">
              <Button
                color="primary"
                className="outline-none"
                onClick={() => handleUpdateDataExpression()}
              >
                UPDATE
              </Button>
            </div> */}
          </div>
          <div className="mb-5">
            <Button color="primary" size="small" variant="contained"
              onClick={() => handleUpdateDataExpression()}>
              SUBMIT
            </Button>
          </div>
        </>
      )}
    </div>

    <Snackbar open={isAlert.status} autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: isAlert.origin }}
      onClose={() => setAlert({ ...isAlert, status: false })}>
      <Alert variant="filled" severity={isAlert.severity} sx={{ width: '100%' }}>{isAlert.message}</Alert>
    </Snackbar>
  </>);
};


export default DataCatalogManagement;
