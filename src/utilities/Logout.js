import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {CONTEXT} from '../config';
import { SSO } from '../config';
import {
  MDBIcon,
  MDBCardBody,
  MDBCard,
  MDBCardImage,
  MDBCardFooter,
} from "mdbreact";

function Logout({ logout, authUser, userPosition, userPic, userMail, hasRights, SSOType }) {
  // const history = useHistory();

  return (
    <MDBCard className="m-0">
      <MDBCardBody className="text-center">
        {userPic ? (
          <MDBCardImage
            src={`data:image/jpeg;base64,${userPic}`}
            style={{ borderRadius: "2rem", margin: "auto" }}
          />
        ) : (
          <MDBIcon
            className=""
            style={{ fontSize: "5rem" }}
            size="lg"
            icon="user-circle"
          />
        )}

        {/* <img
          src={`data:image/jpeg;base64,${userPic}`}
          style={{ height: "20px", width: "20px" }}
        /> */}
        <h6 className="mt-2 mb-0 text-capitalize">{authUser}</h6>
        <div>{userMail}</div>
        <div>{userPosition}</div>
        <div>Groups:</div>
        {hasRights.map((right, index)=><div key={index}>{right}</div>)}
      </MDBCardBody>
      <MDBCardFooter>
        {SSOType!=='SSO'?<div
          style={{ textAlign: "center" }}
          onClick={(e) => {
            // history.push("/");
            logout();
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ marginRight: 5 }}></i>
          <a href={CONTEXT + "/"} style={{ color: "#555555" }}>
            Logout
          </a>
        </div>:null}
      </MDBCardFooter>
    </MDBCard>
  );
}

export default Logout;
