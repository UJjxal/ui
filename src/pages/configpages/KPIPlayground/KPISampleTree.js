import React, { useState } from "react";
import data from "./sample.json";
import TreeChart from "../KPISandbox/KPIEditAnalysis/TreePreviewChart";
import uuid from "react-uuid";
import { newNode, processAllChildren, processAllChildrenForRemove } from "./helper";

const KPISampleTree = () => {
  const [treeData, setData] = useState(JSON.parse(data[0].sample_tree));

  const addChild = (parentName) => {
    let newTreeData = [...treeData];
    treeData.forEach((node) => {
      if (node.name === parentName) {
        let nextNode = JSON.parse(JSON.stringify(newNode));
        nextNode.name = uuid();
        node.children.push(nextNode);
      } else {
        node.children = [...processAllChildren(node.children, parentName)];
      }
    });
    setData(newTreeData);
  };

  const removeChild = (parentName) => {
    let newTreeData = [...treeData];
    treeData.forEach((node) => {
      node.children = [
        ...processAllChildrenForRemove(node.children, parentName),
      ];
    });
    setData(newTreeData);
  };
  
  return (
    <div>
      <TreeChart
        treeData={treeData}
        colorThreshold={"automatic"}
        addChild={addChild}
        removeChild={removeChild}
      />
    </div>
  );
};

export default KPISampleTree;
