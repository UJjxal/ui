import { Button, Icon } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import NotSelected from "./NotSelected";
import OneSelected from "./OneSelected";
import { Table, Tag, Space } from "antd";
import { CONTEXT } from "../../../../../../config";
import Loader from '../../../../../../utilities/Loader';
import kpiService from "./../../../../../../services/kpiService";
import ParameterForm from "./ParameterForm";
import MultipleSelected from "./MultipleSelected";
import { AppContext } from "../../../../../../AppProvider";

const ParameterManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [originalParameterList, setOriginalParameterList] = useState([]);

  const appContext = useContext(AppContext)

  const toggleCreate = (val) => {
    setCreate(val);
    setSelected(null);
  };

  const updateSelected = (paramData) => {
    setSelected(paramData);
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const getParameterList = async () => {
    setIsLoading(true);
    await kpiService.getAllParameters().then((res) => {
      if (res.data.code === 200) {
        setParameterList(res.data.response);
        setOriginalParameterList(res.data.response);
        console.log(originalParameterList)
        setSelected(null);
        setIsLoading(false);
      }
    });
  };

  const deleteParameter = async (data) => {
    if(!window.confirm("Are you sure you want to delete this parameter?")){
      return;
    }

    let parameters = [];
    if(Array.isArray(data))
    {
      data.map(item => parameters.push({"parameterId": item}));
    }
    else{
      parameters.push({"parameterId": data.key});
    }
    await kpiService.deleteParameters(parameters).then((res) => {
      setIsLoading(true);
      if (res.data.code === 200) {
        getParameterList();
        setSelectedRowKeys([]);
        setIsLoading(false);
      }
      appContext.useSnackBar({ status: true, severity: "error", message: 'Parameter deleted successfully' })
    });
  };

  useEffect(() => {
    getParameterList();
  }, []);

  return isLoading ? <Loader className="mt-3 text-center" /> :
    <div className="container px-0">
      <div className="d-flex justify-content-between pb-3">
        <div className="align-items-center border d-flex justify-content-around p-2 rounded-pill">
          <Icon>search</Icon>
          <input
            type="text"
            placeholder="Search Parameters"
            className="search-input border-0 no-outline"
          />
        </div>
        <Button variant="contained" className="bg-primary-blue text-white px-3 py-1" onClick={() => toggleCreate(true)}>
          <Icon className="text-white fs14 mr-2">add</Icon> Create new parameter
        </Button>
      </div>
      {parameterList.length > 0 || create ?
        <div className="row align-items-start justify-content-between">
          <div className="col-md-7 pr-md-2">
            <TableParameter
              onSelectChange={onSelectChange}
              parameterData={parameterList}
              updateSelected={updateSelected}
              selectedRowKeys={selectedRowKeys}
            />
          </div>
          <div className="col-md-5 pl-md-2">
            <div className="border rounded p-3">
              {selectedRowKeys.length ? (
                <MultipleSelected deleteParameter={deleteParameter} selectedRows={selectedRowKeys} onSelectChange={onSelectChange}/>
              ) : selected ? (
                <OneSelected
                  selectedItem={selected}
                  deleteParameter={deleteParameter}
                  getParameterList={getParameterList}
                />
              ) : create ? (
                <ParameterForm
                  toggleCreate={toggleCreate}
                  getParameterList={getParameterList}
                  originalParameterList={originalParameterList}
                />
              ) : (
                <NotSelected />
              )}
            </div>
          </div>
        </div>
        :
        <div className="w-100 row align-items-center justify-content-center my-5">
          <div className="col-md-4">
            <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
          </div>
          <div className="col-md-4 text-center">
            <h4>No Parameters Created!</h4>
            <p className="fs16">There are no parameters created yet. Parameters help you track and manage strategies to improve your Key Metrics. Click the New parameters button to get started.</p>
          </div>
        </div>
      }
    </div>
};

const TableParameter = ({
  parameterData,
  updateSelected,
  onSelectChange,
  selectedRowKeys,
}) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Parameter Name",
      dataIndex: "parameterName",
      key: "parameterName",
      width: 160
    },
    {
      title: "Description",
      dataIndex: "parameterDescription",
      key: "parameterDescription",
    },
  ];

  const dataSource = () => {
    let data = [];
    for (let x = 0; x < parameterData.length; x++) {
      data.push({
        key: parameterData[x].parameterId,
        parameterName: parameterData[x].parameterName,
        parameterDescription: parameterData[x].parameterDescription,
        parameterType: parameterData[x].parameterType,
        parameterValue: parameterData[x].parameterValue,
        parameterTags: parameterData[x].parameterTags,
      });
    }
    return data;
  };

  return <Table
    className="table-theme-bordered"
    dataSource={dataSource()}
    columns={columns}
    rowSelection={rowSelection}
    onRow={(record, rowIndex) => {
      return {
        onClick: (item) => updateSelected(record),
      };
    }}
  />
};

export default ParameterManagement;
