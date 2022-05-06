import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { CONTEXT } from "../config";
import { AppContext } from "../AppProvider";
import Header_PNC from "./Header_PNC";

export default function HeaderbarComponent(props) {
  const [activeTab, setActiveTab] = useState(0);

  const checkSOIDomainBased = (element) => {
    let SOIHomeDisplay = false;
    if (props.domainBased) {
      element.children.forEach((child) => {
        if (child.allowSOIHome) {
          SOIHomeDisplay = true;
        }
      });
    }
    props.setShowSOIHeader(SOIHomeDisplay);
    props.setSelectedKPIDomain("", null);
  };

  useEffect(() => {
    let currentActive = 0;

    props.menuContent.forEach((element, index) => {
      if (element.allowHome) {
        currentActive = index;
        // checkSOIDomainBased(element);
      }
      setActiveTab(currentActive);
     
    });
  }, [props.menuContent]);

  return (
    <>
      <div className="container-fluid">
        <div className="pl10 pr10 pt10 mb20">
          <div className="d-flex hbar-top-tabs">
            {props.menuContent.map((val, index) => (
              <Link
                key={val.link}
                className={
                  "my-auto cpointer hbar-top-tab " +
                  (activeTab === index ? "active" : "")
                }
                exact
                to={CONTEXT + val.link}
                onClick={() => {
                  setActiveTab(index);
                  checkSOIDomainBased(val);
                }}
              >
                {val.displayName}
              </Link>
              
            ))}
          </div>
          <Breadcrumb route={props.route} menuContent={props.menuContent} activeTab={activeTab} domainBased={props.domainBased}/>
        </div>
      </div>
      {/* {activeTab === SOIBarTab && <Header_PNC className="header-menu" />} */}
    </>
  );
}

const Breadcrumb = (props) => {
  const [crumbs, setCrumbs] = useState([]);
  const selectedAssetClass = useContext(AppContext).selectedKPIDomain;
  useEffect(() => {
  
    if(!(Object.keys(props.route).length === 0
    && Object.getPrototypeOf(props.route) === Object.prototype)){
      // setUri(props.route)
      getAllLinks();

    }
  },[props])
 
  console.log("Route Recieved", props.route,selectedAssetClass);
  
  const getAllLinks=()=>{

    const checkChildren=(parent, crumbLinks)=>{
      let tempcrumbLinks = [...crumbLinks];
      let linkFound=false;
      parent.children.forEach(child=>{
        if(props.route[0].link===child.link){
          linkFound=true;
          tempcrumbLinks.push({title:parent.displayName, 
            link:parent.link});
            tempcrumbLinks.push({title:child.displayName, 
              link:child.link})
            } 
      })

      if(linkFound===false){//check for Domain Trees
  
        if(props.domainBased && parent.displayName===selectedAssetClass){
         
         tempcrumbLinks.push({title:parent.displayName, 
            link:parent.link});
            tempcrumbLinks.push({title:props.route[0].displayName, 
              link:props.route[0].link})

          }else{
              //For Non domain specific
        }
      }
      return tempcrumbLinks;
    };
    let crumbLinks = [];
    let foundLink=false;
    if(props.route[0].link === props.menuContent[props.activeTab].link){
      foundLink=true;
      crumbLinks.push({title:props.menuContent[props.activeTab].displayName, 
        link:props.menuContent[props.activeTab].link
      })
    }else{
      crumbLinks.push({title:props.menuContent[props.activeTab].displayName, 
        link:props.menuContent[props.activeTab].link
      })
     
    props.menuContent[props.activeTab].children.forEach(submenu=>{
      if(props.route[0].link===submenu.link){
        foundLink=true;
        crumbLinks.push({title:submenu.displayName, 
          link:submenu.link
        })
      }
    })
      if(foundLink===false){
        props.menuContent[props.activeTab].children.forEach(submenu=>{
        crumbLinks = [...checkChildren(submenu, crumbLinks)];
        })
      }
   
  }
  console.log("CRUMBLINKS", crumbLinks);
  setCrumbs(crumbLinks);

}
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-white mb-0">
        {/* <li className="breadcrumb-item"><Link>{props.menuContent[props.activeTab].displayName}</Link></li> */}
        {
          crumbs.length && crumbs.map((crumb, i) => (
          //  (props.menuContent[props.activeTab].displayName) !== r.displayName &&
          //    <li key={i} className="breadcrumb-item">
          //      <Link to={r.link}>{r.displayName}</Link></li>
          <li key={i} className="breadcrumb-item">
            <Link to={CONTEXT + crumb.link}>{crumb.title}</Link></li>
          ) 
          )
        }
        {/* <li className="breadcrumb-item active" aria-current="page">Data</li> */}
      </ol>
    </nav>
  );
}
