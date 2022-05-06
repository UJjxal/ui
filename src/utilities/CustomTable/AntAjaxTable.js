import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Table, Menu, Dropdown, Button, Input } from "antd";
import { ExportTableButton } from "ant-table-extensions";
import axios from "axios";

import TableColumn from "./TableColumn";

const AntAjaxTable = (props) => {
  const [d, setData] = useState({
    data: [],
    columns: props.columns ? props.columns : [],
    pagination: {
      current: 1,
      pageSize: props.pageSize || 10,
    },
    loading: false,
    checkedColumns: []
  });

  useEffect(() => {
    const { pagination } = d;
    getMoreData({ pagination });
  }, []);


  const handleTableChange = (pagination, filters, sorter) => {
    getMoreData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  /**get more records table records */
  const getMoreData = async (params = {}) => {
    let startingPos =
      (params.pagination.current - 1) * params.pagination.pageSize;
    setData({ loading: true });
    console.log('params', params);
    try {
      const apiParams = {
        startingPos: startingPos + "",
        limit: "10",
        userId: "All",
      };
      const url = props.apiCall;
      let { data } = await axios.post(url, apiParams);
      console.log("getRecommendedProspects", data);
      if (data.code === 200) {
        let results = Array.isArray(data.response.results)
          ? data.response.results
          : [];
        results.forEach((v, i) => {
          if (typeof v.key === "undefined") {
            v.key = i + 1;
          }
        });
        let columns = tableHeader(results[0]);
        setData({
          loading: false,
          data: results,
          columns: columns,
          pagination: {
            ...params.pagination,
            total: data.response.total * 1,
          },
        });
      }
    } catch (error) {
      console.error("getRecommendedProspectsError##", error);
    }
  };

  /**table header if pass from parent component */
  const tableHeader = (data) => {
    if (data) {
      var column = [];
      var keys = Object.keys(data);
      keys.forEach((item, index) => {
        if (item === "key") {
          return;
        }
        column.push({
          title: camelToSnakeCase(item),
          dataIndex: item,
          key: item,
          ellipsis: true,
          sorter: true,
        });
      });
      return column;
    }
  };

  /** internal calling function for change camel to snake case */
  const camelToSnakeCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim();
  };

  const columnShowHideChange = e => {
    var checkedColumns = d.checkedColumns;
    if (e.target.checked) {
      checkedColumns = checkedColumns.filter(id => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkedColumns.push(e.target.id);
    }
console.log('columnShowHideChange',checkedColumns);
    // var filtered = this.state.initialColumns;
    // for (var i = 0; i < checkedColumns.length; i++)
    //   filtered = filtered.filter(el => {
    //     return el.dataIndex !== checkedColumns[i];
    //   });

    // this.setState({ columns: filtered, checkedColumns: checkedColumns });
  };

  const { data, pagination, loading } = d;

  return (
    <div>
      <div className="mb15">
        <div className="d-flex justify-content-between mb-3">
          <div></div>
          <div>
            {props.exportExcel ? <ExportTableButton
              dataSource={data}
              columns={d.columns}
              btnProps={{ icon: "<FileExcelOutlined />", className: "mr-2 ml-2", style: { borderColor: '#205684' } }}
              showColumnPicker
            >
              <i className="fas fa-file-export" style={{ color: '#205684' }} title="Export Data into CSV"></i>
            </ExportTableButton> : null}
            {props.hideShowCol ? <TableColumn columns={d.columns} columnShowHideChange={columnShowHideChange} /> : null}

          </div>
        </div>
        {data ? (
          <Table
            bordered
            columns={d.columns}
            //rowKey={(record) => record.zymewireId}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ y: props.height || 320 }} //x: 'calc(500px + 50%)',
          />
        ) : null}
      </div>
    </div>
  );

}

export default AntAjaxTable;
