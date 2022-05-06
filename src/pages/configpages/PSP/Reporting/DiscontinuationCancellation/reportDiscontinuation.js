import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import { CONTEXT } from "../../../../../config";
import { Button, DatePicker, Select, Table } from "antd";

const DailyDetailed = () => {
  const [apiData, setApiData] = useState({dataSource: [], columns: []});
  const [data, setData] = useState({dataSource: [], columns: []});
  const [filter, setFilter] = useState({state:'', payer:'', provider:'', brand:''});

      const columnsInput = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'state',
          dataIndex: 'state',
          key: 'state',
        },
        {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
        },
        {
            title: 'Payer',
            dataIndex: 'payer',
            key: 'payer',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
          title: 'Date Received',
          dataIndex: 'dateReceived',
          key: 'dateReceived',
        },
        {
            title: 'Patient ID',
            dataIndex: 'PatientID',
            key: 'PatientID',
        },
        {
            title: 'Age/Sex/Race',
            dataIndex: 'Age/Sex/Race',
            key: 'Age/Sex/Race',
        },
        {
            title: 'Rx',
            dataIndex: 'Rx',
            key: 'Rx',
        },
        {
            title: 'Therapy',
            dataIndex: 'Therapy',
            key: 'Therapy',
        },
        {
            title: 'Book of Business',
            dataIndex: 'Book of Business',
            key: 'Book of Business',
        },
        {
            title: 'Date of Enrollment',
            dataIndex: 'Date of Enrollment',
            key: 'Date of Enrollment',
        },
        {
            title: 'Date of First Fill',
            dataIndex: 'Date of First Fill',
            key: 'Date of First Fill',
        },
        {
            title: 'Date of Last Refill',
            dataIndex: 'Date of Last Refill',
            key: 'Date of Last Refill',
        },
        {
            title: 'Total Fills',
            dataIndex: 'Total Fills',
            key: 'Total Fills',
        },
        {
            title: 'Day of Discontinuation',
            dataIndex: 'Day of Discontinuation',
            key: 'Day of Discontinuation',
        },
        {
            title: 'Discontinuation- Reason',
            dataIndex: 'Discontinuation- Reason',
            key: 'Discontinuation- Reason',
        },
        {
            title: 'Comments',
            dataIndex: 'Comments',
            key: 'Comments',
        }
        
      ]

      const columnsAuthorization = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'state',
          dataIndex: 'state',
          key: 'state',
        },
        {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
        },
        {
            title: 'Payer',
            dataIndex: 'payer',
            key: 'payer',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
          title: 'Discontinuation- Reason',
          dataIndex: 'Discontinuation- Reason',
          key: 'Discontinuation- Reason',
        },
        {
          title: 'Total Discontinued',
          dataIndex: 'Total Discontinued',
          key: 'Total Discontinued',
        },
        {
          title: 'Treatment > 2 Yrs',
          dataIndex: 'Treatment > 2 Yrs',
          key: 'Treatment > 2 Yrs',
        },
        {
          title: 'Treatment (between 1-2 Yrs)',
          dataIndex: 'Treatment (between 1-2 Yrs)',
          key: 'Treatment (between 1-2 Yrs)',
        },
        {
          title: 'Treatment (between 1 Yr-6 mo.)',
          dataIndex: 'Treatment (between 1 Yr-6 mo.)',
          key: 'Treatment (between 1 Yr-6 mo.)',
        },
        {
          title: 'Treatment < 6 month',
          dataIndex: 'Treatment < 6 month',
          key: 'Treatment < 6 month',
        }
      ]

      const columnsPharmacy = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'state',
          dataIndex: 'state',
          key: 'state',
        },
        {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
        },
        {
            title: 'Payer',
            dataIndex: 'payer',
            key: 'payer',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
          title: 'Discontinuation- Reason',
          dataIndex: 'Discontinuation- Reason',
          key: 'Discontinuation- Reason',
        },
        {
          title: 'Total Discontinued',
          dataIndex: 'Total Discontinued',
          key: 'Total Discontinued',
        },
        {
          title: 'Treatment > 2 Yrs',
          dataIndex: 'Treatment > 2 Yrs',
          key: 'Treatment > 2 Yrs',
        },
        {
          title: 'Treatment (between 1-2 Yrs)',
          dataIndex: 'Treatment (between 1-2 Yrs)',
          key: 'Treatment (between 1-2 Yrs)',
        },
        {
          title: 'Treatment (between 1 Yr-6 mo.)',
          dataIndex: 'Treatment (between 1 Yr-6 mo.)',
          key: 'Treatment (between 1 Yr-6 mo.)',
        },
        {
          title: 'Treatment < 6 month',
          dataIndex: 'Treatment < 6 month',
          key: 'Treatment < 6 month',
        }
      ]

      const fetchAPI = useCallback(async () => {
        const result = await axios(`${CONTEXT}/psp/dailyDisc.json`);
        setData({dataSource: result.data, columns: []});
        setApiData({dataSource: result.data, columns: []});
      }, [])

      useEffect(() => {
        fetchAPI()
      }, [fetchAPI]);

      const handleFilter = (value, label) => {
        console.log(`selected ${value} ${label}`);
        setFilter({...filter, [label]: value})
        
        let obj = {...filter, [label]: value};
        obj = Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
        
        var filteredInput = (apiData.dataSource.Patient_Level_Data).filter(function(i){
              return !Object.keys(obj).some(function(prop){
                  return i[prop] != obj[prop];
              });
        });
        var filteredAuth = (apiData.dataSource.Daily_Report_Discontinuation_Re).filter(function(i){
          return !Object.keys(obj).some(function(prop){
              return i[prop] != obj[prop];
          });
        });
        var filteredPharma = (apiData.dataSource.Daily_Report_Switching_to_Comp).filter(function(i){
          return !Object.keys(obj).some(function(prop){
              return i[prop] != obj[prop];
          });
        });
    
       setData({dataSource: {...data.dataSource, "Patient_Level_Data": filteredInput, "Daily_Report_Discontinuation_Re": filteredAuth, "Daily_Report_Switching_to_Comp": filteredPharma}, columns: []});
      }

      function onChange(date, dateString) {
        console.log(date, dateString);
      }
console.log(filter)
    return(
        <div className="p-4">
          <div className="mb-5">
            <h3>Components of Daily Detailed Report</h3>
            <div className="mb-2 d-flex justify-content-end">
            <div>
              <h6 className="mb-0">State</h6>
              <Select defaultValue="ALL"
                style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `state`)}>
                <Select.Option value="">ALL</Select.Option>
                <Select.Option value="AL">AL</Select.Option>
                <Select.Option value="CA">CA</Select.Option>
                <Select.Option value="GA">GA</Select.Option>
                <Select.Option value="FL">FL</Select.Option>
                <Select.Option value="NV">NV</Select.Option>
                <Select.Option value="NY">NY</Select.Option>
              </Select>
            </div>
            <div>
              <h6 className="mb-0">Payer</h6>
              <Select defaultValue="ALL"
                style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `payer`)}>
                <Select.Option value="">ALL</Select.Option>
                <Select.Option value="Anthem">Anthem</Select.Option>
                <Select.Option value="Caremark">Caremark</Select.Option>
                <Select.Option value="CVS">CVS</Select.Option>
                <Select.Option value="ESI">ESI</Select.Option>
              </Select>
          </div>
          <div>
              <h6 className="mb-0">Provider</h6>
              <Select defaultValue="ALL"
                style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `provider`)}>
                <Select.Option value="">ALL</Select.Option>
                <Select.Option value="Provider A">Provider A</Select.Option>
                <Select.Option value="Provider B">Provider B</Select.Option>
                <Select.Option value="Provider C">Provider C</Select.Option>
                <Select.Option value="Provider D">Provider D</Select.Option>
              </Select>
          </div>
          <div>
              <h6 className="mb-0">Brand/ NDC</h6>
              <Select defaultValue="ALL"
                style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                <Select.Option value="">ALL</Select.Option>
                <Select.Option value="Brand A">Brand A</Select.Option>
                <Select.Option value="Brand B">Brand B</Select.Option>
                <Select.Option value="Brand C">Brand C</Select.Option>
                <Select.Option value="Brand D">Brand D</Select.Option>
                <Select.Option value="Brand E">Brand E</Select.Option>
              </Select>
          </div>
          <div>
            <h6 className="mb-0">Review Period</h6>
            <DatePicker.RangePicker onChange={onChange} picker="quarter" />
          </div>
          </div></div>
          <div className="mb-5">
            <h5 className="text-center mb-1 py-2" style={{background: "#e6f7ff"}}>DAILY REPORT by- Discontinuation Reason / Treatment Duration</h5>
            <Table dataSource={data.dataSource.Daily_Report_Discontinuation_Re} columns={columnsAuthorization} pagination={{ pageSize: 5}} bordered />
          </div>
        </div>
    )
}

export default DailyDetailed;