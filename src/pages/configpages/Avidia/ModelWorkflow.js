import React, { useEffect, useState } from 'react';
import Frame from '../../../utilities/Frame';
import { CONTEXT } from '../../../config';

import { MDBAlert } from 'mdbreact';

const ModelWorkflow = () => {
    const [alert, showAlert] = useState(true);
	useEffect(() => {
        console.log("In the Workflow");
      
	}, []);
    
	return (
        <>
       
		<Frame
			link={'https://idsp.incedolabs.com:8080/admin/airflow/graph?dag_id=Response_Propensity_Model_Credit_Cards&execution_date='
			}
		/>
         <MDBAlert color="primary" dismiss>
				The scoring has been stored at the following location:
				Marketing/CrossSellCampaigns/Product/CreditCardCrossSell/March21Campaign/CrossSell_CC_CampaignList
			</MDBAlert>
        </>
	);
};

export default ModelWorkflow;
