import React, { Component } from "react";
import { AppContext } from "../../../../AppProvider";
import Loader from "../../../../utilities/Loader";
import AddAlert from './AddAlert';
import {
    MDBIcon,
    MDBCard,
    MDBContainer
} from "mdbreact";
import { Layout } from "antd";
const { Sider } = Layout;

class FidelitySidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    getKeywordStyle = () => {
        return this.state.active ? { height: '85px', overflowY: 'scroll' } : { height: '56px', overflowY: 'hidden' };
    }
    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }
    conversionJson = () => {
        let str = this.props.treeInfo.keywords
        try{
            return JSON.parse(str.replace(/'/g, '"'))
        } catch(error){
            console.log("Json Error", error)
        }
    }
    render() {
        const { collapsed, drawerCollapsed, treeInfo } = this.props
        return (
            <AppContext.Consumer>
                {({ theme }) => {
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
                                collapsed={collapsed}
                                width={300}
                                style={{
                                    background: theme.color3,
                                    marginBottom: "1.1rem",
                                }}
                                collapsedWidth={50}
                                trigger={null}
                            >
                                <div
                                    onClick={() => drawerCollapsed()}
                                    className="ant-layout-sider-zero-width-trigger 
                                         ant-layout-sider-zero-width-trigger-left 
                                         d-flex justify-content-between align-items-center"
                                    style={{
                                        background: "transparent",
                                        color: "#ffffff",
                                        top: ".01rem",
                                        left: collapsed ? "-15px" : "-15px",
                                        width: collapsed ? "20px" : "250px",
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
                                        visibility: !collapsed ? "visible" : "hidden",
                                    }}>
                                    {!this.props.isLoading && this.props.treeInfo.caseName !== "" ?
                                        <>
                                            <div className="mb-3">
                                                <div className="text-right">
                                                    <button
                                                        onClick={
                                                            () => {
                                                                this.props.currentSelected("newsAlert");
                                                                drawerCollapsed();

                                                            }
                                                        }
                                                        className="ant-btn blue-bg my-2">
                                                        Explore
                                                </button>
                                                </div>
                                                <div className="border p-2 bg-white">
                                                    <MDBCard className="p-2">
                                                        {Object.keys(treeInfo).length > 0 ?
                                                            <>
                                                                <div>
                                                                    <a href={treeInfo.url ? treeInfo.url: ""} target="_blank" style={{ fontSize: "16px", color: "#205684", fontWeight: "500" }}>
                                                                        {treeInfo.headline}
                                                                    </a>
                                                                    <i className="d-block" style={{ fontSize: "10px" }}>{treeInfo.source}{treeInfo.source && treeInfo.publicationDate ? "," : ""} {treeInfo.publicationDate}</i>
                                                                </div>
                                                                {
                                                                    treeInfo.keywords &&
                                                                    <div>
                                                                        <ul className="d-block mt-2 p-0 mb-1" style={this.getKeywordStyle()}>
                                                                            {this.conversionJson().map((item, i) => {
                                                                                return (
                                                                                    <li key={i} className="keywords-tags mb-1">{item}</li>
                                                                                )
                                                                            }
                                                                            )}
                                                                        </ul>
                                                                        <button onClick={this.toggle} className="keywords-tags tags-btn">{this.state.active ? 'View Less' : 'View More'}</button>
                                                                    </div>
                                                                }
                                                            </>
                                                            : <Loader style={{ marginLeft: "40%" }} />
                                                        }
                                                    </MDBCard>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="border p-2 bg-white">
                                                    <MDBCard className="p-2 sidebar-form" style={{ fontSize: "12px" }}>
                                                        {this.props.pageSelected!=='newsAlert' && 
                                                        <>
                                                            {Object.keys(treeInfo).length > 0 ?
                                                                <AddAlert
                                                                    username={this.props.username}
                                                                    treeInfo={treeInfo}
                                                                    token={this.props.token}
                                                                    getNewsAlertData={this.props.getNewsAlertData}
                                                                    websocket={this.props.websocket}
                                                                    pageSelected={this.props.pageSelected}
                                                                    setWebsocket={this.props.setWebsocket}
                                                                    getRowDtl={this.props.getRowDtl}
                                                                    updateRow={this.props.updateRow}
                                                                /> : <Loader style={{ marginLeft: "40%" }} />
                                                            }
                                                        </>}
                                                    </MDBCard>
                                                </div>
                                            </div>
                                        </> : <Loader style={{ marginLeft: "40%", marginTop: "20%" }} />
                                    }
                                </MDBContainer>
                            </Sider>
                        </Layout>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

export default FidelitySidebar;