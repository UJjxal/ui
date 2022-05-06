import React, { useContext, useState } from "react";
import Tree from "react-d3-tree";
import { AppContext } from "../../../../AppProvider";
import "./TreeChart.css";
import NodeLabel from "./NodeLabel";

const TreeChart = (props) => {
  const [zoom, setZoom] = useState(0.75);
  const { theme, setSelectedTreeId } = useContext(AppContext);
  const [options, setOptions] = useState("");

  const zoomIn = () => {
    setZoom((prev) => prev < 1 ? prev + 0.1 : prev);
  };

  const zoomOut = () => {
    setZoom((prev) => prev > 0.3 ? prev - 0.1 : prev);
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
      <div id="treeWrapper" className="zoomControl">
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
              setSelectedTreeId,
              addChild,
              removeChild,
              showDrawer,
              options,
              setOptions
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
