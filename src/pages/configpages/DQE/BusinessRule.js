import React, { Component } from "react";
import { Layout, Button, Popconfirm } from "antd";
import Icon from "@material-ui/core/Icon";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Loader from "../../../utilities/Loader";
import PageTitle from "../../../utilities/PageTitle";
import MuiTable from "../../../utilities/MuiTable";
import AddBusinessRule from "./AddBusinessRule";
import { API_ROOT, PYTHON_API_ROOT } from "../../../config";
const { Content } = Layout;

class BusinessRule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: null,
      columns: "",
      entities: [],
      filteredInfo: null,
      sortedInfo: null,
      modifyBusinessRule: false,
      addBusinessRuleModal: false,
      ruleDetails: null,
      collapsed: true,
      nodeData: {
        name: "",
        attributes: {
          list: [],
          runId: [],
        },
        selectedNodeStatus: "#ccc",
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getRules();
  }

  getRules = async () => {
    this.setState({ apiResponse: null });
    let url = PYTHON_API_ROOT + `dqRuleList/isVisible/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        //console.log("dqRuleList", result.data);
        if (result.data.code === 200) {
          this.setState({
            apiResponse: 200,
            entities:
              result.data.response.length > 0 ? result.data.response : null,
          });
        } else {
          this.setState({
            apiResponse: 400,
          });
        }
      })
      .catch((err) => {
        console.error("dqRuleList..#", err);
        this.setState({
          apiResponse: 400,
        });
      });
  };

  editRule = (ruleId) => {
    this.setState({
      addBusinessRuleModal: true,
      ruleDetails: this.state.entities.filter((item) => item.ruleId === ruleId),
    });
  };

  deleteRule = (ruleId) => {
    console.log(`Are you really want to delete ${ruleId}?`);
  };

  tableHeader = () => {
    return [
      {
        field: "ruleDesc",
        headerName: "Rule Description",
        flex: 2,
      },
      { field: "ruleSubCategory", headerName: "Category", flex: 0.7 },
      {
        field: "id",
        flex: 0.3,
        headerName: "Action",
        sortable: false,
        filterable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const ruleId = params.row.ruleId;
          return (
            <>
              <span
                title="Edit Rule"
                onClick={
                  params.row.isEditable === "True"
                    ? () => {
                        this.editRule(ruleId);
                      }
                    : ""
                }
              >
                <a>
                  <EditOutlined
                    style={{
                      fontSize: "1.2rem",
                      color:
                        params.row.isEditable === "True"
                          ? "#1890ff"
                          : "#c1c1c1",
                    }}
                  />
                </a>
              </span>

              {params.row.isDeletable === "True" ? (
                <Popconfirm
                  overlayClassName="pop-padding"
                  title="Sure to delete?"
                  onConfirm={() => {
                    this.deleteRule(ruleId);
                  }}
                >
                  <a title="Delete Rule">
                    <DeleteOutlined
                      style={{
                        paddingLeft: "0.3rem",
                        fontSize: "1.2rem",
                        color: "#dc3545",
                      }}
                    />
                  </a>
                </Popconfirm>
              ) : (
                <DeleteOutlined
                  style={{
                    paddingLeft: "0.3rem",
                    fontSize: "1.2rem",
                    color: "#c1c1c1",
                  }}
                />
              )}
            </>
          );
        },
      },
    ];
  };

  toggleAddBusinessRuleModal = () => {
    this.setState({
      addBusinessRuleModal: !this.state.addBusinessRuleModal,
    });
  };

  filterSubCategory = (c) => {
    let list = this.state.entities.filter(
      (ele, ind) =>
        ind ===
        this.state.entities.findIndex(
          (elem) =>
            elem.ruleSubCategory === ele.ruleSubCategory &&
            elem.ruleCategory === c
        )
    );
    //const list = this.state.entities.filter((r) => r.ruleCategory === c);
    return list.map((r) => r.ruleSubCategory);
  };

  render() {
    return (
      <div className="KPImidarea">
        <div className="KPImain">
          <PageTitle
            title={"Business Rules"}
            marginLeft="1.5rem"
            extra={
              <>
                <Button
                  className="float-right mt-4 mr-2 blue-bg"
                  type="primary"
                  onClick={() => this.props.toggleBusinessRule()}
                >
                  View Data Quality Manager
                </Button>
                <Button
                  className="float-right mt-4 mr-2 blue-bg"
                  type="primary"
                  onClick={() =>
                    this.setState((state) => ({
                      addBusinessRuleModal: !state.addBusinessRuleModal,
                      ruleDetails: null,
                    }))
                  }
                >
                  <i className="fa fa-plus"></i>&nbsp;Add New Rule
                </Button>
                <Button
                  className="float-right mt-4 mr-2"
                  onClick={() => {
                    this.getRules();
                  }}
                  title="Refresh"
                >
                  <i className="fa fa-refresh"></i>
                </Button>
              </>
            }
          />
          <Content style={{ padding: "4px 24px", minHeight: 280 }}>
            {this.state.apiResponse ? (
              <>
                <MuiTable
                  columns={this.tableHeader()}
                  rows={this.state.entities}
                />
              </>
            ) : (
              <Loader style={{ marginLeft: "40%" }} />
            )}
            <AddBusinessRule
              addBusinessRuleModal={this.state.addBusinessRuleModal}
              toggleAddBusinessRuleModal={this.toggleAddBusinessRuleModal}
              ruleDetails={this.state.ruleDetails}
              updateRuleDetails={() => this.getRules()}
              ruleCategory={this.state.entities.map((r) => r.ruleCategory)}
              ruleSubCategory={(c) => this.filterSubCategory(c)}
              token={this.props.token}
            />
          </Content>
        </div>
      </div>
    );
  }
}
export default BusinessRule;
