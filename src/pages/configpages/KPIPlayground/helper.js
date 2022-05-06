import uuid from "react-uuid";

export const newNode = {
    nodeSvgShape: { shape: "rect" },
    attributes: { Billion: "+__$", Million: "+__$", Thousand: "+__$" },
    children: [],
    name: "",
    relation: "",
  };
  
export function processAllChildren(children, name) {
    let childrenObjects = [];
    children.forEach((child) => {
      console.log("Current Child:", child, "Add Child to:", name);
      childrenObjects.push({ ...processChild(child, name) });
    });
  
    return childrenObjects;
  }
  
export function processChild(child, name) {
    let childObj = { ...child };
    if (child.name === name) {
      let nextNode = JSON.parse(JSON.stringify(newNode));
      nextNode.name = uuid();
      childObj.children.push(nextNode);
      return childObj;
    } else if (childObj.children.length > 0) {
      childObj.children = [...processAllChildren([...childObj.children], name)];
    }
    return childObj;
  }
  
export function processAllChildrenForRemove(children, name) {
    let childrenObjects = [];
    children.forEach((child) => {
      console.log("Current remove Child:", child, "Add Child to:", name);
      if (child.name !== name) {
        childrenObjects.push({ ...processRemoveChild(child, name) });
      } else {
        return [];
      }
    });
  
    return childrenObjects;
  }
  
  function processRemoveChild(child, name) {
    let childObj = { ...child };
    if (childObj.children.length > 0) {
      childObj.children = [
        ...processAllChildrenForRemove([...childObj.children], name),
      ];
    }
    return childObj;
  }
  