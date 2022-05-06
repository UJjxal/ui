import React, { Component } from "react";

const MenuContext = React.createContext();

export class MenuProvider extends Component {
  constructor() {
    super();
    this.state = {
      siderCollapsed: false,
      toggleSiderCollapsed: this.toggleSiderCollapsed,
    };

  }

  toggleSiderCollapsed = () => {
    this.setState((prevState) => ({
      siderCollapsed: !prevState.siderCollapsed,
    }));
  };

  render() {
    return (
      <MenuContext.Provider value={this.state}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}

export {MenuContext};
export default MenuProvider;
