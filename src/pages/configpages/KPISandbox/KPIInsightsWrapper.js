import React, {useState, useEffect, useCallback} from 'react';
import KPIInsights from './KPIInsights';
import { makeStyles } from '@material-ui/core/styles';
import CreateActionRecommendation from './ActionRecommendation/CreateActionRecommendation';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const KPIInsightsWrapper = (props) => {
    const classes = useStyles();
    const [actionRecommendation, setActionRecommendation] = useState(false); //SI-79

    return(
        <div className={classes.root+' my-5'}>
        <KPIInsights
        user={props.user}
        nodeId={props.nodeId}
        insights={props.insights}
        entity={props.entity}
        filter={props.filter}
        getInsightsData={props.getInsightsData}
        createInsightsData={props.createInsightsData}
        updateInsightsData={props.updateInsightsData}
        deleteInsightsData={props.deleteInsightsData}
        triggerCreateActionRecommendation={setActionRecommendation} //SI-79
    />
    <CreateActionRecommendation //SI-79
        isOpen={actionRecommendation}  
        setIsOpen={setActionRecommendation}
        InitiatedFromInsightsSection={true}
        nodeData={props.nodeData} 
        selectedKPIDomain={props.selectedKPIDomain}
    />
    </div>
    )

}

export default KPIInsightsWrapper;