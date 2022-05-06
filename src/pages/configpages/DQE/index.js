import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import { Layout, Button, Popconfirm, message, Tag } from "antd";
import { MDBCard } from "mdbreact";
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import axios from "axios";

import DQESidebar from "./DQESidebar";
import Loader from "../../../utilities/Loader";
import PageTitle from "../../../utilities/PageTitle";
import TableData from "../../../utilities/Table";
import MuiTable from "../../../utilities/MuiTable";
import EChart from "../../../utilities/EChart";
import AddDataSource from "./entity/AddDataSource";
import BusinessRule from "./BusinessRule";
import { API_ROOT, PYTHON_API_ROOT } from "../../../config";
import DataQualityReport from "./entity/DataQualityReport";
import entityDetailsData from "./entityDetailsData";
import util from "../../../utilities/util";

const { Content } = Layout;

class DataQualityEngine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: {
        entities: null,
        dataQualityReport: false,
        processedRecords: false,
      },
      currentSelected: `entities`, // entities, dataQualityReport, processedRecords
      columns: "",
      entities: null,
      currentEntityId: null,
      newEntity: {},
      filteredInfo: null,
      sortedInfo: null,
      modifyBusinessRule: false,
      addDataSourceModal: false,
      collapsed: true,
      nodeData: {
        name: "",
        type: "",
        entityCategory: "",
        entityStatus: "",
        runID: "",
        selectedNodeStatus: "#c0c0c0",
        frequencyDetails: {},
        additionalDetails: {},
      },
      dataQualityReport: [],
      processedRecords: [],
      isLoading: false,
    };
  }

  /** return current date */
  currentDate = () => {
    const today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");
    return date;
  };

  /** return first date of week with time 000000 */
  startDate = () => {
    const today = new Date(),
      y = today.getFullYear(),
      m = today.getMonth(),
      day = today.getDate() - today.getDay(); //new Date(y, m, 1).getDate(),

    const firstDayFull = new Date(today.setDate(day)).toUTCString();
    const firstDay = new Date(firstDayFull).getDate();
    const firstDayMonth = new Date(firstDayFull).getMonth();
    const date =
      y +
      String(firstDayMonth + 1).padStart(2, "0") +
      String(firstDay).padStart(2, "0") +
      `000000`;
    //console.log("startDate11#", firstDayFull, date);
    return date;
  };

  /**return last date of current week with time 235959 */
  endDate = () => {
    const today = new Date(),
      y = today.getFullYear(),
      m = today.getMonth(),
      day = today.getDate() - today.getDay(),
      date =
        today.getFullYear() +
        String(today.getMonth() + 1).padStart(2, "0") +
        String(day + 6).padStart(2, "0") +
        `235959`;
    return date;
  };

  /**blank entity */
  blankEntity = () => {
    this.setState({
      newEntity: {
        entityId: uuid().split("-").join(""),
        entityAction: "New",
        entityName: "",
        entityCategory: "",
        entityTags: [],
        entityType: "",
        entitySeparator: "",
        entityFrequency: "daily",
        entityFrequencyDay: "1",
        entityEffectiveStartDate: this.currentDate(),
        entityEffectiveEndDate: "",
        attributes: [
          {
            attributeId: uuid().split("-").join(""),
            id: 1,
            attributeName: "",
            attributeDesc: "",
            dataExamples: "",
            isPK: "",
            isNullable: "",
            dataType: "",
            length: "",
            dateFormat: "",
            rules: [{ type: "", severity: "", operator: "" }],
          },
        ],
      },
    });
  };

  componentDidMount() {
    this.blankEntity();
    this.getEntities();
  }

  getEntities = async () => {
    this.setState({
      apiResponse: { ...this.state.apiResponse, entities: null },
    });
    let url = PYTHON_API_ROOT + `dqDataQualityList/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        //this.setState({filteredData: result.data.response})
        if (result.data.code === 200) {
          this.setState({
            apiResponse: { ...this.state.apiResponse, entities: 200 },
            entities:
              result.data.response.length > 0 ? result.data.response : null,
          });
        } else {
          this.setState({
            apiResponse: { ...this.state.apiResponse, entities: 400 },
          });
        }
      })
      .catch((err) => {
        console.error("dqEntitylistError..#", err);
        this.setState({
          apiResponse: { ...this.state.apiResponse, entities: 400 },
        });
      });
  };

  tableHeader = () => {
    return [
      {
        field: "entityName",
        headerName: "Entity",
        flex: 1.2,
        renderCell: (params) => (
          <a
            className="text-primary"
            onClick={() =>
              this.drawerOpen(params.row.entityId, `dqEntityDetails`, `entity`)
            }
          >
            {params.row.entityName}
          </a>
        ),
      },
      {
        field: "id",
        flex: 0.5,
        headerName: "Action",
        filterable: false,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const entityId = params.row.entityId;
          return (
            <>
              <span
                title="Edit Entity"
                onClick={() => {
                  this.getEntityDtlByName(params.row.entityName, entityId);
                  this.drawerCollapsed();
                }}
              >
                <a>
                  <EditTwoTone style={{ fontSize: "1.2rem" }} />
                </a>
              </span>
              <Popconfirm
                overlayClassName="pop-padding"
                title="Sure to delete?"
                onConfirm={() => {
                  this.handleEntityDelete(entityId, params.row.entityName);
                  this.drawerCollapsed();
                }}
              >
                <a title="Delete Entity">
                  <DeleteOutlined
                    style={{
                      paddingLeft: "0.3rem",
                      fontSize: "1.2rem",
                      color: "#dc3545",
                    }}
                  />
                </a>
              </Popconfirm>
            </>
          );
        },
      },
      {
        field: "entityTags",
        headerName: "Entity Tags",
        flex: 1,
        renderCell: (params) => {
          return (
            <div title={params.row.entityTags}>
              {Array.isArray(params.row.entityTags)
                ? params.row.entityTags.map((tag,i) => <Tag key={i}>{tag}</Tag>)
                : null}
            </div>
          );
        },
      },
      { field: "dataExpected", headerName: "Data Expected", flex: 1 },
      { field: "lastUpdated", headerName: "Last Updated", flex: 1 },
      {
        field: "entityStatus",
        headerName: "Entity Status",
        flex: 0.8,
        renderCell: (params) => (
          <a
            className="text-primary"
            onClick={() =>
              this.drawerOpen(params.row.entityId, `dqEntityDetails`, `status`)
            }
          >
            <Icon
              style={{
                color: this.getColorCode(params.row.statusColor),
                fontSize: "16px",
                marginRight: "3px",
                verticalAlign: "text-bottom",
              }}
            >
              fiber_manual_record
            </Icon>
            {params.row.entityStatus}
          </a>
        ),
      },
      {
        field: "dataQualityIssues",
        headerName: "Data Quality Issues",
        flex: 1,
        renderCell: (params) => {
          const onClick = () => {
            this.drawerOpen(params.row.entityId, `dqEntityDetails`, `issues`);
          };

          return (
            <a className="text-primary" onClick={onClick}>
              <Icon
                style={{
                  color: this.getColorCode(params.row.dataQualityIssuesColor),
                  fontSize: "16px",
                  marginRight: "3px",
                  verticalAlign: "text-bottom",
                }}
              >
                fiber_manual_record
              </Icon>
              {params.row.dataQualityIssues}
            </a>
          );
        },
      },
    ];
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleEntityDelete = (entityId, entityName) => {
    //const key = "delete";
    //message.loading({ content: "Deleting...", key });
    try {
      const url = PYTHON_API_ROOT + `dqDeleteEntity/${this.props.token}`;
      axios({
        method: "post",
        data: { entityName: entityName, entityId: entityId },
        url: url,
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then((res) => {
        if (res.data.code === 200) {
          //message.destroy(key);
          message.success("Record deleted successfully!");
          this.getEntities();
        } else {
          message.error("Error: Please contact Administrator!");
          console.log(`dataQualityReport Error: `, res.data.message);
        }
      });
    } catch (error) {
      message.error("Error: Please contact Administrator!");
      console.log(`dataQualityReport Catch: `, error);
    }
  };

  toggleAddDataSourceModal = (reload) => {
    this.setState({
      addDataSourceModal: !this.state.addDataSourceModal,
      currentEntityId: null,
    });

    if(reload===true){
      this.blankEntity();
      this.getEntities();
    }
  };

  toggleBusinessRule = () => {
    this.setState({
      modifyBusinessRule: !this.state.modifyBusinessRule,
    });
  };

  dataQualityReport = (filter, entityId) => {
	if(entityDetailsData.dataQualityReport[entityId]){
		this.setState(util.copyObj(entityDetailsData.dataQualityReport[entityId]));
		return;
	}

	//console.log('dataQualityReport121')
    this.setState({
		dataQualityReport: [],
		apiResponse: { ...this.state.apiResponse, dataQualityReport: false },
	});

    // if (runId === "") {
    //   console.log(`No runId found associated with the entity.`);
    //   this.setState({ dataQualityReport: [] });
    //   return false;
    // }
    let url = PYTHON_API_ROOT + `failedRecordsDescription/${this.props.token}`; //failedRecordsDetails/${entityName}/${runId}
    axios({
      method: "post",
      data: filter,
      url: url,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      if (res.data.status !== `fail`) {
        const addUniqueRd = [];
        res.data.response.forEach((data, index) => {
          addUniqueRd.push({ ...data, key: index + 1 });
        });

		entityDetailsData.dataQualityReport[entityId]={dataQualityReport:addUniqueRd, apiResponse:{...this.state.apiResponse, dataQualityReport:true}};
        this.setState({...entityDetailsData.dataQualityReport[entityId]});
      } else {
		entityDetailsData.dataQualityReport[entityId]={apiResponse:{...this.state.apiResponse, dataQualityReport:true}};
        this.setState({
          apiResponse: { ...this.state.apiResponse, dataQualityReport: true },
        });
        console.log(`dataQualityReport Error: `, res.data.message);
      }
    });
  };

  processedRecords = (entityId, startTime, endTime, entityId1) => {
	if(entityDetailsData.processedRecords[entityId1]){
		this.setState(util.copyObj(entityDetailsData.processedRecords[entityId1]));
		return;
	}

	this.setState({
		processedRecords: [],
		apiResponse: { ...this.state.apiResponse, processedRecords: false },
	});

    const url =
    PYTHON_API_ROOT +
      `passedRecordsDetails/${entityId}/${startTime}/${endTime}/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        if(res.data.code === 200){
			entityDetailsData.processedRecords[entityId]={
				processedRecords:res.data.response,
				apiResponse:{...this.state.apiResponse, processedRecords: true},
			};

          this.setState({...entityDetailsData.processedRecords[entityId]});
        } else {
			entityDetailsData.processedRecords[entityId]={
				processedRecords:[],
				apiResponse:{...this.state.apiResponse, processedRecords: true},
			};
          this.setState({
			processedRecords:[],
            apiResponse: { ...this.state.apiResponse, processedRecords: true },
          });
          console.log(`processedRecords Error: `, res.data.message);
        }
      })
      .catch((e) => {
        console.log(`processedRecords Error: `, e);
      });
  };

  setEntityDetails=(res, entityId, header)=>{
    if (header===`entity`) {
      this.setState({
        nodeData: {
          heading: "Entity Details",
          label: "Source",
          name: res.entityName,
          entityStatus: res.entityStatus,
          entityCategory: res.entityCategory,
          runID: "",
          selectedNodeStatus: "#c0c0c0",
          frequencyDetails: {
            heading: "Frequency",
            icon: "access_time",
            name: "Frequency Details",
            frequency: res.entityFrequency,
            frequencyDay: res.entityFrequencyDay,
            explore: false,
          },
          additionalDetails: {
            heading: "Additional Details",
            icon: "description",
            entityType: res.entityType,
            separater: res.entitySeparator,
            effectiveFrom: res.entityEffectiveStartDate,
            effectiveTo: res.entityEffectiveEndDate,
            rawFilePath: res.rawFilePath,
          },
          qualityReport: [],
          processedRecords: this.processedRecords(
            res.entityId,
            `${this.startDate()}`,
            `${this.endDate()}`
          ),
          explore: false,
        },
        isLoading: false,
      });
    } else if (header === `status`) {
      let status = this.state.entities.filter(
        (item) => item.entityId === res.entityId
      );
      this.setState({
        nodeData: {
          heading: "Data Status Details",
          label: "Status",
          name: status[0].entityName,
          entityCategory: status[0].entityStatus,
          runID: status[0].runID,
          selectedNodeStatus: this.getColorCode(status[0].statusColor),
          frequencyDetails: {},
          additionalDetails: {},
          qualityReport: [],
          processedRecords: this.processedRecords(
            status[0].entityId,
            `${this.startDate()}`,
            `${this.endDate()}`
          ),
          explore: false,
        },
        isLoading: false,
      });
    } else if (header === `issues`) {
      let status = this.state.entities.filter(
        (item) => item.entityId === res.entityId
      );

      this.setState({
        nodeData: {
          heading: "Data Quality Issue Details",
          label: "Source",
          entityCategory: status[0].entityCategory,
          name: status[0].entityName,
          type: "",
          runID: status[0].runID,
          selectedNodeStatus: this.getColorCode(
            status[0].dataQualityIssuesColor
          ),
          frequencyDetails: {
            heading: "Data Quality Report",
            icon: "description",
            name: "",
            frequency: "",
            frequencyDay: "",
            explore: true,
          },
          additionalDetails: {},
          qualityReport: this.dataQualityReport({
            entityid: status[0].entityId,
            runid: status[0].runID,
            startTime: "",
            endTime: "",
          }, entityId),
          processedRecords: this.processedRecords(
            status[0].entityId,
            `${this.startDate()}`,
            `${this.endDate()}`,
			entityId
          ),
          //processedRecords: this.processedRecords(`ac33fc7a662d1c3c2dc302b33e2e66`, `20201228001130`, `20210104201256`),
          explore: false,
        },
        isLoading: false,
      });
    }
  }

  drawerOpen = (entityId, api, header) => {
    //console.log("record121", entityId);
    
	if(entityDetailsData.dtl[entityId]){
		this.setState({isLoading: false, collapsed: false});
		this.setEntityDetails(util.copyObj(entityDetailsData.dtl[entityId]), entityId, header);
		return;
	}else{
		this.setState({isLoading: true, collapsed: false});
	}


    let url=PYTHON_API_ROOT + `${api}/${entityId}/${this.props.token}`;
    axios({
      method:"get",
      url:url,
      headers:{"Access-Control-Allow-Origin": "*"},
    })
      .then((result)=>{
        const res=result.data.response[0];
		entityDetailsData.dtl[entityId]=res;

        if (result.data.code === 200) {
            this.setEntityDetails(res, entityId, header);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getColorCode = (str) => {
    let colorCode;
    switch (str) {
      case "GR":
        colorCode = "#3f6c51";
        break;
      case "YL":
        colorCode = "#e3c567";
        break;
      case "GY":
        colorCode = "#c0c0c0";
        break;
      case "RD":
        colorCode = "#b70404";
        break;

      default:
        colorCode = "#c0c0c0";
    }
    return colorCode;
  };

  drawerCollapsed = () => {
    this.setState({
      collapsed: true,
    });
  };

  /** set entity call onChange */
  setNewEntity = (newEntity) => {
    //console.log('setNewEntity111',newEntity)
    this.setState({ newEntity });
  };

  /** edit entity detail */
  getEntityDtlByName = async (name, id) => {
    let url = PYTHON_API_ROOT + `getConfigFileDetails/${name}/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        console.log("getEntityDtlByName", result);
        if (result.data.code === 200) {
          this.setState({
            addDataSourceModal: !this.state.addDataSourceModal,
            currentEntityId: id,
            newEntity: result.data.response,
          });
        } else {
          alert("Record not exist! Please contact Administrator");
        }
      })
      .catch((err) => {
        console.error("getEntityDtlByNameError..#", err);
      });
  };

  handleCurrentSelected = (str) => {
    this.setState({ currentSelected: str });
  };

  render() {
    return this.state.modifyBusinessRule ? (
      <BusinessRule
        toggleBusinessRule={this.toggleBusinessRule}
        token={this.props.token}
      />
    ) : (
      <div className="KPImidarea">
        <div className="KPImain">
          {this.state.currentSelected === `dataQualityReport` ? (
            <>
              <PageTitle
                title={"Data Quality Report"}
                marginLeft="2.5rem"
                extra={
                  <Button
                    className="float-right mt-4 mr-4 blue-bg"
                    type="primary"
                    onClick={() =>
                      this.setState({ currentSelected: `entities` })
                    }
                  >
                    View Data Quality Manager
                  </Button>
                }
              />
              <DataQualityReport
                dataQualityReport={this.state.dataQualityReport}
                nodeData={this.state.nodeData}
                getColorCode={this.getColorCode}
                updateDataQualityExpRpt={this.updateDataQualityExpRpt}
                token={this.props.token}
              />
            </>
          ) : this.state.currentSelected === `processedRecords` ? (
            <>
              <PageTitle
                title={"Processed Records"}
                marginLeft="2.5rem"
                extra={
                  <Button
                    className="float-right mt-4 mr-4 blue-bg"
                    type="primary"
                    onClick={() =>
                      this.setState({ currentSelected: `entities` })
                    }
                  >
                    View Data Quality Manager
                  </Button>
                }
              />
              <Content style={{ padding: "4px 24px" }}>
                <MDBCard>
                  <div className="border" style={{ height: "30rem" }}>
                    <EChart
                      series={
                        this.state.processedRecords.hasOwnProperty("series")
                          ? this.state.processedRecords.series
                          : []
                      }
                      seriesStack={"Total"}
                      seriesLabelShow={true}
                      yAxisAxisLabelPd={[0, 10, 0, 0]}
                      xAxisFormatter={true}
                      //xAxis={this.props.processedRecords.Xaxis}
                      yAxis={this.state.processedRecords.Xaxis}
                      color={["#CC0000", "#238823", "#065196"]}
                      dataZoomDisabled={true}
                    />
                  </div>
                </MDBCard>
              </Content>
            </>
          ) : (
            <>
              <PageTitle
                title={"Data Quality Manager"}
                margin="0.5rem 0.5rem 0.5rem 2.5rem"
                marginLeft="2.5rem"
                extra={
                  <>
                    <Button
                      className="float-right mt-3 mr-4 blue-bg"
                      type="primary"
                      onClick={() => {
                        this.setState((state) => ({
                          modifyBusinessRule: !state.modifyBusinessRule,
                          currentEntityId: null,
                        }));
                        this.drawerCollapsed();
                      }}
                    >
                      Modify Business Rules
                    </Button>
                    <Button
                      className="float-right mt-3 mr-2 blue-bg"
                      type="primary"
                      onClick={() => {
                        this.setState((state) => ({
                          addDataSourceModal: !state.addDataSourceModal,
                          currentEntityId: null,
                        }));
                        this.drawerCollapsed();
                      }}
                    >
                      <i className="fa fa-plus"></i>&nbsp;Add New Entity
                    </Button>
                    <Button
                      className="float-right mt-3 mr-2"
                      onClick={() => {
                        this.getEntities();
                        this.drawerCollapsed();
                      }}
                      title="Refresh"
                    >
                      <i className="fa fa-refresh"></i>
                    </Button>
                  </>
                }
              />
              <Content style={{ padding: "4px 24px", minHeight: 280 }}>
                {this.state.apiResponse.entities ? (
                  <>
                    <MuiTable
                      columns={this.tableHeader()}
                      rows={this.state.entities}
                      sortModel={[
                        {
                          field: "entityName",
                          sort: "asc",
                        },
                      ]}
                    />
                  </>
                ) : (
                  <Loader style={{ marginLeft: "40%" }} />
                )}
                <AddDataSource
                  addDataSourceModal={this.state.addDataSourceModal}
                  toggleAddDataSourceModal={this.toggleAddDataSourceModal}
                  token={this.props.token}
                  currentEntityId={this.state.currentEntityId}
                  newEntity={this.state.newEntity}
                  setNewEntity={this.setNewEntity}
                  entities={this.state.entities}
                  currentDate={this.currentDate}
                />
              </Content>
            </>
          )}
        </div>

        <div className="KPIside">
          <DQESidebar
            drawerCollapsed={this.drawerCollapsed}
            collapsed={this.state.collapsed}
            treeRendered={this.state.collapsed ? true : false}
            treeInfo={this.state.nodeData}
            dataQualityReport={this.state.dataQualityReport}
            processedRecords={this.state.processedRecords}
            isLoading={this.state.isLoading}
            apiResponse={this.state.apiResponse}
            currentSelected={(e) => this.handleCurrentSelected(e)}
          />
        </div>
      </div>
    );
  }
}
export default DataQualityEngine;
