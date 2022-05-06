import React from "react";
import { MDBCard, MDBCardBody, MDBNavLink } from "mdbreact";
import { AppContext } from "../AppProvider";

const Card = (props) => {
  return (
    <AppContext.Consumer>
      {({ theme , currentTheme}) => {
        const { color12, color7 } = theme;

        return ( 
          <MDBCard
            className="m-3 text-center"
            style={{
              width: props.width?`${props.width}rem`:"20rem",
              height: props.height?`${props.height}rem`:"12rem",
              borderRadius: "5%",
              backgroundColor: color12,
            }}
          >
            <MDBCardBody className="text-primary">
              <img src={props.icon} style={{ height: "4rem", width: "4rem"}} />
              {props.navLinkTxt ? (
                <React.Fragment>
                  <h5
                    className="text-center"
                    style={{ color: color7, paddingTop: "1rem" }}
                  >
                    {props.title}
                  </h5>
                  <div style={{ color: color7, fontSize: "0.8rem" }}>
                    <span>{props.txt}</span>
                    <MDBNavLink
                      onClick={props.onClick}
                      style={{ display: "inline", paddingLeft: "0px" }}
                      exact
                      to={props.navLinkTo}
                    >
                      {props.navLinkTxt}
                    </MDBNavLink>
                  </div>
                </React.Fragment>
              ) : props.target ? (
                <a href={props.navLinkTo} target="_blank">
                  <h5
                    className="text-center"
                    style={{ color: color7, paddingTop: "1rem" }}
                  >
                    {props.title}
                  </h5>
                </a>
              ) : (
                <MDBNavLink
                  onClick={props.onClick}
                  style={{ display: "inline", paddingLeft: "0px" }}
                  exact
                  to={props.navLinkTo}
                >
                  <h5
                    className="text-center"
                    style={{ color: color7, paddingTop: "1rem" }}
                  >
                    {props.title}
                  </h5>
                  {props.subTitle ? <h6>{props.subTitle}</h6> : null}
                </MDBNavLink>
              )}
            </MDBCardBody>
          </MDBCard>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Card;
