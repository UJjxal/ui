import React, {useEffect, useState} from 'react';
import util from '../../../../utilities/util';
import {
    MDBCard,
    MDBCardBody,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon,
} from "mdbreact";

import {Tabs, Drawer, Button, Input} from "antd";
const {TabPane}=Tabs;


const ModelGenerated2=(props)=>{
    const [actions, setActions]=useState([]);
    const [activeAction, setActiveAction]=useState('');
    const [recommendations, setRecommendations]=useState([]);

    const [showDrawer, setShowDrawer]=useState(false);
    const [showDtlModal, setShowDtlModal]=useState(false);
    const [recDtl, setRecDtl]=useState({});

    const handleActionClick=(action)=>{
        setActiveAction(action);
        setShowDrawer(true);
    }

    const onDrawerClose=()=>{
        setShowDrawer(false);
    }

    const openRecDetail=(data, n)=>{
        setRecDtl({
            n,
            title:data.title,
            dtl:data.dtl
        });
        setShowDtlModal(true);
    }

    const showNthRec=(n)=>{
        if(n>4){
            n=4;
        }
        if(n<1){
            n=1;
        }
        openRecDetail(recommendations[n-1], n);
    }

    useEffect(()=>{
        let actionsNames=['Home Equity', 'Credit Card', 'Auto Lending', 'Business Lending', 'Student Lending', 'Mortgage', 'Personal Lending', 'Multi-Domain'];
        setActions(actionsNames);

        let str="Lorem ipsum is free text provider. Lorem ipsum is free text provider. Lorem ipsum is free text provider. Lorem ipsum is free text provider. Lorem ipsum is free text provider.";
        let line1="With 3x outgoing calls to the customers next month, in the Outgoing Call(Rolled) activity bucket, you can expect a decrease in the Roll Rate by 27%.";
        let line2="On an upgrade from 620-679 to 680-719 FICO buckets, there can be a decrease in roll rate by 19% for more than 300 accounts currently in 620-679 FICO bucket.";
        let line3="An increase of outgoing and incoming activity by 3 times can lead to a 1.5x better roll rate in the Elevated Risk cohort of customers.";
        let line4="Customers coming from CST have 3 times less accounts as compared to customers coming from EST. With a 1.5 times higher payable amount MoM, there can be a significant growth in the uncured balance of CST customers in the Auto Lending portfolio.";
        setRecommendations([
            {title:"Medium Balance Customers - Activity", dtl:line1},
            {title:"Low Balance Customers - FICO Bucket Upgrade", dtl:line2},
            {title:"High Balance Customers - Elevated Risk", dtl:line3},
            {title:"CST’s portfolio expansion", dtl:line4},
        ]);

        // eslint-disable-next-line
    }, []);

    return(
        <div>
            <div>
                <div className="mb15">
                    <div className="uc fs16 text-primary cpointer" onClick={()=>props.setCreateType('')}>
                        <i className="fa fa-chevron-left"></i> Actions Home
                    </div>
                    <div className="fs30" style={{color:'#3F729B'}}>Model Generated Recommendations</div>
                </div>

                <div className="greybg1 p15">
                    <Tabs defaultActiveKey="1" onChange={()=>{}}>
                        <TabPane tab="Products" key="1">
                            <div className="row pl5 pr5">
                                {actions.map((actionName,i)=>(
                                    <div key={i} className="col-md-3 cpointer pt10 pb10" onClick={()=>handleActionClick(actionName)}>
                                        <MDBCard className={activeAction===actionName?"pnc-active-card":""} style={{height:'7rem', borderRadius: '1%'}}>
                                            <MDBCardBody className="d-flex flex-column align-items-center justify-content-center p-0">
                                                <span className="text-center" style={{color:'', fontSize:'0.9rem', fontWeight:'bold', letterSpacing:'1px'}}>
                                                    {actionName}
                                                </span>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                ))}
                            </div>
                        </TabPane>
                        
                        {/* <TabPane tab="BU/Products" key="2">
                            No Data
                        </TabPane>

                        <TabPane tab="Customer" key="3">
                            No Data
                        </TabPane> */}
                    </Tabs>
                </div>
            </div>

            <Drawer
                title={activeAction}
                placement="right"
                closable={false}
                onClose={onDrawerClose}
                visible={showDrawer}
                width={520}
            >
                <div>
                    {recommendations.map((v,i)=>(
                        <div key={i} className="mb15">
                            <MDBCard>
                                <MDBCardBody>
                                    <div className="text-primary bold600 fs16 cursor-pointer" onClick={()=>openRecDetail(v, i+1)}>{v.title}</div>
                                    <div className="pt5 pb5">
                                        {v.dtl}
                                    </div>
                                    <div className="d-flex pt5">
                                        <div>
                                            <Button type="danger" size="small">Reject</Button>
                                        </div>
                                        <div className="ml-auto">
                                            <Button type="primary" size="small">Accept</Button>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    ))}
                </div>
            </Drawer>

            <MDBModal isOpen={showDtlModal} className="cascading-modal px-5 my-5" size="fluid" centered>
                <div className="py-3 px-4 d-flex align-items-center justify-content-between position-relative" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <h2 className="m-0 font-weight-normal" style={{color:'#1E4564', fontSize:"1.5em"}}>{recDtl.title}</h2>
                    <button className="border-0 bg-white" onClick={()=>setShowDtlModal(false)}><MDBIcon icon="times" /></button>

                    <div className="position-absolute" style={{zIndex:100000, width:'100%', top:'-60px', left:0}}>
                        <div className="d-flex justify-content-between container-fluid p-0">
                            <button type="button" className="btn btn-info" onClick={()=>showNthRec(recDtl.n-1)}> <i className="fa fa-arrow-circle-left"></i> Previous Recommendation </button>
                            <button type="button" className="btn btn-info" onClick={()=>showNthRec(recDtl.n+1)}> <i className="fa fa-arrow-circle-right"></i> Next Recommendation </button>
                        </div>
                    </div>
                </div>

                <MDBModalBody className="py-4">
                    <div className="mb20 fs18">
                        {recDtl.dtl}
                    </div>

                    <div>
                        <div className="form-group">
                            <label className="req bold600">Action Recommendation</label>
                            <Input.TextArea rows="4" placeholder="Write description here" value={recDtl.dtl || ''} onChange={e=>{setRecDtl({...recDtl, dtl:e.target.value})}} />
                        </div>
                    </div>
                </MDBModalBody>

                <MDBModalFooter className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger">Reject</button>
                    <button type="button" className="btn btn-warning">Mark for Review</button>
                    <button type="button" className="btn btn-success">Accept</button>
                </MDBModalFooter>
            </MDBModal>
        </div>
    )
}

export default ModelGenerated2;