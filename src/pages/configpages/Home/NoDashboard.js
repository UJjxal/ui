import React from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBNavLink } from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Card from "../../../utilities/Card";
import { CONTEXT } from "../../../config";

const NoDashboard = (props) => {
  return (
    <AppContext.Consumer>
      {({ menuContent, setSiderKey }) => {
        let configKey = "1";
        let menuAdmin = menuContent
          ? menuContent.filter((menu) => menu.displayName === "Admin")
          : null;

        // if (menuAdmin) {
        //   configKey = menuAdmin[0].children[0].menuKey;
        // }
        return (
          <MDBRow center>
            <Card
              icon={`${CONTEXT}/gear.svg`}
              onClick={() => {
                setSiderKey([configKey]);
              }}
              title="No Default Dashboard"
              navLinkTo=""
              txt="Contact your Admin"
              navLinkTxt="."
            />
          </MDBRow>
        );
      }}
    </AppContext.Consumer>
  );
};
export default NoDashboard;
