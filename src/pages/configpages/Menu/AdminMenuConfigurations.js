import React, { Component } from "react";
import MenuComponent from "./menuComponent";
import { AppContext } from "../../../AppProvider";
export default class AdminMenuConfigurations extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ treeData, loadingMenu, domain, allUserGroups }) =>
          treeData ? (
            <MenuComponent
              treeData={treeData}
              loading={loadingMenu}
              domain={domain}
              userData={allUserGroups}
            />
          ) : (
            alert("New Tree data")
          )
        }
      </AppContext.Consumer>
    );
  }
}
