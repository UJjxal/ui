import React, { Component } from "react";
import { Button, Layout, Table } from "antd";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

import MuiTable from "../../../../utilities/MuiTable";
import TableData from "../../../../utilities/Table";
import Loader from "../../../../utilities/Loader";
import { API_ROOT, PYTHON_API_ROOT } from "../../../../config";
const { Content } = Layout;

class DataQualityReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandTable: null,
      apiResponse: null,
    };
  }

  tableHeader = () => {
    return [
      {
        title: "Check",
        dataIndex: "rulesubcategory",
        key: "rulesubcategory",
      },
      { title: "Reason", dataIndex: "errormessage", key: "errormessage" },
      { title: "Count", dataIndex: "count", key: "count" },
      {
        title: "Status",
        dataIndex: "errorColor",
        key: "errorColor",
        render: (txt) => {
          return (
            <Icon
              style={{
                color: this.props.getColorCode(txt),
                fontSize: "20px",
                verticalAlign: "top",
                paddingLeft: "18%",
                width: "100%",
              }}
            >
              fiber_manual_record
            </Icon>
          );
        },
      },
    ];
  };

  expandedRowRender = (record) => {
    console.log("expandedRowRender", record, this.state);
    if (this.state.expandTable) {
      if (this.state.expandTable[record.key]) {
        return (
          <MuiTable
            rows={this.state.expandTable[record.key]}
            errorColumn={record.attributename}
            showToolbar={true}
            showDefaultColumn={4} //show default column in table
          />
        );
      }
    }
    return <Loader />;
  };

  /**update dataQualityReport expand */
  getFailedDtl = (filter) => {
    let output = [
      {
        id: 1,
        FirmID: 1104849,
        FirmGuid: "be00717c-f582-44da-bdd5-25c483d713fa",
        FirmType: "IM",
        FirmShort: "Queens Field",
      },
    ];
    // const url = API_ROOT + `failedRuleDetailedDescription/${this.props.token}`;
    // await axios({
    //   method: "post",
    //   data: filter,
    //   url: url,
    //   headers: { "Access-Control-Allow-Origin": "*" },
    // })
    //   .then((res) => {
    //     if (res.data.status !== `fail`) {
    //       console.log(`dataQualityReport: `, res.data.response);
    //       const output = [
    //         {
    //           FirmID: 1104849,
    //           FirmGuid: "be00717c-f582-44da-bdd5-25c483d713fa",
    //           FirmType: "IM",
    //           FirmShort: "Queens Field",
    //           FirmLegal: "Queens Field",
    //           FirmAddress1: "44 rue de Lisbonne",
    //           FirmCity: "Paris",
    //           FirmState: "Other",
    //           FirmZip: "75008",
    //           FirmCountry: "France",
    //           FirmWebsite: "http://www.queensfield.net/",
    //           FirmPhone: "+33627661375",
    //           FirmYearFounded: "2020",
    //           FirmRegisteredInvestmentAdvisor: false,
    //           FirmInsertionDate: "2021-01-05T10:29:49.377Z",
    //           FirmStatus: "Active",
    //           CurrencyID: 1,
    //           RowHash: "6780e946-7ed8-da90-8f37-2c3ead7d9fd9",
    //           entityCategory: "EV-Firm",
    //           entityName: "Firm",
    //           runID: "DQ_Firm_2021-01-14_845966cf-bbce-4dc5-8c28-4db0d40a8f22",
    //           rowNumber: 1925,
    //         },
    //       ];
    //       return <MuiTable rows={res.data.response} />
    //     } else {
    //       console.log(`dataQualityReport Error: `, res.data);
    //     }
    //   })
    //   .catch((err) => console.log("Axios err: ", err));
    return output;
  };

  handleExpand = (expanded, record) => {
    console.log("handleExpand", expanded, record);
    this.setState({ apiResponse: null });
    const url = PYTHON_API_ROOT + `failedRuleDetailedDescription/${this.props.token}`;
    try {
      const filter = {
        runID: this.props.nodeData.runID,
        ruleSubCategory: record.rulesubcategory,
        errorMessage: record.errormessage,
      };
      axios({
        method: "post",
        data: filter,
        url: url,
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then((res) => {
        console.log(`dataQualityReport res: `, typeof res);
        if (res.data.code === 200) {
          this.setState({
            expandTable: {
              ...this.state.expandTable,
              [record.key]: res.data.response,
            },
            apiResponse: 200,
          });
        } else {
          this.setState({ apiResponse: res.data.code });
          console.log(`dataQualityReport Error: `, typeof res.data);
        }
        // const output = [
        //   {
        //     FirmID: record.rulesubcategory,
        //     FirmGuid: "be00717c-f582-44da-bdd5-25c483d713fa",
        //     FirmType: "IM",
        //     FirmShort: "Queens Field",
        //     FirmLegal: "Queens Field",
        //   },
        // ];
        // this.setState({
        //   expandTable: { ...this.state.expandTable,[record.key]: output },
        //   apiResponse: 200,
        // });
      });
    } catch (error) {
      this.setState({ apiResponse: 400 });
      console.log(`dataQualityReport CatchErroe: `, error);
    }
  };

  render() {
    //console.log("state121", this.state);
    return (
      <Content style={{ padding: "4px 24px", minHeight: 280 }}>
        <div className="row" style={{ fontSize: 18 }}>
          <div className="col-md-3">
            <b>Entity : </b>
            {this.props.nodeData.name}
          </div>
          <div className="col">
            <b>Run ID : </b>
            {this.props.nodeData.runID}
          </div>
        </div>
        <Table
          columns={this.tableHeader()}
          dataSource={this.props.dataQualityReport}
          expandedRowRender={this.expandedRowRender}
          onExpand={this.handleExpand}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ) : (
              <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            )
          }
        />
        {/* <MuiTable
          columns={[
            {
              headerName: "Checks",
              field: "rulesubcategory",
              flex: 0.5,
            },
            {
              headerName: "Reason",
              field: "errormessage",
              flex: 1,
            },
            {
              headerName: "Issues",
              field: "count",
              flex: 0.15,
            },
            {
              headerName: "Status",
              field: "errorColor",
              flex: 0.15,
              renderCell: (params) => (
                <Icon
                  style={{
                    color: this.props.getColorCode(params.row.errorColor),
                    fontSize: "20px",
                    verticalAlign: "top",
                    paddingLeft: "25%",
                    width: "100%",
                  }}
                >
                  fiber_manual_record
                </Icon>
              ),
            },
            {
              headerName: "Action",
              field: "id",
              flex: 0.15,
              renderCell: (params) => (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <SettingOutlined />
                </div>
              ),
            },
          ]}
          rows={this.props.dataQualityReport}
        /> */}
      </Content>
    );
  }
}
export default DataQualityReport;
