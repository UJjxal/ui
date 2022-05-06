import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switch} from "antd";
import {AppContext} from "../../../AppProvider";
import {Box, Button, Icon} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {CONTEXT} from "../../../config";
import {colorRange, defaultColor} from "../../../utilities/AllTables";
import {ShimmerLoader} from "../../../utilities/Loader";
import KPIVisualDraft from "../KPISandbox/KPIVisualDraft";
import HomeKPIDisplay from "./HomeKPIDisplay";
import ConfigurationAndSettings from "../KPITreeHome/ConfigurationAndSettings";
import AssetComponent from '../../../components/AssetClass/AssetComponent';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Home_KPI = (props) => {
    const [editMode, setEditMode] = useState(false);
    //const [toggleTreelist, setToggleTreelist] = useState(false);
    const [enableSetting, setEnableSetting] = useState(false);

    const toggleSetting = () => {
        setEnableSetting((prev) => !prev);
    };

    const toggleTree = (checked) => {
        //setToggleTreelist(checked);
    };

    const getNodeStatus = (status) => {
        let selectedThreshold = colorRange.filter((col) => col.val === status);
        if (selectedThreshold.length > 0) {
            return selectedThreshold[0].color;
        }
        return defaultColor;
    };


    return (
        <AppContext.Consumer>
            {({
                  menuContent,
                  hasRights,
                  treeFirstNodeDesc,
                  KPITreeListLoading,
                  KPIPublishedTreeListLoading,
                  KPISavedTreeListLoading,
                  KPIPublishedMenuContent,
                  KPISavedMenuContent,
                  treeFirstNodeDescForPublished,
                  treeFirstNodeDescForSaved,
                  token,
                  KPITreeList,
                  toggleTreelist,
                  setToggleTreelist,
                  //Remove it when doing KPI Folder Refactor
                  selectedKPIDomain,
                  mainMenuLoading, showSOIHeader, IsSOIDomainBased,
              }) => {
                let homePage = [];
                //Remove this code while doing KPI Folder Refactor
                // let publishedMenuContent = [];
                // let savedMenuContent = [];

                // if (selectedKPIDomain !== "") {
                //   if (!KPIPublishedTreeListLoading) {
                //     publishedMenuContent = KPIPublishedMenuContent.filter(
                //       (item) => item.treeDomain === selectedKPIDomain
                //     );
                //   }
                //   if (!KPISavedTreeListLoading) {
                //     savedMenuContent = KPISavedMenuContent.filter(
                //       (item) => item.treeDomain === selectedKPIDomain
                //     );
                //   }
                // } else {
                //   publishedMenuContent = [...KPIPublishedMenuContent];
                //   savedMenuContent = [...KPISavedMenuContent];
                // }

                //Remove this code while doing KPI Folder Refactor

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
                    homePage[0].children.length > 0
                ) {
                    homePage[0].children.forEach((child) => {
                        let foundGroup = false;
                        if (child.userGroups) {
                            child.userGroups.forEach((group) => {
                                if (hasRights.includes(group)) {
                                    foundGroup = true;
                                }
                            });
                        } else {
                            foundGroup = true;
                        }
                        if (foundGroup) {
                            newChildren.push({...child});
                        }
                    });

                    homePage[0].children = [...newChildren];
                }

                return (
                    <>
                        {enableSetting ? <ConfigurationAndSettings/> :
                            (
                                editMode ? (
                                    <KPIVisualDraft/>
                                ) : (
                                    <div className="h-100">

                                        {(!mainMenuLoading && IsSOIDomainBased) && <AssetComponent/>}

                                        <div className="custom-container">
                                            <div className="d-flex justify-content-between tree-options">
                                                <div className="h-3 pb-0">
                                                    {!toggleTreelist ? `Published` : `Drafted`} KPI Tree
                                                </div>
                                                <div className="controls d-flex align-items-center">
                                                    <h6
                                                        className="m-0 text-uppercase"
                                                        style={{
                                                            color: !toggleTreelist ? "#3F88C5" : "#979797",
                                                        }}
                                                    >
                                                        Published
                                                    </h6>
                                                    <Switch
                                                        className="mx-2"
                                                        checked={toggleTreelist}
                                                        onChange={() => setToggleTreelist(!toggleTreelist)}
                                                    />
                                                    <h6
                                                        className="m-0 text-uppercase"
                                                        style={{
                                                            color: toggleTreelist ? "#3F88C5" : "#979797",
                                                        }}
                                                    >
                                                        Drafts
                                                    </h6>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        style={{
                                                            display:
                                                                hasRights.includes("Admin") ||
                                                                hasRights.includes("Data Scientist") ||
                                                                hasRights.includes("Data Engineering")
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                        disabled={!toggleTreelist}
                                                        className={`${toggleTreelist && 'bg-primary-blue'} text-white px-3 py-1 mx-3 d-flex`}
                                                        onClick={() => setEditMode(true)}
                                                    >
                                                        <Icon className="mr-1">add</Icon> Create New KPI Tree
                                                    </Button>
                                                    <Button size="small"
                                                            className="bg-primary-blue text-white px-3 py-1"
                                                            onClick={() => toggleSetting()}>
                                                        <Icon className="text-white fs14 mr-2">settings</Icon> Settings
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="container-fluid mt-4">
                                                <div className="row justify-content-center">
                                                    {KPISavedTreeListLoading || KPIPublishedTreeListLoading ? (
                                                        // [...Array(9)].map((_, i) => <CardSkeleton key={i} />)
                                                        <ShimmerLoader/>
                                                    ) : (
                                                        <HomeKPIDisplay
                                                            listLoading={toggleTreelist}
                                                            //Re-consider these lines while doing KPI Folder refactor
                                                            KPIMenuContent={
                                                                toggleTreelist
                                                                    ? KPISavedMenuContent
                                                                    : KPIPublishedMenuContent
                                                            }
                                                            treeFirstNodeDesc={
                                                                toggleTreelist
                                                                    ? treeFirstNodeDescForSaved
                                                                    : treeFirstNodeDescForPublished
                                                            }
                                                            getNodeStatus={getNodeStatus}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                    </>
                );
            }}
        </AppContext.Consumer>
    );
};

export default Home_KPI;


const CardSkeleton = () => {
    return <div className="mb35 px-3">
        <div className="position-relative mb35 py-2 px-3 rounded border"
             style={{width: "344px", height: "150px", background: "#f8f8f8"}}>
            <Skeleton className="rounded-0 ml-2" animation="wave" variant="text" width={275} height={34}/>
            <div className="d-flex">
                <div className="col-12 px-0">
                    <div className="row pt-4" style={{paddingLeft: "52px"}}>
                        <div className="col-md-6 px-0">
                            <Skeleton className="rounded-0" animation="wave" variant="text" width={110} height={22}/>
                            <Skeleton className="rounded-0" animation="wave" variant="text" width={80} height={22}/>
                        </div>
                        <div className="col-md-6 px-0">
                            <Skeleton className="rounded-0" animation="wave" variant="text" width={102} height={22}/>
                            <Skeleton className="rounded-0" animation="wave" variant="text" width={52} height={22}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-absolute h-100 node-status"
                 style={{width: "8px", left: 0, top: 0, background: "#d4d4d4", borderRadius: "8px 0 0 8px"}}></div>
        </div>
    </div>
};