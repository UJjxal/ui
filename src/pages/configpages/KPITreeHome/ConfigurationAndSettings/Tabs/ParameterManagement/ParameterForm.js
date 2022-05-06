import React, { useEffect, useState, useContext } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import kpiService from "../../../../../../services/kpiService";
import util from "../../../../../../utilities/util";
import { AppContext } from "../../../../../../AppProvider";

const ParameterForm = ({
  setEdit,
  selectedItem,
  getParameterList,
  toggleCreate,
  originalParameterList,
}) => {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({
    parameterName: "",
    parameterDescription: "",
    parameterType: "",
    parameterValue: "",
  });
  const [isAlert, setAlert] = useState({status: false, message: ''});

  useEffect(() => {
    selectedItem &&
      setFormData({
        parameterName: selectedItem.parameterName,
        parameterDescription: selectedItem.parameterDescription,
        parameterType: selectedItem.parameterType,
        parameterValue: selectedItem.parameterValue,
      });
  }, []);
  const resetForm = () => {
    setFormData({
      parameterName: "",
      parameterDescription: "",
      parameterType: "",
      parameterValue: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      const updateData = formData;
      updateData.parameterId = selectedItem.key;
    }
    selectedItem
      ? kpiService
          .updateParameters(formData)
          .then(({ data }) => {
            if (data.code === 200) {
              //getParameterList();
              //setAlert({status:true, severity:"success", message: 'Parameter updated successfully!'});
              appContext.useSnackBar({status:true, severity:"success", message: 'Parameter updated successfully!'});
              setTimeout(() => {getParameterList();}, 3000) 
            }
          })
          .catch((error) => setAlert({tatus:true, severity:"error", message: error?.message}))
      : kpiService
          .createParameters(formData)
          .then(({ data }) => {
            if (data.code === 201) {
              //if (data.code === 201 && !originalParameterList.map(el => el.parameterName.toLowerCase()).includes(formData.parameterName.toLowerCase())) {
              //getParameterList();
              
              setAlert({status:true, severity:"success", message: 'Parameter created successfully!'});
              setTimeout(() => {
                toggleCreate();
                resetForm();
                getParameterList();
              }, 3000)
            }
            else{
              setAlert({status:true, severity:"error", message: data?.message});
            }
          })
          .catch((error) => setAlert({status:true, severity:"error", message: error?.message}))
        
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setFormData({ ...formData, [name]: value });
  };

  const dropdownValues = [
    {
      type:'STRING',
      value:'String'
    },
    {
      type:'DATE',
      value:'Date'
    },
    {
      type:'NUMBER',
      value:'Integer'
    },
  ]

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className="pb-4">
          <TextField
            size="small"
            label="Name"
            onChange={handleChange}
            name="parameterName"
            value={formData.parameterName}
            variant="outlined"
            disabled={selectedItem?true:false}
            required
          />
        </FormControl>
        <FormControl fullWidth className="pb-4">
          <TextField
            size="small"
            label="Description"
            onChange={handleChange}
            name="parameterDescription"
            value={formData.parameterDescription}
            variant="outlined"
            disabled={selectedItem?true:false}
            required
          />
        </FormControl>
        <FormControl fullWidth className="pb-4">
          <InputLabel id="demo-simple-select-label" className="label-mui">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="select-mui"
            value={formData.parameterType}
            onChange={handleChange}
            name="parameterType"
            variant="outlined"
            label="Type"
            disabled={selectedItem?true:false}
          >
            {dropdownValues.map(item => <MenuItem value={item.type}>{item.value}</MenuItem> )}
          </Select>
          {/* <TextField
            size="small"
            label="Type"
            onChange={handleChange}
            name="parameterType"
            value={formData.parameterType}
            variant="outlined"
            InputProps={{
              readOnly: selectedItem?true:false,
            }}
            required
          /> */}
        </FormControl>
        <FormControl fullWidth className="pb-4">
          <TextField
            size="small"
            label={formData.parameterType != 'DATE' && 'Value'}
            onChange={handleChange}
            name="parameterValue"
            value={formData.parameterValue}
            variant="outlined"
            type={`${formData.parameterType}`}
            InputProps={{
              onKeyDown: formData.parameterType==="NUMBER" && util.blockInvalidChar,
            }}
            required
          />
        </FormControl>
        <div className="d-flex justify-content-end">
          <Button variant="contained" className="bg-primary-blue text-white mr-2" type="submit">Save</Button>
          <Button variant="outlined"
            onClick={() => selectedItem ? setEdit(false) : toggleCreate(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
      <Snackbar open={isAlert.status} autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
          onClose={() => setAlert(false)}>
        <Alert variant="filled" severity={isAlert.severity} sx={{ width: '100%' }}>{isAlert.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default ParameterForm;
