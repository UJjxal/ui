import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import { CONTEXT } from "../../../../../config"; 
import { Button, DatePicker, Select, Table } from "antd";

const Summary = () => {
    const [apiData, setApiData] = useState({dataSource: [], columns: []});
    const [data, setData] = useState({dataSource: [], columns: []});
    const [filter, setFilter] = useState({state:'', payer:'', provider:'', brand:''});
      const columnsDaily = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Date',
          dataIndex: 'month',
          key: 'month',
          width: "250px"
        },
        {
          title: 'Total Discontinued',
          dataIndex: 'Approved',
          key: 'Approved',
        },
        {
            title: 'Treatment > 2 Yrs',
            dataIndex: 'Denied',
            key: 'Denied',
        },
        {
            title: 'Treatment (between 1-2 Yrs)',
            dataIndex: 'InProcess',
            key: 'InProcess',
        },
        {
            title: 'Treatment (between 1 Yr-6 mo.)',
            dataIndex: 'NA',
            key: 'NA',
        },
        {
            title: 'Treatment < 6 month',
            dataIndex: 'Total',
            key: 'Total',
        },
        {
          title: 'Switch to Comp',
          dataIndex: 'Switch to Comp',
          key: 'Switch to Comp',
        }
      ]

      const columnsMonthly = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Date',
          dataIndex: 'month',
          key: 'month',
          width: "250px"
        },
        {
          title: 'Total Discontinued',
          dataIndex: 'Approved',
          key: 'Approved',
        },
        {
          title: 'Treatment > 2 Yrs',
          dataIndex: 'Denied',
          key: 'Denied',
        },
        {
          title: 'Treatment (between 1-2 Yrs)',
          dataIndex: 'InProcess',
          key: 'InProcess',
        },
        {
          title: 'Treatment (between 1 Yr-6 mo.)',
          dataIndex: 'NA',
          key: 'NA',
        },
        {
          title: 'Treatment < 6 month',
          dataIndex: 'Total',
          key: 'Total',
        },
        {
          title: 'Switch to Comp',
          dataIndex: 'Switch to Comp',
          key: 'Switch to Comp',
        }
      ]

      const fetchAPI = useCallback(async () => {
        const result = await axios(`${CONTEXT}/psp/summaryDisc.json`);
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
        
        var filteredDaily = (apiData.dataSource.Daily_Summary).filter(function(i){
              return !Object.keys(obj).some(function(prop){
                  return i[prop] != obj[prop];
              });
        });
        var filteredMonth = (apiData.dataSource.Monthly_Summary).filter(function(i){
          return !Object.keys(obj).some(function(prop){
              return i[prop] != obj[prop];
          });
        });
    
       setData({dataSource: {...data.dataSource, "Daily_Summary": filteredDaily, "Monthly_Summary":filteredMonth}, columns: []});
      }

      function onChange(date, dateString) {
        console.log(date, dateString);
      }

    console.log('Daily_Summary_Discontinuation', data.dataSource.Daily_Summary)
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
                <Select.Option value="BCBS CA">BCBS CA</Select.Option>
                <Select.Option value="BCBS GA">BCBS GA</Select.Option>
                <Select.Option value="Keiser">Keiser</Select.Option>
                <Select.Option value="UCLA">UCLA</Select.Option>
              </Select>
          </div>
          <div>
              <h6 className="mb-0">Brand/ NDC</h6>
              <Select defaultValue="ALL"
                style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                <Select.Option value="">ALL</Select.Option>
                <Select.Option value="Tocilizumab">Tocilizumab</Select.Option>
                <Select.Option value="Bevacizumab">Bevacizumab</Select.Option>
                <Select.Option value="Pimavanserin">Pimavanserin</Select.Option>
                <Select.Option value="Remdesivir">Remdesivir</Select.Option>
                <Select.Option value="Viltolarsen">Viltolarsen</Select.Option>
              </Select>
          </div>
          <div>
            <h6 className="mb-0">Review Period</h6>
            <DatePicker.RangePicker onChange={onChange} picker="quarter" />
          </div>
          </div>
          <h5 className="text-center mb-1 py-2" style={{background: "#e6f7ff"}}>DAILY SUMMARY REPORT okok</h5>
          <Table dataSource={data.dataSource.Daily_Summary} columns={columnsDaily} pagination={{ pageSize: 5}} bordered />
        </div>
    </div>
    )
}

export default Summary;