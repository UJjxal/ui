import React, {useEffect, useState} from "react";
import {AppContext} from "../AppProvider";
import {MenuContext} from "../context/MenuContext";
import "antd/dist/antd.css";
import {MDBIcon} from "mdbreact";
import {NavLink} from "react-router-dom";
//import "../index.css";
import {Layout, Menu} from "antd";
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
//import { ReactComponent as Logoincedo } from "../assets/incedoProject.svg";
import Loader from "../utilities/Loader";
import {CONTEXT} from "../config";

// let incedoLogo = {};
// incedoLogo["0"] = require("../assets/incedoProject.svg");
// incedoLogo["1"] = require("../assets/incedo_LightHouse.svg"); //incedoProject1
// incedoLogo["2"] = require("../assets/incedo_LightHouse.svg"); //incedoProject2
// incedoLogo["dark"] = require("../assets/incedo_LightHouse_black.svg");

const {SubMenu} = Menu;
const {Sider} = Layout;

const useStyles = makeStyles((theme) => ({
    root: {
        "& > span": {
            margin: theme.spacing(1),
        },
    },
}));


const Sidebar = (props) => {
    //const [collapsed, setCollapsed] = useState(false);
    const [redBorder, setRedBorder] = useState(false);
    const [index, setIndex] = useState(0);

    const check = (val) => (event) => {
        setIndex(event.keyPath[1]);
        setRedBorder(!redBorder);
    };

    useEffect(() => {
        props.menuContent.forEach((element) => {
            if (!props.mainMenuLoading && !props.themeLoading && element.allowHome) {
                checkSOIDomainBased(element); //Not Working till Theme API is not called
            }
        });
    }, [props.menuContent]);

    const checkSOIDomainBased = (menu) => {
        let SOIHomeDisplay = false;
        props.IsSOIDomainBased &&
        menu.children.forEach((child) => {
            if (child.allowSOIHome) {
                SOIHomeDisplay = true;
            }
        });

        props.setShowSOIHeader(SOIHomeDisplay);
        props.setSelectedKPIDomain("", null);
    }

    const renderItem = (val, setSiderKey, color6, sideClass, marginMenu, siderCollapsed) => {

        return (
            <Menu.Item
                key={`${val.menuKey}`}
                id="sidemenu-title"
                className="w-100 border-dark"
            >
        <span>
          {/* <MDBIcon icon={val.icon} />  */}
            {val.link ? (
                <NavLink
                    exact
                    to={CONTEXT + val.link}
                    onClick={() => {
                        setSiderKey([`${val.menuKey}`]);
                        !val.allowSOIHome && checkSOIDomainBased(val);
                        val.allowSOIHome && props.getPublishedKPIsForSelectedDomain(props.IsSOIDomainBased ? val.displayName : "")
                        val.allowSOIHome && props.IsSOIDomainBased && props.setSelectedKPIDomain(val.displayName, val.link)
                    }}
                    className={sideClass}
                >
              <span className="font-weight-normal"
                    style={
                        siderCollapsed
                            ? {marginLeft: "3rem"}
                            : {
                                color: color6,
                                marginLeft: marginMenu + "rem",
                            }
                    }
              >
                {val.displayName}
              </span>
                </NavLink>
            ) : (
                <span className="font-weight-normal"
                      style={
                          siderCollapsed
                              ? {marginLeft: "3rem"}
                              : {color: color6, marginLeft: marginMenu + "rem"}
                      }
                >
              {val.displayName}
            </span>
            )}
        </span>
            </Menu.Item>
        );
    };

    const renderSubmenu = (
        val,
        setSiderKey,
        hasRights,
        color6,
        sideClass,
        marginMenu,
        siderCollapsed
    ) => {
        //PNC change
        let newMarginMenu = 0.8; //marginMenu + 0;
        // console.log("TERRIFIC",getPublishedKPIsForSelectedDomain);
        return (
            <SubMenu
                id="sidemenu-title"
                key={`${val.menuKey}`}
                onClick={check(val.menuKey)}
                style={
                    val.menuKey == index && redBorder
                        ? {
                            borderLeft: "2px solid red",
                            marginLeft: "0px",
                            paddingleft: "0px",
                        }
                        : null
                }
                title={
                    <div className="d-flex flex-row align-items-center">
                        {val.icon !== '' && typeof (val.icon) === "string" &&
                            <Icon
                                style={{
                                    margin: "0px",
                                    fontSize: "1.3rem",
                                    marginRight: "0.6rem",
                                    cursor: "pointer",
                                    color: val.menuKey == index && redBorder ? "#ff4500" : "gray",
                                }}>
                                {val.icon}
                            </Icon>}
                        {val.icon !== '' && typeof (val.icon) === "object" ?
                            val.icon.type === "material"
                                ? <Icon
                                    style={{
                                        margin: "0px",
                                        fontSize: "1.3rem",
                                        marginRight: "0.6rem",
                                        cursor: "pointer",
                                        color: val.menuKey == index && redBorder ? "#ff4500" : "gray",
                                    }}>
                                    {val.icon.name}
                                </Icon>
                                : <img
                                    className="m"
                                    src={`${CONTEXT}/SidebarIcons/${val.icon.name}`}
                                    style={{
                                        width: "1.3rem", marginRight: "0.6rem",
                                        color: val.menuKey == index ? "#ff4500" : "gray",
                                        cursor: "pointer !important"
                                    }}
                                />
                            : null}

                        <NavLink
                            exact
                            to={CONTEXT + val.link}
                            title={val.displayName}
                            onClick={() => {
                                (!val.allowSOIHome || typeof val.allowSOIHome === 'undefined') && checkSOIDomainBased(val)
                                setSiderKey([`${val.menuKey}`]);
                            }}
                            style={{
                                color: color6,
                                fontWeight: 500,
                                marginLeft: marginMenu + "rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {val.displayName}
                        </NavLink>
                    </div>
                }
            >
                {val.children.map((subval) => {
                    let isAccessProvided = false;
                    if (subval.userGroups) {
                        subval.userGroups.forEach((accessGroup) => {
                            if (hasRights.findIndex((right) => right === accessGroup) > -1) {
                                isAccessProvided = true;
                            }
                        });
                    } else {
                        isAccessProvided = true;
                    }
                    if (isAccessProvided) {
                        if (
                            subval.children &&
                            subval.children.length > 0 &&
                            !subval.allowTabs
                        ) {
                            return renderSubmenu(
                                subval,
                                setSiderKey,
                                hasRights,
                                color6,
                                sideClass,
                                newMarginMenu,
                                // getPublishedKPIsForSelectedDomain,
                            );
                        } else {
                            return renderItem(
                                subval,
                                setSiderKey,
                                color6,
                                sideClass,
                                newMarginMenu,
                                siderCollapsed
                            );
                        }
                    } else {
                        return null;
                    }
                })}
            </SubMenu>
        );
    };

    return (
        <AppContext.Consumer>
            {({
                  siderKey,
                  setSiderKey,
                  check,
                  hasRights,
                  theme,
                  currentTheme,
                  onOpenChange,
                  openedKeys,
                  // domain,
                  // mainMenuLoading
              }) => {
                const sideClass =
                    currentTheme === 0 ? "sidebar-link-dark" : "sidebar-link-light";
                let marginMenu = 0;
                return (
                    <MenuContext.Consumer>
                        {({siderCollapsed, toggleSiderCollapsed}) => {
                            return (
                                <Layout className="border-right"
                                        style={{
                                            height: "100%",
                                            background: theme.color4,
                                            fontFamily: theme.font,
                                            fontSize: theme.size,
                                            position: "relative",
                                            zIndex: 1
                                        }}
                                >
                                    <Sider
                                        collapsible
                                        collapsed={siderCollapsed}
                                        width={220}
                                        style={{
                                            background: theme.color4,
                                            marginBottom: "1.1rem",
                                            display: "inline",
                                        }}
                                        collapsedWidth="48"
                                        trigger={null}
                                    >
                    <span
                        onClick={() => toggleSiderCollapsed(!siderCollapsed)}
                        className="d-flex justify-content-between align-items-center pb-2"
                        style={{
                            background: siderCollapsed ? "transparent" : theme.color4,
                            color: theme.color6,
                            top: "0.5rem",
                            right: siderCollapsed ? "-20px" : "0",
                            width: siderCollapsed ? "20px" : "220px",
                            height: "56px",
                            cursor: "pointer",
                        }}
                    >
                      <span>
                        <MDBIcon
                            icon="bars"
                            style={{fontSize: "0.8rem"}}
                            className="ml-4 mr-3"
                        />
                          {siderCollapsed ? null : <span>Menu</span>}
                      </span>
                        {siderCollapsed ? null : (
                            <MDBIcon
                                style={{fontSize: "0.8rem"}}
                                className="mr-3"
                                icon="chevron-left"
                            />
                        )}
                    </span>

                                        <Menu
                                            mode="inline"
                                            theme={currentTheme === 0 ? "dark" : "light"}
                                            // openKeys={openedKeys}
                                            // onOpenChange={onOpenChange}
                                            selectedKeys={[`${siderKey}`]}
                                            style={{
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                                height: "100%",
                                                paddingBottom: "100px",
                                                borderRight: 0,
                                                backgroundColor: theme.color4,
                                            }}
                                        >
                                            {props.menuContent ? (
                                                props.menuContent.map((val) => {
                                                    if (
                                                        val.children.length === 0 ||
                                                        (val.children.length > 0 && val.allowTabs)
                                                    ) {
                                                        let isAccessProvided = false;
                                                        if (val.userGroups) {
                                                            val.userGroups.forEach((accessGroup) => {
                                                                if (
                                                                    hasRights.findIndex(
                                                                        (right) => right === accessGroup
                                                                    ) > -1
                                                                ) {
                                                                    isAccessProvided = true;
                                                                }
                                                            });
                                                        } else {
                                                            isAccessProvided = true;
                                                        }
                                                        if (isAccessProvided) {
                                                            return (
                                                                <Menu.Item key={`${val.menuKey}`} id="sidemenu-title">
                                                                    <div className="d-flex flex-row align-items-center">
                                                                        {
                                                                            val.icon !== '' && typeof (val.icon) === "string" &&
                                                                            <Icon style={{
                                                                                marginRight: "0.6rem",
                                                                                fontSize: "1.3rem",
                                                                                color: "gray"
                                                                            }}>
                                                                                {val.icon}
                                                                            </Icon>
                                                                        }
                                                                        {
                                                                            val.icon !== '' && typeof (val.icon) === "object" ?
                                                                                val.icon.type === "material"
                                                                                    ?
                                                                                    <Icon style={{
                                                                                        marginRight: "0.6rem",
                                                                                        fontSize: "1.3rem",
                                                                                        color: "gray"
                                                                                    }}>
                                                                                        {val.icon.name}
                                                                                    </Icon>
                                                                                    : <img
                                                                                        className="mr-1"
                                                                                        src={`${CONTEXT}/SidebarIcons/${val.icon.name}`}
                                                                                        style={{
                                                                                            width: "1.3rem",
                                                                                            cursor: "pointer !important"
                                                                                        }}
                                                                                    />
                                                                                : null
                                                                        }
                                                                        <NavLink
                                                                            exact
                                                                            to={CONTEXT + val.link}
                                                                            onClick={() => {
                                                                                setSiderKey([`${val.menuKey}`]);
                                                                                checkSOIDomainBased(val);
                                                                            }}
                                                                            style={{
                                                                                color: theme.color6,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            <span>{val.displayName}</span>
                                                                        </NavLink>
                                                                    </div>
                                                                </Menu.Item>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    } else if (val.children.length >= 1 && !val.allowTabs) {
                                                        let isAccessProvided = false;
                                                        if (val.userGroups) {
                                                            val.userGroups.forEach((accessGroup) => {
                                                                if (
                                                                    hasRights.findIndex(
                                                                        (right) => right === accessGroup
                                                                    ) > -1
                                                                ) {
                                                                    isAccessProvided = true;
                                                                }
                                                            });
                                                        } else {
                                                            isAccessProvided = true;
                                                        }
                                                        if (isAccessProvided) {
                                                            return renderSubmenu(
                                                                val,
                                                                setSiderKey,
                                                                hasRights,
                                                                theme.color6,
                                                                sideClass,
                                                                marginMenu);
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                })
                                            ) : (
                                                <Loader/>
                                            )}
                                            {
                                                props.mainMenuLoading && (
                                                    <Loader style={{marginLeft: "40%", marginTop: "10%"}}/>
                                                )
                                            }
                                        </Menu>
                                    </Sider>
                                </Layout>
                            )
                        }}
                    </MenuContext.Consumer>

                );
            }}
        </AppContext.Consumer>
    );
};

export default Sidebar;
