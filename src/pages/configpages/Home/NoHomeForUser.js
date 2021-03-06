import React from "react";
import {MDBRow} from "mdbreact";
import {AppContext} from "../../../AppProvider";
import Card from "../../../utilities/Card";
import {CONTEXT} from "../../../config";

const NoHomeForUser = (props) => {
    return (
        <AppContext.Consumer>
            {({menuContent, setSiderKey}) => {
                let configKey = "1";
                let menuAdmin = menuContent
                    ? menuContent.filter((menu) => menu.displayName === "Admin")
                    : null;

                if (menuAdmin) {
                    // configKey = menuAdmin[0].children[0].menuKey;
                    configKey = 1
                }
                return (
                    <MDBRow center>
                        <Card
                            icon={`${CONTEXT}/gear.svg`}
                            onClick={() => {
                                setSiderKey([configKey]);
                            }}
                            title={props.title || "No Link Set"}
                            navLinkTo=""
                            txt="Contact your Admin for access"
                            navLinkTxt="."
                        />
                    </MDBRow>
                );
            }}
        </AppContext.Consumer>
    );
};
export default NoHomeForUser;
