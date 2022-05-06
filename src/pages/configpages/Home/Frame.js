import React from "react";
import { MDBIframe } from "mdbreact";

const Frame = (props) => {
 
 
    let newLink = props.link.replace("{uid}", props.authUserId).replace("{sid}", JSON.parse(sessionStorage.resp).token);
    //.replace("{sid}",session.storage);
    console.log("PROPS FOR IFRAME", newLink);

  return (
      <>          
        <iframe 
        name={props.name}
        src={newLink} style={{height:"100%", width:"100%", border:"none"}}/>         
      </>
    // <MDBIframe
    //   src={props.link}
    //   style={{
    //     height: "100%",
    //     width: "100%"
    //   }}
    // />
  );
};
export default Frame;
