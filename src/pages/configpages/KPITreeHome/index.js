import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../AppProvider";
import Tree from "./Tree";
import ConfigurationAndSettings from "./ConfigurationAndSettings";

const KPITreeHome = ({ setEditMode }) => {
  const {
    KPIPublishedMenuContent,
    KPISavedMenuContent,
    treeFirstNodeDescForSaved,
    treeFirstNodeDescForPublished,
  } = useContext(AppContext);
  const [enableSetting, setEnableSetting] = useState(false);
  const toggleSetting = () => {
    setEnableSetting((prev) => !prev);
  };
  return (
    <>
      {enableSetting ? (
        <ConfigurationAndSettings />
      ) : (
        <div className="custom-container">
          {" "}
          <Tree
            label="Published KPI Trees"
            KPIMenuContent={KPIPublishedMenuContent}
            treeFirstNodeDesc={treeFirstNodeDescForPublished}
            toggleSetting={toggleSetting}
            setting
          />
          <Tree
            label="Draft KPI Trees"
            KPIMenuContent={KPISavedMenuContent}
            treeFirstNodeDesc={treeFirstNodeDescForSaved}
            setEditMode={setEditMode}
          />
        </div>
      )}
    </>
  );
};

export default KPITreeHome;
