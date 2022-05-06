import React from 'react';
import { AppContext } from "../AppProvider";
import Sidebar from './Sidebar';
import { GATEWAYBASED } from '../config';

const SidebarSelection=(props)=>{
    return (
        <AppContext.Consumer>
          {({
            navigationType, menuContent, mainMenuLoading, IsSOIDomainBased, setShowSOIHeader,
            setSelectedKPIDomain, themeLoading, getPublishedKPIsForSelectedDomain, gatewayMenuContent
          }) => 
           navigationType==="Sidebar" && 
           <Sidebar 
           menuContent={GATEWAYBASED?gatewayMenuContent :menuContent} 
           mainMenuLoading={mainMenuLoading}
           IsSOIDomainBased={IsSOIDomainBased}
           setShowSOIHeader={setShowSOIHeader}
           setSelectedKPIDomain={setSelectedKPIDomain} 
           themeLoading={themeLoading}
           getPublishedKPIsForSelectedDomain={getPublishedKPIsForSelectedDomain}
           />
        }
        </AppContext.Consumer>
      );
}

export default SidebarSelection;

