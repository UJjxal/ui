import React, {useState, useEffect, useContext} from 'react';
import {Button as MuiButton, FormControl, Select as MuiSelect, MenuItem, Icon} from '@material-ui/core';
import {
    MDBCard,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon,
} from "mdbreact";
import {
    Input,
    Button,
    Modal,
    message,
    Popover,
    Select
} from 'antd';
import Loader from '../../../utilities/Loader';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import uuid from 'react-uuid';
import { CONTEXT } from "../../../config";

import empty_insights_img from '../../../assets/KPI/empty.svg';
import kpiService from "../../../services/kpiService";
import { getDeepDiveAnalysis, addDeepDiveAnalysis, updateDeepDiveAnalysis, deleteDeepDiveAnalysis } from "../../../services/deepDiveAnalysisService";
import { AppContext } from '../../../AppProvider';

const DeepDiveAnalysis = (props) => {
    const appContext = useContext(AppContext);
    let {addAnalysisTab, nodeData}=props;
    let treeId=0;
    if(nodeData.treeId){
        treeId=nodeData.treeId;
    }else{
        if(typeof nodeData.parent!== "undefined"){
            treeId=nodeData.parent.treeId;
        }
    }

    const [isLoading, setIsLoading]= useState(false);
    const [listView, setListView] = useState(true);
    const [analysisList, setAnalysisList]=useState([]);
    const [showModal, setShowModal]=useState(false);
    let [frmData, setFrmData]=useState({});
    let [nodes, setNodes]=useState([]);
    let [cohorts, setCohorts]=useState([]);
    const [selectedUri, setSelectedUri]= useState('');

    const [visibleAnaysisUrlForm, setVisibleAnaysisUrlForm]=useState([]);
    const handleVisibleAnaysisUrlForm=(visible, ind)=>{
        visibleAnaysisUrlForm[ind]=visible;
        setVisibleAnaysisUrlForm([...visibleAnaysisUrlForm]);
        
    }
    const updateAnaysisUrl=(daData, ind)=>{
        visibleAnaysisUrlForm[ind]=false;
        setVisibleAnaysisUrlForm([...visibleAnaysisUrlForm]);

        const { nodeId: node_id, treeId, filter, entity } = props.nodeData;
        const kpi_tree_id = ('parent' in props.nodeData) ? props.nodeData.parent.treeId : treeId;
        let data = {       
            nodeId: node_id,
            kpiTreeId: kpi_tree_id,    
            filter: JSON.stringify(filter),
            entity,
            createdBy: props.user.authUser,
            email: props.user.userMail,
            status: 'Draft',
            uuid: daData.uuid,
            analysisName: daData.analysisName,
            analysisDescription: daData.analysisDescription,
            analysisUrl: daData.analysisUrl,
            icon: daData.icon
        }
        updateDeepDiveAnalysis(data)
            .then(res => {
                if (res.data.code === 200) {
                    appContext.useSnackBar({ status: true, severity: "success", message: 'Analysis URL updated!' })
                    getAnalysisList();
                }
            })
            .catch(err => {
                console.log(err)
                appContext.useSnackBar({ status: true, severity: "error", message: err?.message })
            })
    }

    const handleChange=(v, k)=>{
        frmData[k]=v;
        setFrmData({...frmData});
    }

    const openForm = (dtl, i) => {
        console.log(dtl)
        kpiService.getAllCohorts();
        message.destroy();
        if(!dtl){
            setFrmData({uuid: uuid(), mode:"POST", icon: 'bar_chart', association:'Tree'});
        }else{
            dtl.uuid=i;
            setFrmData({...dtl, prevName:dtl.analysisName});
        }

        setShowModal(true);
    }

    const changeAssociation=(association)=>{
        if(association!==frmData.association){
            frmData.node=null;
            frmData.cohort=null;
            handleChange(association, 'association');
        }
    }

    const handleOk = () => {
        let daData={};
        for(let i in frmData){
            daData[i]=(frmData[i]+'').trim();
        }

        if (!daData.analysisName) {
            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis name required!' })
            return;
        }

        let duplicate = analysisList.filter(item => item.analysisName === daData.analysisName);
        if (duplicate.length > 0 && 'mode' in daData && daData.mode === 'POST') {
            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis name already exists!!' })
            return;
        }

        if (duplicate.length > 0 && 'prevName' in daData && daData.prevName !== daData.analysisName) {
            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis name already exists!!' })
            return;
        }
        
        if(!daData.analysisDescription){
            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis background required!!' })
            return;
        }
        if(daData.association==='Node' && !daData.node_id){
            appContext.useSnackBar({ status: true, severity: "error", message: 'Node required!' })
            return;
        }
        if(daData.association==='Cohort' && !daData.cohort_id){
            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis published!' })
            return;
        }

        // let lists=window.localStorage['analysisLists'];
        // lists=lists?JSON.parse(lists):[];

        // let d={
        //     name:daData.name,
        //     description:daData.description,
        //     analysis_url:daData.analysis_url || '',
        //     association:daData.association,
        //     node_id:daData.node_id,
        //     cohort_id:daData.cohort_id,
        // };
        
        const { nodeId: node_id, treeId, filter, entity } = props.nodeData;
        const kpi_tree_id = ('parent' in props.nodeData) ? props.nodeData.parent.treeId : treeId;
        let data = {
            nodeId: node_id,
            kpiTreeId: kpi_tree_id,    
            filter: JSON.stringify(filter),
            entity,
            createdBy: props.user.authUser,
            email: props.user.userMail,
            status: 'Draft',
            uuid: daData.uuid,
            analysisName: daData.analysisName,
            analysisDescription: daData.analysisDescription,
            analysisUrl: daData.analysisUrl || '',
            icon: daData.icon
            // data: [{ 
            //     uuid: daData.uuid,
            //     name: daData.name,
            //     description: daData.description,
            //     url: daData.url || '',
            //     icon: daData.icon 
            // }]
        }

        if ('mode' in daData && daData.mode === 'POST') {
            addDeepDiveAnalysis(data)
                .then(res => {
                    if (res.data.code === 201) {
                        getAnalysisList();
                        appContext.useSnackBar({ status: true, severity: "success", message: 'Analysis created!' })
                    }
                })
                .catch(err => {
                    console.log(err)
                    appContext.useSnackBar({ status: true, severity: "error", message: `Error: ${err?.message}` })
                })
        }else{
            updateDeepDiveAnalysis(data)
                .then(res => {
                    if (res.data.code === 200) {
                        getAnalysisList();
                        appContext.useSnackBar({ status: true, severity: "success", message: 'Analysis updated!' })
                    }
                })
                .catch(err => {
                    appContext.useSnackBar({ status: true, severity: "error", message: err?.message })
                    console.log(err)
                })
        }



        // if(frmData.uuid){
        //     let ind=frmData.id;
        //     delete frmData.id;
        //     frmData.analysis_url=lists[ind].analysis_url || '';
        //     lists[ind]={...frmData, status:0};

        //     message.success("Analysis updated!");
        // }else{
        //     d.status=0;
        //     lists.unshift(d);
        //     message.success("Analysis created!");
        // }
        // setAnalysisList(lists);
        // window.localStorage['analysisLists']=JSON.stringify(lists);


        handleCancel();
    }

    const handleCancel=()=>{
        setShowModal(false);
    }

    const deleteRecord=(uuid)=>{
        Modal.confirm({
            title:'Do you Want to delete this analysis?',
            icon: <ExclamationCircleOutlined />,
            content:'',
            okText:'Yes',
            okType:'danger',
            cancelText:'No',
            onOk(){
                deleteDeepDiveAnalysis(uuid)
                    .then(({ data }) => {
                        if (data.code === 200) {
                            getAnalysisList();
                            appContext.useSnackBar({ status: true, severity: "error", message: 'Analysis Deleted' })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        appContext.useSnackBar({ status: true, severity: "error", message: err?.message })
                    })
            },
            onCancel(){
            },
        })
    }

    const publish=(daData)=>{
        if (!daData.analysisUrl) {
            appContext.useSnackBar({ status: true, severity: "error", message: 'You need to add analysis URL first!' })
            return;
        }
        Modal.confirm({
            title:'Are you sure to publish this analysis?',
            icon: <ExclamationCircleOutlined />,
            content:'',
            okText:'Yes',
            cancelText:'No',
            onOk(){
                const { nodeId: node_id, treeId, filter, entity } = props.nodeData;
                const kpi_tree_id = ('parent' in props.nodeData) ? props.nodeData.parent.treeId : treeId;
                let data = {       
                    nodeId: node_id,
                    kpiTreeId: kpi_tree_id,    
                    filter: JSON.stringify(filter),
                    entity,
                    createdBy: props.user.authUser,
                    email: props.user.userMail,
                    status: 'Published',
                    uuid: daData.uuid,
                    analysisName: daData.analysisName,
                    analysisDescription: daData.analysisDescription,
                    analysisUrl: daData.analysisUrl || '',
                    icon: daData.icon
                }
                updateDeepDiveAnalysis(data)
                    .then(res => {
                        if (res.data.code === 200) {
                            appContext.useSnackBar({ status: true, severity: "success", message: 'Analysis published!' })
                            getAnalysisList();
                        }
                    })
                    .catch(err => {
                        appContext.useSnackBar({ status: true, severity: "error", message: err?.message })
                        console.log(err)
                    })
            },
            onCancel(){
            },
        })
    }

    const getAnalysisList=()=>{
        setIsLoading(true);
        // let lists=window.localStorage['analysisLists'];
        // lists=lists?JSON.parse(lists):[];
        //setAnalysisList(lists);
        const { nodeId: node_id, treeId, filter, entity } = props.nodeData;
        const kpi_tree_id = ('parent' in props.nodeData) ? props.nodeData.parent.treeId : treeId;
        getDeepDiveAnalysis({nodeId:node_id, kpiTreeId:kpi_tree_id, filter: JSON.stringify(filter), entity})
        .then(({ data }) => {
            if(data.code === 200){
                setAnalysisList(data.response);
            }else{
                setAnalysisList([]);
            }
            setIsLoading(false);
        })
        .catch(err => console.log(err), setIsLoading(false))
    }

    const getNodes=()=>{
        kpiService.getTreeNodes(treeId).then(({data})=>{
            if(data.response[0].raw_tree !== ''){
                let nodesList=JSON.parse(data.response[0].raw_tree).map(raw=>{return {value: raw.nodeId, label: raw.displayName}});
                setNodes(nodesList || []);
            }else{
                setNodes([]);
            }
        }).catch(e=>{
        }).finally(()=>{
        })
    }

    const getCohorts=()=>{
        kpiService.getAllCohorts().then(({data})=>{
            if(data.response[0].raw_tree !== ''){
                let cohorts=data.response.map(raw=>{return {value:raw.cohort_id, label:raw.cohort_name}});
                setCohorts(cohorts || []);
            }else{
                setCohorts([]);
            }
        }).catch(e=>{
        }).finally(()=>{
        })
    }

    useEffect(()=>{
        getAnalysisList();
        getNodes();
        getCohorts();
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        props.hasRights.includes("Executive") && setListView(false);
    }, [props.hasRights])

    return <>
        {
        listView ?
        <div className="bold400">
            <div className="d-flex justify-content-between mb15">
                <h4 className="my-auto">Deep Dive Analysis</h4>
                <MuiButton
                    className="my-auto"
                    style={{backgroundColor: "#4285f4", fontSize:"0.7rem", color:"#fff", height:"38px"}}
                    variant="contained" 
                    component="span"
                    onClick={()=>openForm(false)}
                > 
                    <i className="fa fa-plus mr5"></i> Create New
                </MuiButton>
            </div>

            <div>
                <MDBCard>
                    <div>
                        {(analysisList.length && !isLoading) ? 
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-text-vmid">
                                    <thead className="uc bg-light">
                                        <tr>
                                            <th className="pl15 wper25">Analysis Name</th>
                                            <th className="w120">Sandbox</th>
                                            <th className="pl30">Analysis URL</th>
                                            <th className="wper150">Status</th>
                                            <th className="wper10 pr15">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analysisList.map((v,i)=>(
                                            <tr key={i}>
                                                {/* <td className="w60 pl20">
                                                    <Button.Group size="small">
                                                        <Button type="primary" onClick={()=>openForm(v, i)}><i className="fa fa-edit"></i></Button>
                                                        <Button type="danger" onClick={()=>deleteRecord(i)}><i className="fa fa-times-circle"></i></Button>
                                                    </Button.Group>
                                                </td> */}
                                                <td className="pl15">
                                                    <span className="bold600">{v.analysisName}</span>
                                                    <span className="pl5 nowrap">
                                                        <i className="fa fa-edit cpointer text-primary mr5" onClick={()=>openForm(v, v.uuid)}></i>
                                                        <i className="fa fa-times-circle cpointer" onClick={()=>deleteRecord(v.uuid)} style={{color:"#ab4952"}}></i>
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="d-flex">
                                                        <div className="my-auto">
                                                            <a href="https://idsp.incedolabs.com:9998/hub" target="blank">
                                                                {/* <MDBIcon icon="external-link-square-alt cpointer fs22" /> */}
                                                                <img src="images/jupyter.png" alt="" width="30" />
                                                            </a>
                                                        </div>
                                                        <div className="my-auto pl15">
                                                            <a href="https://idsp.incedolabs.com:8093/r/25" target="blank">
                                                                {/* <MDBIcon icon="external-link-square-alt cpointer fs22" /> */}
                                                                <img src="images/superset.png" alt="" width="30" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="pr40 pl30">
                                                    <div className="d-flex">
                                                        <div className="my-auto flex-grow-1">
                                                            <Popover 
                                                                content={<EditAnaysisUrlForm data={v} ind={i} handleVisibleAnaysisUrlForm={handleVisibleAnaysisUrlForm} updateAnaysisUrl={updateAnaysisUrl} />} 
                                                                title={"Edit Analysis URL: "+v.analysisName} 
                                                                trigger="click" 
                                                                visible={visibleAnaysisUrlForm[i]} 
                                                                onVisibleChange={(visible)=>handleVisibleAnaysisUrlForm(visible, i)}
                                                            >
                                                                <div className="cpointer pt5 pb5" style={{borderBottom:"1px solid #ccc"}}>{v.analysisUrl || "Enter Analysis URL here..."}</div>
                                                            </Popover>
                                                        </div>
                                                        
                                                    </div>
                                                </td>

                                                <td className="nowrap fs13">
                                                    {v.status !== 'Draft' ?(
                                                        <span style={{color:"green"}}>{/* <i className="fa fa-check-circle"></i>  */}PUBLISHED</span>
                                                    ):(
                                                        <span>DRAFT</span>
                                                    )}
                                                </td>

                                                <td className="pr15">
                                                    {v.status !== 'Draft'?(
                                                        <MuiButton variant="outlined" className="capitalized" style={{border:"1px solid green", color:"green", width:"140px"}}
                                                        //onClick={() => addAnalysisTab(v)}
                                                        onClick={() => { setSelectedUri(v.analysisUrl); setListView(false); }}
                                                        >View Analysis</MuiButton>
                                                    ):(
                                                        <MuiButton variant="outlined" className="capitalized" onClick={()=>publish(v)} style={{border:"1px solid #4285f4", color:"#4285f4", width:"140px"}}>Publish</MuiButton>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        : (isLoading) ? 
                            <Loader className="text-center mb-4" />
                        :
                            <div className="w-100 row align-items-center justify-content-center my-5">
                                <div className="col-md-4">
                                    <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
                                </div>
                                <div className="col-md-4 text-center">
                                    <h4>No Deep-dive Analysis!</h4>
                                    <p className="fs16">There are no Deep-dive analyses to show yet. A user can create Dashboards/visualizations on third-party tools like Tableau, Superset, etc. and show them here via an i-frame.</p>
                                </div>
                            </div>
                        }
                    </div>
                </MDBCard>
            </div>

            {/* <Modal 
                title={`${frmData.id?'Update':'Create'} Deep Dive Analysis`} 
                visible={showModal} 
                okText={`${frmData.id?'Update':'Create'}`} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                destroyOnClose 
                maskClosable={false}
                width={800}
            > */}

                <MDBModal isOpen={showModal} className="cascading-modal px-5 my-5" size1="fluid" size="lg">
                    <div className="py-3 px-4 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #dee2e6" }}>
                        <h2 className="m-0 font-weight-normal" style={{color:'#1E4564', fontSize:"1.5em"}}>{('mode' in frmData && frmData.mode === 'POST')?'Create':'Update'} Deep Dive Analysis</h2>
                        <button className="border-0 bg-white" onClick={handleCancel}><MDBIcon icon="times" /></button>
                    </div>

                    <MDBModalBody className="py-4">
                        <form onSubmit={e=>{e.preventDefault(); handleOk()}} autoComplete="off" spellCheck="false">
                            <div className="row mingap bold400">
                                <div className="col-md-12 form-group">
                                    <label className="req bold600">Analysis Name</label>
                                    <Input value={frmData.analysisName || ''} onChange={e=>handleChange(e.target.value, 'analysisName')} placeholder="Define name here" />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label className="req bold600">Analysis Background</label>
                                    <Input.TextArea rows="4" value={frmData.analysisDescription || ''} onChange={e=>handleChange(e.target.value, 'analysisDescription')} placeholder="Write description of your analysis here" />
                                </div>
                                
                                {/* <div className="col-md-12 form-group">
                                    <label className="bold600">Analysis URL (Optional)</label>
                                    <div className="d-flex">
                                        <div className="my-auto flex-grow-1 pr10">
                                            <Input value={frmData.analysis_url || ''} onChange={e=>handleChange(e.target.value, 'analysis_url')} placeholder="Enter URL here" />
                                        </div>
                                        <div className="my-auto">
                                            OR 
                                            <Button variant="outlined" className="capitalized ml10" style={{border:"1px solid #4285f4", color:"#4285f4"}}>
                                                <MDBIcon icon="external-link-square-alt mr5" />
                                                Generate New URL
                                            </Button>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-md-12 form-group">
                                    <span className="bold600 d-block">Choose Icon</span>
									<FormControl variant="outlined">
										<MuiSelect
                                            style={{width: '10rem'}}
											name="type"
											value={frmData.icon || 'bar_chart'}
											onChange={e=>handleChange(e.target.value, 'icon')}
										>
											
											{['bar_chart', 'stacked_bar_chart', 'pie_chart', 'show_chart', 'data_usage', 'waterfall_chart', 'area_chart']
                                                .map((type) => (
												<MenuItem key={type} value={type} title={type}><Icon>{type}</Icon></MenuItem>
											))}
										</MuiSelect>
									</FormControl>
                                </div>

                                {/* <div className="col-md-12 form-group d-none">
                                    <label className="bold600 d-block">Choose Icon</label>
                                    <div>
                                        <label className={"pills w-auto px-3 mr5 "+(frmData.association==='Tree'?'bg-primary text-white':'')} onClick={()=>changeAssociation('Tree')}>KPI Tree</label>
                                        <label className={"pills w-auto px-3 mr5 "+(frmData.association==='Node'?'bg-primary text-white':'')} onClick={()=>changeAssociation('Node')}>Node</label>
                                        <label className={"pills w-auto px-3 "+(frmData.association==='Cohort'?'bg-primary text-white':'')} onClick={()=>changeAssociation('Cohort')}>Cohort</label>
                                    </div>
                                </div> */}

                                {frmData.association==='Node'?(
                                    <div className="col-md-12 form-group">
                                        <label className="bold600">Select Node</label>
                                        <div>
                                            <Select
                                                style={{width:"100%"}}
                                                placeholder="Select Node"
                                                options={nodes}
                                                allowClear
                                                showSearch
                                                value={frmData.node_id}
                                                onChange={v=>{
                                                    handleChange(v, 'node_id');
                                                }}
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                ):null}

                                {frmData.association==='Cohort'?(
                                    <div className="col-md-12 form-group">
                                        <label className="bold600">Select Cohort</label>
                                        <div>
                                            <Select
                                                style={{width:"100%"}}
                                                placeholder="Select Cohort"
                                                options={cohorts}
                                                allowClear
                                                showSearch
                                                value={frmData.cohort_id}
                                                onChange={v=>{
                                                    handleChange(v, 'cohort_id');
                                                }}
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                ):null}
                            </div>
                        </form>
                    </MDBModalBody>

                    <MDBModalFooter className="d-flex">
                        <MuiButton variant="outlined" onClick={handleCancel} style={{fontSize:"0.7rem", height:"38px"}}>Cancel</MuiButton>
                        <MuiButton variant="contained" onClick={handleOk} style={{backgroundColor: "#4285f4", fontSize:"0.7rem", color:"#fff", height:"38px"}}>{('mode' in frmData && frmData.mode === 'POST')?'Create':'Update'}</MuiButton>
                    </MDBModalFooter>
                </MDBModal>
            {/* </Modal> */}
        </div>
        :
        <ViewAnalysisPane analysisList={analysisList} setListView={setListView} selectedUri={selectedUri} hasRights={props.hasRights}/>
        }
    </>
}

const EditAnaysisUrlForm=(props)=>{
    const [analysis_url, setAnalysisUrl]=useState('');

    useEffect(()=>{
        setAnalysisUrl(props.data);
        // eslint-disable-next-line
    }, [props.ind, props.data]);

    return(
        <div className="p10 w500">
            <div className="d-flex">
                <div className="my-auto flex-grow-1">
                    <Input 
                        placeholder="Analysis URL"
                        value={analysis_url.analysisUrl} 
                        onChange={e=>setAnalysisUrl({...analysis_url, analysisUrl: e.target.value})}
                        allowClear
                    />
                </div>
                <div className="my-auto ml-auto pl5 pr5">
                    <Button type="primary" onClick={()=>{props.updateAnaysisUrl(analysis_url, props.ind)}}>
                        <i className="fa fa-check"></i>
                    </Button>
                </div>
                <div className="my-auto ml-auto">
                    <Button 
                        type="danger" 
                        onClick={()=>{
                            setAnalysisUrl(props.data); 
                            props.handleVisibleAnaysisUrlForm(false, props.ind);
                        }}
                    >
                        <i className="fa fa-times"></i>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ViewAnalysisPane = ({analysisList, setListView, selectedUri, hasRights}) => {
    const [uri, setUri] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() =>{
        setUri(selectedUri);
    },[])

    const cardStyle = {
        maxWidth: "300px",
        minHeight: "315px",
        boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.1)"
    }

    return (
        <div className="bold400">
            {
            hasRights.includes("Admin") &&
                <div className="d-flex justify-content-between mb15">
                    <MuiButton variant="outlined" className="capitalized" onClick={()=>setListView(true)}>{`< Go back to list view`}</MuiButton>
                </div>
            }
            <ul className="list-inline">
                {
                analysisList
                .filter(rec => rec.status === 'Published')
                .map((v, i) => (
                    <li key={i} className="list-inline-item w-100 mr-4 cursor-pointer align-top"
                        style={(uri === v.analysisUrl) ? { ...cardStyle, borderBottom: "3px solid #4184f2" } : cardStyle}
                        onClick={() => setUri(v.analysisUrl)}
                    >
                        <h6 className="font-weight-bold text-capitalize" style={{ padding: "10px 10px 0" }}>{v.analysisName}</h6>
                        <div className="d-flex justify-content-center align-items-center" style={{ background: "#e0e0e0", height: "160px" }}>
                            {/* <img src={`images/analysis_${i}.jpg`} className="img-fluid" /> */}
                            <Icon style={{ fontSize: '8rem', color: '#4184f2' }}>{v.icon}</Icon>
                        </div>
                        <p className="p-2">{v.analysisDescription}</p>
                    </li>
                ))
                }
            </ul>
            <div className="position-relative">
                <div className="bg-light position-absolute w-100 text-right" style={{ height: "4rem", top: 0 }}>
                    <button className="border-0 bg-transparent p-4" onClick={() => setIsOpen(true)}><Icon>zoom_out_map</Icon></button>
                </div>
                <iframe src={uri} className="w-100 border-0" style={{ height: "700px" }}></iframe>
            </div>

            <MDBModal isOpen={isOpen} className="cascading-modal px-5 my-5" size="fluid">
                <div className="py-3 px-4 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <h2 className="m-0 font-weight-normal" style={{ color: '#1E4564' }}></h2>
                    <button className="border-0 bg-white" onClick={() => setIsOpen(false)}><MDBIcon icon="times" /></button>
                </div>
                <MDBModalBody className="py-4">
                    <iframe src={uri} className="w-100 border-0" style={{ height: "700px" }}></iframe>
                </MDBModalBody>
            </MDBModal>

        </div>
    )
}

export default DeepDiveAnalysis;