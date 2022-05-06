import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardBody} from 'mdbreact';
import CreateManually from "../pages/configpages/KPISandbox/ActionRecommendation/CreateManually";
import ModelGenerated2 from "../pages/configpages/KPISandbox/ActionRecommendation/ModelGenerated2";
import ExperimentationEngine from "../pages/configpages/KPISandbox/ActionRecommendation/ExperimentationEngine";
import Experiments from "../pages/configpages/KPISandbox/ActionRecommendation/Experiments";
import RecommendationEngine from "../pages/configpages/KPISandbox/ActionRecommendation/RecommendationEngine";
import PerformanceMonitoring from "../pages/configpages/KPISandbox/ActionRecommendation/PerformanceMonitoring";

export default function Header_PNC_AR(props){
	//const createTypes=['Create Manually', 'Model Generated-I', 'Model Generated-II', 'Experimentation Engine', 'Recommendation Moderation'];
	//const createTypes=['Manual Recommendations', 'Model Generated Recommendations','Recommendation Moderation', 'Experimentation Engine'];
	const createTypes=['Recommendation Engine', 'Experimentation Engine', 'Performance Monitoring'];
	const [createType, setCreateType]=useState('');

	const handleCardClick=(type)=>{
		if(type==='Model Generated-I' || type==='Recommendations Moderation' || type === 'Tracking' || type === 'Dashboards' || type === 'Pre/Post Analysis'){
			return;
		}
		setCreateType(type);
	}

	const CreateTypePage=()=>{
		switch(createType){
			case 'Recommendation Engine':
				return <RecommendationEngine handleCardClick={handleCardClick} />
			case 'Performance Monitoring':
				return <PerformanceMonitoring handleCardClick={handleCardClick} />
			case 'Experimentation Engine':
				return <ExperimentationEngine handleCardClick={handleCardClick} />;
			case 'A/B Tests':
				return <Experiments setCreateType={setCreateType} />;
			case 'Create Recommendation Manually':
				return <CreateManually setCreateType={setCreateType} />;
			case 'Model Generated Recommendations':
				return <ModelGenerated2 setCreateType={setCreateType} />;
			default:
				return <></>;
		}
	}

	useEffect(()=>{
        // eslint-disable-next-line
    }, []);

	return(
		<div className="container-fluid">
			<div className="p10">
				{!createType?(
					<div className="d-flex justify-content-around">
						{createTypes.map((type,i)=>(
							<div key={i} className="cpointer" style={{width:"15%"}} onClick={()=>handleCardClick(type)}>
								<MDBCard style={{height:'7rem', borderRadius: '1%'}}>
									<MDBCardBody className="d-flex flex-column align-items-center justify-content-center p-0">
										<span className="text-center" style={{color:'', fontSize:'0.9rem', fontWeight:'bold', letterSpacing:'1px'}}>
											{type}
										</span>
									</MDBCardBody>
								</MDBCard>
							</div>
						))}
					</div>
				):null}
				

				<CreateTypePage />
			</div>
		</div>
	)
}