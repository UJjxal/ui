import React from "react";
import { CONTEXT } from "../../../config";
import TreeCard from "../KPITreeHome/TreeCard";

const KpiDisplay = (props) => {
  return (
    <>
      {props.KPIMenuContent.length > 0
        ? props.KPIMenuContent.map((item, index) => {
            let currentNode = props.treeFirstNodeDesc.filter(
              (node) => node.treeLink === item.link
            );
            let nodeCount = props.treeFirstNodeDesc[index].nodeCount ? props.treeFirstNodeDesc[index].nodeCount : 0;

              return currentNode.length > 0 &&
                  <TreeCard
                    key={index}
                    width={14}
                    height={8}
                    title={item.displayName}
                    navLinkTo={CONTEXT + item.link}
                    attributes={currentNode[0].attributes}
                    polarity={currentNode[0].polarity}
                    unit={currentNode[0].unit}
                    nodeCount={nodeCount}
                    image={nodeCount > 30 ? CONTEXT+"/long-tree.png" : nodeCount > 10 ? CONTEXT+"/medium-tree.png" : CONTEXT + `/small-tree-${Math.floor(Math.random() * 4)+1}.png`}
                    color={
                      currentNode[0].attributes
                        ? props.getNodeStatus(
                            currentNode[0].attributes.node_status
                          )
                        : props.getNodeStatus("")
                    }
                  />
          })
        : 
        <div className="w-100 row align-items-center justify-content-center my-5">
          <div className="col-md-4">
            <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
          </div>
          <div className="col-md-4 text-center">
            <h4>No {props.listLoading ? `Saved` : `Published`} KPI Trees!</h4>
            <p className="fs16">There are no {props.listLoading ? `saved` : `published`} KPI Trees created yet for this asset. Any new KPI Tree is created in drafts and eventually published once all the needful nodes, cohorts, etc. are created.</p>
          </div>
        </div>
      }
    </>
  );
};

export default KpiDisplay;
