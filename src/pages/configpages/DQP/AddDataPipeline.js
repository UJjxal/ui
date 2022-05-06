import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ReactFlow, {  removeElements,  addEdge,  MiniMap,  Controls,  Background,  Handle,} from "react-flow-renderer";
import {  Button,  message,} from "antd";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import DataPipelineDrawer from "./components/DataPipelineDrawer";
import NodeConfig from "./components/NodeConfig";
import "./components/layouting.css";
import PageTitle from "../../../utilities/PageTitle";
import { PYTHON_API_ROOT, CONTEXT } from "../../../config";

const initialElements = [];

const tabs = [
  { id: 1, name: "Source", key: "source" },
  { id: 2, name: "Transform", key: "transform" },
  { id: 3, name: "Target", key: "target" },
];

const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const customNodeStyles = {
  border: "1px dashed #9CA8B3",
  color: "#FFF",
  padding: 1,
  position: "relative",
};

const AddDataPipeline = (props) => {
  const [elements, setElements] = useState(initialElements);
  const [cordinateChk, setCordinateChk] = useState({
    clientX: 100,
    clientY: 100,
  });
  const [visible, setVisible] = useState(false);
  const [newNode, setNewNode] = useState({ id: 1 });
  const [nodeList, setNodeList] = useState(props.nodeList);
  const [nodeConfig, setNodeConfig] = useState(false);
  const [currentNode, setCurrentNode] = useState(false);
  const [pipelineName, setPipelineName] = useState(`DQP-${props.uniqId()}`);
  const [loadingExe, setLoadingExe] = useState(false);

  const showDrawer = () => {
    console.log("showDrawer");
    setVisible(true);
  };

  const onCloseDrawer = () => {
    console.log("onCloseDrawer");
    setVisible(false);
  };

  const onElementsRemove = (elementsToRemove) => {
    console.log("onElementsRemove", elementsToRemove);
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const checkConnector = (els, targetNode) => {
    const count = els.filter((item) => item.target === targetNode);
    return count.length;
  };

  const onConnect = (params) => {
    setElements((els) => {
      const updatedEle = els.map((item) => {
        if (item.id === params.target && item.data.nodeBaseType === "target") {
          item.data = {
            ...item.data,
            colorLfBrd: "#006400",
            colorBkd: "#e2f5e1",
          };
        }
        if (
          item.id === params.target &&
          item.data.nodeType === "Join" &&
          checkConnector(els, params.target)
        ) {
          item.data = {
            ...item.data,
            colorLfBrd: "#006400",
            colorBkd: "#e2f5e1",
          };
        }
        return item;
      });

      return addEdge({ ...params, arrowHeadType: "arrowclosed" }, updatedEle);
    });
    console.log("onConnect121", params);
  };

  // const onElementClick = useCallback((event, element) => {
  //   console.log("click", element, cordinateChk);
  //   setCordinateChk({ clientX: event.clientX - 300, clientY: event.clientY });
  //   setCurrentNode(element);
  // },[elements]);

  const onElementClick = (event, element) => {
    console.log("nodeClick", element, cordinateChk);
    if (element.data) {
      setCordinateChk({ clientX: event.clientX - 300, clientY: event.clientY });
      const currentEle = elements.filter((item) => item.id === element.id)[0];
      setCurrentNode(currentEle);
    }
  };

  const onNodeDragStop = (event, node) => console.log("drag stop", node);

  const onSave = useCallback(() => {
    if (elements.length > 0) {
      console.log("onSaveEle", elements);
      const newObj = elements
        .filter((chkItm) => chkItm.hasOwnProperty("data"))
        .map((item) => {
          if (item.data) {
            return {
              nodeBaseType: item.data.nodeBaseType,
              nodeId: item.id,
              parentId: getParentIds(item),
              nodeName: item.data.text,
              nodeType: item.data.nodeType,
              properties: getNodeProperty(item.data),
            };
          }
        });
      console.log("newObj", newObj);
      props.handleSaveFlow({ pipelineName: pipelineName, nodes: newObj });
    }
  }, [elements]);

  const getParentIds = (chkItem) => {
    if (chkItem.data.nodeBaseType === "source") {
      return "";
    }
    return elements
      .filter((fltItm) => fltItm.target === chkItem.id)
      .map((itm) => itm.source);
  };

  const getNodeProperty = (data) => {
    let properties = data.extData.map((item) => {
      return { [item.objIdentifier]: item.value };
    });
    if (data.nodeType === "Join") {
      properties = { ...properties, condition: data.condition };
    }
    return properties;
  };

  const onRestore = useCallback(() => {
    console.log("onRestore");
  }, []);

  const getNodeId = () => `${+new Date()}`;

  const onAdd = () => {
    showDrawer();
  };

  const handleAddNode = (item = null) => {
    //useCallback
    const newNodeCrt = {
      id: `node_` + getNodeId(),
      type: "special",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        text: item.name,
        nodeType: item.nodeType,
        nodeBaseType: item.nodeBaseType,
        icon: item.icon,
        extData: item.external,
        intData: item.internal,
        value:
          item.nodeType === "Join"
            ? [{ key: 1, source: "primary key", target: "foreign key" }]
            : "",
        colorLfBrd: item.nodeBaseType === "source" ? "#006400" : "#db0000",
        colorBkd: item.nodeBaseType === "source" ? "#e2f5e1" : "#fae8ec",
      },
      position: {
        x: cordinateChk.clientX, //Math.random() * window.innerWidth - 100,
        y: cordinateChk.clientY, //Math.random() * window.innerHeight,
      },
      style: { width: "13rem", border: "1px solid #c1c1c1", borderRadius: 7 },
    };
    setElements((els) => els.concat(newNodeCrt));
    onCloseDrawer();
  };

  function tabOnChange(key) {
    console.log("tabOnChange", key);
  }

  function tabOnSearch(txt) {
    const records = props.nodeList.filter(
      (item) => item.name.toLowerCase().search(txt.toLowerCase()) !== -1
    );
    setNodeList(records);
  }

  const tabOnClick = (item = null) => {
    //console.log("tabOnClick", item, elements);
    //setNewNode(item);
    handleAddNode(item);
  };

  const handleCog = (e) => {
    setNodeConfig(true);
  };

  const handleDelete = (e) => {
    console.log("handleDelete", e);
    //onElementsRemove
  };

  const handlePlay = (e) => {
    console.log("handlePlay", currentNode, e);
  };

  const CustomNodeComponent = ({ data }) => {
    return (
      <>
        {data.nodeBaseType !== "source" ? (
          <Handle
            id={data.id}
            type="target"
            position="left"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: 0,
              height: "45%",
              background: "#555",
              width: "10px",
            }}
            onConnect={(params) => console.log("handle onConnect", params)}
          />
        ) : null}

        <div
          className="p-1"
          style={{ borderLeft: `3px solid ${data.colorLfBrd}` }}
        >
          <div className="row m-0" style={{ background: `${data.colorBkd}` }}>
            <div className="col col-md-4 p-0">
              <img
                src={require(`../../../assets/dqp/${data.icon}`)}
                style={{ width: "3rem", height: "3rem" }}
              />
            </div>
            <div className="col p-0 pl-1">
              <div className="row font-weight-bold" title={data.text}>
                {`${
                  data.nodeBaseType.charAt(0).toUpperCase() +
                  data.nodeBaseType.slice(1)
                }:`}
                {data.text.length + data.nodeBaseType.length > 18
                  ? data.text.substr(0, 10) + ".."
                  : data.text}
              </div>
              <div className="row">{data.nodeType}</div>
            </div>
          </div>
          <div
            className="row m-0 mt-1 icon-action"
            style={{
              borderTop: "1px solid #e8e8e8",
              background: `${data.colorBkd}`,
            }}
          >
            {[
              { icon: "play", fn: handlePlay, title: "Execute Node" },
              { icon: "pause", fn: handleCog, title: "Stop Node" },
              { icon: "trash", fn: handleDelete, title: "Delete Node" },
              { icon: "cog", fn: handleCog, title: "Configure Node" },
            ].map((item, i) => {
              return (
                <span
                  onClick={item.fn}
                  key={`tab` + i}
                  style={{
                    float: "left",
                    textAlign: "center",
                    width: "25%",
                    color: "#cacaca",
                  }}
                  node-id={data.id}
                  title={item.title}
                >
                  <i className={`fas fa-${item.icon}`}></i>
                </span>
              );
            })}
          </div>
        </div>
        {data.nodeBaseType !== "target" ? (
          <Handle
            type="source"
            position="right"
            id={data.id}
            style={{
              top: "50%",
              transform: "translate(20%,-50%)",
              borderRadius: "50%",
              width: 14,
              height: 14,
              background: "#555",
            }}
          />
        ) : null}
      </>
    );
  };

  const nodeTypes = {
    special: CustomNodeComponent,
  };

  const handleInputData = (e, nodeType = "text") => {
    let newEle = "";
    console.log("updateNodeEle1", elements, e);
    if (nodeType === "join") {
      newEle = elements.map((ele1) => {
        if (ele1.id === e.node) {
          ele1.data = { ...ele1.data, value: e.cond };
          setCurrentNode(ele1);
        }
        return ele1;
      });
      //console.log("updateNodeEle2", newEle);
    } else {
      //console.log("updateNodeEle1", e.target);
      const nodeId = e.target.getAttribute("data-nodeid");

      if (e.target.name === "nodeName") {
        newEle = elements.map((ele) => {
          if (ele.id === nodeId) {
            ele.data = { ...ele.data, text: e.target.value };
          }
          return ele;
        });
      } else {
        newEle = elements.map((ele) => {
          if (ele.id === nodeId) {
            ele.data.extData = ele.data.extData.map((ext) => {
              if (ext.objIdentifier === e.target.name) {
                return { ...ext, value: e.target.value };
              }
              return ext;
            });
          }
          return ele;
        });
      }
    }

    setElements(newEle);
    console.log("updateNodeEle3", newEle);
  };

  const handleExecuteNode = () => {
    console.log("handleExecuteNode", currentNode);
    setLoadingExe(true);
    let bodyFormData = {
      connector: currentNode.data.nodeType.toLowerCase(),
    };
    currentNode.data.extData.forEach(element => {
      bodyFormData = {...bodyFormData, [element.objIdentifier]:element.value}
    });
    console.log("parameter121", bodyFormData);
    const url = PYTHON_API_ROOT + `transformStepDetails/${props.token}`;
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        if (result.data.code === 200) {
          console.log("result121", currentNode);
          message.success("Node execute successfully.");
          addResultInElements(result.data.response);
          setLoadingExe(false);
        } else {
          setLoadingExe(false);
          addResultInElements("");
          message.error(result.data.response);
        }
        console.log("handleSaveFlow", result);
      })
      .catch((err) => {
        setLoadingExe(false);
        addResultInElements("");
        message.error("Some error has occur.");
        console.error("handleSaveFlow..#", err);
      });
  };

  /** update element state */
  const addResultInElements = (response) => {
    setElements((els) => {
      const updatedEle = els.map((item) => {
        if (item.id === currentNode.id) {
          item = { ...item, result: response };
        }
        return item;
      });
      return updatedEle;
    });
    setCurrentNode({ ...currentNode, result: response });
  };

  return (
    <>
      <PageTitle
        title={
          <Title
            pipelineName={pipelineName}
            setPipelineName={setPipelineName}
          />
        }
        marginLeft="1.5rem"
        extra={
          <>
            <Button
              className="float-right mt-4 mr-4 blue-bg"
              type="primary"
              onClick={() => props.setCurrentSelected("pipelines")}
            >
              View Data Pipeline
            </Button>
            <Button
              className="float-right mt-4 mr-2 blue-bg"
              type="primary"
              onClick={onSave}
            >
              save
            </Button>
          </>
        }
      />
      <div style={{ height: "83%", width: "95%" }}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onElementClick={onElementClick}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          onLoad={onLoad}
          //snapToGrid={true}
          defaultZoom={1}
          minZoom={0.5}
          maxZoom={2}
          nodeTypes={nodeTypes}
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "input") return "#0041d0";
              if (n.type === "output") return "#ff0072";
              if (n.type === "default") return "#1a192b";
              return "#eee";
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return "#fff";
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#aaa" gap={10} />
        </ReactFlow>
      </div>
      <div className="save__controls">
        <Fab
          color="primary"
          aria-label="add"
          onClick={onAdd}
          style={{ position: "absolute", top: "15%", right: "2%" }}
        >
          <AddIcon />
        </Fab>
      </div>

      <DataPipelineDrawer
        onCloseDrawer={onCloseDrawer}
        visible={visible}
        tabs={tabs}
        tabOnSearch={tabOnSearch}
        tabOnChange={tabOnChange}
        nodeList={nodeList}
        tabOnClick={tabOnClick}
      />
      <NodeConfig
        nodeConfig={nodeConfig}
        setNodeConfig={setNodeConfig}
        elements={elements}
        currentNode={currentNode}
        handleInputData={handleInputData}
        handleExecuteNode={handleExecuteNode}
        loadingExe={loadingExe}
      />
    </>
  );
};

export function Title(props) {
  const [flowName, setFlowName] = useState(false);
  const editTitle = () => {
    setFlowName(true);
    console.log("editTitle");
  };

  const handleBlur = (e) => {
    setFlowName(false);
    console.log("handleBlur", e.target.value);
    props.setPipelineName(e.target.value);
  };

  return (
    <>
      Add Pipeline{" "}
      <span style={{ fontSize: 15 }}>
        {flowName ? (
          <input
            type="text"
            className="w-50"
            onBlur={handleBlur}
            defaultValue={props.pipelineName}
            style={{ padding: ".375rem .75rem", border: "1px solid #ced4da" }}
          />
        ) : (
          <>
            {props.pipelineName}
            <a>
              {" "}
              <i className="fas fa-pencil-alt" onClick={editTitle}></i>
            </a>
          </>
        )}
      </span>
    </>
  );
}

export default AddDataPipeline;
