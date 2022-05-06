import React, { useState, useEffect } from "react";
import {MDBRow,MDBCol,MDBModal,MDBModalBody,MDBModalFooter,MDBTable,MDBTableHead,MDBTableBody} from "mdbreact";
import {Form, Button, Input, Tabs, Select, Table,} from "antd";
import MuiTable from "../../../../utilities/MuiTable";
import { TextField } from "@material-ui/core";

import Loader from "../../../../utilities/Loader";
import "antd/dist/antd.css";
import {DeleteOutlined} from "@ant-design/icons";

const { Option } = Select;
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};
const originData = [
  {
    key: 1,
    source: "primary key",
    target: "foreign key",
  },
];
const EditableContext = React.createContext();

const NodeConfig=(props) => {
  let currentNode=props.currentNode || {};
  let elements=props.elements || [];
  const [sourceFeilds, setSourceFeilds]=useState([]);

  const init=()=>{
    if(currentNode.data?.nodeType==='Join'){
        //console.log('Saty ', elements);
        let sourceNodes=[];
        elements.forEach(v=>{
          if(v.target===currentNode.id){
            let feildsObj={sourceNode:v.source, feilds:[]};
            elements.forEach(v1=>{
              if(v1.id===v.source){
                if(v1.result?.metaDataDetails){
                  Object.keys(v1.result?.metaDataDetails).forEach(k=>{
                    feildsObj.feilds.push({feildName:k, dataType:v1.result?.metaDataDetails[k]});
                  })
                }
              }
            });

            if(feildsObj.feilds.length){
              sourceNodes.push(feildsObj);
            }
          }
        });

        setSourceFeilds(sourceNodes);
    }
  }

  useEffect(()=>{
    init();
    // eslint-disable-next-line
  }, [props.elements, props.currentNode]);

  console.log("NodeConfig", props);

  return (
    <>
      <MDBModal
        isOpen={props.nodeConfig}
        toggle={() => false}
        className="px-5 my-5"
        size="fluid"
      >
        <div className="d-flex justify-content-between px-4 py-3 border-bottom">
          <h4 className="modal-title">
            {" "}
            {props.currentNode ? props.currentNode.data.text : "Configuration"}
          </h4>
          <div className="float-right">
            <button
              type="button"
              className="close text-dark"
              aria-label="Close"
              onClick={() => {
                props.setNodeConfig(false);
                //resetFormData();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
            {props.loadingExe === true ? (
              <Button className="mr-2">
                <Loader
                  type="TailSpin"
                  color="#000000"
                  height={20}
                  style={{ color: "#000000" }}
                  className="mr-2"
                />
              </Button>
            ) : (
              <Button
                className="mr-2"
                type=""
                onClick={() => props.handleExecuteNode()}
              >
                Execute Node
              </Button>
            )}
          </div>
        </div>
        <MDBModalBody>
          <MDBRow className="mt-1">
            <MDBCol
              size="4"
              className="pb-2"
              key="11"
              style={{ overflowY: "scroll", height: "22rem" }}
            >
              <Tabs
                defaultActiveKey="1"
                //onChange={}
                className="no-margin-tab"
              >
                <TabPane tab="Parameters" key="1" style={{ fontSize: 10 }}>
                  {props.currentNode
                    ? props.currentNode.data.extData.map((item, i) => {
                        return (
                          <div key={i}>
                            <MDBCol size="12" className="pb-2" key={i}>
                              {item.inputType === "select" ? (
                                <TextField
                                  key={i}
                                  select
                                  //error={errors.ruleDesc === "border-red"}
                                  className={`custom-txtfield w-100`}
                                  label={item.label}
                                  name={item.objIdentifier}
                                  variant="outlined"
                                  value={item.value || ""}
                                  onChange={props.handleInputData}
                                  autoComplete="new-password"
                                  inputProps={{
                                    "data-nodeid": props.currentNode.id,
                                  }}
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  {item.option.map((itm) => {
                                    return (
                                      <option key={itm.key} value={itm.key}>
                                        {itm.value}
                                      </option>
                                    );
                                  })}
                                </TextField>
                              ) : item.inputType === "table" ? (
                                  <div>
                                   
                                    <FormTable
                                      item={item}
                                      handleInputData={props.handleInputData}
                                      currNodeData={props.currentNode}
                                      sourceFeilds={sourceFeilds}
                                    />
                                  </div>
                                  
                              ) : (
                                <TextField
                                  key={i}
                                  type={item.inputType}
                                  //error={errors.ruleDesc === "border-red"}
                                  className={`custom-txtfield w-100`}
                                  label={item.label}
                                  name={item.objIdentifier}
                                  variant="outlined"
                                  value={item.value}
                                  onChange={props.handleInputData}
                                  autoComplete="new-password"
                                  inputProps={{
                                    "data-nodeid": props.currentNode.id,
                                    autoComplete: "new-password",
                                  }}
                                />
                              )}
                            </MDBCol>
                          </div>
                        );
                      })
                    : null}
                </TabPane>
                <TabPane tab="Node" key="2">
                  <MDBCol size="12" className="pb-2" key="nodeName1">
                    <TextField
                      type={"text"}
                      //error={errors.ruleDesc === "border-red"}
                      className={`custom-txtfield w-100`}
                      label={"Title"}
                      name={"nodeName"}
                      variant="outlined"
                      //value={props.currentNode?props.currentNode.data.text:""}
                      onChange={props.handleInputData}
                      inputProps={{
                        "data-nodeid": props.currentNode.id,
                        autoComplete: "new-password",
                      }}
                    ></TextField>
                  </MDBCol>
                </TabPane>
              </Tabs>
           
            </MDBCol>
            <MDBCol
              size="8"
              className="pb-2"
              key="12"
              style={{ overflowY: "scroll", height: "22rem" }}
            >
              {props.currentNode.result ? (
                <>
                  <span>
                    Total Records :{" "}
                    {props.currentNode.result.countdetails
                      ? props.currentNode.result.countdetails.totalCount
                      : null}
                  </span>
                  <MuiTable rows={props.currentNode.result.dataDetails} />
                </>
              ) : (
                <div>
                  <p>No Data</p>
                  To display data execute the node first by pressing the execute
                  button above.
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <button
            className="ant-btn btn-light"
            onClick={() => {
              props.setNodeConfig(false);
              //resetFormData();
            }}
          >
            Close
          </button>
       
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "select") {
      return <Select></Select>;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

const EditableTable = (props) => {
  const [data, setData] = useState(props.currNodeData.data.value);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const mergedColumns = (columnHeader) => {
    const action = {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => (
                <a
                  onClick={() => save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  <i className="fas fa-check"></i>
                </a>
              )}
            </EditableContext.Consumer>
            <span onClick={cancel}>
              <a>
                <i className="fas fa-times"></i>
              </a>
            </span>
          </span>
        ) : (
          <span onClick={() => edit(record)}>Edit</span>
        );
      },
    };
    const columns = [...columnHeader, action];

    const tableCols = columns.map((col) => {
      if (col.render) {
        return col;
      }

      return {
        title: col.title,
        dataIndex: col.title,
        editable: true,
        onCell: (record) => ({
          record,
          inputType: col.inputType,
          dataIndex: col.title,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    return tableCols;
  };

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (form, key) => {
    try {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...props.currNodeData.data.value];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });

          console.log("save121", newData, props);
          props.handleInputData(
            { cond: newData, node: props.currentNode },
            "join"
          );
          setData(newData);
        } else {
          newData.push(row);
          props.handleInputData(
            { cond: newData, node: props.currentNode },
            "join"
          );
        }
        setEditingKey("");
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleAdd = () => {
    const newData = {
      key: props.currNodeData.data.value.length + 1,
      source: "",
      target: "",
    };
    //setData([...data, newData]);
    props.handleInputData(
      {
        cond: [...props.currNodeData.data.value, newData],
        node: props.currentNode,
      },
      "join"
    );
  };

  return (
    <>
      <EditableContext.Provider value={props.form}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={props.currNodeData.data.value}
          columns={mergedColumns(props.item.header)}
          rowClassName="editable-row"
          pagination={false}
        />
      </EditableContext.Provider>
      <Button
        onClick={() => handleAdd()}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Add
      </Button>
    </>
  );
};

// const EditableFormTable = Form.create()(EditableTable);

function FormTable(props){
  //s3://incedo-bpd-datalake/apps/firmdataset.dsv
  const [d, setData]=useState({
    item:{},
    currNodeData:{},
    sourceFeilds:[],
  });

  const updateElement=()=>{
    props.handleInputData({...d.currNodeData}, 'join');
  }

  const addRow=()=>{
    let obj=JSON.parse(JSON.stringify(d.item.rows[d.item.rows.length-1]));
    console.log('obj121',obj);
    obj[0].selectedValue = "";
    obj[1].selectedValue = "";
    d.item.rows.push(obj);
    updateElement();
    setData({...d});
  }

  const removeRow=(i)=>{
    d.item.rows.splice(i, 1);
    updateElement();
    setData({...d});
  }

  const handleChange=(e, obj)=>{
    obj.selectedValue=e.target.value;
    updateElement();
    setData({...d});
  }

  useEffect(()=>{
    let {item, currNodeData, sourceFeilds}=props;

    sourceFeilds.forEach((v,i)=>{
      item.rows[0][i].option=[{"key":"", "value":"Select"}];

        v.feilds.forEach(f=>{
          item.rows[0][i].option.push({
            key:f.feildName,
            value:f.feildName
          });
        })
    });

    setData({
      ...d,
      item,
      currNodeData,
      sourceFeilds
    })
    // eslint-disable-next-line
  }, [props.item,  props.handleInputData, props.currNodeData, props.sourceFeilds]);

  return(
    <div>
        <div className="table-responsive border">
            <MDBTable small className="m-0">
                <MDBTableHead>
                  <tr className="uc">
                      <th>Primary Key</th>
                      <th>Foreign Key</th>
                  </tr>
                </MDBTableHead>

                <MDBTableBody>
                  {d.item?.rows?.map((rw, rn)=>(
                      <tr key={rn}>
                          <td width="45%">
                              <select className="form-control" value={rw[0].selectedValue || ''} onChange={e=>handleChange(e, rw[0])}>
                                  {rw[0].option.map((v,i)=>(
                                    <option key={i} value={v.key}>{v.value}</option>
                                  ))}
                              </select>
                          </td>

                          <td width="45%">
                            <select className="form-control" value={rw[1].selectedValue || ''} onChange={e=>handleChange(e, rw[1])}>
                                {rw[1].option.map((v,i)=>(
                                    <option key={i} value={v.key}>{v.value}</option>
                                  ))}
                              </select>
                          </td>

                          <td>
                              {rn>0?(
                                <DeleteOutlined
                                  onClick={()=>removeRow(rn)}
                                  style={{
                                    paddingLeft: "0.3rem",
                                    fontSize: "1.2rem",
                                    color: "#dc3545",
                                    cursor: "pointer",
                                  }}
                                />
                              ):null}
                          </td>
                      </tr>
                  ))}
                </MDBTableBody>
            </MDBTable>
        </div>
        <div className="pt5 d-flex">
            <Button className="float-right blue-bg" type="primary" onClick={addRow}>
              <i className="fa fa-plus"></i> Add
            </Button>
        </div>
    </div>
  )
}

export default NodeConfig;
