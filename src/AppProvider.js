import React, { Component } from "react";
import { ACCESS_GROUPS, PROJECT_ID, GATEWAYBASED } from "./config";
import kpiService from "./services/kpiService";
import menuService from "./services/menuService";
import themeService from "./services/themeService";
import { themeStyles } from "./utilities/AllTables";
// import useCaseService from "./services/useCaseService";
import { SnackBarProvider } from "./components/Snackbar";
export const AppContext = React.createContext();



export default class AppProvider extends Component {
  constructor() {
    super();
    this.snackbarRef = React.createRef();
    this.state = {
      //SSO
      SSOType: "",
      setSSOType: this.setSSOType,
      // Contents
      domain: "",

      getAuthenticatedUser: this.getAuthenticatedUser,
      authUser: null,
      hasRights: [],
      //domainAccess:[], //SI-34 User's access to domain
      token: null,
      changeLoginStatus: this.changeLoginStatus,
      setAPICallErrors: this.setAPICallErrors,

      route: [],
      setRoute: this.setRoute,
      useSnackBar: this.useSnackBar,

      //theme and other settings = SI-262
      //userSettings:{theme:colorTheme, IsSOIDomainBased:false },

      IsSOIDomainBased: false, // SI-262 User configuration to use domains for segregating trees

      currentTheme: 1,
      theme: {
        color1: "#696969",
        color2: "#7D7D7D",
        color3: "#F0F0F0",
        color4: "#FFFFFF", //white - menu Background color
        color5: "#BDBDBD", //grey  - menu Border color
        //color5: "#F0F0F0",
        color6: "#111111", //black - font color
        color7: "#000000", //black
        color10: "#FFFFFF",
        color11: "#0E4B71", //bluish    - Page Title
        color12: "#FFFFFF",
        font: "Roboto",
        size: "1rem",
      },
      setTheme: this.setTheme,
      applyUserSettings: this.applyUserSettings,
      themeLoading: false,

      treeData: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: false,
          allowTabs: false,
          allowSubmenu: true,
          userGroups: ["Admin"],
          onlyAdmin: true,
          expanded: true,
          children: [
            {
              menuKey: "14",
              displayName: "Menu Configurations",
              link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
              icon: "",
              allowExternalLink: false,
              allowDashboard: false,
              allowHome: false,
              allowTabs: false,
              userGroups: ["Admin"],
              onlyAdmin: true,
              children: [],
              internalLink: "Menu/AdminMenuConfigurations",
            },
          ],
        },
      ],
      pageContent: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: true,
          allowTabs: false,
          allowSubmenu: true,
          expanded: true,
        },
        {
          displayName: "Admin-Menu Configurations",
          link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: false,
          allowTabs: false,
          allowSubmenu: false,
          tabs: [],
          internalLink: "Menu/AdminMenuConfigurations",
        },
      ],
      menuContent: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: true,
          allowTabs: false,
          allowSubmenu: true,
          expanded: true,
          children: [
            {
              menuKey: "13",
              displayName: "Menu Configurations",
              link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
              icon: "",
              internalLink: "Menu/AdminMenuConfigurations",
              onlyAdmin: true,
              userGroups: ["Admin"],
              allowExternalLink: false,
              allowDashboard: false,
              allowHome: false,
              allowTabs: false,
              allowSubmenu: false,
              children: [],
            },
          ],
        },
      ],
      //menuFetchError: false,
      mainMenuLoading: true,
      getContent: this.getContent,
      setMenuTreeData: this.setMenuTreeData,
      setKPITreeData: this.setKPITreeData,
      getKPITreeData: this.getKPITreeData,

      getPublishedKPIsForSelectedDomain: this.getPublishedKPIsForSelectedDomain,
      getSavedKPIsForSelectedDomain: this.getSavedKPIsForSelectedDomain,
      KPISavedMenuContent: [],
      KPIPublishedMenuContent: [],

      getCalculatedKPITreeList: this.getCalculatedKPITreeList,
      deleteKPITree: this.deleteKPITree,

      newAnalysisSaved: false,
      changeNewAnalysisSaved: this.changeNewAnalysisSaved,
      newAnalysisPublishedView: false,
      changeNewAnalysisPublishedView: this.changeNewAnalysisPublishedView,

      addItemToMenu: this.addItemToMenu,
      selectedKPILink: "", //PNC Header
      loadingMenu: false,

      KPIError: "",
      clearKPIError: this.clearKPIError,

      setUsername: this.setUsername,

      //Sider key selection
      siderKey: null,
      setSiderKey: this.setSiderKey,
      openedKeys: null,
      onOpenChange: this.onOpenChange,

      //Tab Pills Selection
      activeItemPills: 1,
      togglePills: this.togglePills,

      // cohort Cause Analysis
      nodeDropdowns: [],
      setRootCause: this.setRootCause,
      selectedNodeData: null,

      selectedTreeId: null,
      setSelectedTreeId: this.setSelectedTreeId,
      selectedKPITreeID: { id: "", desc: "" },

      KPITreeList: [],
      KPISavedTreeList: [],
      KPIPublishedTreeList: [],
      KPICalculatedTreeList: [],
      KPITreeLoading: false,
      //PNC Header
      //KPITreeListLoading: false,
      KPIPublishedTreeListLoading: false,
      KPISavedTreeListLoading: false,
      kpiData: [],
      initialkpiData: [
        {
          nodeId: "1",
          displayName: "",
          dataNode: false,
          formula: [{ name: "", unit: "", polarity: "", value: [] }],
          dataValue: [],

          //filterValue: "",
          error: "No Title",
          parentId: [],
          childId: [],
          relation: "",
          height: 120,
          width: 200,
          x: 250,
          y: 2,
          children: [],
        },
      ],
      allUserGroups: ACCESS_GROUPS,
      sendKPICalculatedTree: this.sendKPICalculatedTree,
      calculateKPITreeData: this.calculateKPITreeData,
      //PNC Header
      //LC-584 KPI domains = Asset Class
      KPIDomains: [],

      setSelectedKPIDomain: this.setSelectedKPIDomain,
      selectedKPIDomain: "",
      //LC-584
      setAssetClass: this.setAssetClass,
      toggleAssetClassMenu: this.toggleAssetClassMenu,

      treeFirstNodeDescForPublished: [],
      treeFirstNodeDescForSaved: [],
      treeDate: [],
      checkDuplicateTree: this.checkDuplicateTree,
      navigationType: "Sidebar",
      // Show SOI Domain based Header
      showSOIHeader: true,
      setShowSOIHeader: this.setShowSOIHeader,
      getAssetClassCount: this.getAssetClassCount,

      currentPageName: "",
      setCurrentPageName: this.setCurrentPageName,

      setGatewayMenu:this.setGatewayMenu,    //Gateway Based Menu e.g. /LS, /BK
      gatewayMenuContent:[],

      setSelectedTemplateTreeID:this.setSelectedTemplateTreeID,  //Templates for individual Trees
      selectedTemplateTreeID:"",
      selectedKPITemplateName:"",

      setAwsRole: this.setAwsRole,
			awsRole: null,

      modelSelectedByInventory: this.modelSelectedByInventory,
      modelIdByInventory: null,
      
      toggleTreelist: false,
      setToggleTreelist: this.setToggleTreelist
    };
  }

  setToggleTreelist = (toggle) => {
    this.setState({ toggleTreelist: toggle });
  };
  
  setSelectedTemplateTreeID=(treeID, KPItemplateName)=>{      //Templates for individual Trees
    console.log("TEMPLATE", treeID, KPItemplateName);
    this.setState({
      selectedTemplateTreeID:treeID,
      selectedKPITemplateName:KPItemplateName
    })
  }

  setRoute = (route) => {
    this.setState({ route });
  };

  setShowSOIHeader = (val) => {
    console.log(`showSOIHeader: ${val}`)
    this.setState({ showSOIHeader: val });
  };


  setSelectedKPIDomain = (domain, link) => {
    this.setState({
      selectedKPIDomain: domain,
      selectedKPILink: link,
    });
  };

  getAssetClassCount = (title) => {
    kpiService.getAssetClassCount(title)
      .then(response => {
        console.log("Asset Class Count", response);
      })
  }
  getPublishedKPIsForSelectedDomain = (domain) => {
    console.log("SAVED FOR::", domain);
    this.setState({ KPIPublishedTreeListLoading: true });
    let APICallError = null;
    let KPIPublishedTreeList = [];
    let newMenuContent = [];
    let treeDate = [];
    let treeFirstNodeDescForPublished = [];
    let url =
      domain !== "" ? `listKpiHomeTree/?domain=${domain}` : `listKpiHomeTree`;

    let newPageContent = this.state.pageContent.filter(
      (page) => page.internalLink != "KPISandbox/KPIVisualPublished"
    );

    kpiService
      .getKPIsByDomain(url)
      .then((res) => {
        if (res.data.code === 200) {

          //For Gateway based instances, only pick KPI trees for the selected Usecase
          if(GATEWAYBASED){
            KPIPublishedTreeList = res.data.response.filter(tree=>tree.usecaseName === this.state.selectedUsecasename);
          }else{
          KPIPublishedTreeList = [...res.data.response];
          }

          if (KPIPublishedTreeList.length > 0) {
            KPIPublishedTreeList.forEach((tree) => {
              if (
                tree.kpiTreeStatus === "Published" ||
                tree.kpiTreeStatus === "Saved"
              ) {
                let newIdForLink =
                  "/" +
                  window.btoa(
                    tree.treeId +
                    "-" +
                    tree.kpiTreeName
                  );

                // console.log("TREE RESPONSE",  tree.treeId, JSON.parse(tree.attributes),JSON.parse(tree.unit),JSON.parse(tree.polarity));
                let treeAttributes = null;
                try { treeAttributes = tree.attributes && JSON.parse(tree.attributes) }
                catch (e) { console.log(e) }
                let treeUnit = "";
                try { treeUnit = JSON.parse(tree.unit) }
                catch (e) { console.log(e) }
                let treePolarity = "";
                try { treePolarity = JSON.parse(tree.polarity) }
                catch (e) { console.log(e) }
                treeFirstNodeDescForPublished.push({
                  treeLink: newIdForLink,
                  treeID: tree.treeId,
                  attributes: treeAttributes,
                  unit: treeUnit,
                  polarity: treePolarity,
                  nodeCount: tree.nodeCount
                });

                treeDate.push({
                  treeID: tree.treeId,
                  updated: tree.refreshDate,
                  created: tree.dataDate,
                });

                newPageContent.push(
                  this.addItemToMenu(
                    tree.treeId + "-" + tree.treeName,
                    false,
                    false,
                    false,
                    false,
                    tree.kpiTreeStatus === "Saved"
                      ? "KPISandbox/KPIVisualDraft"
                      : "KPISandbox/KPIVisualPublished",
                    newIdForLink,
                    "",
                    tree.kpiTreeStatus === "Published"
                      ? [
                        "Admin",
                        "Data Scientist",
                        "Data Engineering",
                        "Executive",
                      ]
                      : ["Admin", "Data Scientist", "Data Engineering"],
                    tree.treeId,
                    tree.kpiTreeDomain
                  )
                );

                newMenuContent.push(
                  this.addItemToMenu(
                    tree.treeId + "-" + tree.treeName,
                    false,
                    false,
                    false,
                    false,
                    tree.kpiTreeStatus === "Saved"
                      ? "KPISandbox/KPIVisualDraft"
                      : "KPISandbox/KPIVisualPublished",
                    newIdForLink,
                    "",
                    tree.kpiTreeStatus === "Published"
                      ? [
                        "Admin",
                        "Data Scientist",
                        "Data Engineering",
                        "Executive",
                      ]
                      : ["Admin", "Data Scientist", "Data Engineering"],
                    tree.treeId,
                    tree.kpiTreeDomain
                  )
                );
              }
            });
          }
          console.log("New Page Content", newPageContent);
          this.setState({
            KPIPublishedTreeListLoading: false,
            pageContent: newPageContent,
            treeFirstNodeDescForPublished,
            treeDate,
            KPIPublishedMenuContent: [...newMenuContent],
          },
            () => this.getSavedKPIsForSelectedDomain(domain ? domain : "")
          );
        } else {
          this.setState({
            KPIPublishedTreeListLoading: false, KPIPublishedMenuContent: []
          },
            () => this.getSavedKPIsForSelectedDomain(domain ? domain : "")
          )
        }
      })
      .catch((error) => {
        console.error(error.message);
        APICallError = true;
        this.setState({
          KPIPublishedTreeListLoading: false, KPIPublishedMenuContent: []
        })
      });
  };

  getSavedKPIsForSelectedDomain = (domain) => {
    this.setState({ KPISavedTreeListLoading: true });
    let KPISavedTreeList = [];
    let savedTreeListStatus = null;
    let treeDate = [];
    let newMenuContent = [];
    let treeFirstNodeDescForSaved = [];
    let newIdForLink = "";

    let newPageContent = this.state.pageContent.filter(
      (page) => page.internalLink != "KPISandbox/KPIVisualDraft"
    );

    let url =
      domain !== ""
        ? `kpiTrees/?domain=${domain}`
        : `kpiTrees`;

    kpiService
      .getKPIsByDomain(url)
      .then((res) => {
        if (res.data.code === 200) {
          KPISavedTreeList = res.data.response.filter(
            (tree) => tree.kpiTreeStatus === "Saved"
          );
          KPISavedTreeList.length > 0 &&
            KPISavedTreeList.forEach((tree) => {
              tree.status = tree.kpiTreeStatus;
              tree.treeName = tree.kpiTreeName;
            });

          if (KPISavedTreeList.length > 0) {
            let newTreeList = [...KPISavedTreeList].sort(
              (a, b) => a.treeID - b.treeID
            );

            newTreeList = newTreeList.sort(function (a, b) {
              var x = a.status.toLowerCase();
              var y = b.status.toLowerCase();
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            });

            newTreeList.forEach((tree) => {
              if (tree.status === "Published" || tree.status === "Saved") {
                newIdForLink =
                  "/" +
                  window.btoa(
                    tree.kpiTreeId +
                    "-" +
                    tree.kpiTreeName
                  );
                treeFirstNodeDescForSaved.push({
                  treeLink: newIdForLink,
                  treeID: tree.kpiTreeId,
                  attributes: tree.attributes,
                  unit: tree.unit,
                  polarity: tree.polarity,
                  nodeCount: tree.nodeCount
                });

                treeDate.push({
                  treeID: tree.kpiTreeId,
                  updated: tree.refreshDate,
                  created: tree.dataDate,
                });

                newPageContent.push(
                  this.addItemToMenu(
                    tree.kpiTreeId + "-" + tree.kpiTreeName,
                    false,
                    false,
                    false,
                    false,
                    tree.kpiTreeStatus === "Saved"
                      ? "KPISandbox/KPIVisualDraft"
                      : "KPISandbox/KPIVisualPublished",
                    newIdForLink,
                    "",
                    tree.kpiTreeStatus === "Published"
                      ? [
                        "Admin",
                        "Data Scientist",
                        "Data Engineering",
                        "Executive",
                      ]
                      : ["Admin", "Data Scientist", "Data Engineering"],
                    tree.kpiTreeId,
                    tree.kpiTreeDomain
                  )
                );
                newMenuContent.push(
                  this.addItemToMenu(
                    tree.kpiTreeId + "-" + tree.kpiTreeName,
                    false,
                    false,
                    false,
                    false,
                    tree.kpiTreeStatus === "Saved"
                      ? "KPISandbox/KPIVisualDraft"
                      : "KPISandbox/KPIVisualPublished",
                    newIdForLink,
                    "",
                    tree.kpiTreeStatus === "Published"
                      ? [
                        "Admin",
                        "Data Scientist",
                        "Data Engineering",
                        "Executive",
                      ]
                      : ["Admin", "Data Scientist", "Data Engineering"],
                    tree.kpiTreeId,
                    tree.kpiTreeDomain
                  )
                );
              }
            });
          }

          // console.log("New Saved Page are", newPageContent, newMenuContent);

          this.setState({
            pageContent: [...newPageContent],
            KPISavedMenuContent: newMenuContent,
            treeFirstNodeDescForSaved,
            treeDate,
            KPISavedTreeListLoading: false,
          });
        } else {
          this.setState({ KPISavedTreeListLoading: false, KPISavedMenuContent: [] });
        }
      })
      .catch((error) => {
        console.error(error.message);
        savedTreeListStatus = error.response;
        this.setState({ KPISavedTreeListLoading: false, KPISavedMenuContent: [] });
      });
  };

  //SSO Changes
  setSSOType = (type) => {
    this.setState({ SSOType: type });
  };

  setUsername = (name) => {
    this.setState({ username: name });
  };

  setTheme = async (userSettings) => {
    let themeId = userSettings.theme === "Dark" ? 0 : 1;
    const postData = { theme: JSON.stringify(userSettings) };
    console.log('setTheme')
    themeService
      .setTheme(postData)
      .then((res) => {

        if (res.data.code === 201) {
          this.setState(
            {
              currentTheme: themeId,
              theme: { ...themeStyles[themeId] },
              IsSOIDomainBased: userSettings.ISSOIDomainBased,
              showSOIHeader: userSettings.ISSOIDomainBased
                ? userSettings.ISSOIDomainBased
                : false,
              navigationType: userSettings.NavigationType
                ? userSettings.NavigationType
                : "Sidebar",
            },
            // () => this.getContent()
            () => this.toggleAssetClassMenu()
          );
        }
      })
      .catch((error) => console.log(error.message));
  };

  applyUserSettings = () => {
    this.setState({ themeLoading: true });
    themeService.getTheme().then((settings) => {
      if (settings.data.code === 200) {

        let userSettings = JSON.parse(settings.data.response);
        let themeId = userSettings.theme === "Dark" || "" ? 0 : 1;
        console.log('applyUserSettings', settings.data);

        this.setState({
          themeLoading: false,
          currentTheme: themeId,
          theme: { ...themeStyles[themeId] },
          IsSOIDomainBased:
            GATEWAYBASED ? false     //If Gateway Based - dont allow SOI Header
              : userSettings.ISSOIDomainBased
                ? userSettings.ISSOIDomainBased
                : false,
          navigationType:
            GATEWAYBASED ? "HeaderBar"      //If Gateway Based Menu - Initial Setup as Header bar
              : userSettings.NavigationType
                ? userSettings.NavigationType
                : "Sidebar",

          showSOIHeader: userSettings.ISSOIDomainBased
            ? userSettings.ISSOIDomainBased
            : false,
        });
      } else {
        this.setState({ themeLoading: false });
      }
    });
  };

  //LC-584 
  toggleAssetClassMenu = async () => {
    let menuContent = [...this.state.menuContent];
    let pageContent = [...this.state.pageContent];
    menuContent[0].children.forEach(child => {
      pageContent = pageContent.filter(page => page.link !== child.link);
    })

    menuContent[0].children = [];

    if (this.state.IsSOIDomainBased) {  //Asset Class Yes
      menuContent[0].assetClassHome = true;
      themeService.getAssetClass().then(
        (res) => {
          console.log("ASSET", res);
          if (res.data.code === 200) {
            console.log(res.data.response);
            res.data.response.forEach(asset => {
              let newIdForLink =
                "/" + window.btoa(asset.assetClassId + asset.assetClassName);
              let newMenuItem = this.addItemToMenu(
                asset.assetClassName,
                false,
                false,
                true,
                false,
                "",
                newIdForLink,
                "",
                [
                  "Admin",
                  "Data Scientist",
                  "Data Engineering",
                  "Executive",
                ],
                "",
                ""
              );
              newMenuItem.allowSOIHome = true;
              menuContent[0].children.push(newMenuItem);
              pageContent.push(newMenuItem);
            })
            // this.setState({menuContent, pageContent});
            this.setMenuTreeData(pageContent, menuContent);
          }
        }
      )
    } else {                            //Asset Class No
      menuContent[0].assetClassHome = false;
      let newIdForLink =
        "/" + window.btoa('KPITreeHome');
      let newMenuItem = this.addItemToMenu(
        "KPI Tree Home",
        false,
        false,
        true,
        false,
        "",
        newIdForLink,
        "",
        [
          "Admin",
          "Data Scientist",
          "Data Engineering",
          "Executive",
        ],
        "",
        ""
      )
      newMenuItem.allowSOIHome = true;
      menuContent[0].children.push(newMenuItem);
      pageContent.push(newMenuItem);
      // this.setState({menuContent, pageContent});
      this.setMenuTreeData(pageContent, menuContent);
    }
  }

  setAssetClass = async (assetClasses) => {
    let prevAssetClasses = [];
    let saveAssetClasses = false;

    themeService.getAssetClass().then(
      (res) => {
        if (res.data.code === 200) {
          prevAssetClasses = res.data.response.map(asset => asset.assetClassName);


          if (assetClasses.length === prevAssetClasses.length) {
            assetClasses.forEach((asset) => {
              if (!prevAssetClasses.includes(asset)) {
                saveAssetClasses = true;
              }
            })
          } else {
            saveAssetClasses = true;
          }

          if (saveAssetClasses) {

            let postData = assetClasses.map(asset => {
              return {
                assetClassId: asset.displayName,
                assetClassName: asset.displayName
              }
            })
            // postData = JSON.stringify(postData);
            themeService
              .setAssetClass(postData)
              .then((res) => {

                if (res.data.code === 201) {
                  console.log("Added Domains successfully");
                } else {
                  console.log("Error in adding domains");
                }
              })
              .catch((error) => console.log(error.message));

          }
        }
      });

  };

  setSelectedTreeId = (key) => {
    this.setState({ selectedTreeId: key, activeItemPills: 2 });
  };

  setSiderKey = (key) => {
    let { siderKey } = this.state;
    this.setState({ siderKey: key, activeItemPills: 1 });
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = this.state.openedKeys
      ? openKeys.find((key) => this.state.openedKeys.indexOf(key) === -1)
      : openKeys[0];
    this.setState({ openedKeys: latestOpenKey ? [latestOpenKey] : [] });
  };

  togglePills = (tab) => () => {
    const { activePills } = this.state.activeItemPills;
    if (activePills !== tab) {
      this.setState({ activeItemPills: tab });
    }
  };

  // Gateway Based Menu - Set Menu according to the Use Case Selected
  setGatewayMenu = (calledFrom, link, useCase=null) => {
    console.log("GATEWAY MENU", useCase);
    let { menuContent } = this.state;
    if (calledFrom === 'home') {
      this.setState({
        gatewayMenuContent: menuContent[0].children.filter(childMenu => childMenu.link === link),
        navigationType: "Sidebar",
        selectedUsecasename: useCase,
        selectedUsecaselink: link
      }, ()=>this.getPublishedKPIsForSelectedDomain(""))
    } else {
      this.setState({
        gatewayMenuContent: menuContent,
        navigationType: "Headerbar",
        selectedUsecasename:"",
        selectedUsecaselink:""
      });
    }
  }

  //Get Main Menu Items
  getContent = () => {
    this.setState({ mainMenuLoading: true });
    menuService
      .getContent(this.props.domain)
      .then((res) => {
        if (res.data.code === 200) {
          let allContent = JSON.parse(res.data.response);

          let treeData = allContent.menuContent;
          let openedKeys = null;
          let siderKey = null;
          const processAllChildren = (children) => {
            let childrenObjects = [];
            children.forEach((child) => childrenObjects.push(processChild(child)));
            return childrenObjects;
          };

          const processChild = (child) => {
            let childObj = [...child.children];
            if (child.allowTabs) {
              // console.log(" menu CHILD with tabs", child);
              childObj.push(...allContent.pageContent.filter((page) => page.link === child.link)[0].tabs);
            } else if (childObj.length > 0) {
              childObj = [...processAllChildren(childObj)];
            }
            let newNode = { ...child };
            newNode.children = [...childObj];
            return newNode;
          };
          treeData.forEach((node) => {
            if (node.allowHome === true) {
              openedKeys = [node.menuKey];
              // siderKey = [`${node.menuKey}`];
            }
            // Change to add Tabs on level 1-- start
            if (node.allowTabs) {
              let tabPageLink = allContent.pageContent.filter(
                (page) => page.link === node.link
              );

              if (tabPageLink.length > 0 && tabPageLink[0].tabs) {
                node.children = tabPageLink[0].tabs;
              }
            }
            else {
              // Change to add Tabs on level 1 -- ends
              node.children.forEach((child) => {
                if (child.allowTabs === true) {
                  child.children.push(
                    ...allContent.pageContent.filter(
                      (page) => page.link === child.link
                    )[0].tabs
                  );
                } else if (child.children.length > 0) {
                  child.children = [...processAllChildren(child.children)];
                }
              });
            }
          });

          // this.updateMenus(allContent.menuContent, allContent.pageContent);
          console.log("MENU ARE:", allContent.menuContent, allContent.pageContent, treeData);
          this.setState({
            menuContent: allContent.menuContent,
            pageContent: allContent.pageContent,
            gatewayMenuContent: allContent.menuContent,
            treeData: treeData,
            loadingMenu: false,
            openedKeys,
            siderKey,
            mainMenuLoading: false,
          },
            //Reconsider this call while doing KPI Folder Refactor
            // ()=>{this.getPublishedKPIsForSelectedDomain("")}
          );
        } else {
          console.log("Error in calling Menu:", res.statusText);
          this.setState({ mainMenuLoading: false });
        }
      })
      .catch(
        (error) => console.log(error.message),
        this.setState({ mainMenuLoading: false })
      );
  };

  addItemToMenu = (
    name,
    externalLink,
    home,
    subMenu,
    tabs,
    pageLink,
    urlLink,
    itemKey,
    allowedGroup,
    treeid,
    domain
  ) => {
    return {
      allowDashboard: false,
      allowExternalLink: externalLink,
      allowHome: home,
      allowSubmenu: subMenu,
      allowTabs: tabs,
      displayName: name,
      externalLink: "",
      icon: "",
      internalLink: pageLink,
      link: urlLink,
      menuKey: itemKey,
      children: [],
      tabs: [],
      userGroups: [...allowedGroup],
      treeID: treeid,
      treeDomain: domain
    };
  };

  setMenuTreeData = (pageContent, menuContent) => {
    this.setState({ loadingMenu: true });
    menuService
      .setMenuTreeData({
        data: JSON.stringify({
          pageContent,
          menuContent,
        }),
        projectId: this.props.domain,
      })
      .then((res) => {
        //LC-538
        if (res.data.code === 201) {
          this.getContent();
          if (this.state.IsSOIDomainBased) {
            this.setAssetClass([...menuContent[0].children]);
          }

        } else {
          //LC-538
          alert("Error in saving Menu");
        }
      })
      .catch(
        (error) => console.log(error.message),
        this.setState({ loadingMenu: false })
      );
  };

  sendKPICalculatedTree = (treeObject) => {

    kpiService
      .setCalculateTreeData(treeObject)
      .then(({ data }) => {
        if (data.code === 201) {
          // if (this.state.domain === 6) {
          //   this.calculateKPITreeData(treeID);
          // }
          console.log("Calculated Tree Structure saved", data);
        }
      })
      .catch((error) => console.log(error.message));
  };

  calculateKPITreeData = (treeID) => {
    kpiService
      .getCalculateTreeData(treeID)
      .then(({ data }) => {
        if (data.code === 200) {
          this.setState({ KPIError: "KPI saved successfully!" });
        } else {
          this.setState({ KPIError: data.message });
        }
      })
      .catch((error) => console.log(error.message));
  };

  clearKPIError = () => this.setState({ KPIError: "" });

  getCalculatedKPITreeList = () => {
    kpiService
      .getCalculatedTreeList()
      .then(({ data }) => {
        if (data.code === 200) {

          let treeList = [...data.response];

          this.setState({ KPICalculatedTreeList: treeList });
        }
      })
      .catch((error) => console.log(error.message));
  };

  setKPITreeData = (KPItree) => {
    let { selectedKPITreeID } = this.state;

    let treeID = KPItree.treeId;
    if (treeID > 0) {
      KPItree.calculations.forEach((node) => {
        node.kpiTreeId = treeID;
      });

      selectedKPITreeID.id = treeID;
      selectedKPITreeID.desc = KPItree.description;

      //console.log("Tree to be saved raw processed desc goal status color domain filter cohort driver ", KPItree);

      KPItree.status === "Saved"
        ? this.setState({
          KPITreeLoading: true,
          KPIError: "",
          selectedKPITreeID,
          newAnalysisSaved: true,
          // selectedSavedKPILink: "",
          //selectedPublishedKPILink: "",
        })
        : this.setState({
          KPITreeLoading: true,
          KPIError: "",
          selectedKPITreeID,
          newAnalysisPublishedView: true,
        });

      const postData = {
        rawTree: JSON.stringify(KPItree.raw),
        sampleTree: JSON.stringify(KPItree.processed),
        kpiTreeGoal: KPItree.kpi_tree_goal,
        kpiTreeParameter: JSON.stringify(KPItree.kpi_tree_parameter),
        kpiTreeId: treeID,
        kpiTreeStatus: KPItree.status,
        kpiTreeName: KPItree.description,
        colorThreshold:
          typeof KPItree.colorThreshold === "string"
            ? KPItree.colorThreshold
            : JSON.stringify(KPItree.colorThreshold),
        kpiTreeDomain: KPItree.kpi_tree_domain
          ? KPItree.kpi_tree_domain
          //LC-817 No Asset Class assigned to the KPI Tree which is created under 
          //KPI Tree Home when "Asset Class Based = No"
          : "Others",
        chosenFilter: JSON.stringify(KPItree.chosen_filter),
        populateDrivers: JSON.stringify(KPItree.populate_drivers),
        cohortName: JSON.stringify(KPItree.cohort_name),
      };

      kpiService
        .setTreeData(treeID, postData, KPItree.existingTree)
        .then(({ data }) => {
          //LC-530
          if (data.code === 201 || data.code === 200) {
            this.changeNewAnalysisSaved();
            let alertMessage =
              KPItree.status === "Saved"
                ? `${KPItree.description} saved successfully`
                : `${KPItree.description} published successfully`;
            this.sendKPICalculatedTree(KPItree.calculations);
            this.useSnackBar({status:true, severity:"success", message: alertMessage})
            //LC-538
            //Reconsider this call while doing KPI Folder Refactor
            //this.getPublishedKPIsForSelectedDomain(this.selectedKPIDomain?this.selectedKPIDomain:"");
            // this.getSavedKPIsForSelectedDomain(this.selectedKPIDomain?this.selectedKPIDomain:"");
            // this.getPublishedKPIsForSelectedDomain("")
            // this.getSavedKPIsForSelectedDomain("")

            this.getPublishedKPIsForSelectedDomain(KPItree.kpi_tree_domain ? KPItree.kpi_tree_domain : "");

          } else {
            let alertMessage =
              // LC-530
              // KPItree.treeId === ""
              //  ? `Failed to create ${KPItree.description}`
              //  : 
              KPItree.status === "Saved"
                ? `Failed to create/update ${KPItree.description}`
                : `Failed to publish ${KPItree.description}`;

            this.useSnackBar({status:true, severity:"error", message: alertMessage})
            this.setState({ KPIError: "Failed to Save" });
          }
        })
        .catch((error) => this.useSnackBar({status:true, severity:"error", message: error?.message}));
    } else {
      this.useSnackBar({status:true, severity:"error", message: "Tree Not created as id not correct"})
    }
  };

  // PNC Changes
  deleteKPITree = (treeID) => {
    this.setState({ KPIError: "" });

    kpiService
      .deleteTreeData(treeID)
      .then(({ data }) => {
        if (data.code === 200) {
          this.useSnackBar({status:true, severity:"success", message: 'Analysis Tree Deleted Successfully'})
          let domain = this.state.selectedKPIDomain;

          this.getPublishedKPIsForSelectedDomain(domain ? domain : "");
          this.getAssetClassCount(domain);
        } else {
          this.setState({ KPIError: data.message });
          alert(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  };

  changeNewAnalysisSaved = () => {
    //PNC Header

    this.setState({ newAnalysisSaved: false, newAnalysisPublishedView: false });
    // this.state.KPIError === '' ? alert('Analysis saved to Drafts') : alert(this.state.KPIError);
  };

  changeNewAnalysisPublishedView = () => {
    this.setState({ newAnalysisPublishedView: false });
    this.state.KPIError === ""
      ? alert("Analysis saved to Published")
      : alert(this.state.KPIError);
  };


  changeLoginStatus = () => {
    this.props.resetLoggedIn();
  };

  checkDuplicateTree = (analysisName, isNew) => {
    let treeList = [];
    if (isNew) {
      treeList = this.state.KPITreeList.filter(
        (t) => t.kpi_tree_domain === this.state.selectedKPIDomain
      ).filter((n) => n.treeName === analysisName);
    }
    return treeList;
  };

  useSnackBar = (obj) => {
    this.snackbarRef.current.show(obj);
  }

  componentDidMount() {
    this.setState({
      domain: this.props.domain,
    });
  }

  componentDidUpdate() {
    try {
      let hasRights = [];
      // check token expired
      let lssData = window.sessionStorage["resp"];
      if (lssData) {
        lssData = JSON.parse(lssData);
        const tokenTime = JSON.parse(atob(lssData.token.split('.')[1]));
        if (tokenTime.exp * 1000 < Date.now()) {
          this.props.resetLoggedIn();
        }
      }
      
      if (this.props.domain !== this.state.domain && this.props.token) {
        for (const group in ACCESS_GROUPS) {
          ACCESS_GROUPS[group].forEach((grp) => {
            this.props.loginData.memberOf.forEach((access) => {
              if (grp === access) {
                hasRights.push(group);
              }
            });
          });
        }
        hasRights = [...new Set(hasRights)];

        this.setState({
          SSOType: this.props.SSOType === "SSO" ? "SSO" : "",
          domain: this.props.domain,
          authUser: this.props.loginData.name,
          hasRights: hasRights,

          token: this.props.token,
          userPosition: this.props.loginData.position,
          userPic: this.props.loginData.profilePic,
          userMail: this.props.loginData.mail,
          setAPICallErrors: this.props.setAPICallErrors,
        });
        this.getContent();
        this.applyUserSettings();
      }
    } catch (error) {
      console.log("Catch", error);
    }
  }
  setAwsRole = (awsRole) => {
		this.setState({ awsRole: awsRole });
	};
  
  modelSelectedByInventory = (modelIdByInventory) => {
		this.setState({ modelIdByInventory });
	};
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
        <SnackBarProvider ref={this.snackbarRef}/>
      </AppContext.Provider>
    );
  }
}
