import React, { useState, useEffect,useContext } from "react";
import { PROJECT_ID } from "../config";
import { MDBCard, MDBCardBody, MDBNavLink } from "mdbreact";
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
          <MDBCard
            className="card header-card"
            style={{
              // width: PROJECT_ID !== 5 ? `${props.width}rem` : '15%',
              // height: PROJECT_ID !== 5 ? `${props.height}rem` : '15%',
              // borderRadius: '1%',
              backgroundColor:
                selectedKPIDomain === props.title ? color5 : color12,
            }}
          >
            <MDBCardBody className="d-flex flex-column align-items-center justify-content-center mt-4 p-0">
              {" "}
              {/*Changed: mt-4*/}
              <Icon style={{ fontSize: "2rem" }}>{props.icon}</Icon>
              <span className="sec counter counter-lg">{analysisCount}</span>
              <div>
                <MDBNavLink
                  disabled={props.navLinkTo === "#" ? true : false}
                  onClick={() => {
                    // Uncomment this code when doing KPI Folder Refactor
                    getPublishedKPIsForSelectedDomain(props.title);
                    //getSavedKPIsForSelectedDomain(props.title);
                    setSelectedKPIDomain(props.title, props.navLinkTo);
                    // setSiderKey([`${val.menuKey}`]);
                  }}
                  style={{
                    padding: "0px",
                    cursor: props.navLinkTo === "#" ? "default" : "pointer",
                  }}
                  exact
                  to={props.navLinkTo}
                >
                  <span
                    className="text-center"
                    className="text-center"
                    style={{
                      color: color7,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    {props.title}
                  </span>
                </MDBNavLink>
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Card;
