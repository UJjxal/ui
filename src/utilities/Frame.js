import React from "react";
import { MDBIframe } from "mdbreact";

const Frame = (props) => {
  return (
    <MDBIframe
      // style={{
      //   height: "35rem",
      //   width: "100%",
      //   overflow: "auto",
      //   paddingTop: "1rem",
      // }}
      src={props.link}
    />
  );
};
export default Frame;
