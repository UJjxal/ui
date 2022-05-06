import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Table, Menu, Dropdown, Button, Checkbox } from "antd";

const TableColumn = (props) => {
  const [d, setData] = useState({
    data: [],

  });

  useEffect(() => {
    //const { pagination } = d;
  }, []);

  const menu = <Menu>
    <Menu.ItemGroup title="Columns">
      {props.columns?.map((item, i) => (<Menu.Item key={i}>
        <Checkbox
          id={item.dataIndex}
          onChange={props.columnShowHideChange}
          defaultChecked
        >
          {item.title}
        </Checkbox>
      </Menu.Item>)

      )}

    </Menu.ItemGroup>
  </Menu>;

  return (
    <Dropdown
      overlay={menu}
      placement="bottomCenter"
    //onVisibleChange={this.handleVisibleChange}
    //visible={this.state.visibleMenuSettings}

    >
      <Button className="tile-btn mr-2" style={{ borderColor: '#205684' }} title={'Show/Hide Columns'}>
        <i style={{ transform: ' rotate(90deg)', color: '#205684' }} className="fa fa-bars" aria-hidden="true"></i>
      </Button>
    </Dropdown>
  );

}

export default TableColumn;
