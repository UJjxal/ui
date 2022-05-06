import React, { useState } from "react";

import { Drawer, Input, List, Tabs } from "antd";

const { TabPane } = Tabs;
const { Search } = Input;

const DataPipelineDrawer = (props) => {
  return (
    <>
      <Drawer
        title="Create Node"
        maskClosable={false}
        width={310}
        onClose={props.onCloseDrawer}
        visible={props.visible}
        bodyStyle={{ padding: 12 }}
      >
        <div>
          <Search
            placeholder="Type to filter ..."
            onSearch={props.tabOnSearch}
            enterButton
          />
          <Tabs
            defaultActiveKey="1"
            onChange={props.tabOnChange}
            className="no-margin-tab"
          >
            {props.tabs.map((tab) => {
              return (
                <TabPane tab={tab.name} key={tab.id}>
                  <List
                    itemLayout="horizontal"
                    dataSource={props.nodeList.filter(
                      (item) => item.nodeBaseType === tab.key
                    )}
                    renderItem={(item) => (
                      <List.Item style={{padding:"5px"}}>
                        <List.Item.Meta
                        style={{alignItems:"center"}}
                          avatar={
                            <img
                              style={{ width: 25 }}
                              src={require(`../../../../assets/dqp/${item.icon}`)}
                            />
                          }
                          title={
                            <a
                              onClick={() => props.tabOnClick(item)}
                              data-type={item.type}
                              data-title={item.name}
                              style={{verticalAlign:"-webkit-baseline-middle"}}
                            >
                              {item.name}
                            </a>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </Drawer>
    </>
  );
};

export default DataPipelineDrawer;
