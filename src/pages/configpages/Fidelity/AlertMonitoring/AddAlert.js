import React, { Fragment, Component } from 'react';
import { STATICRISK360, globalData } from "../../../../config";
import { message, Select, Popconfirm } from 'antd';
import { getEmailData, getNotificationsData, getSaveNewsAlertData } from './api';
import util from '../../../../utilities/util';
const { Option } = Select;

class AddAlert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            riskStatus: props.treeInfo.riskStatus || "",
            riskLevel: props.treeInfo.riskLevel === "" ? -1 : props.treeInfo.riskLevel || -1,
            riskType: props.treeInfo.riskType || "",
            actionRequired: props.treeInfo.actionRequired === "" ? -1 : props.treeInfo.actionRequired || -1,
            toBeReviewed: props.treeInfo.toBeReviewed || undefined,
            comment: props.treeInfo.comment || "",
            treeInfo: props.treeInfo,
            // isSubmitEnable: false,
            managerReview: props.treeInfo.managerReview || undefined,
            visible: false,
            isLoadingForm: false,
            isLoadingEmail: false,
            emailTo: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // return;
        if (nextProps.treeInfo !== prevState.treeInfo) {
            return {
                riskStatus: nextProps.treeInfo.riskStatus,
                riskLevel: nextProps.treeInfo.riskLevel,
                riskType: nextProps.treeInfo.riskType,
                actionRequired: nextProps.treeInfo.actionRequired,
                toBeReviewed: nextProps.treeInfo.toBeReviewed,
                comment: nextProps.treeInfo.comment,
                treeInfo: nextProps.treeInfo,
                managerReview: nextProps.treeInfo.managerReview,
                // isSubmitEnable: false,
                // emailTo: nextProps.treeInfo.emailTo
            }
        }
        return null
    }


    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            // isSubmitEnable: true
        });
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value,
            // isSubmitEnable: true
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.riskStatus === "") {
            message.error('Please fill the required field!');
        } else {
            this.handleNewsAlertData();
            this.handleNotificationData();
        }
        this.setState({ isLoadingForm: true });

    }
    handleNewsAlertData = async () => {
        const { riskStatus, riskLevel, riskType, actionRequired, toBeReviewed, comment, managerReview, emailTo } = this.state
        const { treeInfo } = this.props
        // var isReviewed = false
        // if (riskStatus != treeInfo.riskStatus || riskLevel != treeInfo.riskLevel || riskType != treeInfo.riskType
        //     || actionRequired != treeInfo.actionRequired || toBeReviewed != treeInfo.toBeReviewed || comment != treeInfo.comment ||
        //     managerReview != treeInfo.managerReview || emailTo != "") {
        //     isReviewed = true
        // }
        const dataWithoutEmailTo = {
            username: this.props.username,
            alertID: treeInfo.alertID,
            keywords: treeInfo.keywords,
            riskStatus,
            riskLevel,
            riskType,
            toBeReviewed: toBeReviewed ? toBeReviewed.toString() : "",
            actionRequired,
            reviewed: true,
            comment,
            managerReview: managerReview ? managerReview.toString() : "",
        }
        const dataWithEmailTo = {
            username: this.props.username,
            alertID: treeInfo.alertID,
            keywords: treeInfo.keywords,
            riskStatus,
            riskLevel,
            riskType,
            toBeReviewed: toBeReviewed ? toBeReviewed.toString() : "",
            actionRequired,
            reviewed: true,
            comment,
            managerReview: managerReview ? managerReview.toString() : "",
            emailTo: emailTo.split(",")
        }
        this.setState({ isLoadingForm: true });
        const res = await getSaveNewsAlertData(emailTo.length > 0 ? dataWithEmailTo : dataWithoutEmailTo)
        if (res) {
            this.props.updateRow(treeInfo.alertID, emailTo.length > 0 ? dataWithEmailTo : dataWithoutEmailTo);
            this.setState({
                isLoadingForm: false
            });
            if (this.props.getNewsAlertData) {
                this.props.getNewsAlertData(treeInfo.alertID)
            }
            message.success('Data is Successfully Saved.');

        }
    }
    handleNotificationData = async () => {
        let alertId = this.props.treeInfo.alertID.slice(this.props.treeInfo.alertID.length - 9).toUpperCase();

        let caseOwnerMessage = this.props.username + " has made changes to AlertID: " + alertId
        this.handlePromptMessage(caseOwnerMessage, this.props.treeInfo.caseOwner)
        if (this.state.managerReview && this.state.managerReview.length > 0) {
            let managerReviewMessage = this.props.username + " has asked you to review AlertID: " + alertId
            this.state.managerReview.map(item => this.handlePromptMessage(managerReviewMessage, item))
        }
        // if (managerReviewMessage && managerReviewMessage.length > 0) {
        //     this.handlePromptMessage(managerReviewMessage, this.state.managerReview)
        // }

    }
    handlePromptMessage = async (promptMessage, taggedUser) => {
        var alertID = this.props.treeInfo.alertID.replace('_', '/')
        const data = {
            notificationType: "push",
            taggedBy: this.props.username,
            taggedUser: taggedUser,
            promptMessage: promptMessage,
            articleRef: `[{\"type\": \"alertID\", \"id\": \"${alertID}\"}]`
        }
        /*if(!util.websocketConnection(globalData.websocket)){
            console.log("test connected addalert")
            globalData.websocket.send('add_'+JSON.stringify(data))
        } else {*/
        this.props.setWebsocket('add_' + JSON.stringify(data))

        //}
        // const res = await getNotificationsData(data)
    }
    sendEmail = async (to) => {
        let alertID = this.props.treeInfo.alertID.slice(this.props.treeInfo.alertID.length - 9).toUpperCase()
        // get first and last name from email
        var match = to.split('@')[0].split('.')
        let fName = match[0].charAt(0).toUpperCase() + match[0].slice(1)
        let lName = match[match.length - 1].charAt(0).toUpperCase() + match[match.length - 1].slice(1)
        let fullName = fName + " " + lName

        if (!to) {
            return;
        }
        let subject = this.props.username + " has asked you to review Alert ID: " + alertID;
        let bodyMessage = "Hello " + fullName + "," + "<br/><br/>"
            + this.props.username + " has shared Alert ID: " + alertID + " for " + this.props.treeInfo.caseName
            + " with you for review. Please find the attached the Alert Details and present Risk Status with the email. <br/><br/> Regards, <br/> Risk360 <br/><br/> Note: Please do not respond to this email. This is an automatically generated email. Reach out to the Risk Team at abcd@abcd.com for any queries. ";
        let pdfbase64 = await this.props.pdfBase64();
        let data = {
            to: [to],
            subject,
            message: bodyMessage,
            attachments: [{ filename: alertID + ".pdf", base64: pdfbase64 }],
        };

        this.setState({ isLoadingEmail: true });
        const res = await getEmailData(data)
        if (res) {
            this.setState({
                isLoadingEmail: false
            });
            message.success('Email has been successfully sent to ' + fullName + '!')
        }
    }
    handleSaveDataWithEmail = () => {
        const { riskStatus, toBeReviewed, emailTo } = this.state
        if (riskStatus === "") {
            message.error('Please fill the required field!');
            return
        }
        // if (toBeReviewed === undefined || toBeReviewed.length === 0) {
        if (emailTo.length === 0 || !this.validateEmail(emailTo)) {
            message.error("Please select a valid user under 'Email To'!");
            return
        }
        let to = emailTo;
        let emailSplit = to.split(',')
        emailSplit.map(item => this.sendEmail(item))  //call for multiple users from to be reviewed 

        this.handleNewsAlertData();
        this.handleNotificationData();
        this.setState({ isLoadingEmail: true, isLoadingForm: false });

    }
    validateEmail = (string) => {
        var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var result = string.replace(/\s/g, "").split(/,|;/);
        for (var i = 0; i < result.length; i++) {
            if (!regex.test(result[i])) {
                return false;
            }
        }
        return true;
    }
    showPopconfirm = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    };

    updatetreeinfo = () => {
        let dtl = this.props.getRowDtl(this.props.treeInfo.alertID.replace("_", "/"));
        //this.setState({riskStatus:dtl.riskStatus});
        //return;
        //setTimeout(() => {
        this.setState({
            treeInfo: { ...dtl },
            riskStatus: dtl.riskStatus,
            riskLevel: dtl.riskLevel,
            riskType: dtl.riskType,
            actionRequired: dtl.actionRequired,
            toBeReviewed: dtl.toBeReviewed,
            comment: dtl.comment,
            managerReview: dtl.managerReview,
        });
        //}, 500);
    }

    componentDidMount() {
        globalData.websocket = new WebSocket(globalData.websocketUrl);
        // this.updatetreeinfo();
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.pageSelected != this.props.pageSelected){
    //     }
    // }


    render() {
        const { isSubmitEnable } = this.state
        const { showEmail } = this.props
        const emailPopText = <div>Are you sure you want to send an email
            to the users under "Email To"? </div>
        return (
            <Fragment>
                <h6 onClick={this.updatetreeinfo} className="mb-3 font-weight-bold text-uppercase" style={{ fontSize: "14px", color: "#205684" }}>
                    Risk Status Settings
                </h6>

                <form onSubmit={this.handleSubmit}>
                    <div className="row risk-setting-form">
                        <div className="col">
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Risk Status:<span style={{ color: "red" }}>*</span></label>
                                <div className="col-md-7">
                                    <select name="riskStatus" value={this.state.riskStatus} onChange={this.handleInputChange} className="form-control custom-select-sm" required="required" >
                                        <option value="">Choose Risk Status</option>
                                        <option value="Under Review">Confirmed (Under Review)</option>
                                        <option value="Risk Mitigated">Confirmed (Risk Mitigated)</option>
                                        <option value="Cleared">Cleared</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Risk Level:</label>
                                <div className="col-md-7">
                                    <select name="riskLevel" value={this.state.riskLevel} onChange={this.handleInputChange} className="form-control custom-select-sm">
                                        <option value="-1">Choose Risk Level</option>
                                        <option value="1">Very Low</option>
                                        <option value="2">Low</option>
                                        <option value="3">Medium Low</option>
                                        <option value="4">Medium</option>
                                        <option value="5">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Risk Type:</label>
                                <div className="col-md-7">
                                    <select name="riskType" value={this.state.riskType} onChange={this.handleInputChange} className="form-control custom-select-sm">
                                        <option value="">Choose Risk Type</option>
                                        <option value="Business Continuity">Business Continuity</option>
                                        <option value="Reputational">Reputational</option>
                                        <option value="Legal - Civil">Legal - Civil</option>
                                        <option value="Legal - Criminal">Legal - Criminal</option>
                                        <option value="Financial">Financial</option>
                                        <option value="GACP">GACP</option>
                                        <option value="Regulatory">Regulatory</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">To be Reviewed:</label>
                                <div className="col-md-7">
                                    <Select
                                        mode="tags"
                                        tokenSeparators={[',']}
                                        // mode="multiple"
                                        allowClear
                                        name="toBeReviewed"
                                        value={this.state.toBeReviewed || undefined}
                                        placeholder="Choose To Be Reviewed"
                                        style={{ width: '100%' }}
                                        onChange={(value) => this.handleChange("toBeReviewed", value)}
                                    >
                                        <Option value="VM">VM</Option>
                                        <Option value="BU">BU</Option>
                                        <Option value="VROCOE">VROCOE</Option>
                                        <Option value="OFAC">OFAC</Option>
                                        <Option value="GACP">GACP</Option>
                                    </Select>

                                </div>
                            </div>
                            {showEmail &&
                                <div className="form-group row">
                                    <label className="col-md-5 col-form-label">Email To:</label>
                                    <div className="col-md-7">
                                        <input type="email" name="emailTo" placeholder="Enter Email" value={this.state.emailTo} onChange={this.handleInputChange} className="form-control" multiple />
                                    </div>
                                </div>}
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Action Required:</label>
                                <div className="col-md-7">
                                    <select name="actionRequired" value={this.state.actionRequired} onChange={this.handleInputChange} className="form-control custom-select-sm">
                                        <option value="-1">Choose Action Required</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Manager Review:</label>
                                <div className="col-md-7">
                                    {STATICRISK360 ?      // Set Static Risk360 data
                                        <Select
                                            mode="multiple"
                                            name="managerReview"
                                            allowClear
                                            value={this.state.managerReview || undefined}
                                            placeholder="Choose Manager"
                                            style={{ width: '100%' }}
                                            onChange={(value) => this.handleChange("managerReview", value)}
                                        >
                                            <Option value="Sanjit Grover">Sanjit Grover</Option>
                                            <Option value="Gargi Verma">Gargi Verma</Option>
                                        </Select> :
                                        <Select
                                            mode="multiple"
                                            name="managerReview"
                                            allowClear
                                            value={this.state.managerReview || undefined}
                                            placeholder="Choose Manager"
                                            style={{ width: '100%' }}
                                            onChange={(value) => this.handleChange("managerReview", value)}
                                        >
                                            <Option value="Gwen Macgregor">Gwen Macgregor</Option>
                                            <Option value="Russell Clophus">Russell Clophus</Option>
                                        </Select>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Enter Comment:</label>
                                <div className="col-md-7">
                                    <textarea name="comment" value={this.state.comment} onChange={this.handleInputChange} className="form-control" placeholder="Enter Comment" ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        {
                            showEmail &&
                            <Popconfirm placement="topRight" title={emailPopText} onConfirm={this.handleSaveDataWithEmail} onCancel={this.handleCancel}
                            >
                                <button type="submit" className="ant-btn blue-bg mr-2">
                                    {this.state.isLoadingEmail ? "Loading..." : "Send Email"}
                                </button>

                            </Popconfirm>
                        }
                        <button type="submit" className="ant-btn blue-bg">
                            {this.state.isLoadingForm ? "Saving..." : "Submit"}
                        </button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default AddAlert;