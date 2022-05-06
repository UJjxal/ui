import React, {useEffect, useState} from 'react';
import util from '../../../../utilities/util';
import CreateActionRecommendation from './CreateActionRecommendation';

const CreateManually=(props)=>{
    /* const [actionRecommendation, setActionRecommendation]=useState(true);
    useEffect(()=>{
        setActionRecommendation(true);
        // eslint-disable-next-line
    }, []);
    useEffect(()=>{
        if(!actionRecommendation){
            props.setCreateType('');
        }
        // eslint-disable-next-line
    }, [actionRecommendation]); */

    return(
        <div>
            <div className="mb15">
                <div className="uc fs16 text-primary cpointer" onClick={()=>props.setCreateType('')}>
                    <i className="fa fa-chevron-left"></i> Actions Home
                </div>
                <div className="fs30" style={{color:'#3F729B'}}>Create Manually</div>
            </div>

            <CreateActionRecommendation
				//isOpen={actionRecommendation}  
				//setIsOpen={setActionRecommendation}
				InitiatedFromInsightsSection={false}
                showInsidePage={true}
			/>
        </div>
    )
}

export default CreateManually;