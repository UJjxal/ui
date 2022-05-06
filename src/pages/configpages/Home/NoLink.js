import React from "react";
import { MDBRow} from "mdbreact";
import Card from "../../../utilities/Card";
import { CONTEXT } from "../../../config";

const NoLink = (props) => {
  
        return (
          <MDBRow center>
            <Card
              icon={`${CONTEXT}/gear.svg`}
              title="No Link or submenu"
              navLinkTo=""
              txt="Contact your Admin"
              navLinkTxt="."
            />
          </MDBRow>
        )
            }
export default NoLink;
