import React, { useState, useEffect,useContext } from "react";
import { PROJECT_ID } from "../config";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBNavLink } from "mdbreact";
import { AppContext } from "../AppProvider";
import Icon from "@material-ui/core/Icon";
import kpiService from "../services/kpiService";

const Card = (props) => {
  const allContext = useContext(AppContext);
  const [analysisCount, setAnalysisCount] = useState(0);
  useEffect(() => {
    kpiService
      .getAssetClassCount(props.title)
      .then((res) => {
        if (res.data.code === 200) {
          setAnalysisCount(res.data.response[0].count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allContext.pageContent]);
  return (
    <AppContext.Consumer>
      {({
        theme,
        setSelectedKPIDomain,
        selectedKPIDomain,
        getPublishedKPIsForSelectedDomain,
        getSavedKPIsForSelectedDomain,
      }) => {
        const { color12, color7, color5 } = theme;
        return (
          <MDBCard className="mt-3 mb-3" style={{width:"23%", height:"12rem", borderRadius:"4%"}}
          >
            <MDBCardTitle >            
            <MDBNavLink
            className="d-flex flex-row align-items-center justify-content-around mt-4"
                  disabled={props.navLinkTo === "#" ? true : false}
                  style={{
                    padding: "0px",
                    cursor: props.navLinkTo === "#" ? "default" : "pointer",
                  }}
                  exact
                  to={props.navLinkTo}
                >
                  <span
                    className="text-primary"
                    style={{
                      // color: color7,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    {props.title}
                    
                  </span>
                  <Icon style={{ fontSize: "1.4rem" }}>device_hub</Icon>
                </MDBNavLink>
            </MDBCardTitle>
            <MDBCardBody style={{paddingTop:"0.75rem"}}>
             <p style={{fontSize:"1rem"}}>{props.text}</p>
              
              
                
                
            
            </MDBCardBody>
          </MDBCard>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Card;
