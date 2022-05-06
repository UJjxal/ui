import React, { useState } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBLink,
	MDBCollapse,
	MDBCard,
	MDBCardBody,
	MDBCardGroup,
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
} from 'mdbreact';

import OverviewChart from './utilities/ApexBarModelOverviewChart';
import ROCChart from './utilities/ApexLineROCChart2';

const data_model = {
    columns:[
        {
            label: 'Model ID',
            field: 'modelid'
        },
        {
            label: 'Prediction Type',
            field: 'predictiontype'
        },
        {
            label: 'Model Type',
            field: 'modeltype'
        },
        {
            label: 'Created On',
            field: 'created'
        }
    ],
	rows: [
		{
			modelid: 'MDL_XSell_CC_003',
		    predictiontype: 'Binary Classification',
			modeltype: 'XGB Classifier',
			created: '24/10/2019 14:16:01'
		}
	]
};

const data_performance = {
	columns:[
		{
			label: 'Metrics',
			field: 'metrics'
		},
		{
			label:'Score',
			field:'score'
		}
	],
    
	rows: [
		
		{
			metrics: 'Accuracy',
			score: '0.89',
		},
		{
			metrics: 'Sensitivity',
			score: '0.79',
		},
		{
			metrics: 'Specificity',
			score: '0.90',
		},
		{
			metrics: 'F1 Score',
			score: '0.60',
		},
		{
			metrics: 'Precision',
			score: '0.49',
		},
		
		{
			metrics: 'ROC AUC',
			score: '0.87',
		},
		{
			metrics: 'KS',
			score: '0.48',
		},
		{
			metrics: 'Overall MAPE',
			score: '0.11',
		},
	],
};

const ModelSummary = () => {
	return (
		<MDBContainer fluid flexCenter>
			<div style={{display:"grid", gridTemplateColumns:"90% auto", alignItems:"right"}}>
				<div></div>
				<div>
			<img src="/word-grey.png" style={{height:"1.2rem", width:"1.2rem", backgroundColor:"white", marginRight:"1rem"}}/>
			<img src="/code-grey.png" style={{height:"1.2rem", width:"1.2rem"}}/>
			</div>
			</div>
			<MDBRow>
				<MDBCardGroup deck className="mt-1">
					<MDBCard style={{ width: '66.8rem' }} className="pl-1">
						<MDBCardBody className="pl-1 pr-1 pb-0 pt-0">
							
							<MDBCardText>
								<MDBTable className="pb-0" responsive striped className="condensed-table" >
                                    <MDBTableHead className="pb-0 pt-2" columns={data_model.columns} style={{fontWeight:"bold"}}/>
                                    <MDBTableBody rows={data_model.rows} />
								</MDBTable>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>

				
				</MDBCardGroup>
			</MDBRow>

			<MDBRow>
				<MDBCardGroup deck className="mt-3">
					<MDBCard style={{ width: '32.5rem' }}>
						<MDBCardBody className="pb-1">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
								Modeling Data Overview
							</MDBCardTitle>
							<MDBCardText>
								<OverviewChart />
								<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", textAlign:"center"}}>
									<h6>Sample Size=8000</h6>
									<h6>Event Rate=10%</h6>
								</div>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>

					<MDBCard style={{ width: '32.5rem' }}>
						<MDBCardBody className="pb-1">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
								Performance Stats
							</MDBCardTitle>
							<MDBCardText>
								<MDBRow>
									<MDBCard style={{ width: '15rem' }}>
										<MDBCardText>
											<MDBTable striped responsive className="condensed-table">
											<MDBTableHead columns={data_performance.columns} style={{fontWeight:"bold"}}/>
												<MDBTableBody rows={data_performance.rows} />
											</MDBTable>
										</MDBCardText>
									</MDBCard>

									<MDBCard style={{ width: '15rem' }}>
										<MDBCardText>
											<ROCChart />
										</MDBCardText>
									</MDBCard>
								</MDBRow>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				</MDBCardGroup>
			</MDBRow>
		</MDBContainer>
	);
};
export default ModelSummary;
