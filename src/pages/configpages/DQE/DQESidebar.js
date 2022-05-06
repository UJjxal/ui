import React, { Component } from "react";
import { AppContext } from "../../../AppProvider";
import TableData from "../../../utilities/Table";
import "antd/dist/antd.css";
import {
  MDBIcon,
  MDBCard,
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import Icon from "@material-ui/core/Icon";
import EChart from "../../../utilities/EChart";
import { Layout } from "antd";
import Loader from "../../../utilities/Loader";
const { Sider } = Layout;

class DQESidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeId: null,
      isLoading: true,
    };
  }

  tableHeader = () => {
    console.log("In Sidebar Table");
    return [
      {
        label: "Segments",
        field: "segments",
        minimal: "sm",
      },
      {
        label: "Status",
        field: "status",
      },
    ];
  };

  tableFields = () => {
    console.log("In Sidebar Table Fields", this.props);
    let tele_table = [];
    this.props.cohort.cohortRecords.forEach((rec, index) => {
      if (index < 5) {
        tele_table.push({
          Segments: rec.segments,
          Status: (
            <MDBIcon
              icon="circle"
              className={this.setStatusColor(rec.status)}
            />
          ),
        });
      }
    });
    return tele_table;
  };

  setStatusColor = (val) => {
    switch (val) {
      case "G":
        return "green-text";

      case "A":
        return "amber-text";

      case "R":
        return "red-text";

      default:
        return "grey-text";
    }
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

  removeStr = (str, len = 16) => {
    if (str.length > len) {
      return str.substring(0, len - 3) + "...";
    }
    return str;
  };

  // tableHeader = () => {
  // 	return [
  // 		{
  // 			title: 'Segments',
  // 			dataIndex: 'segments',
  // 			key: 'segments',
  // 			render: (txt) => {
  // 				return {
  // 					children: (
  // 						<span
  // 							style={{
  // 								whiteSpace: 'nowrap',
  // 								overflow: 'hidden',
  // 								textOverflow: 'ellipsis',
  // 								width: '10rem',
  // 							}}
  // 						>
  // 							{txt}
  // 						</span>
  // 					),
  // 				};
  // 			},
  // 		},
  // 		{
  // 			title: 'Status',
  // 			dataIndex: 'status',
  // 			key: 'status',
  // 			render: (txt) => {
  // 				let icon = 'fa fa-circle';
  // 				let fontColor = 'grey-text';
  // 				switch (txt) {
  // 					case 'G':
  // 						fontColor = 'green-text';
  // 						break;
  // 					case 'A':
  // 						fontColor = 'amber-text';
  // 						break;
  // 					case 'R':
  // 						fontColor = 'red-text';
  // 						break;

  // 					default:
  // 						break;
  // 				}
  // 				return {
  // 					children: (
  // 						<span className={fontColor}>
  // 							<i className={icon} aria-hidden="true"></i>
  // 						</span>
  // 					),
  // 				};
  // 			},
  // 		},
  // 	];
  // };

  render() {
    //console.log("props121", this.props);
    return (
      <AppContext.Consumer>
        {({ theme, currentTheme, domain }) => {
          let { polarity, unit } = this.props;
          return (
            <Layout
              style={{
                height: "100%",
                background: theme.color3,
                borderRight: "1px solid",
                borderRightColor: theme.color5,
                fontFamily: theme.font,
                fontSize: theme.size,
              }}
            >
              <Sider
                collapsible
                collapsed={this.props.collapsed}
                width={300}
                style={{
                  background: theme.color3,
                  marginBottom: "1.1rem",
                }}
                collapsedWidth={50}
                trigger={null}
              >
                <div
                  onClick={() => this.props.drawerCollapsed()}
                  className="ant-layout-sider-zero-width-trigger 
								     ant-layout-sider-zero-width-trigger-left 
								     d-flex justify-content-between align-items-center"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    top: ".01rem",
                    left: this.props.collapsed ? "-15px" : "-15px",
                    width: this.props.collapsed ? "20px" : "250px",
                    cursor: "pointer",
                  }}
                >
                  <MDBIcon
                    style={{ color: "#2a9fd8", fontSize: "2rem" }}
                    icon={
                      this.props.collapsed
                        ? "chevron-circle-left"
                        : "chevron-circle-right"
                    }
                  />
                </div>
                <MDBContainer
                  style={{
                    visibility: !this.props.collapsed ? "visible" : "hidden",
                  }}
                >
                  {!this.props.isLoading && this.props.treeInfo.name !== "" ? (
                    <>
                      <h5
                        className="mt-2 text-center"
                        style={{ color: theme.color6 }}
                      >
                        {this.props.treeInfo.heading
                          ? this.props.treeInfo.heading
                          : "Entity Details"}
                      </h5>
                      <MDBCard className="mt-3" style={{ borderRadius: "5px" }}>
                        {!this.props.treeInfo.isLoading &&
                        Object.keys(this.props.treeInfo).length > 0 ? ( //side-node-title is defined in TreeChart.css
                          <>
                            <div
                              className="side-node-title mt-2 ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.treeInfo.name}
                            </div>
                            <div className="pl-4 pb-2">
                              {this.props.treeInfo.entityCategory !== "" ? (
                                <small className="side-node-attr-1 d-block">
                                  <b className="text-dark">
                                    {this.props.treeInfo.label}:{" "}
                                  </b>
                                  {this.props.treeInfo.entityCategory}
                                </small>
                              ) : null}
                              {this.props.treeInfo.runID !== "" ? (
                                <small className="side-node-attr-1 text-primary">
                                  <b className="text-dark">Run ID: </b>
                                  <span></span>
                                  {this.props.treeInfo.runID}
                                </small>
                              ) : null}
                            </div>
                            <div
                              className="node-status"
                              style={{
                                background: this.props.treeInfo
                                  .selectedNodeStatus,
                                minHeight: "0.7rem",
                              }}
                            ></div>
                          </>
                        ) : null}
                      </MDBCard>
                      <div>
                        {Object.keys(this.props.treeInfo.frequencyDetails)
                          .length > 0 ? (
                          <div>
                            <div className="d-flex flex-row align-items-center justify-content-between mt-5 mb-2">
                              <div className="d-flex flex-row align-items-center">
                                <Icon style={{ color: theme.color6 }}>
                                  {this.props.treeInfo.frequencyDetails.icon}
                                </Icon>
                                <h6
                                  className="m-0 ml-2"
                                  style={{ color: theme.color6 }}
                                >
                                  {this.props.treeInfo.frequencyDetails.heading}
                                </h6>
                              </div>
                              {this.props.dataQualityReport.length > 0 &&
                              this.props.treeInfo.frequencyDetails.explore ? (
                                <MDBBtn
                                  size="sm"
                                  color="primary"
                                  className="px-3"
                                  onClick={() => {
                                    this.props.currentSelected(
                                      "dataQualityReport"
                                    );
                                    this.props.drawerCollapsed();
                                  }}
                                >
                                  Explore
                                </MDBBtn>
                              ) : null}
                            </div>
                            <div className="border p-2 bg-white">
                              <MDBCard>
                                <div
                                  className="side-node-title my-2 ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {this.props.treeInfo.frequencyDetails.name}
                                </div>
                                {this.props.treeInfo.frequencyDetails
                                  .frequency !== "" ? (
                                  <table>
                                    <tbody>
                                      <tr className={`bg-light px-2 py-1`}>
                                        <td className="px-2">Frequency</td>
                                        <td className="px-2">
                                          {
                                            this.props.treeInfo.frequencyDetails
                                              .frequency
                                          }
                                        </td>
                                      </tr>
                                      <tr className={`px-2 py-1`}>
                                        <td className="px-2">Frequency Period</td>
                                        <td className="px-2">
                                          {
                                            this.props.treeInfo.frequencyDetails
                                              .frequencyDay
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                ) : this.props.dataQualityReport.length > 0 ? (
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="p-2">
                                          <b>Checks</b>
                                        </th>
                                        <th className="p-2">
                                          <b>Issues</b>
                                        </th>
                                        <th className="p-2">
                                          <b>Status</b>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.props.dataQualityReport.map(
                                        (item, i) => {
                                          return (
                                            <tr
                                              className={
                                                i % 2 == 0
                                                  ? `bg-light px-2 py-1`
                                                  : `px-2 py-1`
                                              }
                                            >
                                              <td
                                                className="px-2"
                                                title={item.rulesubcategory}
                                              >
                                                {this.removeStr(
                                                  item.rulesubcategory
                                                )}
                                              </td>
                                              <td className="px-2 text-right">
                                                {item.count}
                                              </td>
                                              <td className="px-2 text-center">
                                                <Icon
                                                  style={{
                                                    color: this.getColorCode(
                                                      item.errorColor
                                                    ),
                                                    fontSize: "20px",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  fiber_manual_record
                                                </Icon>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </table>
                                ) : this.props.apiResponse.dataQualityReport ? (
                                  <small className="px-2">No data.</small>
                                ) : (
                                  <Loader style={{ marginLeft: "40%" }} />
                                )}
                              </MDBCard>
                            </div>
                          </div>
                        ) : null}
                        <div>
                          <div className="d-flex flex-row align-items-center justify-content-between mt-5 mb-2">
                            <div className="d-flex flex-row align-items-center">
                              <Icon style={{ color: theme.color6 }}>
                                trending_up
                              </Icon>
                              <h6
                                className="m-0 ml-2"
                                style={{ color: theme.color6 }}
                              >
                                Processed Records
                              </h6>
                            </div>
                            {this.props.processedRecords.hasOwnProperty(
                              "series"
                            ) ? (
                              <MDBBtn
                                size="sm"
                                color="primary"
                                className="px-3"
                                onClick={() => {
                                  this.props.currentSelected(
                                    "processedRecords"
                                  );
                                  this.props.drawerCollapsed();
                                }}
                              >
                                Explore
                              </MDBBtn>
                            ) : null}
                          </div>
                          <div className="border p-2 bg-white">
                            <MDBCard
                              style={{ height: "15rem", paddingLeft: "0px" }}
                            >
                              {this.props.processedRecords.length < 1 ? (
                                this.props.apiResponse.processedRecords ? (
                                  <small className="px-2">No data.</small>
                                ) : (
                                  <Loader
                                    style={{
                                      marginLeft: "40%",
                                      marginTop: "20%",
                                    }}
                                  />
                                )
                              ) : (
                                <EChart
                                  series={
                                    this.props.processedRecords.hasOwnProperty(
                                      "series"
                                    )
                                      ? this.props.processedRecords.series
                                      : []
                                  }
                                  seriesStack={"Total"}
                                  //seriesBarWidth={'50%'}
                                  yAxisAxisLabelPd={[0, 2, 0, 0]}
                                  xAxisFormatter={true}
                                  seriesLabelShow={true}
                                  //xAxis={this.props.processedRecords.Xaxis}
                                  yAxis={this.props.processedRecords.Xaxis}
                                  color={["#CC0000", "#238823", "#065196"]}
                                  mini={true}
                                  dataZoomDisabled={true}
                                />
                              )}
                            </MDBCard>
                          </div>
                        </div>
                        {Object.keys(this.props.treeInfo.additionalDetails)
                          .length > 0 ? (
                          <div>
                            <div className="d-flex flex-row align-items-center justify-content-between mt-5 mb-2">
                              <div className="d-flex flex-row align-items-center">
                                <Icon style={{ color: theme.color6 }}>
                                  {this.props.treeInfo.additionalDetails.icon}
                                </Icon>
                                <h6
                                  className="m-0 ml-2"
                                  style={{ color: theme.color6 }}
                                >
                                  {
                                    this.props.treeInfo.additionalDetails
                                      .heading
                                  }
                                </h6>
                              </div>
                              {this.props.treeInfo.additionalDetails.explore ? (
                                <MDBBtn
                                  size="sm"
                                  color="primary"
                                  className="px-3"
                                  //onClick={() => this.props.setCurrentSelected('cohort')}
                                >
                                  Explore
                                </MDBBtn>
                              ) : null}
                            </div>
                            <div className="border p-2 bg-white">
                              <MDBCard>
                                <table>
                                  <thead>
                                    <tr>
                                      {/* {
																	Object.keys(this.props.treeDetails.attributes.list[0]).map((item, i) => {
																		return <th>{item}</th>
																	})
																	} */}
                                      <th className="p-2">
                                        <b>Item</b>
                                      </th>
                                      <th className="p-2">
                                        <b>Details</b>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className={`bg-light px-2 py-1`}>
                                      <td className="px-2">Entity Type</td>
                                      <td className="px-2">
                                        {
                                          this.props.treeInfo.additionalDetails
                                            .entityType
                                        }
                                      </td>
                                    </tr>
                                    <tr className={`px-2 py-1`}>
                                      <td className="px-2">Separater</td>
                                      <td className="px-2">
                                        {
                                          this.props.treeInfo.additionalDetails
                                            .separater
                                        }
                                      </td>
                                    </tr>
                                    <tr className={`bg-light px-2 py-1`}>
                                      <td className="px-2">Effective From</td>
                                      <td className="px-2">
                                        {
                                          this.props.treeInfo.additionalDetails
                                            .effectiveFrom
                                        }
                                      </td>
                                    </tr>
                                    <tr className={`px-2 py-1`}>
                                      <td className="px-2">Effective To</td>
                                      <td className="px-2">
                                        {
                                          this.props.treeInfo.additionalDetails
                                            .effectiveTo
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </MDBCard>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <Loader style={{ marginLeft: "40%", marginTop: "20%" }} />
                  )}
                </MDBContainer>
              </Sider>
            </Layout>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
export default DQESidebar;
