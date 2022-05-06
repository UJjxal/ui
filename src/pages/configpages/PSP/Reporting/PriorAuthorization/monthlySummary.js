import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import { CONTEXT } from "../../../../../config"; 
import { Button, DatePicker, Select, Table } from "antd";

const Summary = () => {
    const [apiData, setApiData] = useState({dataSource: [], columns: []});
    const [data, setData] = useState({dataSource: [], columns: []});
    const [filter, setFilter] = useState({state:'', payer:'', provider:'', brand:''});
    const [dataLoading, setDataLoading] = useState(true)
      const columnsDaily = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
        },
        {
          title: 'Approved',
          dataIndex: 'Approved',
          key: 'Approved',
        },
        {
            title: 'Denied',
            dataIndex: 'Denied',
            key: 'Denied',
        },
        {
            title: 'In Process',
            dataIndex: 'InProcess',
            key: 'InProcess',
        },
        {
            title: 'NA',
            dataIndex: 'NA',
            key: 'NA',
        },
        {
          title: 'Pending for Addn. Info',
          dataIndex: '',
          key: '',
          render: text => "0"
        },
        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'Total',
        }
      ]

      const columnsMonthly = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Month',
          dataIndex: 'month',
          key: 'month',
        },
        {
          title: 'Approved',
          dataIndex: 'Approved',
          key: 'Approved',
        },
        {
          title: 'Denied',
          dataIndex: 'Denied',
          key: 'Denied',
        },
        {
          title: 'In Process',
          dataIndex: 'InProcess',
          key: 'InProcess',
        },
        {
          title: 'NA',
          dataIndex: 'NA',
          key: 'NA',
        },
        {
          title: 'Pending for Addn. Info',
          dataIndex: '',
          key: '',
          render: text => "0"
        },
        {
          title: 'Total',
          dataIndex: 'Total',
          key: 'Total',
        },
      ]

      const fetchAPI = 
      // useCallback(
        async () => {
        setDataLoading(true)
        const result = await axios(`${CONTEXT}/psp/summary.json`);
        setData({dataSource: result.data, columns: []});
        setApiData({dataSource: result.data, columns: []});
        setDataLoading(false)
      }
      // , [])

      useEffect(() => {
        fetchAPI()
      }, []);

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

    console.log('Daily_Summary_prior', data.dataSource.Daily_Summary)
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
          </div></div>
        <div className="mb-5">
          <h5 className="text-center mb-1 py-2" style={{background: "#e6f7ff"}}>MONTHLY SUMMARY REPORT</h5>
          {!dataLoading && <Table dataSource={data.dataSource.Monthly_Summary} columns={columnsMonthly} pagination={{ pageSize: 5}} bordered  
            summary={pageData => {
              let totalBorrow = 0;
              let totalRepayment = 0;
              let approved = data.dataSource.Monthly_Summary.approved;
              let denied = data.dataSource.Monthly_Summary.denied;
              pageData.forEach(({ approved, denied }) => {
                totalBorrow += approved;
                totalRepayment += denied;
              });
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>Total</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <p type="danger">{totalBorrow}</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <p>{totalRepayment}</p>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>Balance</Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <p type="danger">{totalBorrow - totalRepayment}</p>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}

            />}
          
        </div>
    </div>
    )
}

export default Summary;