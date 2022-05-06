import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
} from "mdbreact";
import { Select } from "antd";

import Loader from "../../../utilities/Loader";
import ApexLineChart from "../../../utilities/ApexLineChart";
import EChart from "../../../utilities/EChart";
import MDBDataTable from "../../../utilities/MDBDataTable";
import CardList from "../../../utilities/CardList";
import {
  chartFormatPercent,
  chartFormatDollar,
  chartNoFormat,
} from "../../../utilities/commonfunctions";

import {
  getDropdown,
  getlineChart,
  getCohortTable,
  getKeyInsight,
  getEChart,
} from "../../../services/cohortService";
const { Option } = Select;

const columns = [
  {
    label: "Segments",
    field: "rootcause",
  },
  {
    label: "KPI Value (This Month)",
    field: "current_value",
  },
  {
    label: "KPI Value (Last Month)",
    field: "previous_value",
  },
  {
    label: "KPI Change (%)",
    field: "change",
  },
  {
    label: "KPI Value (% Contribution)",
    field: "contribution",
  },
  {
    label: "Status",
    field: "status",
  },
];

class RootCauseAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeDropdowns: null,
      //selectedNodeData: null,
      lineChart: null,
      LCxaxis: null,
      LCchartFormatter: null,
      LCloading: true,
      cohortTable: null,
      CTloading: true,
      keyInsight: null,
      KIloading: true,
      selectedNode: null,
      defaultSelected: null,
      cduCall: null,
    };
  }

  async componentDidMount() {
    //console.log("treeprops", this.props);
    const { data } = await getDropdown(this.props.treeId, this.props.token);
    if (data.code === 200) {
      // console.log("dataprps121", );

      if (data.response) {
        let kpiId = data.response[0].kpi_id;
        if (this.props.kpiId) {
          kpiId = this.props.kpiId;
        }
        this.setState({ nodeDropdowns: data.response, defaultSelected: kpiId });
        this.setRootCause(kpiId);
      }
    } else {
      this.props.setAPICallErrors(data.message);
    }
  }
  async componentDidUpdate() {
    //console.log("treeprops1", this.props.kpiId);
    if (this.state.cduCall !== this.props.kpiId) {
      const { data } = await getDropdown(this.props.treeId, this.props.token);
      if (data.code === 200) {
        // console.log("dataprps121", );

        if (data.response) {
          let kpiId = data.response[0].kpi_id;
          if (this.props.kpiId) {
            kpiId = this.props.kpiId;
          }
          this.setState({
            nodeDropdowns: data.response,
            defaultSelected: kpiId,
            cduCall: kpiId,
          });
          this.setRootCause(kpiId);
        }
      } else {
        this.props.setAPICallErrors(data.message);
      }
    }
  }

  /**
   * onchange dropdown value in cohort
   */
  setRootCause = (e) => {
    this.setState({
      defaultSelected: e,
      LCloading: true,
      CTloading: true,
      KIloading: true,
    });
    this.getValueById(e);
    this.lineEChart(e);
    this.cohortTable(e);
    this.keyInsight(e);
    //console.log("setRootCauseState121", this.state);
  };

  /**
   * create line chart by passing kpiId
   */
  lineChart = async (kpiId) => {
    const { data: lineChart } = await getlineChart(
      this.props.treeId,
      kpiId,
      this.props.token
    );
    if (lineChart.code == 200) {
      let chartType = chartNoFormat;
      if (lineChart.response.kpi_type) {
        if (lineChart.response.kpi_type[0] === "%") {
          chartType = chartFormatPercent;
        } else if (lineChart.response.kpi_type[0] === "$") {
          chartType = chartFormatDollar;
        }
      }
      //console.log("chartType121", chartType);
      //console.log("lineChart121", lineChart);
      this.setState({
        lineChart: lineChart.response.lineChart,
        LCxaxis: lineChart.response.xAxis,
        LCchartFormatter: chartType,
        LCloading: false,
      });
    } else {
      this.props.setAPICallErrors(lineChart.message);
    }
  };

  /**
   * create cohort table by passing kpiId
   */
  cohortTable = async (kpiId) => {
    const { data } = await getCohortTable(
      this.props.treeId,
      kpiId,
      this.props.token
    );
    if (data.code == 200) {
      const rows = data.response.map((row) => {
        if (row.status) {
          let styleIcon = { fontSize: 24, color: "#fff" };
          if (row.status === "G") {
            styleIcon = { fontSize: 24, color: "#238823" };
          } else if (row.status === "A") {
            styleIcon = { fontSize: 24, color: "#FFBF00" };
          } else if (row.status === "R") {
            styleIcon = { fontSize: 24, color: "#CC0000" };
          }
          row.status = <i className="fa fa-circle" style={styleIcon}></i>;
        }
        return row;
      });

      const table = {
        columns: columns,
        rows: rows,
      };
      //const cohortTable = { columns: columns, rows: rows };
      this.setState({
        cohortTable: table,
        CTloading: false,
      });
    } else {
      this.props.setAPICallErrors(data.message);
    }
  };

  /**
   * create key Insight by passing kpiId
   */
  keyInsight = async (kpiId) => {
    const { data } = await getKeyInsight(
      this.props.treeId,
      kpiId,
      this.props.token
    );
    if (data.code == 200) {
      this.setState({
        keyInsight: data.response,
        KIloading: false,
      });
    } else {
      this.props.setAPICallErrors(data.message);
    }
  };

  /**
   * get node value from dropdown by id
   */
  getValueById(id) {
    if (this.state.nodeDropdowns) {
      const selectedNode = this.state.nodeDropdowns.filter((item) => {
        return item.kpi_id == id;
      });
      this.setState({ selectedNode: selectedNode[0].kpi_description });
    }
  }

  /**
   * create line chart by passing kpiId
   */
  lineEChart = async (kpiId) => {
    const { data: lineChart } = await getEChart(
      this.props.treeId,
      kpiId,
      this.props.token
    );
    if (lineChart.code == 200) {
      this.setState({
        lineChart: lineChart.response.series,
        LCxaxis: lineChart.response.xAxis,
        LCchartFormatter: lineChart.response.yAxisType,
        LCloading: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCard
              className="mt-3"
              style={{ width: "68rem", margin: "1rem 1rem 0 1rem" }}
            >
              <MDBCardBody>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.20fr auto",
                  }}
                >
                  <h6 className="pt-2 pl-4">Select Node</h6>
                  <Select
                    // defaultValue={this.state.defaultSelected}
                    value={this.state.defaultSelected}
                    style={{ width: 240 }}
                    onChange={(e) => this.setRootCause(e)}
                  >
                    {this.state.nodeDropdowns
                      ? this.state.nodeDropdowns.map((el) => {
                          return (
                            <Option key={el.kpi_id} value={parseInt(el.kpi_id)}>
                              {el.kpi_description}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </div>
                <MDBCardText>
                  <MDBRow>
                    <MDBCol size="8">
                      <MDBCard
                        //style={{ width: "41rem", marginLeft: "1rem" }}
                        className="mt-3"
                      >
                        <MDBCardTitle
                          tag="h5"
                          className="pl-3 pt-2"
                          style={{ color: "black" }}
                        >
                          {this.state.selectedNode
                            ? this.state.selectedNode
                            : ""}
                          <span>
                            {this.state.LCloading === true ? (
                              <Loader
                                type="Puff"
                                style={{
                                  display: "inline-table",
                                  marginLeft: 5,
                                }}
                              />
                            ) : null}
                          </span>
                        </MDBCardTitle>
                        <MDBCardText className="text-center">
                          {this.state.lineChart ? (
                            <EChart
                              series={this.state.lineChart}
                              xAxis={this.state.LCxaxis}
                              chartType={this.state.LCchartFormatter}
                            />
                          ) : // <ApexLineChart
                          //   series={this.state.lineChart}
                          //   categories={this.state.LCxaxis}
                          //   yaxisLabelOnlyNum="false"
                          //   tickAmount="6"
                          //   height="260"
                          //   tooltipCustom="true"
                          //   //dataLabels="true"
                          //   formatter={this.state.LCchartFormatter}
                          // />
                          null}
                        </MDBCardText>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol size="4">
                      <MDBCard
                        //style={{ width: "22rem", marginLeft: "1rem" }}
                        className="mt-3"
                      >
                        <MDBCardTitle
                          tag="h5"
                          className="pl-3 pt-2"
                          style={{ color: "black" }}
                        >
                          Key Insights
                          <span>
                            {this.state.KIloading === true ? (
                              <Loader
                                type="Puff"
                                style={{
                                  display: "inline-table",
                                  marginLeft: 5,
                                }}
                              />
                            ) : null}
                          </span>
                        </MDBCardTitle>
                        <MDBCardText
                          style={{ maxHeight: 300, overflowY: "scroll" }}
                        >
                          {this.state.keyInsight ? (
                            <CardList listData={this.state.keyInsight} />
                          ) : null}
                        </MDBCardText>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCard
                      style={{ width: "65rem", marginLeft: "1rem" }}
                      className="mt-3"
                    >
                      <MDBCardTitle
                        tag="h5"
                        className="pl-3 pt-2"
                        style={{ color: "black" }}
                      >
                        Cohort Analysis
                        <span>
                          {this.state.CTloading === true ? (
                            <Loader
                              type="Puff"
                              style={{ display: "inline-table", marginLeft: 5 }}
                            />
                          ) : null}
                        </span>
                      </MDBCardTitle>
                      <MDBCardText>
                        <MDBCardBody className="pl-1 pr-1 pb-0 pt-0 ">
                          {this.state.cohortTable ? (
                            <MDBDataTable
                              mdbDataTable={this.state.cohortTable}
                            />
                          ) : null}
                        </MDBCardBody>
                      </MDBCardText>
                    </MDBCard>
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default RootCauseAnalysis;
