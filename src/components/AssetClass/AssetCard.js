import React, { useContext, useState, useEffect } from "react";
import { Card, Icon } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../AppProvider";

const AssetCard = ({ title, navLinkTo, icon, updateActive, activeCard }) => {
  const {
    setSelectedKPIDomain,
    getPublishedKPIsForSelectedDomain,
    selectedKPIDomain,
    currentPageName,
    selectedKPILink,
  } = useContext(AppContext);

  useEffect(() => {
    if (currentPageName !== 'Analysis Hub') {
      updateActive(currentPageName);
    // updateActive('')
  }

  }, [currentPageName])

  return (
    <Card className={`p-3 mr-3 asset--card ${selectedKPIDomain===title?'asset-card-active':''}`}>
      <NavLink
        onClick={() => {
          getPublishedKPIsForSelectedDomain(title);
          setSelectedKPIDomain(title, navLinkTo);
          updateActive(title);
        }}
        exact
        to={navLinkTo}
        className='asset-link d-flex justify-content-center align-items-center'
      >
        <Icon className="mr-1 material-icons-outlined">{icon}</Icon>
        <p className="mb-0 text-nowrap">{title}</p>
      </NavLink>
    </Card>
  );
};

export default AssetCard;
