import React from "react";
import _ from "lodash";
import { Row, Col, Table, Card, Avatar } from "antd";

const style = {
  scroll: {
    overflowY: "scroll",
    maxHeight: "420px",
  },
};
export default class TableData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title ? this.props.title : "",
      //pagination: this.props.pagination ? this.props.pagination : false,
      pagination: true
    };
  }

  _getRowClassName = (record) => {
    let highlight = "";
    if (record.Max_pos) {
      highlight = " highlight";
    }
    if (this.props.rowClassName) return this.props.rowClassName + highlight;
    let hideExpandIcon =
      _.get(record, "expandRow", 0) === 0 ? "Hello--hide-expand" : "";

    return hideExpandIcon;
  };

  // call this function if Table header is not passed
  tableHeader = (record) => {
    let headers = Object.keys(record);
    return headers
      .filter((header) => {
        return header !== "key" && header !== "Max_pos";
      })
      .map((header) => {
        if (header === "Status" || header === "Risk") {
          return {
            title: header,
            dataIndex: header,
            key: header,
            render: (text) => {
              return {
                children: (
                  <Avatar
                    style={{
                      backgroundColor: text,
                      verticalAlign: "middle",
                      display: "block",
                    }}
                    size="small"
                  />
                ),
              };
            },
          };
        }
        return {
          title: header.replace("_", " "),
          dataIndex: header,
          key: header,
        };
      });
  };

  onChange=(pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }

  render() {
    //console.log("TABLE PROPS ARE:", this.props);
    return (
      <Row>
        <Col style={this.props.scroll ? style.scroll : ""}>
          <Card
            title={this.state.title}
            extra={this.props.extra ? this.props.extra : ""}
            bordered={this.props.noBordered ? false : true}
            bodyStyle={
              this.props.cardStyle ? this.props.cardStyle : { padding: 24 }
            }
          >
            <Row>
              {this.props.dataSource ? (
                <Table
                  className={
                    this.props.className ? this.props.className : "Hello"
                  }
                  rowClassName={this._getRowClassName}
                  columns={
                    this.props.column
                      ? this.props.column
                      : this.tableHeader(this.props.dataSource[0])
                  }
                  dataSource={this.props.dataSource}
                  pagination={this.state.pagination}
                  expandedRowRender={
                    this.props.expand
                      ? (record) => (
                          <div style={{ margin: 0 }}>{record.expandRow}</div>
                        )
                      : false
                  }
                  setModelSelected={this.props.setModelSelected}
                  scroll={this.props.scrollX ? { x: "max-content" } : false}
                  onChange={this.onChange}
                />
              ) : null}
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
