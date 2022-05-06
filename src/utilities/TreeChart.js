import React from "react";
import Tree from "react-d3-tree";
import { MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";
import "./TreeChart.css";

class NodeLabel extends React.PureComponent {
  getNodeStatus(status) {
    switch (status) {
      case "significant_growth":
        return "#3F6CF1";

      case "modest_growth":
        return "#95C1A6";

      case "no_change":
        return "#CCCCCC";

      case "modest_loss":
        return "#E3C567";

      case "significant_loss":
        return "#B60000";

      case "l":
        return "#238823"; // green

      case "m":
        return "#FFBF00";// amber

      case "h":
        return "#CC0000";// red

      default:
        return "#CCCCCC";
    }
  }

  render() {
    const { className, nodeData, setSelectedTreeId } = this.props;
    let nodeStatus = "";
    if (nodeData.attributes.Status) {
      nodeStatus = nodeData.attributes.Status;
    } else {
      nodeStatus = "#c1c1c1"; //grey
      if (nodeData.statusval) {
        nodeStatus = this.getNodeStatus(nodeData.statusval);
      } 
    }
    
    if (nodeData.attributes.node_status) {
      nodeStatus = this.getNodeStatus(nodeData.attributes.node_status);
    }

    const transform =
      !nodeData._collapsed && nodeData.relation
        ? nodeData.relation.length / 40 > 1
          ? "translate(0px, 60px)"
          : "translate(0px, 80px)"
        : null;
    const link = "/rootcauseanalysis/4/" + nodeData.kpi_id;
    return (
      <React.Fragment>
        <div className={className} style={{ border: "1px solid #ccc" }}>
          <div className="node-data" style={{ height: "90%" }}>
            <span className="node-title">
              {nodeData.name}
              </span>
            {Object.entries(nodeData.attributes).map(function (key) {
              if (key[0] != "node_status") {
                return (
                  <span>
                    {key[0]} : {key[1]}
                  </span>
                );
              } 
            })}
          </div>
          <div className="node-status" style={{ backgroundColor: nodeStatus }}>
            {nodeData.kpi_id ? (
              <div onClick={() => setSelectedTreeId(nodeData.kpi_id)}>
                <i
                  className="fa fa-bar-chart"
                  style={{ fontSize: "36px", color: "#fff" }}
                ></i>
              </div>
            ) : null}
          </div>
          {nodeData._children ? (
            <div
              className="node-action"
              title={nodeData._collapsed ? "Expand" : "Collapse"}
            >
              {nodeData._children &&
                (nodeData._collapsed ? (
                  <MDBIcon icon="plus" />
                ) : (
                  <MDBIcon icon="minus" />
                ))}
            </div>
          ) : null}
        </div>
        {!nodeData._collapsed && nodeData.relation ? (
          <div
            id="child-relation"
            style={{
              border: "1px solid #000",
              padding: "5px",
              transform: transform,
              color: "#fff",
              textAlign: "center",
              background: nodeStatus,
              borderRadius: 20,
              maxHeight: "4.5rem",
            }}
          >
            {nodeData.relation}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

class TreeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 0.75,
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
    x: 540,
    y: 10,
    // x: dimensions.width / 2,
    // y: dimensions.height / 2
  };
  separation = {
    siblings: 1,
    nonSiblings: 1,
  };

  elbow = (d, i) => {
    let margin = { top: 20, right: 40, bottom: 20, left: 30 },
      width = 250 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;
    return (
      "M" +
      d.source.x +
      "," +
      (height + d.source.y) +
      "V" +
      d.target.y +
      "H" +
      d.target.x +
      "V" +
      (height + d.target.y - width)
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
    this.setState({ zoom: this.state.zoom + 0.1 });
  }

  // ZOOM OUT
  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.1 });
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

  render() {
    return (
      <AppContext.Consumer>
        {({ setSelectedTreeId }) => {
          return (
            <React.Fragment>
              <div
                id="treeWrapper"
                style={{ width: "100%", height: "40em" }}
                className="zoomControl"
              >
                <Tree
                  //nodeSvgShape={nodeSvgShape}
                  //initialDepth={settings.initialTreeLevel}
                  data={this.props.treeData}
                  orientation="vertical"
                  zoom={this.state.zoom}
                  onClick={(nodeData, evt) => {
                    evt.preventDefault(); 
                    console.log("evt", evt);
                    console.log("popupexpand", nodeData);
                    this.props.drawerOpen(nodeData);
                  }}
                  pathFunc={this.elbow}
                  initialDepth="1"
                  allowForeignObjects
                  nodeSvgShape={{ shape: "none" }}
                  nodeSize={{ x: 250, y: 305 }}
                  separation={{ siblings: 2, nonSiblings: 2 }}
                  styles={{
                    links: {
                      stroke: "#CCC",
                      strokeWidth: 2.5,
                    },
                  }}
                  nodeLabelComponent={{
                    render: (
                      <NodeLabel
                        className="tree-node"
                        setSelectedTreeId={setSelectedTreeId}
                      />
                    ),
                    foreignObjectWrapper: {
                      style: {
                        width: "260px",
                        height: "160px",
                        x: -130,
                        y: 50,
                      },
                    },
                  }}
                  translate={{
                    x: window.innerWidth / 2 - 150,
                    y: -30,
                  }}
                />
              </div>
              {this.props.legend ? (
                <React.Fragment>
                  <div className="tree-legend">
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="zoomIn"
                        onMouseUp={this.onMouseUp}
                        onMouseDown={this.onMouseDown}
                      >
                        <i className="fas fa-search-plus"></i>
                      </button>
                      <button
                        className="zoomOut"
                        onMouseUp={this.onMouseUp}
                        onMouseDown={this.zoomOutDown}
                      >
                        <i className="fas fa-search-minus"></i>
                      </button>
                    </div>

                    <ul>
                      {this.props.legend.map(function (item) {
                        let classStatus = "percent " + item.color;
                        return (
                          <li>
                            <strong className={classStatus}></strong>
                            <span className="choice">{item.label}</span>
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

// const TreeChart = (props) => {
//   return (
//     <div id="treeWrapper" style={{ width: "100%", height: "30em" }}>
//       <Tree
//         orientation="vertical"
//         zoom={3}
//         zoomable={true}
//         data={props.treeData}
//       />
//     </div>
//   );
// };

export default TreeChart;
