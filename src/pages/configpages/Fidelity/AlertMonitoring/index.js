import React, { Component } from "react";
import { Layout, Tag, message } from "antd";
import { STATICRISK360, WEBSOCKETURL } from "../../../../config";
import FidelitySidebar from "./FidelitySidebar";
import NewsAlert from "./NewsAlert";
import FilterTableWithTabs from "./FilterTableWithTabs";
import "./index.css";
import { getAlertData, getNewsAlertData, getUpdateAlertData, getUpdateCaseOwner } from "./api";

const { Content } = Layout;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
class Fidelity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            alertData: [],
            caseOwnerList: [],
            currentSelected: 'alertData',
            nodeData: {},
            selectedAlertId: [],
            isLoading: false,
            isEditCaseOwner: false,
            caseOwner: "",
            editCaseOwnerClick: false,
            isLoadingCaseOwner: false,
            selectedPage: 1,
            selectedRowPerPage: 10,
            recommendFilters: {}
        }
    }
    componentDidMount() {
        this.getAlertData().then(() => {
            let AlertID = getUrlParameter("alertID");
            if (AlertID) {
                this.getNewsAlertData(AlertID, true);
            }
        });

    }

    getAlertData = async (successMessage) => {
        const res = await getAlertData()
        this.setState({
            alertData: res
        }, () => {
            this.updateCaseOwnerList(successMessage)
        });
    };

    getRowDtl = (alertID) => {
        let dtl = {};
        const { alertData } = this.state
        alertData.forEach(data => {
            if (data.alertID === alertID) {
                dtl = {
                    caseOwner: data.caseOwner,
                    alertID: alertID.replace("/", "_"),
                    caseName: data.caseName,
                    headline: data.headline,
                    source: data.source,
                    publicationDate: data.publicationDate,
                    keywords: data.keywords || '',
                    riskStatus: data.riskStatus,
                    comment: data.comment ? data.comment : "",
                    toBeReviewed: data.toBeReviewed ? data.toBeReviewed.split(',') : undefined,
                    riskLevel: data.riskLevel,
                    riskType: data.riskType,
                    actionRequired: data.actionRequired,
                    details: data.details,
                    content: data.content,
                    managerReview: data.managerReview ? data.managerReview.split(',') : undefined,
                    emailTo: data.emailTo,
                    url: data.url
                }
            }
        });

        return dtl;
    }

    updateRow = (data, newdata) => {
        let dtl = {};
        const { alertData } = this.state
        alertData.forEach((item, i) => {
            if (item.alertID === data.replace("_", "/") || item.caseName === data) {
                for (let k in newdata) {
                    alertData[i][k] = newdata[k];
                }

                this.setState([...alertData]);
            }
        });
        return dtl;
    }

    getNewsAlertData = async (alertID, notificationOpen) => {
        // var alertID = alertID.replace("/", "_")
        // this.setState({ isLoading: true, collapsed: false });
        // const { alertData } = this.state
        // console.log("test alertData", alertData)
        // const response = await getNewsAlertData(alertID);
        // var res = response[0]


        let dtl = await this.getRowDtl(alertID);
        this.setState({
            // isLoading: true,
            nodeData: dtl,
            isLoading: false,
            currentSelected: notificationOpen === true ? 'newsAlert' : 'alertData',
            collapsed: notificationOpen === true ? true : false,
        });
    }
    tableHeader = () => {
        return [
            {
                title: 'Alert ID',
                dataIndex: 'alertID',
                key: 'alertID',
                sorter: (a, b) => a.alertID.localeCompare(b.alertID),
                width: 120,
                ellipsis: true,
                render: (text, record) => <span style={{ cursor: 'pointer' }} onClick={() => this.drawerOpen(record.alertID, record.caseOwner)} className="text-uppercase">{text.slice(text.length - 9)}</span>,
            },
            {
                title: 'Case Name',
                dataIndex: 'caseName',
                key: 'caseName',
                sorter: (a, b) => a.caseName.localeCompare(b.caseName),
                width: 180,
                applySideBarFilter: true,
                className: "casename-td",
                render: (text, record) => <span style={{ cursor: 'pointer' }} onClick={() => this.drawerOpen(record.alertID, record.caseOwner)}>{text}</span>,
            },
            {
                title: 'Case Type',
                dataIndex: 'caseTypeDesc',
                key: 'caseTypeDesc',
                sorter: (a, b) => a.caseTypeDesc.localeCompare(b.caseTypeDesc),
                width: 120,
                applySideBarFilter: true,
                render: (text, record) => (
                    record.caseTypeDesc &&
                    <Tag onClick={() => this.drawerOpen(record.alertID, record.caseOwner)}
                        className="tag-blue"
                        style={{ borderRadius: '12px', cursor: 'pointer' }}>
                        {text}
                    </Tag>
                ),
            },
            {
                title: 'Headline',
                dataIndex: 'headline',
                key: 'headline',
                sorter: (a, b) => a.headline.localeCompare(b.headline),
                width: 250,
                className: "headline-td",
                render: (text, record) => <span className="headline-td-span" onClick={() => this.drawerOpen(record.alertID, record.caseOwner)}
                >{text}</span>
            },
            {
                title: 'Risk Status',
                dataIndex: 'riskStatus',
                key: 'riskStatus',
                width: 120,
                sorter: (a, b) => a.riskStatus.localeCompare(b.riskStatus),
                applySideBarFilter: true,
                render: (text, record) => (
                    record.riskStatus &&
                    <Tag onClick={() =>
                        this.drawerOpen(record.alertID, record.caseOwner)}
                        className={(record.riskStatus === 'Cleared') ? "tag-green" : "tag-red"}
                        style={{ borderRadius: '12px', cursor: 'pointer' }}>
                        {text}
                    </Tag>
                ),
            },
            {
                title: 'Model Tag',
                dataIndex: 'modelTag',
                key: 'modelTag',
                width: 120,
                sorter: (a, b) => a.modelTag.localeCompare(b.modelTag),
                render: (text, record) => (
                    record.modelTag &&
                    <Tag onClick={() =>
                        this.drawerOpen(record.alertID, record.caseOwner)}
                        className={(record.modelTag === 'Cleared') ? "tag-green" : "tag-red"}
                        style={{ borderRadius: '12px', cursor: 'pointer' }}>
                        {text}
                    </Tag>
                ),
            },
            {
                title: 'Reviewed',
                dataIndex: 'reviewed',
                key: 'reviewed',
                width: 120,
                sorter: (a, b) => a.reviewed.toString().localeCompare(b.reviewed.toString()),
                render: (text, record) => {
                    text = text.toString().toLowerCase()
                    return (
                        record.reviewed &&
                        <Tag onClick={() =>
                            this.drawerOpen(record.alertID, record.caseOwner)}
                            className={text === "true" || text === "yes" ? "tag-green" : "tag-red"}
                            //className={record.reviewed === 'Yes' ? "tag-green" : "tag-red"}
                            style={{ borderRadius: '12px', cursor: 'pointer' }}>
                            {text === "true" || text === "yes" ? "Yes" : "No"}
                        </Tag>
                    )
                },
            },
            {
                title: 'Case Owner',
                dataIndex: 'caseOwner',
                key: 'caseOwner',
                sorter: (a, b) => a.caseOwner.localeCompare(b.caseOwner),
                width: 200,
                ellipsis: true,
                applySideBarFilter: true,
                render: (text, record, index) => {
                    return (this.state.isEditCaseOwner === index ?
                        <div className="d-flex align-items-center">
                            <form>
                                {STATICRISK360 ?    // Set Static Risk360 data
                                    <select style={{ fontSize: '12px', width: '108px' }} name="caseOwner" value={this.state.caseOwner} onChange={(e) => this.setState({ caseOwner: e.target.value })} className="mr-1 form-control custom-select-sm" >
                                        <option value="Sanjit Grover">Sanjit Grover</option>
                                        <option value="Gargi Verma">Gargi Verma</option>
                                        <option value="Amit Maan">Amit Maan</option>
                                    </select> :
                                    <select style={{ fontSize: '12px', width: '108px' }} name="caseOwner" value={this.state.caseOwner} onChange={(e) => this.setState({ caseOwner: e.target.value })} className="mr-1 form-control custom-select-sm" >
                                        {
                                            this.state.caseOwnerList.map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>
                                            })}
                                    </select>
                                }
                            </form>
                            {this.state.isLoadingCaseOwner ? <i className="fa fa-spin fa-circle-notch mr10"></i> : <i onClick={() => this.updateCaseOwner(record.caseName)} style={{ fontSize: '20px' }} className="fa fa-check mx-2" aria-hidden="true"></i>}
                            <i onClick={this.handleEditCaseOwnerCancel} className="fa fa-times" aria-hidden="true" style={{ fontSize: '20px' }}></i>
                        </div> :
                        <span>{text} <i onClick={() => this.showEditCaseOwner(index)} className="fas fa-pencil-alt ml-2"></i></span>
                    )
                },
            },
            {
                title: 'Date Added',
                dataIndex: 'dateAdded',
                key: 'dateAdded',
                sorter: (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
                width: 150,
                ellipsis: true,
                render: (text, record) => record.dateAdded && record.dateAdded.length > 0 && <span>{text}</span>
            },
            {
                title: 'Publication Date',
                dataIndex: 'publicationDate',
                key: 'publicationDate',
                width: 170,
                sorter: (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate),
                ellipsis: true,
                render: (text, record) => record.publicationDate && record.publicationDate.length > 0 && <span>{text}</span>
            },
            {
                title: 'Date Updated',
                dataIndex: 'dateUpdated',
                key: 'dateUpdated',
                width: 150,
                sorter: (a, b) => new Date(a.dateUpdated) - new Date(b.dateUpdated),
                ellipsis: true,
                render: (text, record) => record.dateUpdated && record.dateUpdated.length > 0 && <span>{text}</span>
            },
            {
                title: 'Duplicate',
                dataIndex: 'duplicate',
                key: 'duplicate',
                width: 120,
                sorter: (a, b) => a.duplicate.localeCompare(b.duplicate),
                render: (text, record) => (
                    record.duplicate &&
                    <Tag className={record.duplicate === 'Yes' ? "tag-green" : "tag-red"} style={{ borderRadius: '12px' }}>
                        {text}
                    </Tag>
                ),
            },
            {
                title: 'Relevance Score',
                dataIndex: 'relevanceScore',
                key: 'relevanceScore',
                sorter: (a, b) => a.relevanceScore - b.relevanceScore,
                width: 170,
                render: (text, record) => (
                    record.relevanceScore &&
                    <Tag
                        className="tag-blue"
                        style={{ borderRadius: '12px' }}>
                        {text}
                    </Tag>
                )
            },
            {
                title: 'Requestor',
                dataIndex: 'requestor',
                key: 'requestor',
                sorter: (a, b) => a.requestor?.localeCompare(b.requestor),
                width: 170
            }
        ];
    };
    drawerOpen = (alertID, caseOwner) => {
        this.getNewsAlertData(alertID, false, caseOwner)
    }
    drawerCollapsed = () => {
        this.setState({
            collapsed: true,

        });
    };
    handleCurrentSelected = (str) => {
        this.setState({ currentSelected: str });
    };
    showEditCaseOwner = (index) => {
        this.setState({
            isEditCaseOwner: index,
        })
    };
    updateCaseOwnerList = (successMessage) => {
        const { alertData } = this.state;
        let caseOwnerList = [];
        alertData.map((item) => {
            if (!caseOwnerList.includes(item.caseOwner)) {
                caseOwnerList.push(item.caseOwner)
            }
        })
        this.setState({
            caseOwnerList
        })
        if (successMessage) {
            message.success(successMessage)
            this.setState({
                isEditCaseOwner: false,
                isLoadingCaseOwner: false
            })
        }
    }
    updateCaseOwner = async (caseName) => {
        this.setState({ isLoadingCaseOwner: true })
        const data = {
            caseName: caseName,
            caseOwner: this.state.caseOwner,
            updationBy: this.props.authUser
        }
        const res = await getUpdateCaseOwner(data);
        if (res) {
            let newdata = { caseOwner: data.caseOwner };
            this.updateRow(caseName, newdata);
            this.setState({ isLoadingCaseOwner: false, isEditCaseOwner: false })
            message.success('Case owner is successfully updated.');
        }
    };
    handleEditCaseOwnerCancel = () => {
        this.setState({
            isEditCaseOwner: false
        })
    };

    handleFilters = (filters) => {
        this.setState((prevState) => ({
            recommendFilters: { ...prevState.recommendFilters, ...filters },
        }));
    }
    render() {
        return (
            <div className="KPImidarea">
                <div className="KPImain pt-3">
                    {this.state.currentSelected === 'newsAlert' ?
                        <Content style={{ padding: "4px 24px", minHeight: 280 }}>
                            <NewsAlert
                                drawerCollapsed={this.drawerCollapsed}
                                currentSelected={(e) => this.handleCurrentSelected(e)}
                                treeInfo={this.state.nodeData}
                                token={this.props.token}
                                username={this.props.authUser}
                                websocket={this.props.websocket}
                                setWebsocket={this.props.setWebsocket}
                                getRowDtl={this.getRowDtl}
                                pageSelected={this.state.currentSelected}
                                updateRow={this.updateRow}
                            />
                        </Content> :
                        <Content style={{ padding: "4px 24px", minHeight: "280px", position: "relative" }}>
                            <FilterTableWithTabs
                                appliedFilters={this.state.recommendFilters}
                                setAppliedFilters={this.handleFilters}
                                columns={this.tableHeader()}
                                rows={this.state.alertData}
                                isShowHide={true}
                                username={this.props.authUser}
                                treeInfo={this.state.nodeData}
                                getAlertData={this.getAlertData}
                                selectedPage={this.state.selectedPage}
                                selectedRowPerPage={this.state.selectedRowPerPage}
                                setSelectedPage={(page) => this.setState({ selectedPage: page })}
                                setSelectedRowPerPage={(perPage) => this.setState({ selectedRowPerPage: perPage })}
                            />
                        </Content>
                    }
                </div>
                <div className="KPIside">
                    <FidelitySidebar
                        drawerCollapsed={this.drawerCollapsed}
                        collapsed={this.state.collapsed}
                        currentSelected={(e) => this.handleCurrentSelected(e)}
                        pageSelected={this.state.currentSelected}
                        treeInfo={this.state.nodeData}
                        token={this.props.token}
                        isLoading={this.state.isLoading}
                        username={this.props.authUser}
                        getNewsAlertData={this.getNewsAlertData}
                        websocket={this.props.websocket}
                        setWebsocket={this.props.setWebsocket}
                        getRowDtl={this.getRowDtl}
                        updateRow={this.updateRow}
                    />
                </div>
            </div>
        );
    }
}
export default Fidelity;