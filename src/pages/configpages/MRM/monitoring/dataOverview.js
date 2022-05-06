import React from "react";
//import { Row, Col, Input, Card, Select, Avatar } from "antd";

import TableData from "../../../../utilities/Table";

const DataOverview = (props) => {
  const tableheader = () => {
    return [
      {
        title: "",
        dataIndex: "_"
      },
      {
        title: "Development Cohort",
        dataIndex: "Development Cohort",
        align: "right"
      },
      {
        title: "Validation Cohort",
        dataIndex: "Validation Cohort",
        align: "right"
      }
    ]
  }
  //console.log("overview", props);
  return (
    <TableData
      size="small"
      class="subTable"
      rowClassName="rowSubTable"
      dataSource={props.apiData.DataOverview[0]}
      noBordered={true}
			cardStyle={{padding:0}}
      column={tableheader()}
      className="dataoverviewtbl"
    />
  );
};

export default DataOverview;
