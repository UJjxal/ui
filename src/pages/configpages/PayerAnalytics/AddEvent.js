import React, { useState } from 'react';


import {
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBIcon,
	MDBCard,
	MDBCardTitle,
	MDBCardBody,
	MDBModal,
	MDBModalBody,
	MDBModalFooter,
	MDBCollapse,
	MDBBadge,
	MDBTableBody,
	MDBCardImage,
	MDBTable,
	MDBTableHead,
} from 'mdbreact';

import 'antd/dist/antd.css';
import normalImage from '../../../assets/payer/normal.png';
import linearImage from '../../../assets/payer/linear.png';
import uImage from '../../../assets/payer/u-shaped.png';
import nImage from '../../../assets/payer/n-shaped.png';
import avalImage from '../../../assets/payer/avalanche.png';
import logImage from '../../../assets/payer/logarithmic.png';
import { EventImpactCalendar } from '../../../utilities/AllTables_LS';
import { Select } from 'antd';
const { Option } = Select;

const AddEvent = (props) => {
	const [selectedImpactType, setSelectedImpactType] = useState(0);
	const [eventName, setEventName] = useState('');
	const [dateAnticipated, setDateAnticipated] = useState('');
	const [impactLength, setImpactLength] = useState('');
	const [impactKPI, setImpactKPI] = useState('');
	const [probability, setProbability] = useState('');
	const [peakImpact, setPeakImpact] = useState('');
	const [impactDirection, setImpactDirection] = useState('');
	const [impactType, setImpactType] = useState('linear');
	const [populateImpact, setPopulateImpact] = useState('');

	const setCancel = () => {
		onCancel();
		props.togglePrimary();
	};

	const onCancel = () => {
		setEventName('');
		setDateAnticipated('');
		setImpactLength('');
		setImpactKPI('');
		setProbability('');
		setPeakImpact('');
		setImpactDirection('');
		setImpactType('');
		setPopulateImpact('');
	};

	const changeImpactType = (id) => {
		setSelectedImpactType(id);
		if (id === 0) {
			setImpactType('linear');
		} else if (id === 1) {
			setImpactType('normal');
		} else if (id === 2) {
			setImpactType('logarithmic');
		} else if (id === 3) {
			setImpactType('avalanche');
		} else if (id === 4) {
			setImpactType('n-shape');
		} else if (id === 5) {
			setImpactType('u-shape');
		}
	};

	const saveChanges=()=>{
		console.log(eventName, dateAnticipated, impactLength, impactDirection, impactType, probability);
		
		props.addNewEvent(
			{event:eventName, 
				dateAnticipated:dateAnticipated.toString(), 
				impactLength:impactLength,
				impactType:impactDirection==="0"?"Posi. ":"Neg. " +  impactType,
				probability:probability
			})
		onCancel();
		props.togglePrimary();
	}

	return (
		<MDBModal isOpen={props.primary} toggle={() => setCancel()} className="cascading-modal mt-5" size="lg">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Add Event
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2 pr-2 border-0">
							<MDBCardBody id="eventinput" className="p-0 mt-1">
								<MDBInput
									className="m-0 "
									label="Event Name"
									value={eventName}
									onChange={(e) => setEventName(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="text-center pb-2 pr-2 border-0">
							<MDBCardBody id="eventdateinput" className="p-0 pt-3 mt-2">
								<MDBInput
								    type="date"
									className="m-0 p-0"
									label="Date Anticipated"
									value={dateAnticipated}
									onChange={(e) => setDateAnticipated(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2  pr-2 border-0">
							<MDBCardBody id="eventinput" className="p-0 mt-1">
								<MDBInput
									className=""
									label="Impact Length"
									value={impactLength}
									onChange={(e) => setImpactLength(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 border-0">
							{/* <MDBCardTitle className="mb-1" tag="h6">
								Impact KPI
							</MDBCardTitle> */}
							<MDBCardBody className="p-0 m-0 mt-3 mr-1">
								<Select style={{ width: '90%' }} defaultValue="0">
									<Option value="">
										<strong>Impact KPI</strong>
									</Option>
									<Option value="0">Market Share</Option>
								</Select>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol className="p-0 ">
						<MDBCard className="text-center pt-1 pb-2 border-0">
							<MDBCardBody id="eventinput" className="p-0 mt-1">
								<MDBInput
									className="m-0  "
									label="Probability"
									value={probability}
									onChange={(e) => setProbability(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>

				<MDBRow>
					<MDBCol>
						<MDBCard className="border-0">
							<MDBCardBody className="pt-2 text-center">
								<MDBCardTitle tag="h6">
									<strong>Impact Type</strong>
								</MDBCardTitle>
								<MDBRow>
									<MDBCol className="p-0">
										<MDBCard className="text-center pt-1 pb-2 border-0">
											<MDBCardBody id="eventinput" className="pt-3 pb-0">
												<MDBInput
													className="m-0"
													label="Peak Impact"
													value={peakImpact}
													onChange={(e) => setPeakImpact(e.target.value)}
												></MDBInput>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
									<MDBCol className="p-0">
										<MDBCard className="text-center pt-1 border-0 pb-2">
											<MDBCardTitle className="mb-1" tag="h6">
												<strong>Impact Direction</strong>
											</MDBCardTitle>
											<MDBCardBody className="p-0 m-0">
												<Select style={{ width: '90%' }} defaultValue="0" 
												onChange={(e)=>setImpactDirection(e)}>
													<Option value="0">Positive</Option>
													<Option value="1">Negative</Option>
												</Select>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBTable borderless>
										<MDBTableBody>
											<tr>
												<td>
													<MDBCard
														onClick={() => changeImpactType(0)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={0}
															style={
																selectedImpactType === 0
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={linearImage}
														/>
													</MDBCard>
												</td>
												<td>
													<MDBCard
														onClick={() => changeImpactType(1)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={1}
															style={
																selectedImpactType === 1
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={normalImage}
														/>
													</MDBCard>
												</td>
												<td>
													<MDBCard
														onClick={() => changeImpactType(2)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={2}
															style={
																selectedImpactType === 2
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={logImage}
														/>
													</MDBCard>
												</td>
											</tr>
											<tr>
												<td>
													<MDBCard
														onClick={() => changeImpactType(3)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={3}
															style={
																selectedImpactType === 3
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={avalImage}
														/>
													</MDBCard>
												</td>
												<td>
													<MDBCard
														onClick={() => changeImpactType(4)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={4}
															style={
																selectedImpactType === 4
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={nImage}
														/>
													</MDBCard>
												</td>
												<td>
													<MDBCard
														onClick={() => changeImpactType(5)}
														style={{ width: '5rem' }}
													>
														<MDBCardImage
															id={5}
															style={
																selectedImpactType === 5
																	? { backgroundColor: 'grey' }
																	: null
															}
															className="img-fluid"
															src={uImage}
														/>
													</MDBCard>
												</td>
											</tr>
										</MDBTableBody>
									</MDBTable>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol>
						<MDBTable small className="border">
							<MDBTableHead>
								<tr>
									{EventImpactCalendar.header.map((rec, index) => {
										return (
											<td className={index === 0 ? 'mdb-color white-text' : ''}>{rec.label}</td>
										);
									})}
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								{EventImpactCalendar.fields.map((rec) => {
									return (
										<tr>
											<td className="mdb-color white-text">{rec.label}</td>
											<td contenteditable="true">{rec.value}</td>
										</tr>
									);
								})}
							</MDBTableBody>
						</MDBTable>
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={() => setCancel()}>
					Cancel
				</MDBBtn>
				<MDBBtn color="primary" onClick={saveChanges}>Save changes</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	);

	
};

export default AddEvent;
