import React, { useEffect } from 'react';
import { AppContext } from "../AppProvider";
import AssetComponent from './AssetClass/AssetComponent';


const HeaderSOISelection = () => {

  return (
    <AppContext.Consumer>
      {({
        mainMenuLoading, showSOIHeader, IsSOIDomainBased
      }) => {
        if (!mainMenuLoading && showSOIHeader && IsSOIDomainBased) {
          return <AssetComponent />
        }
      }
      }
    </AppContext.Consumer>
  );
}

export default HeaderSOISelection;

