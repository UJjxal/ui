import React from "react";
import { AppContext } from "../AppProvider";
import HeaderbarComponent from "./HeaderbarComponent";
import Loader from "../utilities/Loader";

export default function Headerbar() {
  return (
    <AppContext.Consumer>
		
      {({ menuContent, mainMenuLoading, IsSOIDomainBased, setShowSOIHeader, setSelectedKPIDomain, route, theme, selectedKPIDomain}) => {
		  return mainMenuLoading
		  ? <div className="d-flex flex-row align-items-center justify-content-center"><Loader/></div> 
      :
			!mainMenuLoading && <HeaderbarComponent menuContent={menuContent} domainBased={IsSOIDomainBased}
      setShowSOIHeader={setShowSOIHeader} setSelectedKPIDomain={setSelectedKPIDomain} route={route} 
      theme={theme} selectedKPIDomain={selectedKPIDomain}
      />
         
      }}
    </AppContext.Consumer>
  );
}
