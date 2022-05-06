import React from "react";
import { MDBRow } from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Card from "../../../utilities/Card";
//import Breadcrumb from "../../utilities/Breadcrumb";
import PageTitle from "../../../utilities/PageTitle";
import NoHomeForUser from "./NoHomeForUser";
import { CONTEXT, GATEWAYBASED } from "../../../config";

const icons = [
  require("../../../assets/homeIcon/price.svg"),
  require("../../../assets/homeIcon/gear.svg"),
  require("../../../assets/homeIcon/PA.svg"),
  require("../../../assets/homeIcon/CRS.svg"),
  require("../../../assets/homeIcon/price.svg"),
  require("../../../assets/homeIcon/gear.svg"),
];

//Change Log: New Gateway Screen - GATEWAYBASED, setGatewayMenu, cardCallbacks added

const Home = (props) => {
  const setTab = (setSiderKey, siderKey) => {
    setSiderKey(siderKey);
  };

  const cardCallbacks=(setGatewayMenu, url, useCase)=>{
		if(GATEWAYBASED && props.pageUrl === CONTEXT + '/') {setGatewayMenu('home', url, useCase);}
}

  return (
    <AppContext.Consumer>
      {({ setSiderKey, menuContent, hasRights, getPublishedKPIsForSelectedDomain, navigationType, setGatewayMenu }) => {
        let homePage = [];
       
        const processChildren = (children) => {
          children.length > 0 &&
            children.forEach((child) => processChild(child));
        };

        const processChild = (menu) => {
          if (CONTEXT + menu.link === props.pageUrl) {
            homePage.push(menu);
          } else {
            menu.children &&
              menu.children.length > 0 &&
              processChildren(menu.children);
          }
        };

        menuContent.forEach((menu) => {
          if (CONTEXT + menu.link === props.pageUrl) {
            homePage.push(menu);
          } else {
            menu.children &&
              menu.children.length > 0 &&
              processChildren(menu.children);
          }
        });

        let newChildren = [];

        if (
          homePage.length > 0 &&
          homePage[0].children &&
          homePage[0].children.length > 1
        ) {
          homePage[0].children.forEach((tab) => {
            let foundGroup = false;
            if (tab.userGroups) {
              tab.userGroups.forEach((group) => {
                if (hasRights.includes(group)) {
                  foundGroup = true;
                }
              });
            } else {
              foundGroup = true;
            }
            if (foundGroup) {
              newChildren.push({ ...tab });
            }
          });
          homePage[0].children = [...newChildren];
        }
        return (
          <React.Fragment>
            {navigationType==="Sidebar" && <PageTitle
              title={homePage.length > 0 ? homePage[0].displayName : "Home"}
            />}
            <MDBRow center>
              {homePage.length > 0 && homePage[0].children ? (
                homePage[0].children.length > 0 ? (
                  homePage[0].children.map((item, index) => {
                    const icon = icons[Math.floor(Math.random() * 6)];
                    return (
                      <Card
                        key={index}
                        icon={icon}
                        onClick={() => {
                          setTab(setSiderKey, [item.menuKey]);
                          // Uncomment this code when doing KPI Folder Refactor
                          item.allowSOIHome && getPublishedKPIsForSelectedDomain("");
                          //item.allowSOIHome && getSavedKPIsForSelectedDomain("");
                          cardCallbacks(setGatewayMenu, item.link, item.displayName); //Set 
                        }}
                        title={item.displayName}
                        navLinkTo={CONTEXT + item.link}
                      />
                    );
                  })
                ) : homePage[0].allowHome ? (
                  <NoHomeForUser title={"No Home Page"} />
                ) : (
                  <Card icon={icons[1]} title={"No Children"} navLinkTo={"#"} />
                )
              ) : (
                <Card icon={icons[1]} title={"No Children"} navLinkTo={"#"} />
              )}
            </MDBRow>
          </React.Fragment>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Home;
