import React, { Component } from "react";
import { AppContext } from "../../../AppProvider";
import {
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBCardTitle,
  MDBCardBody,
  MDBCard,
  MDBCardHeader,
} from "mdbreact";
import { Checkbox, Input, Select, Popover } from "antd";
import SortableTree, {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath,
  getNodeAtPath,
} from "react-sortable-tree";
import Loader from "react-loader-spinner";
import "react-sortable-tree/style.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import FontIcon from "./../icon";
import Breadcrumb from "../../../utilities/Breadcrumb";
import PageTitle from "../../../utilities/PageTitle";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import uuid from "react-uuid";
import { IconList } from "../../../utilities/AllTables";
import { derivative } from "mathjs";
import { NavLink } from "react-router-dom";
import { CONTEXT } from "../../../config";

const { Option } = Select;

const useStyles = (theme) => ({
  root: {
    "& > span": {
      margin: theme.spacing(2),
    },
  },
});

// const maxDepth = 3;

class MenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addAsFirstChild: false,
      treeData: this.props.treeData,
      internalPages: null,
      icons: null,
      modal: false,
      iconNode: null,
      displayIconPop: false,
    };
  }

  componentDidMount() {
    this.getInternalPage();
    //this.getIcons();
  }

  getInternalPage() {
    let url = "internalPage.json";
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      this.setState({
        internalPages: result.data[this.props.domain],
      });
    });
  }

  // getIcons() {
  // 	let url = 'icon.json';
  // 	axios({
  // 		method: 'get',
  // 		url: url,
  // 		headers: {
  // 			'Access-Control-Allow-Origin': '*',
  // 		},
  // 	}).then((result) => {
  // 		this.setState({
  // 			icons: result.data,
  // 		});
  // 	});
  // }
  handleIconPopover = () => {
    this.setState({ displayIconPop: true });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  iconSelected = (e) => {
    const icon = e.currentTarget.title;
    const path = this.state.iconNode.path;
    const getNodeKey = this.state.iconNode.getNodeKey;

    this.setState((state) => ({
      treeData: changeNodeAtPath({
        treeData: state.iconNode.treeData,
        path,
        getNodeKey,
        newNode: { ...state.iconNode.node, icon },
      }),
    }));
    this.toggleModal();
  };

  render() {
    const { classes } = this.props;
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <AppContext.Consumer>
        {({ setMenuTreeData, allUserGroups, IsSOIDomainBased, navigationType }) => {
          
          let avlUserGroups = [];
          if (allUserGroups) {
            for (const group in allUserGroups) {
              avlUserGroups.push(group);
            }
          }
          return (
            <div className="affix">
              {/* <Breadcrumb title="Menu Configurations" /> */}
              <div className="d-flex flex-row justify-content-between align-items-center">
                {navigationType === "Sidebar" && <PageTitle title={"Menu Configurations"} />}
                <div className="mr-3">
                  <MDBBtn
                    size="sm"
                    color="mdb-color"
                    onClick={() =>
                      this.setState((state) => ({
                        treeData: state.treeData.concat({
                          displayName: `Add Name`,
                          icon: "",
                          allowExternalLink: false,
                          allowDashboard: false,
                          allowTabs: false,
                          allowHome: false,
                          allowSOIHome: false, //SI-262
                          allowSubmenu: false,
                          userGroups: [],
                          children: [],
                          externalLink: "",
                        }),
                      }))
                    }
                  >
                    Add more
                  </MDBBtn>
                  <NavLink to={`${CONTEXT}/`}>
                  <MDBBtn
                    size="sm"
                    color="mdb-color"
                    onClick={() => this.saveData(setMenuTreeData, IsSOIDomainBased)}
                  >
                    {this.props.loading ? (
                      <Loader
                        type="TailSpin"
                        color="#000000"
                        height={20}
                        width={30}
                      />
                    ) : (
                      <span>Save</span>
                    )}
                  </MDBBtn>
                  </NavLink>
                </div>
                {/* <FontIcon
									modal={this.state.modal}
									toggleModal={this.toggleModal}
									iconSelected={this.iconSelected}
								/> */}
              </div>
              <div style={{ height: 535, marginLeft: "1rem" }}>
                <SortableTree
                  // maxDepth={maxDepth}
                  treeData={this.state.treeData}
                  onChange={(treeData) => this.setState({ treeData })}
                  generateNodeProps={({ node, path }) => {
                    let parentNode = getNodeAtPath({
                      treeData: this.state.treeData,
                      path: path.slice(0, path.length - 1),
                      getNodeKey: ({ treeIndex }) => treeIndex,
                      ignoreCollapsed: true,
                    });
                    // console.log("node path:", node.displayName, parentNode, path,  path.slice(0, path.length - 1) );
                    //console.log("Node Path", node);
                    if (parentNode === null) {
                      let defaultParent = {
                        node: { children: [...this.state.treeData] },
                        treeIndex: -1,
                      };
                      parentNode = { ...defaultParent };
                    }
                    return {
                      title: (
                        <MDBInput
                          style={{ fontSize: "1.1rem" }}
                          value={node.displayName}
                          onChange={(event) => {
                            const displayName = event.target.value;
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: { ...node, displayName },
                              }),
                            }));
                          }}
                        />
                      ),

                      buttons: [
                        // <MDBIcon
                        // 	className="pr-2"
                        // 	icon={node.icon ? node.icon : 'info-circle'}
                        // 	style={{
                        // 		display: path.length === 1 ? 'block' : 'none',
                        // 		marginTop: '4px',
                        // 	}}
                        // 	onClick={() =>
                        // 		this.setState((state) => ({
                        // 			modal: !state.modal,
                        // 			iconNode: {
                        // 				treeData: state.treeData,
                        // 				path:  path[path.length - 1],
                        // 				getNodeKey: getNodeKey,
                        // 				node: node,
                        // 			},
                        // 		}))
                        // 	}
                        // />,
                        <Popover
                          style={{ border: "1px solid black !important" }}
                          className="text-center"
                          content={
                            <div className="icon-grid">
                              {IconList.map((iconName, i) => (
                                <div key={i}
                                  style={{
                                    border: "1px solid black",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    this.setState((state) => ({
                                      treeData: changeNodeAtPath({
                                        treeData: state.treeData,
                                        path,
                                        getNodeKey,
                                        newNode: {
                                          ...node,
                                          icon: iconName,
                                        },
                                      }),
                                    }))
                                  }
                                  className={classes.root}
                                >  {iconName.type==='custom'?
                                <div className="d-flex h-100 justify-content-center">
                                <img
                                          className=""
                                          src={`${CONTEXT}/SidebarIcons/${iconName.name}`}
                                          style={{ width: "1.5rem", cursor: "pointer !important" }}
                                        />
                                </div>
                                :
                                  <Icon className="blow">{iconName.name}</Icon>}
                                </div>
                              ))}
                            </div>
                          }
                          trigger="click"
                        >
                          {
                            <div
                              style={{
                                display:
                                  parentNode.treeIndex < 0 ? "inline" : "none",
                              }}
                              className={classes.root}
                            >
                             {node.icon && typeof(node.icon) !== "string" && node.icon.name !== ''
															  ? node.icon.type==="material"?
															  (<Icon
																style={{
																	margin: '0px',
																	fontSize: '1.3rem',
																	marginRight: '1.2rem',
																	cursor: 'pointer',
																}}													
															>
																{node.icon.name}
															</Icon>)
															:(<img
																className=""
																src={`${CONTEXT}/SidebarIcons/${node.icon.name}`}
																style={{ width: "1.3rem", marginRight: '1.2rem', cursor: "pointer !important" }}
															  />)
															:null
															}

															{node.icon && typeof(node.icon) === "string" && node.icon !== '' && (
																<Icon
																	style={{
																		margin: '0px',
																		fontSize: '1.3rem',
																		marginRight: '1.2rem',
																		cursor: 'pointer',
																	}}
																	// onClick={this.handleIconPopover}
																>
																	{node.icon}
																</Icon>
															)}  
															
															
															{node.icon==='' && (
																<Icon
																	style={{
																		margin: '0px',
																		fontSize: '1.3rem',
																		marginRight: '1.2rem',
																		cursor: 'pointer',
																	}}
																>
																	info
																</Icon>
															)}
                            </div>

                            // <MDBIcon
                            // 	style={{
                            // 		display:parentNode.treeIndex < 0 ?'inline':'none',
                            // 		cursor: 'pointer' }}
                            // 	icon="info-circle"
                            // 	className="pr-2"
                            // />
                          }
                        </Popover>,
                        <Checkbox
                          checked={node.allowSubmenu}
                          style={{
                            display:
                              !node.allowExternalLink &&
                              !parentNode.node.allowTabs
                                ? "inline"
                                : "none",
                          }}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            let allowTabs = null;
                            if (checked) {
                              allowTabs = false;
                            }
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: {
                                  ...node,
                                  allowSubmenu: checked,
                                  allowTabs,
                                  internalLink: "",
                                  externalLink: "",
                                },
                              }),
                            }));
                          }}
                        >
                          Show Tiles
                        </Checkbox>,
                        <Checkbox
                          checked={node.allowExternalLink}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            let allowDashboard = null;
                            let allowHome = null;
                            let allowTabs = null;
                            let internalLink = node.internalLink;
                            let externalLink = node.externalLink;
                            if (checked) {
                              allowDashboard = false;
                              allowHome = false;
                              allowTabs = false;
                              internalLink = "";
                            } else {
                              externalLink = "";
                            }
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: {
                                  ...node,
                                  allowExternalLink: checked,
                                  allowHome,
                                  allowTabs,
                                  allowDashboard,
                                  internalLink,
                                  externalLink,
                                },
                              }),
                            }));
                          }}
                        >
                          External Link
                        </Checkbox>,
                        <Input
                          placeholder="Add External Link"
                          className="border-0 p-0"
                          style={{
                            display: node.allowExternalLink ? "inline" : "none",
                            height: "100%",
                            width: "25.3rem",
                            fontSize: "1rem",
                          }}
                          value={node.externalLink}
                          onChange={(event) => {
                            const externalLink = event.target.value;
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: { ...node, externalLink },
                              }),
                            }));
                          }}
                        />,
                        <Checkbox
                          checked={node.allowTabs}
                          style={{
                            display:
                              !node.allowExternalLink &&
                              !node.allowSubmenu &&
                              !parentNode.node.allowTabs
                                ? "inline"
                                : "none",
                          }}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            let allowSubmenu = null;

                            if (checked) {
                              allowSubmenu = false;
                            }
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: {
                                  ...node,
                                  allowTabs: checked,
                                  allowSubmenu,
                                  internalLink: "",
                                  externalLink: "",
                                },
                              }),
                            }));
                          }}
                        >
                          Tabs
                        </Checkbox>,

                        <Checkbox
                          style={{
                            display:
                              !node.allowExternalLink &&
                              !parentNode.node.allowTabs
                                ? "inline"
                                : "none",
                          }}
                          checked={node.allowHome}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: { ...node, allowHome: checked },
                              }),
                            }));
                          }}
                        >
                          Home Link
                        </Checkbox>,

                        <Checkbox
                        //Sanjit - Removed this check to allow SOI Home at various levels
                          // style={{
                          //   display:
                          //     parentNode.treeIndex === 0 ? "inline" : "none",
                          // }}
                          style={{
                            display:
                              !node.allowExternalLink &&
                              !node.allowTabs
                                ? "inline"
                                : "none",
                          }}
                          checked={node.allowSOIHome}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: { ...node, allowSOIHome: checked },
                              }),
                            }));
                          }}
                        >
                          KPI Tree Home
                        </Checkbox>,
                        <Select
                          bordered={false}
                          className="border-0 p-0 menuConfSelect"
                          style={{
                            display:
                              node.allowExternalLink ||
                              node.allowTabs ||
                              node.allowSubmenu
                                ? "none"
                                : "block",
                            width: "13.35rem",
                          }}
                          value={node.internalLink}
                          onChange={(event) => {
                            const internalLink = event;
                            //console.log("Internal Link changed", event);
                            this.setState((state) => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                                newNode: { ...node, internalLink },
                              }),
                            }));
                          }}
                        >
                          {this.state.internalPages
                            ? this.state.internalPages.map((opt) => (
                                <Option value={opt.key} key={opt.key}>
                                  {opt.val}
                                </Option>
                              ))
                            : null}
                        </Select>,

                        // <span
                        // 	style={{
                        // 		display: node.allowHome || node.allowTabs ? 'block' : 'none',
                        // 		width: '13.35rem',
                        // 	}}
                        // >
                        // 	&nbsp;
                        // </span>,
                        <Popover
                          style={{ border: "1px solid black !important" }}
                          className="text-center"
                          content={
                            <MDBCard>
                              <MDBCardHeader>
                                Authorized Access Groups
                              </MDBCardHeader>
                              <MDBCardBody>
                                <Select
                                  mode="multiple"
                                  style={{ width: "100%" }}
                                  placeholder="Select Access Groups"
                                  defaultValue={node.userGroups}
                                  onChange={(event) => {
                                    this.setState((state) => ({
                                      treeData: changeNodeAtPath({
                                        treeData: state.treeData,
                                        path,
                                        getNodeKey,
                                        newNode: {
                                          ...node,
                                          userGroups: event,
                                        },
                                      }),
                                    }));
                                  }}
                                >
                                  {avlUserGroups ? (
                                    avlUserGroups.map((group) => (
                                      <Option key={group}>{group}</Option>
                                    ))
                                  ) : (
                                    <Option key={""}>No Groups</Option>
                                  )}
                                </Select>
                              </MDBCardBody>
                            </MDBCard>
                          }
                          trigger="click"
                        >
                          <MDBIcon
                            icon="key"
                            className="indigo-text pl-2"
                            style={{ cursor: "pointer" }}
                          />
                        </Popover>,
                        <MDBIcon
                          // style={{
                          // 	marginLeft:
                          // 		!node.allowExternalLink
                          // 			? '1rem'
                          // 			: '0px',
                          // }}
                          className="green-text pl-2"
                          icon={
                            !node.allowExternalLink &&
                            !parentNode.node.allowTabs &&
                            (!node.internalLink ||
                              (node.internalLink &&
                                node.internalLink.length < 1))
                              ? "plus-circle"
                              : null
                          }
                          onClick={() =>
                            this.setState((state) => ({
                              treeData: addNodeUnderParent({
                                treeData: state.treeData,
                                parentKey: path[path.length - 1],
                                expandParent: true,
                                getNodeKey,
                                newNode: {
                                  displayName: `Add Name`,
                                  allowExternalLink: false,
                                  allowDashboard: false,
                                  allowTabs: false,
                                  allowHome: false,
                                  allowSubmenu: false,
                                  userGroups: [],
                                  children: [],
                                  externalLink: "",
                                  icon: "",
                                },
                                addAsFirstChild: false,
                              }).treeData,
                            }))
                          }
                        />,
                        <MDBIcon
                          className="red-text pl-2"
                          icon="trash-alt"
                          onClick={() =>
                            this.setState((state) => ({
                              treeData: removeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey,
                              }),
                            }))
                          }
                        />,
                      ],
                    };
                  }}
                />
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
  saveData = (setMenuTreeData, IsSOIDomainBased) => {
    let sidebarMenu = [];
    let pages = [];
    let menuKey = 0;
    let homepages = 0;
    let SOIHome = 0;

    const processNodeChildren = (menuNodeName, children, parentUserGroup) => {
      let childrenObjects = [];
      children.forEach((child) =>
        childrenObjects.push(processChild(menuNodeName, child, parentUserGroup))
      );
      return childrenObjects;
    };

    const processChild = (menuNodeName, child, passedUserGroup) => {
      let childObject = {
        displayName: "",
        allowExternalLink: false,
        allowDashboard: false,
        allowTabs: false,
        allowHome: false,
		allowSOIHome:false, //SI-262
        allowSubmenu: false,
        userGroups: [],
        children: [],
        //tabs: [],
        externalLink: "",
        internalLink: "",
        //icon:'',
        link: "",
        menuKey: "",
      };
      let childPageObject = {
        displayName: "",
        allowExternalLink: false,
        allowDashboard: false,
        allowTabs: false,
        allowHome: false,
		allowSOIHome:false, //SI-262
        allowSubmenu: false,
        userGroups: [],
        //children: [],
        tabs: [],
        externalLink: "",
        internalLink: "",
        icon: "",
        link: "",
        menuKey: "",
      };

      childObject.displayName = child.displayName;
      childObject.allowExternalLink = child.allowExternalLink;
      childObject.allowDashboard = child.allowDashboard;
      childObject.allowTabs = child.allowTabs;
      childObject.allowHome = child.allowHome;
	  childObject.allowSOIHome = child.allowSOIHome; //SI-262
      childObject.allowSubmenu = child.allowSubmenu;

      childObject.externalLink = child.externalLink;
      childObject.internalLink = child.internalLink;
      //childObject.icon=child.icon;
      /* Page Object */
      childPageObject.displayName = child.displayName;
      childPageObject.allowExternalLink = child.allowExternalLink;
      childPageObject.allowDashboard = child.allowDashboard;
      childPageObject.allowTabs = child.allowTabs;
      childPageObject.allowHome = child.allowHome;
	  childPageObject.allowSOIHome = child.allowSOIHome;   //SI-262
      childPageObject.allowSubmenu = child.allowSubmenu;

      childPageObject.externalLink = child.externalLink;
      childPageObject.internalLink = child.internalLink;

      //To be calculated - menuKey, userGroups, link & children
      menuKey += 1;
      childObject.menuKey = menuKey;
      childObject.userGroups =
        child.userGroups && child.userGroups.length > 0
          ? [...child.userGroups]
          : [...passedUserGroup];
      childObject.link = child.link;
      let newIdForLink = window.btoa(menuNodeName + "-" + child.displayName);

      if (child.allowHome) {
        homepages += 1;
        childObject.link = "/";
        childPageObject.link = "/";
      }
      if(child.allowSOIHome){
        SOIHome += 1;
      }
      if (child.allowSubmenu) {
        //if (!child.allowHome && !childObject.link) {
        if (!child.allowHome) {
          // if(!child.allowHome){
          childObject.link = "/" + newIdForLink;
          childPageObject.link = "/" + newIdForLink;
        }
      }

      if (!child.children || (child.children && child.children.length === 0)) {
        //Normal Page
        //with No children
        //if (!child.allowHome && !childObject.link) {
        if (!child.allowHome) {
          // if(!child.allowHome){
          childObject.link = "/" + newIdForLink;
          childPageObject.link = "/" + newIdForLink;
        }
      }

      if (child.allowTabs && child.children && child.children.length > 0) {
        //if(!child.allowHome && !childObject.link){
        if (!child.allowHome) {
          childObject.link = "/" + newIdForLink;
          childPageObject.link = "/" + newIdForLink;
        }
        let tabs = [];
        let tabsUserGroups = [];
        child.children.forEach((tab, index) => {
          let tempUserGroups =
            tab.userGroups && tab.userGroups.length > 0
              ? [...tab.userGroups]
              : [...childObject.userGroups];
          tabs.push({
            key: index + 1,
            displayName: tab.displayName,
            allowExternalLink: tab.allowExternalLink,
            allowDashboard: tab.allowDashboard,
            allowHome: tab.allowHome,

            externalLink: tab.externalLink,
            internalLink: tab.internalLink,
            //	icon: tab.icon,
            userGroups: [...tempUserGroups],
          });
          tabsUserGroups = [...tabsUserGroups, ...tempUserGroups];
        });
        childObject.userGroups = Array.from(new Set([...tabsUserGroups]));
        child.userGroups = Array.from(new Set([...tabsUserGroups]));
        childPageObject.tabs = [...tabs];
        childObject.children = [];
      }

      if (!child.allowTabs && child.children && child.children.length > 0) {
        childObject.children = processNodeChildren(
          menuNodeName,
          child.children,
          [...childObject.userGroups]
        );
        let parentUserGroup = [];
        child.children.forEach((ch) => {
          //use this to set Role based menu

          parentUserGroup = [...parentUserGroup, ...ch.userGroups];
        });
        childObject.userGroups = Array.from(
          new Set([...childObject.userGroups, ...parentUserGroup])
        );
        child.userGroups = Array.from(
          new Set([...childObject.userGroups, ...parentUserGroup])
        );
      }
      //console.log("child object pushed", childObject.displayName);
      if (childPageObject.link !== "") {
        pages.push(childPageObject);
      }
      return childObject;
    };

    const tree = [...this.state.treeData];

    console.log("Tree structure", tree);
    tree.forEach((node) => {
      let currentMenuObject = {
        displayName: "",
        allowExternalLink: false,
        allowDashboard: false,
        allowTabs: false,
        allowHome: false,
		allowSOIHome:false,
        allowSubmenu: false,
        userGroups: [],
        children: [],
        // tabs: [],
        externalLink: "",
        internalLink: "",
        icon: "",
        link: "",
        menuKey: "",
      };

      let currentPageObject = {
        displayName: "",
        allowExternalLink: false,
        allowDashboard: false,
        allowTabs: false,
        allowHome: false,
		allowSOIHome:false,
        allowSubmenu: false,
        userGroups: [],
        //children: [],
        tabs: [],
        externalLink: "",
        internalLink: "",
        icon: "",
        link: "",
        menuKey: "",
      };

      currentMenuObject.displayName = node.displayName;
      currentMenuObject.allowExternalLink = node.allowExternalLink;
      currentMenuObject.allowDashboard = node.allowDashboard;
      currentMenuObject.allowTabs = node.allowTabs;
      currentMenuObject.allowHome = node.allowHome;
	  currentMenuObject.allowSOIHome = node.allowSOIHome;
      currentMenuObject.allowSubmenu = node.allowSubmenu;

      currentMenuObject.externalLink = node.externalLink;
      currentMenuObject.internalLink = node.internalLink;
      currentMenuObject.icon = node.icon;

      /* Page Object */
      currentPageObject.displayName = node.displayName;
      currentPageObject.allowExternalLink = node.allowExternalLink;
      currentPageObject.allowDashboard = node.allowDashboard;
      currentPageObject.allowTabs = node.allowTabs;
      currentPageObject.allowHome = node.allowHome;
	  currentPageObject.allowSOIHome = node.allowSOIHome;
      currentPageObject.allowSubmenu = node.allowSubmenu;

      currentPageObject.externalLink = node.externalLink;
      currentPageObject.internalLink = node.internalLink;
      currentPageObject.icon = node.icon;
      //To be calculated - menuKey, userGroups, link & children
      menuKey += 1;
      currentMenuObject.menuKey = menuKey;
      let userGroup =
        node.userGroups && node.userGroups.length > 0
          ? [...node.userGroups]
          : ["Admin"];

      currentMenuObject.userGroups = [...userGroup];
      currentPageObject.userGroups = [...userGroup];
      currentMenuObject.link = "";
      currentPageObject.link = "";

      if (node.allowHome === true) {
        homepages += 1;
        currentMenuObject.link = "/";
        currentPageObject.link = "/";
      }
      if (node.allowSOIHome){
        SOIHome += 1;
      }
      if (node.allowSubmenu === true) {
        if (!node.allowHome) {
          currentMenuObject.link = "/" + node.displayName;
          currentPageObject.link = "/" + node.displayName;
        }
      }

      if (!node.children || (node.children && node.children.length === 0)) {
        //No children
        if (!node.allowHome) {
          currentMenuObject.link = "/" + node.displayName;
          currentPageObject.link = "/" + node.displayName;
        }
      }

      if (node.allowTabs && node.children && node.children.length > 0) {
        //for tabs only add to Page
        if (!node.allowHome) {
          currentMenuObject.link = "/" + node.displayName;
          currentPageObject.link = "/" + node.displayName;
        }
        let tabs = [];
        let tabsUserGroups = [];
        node.children.forEach((child, index) => {
          let tempUserGroups =
            child.userGroups && child.userGroups.length > 0
              ? [...child.userGroups]
              : [...currentMenuObject.userGroups];
          tabs.push({
            key: index + 1,
            displayName: child.displayName,
            allowExternalLink: child.allowExternalLink,
            allowDashboard: child.allowDashboard,
            allowHome: child.allowHome,

            externalLink: child.externalLink,
            internalLink: child.internalLink,
            //icon: child.icon,
            userGroups: [...tempUserGroups],
          });
          console.log("before adding", tabsUserGroups, tempUserGroups);
          tabsUserGroups = [...tabsUserGroups, ...tempUserGroups];
        });
        console.log("after adding", tabsUserGroups);
        // currentMenuObject.tabs = [...tabs];
        // currentMenuObject.children = [];
        // currentMenuObject.userGroups = Array.from(new Set([...tabsUserGroups]));

        currentPageObject.tabs = [...tabs];
        currentPageObject.children = [];
        currentPageObject.userGroups = Array.from(new Set([...tabsUserGroups]));
      }

      if (!node.allowTabs && node.children && node.children.length > 0) {
        // for normal children, only add to Menu
        currentMenuObject.children = processNodeChildren(
          node.displayName,
          node.children,
          [...currentMenuObject.userGroups]
        );
        let parentUserGroup = [];
        currentMenuObject.children.forEach((child) => {
          //use this to set Role based menu

          parentUserGroup = [...parentUserGroup, ...child.userGroups];
        });
        currentMenuObject.userGroups = Array.from(
          new Set([...currentMenuObject.userGroups, ...parentUserGroup])
        );
      }
      console.log(("Current object", currentMenuObject));
      sidebarMenu.push(currentMenuObject);
      if (currentPageObject.link !== "") {
        pages.push(currentPageObject);
      }
    });

    let errors = false;
    if (homepages === 0) {
      alert("No Homepage set");
    } else if (homepages > 1) {
      alert("Select only one Home page");
    } else {
      console.log("Sidebar menu is:", pages, sidebarMenu);
    }
    if(SOIHome > 1 && !IsSOIDomainBased){
      alert("Select only one KPI Tree Home");
     //Sanjit - Dont set this error till BK development
      // errors=true;
    }

    if(!errors){
      console.log("sidebarmenu", sidebarMenu);
      setMenuTreeData(pages, sidebarMenu);
    }
  };
}

export default withStyles(useStyles)(MenuComponent);
