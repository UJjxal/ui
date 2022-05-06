import React, { useEffect } from "react";
import Carousel, { CarouselItem } from "../../../components/Carousel/Carousel";
import TreeCard from "./TreeCard";
import { Button, Icon } from "@material-ui/core";
import { CONTEXT } from "../../../config";

const Tree = ({
  label,
  KPIMenuContent,
  treeFirstNodeDesc,
  setEditMode,
  toggleSetting,
  setting,
}) => {
  return (
    <div className="tree-container">
      <div className="d-flex justify-content-between tree-options">
        <div className="h-3">{label}</div>
        <div className="controls d-flex align-items-center">
          {setEditMode && (
            <Button
              size="small"
              className="bg-primary-blue text-white px-3 py-1"
              onClick={() => setEditMode(true)}
            >
              + Create New KPI Tree
            </Button>
          )}
          {setting && (
            <Button size="small" className="bg-primary-blue text-white px-3 py-1" onClick={()=>toggleSetting()}>
              <Icon className="text-white fs14 mr-2">settings</Icon> Settings
            </Button>
          )}
        </div>
      </div>
      {KPIMenuContent.length > 0 ? (
        <div className="card-carousel">
          <Carousel nav="circle">
            {KPIMenuContent.map((item, index) => {
              let currentNode = treeFirstNodeDesc.filter(node => node.treeLink === item.link);
              let nodeCount = treeFirstNodeDesc[index].nodeCount ? treeFirstNodeDesc[index].nodeCount : 0;

              return (
                currentNode.length > 0 && (
                  <CarouselItem key={index}>
                    <TreeCard
                      title={item.displayName}
                      image={nodeCount > 30 ? CONTEXT+"/long-tree.png" : nodeCount > 10 ? CONTEXT+"/medium-tree.png" : CONTEXT + `/small-tree-${Math.floor(Math.random() * 4)+1}.png`}
                      navLinkTo={CONTEXT + item.link}
                      attributes={currentNode[0].attributes}
                    />
                  </CarouselItem>
                )
              );
            })}
          </Carousel>
        </div>
      ) : (
        <p>no tree found</p>
      )}
    </div>
  );
};

export default Tree;
