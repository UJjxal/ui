import React, { useEffect } from "react";
import { AppContext } from "../AppProvider";
import "antd/dist/antd.css";
import { Icon } from '@material-ui/core';
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import { Popover } from "antd";
import Logout from "../utilities/Logout";
import { CONTEXT, GATEWAYBASED } from "../config";
// const pncLogo = require("../assets/pnc.png");


const Header = () => {
  const location = useLocation();
  //const history = useHistory();
  const checkSOIDomainBased = (
    menuContent,
    domainBased,
    setShowSOIHeader,
    setSelectedKPIDomain
  ) => {
    if (domainBased) {
      let SOIHomeDisplay = false;

      let element = menuContent.filter((page) => page.link === "/");
      if (element.length > 0) {
        element[0].children.forEach((child) => {
          if (child.allowSOIHome) {
            SOIHomeDisplay = true;
          }
        });

        setShowSOIHeader(SOIHomeDisplay);
        setSelectedKPIDomain("", null);
      }
    }
  };

  useEffect(() => {

  },[location])

  return (
    <AppContext.Consumer>
      {({
        theme,
        currentTheme,
        route,
        domain,
        changeLoginStatus,
        authUser,
        userPosition,
        userPic,
        userMail,
        hasRights,
        setShowSOIHeader,
        setSelectedKPIDomain,
        menuContent,
        IsSOIDomainBased,
        setGatewayMenu  //Gateway Screen
      }) => {

        return (
            <div className="container-fluid border-bottom position-relative header-area"
              style={{
                backgroundColor: theme.color4,
                borderBottomColor: theme.color5,
                height: "100%",
                paddingTop: "5px",
                zIndex: 2,
              }}
            >
              <div className="row align-items-center">
                <div className="col-6">
                  <NavLink
                    onClick={() =>
                      {checkSOIDomainBased(
                        menuContent,
                        IsSOIDomainBased,
                        setShowSOIHeader,
                        setSelectedKPIDomain
                      );
                      GATEWAYBASED && setGatewayMenu('header', '')
                    }}
                    to={`${CONTEXT}/`}
                  >
                    {/* <img className="ml-5" src={Logoincedo} style={{ width: '6rem', cursor:'pointer !important' }} alt="Incedo Logo" /> */}
                    <img
                      className="cursor-pointer ml-2 pt-1"
                      src={currentTheme === 0 ? `${CONTEXT}/lighthouse-logo-white.png` : `${CONTEXT}/lighthouse-logo-black.png`}
                      style={{ width: "13rem" }}
                      alt="Incedo Logo"
                    />
                  </NavLink>
                </div>
                <div className="col-6 d-flex">
                  <div className="d-flex align-items-center ml-auto">
                    <span className="text-capitalize mr-3"
                    style={{color:theme.color6}}
                    >Hi, {authUser && authUser.split(" ")[0]}</span>
                    <Popover
                      placement="bottomRight"
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
                        <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary-blue cursor-pointer mr-2" style={{ width: "35px", height: "35px" }}>
                          <span className="fs16 text-uppercase text-white">{authUser && authUser.split(" ").map((n) => n[0]).join("")}</span>
                        </div>
                      )}
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Header;
