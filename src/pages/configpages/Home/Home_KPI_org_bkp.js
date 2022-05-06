import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Switch, DatePicker } from "antd";
import moment from "moment";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Frame from "./Frame";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Icon,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "../../../utilities/Card_TreeNode_PNC";
import { CONTEXT, API_ROOT, ADVISOR_DASHBOARD_URL1 } from "../../../config";
import Loader from "../../../utilities/Loader";
import { colorRange, defaultColor } from "../../../utilities/AllTables";
import KPIVisualDraft from "../KPISandbox/KPIVisualDraft";
import KPIMetricsMaintenance from "../KPISandbox/KPIMetricsMaintenance";
import KPICohortsMaintenance from "../KPISandbox/KPICohortsMaintenance";
import CreateActionRecommendation from "../KPISandbox/ActionRecommendation/CreateActionRecommendation";
import {
  dataCatalog,
  addDataCatalog,
  updateDataCatalog,
  updateDataCatalogTable,
  deleteDataCatalog,
} from "../../../components/DataCatalog";
//import { NavLink } from 'react-router-dom';
import HomeKPIDisplay from "./HomeKPIDisplay";
import KPITrees from "../KPITreeHome";
import ConfigurationAndSettings from "../KPITreeHome/ConfigurationAndSettings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home_KPI = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [valueHor, setvalueHor] = useState(0);
  const [valueVer, setValueVer] = useState(0);
  const [toggleTreelist, setToggleTreelist] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [isCheckbox, setIsCheckbox] = useState({ year: {}, month: {} });
  const [businessDay, setBusinessDay] = useState("");
  const [metricsModal, setMetricsModal] = useState(false);
  const [cohortsModal, setCohortsModal] = useState(false);
  const handleChangex = (event, newValue) => {
    setvalueHor(newValue);
  };
  const handleChangey = (event, newValue) => {
    setValueVer(newValue);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const toggleTree = (checked) => {
    setToggleTreelist(checked);
  };
  const handleCheckbox = (e, type) => {
    const name = e.target.name;
    setIsCheckbox({ ...isCheckbox, [type]: { name } });
    setSelectedDate(moment(selectedDate).set(type, name));
  };
  const toggleMetricsModal = () => {
    setMetricsModal((prevMetricsModal) => !prevMetricsModal);
  };

  const toggleCohortsModal = () => {
    setCohortsModal((prevCohortsModal) => !prevCohortsModal);
  };

  const getNodeStatus = (status) => {
    let selectedThreshold = colorRange.filter((col) => col.val === status);
    if (selectedThreshold.length > 0) {
      return selectedThreshold[0].color;
    }
    return defaultColor;
  };

  const getFirstBusinessDay = useCallback(() => {
    axios({
      method: "get",
      url: API_ROOT + `listBusinessDay/`,
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        let bday = res.data.response.filter(
          (item) => item.kpi_domain === props.KPIdomain
        );
        if (bday.length > 0) {
          let resDate = moment(bday[0]["date"]);
          setSelectedDate(resDate);
          setIsCheckbox({
            year: { name: "" + resDate.year() },
            month: { name: "" + resDate.format("MMM") },
          });
          setBusinessDay(bday[0]["key"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const setFirstBusinessDay = (kpi_domain) => {
    let data = {
      key: `First Business Day`,
      month: moment(selectedDate).format("MMM"),
      year: moment(selectedDate).year(),
      date: moment(selectedDate).format("YYYY-MM-DD"),
      kpiDomain: kpi_domain,
    };
    axios({
      method: "post",
      url: API_ROOT + `businessDay/`,
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Access-Control-Allow-Origin": "*",
      },
      data,
    })
      .then((res) => {
        if (res.data.response === "success") {
          //Promise.reject();
          window.alert(`Business Day added successfully!`);
        }else{
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFirstBusinessDay();
  }, []);

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
        //Remove it when doing KPI Folder Refactor
        selectedKPIDomain,
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
              newChildren.push({ ...child });
            }
          });

          homePage[0].children = [...newChildren];
        }

         //LC-462 Add "Others" Domain Box
         let startIndex = selectedKPIDomain === "Others" ? 0 : -1;

        return (
          <>
            {/* KPI Trees List */}
            {(KPIPublishedMenuContent && KPIPublishedMenuContent.length > 0) ||
            (KPISavedMenuContent && KPISavedMenuContent.length > 0) ? (
              <div className="custom-container">
                <KPITrees />
              </div>
            ) : null}

            {!editMode && (
              <AppBar
                position="static"
                className="px-4"
                style={{
                  backgroundColor: "#f4f5f7",
                  boxShadow: "none",
                  color: "#111",
                  borderBottom: "2px solid #d0d0d0",
                }}
              >
                <Tabs
                  id="tabs-panel"
                  value={valueHor}
                  onChange={handleChangex}
                  aria-label=""
                  className="tabs-panel-default"
                > 
                  {
                  //LC-462 Advisor Dashboard Setting
                  selectedKPIDomain === "Others" && (
                    <Tab
                      className="text-capitalize"
                      label="Advisor Dashboard"
                      {...a11yProps(startIndex)}
                    />
                  )}
                  <Tab
                    className="text-capitalize"
                    label="KPI Tree"
                    {...a11yProps(startIndex + 1)}
                  />
                  <Tab
                    className="text-capitalize"
                    label="Configurations & Settings"
                    {...a11yProps(startIndex + 2)}
                  />
                  {/* <Tab
                    className="text-capitalize"
                    label="Action Recommendations"
                    {...a11yProps(2)}
                  /> */}
                </Tabs>
              </AppBar>
            )}

            {selectedKPIDomain === "Others" && (
              <TabPanel value={valueHor} index={startIndex}>
                <div className="position-relative">
                  <div
                    className="bg-light position-absolute w-100 text-right"
                    style={{ height: "6rem", top: 0 }}
                  >
                    {/* <button
                      className="border-0 bg-transparent p-4"
                      onClick={() => setIsOpen(true)}
                    >
                      <Icon>zoom_out_map</Icon>
                    </button> */}
                  </div>

                  <Frame link={ADVISOR_DASHBOARD_URL1}></Frame>
                </div>
              </TabPanel>
            )}
            <TabPanel value={valueHor} index={startIndex + 1}>
              {editMode ? (
                <KPIVisualDraft />
              ) : (
                <>
                  <div className="d-flex flex-row align-items-center justify-content-between mb-5">
                    <h3 className="m-0">
                      {!toggleTreelist ? `Published` : `Drafted`} KPI Tree
                    </h3>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 text-uppercase"
                        style={{
                          color: !toggleTreelist ? "#3F88C5" : "#979797",
                        }}
                      >
                        Published
                      </h6>
                      <Switch
                        className="mx-3"
                        checked={toggleTreelist}
                        onChange={toggleTree}
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
                        variant="contained"
                        color="primary"
                        className="ml-5"
                        style={{
                          display:
                            hasRights.includes("Admin") ||
                            hasRights.includes("Data Scientist") ||
                            hasRights.includes("Data Engineering")
                              ? "block"
                              : "none",
                          backgroundColor: "#3f88c5",
                        }}
                        disabled={!toggleTreelist}
                        onClick={() => setEditMode(true)}
                      >
                        <MDBIcon icon={"plus"} />
                        &nbsp; {`Create New KPI Tree`}
                      </Button>
                    </div>
                  </div>
                  <MDBContainer className="mt-0 kpi-list-default">
                    {KPISavedTreeListLoading || KPIPublishedTreeListLoading ? (
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        <Loader height={100} width={100} />
                      </div>
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
                  </MDBContainer>
                </>
              )}
            </TabPanel>
            <TabPanel value={valueHor} className="p-0" index={startIndex + 2}>
              <div className="d-flex">
                <AppBar
                  position="static"
                  style={{
                    maxWidth: "322px",
                    height: "700px",
                    backgroundColor: "#f4f5f7",
                    boxShadow: "none",
                    color: "#111",
                    zIndex: "100",
                  }}
                >
                  <Tabs
                    value={valueVer}
                    onChange={handleChangey}
                    aria-label=""
                    orientation="vertical"
                    className="tabs-panel-default"
                  >
                    <Tab
                      className="text-capitalize text-left"
                      label="Business Day"
                      {...a11yProps(0)}
                    />
                    <button
                      className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit justify-content-start"
                      style={{
                        outline: 0,
                        display:
                          hasRights.includes("Admin") ||
                          hasRights.includes("Data Scientist") ||
                          hasRights.includes("Data Engineering")
                            ? "flex"
                            : "none",
                      }}
                      color="primary"
                      onClick={() => toggleMetricsModal()}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          textTransform: "capitalize",
                        }}
                      >
                        Metrics Management
                      </span>
                    </button>
                    <button
                      className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit justify-content-start"
                      style={{
                        outline: 0,
                        display:
                          hasRights.includes("Admin") ||
                          hasRights.includes("Data Scientist") ||
                          hasRights.includes("Data Engineering")
                            ? "flex"
                            : "none",
                      }}
                      color="primary"
                      onClick={() => toggleCohortsModal()}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          textTransform: "capitalize",
                        }}
                      >
                        Cohorts Management
                      </span>
                    </button>
                    <Tab
                      className="text-capitalize text-left"
                      label="Data Catalog Management"
                      {...a11yProps(3)}
                    />
                    <Tab
                      className="text-capitalize text-left"
                      label="Parameter Management"
                      {...a11yProps(4)}
                    />
                  </Tabs>
                </AppBar>
                <div className="w-100">
                  <TabPanel value={valueVer} index={0}>
                    <FormControl variant="outlined" style={{ width: "25rem" }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Business Day
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={`First Business Day`}
                        onChange={(event) => setBusinessDay(event.target.value)}
                        label="Business Day"
                        placeholder="Business Day"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dayOptions.map((option) => (
                          <MenuItem
                            key={option}
                            className="text-capitalize"
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <h6 className="my-3">Select the Year</h6>
                    <ul className="list-inline mb-4">
                      {selectYear.map(({ name, label }, i) => (
                        <li key={i} className="list-inline-item">
                          <label
                            className={
                              isCheckbox.year["name"] !== name
                                ? `pills`
                                : `pills bg-primary border-primary text-white`
                            }
                          >
                            <input
                              name={name}
                              type="checkbox"
                              className="d-none"
                              checked={
                                isCheckbox.year["name"] !== name ? false : true
                              }
                              onChange={(e) => handleCheckbox(e, `year`)}
                            />
                            {label}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <h6 className="mb-3">Select the Month</h6>
                    <ul className="list-inline mb-4">
                      {selectMonth.map(({ name, label }, i) => (
                        <li key={i} className="list-inline-item">
                          <label
                            className={
                              isCheckbox.month["name"] !== name
                                ? `pills`
                                : `pills bg-primary border-primary text-white`
                            }
                          >
                            <input
                              name={name}
                              type="checkbox"
                              className="d-none"
                              checked={
                                isCheckbox.month["name"] !== name ? false : true
                              }
                              onChange={(e) => handleCheckbox(e, `month`)}
                            />
                            {label}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <h6 className="mb-0">Select the Date</h6>
                    <DatePicker
                      mode={`date`}
                      open
                      value={selectedDate}
                      renderExtraFooter={() => null}
                      getPopupContainer={() =>
                        document.querySelector(".calender-wrapper-default")
                      }
                      placeholder="Select the Date"
                      onChange={handleDateChange}
                      style={{ height: 0, visibility: "hidden" }}
                      dropdownClassName="position-static"
                    />
                    <div className="calender-wrapper-default position-relative"></div>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#3f88c5" }}
                        onClick={() =>
                          setFirstBusinessDay(homePage[0].displayName)
                        }
                      >
                        {`Submit`}
                      </Button>
                    </div>
                  </TabPanel>
                  <TabPanel value={valueVer} index={3}>
                    <DataCatalogManagement />
                  </TabPanel>
                  <TabPanel value={valueVer} index={4}>
                    <div className="d-flex justify-content-between pb-1">
                      <div className="align-items-center border d-flex justify-content-around p-2 rounded-pill">
                        <Icon>search</Icon>
                        <input
                          type="text"
                          placeholder="Search Parameters"
                          className="search-input border-0 no-outline"
                        />
                      </div>
                      <Button
                        size="small"
                        className="bg-primary-blue text-white p-2"
                      >
                        Create new parameter
                      </Button>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bordered-2 rounded">
                        <table className="table table-borderless">
                          <thead className="border-bottom">
                            <tr>
                              <th>Parameter Name</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                            <tr>
                              <td>Parmeter 1</td>
                              <td>Parameter Description</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="border-top">
                              <td className="d-flex justify-content-end pb-0"><Icon>chevron_left</Icon>
                                <div> 1 </div>
                                <div> 2 </div>
                                <div> 3 </div>
                                <Icon>chevron_right</Icon>
                              </td>
                              <td className="pb-0">48 Results</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className="bordered-2">edit</div>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={valueHor} className="p-0" index={startIndex + 3}>
              <div className="d-flex">
                <AppBar
                  position="static"
                  style={{
                    maxWidth: "322px",
                    height: "700px",
                    backgroundColor: "#f4f5f7",
                    boxShadow: "none",
                    color: "#111",
                    zIndex: "100",
                  }}
                >
                  {[
                    "Create Manually",
                    "Model Generated-I",
                    "Model Generated-II",
                    "Experimentation Engine",
                    "Recommendation Moderation",
                  ].map((title, i) => {
                    let btnTxtStyle = {
                      fontSize: "1rem",
                      fontWeight: "normal",
                      width: "100%",
                      textAlign: "left",
                      padding: "0 5px",
                    };
                    if (i === 0) {
                      btnTxtStyle = {
                        ...btnTxtStyle,
                        color: "#4285f4",
                        fontWeight: "bold",
                      };
                    }
                    return (
                      <div
                        key={i}
                        className="MuiTabs-flexContainer MuiTabs-flexContainerVertical"
                        style={{
                          borderRight: i === 0 ? "2px solid #4285f4" : "",
                        }}
                      >
                        <button
                          className="MuiButtonBase-root MuiTab-root text-capitalize"
                          style={{ outline: 0, width: "100%" }}
                          color="primary"
                        >
                          <div style={btnTxtStyle}>{title}</div>
                        </button>
                      </div>
                    );
                  })}
                </AppBar>

                <div className="p20">
                  <CreateActionRecommendation
                    isOpen={true}
                    setIsOpen={() => {}}
                    InitiatedFromInsightsSection={false}
                    showInsidePage={true}
                    selectedKPIDomain={props.KPIdomain}
                    //nodeData={KPITreeList}
                    menuContent={menuContent}
                  />
                </div>
              </div>
            </TabPanel>

            <KPIMetricsMaintenance
              metricsModal={metricsModal}
              toggleMetricsModal={toggleMetricsModal}
              token={token}
            />
            <KPICohortsMaintenance
              cohortsModal={cohortsModal}
              toggleCohortsModal={toggleCohortsModal}
              token={token}
            />
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

const selectYear = [
  {
    name: "2021",
    label: "2021",
  },
  {
    name: "2020",
    label: "2020",
  },
  {
    name: "2019",
    label: "2019",
  },
  {
    name: "2018",
    label: "2018",
  },
  {
    name: "2017",
    label: "2017",
  },
];
const selectMonth = [
  {
    name: "Jan",
    label: "Jan",
  },
  {
    name: "Feb",
    label: "Feb",
  },
  {
    name: "Mar",
    label: "Mar",
  },
  {
    name: "Apr",
    label: "Apr",
  },
  {
    name: "May",
    label: "May",
  },
  {
    name: "Jun",
    label: "Jun",
  },
  {
    name: "Jul",
    label: "Jul",
  },
  {
    name: "Aug",
    label: "Aug",
  },
  {
    name: "Sep",
    label: "Sep",
  },
  {
    name: "Oct",
    label: "Oct",
  },
  {
    name: "Nov",
    label: "Nov",
  },
  {
    name: "Dec",
    label: "Dec",
  },
];
const dayOptions = ["First Business Day"]; //'Last Business Day', 'Mid Month Pay Cycle'

const DataCatalogManagement = () => {
  const [newTable, setNewTable] = useState(false);
  const [newColumn, setNewColumn] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [data, setData] = useState({
    optionsForDataField: [],
    optionsForDataTable: [],
    optionsForEditorTable: [],
  });
  const [table, setTable] = useState([]);
  const [column, setColumn] = useState([]);
  const [selected, setSelected] = useState({
    schema: "",
    entity: "",
    fieldName: "",
    expression: "",
    type: "",
    columnFilter: "",
    filterExpression: "",
  });

  const getDataCatalog = () => {
    dataCatalog()
      .then((response) => setData(response))
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    getDataCatalog();
  }, []);

  // handle value for dropdowns

  const handleSchema = (value) => {
    const filteredTable = data[`optionsForDataField`].filter(
      (item) => item.schema === value
    );
    setTable(filteredTable);
    setSelected({
      ...selected,
      schema: value,
      entity: "",
      fieldName: "",
      expression: "",
    });
  };
  const handleDataTable = (value) => {
    const filteredColumn = data[`optionsForDataField`].filter(
      (item) => item.key === value
    );
    setColumn(filteredColumn[0].children);
    setSelected({
      ...selected,
      entity: value,
      type: filteredColumn[0].type,
      fieldName: "",
      expression: "",
    });
  };
  const handleDataField = (value) => {
    const filteredExpression = column.filter((item) => item.title === value);
    console.log("FILTERED EXPRESSION", filteredExpression);
    setSelected({
      ...selected,
      fieldName: value,
      expression: filteredExpression[0].expression,
      fieldname_old: value,
      columnFilter:
      filteredExpression[0].columnFilter && filteredExpression[0].columnFilter.length > 0
          ? JSON.parse(filteredExpression[0].columnFilter)
          : "false",
      filterExpression: filteredExpression[0].filterExpression,
    });
  };

  // handle data table

  const handleEditTable = (value) => {
    if (selected.entity === "") {
      alert(`Please select table!`);
      return false;
    }
    setNewTable(true);
    setEditTable(true);
    setSelected({
      ...selected,
      entity: selected.entity || "",
      entity_old: value,
    });
  };

  const handleAddDataTable = () => {
    if (selected.entity === "") {
      alert(`Please add table name!`);
      return false;
    }

    const duplicate = table.find((x) => x.key === selected.entity);
    if (duplicate !== undefined) {
      window.alert("Table already exists!");
      return false;
    }

    const data = {
      ...selected,
      fieldName: "temp",
      expression: "",
      type: "DataField",
    };

    addDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Table added successfully!`);
          setNewTable(false);
          setTable([]);
          getDataCatalog();
          setSelected({ ...selected, schema: "", entity: "" });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataTable = () => {
    if (selected.entity === "") {
      alert(`Please add table name!`);
      return false;
    }

    const self = selected.entity === selected.entity_old;
    const duplicate = column.find((x) => x.key === selected.entity);
    if (duplicate !== undefined && !self) {
      window.alert("Table already exists!");
      return false;
    }

    const data = {
      schema: selected.schema,
      entityNew: selected.entity,
      entity: selected.entity_old,
    };

    updateDataCatalogTable(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Table updated successfully!`);
          setNewTable(false);
          setTable([]);
          getDataCatalog();
          setSelected({
            ...selected,
            schema: "",
            entity: "",
            fieldname: "",
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteDataTable = () => {
    if (selected.entity === "") {
      alert(`Please select table!`);
      return false;
    }

    if (!window.confirm("Are you sure you want to delete?")) {
      return false;
    }

    const data = { schema: selected.schema, entity: selected.entity };

    deleteDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Table deleted successfully!`);
          setTable([]);
          setColumn([]);
          getDataCatalog();
          setSelected({
            ...selected,
            schema: "",
            entity: "",
            fieldName: "",
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  // handle data field

  const handleEditColumn = (value) => {
    if (selected.fieldName === "") {
      alert(`Please select column!`);
      return false;
    }
    setNewColumn(true);
    setEditColumn(true);
    setSelected({
      ...selected,
      fieldName: selected.fieldName || "",
      fieldname_old: value,
    });
  };

  const handleAddDataField = () => {
    if (selected.fieldName === "") {
      alert(`Please add column name!`);
      return false;
    }

    const duplicate = column.find((x) => x.key === selected.fieldName);
    if (duplicate !== undefined) {
      window.alert("Column already exists!");
      return false;
    }

    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
      expression: selected.expression,
      type: selected.type,
      columnFilter: "" + selected.columnFilter,
    };

    addDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Column added successfully!`);
          setNewColumn(false);
          getDataCatalog();
          setSelected({ ...selected, entity: "" });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataField = () => {
    if (selected.fieldName === "") {
      alert(`Please add column name!`);
      return false;
    }

    const self = selected.fieldName === selected.fieldname_old;
    const duplicate = column.find((x) => x.key === selected.fieldName);
    if (duplicate !== undefined && !self) {
      window.alert("Column already exists!");
      return false;
    }

    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldNameNew: selected.fieldName,
      fieldName: selected.fieldname_old,
      expression: selected.expression,
      type: selected.type,
      columnFilter: "" + selected.columnFilter,
      filterExpression: selected.filterExpression,
    };

    updateDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Column updated successfully!`);
          setNewColumn(false);
          setColumn([]);
          getDataCatalog();
          setSelected({
            ...selected,
            entity: "",
            fieldName: "",
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteDataField = () => {
    if (selected.fieldName === "") {
      alert(`Please select column!`);
      return false;
    }

    if (column.length < 2) {
      alert("Column list can't be empty!");
      return false;
    }

    if (!window.confirm("Are you sure you want to delete?")) {
      return false;
    }

    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
    };

    deleteDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Column deleted successfully!`);
          setColumn([]);
          getDataCatalog();
          setSelected({
            ...selected,
            entity: "",
            fieldName: "",
            expression: "",
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleUpdateDataExpression = () => {
    if (selected.fieldName === "") {
      alert(`Please select column!`);
      return false;
    }
    handleUpdateDataField();
  };

  // handle cloumn as filter

  const handleColumnFilter = () => {
    if (selected.fieldName === "") {
      alert(`Please select column!`);
      return false;
    }

    const data = {
      action: `column`,
      schema: selected.schema,
      entity: selected.entity,
      fieldName: selected.fieldName,
      fieldname_old: selected.fieldname_old,
      expression: selected.expression,
      type: selected.type,
      columnFilter: "" + !selected.columnFilter,
      filterExpression: selected.filterExpression,
    };

    updateDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Column Filter updated!`);
          setSelected({ ...selected, columnFilter: !selected.columnFilter });
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleColumnFilterExpression = () => {
    const data = {
      schema: selected.schema,
      entity: selected.entity,
      fieldNameNew: selected.fieldName,
      fieldName: selected.fieldname_old,
      expression: selected.expression,
      type: selected.type,
      columnFilter: "" + selected.columnFilter,
      filterExpression: selected.filterExpression,
    };

    updateDataCatalog(data)
      .then((response) => {
        if (response.status === 200) {
          alert(`Filter Expression updated!`);
          getDataCatalog();
          setColumn([]);
          setSelected({
            ...selected,
            filterExpression: selected.filterExpression,
            entity: "",
            fieldName: ""
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="d-flex flex-column">
      <h6 className="mb-4">Data Catalog Management</h6>
      <FormControl variant="outlined" style={{ width: "25rem" }}>
        <InputLabel id="demo-simple-select-outlined-label">
          Select Schema
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selected.schema}
          onChange={(event) => handleSchema(event.target.value)}
          label="Select Schema"
          placeholder="Select Schema"
        >
          {[
            ...new Map(
              data["optionsForDataField"].map((item) => [item[`schema`], item])
            ).values(),
          ].map(({ schema }, i) => (
            <MenuItem key={i} value={schema}>
              {schema}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="d-flex align-center mt-5">
        <div className="position-relative">
          {!newTable ? (
            <FormControl variant="outlined" style={{ width: "25rem" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Select Table
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selected.entity}
                onChange={(event) => handleDataTable(event.target.value)}
                label="Select Table"
                placeholder="Select Table"
              >
                {table.map(({ key, title }) => (
                  <MenuItem key={key} value={key}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl variant="outlined" style={{ width: "25rem" }}>
              <InputLabel htmlFor="demo-simple-select-outlined-label">
                Add Table
              </InputLabel>
              <OutlinedInput
                id="demo-simple-select-outlined-label"
                label="Add Table"
                placeholder="Add Table"
                value={selected.entity}
                onChange={(event) =>
                  setSelected({ ...selected, entity: event.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    {!editTable ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={selected.schema !== "" ? false : true}
                        style={{ backgroundColor: "#3f88c5" }}
                        onClick={() => handleAddDataTable()}
                      >
                        {`+ Add Table`}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#3f88c5" }}
                        onClick={() => handleUpdateDataTable()}
                      >
                        {`Update`}
                      </Button>
                    )}
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          )}
          <Button
            color="primary"
            className="outline-none"
            style={{ position: "absolute", right: 0, bottom: "-36px" }}
            onClick={() => {
              setNewTable(!newTable);
              setEditTable(false);
              setNewColumn(false);
              setColumn([]);
              setSelected({
                ...selected,
                entity: "",
                fieldName: "",
                expression: "",
              });
            }}
          >
            {!newTable ? `+ Add New Table` : `Select from existing table`}
          </Button>
        </div>
        {!newTable && (
          <>
            <Button color="primary" className="ml-3 outline-none">
              <Icon
                className="align-middle"
                title="Edit Table"
                onClick={() => handleEditTable(selected.entity)}
              >
                drive_file_rename_outline
              </Icon>
            </Button>
            <Button color="primary" className="outline-none">
              <Icon
                className="align-middle"
                title="Delete Table"
                onClick={() => handleDeleteDataTable()}
              >
                delete_forever
              </Icon>
            </Button>
          </>
        )}
      </div>
      {!newTable && (
        <div className="d-flex align-center mt-5 pt-3">
          <div className="position-relative">
            {!newColumn ? (
              <FormControl variant="outlined" style={{ width: "25rem" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Column
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selected.fieldName}
                  onChange={(event) => handleDataField(event.target.value)}
                  label="Select Column"
                  placeholder="Select Column"
                >
                  {column.map(({ key, title }) => (
                    <MenuItem key={key} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl variant="outlined" style={{ width: "25rem" }}>
                <InputLabel htmlFor="demo-simple-select-outlined-label">
                  Add Column
                </InputLabel>
                <OutlinedInput
                  id="demo-simple-select-outlined-label"
                  label="Add Column"
                  placeholder="Add Column"
                  value={selected.fieldName}
                  onChange={(event) =>
                    setSelected({ ...selected, fieldName: event.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {!editColumn ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={selected.entity !== "" ? false : true}
                          style={{ backgroundColor: "#3f88c5" }}
                          onClick={() => handleAddDataField()}
                        >
                          {`+ Add Column`}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "#3f88c5" }}
                          onClick={() => handleUpdateDataField()}
                        >
                          {`Update`}
                        </Button>
                      )}
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            )}
            <Button
              color="primary"
              className="outline-none"
              style={{ position: "absolute", right: 0, bottom: "-36px" }}
              onClick={() => {
                setNewColumn(!newColumn);
                setEditColumn(false);
                setSelected({ ...selected, fieldName: "", expression: "" });
              }}
            >
              {!newColumn ? `+ Add New Column` : `Select from existing Columns`}
            </Button>
          </div>
          {!newColumn && (
            <>
              <Button
                color="primary"
                className="ml-3 outline-none"
                onClick={() => handleEditColumn(selected.fieldName)}
              >
                <Icon className="align-middle" title="Edit Column">
                  drive_file_rename_outline
                </Icon>
              </Button>
              <Button
                color="primary"
                className="outline-none"
                onClick={() => handleDeleteDataField()}
              >
                <Icon className="align-middle" title="Delete Column">
                  delete_forever
                </Icon>
              </Button>
            </>
          )}
        </div>
      )}
      {!newColumn && !newTable && (
        <>
          <FormControlLabel
            style={{ width: "14rem" }}
            label="Use this column as filter"
            control={
              <Checkbox
                color="primary"
                checked={
                  selected.fieldName !== "" ? selected.columnFilter : false
                }
                onChange={() => handleColumnFilter()}
              />
            }
          />
          {selected.columnFilter && selected.fieldName !== "" && (
            <>
              <h6 className="mt-5 pt-3">Filter Expression</h6>
              <div className="border rounded" style={{ width: "25rem" }}>
                <textarea
                  className="form-control border-0"
                  placeholder="Write expression here..."
                  style={{ boxShadow: "none", minHeight: "90px" }}
                  value={selected.filterExpression}
                  onChange={(event) =>
                    setSelected({
                      ...selected,
                      filterExpression: event.target.value,
                    })
                  }
                />
                <div className="text-right">
                  <Button
                    color="primary"
                    className="outline-none"
                    onClick={() => handleColumnFilterExpression()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
          <h6 className="mt-5 pt-3">Expression</h6>
          <div className="border rounded mb-5" style={{ width: "42rem" }}>
            <textarea
              className="form-control border-0"
              placeholder="Write expression here..."
              style={{ boxShadow: "none", minHeight: "90px" }}
              value={selected.expression}
              onChange={(event) =>
                setSelected({ ...selected, expression: event.target.value })
              }
            />
            <div className="text-right">
              <Button
                color="primary"
                className="outline-none"
                onClick={() => handleUpdateDataExpression()}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home_KPI;
