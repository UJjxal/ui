import React from 'react';
import { Table } from "ant-table-extensions";

const AntdDataTable = (props) => {
 
  const tableHeader = () => {
    const record = props.rows;
    var column = [];
    if (record) {
      var keys = Object.keys(props.rows[0]);
      keys.forEach((item) => {
        column.push({
          dataIndex: item,
          title: item,
          title:
            item.charAt(0).toUpperCase() +
            item
              .slice(1)
              .replace(/([A-Z])/g, " $1")
              .trim(),
          key: item,
          ellipsis: true,
        });
      });
    }
    return column;
  }
  return (
      <>
      {props.rows ? <Table  className="antd-table" dataSource={props.rows} columns={props.columns ? props.columns : tableHeader()} pagination={props.pagination} bordered/> : null}
      </>
  )
}

export default AntdDataTable;
