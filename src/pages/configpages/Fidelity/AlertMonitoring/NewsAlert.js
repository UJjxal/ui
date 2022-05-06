import React, { Fragment, useState, useRef } from 'react';
import {
    MDBCard,
    MDBContainer
} from "mdbreact";
import { PDFExport } from "@progress/kendo-react-pdf";
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { Modal, Button } from "antd";
import AddAlert from './AddAlert';

const NewsAlert = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const myRef = useRef(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const downloadPdf = async () => {
        myRef.current.save();
    }
    const conversionJson = () => {
        let str = props.treeInfo.keywords
        try{
            return JSON.parse(str.replace(/'/g, '"'))
        } catch(error){
            console.log("Json Error", error)
        }
    }

    const pdfBase64 = () => new Promise((resolve, reject) => {
        let gridElement = document.getElementById('pdfContentBx');
        drawDOM(gridElement, { paperSize: "A4", margin: "2cm", scale: 0.7, keepTogether: ".news-alert-block, .risk-setting-block", forcePageBreak: ".detail:not(:nth-child(2))" }).then((group) => {
            return exportPDF(group);
        }).then((dataUri) => {
            let base64 = dataUri.split(';base64,')[1];
            //console.log(base64);
            resolve(base64);
        });
    })
    let wordArray = props.treeInfo?.content?.split(" ")
    wordArray = wordArray || []
    const n = 350 //tweak this to add more items per line

    const result = new Array(Math.ceil(wordArray.length / n))
        .fill()
        .map(_ => wordArray.splice(0, n))

    const detailsForPageBreak = result.map((item, i) => {
        var sb = item.join(' ');
        return (
            <div key={i} className="mb-0 detail">
                {sb.toString().split('\\n').map((data, index) => {
                    return (
                        <p key={index} className="mb-2">
                            {data}
                        </p>
                    )
                })}
            </div>
        )
    })
    return (
        <Fragment>
            <MDBContainer>
                <div className="d-flex justify-content-between my-3">
                    <div className="d-flex align-items-center">
                        <h6 style={{ fontSize: '14px' }} className="font-weight-bold mr-3 mb-0 text-uppercase">Alert ID: <span className="font-weight-normal text-uppercase">{props.treeInfo.alertID && props.treeInfo.alertID.slice(props.treeInfo.alertID.length - 9)}</span></h6>
                        <h6 style={{ fontSize: '14px' }} className="font-weight-bold mb-0 text-uppercase">Case Name: <span className="font-weight-normal">{props.treeInfo.caseName}</span></h6>
                    </div>
                    <div className="d-flex">
                        <Button
                            className="blue-bg mr-2"
                            type="primary"
                            onClick={downloadPdf}>
                            Export PDF
                        </Button>
                        <Button
                            className="blue-bg"
                            type="primary"
                            onClick={
                                () => {
                                    props.currentSelected("alertData");
                                    props.drawerCollapsed();
                                }
                            }
                        >
                            Return To Case Inventory
                        </Button>
                    </div>
                </div>

                <div id="pdfContentBx">
                    <PDFExport
                        forcePageBreak=".detail:not(:nth-child(2))"
                        keepTogether=".news-alert-block, .risk-setting-block"
                        paperSize="A4"
                        scale={0.7}
                        margin="2cm"
                        ref={myRef}
                        fileName={props.treeInfo.alertID.slice(props.treeInfo.alertID.length - 9)}
                    >
                        <div className="d-flex my-3 alerts-title-wrapper">
                            <h6 style={{ fontSize: '14px' }} className="font-weight-bold mr-3 mb-0 text-uppercase">Alert ID: <span className="font-weight-normal text-uppercase">{props.treeInfo.alertID.slice(props.treeInfo.alertID.length - 9)}</span></h6>
                            <h6 style={{ fontSize: '14px' }} className="font-weight-bold mb-0 text-uppercase">Case Name: <span className="font-weight-normal">{props.treeInfo.caseName}</span></h6>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <MDBCard className="p-3 mb-3 border news-alert-block" style={{ height: "100%" }}>
                                    <h6 className="mb-3 font-weight-bold text-uppercase" style={{ fontSize: "14px", color: "#205684" }}>
                                        News Alert
                                    </h6>
                                    <div className="mb-3">
                                        <a href={props.treeInfo.url ? props.treeInfo.url : ""} target="_blank" className="font-weight-bold article-headline" style={{ fontSize: "18px", color: "#205684" }}>
                                            {props.treeInfo.headline}
                                        </a>
                                        <i className="d-block article-source" style={{ fontSize: "10px" }}>{props.treeInfo.source}{props.treeInfo.source && props.treeInfo.publicationDate ? "," : ""} {props.treeInfo.publicationDate}</i>
                                    </div>
                                    <div className="mb-2 article-keywords" style={{ fontSize: "14px" }}>
                                        {props.treeInfo.keywords &&
                                            <>
                                                <span className="font-weight-bold">Keywords: </span>
                                                <ul className="d-block mt-2 p-0">
                                                    {conversionJson().map((item, i) => {
                                                        return (
                                                            <li key={i} className="keywords-tags mb-1">{item}</li>
                                                        )
                                                    }
                                                    )}
                                                </ul>
                                            </>
                                        }
                                    </div>
                                    <div className="article-details">
                                        {props.treeInfo.details}
                                    </div>
                                    {props.treeInfo.content &&
                                        <button onClick={showModal} style={{ width: '100px' }} className="ant-btn blue-bg mt-1 view-content-btn">View More</button>}
                                    <Modal className="Article-details-modal" title="Article Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                        <div className="px-1" style={{ height: '380px', overflowY: 'auto' }}>
                                            {props.treeInfo.content && props.treeInfo.content.split('\\n').map((item, i) => {
                                                return (
                                                    <p key={i} className="mb-1">
                                                        {item}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    </Modal>
                                </MDBCard>
                            </div>
                            <div className="col-md-6">
                                <MDBCard className="p-3 border risk-setting-block" style={{ height: "100%" }}>
                                    <AddAlert
                                        username={props.username}
                                        token={props.token}
                                        treeInfo={props.treeInfo}
                                        pdfBase64={pdfBase64}
                                        showEmail={true}
                                        websocket={props.websocket}
                                        setWebsocket={props.setWebsocket}
                                        getRowDtl={props.getRowDtl}
                                        pageSelected={props.pageSelected}
                                        updateRow={props.updateRow}
                                    />
                                </MDBCard>
                            </div>
                        </div>
                        <div className="pdf-article-info mt-3">
                            <div className="article-content">
                                <h1 style={{ fontSize: '16px', color: 'rgb(63, 136, 197)' }} className="text-uppercase m-0">Article Detail:</h1>
                                {detailsForPageBreak}
                            </div>
                        </div>
                    </PDFExport>
                </div>
            </MDBContainer>
        </Fragment>
    )
}

export default NewsAlert;