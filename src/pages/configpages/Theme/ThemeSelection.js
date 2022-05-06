import React, { Component } from "react";
import ThemeComponent from "./ThemeComponent";
import { AppContext } from "../../../AppProvider";
export default class ThemeSelection extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ currentTheme, IsSOIDomainBased, navigationType }) =>
         
           {
            console.log("theme ", currentTheme); 
            return ( <ThemeComponent
             currentTheme={currentTheme}
             IsSOIDomainBased = {IsSOIDomainBased}
             navigationType = {navigationType}
            />)}
        
        }
      </AppContext.Consumer>
    );
  }
}
