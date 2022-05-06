import React, {Component, useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBContainer,} from "mdbreact";
import {Drawer, Dropdown, Menu, Popover, Switch, Table} from "antd";
import TreeChart from "../../../utilities/TreeCalculatedChart";
import {
    ADVISOR_DASHBOARD_REQ,
    ADVISOR_DASHBOARD_URL1,
    ADVISOR_DASHBOARD_URL2,
    ADVISOR_DASHBOARD_URL3,
    CONTEXT,
    INSIGHTS_ACTION,
} from "../../../config";
import {AppContext} from "../../../AppProvider";
import {MenuContext} from "../../../context/MenuContext";
import {
    Box,
    Button,
    FormControl,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Tab,
} from "@material-ui/core";
import {TabContext, TabList, TabPanel, ToggleButton} from "@material-ui/lab";
import EChart from "../../../utilities/EChart";
import BubbleEChart from "../../../utilities/BubbleEChart";
import {colorRange, defaultColor} from "../../../utilities/AllTables";
import InsightsPane from "./KPICalculatedTreePane/InsightsPane";
import KPIInsightsWrapper from "./KPIInsightsWrapper";
import {cohortSummaryInsight} from "../../../services/cohortService";
import InsightsToAction from "../I2A";
import {CreateCohortAction} from "./KPICalculatedConfiguration";
import Frame from "../Home/Frame";
import {NavLink} from "react-router-dom";

export default class KPICalculatedTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            nodeData: null,
            nodeId: null,
            currentSelected: "tree", //tree, cohort, anamolies
            selectedNodeStatus: null,
            currentNode: null,
            deepAnalysisModal: false,
            tabContext: this.props.kpiTemplateName === "WEALTH" ? "3" : "1",
            summaryData: {header: [], data: []},
            group: [
                {title: "Nodes", value: "node"},
                {title: "Cohort Type", value: "entity"},
            ],
            selectedGroup: "node",
            viewAllSummaryInsight: false,
            rawData: {},
            searchText: "",
            isNewAction: false,
            mode: "",
            actionFormData: {
                actionCohortType: "",
                actionCohortName: "",
                actionName: "",
                actionDesc: "",
                actionStartDate: "",
                actionEndDate: "",
                actionDirectRecommendation: "N",

                actionDurationTypeCode: "1W",
                actionRemarks: "For Testing",
                actionStatus: "NEW",
                actionType: "USER",
            },
            checked: false,
            showKPIDrawer: true,
            kpiTemplateName: "", //KPI Template Name
        };
    }

    setIsNewAction = (val) => {
        this.setState({isNewAction: val});
    };

    setMode = (val) => {
        this.setState({mode: val});
    };

    setActionFormData = (val) => {
        this.setState({actionFormData: val});
    };

    handleAddActionToCohort = (record) => {
        this.setIsNewAction(record);
        this.setActionFormData({
            actionCohortType: record ? record.entity : "",
            actionCohortName: record ? record.segments : "",
            actionName: "",
            actionDesc: "",
            actionStartDate: "",
            actionEndDate: "",
            actionDirectRecommendation: "N",

            actionDurationTypeCode: "1W",
            actionRemarks: "For Testing",
            actionStatus: "NEW",
            actionType: "USER",
        });
        this.setMode("add");
    };

    handleFilteredAnalysis = () => {
        this.props.getFilteredAnalysis(false, [], this.state.nodeData);
        this.listSummaryInsight("node");
    };

    handleTabContext = (event, newValue) => {
        if (newValue == 1) {
            this.setState({tabContext: newValue, showKPIDrawer: true});
        } else {
            this.setState({tabContext: newValue, showKPIDrawer: false});
        }
    };

    toggleDeepAnalysisModal = () => {
        let {deepAnalysisModal} = this.state;
        this.setState({deepAnalysisModal: !deepAnalysisModal});
    };

    setCurrentSelected = (val) => {
        this.setState({currentSelected: val});
    };

    drawerOpen = (nodeData) => {
        let color = this.getNodeStatus(nodeData.attributes.node_status);

        if (this.props.treeFilter || this.props.treeFilter === "") {
            this.setState({
                collapsed: false,
                currentSelected: "cohort",
                nodeData: nodeData,
                nodeId: nodeData.nodeId,
                currentNode: nodeData.nodeId,
                selectedNodeStatus: {
                    backgroundColor: color,
                    minHeight: "0.7rem",
                },
            });
            this.props.getCohortDetails(
                nodeData,
                this.props.analysisId,
                this.props.selectedFilter
            );
            this.props.getAnamoliesData(
                nodeData,
                this.props.analysisId,
                this.props.selectedFilter
            );
            //this.props.getInsightsData(nodeData.nodeId);
        }
    };

    getNodeStatus = (status) => {
        let selectedThreshold = colorRange.filter((col) => col.val === status);
        if (selectedThreshold.length > 0) {
            return selectedThreshold[0].color;
        }
        return defaultColor;
    };

    drawerCollapsed = () => {
        if (this.state.collapsed && this.state.currentNode) {
            this.setState({collapsed: false});
        } else {
            this.setState({collapsed: true});
        }
    };

    tableHeader = (headerData) => {
        const contextMenu = (record) => {
            return (
                <Menu>
                    <Menu.Item key="0">
                        <Button
                            fullWidth
                            color="primary"
                            className="outline-none"
                            onClick={() => this.handleAddActionToCohort(record)}
                        >
                            Add action to this cohort
                        </Button>
                    </Menu.Item>
                </Menu>
            );
        };

        let processedHeaders = [];
        if (headerData.length > 0) {
            processedHeaders = headerData.map((header) => {
                let headerprops = {
                    title: header.title,
                    dataIndex: header.dataIndex,
                    key: header.key,
                    render: (txt) => txt,
                    sorter: null,
                };

                header.dataIndex === "entity" &&
                (headerprops.sorter = (a, b) =>
                    a.entity.localeCompare(b.entity, "en", {sensitivity: "base"}));
                header.dataIndex === "noOfAccounts" &&
                (headerprops.sorter = (a, b) => a.noOfAccounts - b.noOfAccounts);
                header.dataIndex === "currentValue" &&
                (headerprops.sorter = (a, b) =>
                    parseInt(a.currentValue) - parseInt(b.currentValue));
                header.dataIndex === "hasAction" &&
                (headerprops.sorter = (a, b) =>
                    a.hasAction.localeCompare(b.hasAction, "en", {
                        sensitivity: "base",
                    }));
                header.dataIndex === "segments" &&
                (headerprops.sorter = (a, b) =>
                    a.segments.localeCompare(b.segments, "en", {
                        sensitivity: "base",
                    }));

                if (header.setGraphic) {
                    headerprops.render = (txt) => {
                        let icon = "fa fa-circle";
                        let fontColor = "grey-text";
                        switch (txt) {
                            case "G":
                                fontColor = "green-text";
                                break;
                            case "A":
                                fontColor = "amber-text";
                                break;
                            case "R":
                                fontColor = "red-text";
                                break;

                            default:
                                break;
                        }
                        return {
                            children: (
                                <span className={fontColor + " ml-2"}>
                  <i className={icon} aria-hidden="true"></i>
                </span>
                            ),
                        };
                    };
                }

                return headerprops;
            });
        }
        return [
            ...processedHeaders,
            {
                title: "",
                dataIndex: "",
                key: "action",
                render: (_, record) => {
                    return (
                        <Dropdown overlay={contextMenu(record)} trigger={["click"]}>
                            <Button
                                color="primary"
                                disabled={true}
                                className="outline-none"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Icon
                                    className="align-middle"
                                    title="Create action for this Cohort"
                                >
                                    more_vert
                                </Icon>
                            </Button>
                        </Dropdown>
                    );
                },
            },
        ];
    };

    handleViewAllSummaryInsight = () => {
        this.setState({viewAllSummaryInsight: !this.state.viewAllSummaryInsight});
        this.listSummaryInsight(this.state.selectedGroup);
    };

    filteredSummaryInsight = (res, group, searchText = "") => {
        const groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        let filtered = res.data;
        if (!this.state.viewAllSummaryInsight) {
            filtered = res.data.filter((item) => item.status !== "G");
        }

        if (searchText !== "") {
            filtered = res.data.filter((item) =>
                item.segments.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        this.setState({
            summaryData: {
                header: this.tableHeader(res.header),
                data: groupBy(filtered, group),
            },
            selectedGroup: group,
            rawData: res,
        });
    };

    listSummaryInsight = (group) => {
        let uri = INSIGHTS_ACTION
            ? `actionCohortSummaryInsight`
            : `cohortSummaryInsight`;

        var filter = this.props.treeFilter.reduce(
            (obj, item) => Object.assign(obj, {[item.name]: item.selected}),
            {}
        );
        cohortSummaryInsight(
            {
                filter: JSON.stringify(filter),
                groupBy: group,
                kpiTreeId: this.props.analysisId,
            },
            uri
        )
            .then(({data}) => {
                if (data.code === 200) {
                    this.filteredSummaryInsight(data.response, group);
                }
            })
            .catch((err) => console.log(err));
    };

    searchFilter = (value) => {
        this.setState({searchText: value});
        this.filteredSummaryInsight(
            this.state.rawData,
            this.state.selectedGroup,
            value
        );
    };

    componentDidMount() {
        // LC-718 - Summary Insights to be called when Filter data available
        if (this.props.treeFilter) {
            this.listSummaryInsight("node");
        }

        let showKPIDrawer = true;
        let kpiTemplateName = "";
        if (this.props.kpiTemplateName) {
            kpiTemplateName = this.props.kpiTemplateName;
        } else {
            if (this.props.selectedTemplateTreeID === this.props.analysisId) {
                kpiTemplateName = this.props.selectedKPITemplateName;
            }
        }
        if (this.props.kpiTemplateName === "WEALTH") {
            showKPIDrawer = false;
        }
        this.setState({kpiTemplateName, showKPIDrawer});
    }

    orientationChangeHandler = () => {
        this.setState({checked: !this.state.checked});
    };

    render() {
        return (
            <AppContext.Consumer>
                {({
                      treeDate,
                      hasRights,
                      userMail,
                      authUser,
                      selectedKPIDomain,
                      navigationType,
                      menuContent,
                      pageContent, //Added for Sales Dashboard
                      setSelectedTemplateTreeID, //Sanjit - Set Template for Individual Tree
                  }) => {
                    const treeDates = treeDate.filter(
                        (tree) => tree.treeID === this.props.analysisId
                    );
                    const drivers = this.props.drivers.filter((item) => item !== "");
                    return (
                        <div className="KPImidarea position-relative d-block">
                            <div
                                className="KPImain h-100"
                                style={{backgroundColor: "#f4f5f7"}}
                            >
                                <div className="bg-white border-bottom px-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="kpi--heading font-weight-bold">
                                            {this.props.analysisName
                                                ? this.props.analysisName
                                                : "Analysis Name"}
                                            {this.props.analysisGoal && (
                                                <Popover
                                                    content={description(this.props)}
                                                    placement="bottomLeft"
                                                    overlayStyle={{maxWidth: "500px"}}
                                                    arrow
                                                >
                                                    <Icon className="align-middle text-secondary-blue ml-2">
                                                        info_outlined
                                                    </Icon>
                                                </Popover>
                                            )}
                                        </div>
                                        <Box>
                                            <TabContext value={this.state.tabContext}>
                                                <TabList
                                                    centered
                                                    //textColor="secondary"
                                                    indicatorColor="primary"
                                                    style={{borderBottom: "1px solid #CDD6E0"}}
                                                    onChange={this.handleTabContext}
                                                >
                                                    {
                                                        //Advisor Dashboard Tabs - Required Conditions:
                                                        //Tree Name = Money Ball
                                                        //Configuration Variable advisor_dashboard_required=true
                                                    }
                                                    <Tab
                                                        label="Revenue Summary"
                                                        style={{
                                                            display:
                                                                ADVISOR_DASHBOARD_REQ &&
                                                                this.props.analysisId === 961
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                        value="3"
                                                        className="text-capitalize fs18"
                                                    />
                                                    <Tab
                                                        label="NNA Summary"
                                                        style={{
                                                            display:
                                                                ADVISOR_DASHBOARD_REQ &&
                                                                this.props.analysisId === 961
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                        value="4"
                                                        className="text-capitalize fs18"
                                                    />
                                                    <Tab
                                                        label="AUM Summary"
                                                        style={{
                                                            display:
                                                                ADVISOR_DASHBOARD_REQ &&
                                                                this.props.analysisId === 961
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                        value="5"
                                                        className="text-capitalize fs18"
                                                    />

                                                    <Tab
                                                        label="KPI Tree"
                                                        value="1"
                                                        className="text-capitalize fs18"
                                                    />
                                                    <Tab
                                                        label="Summary Insights"
                                                        value="2"
                                                        className="text-capitalize fs18"
                                                    />
                                                </TabList>
                                            </TabContext>
                                        </Box>

                                        <div
                                            className="flex-row align-items-center"
                                            style={{
                                                display:
                                                    ADVISOR_DASHBOARD_REQ && this.props.analysisId === 961
                                                        ? "none"
                                                        : "flex",
                                            }}
                                        >
                                            <div className="mr-2">
                                                Created:{" "}
                                                {treeDates.length > 0 && treeDates[0].created
                                                    ? `Created:${treeDates[0].created}`
                                                    : "N/A"}
                                            </div>
                                            <div>
                                                Last Modified:{" "}
                                                {treeDates.length > 0 && treeDates[0].updated
                                                    ? `Last Updated:${treeDates[0].updated}`
                                                    : "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Box className="w-100 h-100 bg-white">
                                    <TabContext value={this.state.tabContext}>
                                        <TabPanel className="p-0 h-100" value="1">
                                            <div
                                                className="container-fluid d-flex flex-lg-row flex-sm-column justify-content-between align-items-center py-3">
                                                <div>
                                                    {this.props.treeFilter &&
                                                    (this.props.treeFilter.length > 0 &&
                                                        this.props.treeFilter[0].name !== "") ? (
                                                        <>
                                                            <div>
                                                                {this.props.treeFilter.map((item, i) => {
                                                                    let prime = [];
                                                                    this.props.treeFilterResponse.map((item) => {
                                                                        prime = [
                                                                            ...prime,
                                                                            item[Object.keys(item)[0]],
                                                                        ];
                                                                    });

                                                                    return (
                                                                        <FormControl
                                                                            key={i}
                                                                            variant="outlined"
                                                                            className="mr-2"
                                                                            style={{minWidth: 120}}
                                                                            size="small"
                                                                        >
                                                                            <InputLabel
                                                                                id="demo-simple-select-outlined-label">
                                                                                {item.name}
                                                                            </InputLabel>
                                                                            <Select
                                                                                label={item.name}
                                                                                name={item.name}
                                                                                value={item.selected}
                                                                                onChange={(e) =>
                                                                                    this.props.changeFilterValue(e, i)
                                                                                }
                                                                            >
                                                                                {i === 0
                                                                                    ? [...new Set(prime)].map((val) => (
                                                                                        <MenuItem key={val} value={val}>
                                                                                            {val}
                                                                                        </MenuItem>
                                                                                    ))
                                                                                    : [...new Set(item.value)].map(
                                                                                        (val) => (
                                                                                            <MenuItem key={val}
                                                                                                      value={val}>
                                                                                                {val}
                                                                                            </MenuItem>
                                                                                        )
                                                                                    )}
                                                                            </Select>
                                                                        </FormControl>
                                                                    );
                                                                })}

                                                                <Button
                                                                    color="primary"
                                                                    size="large"
                                                                    variant="outlined"
                                                                    className="ml-2"
                                                                    onClick={() => this.handleFilteredAnalysis()}
                                                                >
                                                                    Get Analysis
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <ToggleButton
                                                        value="check"
                                                        selected={this.state.checked}
                                                        onChange={this.orientationChangeHandler}
                                                        size="small"
                                                        variant="contained"
                                                        className="text-primary-blue mr-3"
                                                    >
                                                        {this.state.checked ? "Horizontal" : "Vertical"}
                                                    </ToggleButton>
                                                    <Button
                                                        color="primary"
                                                        size="medium"
                                                        variant="outlined"
                                                        className={
                                                            hasRights.includes("Admin") ||
                                                            hasRights.includes("Data Scientist") ||
                                                            hasRights.includes("Data Engineering")
                                                                ? ""
                                                                : "d-none"
                                                        }
                                                        onClick={this.props.editAnalysis}
                                                    >
                                                        Edit Analysis
                                                        {/* Above KPI Tree canvas */}
                                                    </Button>
                                                </div>
                                            </div>
                                            <MDBContainer
                                                fluid
                                                flexcenter="true"
                                                className="p-0 h-100 border-top"
                                            >
                                                {/* {this.state.currentSelected !== 'tree' && (
																	<Button color="primary" style={{ color: '#1C88CA' }}
																		onClick={() => this.setCurrentSelected('tree')}
																	>&lt; Analysis Tree
																	</Button>
																)} */}

                                                <MDBCard
                                                    className="h-100"
                                                    style={{boxShadow: "none"}}
                                                >
                                                    <MDBCardBody className="p-0">
                                                        {
                                                            <TreeChart
                                                                treeData={this.props.sampleKPITree}
                                                                drawerOpen={this.drawerOpen}
                                                                colorThreshold={this.props.colorThreshold}
                                                                polarity={this.props.polarity}
                                                                unit={this.props.unit}
                                                                currentNode={this.state.currentNode}
                                                                orientation={this.state.checked}
                                                            />
                                                        }
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBContainer>
                                        </TabPanel>

                                        <TabPanel className="p-0" value="2">
                                            <div
                                                className="container-fluid d-flex flex-lg-row flex-sm-column justify-content-between align-items-center py-3">
                                                <FormControl
                                                    variant="outlined"
                                                    style={{width: "15rem"}}
                                                >
                                                    <OutlinedInput
                                                        placeholder="Search Insights"
                                                        value={this.state.searchText}
                                                        onChange={(e) => this.searchFilter(e.target.value)}
                                                        className="pr-0"
                                                        style={{minWidth: "233px", height: "2.1rem"}}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {this.state.searchText !== "" && (
                                                                    <Button
                                                                        color="primary"
                                                                        className="outline-none"
                                                                        onClick={() => this.searchFilter("")}
                                                                    >
                                                                        <Icon
                                                                            className="align-middle"
                                                                            title="Search Insights"
                                                                        >
                                                                            close
                                                                        </Icon>
                                                                    </Button>
                                                                )}
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="d-flex">
                                                    <div
                                                        className="d-flex flex-row align-items-center justify-content-between mr-3">
                                                        <h6 className="my-0">View All</h6>
                                                        <Switch
                                                            className="mx-2"
                                                            checked={this.state.viewAllSummaryInsight}
                                                            onChange={() =>
                                                                this.handleViewAllSummaryInsight()
                                                            }
                                                        />
                                                    </div>
                                                    <FormControl
                                                        variant="outlined"
                                                        size="small"
                                                        style={{width: "15rem"}}
                                                    >
                                                        <InputLabel id="demo-simple-select-outlined-label">
                                                            View By
                                                        </InputLabel>
                                                        <Select
                                                            label="View By"
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={this.state.selectedGroup}
                                                            onChange={(event) =>
                                                                this.listSummaryInsight(event.target.value)
                                                            }
                                                        >
                                                            {this.state.group.map((item, i) => (
                                                                <MenuItem key={i} value={item.value}>
                                                                    {item.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="border-top mb-5 pb-5 pt-3">
                                                {Object.keys(this.state.summaryData.data).length > 0 ? (
                                                    Object.entries(this.state.summaryData.data).map(
                                                        ([key, value], i) => (
                                                            <div key={i} className="col-12 mb-4">
                                                                <h4>
                                                                    {this.state.selectedGroup === "node"
                                                                        ? "KPI Tree Node: "
                                                                        : "Cohort Type: "}
                                                                    {key}
                                                                </h4>
                                                                <Table
                                                                    className="table-theme-bordered"
                                                                    dataSource={value}
                                                                    columns={this.state.summaryData.header}
                                                                    pagination={false}
                                                                />
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div
                                                        className="w-100 row align-items-center justify-content-center my-5">
                                                        <div className="col-md-4">
                                                            <img
                                                                className="w300"
                                                                src={`${CONTEXT}/empty-state.svg`}
                                                                alt="Empty State"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 text-center">
                                                            <h4>No Summary Insights!</h4>
                                                            <p className="fs16">
                                                                There are no summary insights to show. Any
                                                                cohort in the KPI Tree with Red & Amber status
                                                                will automatically show up on this view.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </TabPanel>

                                        {
                                            //Advisor Dashboards
                                            ADVISOR_DASHBOARD_REQ && this.props.analysisId === 961 && (
                                                <TabPanel className="p-0 h-100" value="3">
                                                    <div className="position-relative h-100">
                                                        {/* <div className="bg-light position-absolute w-100  text-right"
                          style={{ height: "6rem", top: 0 }}>
                        </div> */}
                                                        {/* <Sales_header
                              link={
                                pageContent.filter(
                                  (p) => p.treeID === this.props.analysisId
                                )[0].link
                              }
                              fileName={"sales_dashboard_text.json"}
                            /> */}
                                                        <Frame link={ADVISOR_DASHBOARD_URL1}></Frame>
                                                    </div>
                                                </TabPanel>
                                            )
                                        }
                                        {
                                            //Advisor Dashboards -II
                                            ADVISOR_DASHBOARD_REQ && this.props.analysisId === 961 && (
                                                <TabPanel className="p-0 h-100" value="4">
                                                    <div className="position-relative h-100">
                                                        {/* <Sales_header
                              link={
                                pageContent.filter(
                                  (p) => p.treeID === this.props.analysisId
                                )[0].link
                              }
                              fileName={"sales_dashboard_text.json"}
                            /> */}
                                                        <Frame link={ADVISOR_DASHBOARD_URL2}></Frame>
                                                    </div>
                                                </TabPanel>
                                            )
                                        }
                                        {
                                            //Advisor Dashboards -III
                                            ADVISOR_DASHBOARD_REQ && this.props.analysisId === 961 && (
                                                <TabPanel className="p-0 h-100" value="5">
                                                    <div className="position-relative h-100">
                                                        {/* <Sales_header
                              link={
                                pageContent.filter(
                                  (p) => p.treeID === this.props.analysisId
                                )[0].link
                              }
                              fileName={"sales_dashboard_text.json"}
                            /> */}
                                                        <Frame link={ADVISOR_DASHBOARD_URL3}></Frame>
                                                    </div>
                                                </TabPanel>
                                            )
                                        }
                                        {/* ---Drivers---
							<div>
								{drivers.length > 0 && <div>
									<h5>Drivers for the Analysis are:</h5>
									{drivers.map((driver, i) => (
										<h6 key={i}>{driver}</h6>
									))}
								</div>}
							</div> */}
                                    </TabContext>
                                </Box>
                            </div>
                            <div className="KPIside d-none">
                                {/* <KPISidebar
									token={token}
									kpiId={this.props.analysisId}
									// treeId={4}
									setAPICallErrors={setAPICallErrors}
									treeRendered={this.props.sampleKPITree ? true : false}
									treeName={this.props.analysisName ? this.props.analysisName : null}
									treeInfo={this.state.nodeData}
									nodeId={this.state.nodeId}
									drawerCollapsed={this.drawerCollapsed}
									collapsed={this.state.collapsed}
									selectedFilter={this.props.selectedFilter}
									setCurrentSelected={this.setCurrentSelected}
									cohortTbl={this.props.cohortTbl}
									cohortLoading={this.props.cohortLoading}
									cohort={this.props.cohort}
									entities={this.props.entities}
									anamolies={this.props.anamolies}
									anamoliesLoading={this.props.anamoliesLoading}
									changeCohortSegment={this.props.changeCohortSegment}
									selectedNodeStatus={this.state.selectedNodeStatus}
									polarity={this.props.polarity}
									unit={this.props.unit}
								/> */}
                            </div>
                            <MenuContext.Consumer>
                                {({siderCollapsed}) => {
                                    return (
                                        this.state.showKPIDrawer && (
                                            <KPIDrawer
                                                props={this.props}
                                                state={this.state}
                                                user={{userMail, authUser}}
                                                selectedKPIDomain={selectedKPIDomain}
                                                hasRights={hasRights}
                                                siderCollapsed={siderCollapsed}
                                                navigationType={navigationType}
                                                menuContent={menuContent}
                                                getNodeStatus={this.getNodeStatus}
                                                kpiTemplateName={this.state.kpiTemplateName} //Added for Individual Tree Template
                                                setSelectedTemplateTreeID={setSelectedTemplateTreeID}
                                            />
                                        )
                                    );
                                }}
                            </MenuContext.Consumer>
                            <CreateCohortAction
                                mode={this.state.mode}
                                setMode={() => this.setMode()}
                                isNewAction={this.state.isNewAction}
                                setIsNewAction={() => this.setIsNewAction()}
                                handleAddActionToCohort={() => this.handleAddActionToCohort()}
                                addAction={(data) => this.props.addAction(data)}
                                formData={this.state.actionFormData}
                                setFormData={(data) => this.setActionFormData(data)}
                                selectedKPIDomain={selectedKPIDomain}
                            />
                        </div>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

const description = (props) => {
    const drivers = props.drivers.filter((item) => item !== "");
    return (
        <div className="p-3">
            <h5>Description</h5>
            {props.analysisGoal && <p>{props.analysisGoal}</p>}

            {/* ---Drivers--- */}
            {drivers.length > 0 && (
                <div>
                    <h5>Drivers</h5>
                    {drivers.map((driver, i) => (
                        <p key={i}>{driver}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

const KPIDrawer = ({
                       props,
                       state,
                       user: {userMail, authUser},
                       selectedKPIDomain,
                       hasRights,
                       siderCollapsed,
                       navigationType,
                       menuContent,
                       getNodeStatus,
                       setSelectedTemplateTreeID,
                   }) => {
    const [isDrawer, setIsDrawer] = useState({visible: false, height: "32px"});
    const [isAnamolies, setIsAnamolies] = useState(false);

    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (
            state.showKPIDrawer === true &&
            state.collapsed === false &&
            isDrawer.visible === false
        ) {
            setIsDrawer({height: "50%", visible: true});
        }
    }, [state.collapsed, state.nodeData]);
    return (
        <div className="position-relative">
            <Drawer
                title=""
                placement={"bottom"}
                mask={false}
                closable={false}
                onClose={() => setIsDrawer({...isDrawer, visible: false})}
                visible={isDrawer}
                getContainer={false}
                height={isDrawer.height}
                bodyStyle={{overflowY: isDrawer.visible ? "auto" : "hidden"}}
                className={
                    siderCollapsed
                        ? "KPIDrawer"
                        : navigationType !== "Sidebar"
                            ? "KPIDrawer w-100"
                            : "KPIDrawer collapsed"
                }
            >
                <div
                    className="position-absolute"
                    style={{
                        top: "-44px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: "1111",
                        overflow: "hidden",
                        padding: "10px 10px 0",
                    }}
                >
                    <div
                        style={{
                            boxShadow: "0px 0px 8px #5f76bc",
                            background: "#fff",
                            borderRadius: "12px 12px 0 0",
                            textAlign: "center",
                            padding: "3px 12px",
                        }}
                    >
                        {isDrawer.visible ? (
                            <>
                                <IconButton
                                    className="p-0"
                                    onClick={() =>
                                        setIsDrawer({visible: false, height: "32px"})
                                    }
                                >
                  <span
                      className="material-icons h2 m-0 text-dark"
                      style={{lineHeight: "32px"}}
                  >
                    expand_more
                  </span>
                                </IconButton>
                                {isDrawer.height !== "calc(100% - 175px)" && (
                                    <IconButton
                                        className="p-0"
                                        onClick={() =>
                                            setIsDrawer({...isDrawer, height: "calc(100% - 175px)"})
                                        }
                                    >
                    <span
                        className="material-icons h2 m-0 text-dark"
                        style={{lineHeight: "32px"}}
                    >
                      expand_less
                    </span>
                                    </IconButton>
                                )}
                            </>
                        ) : (
                            <IconButton
                                className="p-0"
                                onClick={() =>
                                    state.nodeData &&
                                    setIsDrawer({visible: true, height: "50%"})
                                }
                            >
                <span
                    className="material-icons h2 m-0 text-dark"
                    style={{lineHeight: "32px"}}
                >
                  expand_less
                </span>
                            </IconButton>
                        )}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h3 className="text-center">{state.nodeData?.name}</h3>
                        </div>
                    </div>

                    {/* attributes list */}
                    <div className="row justify-content-center align-items-center mb-4">
                        {state.nodeData &&
                            Object.keys(state.nodeData.attributes).map((key, i) => {
                                let subs = key.length > 6 ? key.substring(0, 6) + "..." : key;
                                if (key != "node_status") {
                                    return (
                                        <div className="col-md-2" key={i}>
                                            <Button color="primary" className="mr-3 outline-none">
                                                {/* {state.nodeData.attributes[key][0] === "-" ? (
                          <Icon className="align-middle mr-2 text-danger">
                            fiber_manual_record
                          </Icon>
                        ) : (
                          <Icon className="align-middle mr-2 text-success">
                            fiber_manual_record
                          </Icon>
                        )} */}
                                                <Icon
                                                    style={{
                                                        color: getNodeStatus(
                                                            state.nodeData.attributes.node_status
                                                        ),
                                                    }}
                                                    className="align-middle mr-2"
                                                >
                                                    fiber_manual_record
                                                </Icon>
                                                <span className="text-capitalize text-dark" title={key}>
                          {subs}
                        </span>
                                            </Button>
                                            <strong>{state.nodeData.attributes[key]}</strong>
                                        </div>
                                    );
                                }
                            })}
                        {props.anamolies && (
                            <div className="col-md-2">
                                <Button
                                    color="primary"
                                    className="mr-3 outline-none"
                                    onClick={() => setIsAnamolies(!isAnamolies)}
                                >
                                    <Icon className="align-middle mr-2 text-danger">adjust</Icon>
                                    <span className="text-capitalize text-dark text-nowrap">
                    {props.anamolies?.series[0].markPoint.length} Outliers
                    detected
                  </span>
                                </Button>
                                <strong className="d-none">
                                    {props.anamolies?.series.length}
                                </strong>
                            </div>
                        )}
                    </div>
                    {/* anomaly chart */}
                    <div className={isAnamolies ? `row` : `d-none`}>
                        <div className="col-md-12">
                            {props.anamolies ? (
                                <div style={{height: "380px"}}>
                                    {props.selectedFilter !== "" ? (
                                        <EChart
                                            series={props.anamolies.series}
                                            xAxis={props.anamolies.xAxis}
                                            chartType={props.anamolies.yAxisType}
                                            mini={true}
                                        />
                                    ) : (
                                        <BubbleEChart
                                            title={state.nodeData.name}
                                            mini={true}
                                            data={props.anamolies}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">No Data</div>
                            )}
                        </div>
                    </div>

                    {/* cohort | action tabs */}
                    <div className="row">
                        <Box className="w-100">
                            <TabContext value={value}>
                                <Box>
                                    <TabList
                                        centered
                                        //textColor="secondary"
                                        indicatorColor="primary"
                                        style={{borderBottom: "1px solid #CDD6E0"}}
                                        onChange={handleChange}
                                    >
                                        <Tab
                                            label="Cohorts"
                                            value="1"
                                            className="text-capitalize fs18"
                                        />
                                        <Tab
                                            label="Actions"
                                            value="2"
                                            className="text-capitalize fs18"
                                        />
                                    </TabList>
                                </Box>
                                <TabPanel className="px-0" value="1">
                                    <div className="row">
                                        <div className="text-right mb-4">
                                            <FormControl variant="outlined">
                                                {/* Display Links based on Template */}
                                                {props.cohort.cohortRecords.length > 0 &&
                                                    props.kpiTemplateName &&
                                                    (props.kpiTemplateName == "CREDIT-PORTFOLIO" || props.kpiTemplateName == "CROSS-SELL") && (
                                                        <div>
                                                            <Button
                                                                color="primary"
                                                                style={{color: "#1C88CA"}}
                                                            >
                                                                <NavLink
                                                                    to={`${CONTEXT}/SG9tZS1DYW1wYWlnbiBQZXJmb3JtYW5jZQ==`}
                                                                    className="mr-3"
                                                                    onClick={() =>
                                                                        setSelectedTemplateTreeID(
                                                                            props.analysisId,
                                                                            props.kpiTemplateName
                                                                        )
                                                                    }
                                                                >
                                                                    Campaign performance
                                                                </NavLink>
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                style={{color: "#1C88CA"}}
                                                            >
                                                                <NavLink
                                                                    to={`${CONTEXT}/SG9tZS1CdXNpbmVzcyBJbnNpZ2h0cyAtIEFJIEVuYWJsZWQgQ3Jvc3MgU2VsbA==`}
                                                                    onClick={() =>
                                                                        setSelectedTemplateTreeID(
                                                                            props.analysisId,
                                                                            props.kpiTemplateName
                                                                        )
                                                                    }
                                                                >
                                                                    Business Insights
                                                                </NavLink>
                                                            </Button>
                                                        </div>
                                                    )}
                                                {props.cohort.cohortRecords.length > 0 &&
                                                    props.kpiTemplateName &&
                                                    (props.kpiTemplateName == "COLLECTION" || props.kpiTemplateName == "MVP") && (
                                                        <div>
                                                            <Button
                                                                color="primary"
                                                                style={{color: "#1C88CA"}}
                                                            >
                                                                <NavLink
                                                                    to={`${CONTEXT}/SG9tZS1Db2xsZWN0aW9uIFBlcmZvcm1hbmNl`}
                                                                    className="mr-3"
                                                                    onClick={() =>
                                                                        setSelectedTemplateTreeID(
                                                                            props.analysisId,
                                                                            props.kpiTemplateName
                                                                        )
                                                                    }
                                                                >
                                                                    Collections Performance
                                                                </NavLink>
                                                            </Button>
                                                        </div>
                                                    )}
                                                <Select
                                                    name={"Cohort_Filter"}
                                                    style={{
                                                        minWidth: "233px",
                                                        height: "2.1rem",
                                                        textAlign: "left",
                                                    }}
                                                    value={props.cohort.selected}
                                                    onChange={props.changeCohortSegment}
                                                >
                                                    {props.entities
                                                        ? props.entities.map((val) => {
                                                            return (
                                                                <MenuItem key={val} value={val}>
                                                                    {val}
                                                                </MenuItem>
                                                            );
                                                        })
                                                        : null}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-12">
                                            {props.cohortTbl && (
                                                <>
                                                    {/* Table viewed when drawer is opened on clicking a node under Cohorts */}
                                                    <Table
                                                        className="table-theme-bordered"
                                                        dataSource={props.cohort.cohortRecords}
                                                        columns={props.tableHeader()}
                                                        pagination={false}
                                                    />

                                                    {/* deep dive analysis */}
                                                    <InsightsPane
                                                        user={{userMail, authUser}}
                                                        kpiId={props.analysisId}
                                                        nodeId={state.nodeId}
                                                        insights={props.insights}
                                                        entity={props.cohort.selected}
                                                        filter={props.selectedFilter}
                                                        getDeepDiveAnalysis={props.getDeepDiveAnalysis}
                                                        uploadDeepDiveAnalysis={
                                                            props.uploadDeepDiveAnalysis
                                                        }
                                                        getInsightsData={props.getInsightsData}
                                                        createInsightsData={props.createInsightsData}
                                                        updateInsightsData={props.updateInsightsData}
                                                        deleteInsightsData={props.deleteInsightsData}
                                                        deepDiveObj={props.deepDiveObj}
                                                        deepDiveLoading={props.deepDiveLoading}
                                                        setDeepDiveAnalysis={props.setDeepDiveAnalysis}
                                                        NodesForRecEngineTree={props.NodesForRecEngineTree}
                                                        NodesForRecEngineTreeLoading={
                                                            props.NodesForRecEngineTreeLoading
                                                        }
                                                        getKPITreeNodeData={props.getKPITreeNodeData}
                                                        nodeData={state.nodeData}
                                                        selectedKPIDomain={selectedKPIDomain}
                                                        kpiCohorts={props.cohort.cohortRecords}
                                                        hasRights={hasRights}
                                                        token={props.token}
                                                    />

                                                    {/* KPI Insights */}
                                                    <KPIInsightsWrapper
                                                        user={{userMail, authUser}}
                                                        kpiId={props.analysisId}
                                                        nodeId={state.nodeId}
                                                        insights={props.insights}
                                                        entity={props.cohort.selected}
                                                        filter={props.selectedFilter}
                                                        getInsightsData={props.getInsightsData}
                                                        createInsightsData={props.createInsightsData}
                                                        updateInsightsData={props.updateInsightsData}
                                                        deleteInsightsData={props.deleteInsightsData}
                                                        nodeData={state.nodeData}
                                                    />
                                                </>
                                            )}
                                            {!props.cohortTbl && (
                                                <div
                                                    className="w-100 row align-items-center justify-content-center my-5">
                                                    <div className="col-md-4">
                                                        <img
                                                            className="w300"
                                                            src={`${CONTEXT}/empty-state.svg`}
                                                            alt="Empty State"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 text-center">
                                                        <h4>No Cohorts Found!</h4>
                                                        <p className="fs16">
                                                            There are no cohorts to show for this node.
                                                            Contributing Cohorts view helps the users to look
                                                            at the metrics and their anomalous behavior at
                                                            user cohort / segment level.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className="px-0" value="2">
                                    <InsightsToAction
                                        cohortType={props.entities}
                                        cohortData={props.cohortTbl}
                                        kpiId={props.analysisId}
                                        nodeId={state.nodeId}
                                        filter={props.selectedFilter}
                                        attributes={state.nodeData ? state.nodeData.attributes : {}}
                                        unit={props.unit}
                                        selectedKPIDomain={selectedKPIDomain}
                                        menuContent={menuContent}
                                    />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
