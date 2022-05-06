import React from "react";
import Tree from "react-d3-tree";
import { MDBIcon } from "mdbreact";
import { Popover } from "antd";
import { AppContext } from "../AppProvider";
import { colorRange, defaultColor } from "./AllTables";
import { convertToInternationalCurrencySystem } from "./commonfunctions";
import "./TreeChart.css";
import { Icon } from "@material-ui/core";

import { CONTEXT } from "../config";
// import NodeLabel from "./NodeLabel";


const NodeLabel = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  className, 
  drawerOpen, 
  polarity, 
  unit, 
  currentNode,
  orientation,
  setNodeDataLength 
}) =>{
  const getNodeStatus = (status) => {
    let selectedThreshold = colorRange.filter((col) => col.val === status);
    if (selectedThreshold.length > 0) {
      return selectedThreshold[0].color;
    }
    return defaultColor;
  };
  return (
      <foreignObject {...foreignObjectProps}>
      <div
        className={`${className} row justify-content-between p-0`}
        style={{
          border:
            currentNode === nodeDatum.nodeId
              ? "2px solid black"
              : "1px solid #ccc",
        }}
      >
          <div className={`col-11 node-data ${orientation && 'h-100' }`}>
          <Popover
            className="text-center"
            content={
              <div className="p-2">
                {nodeDatum.name}
                {Object.prototype.toString.call(nodeDatum.attributes) ===
                "[object Object]"
                ? Object.entries(nodeDatum.attributes).map(function (key, i) {
                  if (key[0] != "node_status") {
                    return (
                      <span
                        key={i}
                        className="d-flex flex-row align-items-center"
                      >
                        <span className="mr-1">{key[1]}</span>
                        <span className="mr-1">
                          {unit ? unit[key[0]] : null}
                        </span>
                        <span className="">{key[0]}</span>
                      </span>
                    );
                  }
                  }):
                  nodeDatum.attributes.map(function (metric) {
                    let {show} = metric;
                    return Object.entries(metric).map((met,i) => 
                    show && met[0] !== "show" && 
                      <span
                        key={i}
                        className="d-flex flex-row align-items-center"
                      >
                        <span className="mr-1">{met[1]}</span>
                        <span className="mr-1">
                          {unit ? unit[met[0]] : null}
                        </span>
                        <span className="">{met[0]}</span>
                      </span>
                    
                    )
                  })
                }
              </div>
            }
            trigger="hover"
          >
            <div className="d-flex flex-row align-items-center">
              <div
                className="node-title"
                onClick={() => nodeDatum.childrenIdList!==undefined && drawerOpen(nodeDatum)}
              >
                {nodeDatum.name}
                {/* <span className="custom-tooltip">{nodeDatum.name}</span> */}
              </div>
              {/* <MDBIcon
              className="node-title mr-2 p-2"
              icon={currentNode === nodeDatum.nodeId ? 'chevron-left' : 'chevron-right'}
            /> */}
            </div>
          </Popover>
          {Object.prototype.toString.call(nodeDatum.attributes) ===
        "[object Object]"
          ? 
          Object.entries(nodeDatum.attributes).map(function (key) {
            if (key[0] != "node_status") {
              return (
                <div
                  key={key}
                  className="d-flex flex-row align-items-center justify-content-between pl-1"
                >
                  {/* <span className="node-attr-1">{polarity ? polarity[key[0]] : null}</span> */}
                  {/* <span>{polarity ? <MDBIcon icon={polarity[key[0]]=="-"?"arrow-down":"arrow-up"}/> : null}</span> */}
                  <span className="node-attr-2">{key[0]}</span>
                  <div>
                    <span className="mr-1 node-attr-3">
                      {unit && (unit[key[0]] === "$" || unit[key[0]] === "#")
                        ? convertToInternationalCurrencySystem(key[1])
                        : key[1].toLocaleString("en-US")}
                    </span>
                    <span className="node-attr-1 mr-2">
                      {unit ? unit[key[0]] : null}
                    </span>
                  </div>
                </div>
              );
            }
          })
          :nodeDatum.attributes.map(function (metric) {
            let {show} = metric;
            return Object.entries(metric).map(function (key,i) {
              return (
                show && key[0] !== "show" && 
                <div key={i} className="d-flex flex-row align-items-center justify-content-between pl-1">
                  <>
                    <span className="node-attr-2">{key[0]}</span>
                    <div>
                      <span className="mr-1 node-attr-3">
                        {unit && (unit[key[0]] === "$"  || unit[key[0]] === "#")
                          ? convertToInternationalCurrencySystem(key[1])
                          : key[1].toLocaleString("en-US")}
                      </span>
                      <span className="node-attr-1 mr-2">
                        {unit ? unit[key[0]] : null}
                      </span>
                    </div>
                  </>
                </div>
              );
            });
          })
          }
        </div>
        <div
          className={`node-status ${!orientation ? "node-status-horizontal" : "node-status-vertical"}`}
          style={{
            backgroundColor: getNodeStatus(
              nodeDatum.attributes.node_status
            ),
          }}
        ></div>
        {nodeDatum.children.length >0 ? (
          <>
            <div
              className={`row border d-flex justify-content-center node-action  ${!orientation ? "node-action-horizontal":"node-action-vertical"}`}
              // title={nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
              onClick={toggleNode}
            >
              {nodeDatum.children.length >0 ?
                (nodeDatum.__rd3t.collapsed ? (
                  <Icon className="text-secondary-blue">
                    keyboard_double_arrow_right
                  </Icon>
                ) : (
                  <Icon className="text-secondary-blue">
                    keyboard_double_arrow_left
                  </Icon>
                )):(<Icon className="text-secondary-blue">
                    keyboard_double_arrow_left
                  </Icon>)}
            </div>
            <Popover
              content={
                <div
                  className="function-data text-white opacity-50 position-absolute text-center"
                >
        {nodeDatum.relation}
                  {/* {nodeDatum.relation.substring(0, 20) + "..."} */}
                </div>
              }
            >
              <div
                className={`${!orientation ? "node-function-horizontal":"node-function-vertical"} border text-center ${nodeDatum.__rd3t.collapsed && 'invisible'}`}
              >
                <p className="font-italic text-primary-blue40">
                  f
                </p>
              </div>
            </Popover>
          </>
        ) : null}
      </div>

      </foreignObject>
  )
}

class TreeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 0.7,
      direction: "horizontal",
      nodeDataLength: 0,
    };
    this.t = undefined;
    this.start = 100;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.repeat = this.repeat.bind(this);
    this.zoom = this.zoom.bind(this);

    // this.onMouseUp = this.onMouseUp.bind(this)
    this.zoomOut = this.zoomOut.bind(this);
    this.zoomOutRepeat = this.zoomOutRepeat.bind(this);
    this.zoomOutDown = this.zoomOutDown.bind(this);

    this.onMouseUp = this.onMouseUp.bind(this);
  }
  //const dimensions = props.treeData.treeContainer.getBoundingClientRect();

  nodeSvgShape = {
    shape: "rect",
    shapeProps: {
      width: 140,
      height: 55,
      y: -20,
      x: -10,
      style: { fill: "skyblue", stroke: "black", strokeWidth: 1 },
    },
  };
  nodeSize = {
    x: 250,
    y: 305,
  };
  translate = {
    x: window.innerWidth / 12,
    y: window.innerHeight / 4,
  };
  separation = {
    siblings: 1,
    nonSiblings: 1,
  };

  elbow = (d, i) => {
    let margin = { top: 20, right: 40, bottom: 20, left: 30 },
      width = 250 - margin.left - margin.right,
      height = 265 - margin.top - margin.bottom;
    let pos = Object.keys(this.props.treeData[0].attributes).length > 4 ? ('M' +
      d.source.x +
      ',' +
      (height + d.source.y + 35) +
      'V' +
      (d.target.y + 25) +
      'H' +
      d.target.x +
      'V' +
      (height + d.target.y - width + 35)) : ('M' +
        d.source.x +
        ',' +
        (height + d.source.y) +
        'V' +
        (d.target.y - 20) +
        'H' +
        d.target.x +
        'V' +
        (height + d.target.y - width))
    return (
      pos
    );
  };

  // ZOOM IN
  onMouseDown() {
    this.repeat();
  }

  repeat() {
    this.zoom();
    this.t = setTimeout(this.repeat, this.start);
    this.start = this.start / 2;
  }

  zoom() {
    if (this.state.zoom < 1) {
      this.setState({ zoom: this.state.zoom + 0.1 });
    }
  }

  // ZOOM OUT
  zoomOut() {
    if (this.state.zoom > 0.3) {
      this.setState({ zoom: this.state.zoom - 0.1 });
    }
  }

  zoomOutRepeat() {
    this.zoomOut();
    this.t = setTimeout(this.zoomOutRepeat, this.start);
    this.start = this.start / 2;
  }

  zoomOutDown(e) {
    e.preventDefault();
    this.zoomOutRepeat();
  }

  // STOP ZOOMING
  onMouseUp() {
    clearTimeout(this.t);
    this.start = 100;
  }

  handleClick = (nodeData, evt) => {
    this.props.drawerOpen(nodeData);
  };

  setNodeDataLength = (length) => {
    this.setState({ nodeDataLength: length })
  } 

render() {
    let colorThreshold = [];
    //PNC Header

    if (
      this.props.colorThreshold &&
      this.props.colorThreshold !== "automatic"
    ) {
      for (const [key, value] of Object.entries(this.props.colorThreshold)) {
        if (key) {
          colorThreshold.push({
            range: key,
            color: colorRange.filter((col) => col.val === value)[0].color,
          });
        }
      }
    } else {
      colorThreshold = colorRange.map((val) => ({
        range: val.label,
        color: val.color,
      }));
    }

    const hNodeSize = { x: 250, y: 200 };
    const vNodeSize = { x: 250, y: 200 };
    const className = "tree-node";
    const { 
      drawerOpen,
      unit,
      polarity,
      currentNode,
      orientation } = this.props;
    const setNodeDataLength = this.setNodeDataLength
    return (
      <AppContext.Consumer>
        {({}) => {
          return (
            <React.Fragment>
                <div id="treeWrapper" className="zoomControl h-100"
                style={{background: `url('${CONTEXT}/dot-bg.svg') repeat`}}>
                    {this.props.orientation ? 
                      <Tree
                        collapsible={true}
                        data={this.props.treeData}
                        orientation="vertical"
                        zoom={this.state.zoom}
                        pathFunc={this.elbow}
                        initialDepth={1}
                        allowForeignObjects
                        nodeSize={{ x: 250, y: 305 }}
                        separation={{ siblings: 2, nonSiblings: 2 }}
                        styles={{
                            links: {
                                stroke: '#CCC',
                                strokeWidth: 2.5,
                            },
                        }}
                        depthFactor={300}
                        enableLegacyTransitions={true}
                        renderCustomNodeElement={(rd3tProps) =>
                          NodeLabel({
                            ...rd3tProps,
                            foreignObjectProps : {
                              width: vNodeSize.x,
                              height: vNodeSize.y,
                              x: -125,
                              y: 10,
                            },
                            className,
                            drawerOpen,
                            unit,
                            polarity,
                            currentNode,
                            orientation,
                            setNodeDataLength
                          })
                        }
                        translate={{
                            x: window.innerWidth / 2 - 200,
                            y: 0,
                        }}
                      /> :
                      <Tree
                        collapsible={true}
                        data={this.props.treeData[0]}
                        orientation="horizontal"
                        zoom={this.state.zoom}
                        pathFunc="step"
                        initialDepth={1}
                        nodeSize={{ x: 400, y: 100 }}
                        separation={{ siblings: 2.5, nonSiblings: 2.5 }}
                        styles={{
                            links: {
                                stroke: "#CCC",
                                strokeWidth: 2.5,
                            },
                        }}
                        enableLegacyTransitions={true}
                        renderCustomNodeElement={(rd3tProps) =>
                          NodeLabel({
                            ...rd3tProps,
                            foreignObjectProps : {
                              width: hNodeSize.x,
                              height: hNodeSize.y,
                              x: -120,
                              y: -95,
                            },
                            className,
                            drawerOpen,
                            unit,
                            polarity,
                            currentNode,
                            orientation,
                            setNodeDataLength
                          })
                        }
                        translate={{
                          x: window.innerWidth / 3,
                          y: window.innerHeight / 3,
                        }}
                      />}
                    </div>

                            {this.props.colorThreshold ? (
                                <React.Fragment>
                                    <div className="tree-legend tree-legend-right"
 style={{width: "2.5rem", right: "2rem", top: "2rem"}}>
                    <div className="d-flex flex-column justify-content-center" style={{boxShadow: "0px 0px 8px rgba(95, 118, 188, 0.3)"}}>
                      <button
                        className="zoomIn p-2 m-2 mb-0 h-10 border-bottom zoom-btn"
                                                onMouseUp={this.onMouseUp}
                                                onMouseDown={this.onMouseDown}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                            <button
                                                className="zoomOut p-2 m-2 h-10 zoom-btn"
                                                onMouseUp={this.onMouseUp}
                                                onMouseDown={this.zoomOutDown}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="tree-legend tree-legend-left">
                                        <ul className="d-flex flex-column align-items-start justify-content-center pl-5">
                                            {colorThreshold.map((item, i) => {
                                                // let classStatus = item;
                                                return (
                                                    <li
                                                        key={i}
                                                        className="d-flex flex-row align-items-center justify-content-center mb-2"
                                                    >
                                                        <div
                                                            className="color-block"
                                                            style={{ backgroundColor: item.color }}
                                                        ></div>
                                                        <div className="legend-range ml-1">
                                                            {item.range}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </React.Fragment>
                            ) : null}
                        </React.Fragment>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

export default TreeChart;