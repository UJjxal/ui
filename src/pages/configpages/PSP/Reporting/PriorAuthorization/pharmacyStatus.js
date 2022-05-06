import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import { CONTEXT } from "../../../../../config";
import { Button, DatePicker, Select, Table } from "antd";
import '../styles.css';

const DailyDetailed = () => {
  const [apiData, setApiData] = useState({dataSource: [], columns: []});
  const [data, setData] = useState({dataSource: [], columns: []});
  const [filter, setFilter] = useState({state:'', payer:'', provider:'', brand:''});
    const dataSource = [{
      "key": "1",
      "dateReceived": "11/16/2020",
      "status": "In Progress",
      "patientId": "1234",
      "patientName": "John Smith",
      "dob": "11/15/2006",
      "dxCodes": "3452",
      "medication": "Veltapso",
      "providerName": "BCBS CA",
      "primaryPayer": "Anthem",
      "phone": "17800091"
  },
  {
      "key": "2",
      "dateReceived": "11/18/2020",
      "status": "In Progress",
      "patientId": "4568",
      "patientName": "Mathew Perry",
      "dob": "12/21/2008",
      "dxCodes": "6532",
      "medication": "Remdesivir",
      "providerName": "BCBS GA",
      "primaryPayer": "Caremark",
      "phone": "11789292"
  },
  {
      "key": "3",
      "dateReceived": "10/19/2020",
      "status": "In Progress",
      "patientId": "3245",
      "patientName": "Emily Rhodes",
      "dob": "01/03/2001",
      "dxCodes": "7234",
      "medication": "Pimavanserin",
      "providerName": "KEISER",
      "primaryPayer": "CVS",
      "phone": "16993920"
  },
  {
      "key": "4",
      "dateReceived": "14/20/2020",
      "status": "In Progress",
      "patientId": "6784",
      "patientName": "Tom Kirkman",
      "dob": "03/04/2012",
      "dxCodes": "9001",
      "medication": "Bevacizumab",
      "providerName": "UC LA",
      "primaryPayer": "ESI",
      "phone": "12049030"
  },
  {
      "key": "5",
      "dateReceived": "09/17/2020",
      "status": "In Progress",
      "patientId": "5645",
      "patientName": "Aaron Shore",
      "dob": "10/09/2014",
      "dxCodes": "3421",
      "medication": "Actemera",
      "providerName": "ABCD",
      "primaryPayer": "Caremark",
      "phone": "39201013"
  },
  {
      "key": "6",
      "dateReceived": "10/16/2020",
      "status": "In Progress",
      "patientId": "1234",
      "patientName": "John Smith",
      "dob": "09/06/2005",
      "dxCodes": "3452",
      "medication": "Veltapso",
      "providerName": "BCBS CA",
      "primaryPayer": "Anthem",
      "phone": "17800091"
  },
  {
      "key": "7",
      "dateReceived": "09/16/2020",
      "status": "In Progress",
      "patientId": "4568",
      "patientName": "Mathew Perry",
      "dob": "08/03/2008",
      "dxCodes": "6532",
      "medication": "Remdesivir",
      "providerName": "BCBS GA",
      "primaryPayer": "Caremark",
      "phone": "11789292"
  },
  {
      "key": "8",
      "dateReceived": "05/16/2020",
      "status": "In Progress",
      "patientId": "3245",
      "patientName": "Emily Rhodes",
      "dob": "10/07/2003",
      "dxCodes": "7234",
      "medication": "Pimavanserin",
      "providerName": "KEISER",
      "primaryPayer": "CVS",
      "phone": "16993920"
  },
  {
      "key": "9",
      "dateReceived": "08/16/2020",
      "status": "In Progress",
      "patientId": "6784",
      "patientName": "Tom Kirkman",
      "dob": "09/11/2005",
      "dxCodes": "9001",
      "medication": "Bevacizumab",
      "providerName": "UC LA",
      "primaryPayer": "ESI",
      "phone": "12049030"
  },
  {
      "key": "10",
      "dateReceived": "03/16/2020",
      "status": "In Progress",
      "patientId": "5645",
      "patientName": "Seth Wright",
      "dob": "06/04/2009",
      "dxCodes": "3421",
      "medication": "Actemera",
      "providerName": "ABCD",
      "primaryPayer": "Caremark",
      "phone": "39201013"
      }];
      
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
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: 'Patient ID',
            dataIndex: 'patientID',
            key: 'patientID',
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'DOB',
            dataIndex: 'DOB',
            key: 'DOB',
        },
        {
            title: 'Dx Codes',
            dataIndex: 'dxCodes',
            key: 'dxCodes',
        },
        {
            title: 'Phone #',
            dataIndex: 'phone',
            key: 'phone',
        },
      ]

      const columnsAuthorization = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'state',
          dataIndex: 'State',
          key: 'State',
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
          title: 'Patient ID',
          dataIndex: 'patientID',
          key: 'patientID',
        },
        {
          title: 'Last worked on',
          dataIndex: 'Last worked on',
          key: 'Last worked on',
        },
        {
          title: 'Follow-up Date',
          dataIndex: 'Follow-up Date',
          key: 'Follow-up Date',
        },
        {
          title: 'Comments',
          dataIndex: 'Comments',
          key: 'Comments',
        },
        {
          title: 'Final Status',
          dataIndex: 'Final Status',
          key: 'Final Status',
        },
        {
          title: 'Approval/ Denial Date',
          dataIndex: 'Approval/ Denial Date',
          key: 'Approval/ Denial Date',
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
          title: 'Patient ID',
          dataIndex: 'patientID',
          key: 'patientID',
        },
        {
          title: 'Pharmacy Name',
          dataIndex: 'Pharmacy',
          key: 'Pharmacy',
        },
        {
          title: 'Pharmacy phone',
          dataIndex: 'Pharmacy phone',
          key: 'Pharmacy phone',
        },
        {
          title: 'Auth. Status Info',
          dataIndex: 'Auth. Status Info.',
          key: 'Auth. Status Info.',
        },
        {
          title: 'Date of Communication',
          dataIndex: 'Date of Communication',
          key: 'Date of Communication',
        },
        {
          title: 'Comments',
          dataIndex: 'Comments',
          key: 'Comments',
        },
        {
          title: 'Scheduled Delivery Date',
          dataIndex: 'Scheduled Delivery Date',
          key: 'Scheduled Delivery Date',
        }
      ]

      const fetchAPI = useCallback(async () => {
        const result = await axios(`${CONTEXT}/psp/daily.json`);
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
        
        var filteredInput = (apiData.dataSource.Input).filter(function(i){
              return !Object.keys(obj).some(function(prop){
                  return i[prop] != obj[prop];
              });
        });
        var filteredAuth = (apiData.dataSource.AuthorizationStatus).filter(function(i){
          return !Object.keys(obj).some(function(prop){
              return i[prop] != obj[prop];
          });
        });
        var filteredPharma = (apiData.dataSource.PharmacyStatus).filter(function(i){
          return !Object.keys(obj).some(function(prop){
              return i[prop] != obj[prop];
          });
        });
    
       setData({dataSource: {...data.dataSource, "Input": filteredInput, "AuthorizationStatus": filteredAuth, "PharmacyStatus": filteredPharma}, columns: []});
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
          </div>
            </div>
          <div className="mb-5">
            <h5 className="text-center mb-1 py-2" style={{background: "#e6f7ff"}}>PHARMACY STATUS</h5>
            <Table dataSource={data.dataSource.PharmacyStatus} columns={columnsPharmacy} pagination={{ pageSize: 5}} bordered />
          </div>
        </div>
    )
}

export default DailyDetailed;