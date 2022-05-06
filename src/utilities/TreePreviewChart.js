import React, { useContext, useState } from "react";
import Tree from "react-d3-tree";
import { AppContext } from "../AppProvider";
import "./TreeChart.css";

import { Icon } from "@material-ui/core";
import { MDBIcon } from "mdbreact";

const NodeLabel = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  className,
}) => (
  <foreignObject {...foreignObjectProps}>
    <div
      className={className}
      style={{
        border: `1px solid ${nodeDatum.error === "" ? "#ccc" : "#f00"}`,
      }}
    >
      <div className="node-data" style={{ height: "90%" }}>
        <div className="d-flex align-items-center justify-content-between m-2">
          <span
            className="node-title p-1"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {nodeDatum.name !== "" ? nodeDatum.name : "No Title"}
          </span>
        </div>
        {Object.prototype.toString.call(nodeDatum.attributes) ===
        "[object Object]"
          ? Object.entries(nodeDatum.attributes).map(function (key) {
              //if (key[0] != "statusVal") {
              return (
                <div className="d-flex align-items-senter justify-content-between ml-1 mr-1">
                  <span style={{ fontWeight: "bold" }}>
                    {key[1]} {key[0]}
                  </span>
                </div>
              );
              //}
            })
          : //attributes is an array
            nodeDatum.attributes.map(function (metric) {
              return Object.entries(metric).map(function (key) {
                return (
                  <div className="d-flex mx-1">
                    {
                      //If val.show exists with a true val
                      !(key[0] === "show") && (
                        <>
                          {metric.show || !metric.hasOwnProperty("show") ? (
                            <Icon
                              style={{ color: "green", fontSize: "1rem" }}
                              className="align-middle mr-1"
                            >
                              check_circle_sharp
                            </Icon>
                          ) : (
                            <Icon
                              style={{ color: "red", fontSize: "1rem" }}
                              className="align-middle text-secondary-red mr-1"
                            >
                              cancel_sharp
                            </Icon>
                          )}

                          {key[1] !== "undefined" && key[0] !== "undefined" && (
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              {key[1]} {key[0]}
                            </span>
                          )}
                        </>
                      )
                    }
                  </div>
                );
              });
            })}
      </div>
      <div
        className="d-flex flex-column justify-content-between node-status"
        style={{ backgroundColor: "#ccc", padding: "20px" }}
      >
        {nodeDatum.children.length > 0 && (
          <div className="node-action" onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? (
              <MDBIcon
                icon="plus"
                style={{ fontSize: "25px", color: "#000" }}
              />
            ) : (
              <MDBIcon
                icon="minus"
                style={{ fontSize: "25px", color: "#000" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  </foreignObject>
);

const TreeChart = (props) => {
  const [zoom, setZoom] = useState(0.75);
  const { theme, setSelectedTreeId } = useContext(AppContext);

  const zoomIn = () => {
    setZoom((prev) => prev + 0.1);
  };

  const zoomOut = () => {
    setZoom((prev) => prev - 0.1);
  };
  const nodeSize = { x: 250, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -130,
    y: -100,
  };
  const className = "tree-node";
  const { addChild, removeChild, showDrawer } = props;

  return (
    <React.Fragment>
      <div id="treeWrapper" style={{ height: "35rem" }} className="zoomControl">
        <Tree
          data={props.treeData[0]}
          orientation="vertical"
          zoom={zoom}
          pathFunc="step"
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
          enableLegacyTransitions={true}
          renderCustomNodeElement={(rd3tProps) =>
            NodeLabel({
              ...rd3tProps,
              foreignObjectProps,
              className,
            })
          }
          translate={{
            x: window.innerWidth / 2 - 150,
            y: 130,
          }}
        />
      </div>
      <div
        className="tree-legend tree-legend-right"
        style={{ width: "2.5rem", right: "2rem", top: "2rem" }}
      >
        <div
          className="d-flex flex-column justify-content-center"
          style={{ boxShadow: "0px 0px 8px rgba(95, 118, 188, 0.3)" }}
        >
          <button
            className="zoomIn p-2 m-2 mb-0 h-10 border-bottom zoom-btn"
            onClick={zoomIn}
          >
            <i className="fas fa-plus"></i>
          </button>
          <button className="zoomOut p-2 m-2 h-10 zoom-btn" onClick={zoomOut}>
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TreeChart;
