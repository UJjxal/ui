import React, { useState } from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBNavLink,
} from "mdbreact";
import "antd/dist/antd.css";
import { Popover } from "antd";
import { AppContext } from "../AppProvider";
import Logout from "./Logout";

const Card = (props) => {
  return (
    <AppContext.Consumer>
      {({
        theme,
        changeLoginStatus,
        authUser,
        userPosition,
        userPic,
        userMail,
        hasRights
      }) => {
        const { color5, color4, color7 } = theme;

        return (
          <MDBBreadcrumb
            // className="z-depth-1X ml-3 mr-3 d-flex flex-row "
            className="d-flex flex-row align-items-center"
            style={{
              backgroundColor: color4,
              fontSize: "1.2rem",
              borderRadius: "0px",
              padding: "0 1rem",
              borderBottom: '1px solid',
							borderBottomColor: theme.color5,
              // boxShadow:
              //   "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
                height:'100%'
            }}
          >
            {/* {props.breadcrumb
              ? props.breadcrumb.map(function (e, i) {
                  return (
                    <MDBBreadcrumbItem>
                      <MDBNavLink
                        exact
                        to={e.link}
                        style={{ display: "contents", color: "#c1c1c1" }}
                      >
                        {props.breadcrumb.length > 2 &&
                        i < props.breadcrumb.length - 2
                          ? "..."
                          : e.displayName}
                      </MDBNavLink>
                    </MDBBreadcrumbItem>
                  );
                })
              : ""} */}
            <MDBBreadcrumbItem active>
              <strong style={{ color: color7 }}>{props.title}</strong>
            </MDBBreadcrumbItem>
            <span className="ml-auto">
              <Popover
                placement="bottomRight"
                // title={'Admin'}
                content={
                  <Logout
                    authUser={authUser}
                    userPosition={userPosition}
                    userPic={userPic}
                    userMail={userMail}
                    logout={changeLoginStatus}
                    hasRights={hasRights}
                  />
                }
                trigger="click"
              >
                {userPic ? (
                  <img
                    src={`data:image/jpeg;base64,${userPic}`}
                    style={{
                      borderRadius: "2rem",
                      height: "2rem",
                      verticalAlign: "sub",
                    }}
                  />
                ) : (
                  <MDBIcon
                    className="mt-1"
                    style={{ fontSize: "3rem" }}
                    size="lg"
                    icon="user-circle"
                  />
                )}
              </Popover>
            </span>
          </MDBBreadcrumb>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Card;
