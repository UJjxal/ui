import React, { useState } from 'react';
import {
	
	MDBContainer,
	
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBCard,
	MDBCardBody,
	MDBCardGroup,
	MDBCardImage,
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	
} from 'mdbreact';

import GainsChart from './utilities/ApexLineGainsChart';
import PredictedChart from './utilities/ApexLinePredictedChart';
import ROCChart from './utilities/ApexLineROCChart';

const data_people = {
	columns: [
		{
			label: '',
			field: 'label',
		},
		{
			label: '0',
			field: 'negative',
			sort: 'asc',
		},
		{
			label: '1',
			field: 'positive',
			sort: 'asc',
		},
	],
	rows: [
		{
			label: '0',
			negative: '6518(TN)',
			positive: '669(FP)',
		},
		{
			label: '1',
			negative: '166(FN)',
			positive: '647(TP)',
		},
	],
};

const data_matrix = {
	rows: [
		{
			label: 'Accuracy',
			value: '0.89',
			icon: [<MDBIcon icon="circle" className="mr-2 green-text" aria-hidden="true" />],
		},
		{
			label: 'Sensitivity',
			value: '0.79',
			icon: [<MDBIcon icon="circle" className="mr-2 green-text" aria-hidden="true" />],
		},
		{
			label: 'Specificity',
			value: '0.90',
			icon: [<MDBIcon icon="circle" className="mr-2 green-text" aria-hidden="true" />],
		},
		{
			label: 'F1 Score',
			value: '0.60',
			icon: [<MDBIcon icon="circle" className="mr-2 green-text" aria-hidden="true" />],
		},
		{
			label: 'Precision',
			value: '0.49',
			icon: [<MDBIcon icon="circle" className="mr-2 green-text" aria-hidden="true" />],
		},
		// {
		//   label: 'Recall',
		//   value: '0.43',
		//   icon: [<MDBIcon icon='circle' className='mr-2 yellow-text' aria-hidden='true' />],
		// }
	],
};

const ModelStats = () => {
    return(
       
					<MDBContainer fluid flexCenter className="mb-2 mt-4">
						<MDBRow>
							<MDBCardGroup deck className="mt-1">
								<MDBCard style={{ width: '24rem' }} className="pl-1">
									<MDBCardBody className="pl-1 pr-1">
										<MDBCardTitle tag="h5" style={{ color: 'black' }} className="text-center ">
											Confusion Matrix
										</MDBCardTitle>
										<MDBCardText>
											<div style={{ textAlign: 'center', marginTop: '3.5rem' }}>Predicted</div>
											<div
												style={{
													display: 'grid',
													gridTemplateColumns: '7% 93%',
													gridTemplateRows: '100%',
													alignItems: 'center',
												}}
											>
												<div
													style={{
														writingMode: 'vertical-lr',
														transform: 'rotate(180deg)',
													}}
												>
													Actual
												</div>
												<div className="row-2-col-2">
													<div />
													{/* <div className="segment-col"> */}
													<button className="segment-header-button segment-data23 no-border">
														<p className="segment-p">0</p>
													</button>
													{/* </div> */}
													{/* <div className="segment-col">1</div> */}
													<button className="segment-header-button segment-data23 no-border">
														<p className="segment-p">1</p>
													</button>

													<div className="segment-row segment-data23">
														<p className="segment-q">0</p>
													</div>
													<button className="segment-button segment-data11 no-border">
														<p className="segment-p">6518(TN)</p>
													</button>

													<button className="segment-button segment-data11 no-border">
														<p className="segment-p">669(FP)</p>
													</button>

													<div className="segment-row segment-data23">
														<p className="segment-q">1</p>
													</div>
													<button className="segment-button segment-data21 no-border">
														<p className="segment-p">166(FN)</p>
													</button>

													<button className="segment-button segment-data21 no-border">
														<p className="segment-p">647(TP)</p>
													</button>
												</div>
											</div>
										</MDBCardText>
									</MDBCardBody>
								</MDBCard>

								<MDBCard style={{ width: '24rem' }} className="pl-1">
									<MDBCardBody className="pl-1 pr-1">
										<MDBCardTitle tag="h5" style={{ color: 'black' }} className="text-center">
											Gains Chart
										</MDBCardTitle>

										<GainsChart />
									</MDBCardBody>
								</MDBCard>

								<MDBCard style={{ width: '24rem' }}>
									<MDBCardBody className="pl-1 pr-1">
										<MDBCardTitle tag="h5" style={{ color: 'black' }} className="text-center">
											ROC Curve
										</MDBCardTitle>
										<MDBCardText></MDBCardText>
										{/* <LineChart line={line2} options={options1} /> */}
										<ROCChart />
									</MDBCardBody>
								</MDBCard>

								<MDBCard style={{ width: '24rem' }}>
									<MDBCardBody className="pl-1 pr-1">
										<MDBCardTitle tag="h6" style={{ color: 'black', fontSize:"1.2rem" }} className="text-center">
											Actual vs Predicted Error
										</MDBCardTitle>
										<MDBCardText></MDBCardText>
										{/* <LineChart line={line3} options={options1}/> */}
										<PredictedChart />
									</MDBCardBody>
								</MDBCard>
							</MDBCardGroup>
						</MDBRow>

						<MDBRow>
							<MDBCardGroup deck className="mt-3">
								<MDBCard style={{ width: '24rem' }}>
									<MDBCardBody>
										{/* <MDBCardTitle tag='h5' style={{color:"black"}}>Confusion Table</MDBCardTitle> */}
										<MDBCardText>
											<MDBTable borderless responsive className="condensed-table">
												{/* <MDBTableHead columns={data_people.columns} /> */}
												<MDBTableBody rows={data_matrix.rows} />
											</MDBTable>
										</MDBCardText>
									</MDBCardBody>
								</MDBCard>

								<MDBCard style={{ minWidth: '32.1rem', marginLeft:"1.3rem" }}>
									<MDBCardBody>
										{/* <MDBCardTitle tag='h5' style={{color:"black"}}>Gains Table</MDBCardTitle> */}
										<MDBCardText>
											<h6>
												<strong>Gains Chart</strong>
												<MDBIcon icon="circle" className="ml-2 green-text" aria-hidden="true" />
											</h6>
											<p>75% events captured by targeting 45% population. KS at 48%</p>

											<h6 className="mt-10">
												<strong>ROC Curve</strong>
												<MDBIcon icon="circle" className="ml-2 green-text" aria-hidden="true" />
											</h6>
											<p>Area under Curve (AUC) – 0.87</p>
										</MDBCardText>
									</MDBCardBody>
								</MDBCard>

								<MDBCard style={{ width: '24rem' }}>
									<MDBCardBody>
										<MDBCardText>
											<h6>
												MAPE
												<MDBIcon
													icon="circle"
													className="mr-3 green-text"
													style={{ float: 'right' }}
													aria-hidden="true"
												/>
											</h6>
											<p className="mt-1" style={{ fontSize: '0.6rem' }}>
												Mean Average percentage error
											</p>
											<p>Overall MAPE - 11%</p>
											<p>Decile level MAPE - 7%</p>
										</MDBCardText>
									</MDBCardBody>
								</MDBCard>
							</MDBCardGroup>
						</MDBRow>
					</MDBContainer>
                
    )
}
export default ModelStats;