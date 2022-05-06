import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { MDBCardBody, MDBCardTitle, MDBCard } from 'mdbreact';
import { CONTEXT, API_ROOT } from '../../../../config';

import AllPagesPDFViewer from '../KPIInsightsPDF/all-pages';
import './InsightsPane.css';
import KPIInsights from '../KPIInsights';
import CreateActionRecommendation from '../ActionRecommendation/CreateActionRecommendation';
import empty_insights_img from '../../../../assets/KPI/empty.svg';
import DeepDiveAnalysis from "./../../DeepDiveAnalysis/DeepDiveAnalysis";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const InsightsPane = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [fileData, setFileData] = useState(null);
    const [urlString, setUrlString] = useState(null);
    const [inputValue, setInputValue] = useState('');
    // const [actionRecommendation, setActionRecommendation] = useState(false); //SI-79

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUrlString = useCallback(() => {
        props.getDeepDiveAnalysis(props.nodeId)
        .then((response) => {
            if(response.data.length > 0){
                setUrlString(response.data);
                setInputValue(response.data);
            }else{
                setUrlString(null);
            }
          }, (error) => {
            console.log(error);
          });
    },[])

    const updateUrlString = useCallback((value) => {
        props.uploadDeepDiveAnalysis(props.nodeId, value, props.user)
        .then((response) => {
            getUrlString();
            alert(`URL updated successfully!`);
          }, (error) => {
            console.log(error);
          });
    },[])

    useEffect(() => {
        // getUrlString();
    },[getUrlString, updateUrlString]);


    const [analysisTabs, setAnalysisTabs]=useState([]);
    const addAnalysisTab=(dtl)=>{
        setAnalysisTabs([...analysisTabs, dtl]);
    }
    const removeAnalysisTab=(i)=>{
        setValue(i-1);
        analysisTabs.splice(i, 1);
        setAnalysisTabs([...analysisTabs]);
    }

    useEffect(()=>{
        if(analysisTabs.length){
            setValue(analysisTabs.length+1);
        }else{
            setValue(0);
        }
        // eslint-disable-next-line
    }, [analysisTabs]);

    return (
        <div className={classes.root+' my-5'}>
            <AppBar position="static" style={{ backgroundColor: "#f4f5f7", boxShadow: "none", color: "#111" }}>
                <Tabs id="tabs-panel" value={value} onChange={handleChange} aria-label="">
                    <Tab label="Deep Dive Analysis" {...a11yProps(0)} />
                    {/* <Tab label="Key Insights" {...a11yProps(1)} /> */}

                    {analysisTabs.map((v,i)=>(
                        <Tab 
                            key={i}
                            label={(
                                <span>
                                    {v.name}
                                    <i className="fa fa-times-circle ml5" onClick={()=>removeAnalysisTab(i)}></i>
                                </span>
                            )} 
                            {...a11yProps(i+3)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <DeepDiveAnalysis
                    addAnalysisTab={addAnalysisTab}
                    nodeData={{...props.nodeData, entity: props.entity, filter: props.filter, treeId: props.kpiId}}
                    hasRights={props.hasRights}
                    user={props.user}
                    token={props.token}
                />
            </TabPanel>


            {analysisTabs.map((v,i)=>(
                <TabPanel key={i} value={value} index={i+2}>
                    <div style={{position:"relative"}}>
                        <div style={{height: "4rem",zIndex: "10",position:"absolute",width: "100%",background: "#e0e0e0"}}></div>
                    <iframe src={v.analysis_url} className="w-100 border-0" style={{height:"700px"}}></iframe>
                    </div>
                </TabPanel>
            ))}
        </div>
    );
}

export default InsightsPane;
