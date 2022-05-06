import React, { useEffect, useState, useRef } from 'react';
import { AppContext } from '../../../../AppProvider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography, Button } from '@material-ui/core';
import { MDBModal, MDBIcon, MDBModalBody, MDBModalFooter, MDBTooltip} from 'mdbreact';
import {KPIDomainList} from '../../../../utilities/AllTables';
import kpiService from "../../../../services/kpiService";

const CreateActionRecommendation = (props) => {
    const [domainCheckbox, setdomainCheckbox] = useState({ name: '' });
    const [treeList, setTreeList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    const [selectedNode, setSelectedNode] = useState([]);
    const [selectedKpi, setSelectedKpi] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [recommendationName, setRecommendationName] = useState(null);
    const [error, setError]=useState('');

    const [NodesForRecEngineTreeLoading, SetNodesForRecEngineTreeLoading]=useState(false);
	const [NodesForRecEngineTree, SetNodesForRecEngineTree]=useState([]);
    const noOfTree=useRef(0);

    useEffect(()=>{
      setNodeList(NodesForRecEngineTree);
    }, [NodesForRecEngineTree]);

    useEffect(()=>{
        if(props.InitiatedFromInsightsSection && props.nodeData && props.nodeData.treeId){
            setdomainCheckbox({name:props.selectedKPIDomain});
            let treeId=props.nodeData.treeId || props.nodeData.parent.treeId;
            let treeName=props.nodeData.treeName || props.nodeData.parent.treeName;
            setSelectedKpi([{displayName:treeName, treeID:treeId}]);
            setSelectedNode([{nodeId:props.nodeData.nodeId, displayName:props.nodeData.name}]);
            //props.InitiatedFromInsightsSection && props.getKPITreeNodeData(props.treeID);
        }else{
            if(props.selectedKPIDomain){
                //setdomainCheckbox({name:props.selectedKPIDomain});
                handleCheckbox(false, props.menuContent, props.selectedKPIDomain, true);
            }
        }
    },[]);

    const handleCheckbox = (e, menuContent, domainName, setDefault) => {
        if(props.selectedKPIDomain && setDefault!==true){
            return;
        }
        if(!props.InitiatedFromInsightsSection){
            const name = e?e.target.name:domainName;
            const newTreeList = menuContent[0].children.filter(item => item.displayName ===  name);
            const settreeList = newTreeList[0].children.map(tree=>{ return {displayName: tree.displayName, treeID: tree.treeID}})
            setdomainCheckbox({ name });
            setTreeList(settreeList);
        }
    }

    const setSelectedKpis = (e, val)=>{
        //val is an array of trees - use val[index].treeID to chain to or call API getKPITree
        //and retrieve Node list. Then populate NodeList.
        //props.NodesForRecEngineTree
        //props.NodesForRecEngineTreeLoading
        //props.getKPITreeNodeData
        console.log("KPI selected", val);
        noOfTree.current=val.length*1;
        if(!props.InitiatedFromInsightsSection){
            setSelectedKpi(val);
            if(val.length === 1){
                //props.getKPITreeNodeData(val[0].treeID)
                getKPITreeNodeData(val[0].treeID)
            }else{ 
                setNodeList([]);
                setSelectedNode([]);
            }
        }
    }

    const changeSelectedNode=(event, node)=>{
        console.log("Reached here", node);
        if(!props.InitiatedFromInsightsSection){
            if(node.length > 0){
                // let list = node.map(n=>n.displayName);
                setSelectedNode(node);
            }
        }
    }

    const createInsight=()=>{
        setError('');
        if(!recommendation || !recommendation.trim()){
            setError('No Action Recommendation entered')
            return
        }
        if(!recommendationName || !recommendationName.trim() ){
            setError('No Action Recommendation Name entered')
            return
        }
        if(!domainCheckbox.name){
            setError('No Domain Selected')
            return
        }
        if(selectedKpi.length===0){
            setError('No KPI selected')
            return
        }
        if(selectedNode.length===0){
            setError('No Node selected')
            return
        }
        props.setIsOpen(false);

    }

    const getKPITreeNodeData=async(treeID)=>{
		try{
			SetNodesForRecEngineTreeLoading(true);
            let treeContent=await kpiService.getTreeNodes(treeID);
			console.log('KPI Trees are', treeContent);
			if(treeContent.data.code===200){
				if(treeContent.data.response[0].raw_tree !== ''){
					let nodesList=JSON.parse(treeContent.data.response[0].raw_tree).map(raw=>{return {nodeId: raw.nodeId, displayName: raw.displayName}});
					SetNodesForRecEngineTree(nodesList || []);
				}
			}
		}catch(e){
			SetNodesForRecEngineTree([]);
			console.log(e);
		}
		SetNodesForRecEngineTreeLoading(false);
	}

    const ArForm=()=>{
        return (
            <AppContext.Consumer>
            {
                ({ menuContent }) => {
                    console.log("Available Props", props);
                    console.log("menuContent AR ", menuContent);
                    const treeSegment = menuContent[0].children;
                    //const treeList = treeSegment.filter(item => item.displayName === domainCheckbox['name']);

                    return (
                        <>
                            <div className="form-group">
                                <h5>Action Recommendation Description</h5>
                                <textarea className="form-control" 
                                    placeholder="Write your action recommendation here"
                                    //onChange={(e)=>setRecommendation(e.target.value)}
                                    defaultValue={recommendation || ''}
                                ></textarea>
                            </div>
                            <div className="form-group mt-4 pt-3">
                                <h5>Action Recommendation Name</h5>
                                <input className="form-control" placeholder="Define name here" 
                                //onChange={(e)=>setRecommendationName(e.target.value)}
                                defaultValue={recommendationName || ''}
                                />
                            </div>
                            <div className="form-group mt-4 pt-3">
                                <h5>KPI Tree Domain</h5>
                                <ul className="list-inline mb-4">
                                    {
                                        KPIDomainList.map((displayName, i) =>
                                            <li key={i} className="list-inline-item">
                                                <label className={((domainCheckbox['name'] !== displayName) ? (`pills w-auto px-3 ${(props.InitiatedFromInsightsSection || props.selectedKPIDomain)?'dim1':''}`) : `pills w-auto px-3 bg-primary border-primary text-white`)}>
                                                    <input name={displayName} type="checkbox" className="d-none"
                                                        checked={(domainCheckbox['name'] !== displayName) ? false : true}
                                                        onChange={e => handleCheckbox(e, menuContent)} />
                                                    {displayName}
                                                </label>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="form-group mt-4 pt-3">
                                <h5>
                                    Assign KPI Tree/s 
                                    {/* <i className="fa fa-info-circle ml5" title=""></i> */}

                                    <MDBTooltip
                                        domElement
                                        tag="span"
                                        placement="top"
                                    >
                                        <i className="fa fa-info-circle ml5"></i>
                                        <span>You can go till the node level to assign an action recommendation if you select a single KPI Tree. The node level inputs will however be disabled in case of multiple KPI Trees selection.</span>
                                    </MDBTooltip>
                                </h5>
                                <div>

                                    {props.InitiatedFromInsightsSection?(
                                        <div><label className="pills w-auto px-3">{selectedKpi[0].displayName}</label></div>
                                    ):(
                                        <Autocomplete
                                            variant="outlined" className='text-capitalize'
                                            multiple
                                            // disabled={true}
                                            options={(treeList.length > 0) ? treeList: []}
                                            getOptionLabel={(option) => option['displayName']}
                                            renderOption={(option) => 
                                            <Typography className="text-capitalize">
                                                {option['displayName']}
                                            </Typography>}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField variant="outlined" 
                                                placeholder="Select one or multiple KPI Tree"
                                                    {...params}
                                                />
                                            )}
                                            value={selectedKpi}
                                            onChange={(event, newValue) => setSelectedKpis(event, newValue)}
                                        />
                                    )}
                                </div>
                            </div>
                            
                            {noOfTree.current<=1?(
                                <div className="form-group mt-4 pt-3">
                                    <h5>Assign node/s</h5>
                                    {props.InitiatedFromInsightsSection?(
                                        <div><label className="pills w-auto px-3">{selectedNode[0].displayName}</label></div>
                                    ):(
                                        <div>
                                            {!NodesForRecEngineTreeLoading? <Autocomplete
                                                variant="outlined" className='text-capitalize'
                                                multiple
                                                options={nodeList}
                                                getOptionLabel={(option) => option['displayName']}
                                                renderOption={(option) => 
                                                <Typography className="text-capitalize">
                                                    {option['displayName']}
                                                </Typography>}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField variant="outlined" 
                                                    placeholder="Select Nodes (Optional)"
                                                        {...params}
                                                    />
                                                )}
                                                value={selectedNode}
                                                onChange={(event, newNode) => changeSelectedNode(event, newNode)}
                                            />
                                            :<input disabled className="form-control w-50 h-100" style={{ minHeight: '55px' }} 
                                            placeholder="Loading Nodes..." /> }
                                        </div>
                                    )}
                                </div>
                            ):null}
                        </>
                    )
            }    
        }
            </AppContext.Consumer>
        )
    }

    if(props.showInsidePage){
        return (
            <>
                <ArForm />
                <div className="d-flex align-items-center justify-content-between">
                    <div></div>
                    <div className="d-flex align-items-center justify-content-end text-danger font-weight-bold">
                        {error}
                    </div>

                    <div className="pt-2">
                        <Button variant="contained" size="large" color="primary" onClick={createInsight}>Create</Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <MDBModal isOpen={props.isOpen} className="cascading-modal px-5 my-5" size="fluid">
            <div className="py-3 px-4 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #dee2e6" }}>
                <h2 className="m-0 font-weight-normal" style={{ color: '#1E4564' }}>Create Action Recommendation</h2>
                <button className="border-0 bg-white" onClick={() => props.setIsOpen(false)}><MDBIcon icon="times" /></button>
            </div>
            <MDBModalBody className="py-4">
                <ArForm />
            </MDBModalBody>
            <MDBModalFooter className="d-flex align-items-center justify-content-between">
                <div></div>
                <div className="d-flex align-items-center justify-content-end text-danger font-weight-bold">
                    {error}
                </div>
                <Button variant="contained" color="primary" onClick={createInsight}>Create</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}

export default CreateActionRecommendation;