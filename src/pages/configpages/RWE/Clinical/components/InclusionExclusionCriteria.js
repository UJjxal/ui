import { Input, Select, Tabs } from 'antd';
import 'antd/dist/antd.css';
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardText, MDBCol,
	MDBIcon,
	MDBModal,
	MDBModalBody,
	MDBModalFooter, MDBRow
} from 'mdbreact';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import {
	ConditionList,
	DemographicGenderList, DemographicVarList, IncExcList,
	IndicationList, VitalsList,
	YesNoList
} from '../../../../../utilities/AllDropDowns';

const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;
const inputGroup = {
	padding: "1px 5px",
	marginLeft: "13px",
},
	inputLabel = {
		width: "40%",
		background: "rgb(32, 56, 100)",
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		height: "32px",
		padding: "4px 8px",
		margin: "0",
	},
	select = {
		width: "55%",
	},
	pdL50 = {
		paddingLeft: "13%", //"50px"
	},
	inputLabelWidth = {
		width: "50%",
		background: "rgb(32, 56, 100)",
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		height: "32px",
		padding: "4px 8px",
		margin: "0",
	},
	inputGroupR = {
		padding: "1px 5px",
		marginLeft: "17%",
	};

const InclusionExclusionCriteria = (props) => {
	const [indiDisplay, setIndiDisplay] = useState(false);
	const [demoDisplay, setDemoDisplay] = useState(false);
	const [vitalDisplay, setVitalDisplay] = useState(false);
	const setCancel = () => {
		props.toggleInclusion();
	};
	const toggleIndiDisplay = () => {
		setIndiDisplay(!indiDisplay);
	};
	const toggleDemoDisplay = () => {
		setDemoDisplay(!demoDisplay);
	};
	const toggleVitalDisplay = () => {
		setVitalDisplay(!vitalDisplay);
	};

	const { indicationList, demographicList, vitalList } = props;
	return (
		
					<MDBModal isOpen={props.relative} toggle={() => setCancel()} className="cascading-modal mt-5" size="lg">
						<div className="modal-header primary-color white-text mb-0" small >
							<h4 className="title">
								<MDBIcon icon="dice-d6 fa-2x" /> Inclusion/Exclusion Criteria
				</h4>
							<button type="button" className="close" onClick={() => setCancel()}>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<MDBModalBody className="pt-0">
							<MDBRow className="mt-2 d-flex justify-content-around">
								<MDBCol>
									<MDBCard className="" style={{ height: '23rem', "margin-left": "-12px", overflowY: 'scroll' }}>
										<MDBCardBody style={{ "margin-top": "-25px" }}>
											<MDBCardText className="d-flex flex-column mt-2" >
												<MDBBtn
													className="m-0 p-1"
													small
													color="text-secondary"
													outline
													onClick={toggleIndiDisplay}
												>
													<MDBRow className="d-flex justify-content-end">
														<MDBCol size="10" style={inputLabelWidth}>Indication Criteria</MDBCol>
														<MDBCol size="2" style={inputLabelWidth}>
															<MDBIcon icon={!indiDisplay ? 'chevron-right' : 'chevron-down'} />
														</MDBCol>
													</MDBRow>
												</MDBBtn>
												{indicationList ? (indicationList.rows.map((indication) => (
													<button
														id={indication.id}
														className="m-0 p-1"
														color="text-secondary"
														style={{ display: indiDisplay ? 'block' : 'none', border: 'antiquewhite' }}
													>
														<div className="d-flex justify-content-around align-items-center">

															<Select
																id="clinical-select"
																defaultValue={indication.inclusion}
																style={{ textAlign: 'left', width: '150px' }}
															>
																{IncExcList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																defaultValue={indication.value}
																style={{ textAlign: 'left', width: '184px' }}
															>
																{IndicationList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																defaultValue={indication.condition}
																style={{ textAlign: 'left', width: '70px' }}
															>
																{ConditionList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															{indication.value === "Stage of cancer" ? (
																<input style={{ width: '70px' }} defaultValue={indication.yesorno}
																></input>
															) : (
																<Select
																	id="clinical-select"
																	defaultValue={indication.yesorno}
																	style={{ textAlign: 'left', width: '70px' }}
																>
																	{YesNoList.map((ent) => (
																		<Option value={ent.id}>{ent.value}</Option>
																	))}
																</Select>
															)}
														</div>
													</button>
												))) : (
													<Loader type="Grid" height={30} width={30} color="#00BFFF" />
												)}
												<MDBBtn
													className="m-0 p-1 mt-2"
													color="text-white"
													outline
													onClick={toggleDemoDisplay}
												>
													<MDBRow className="d-flex justify-content-end">
														<MDBCol size="10" style={inputLabelWidth}>Demographics Criteria</MDBCol>
														<MDBCol size="2" style={inputLabelWidth}>
															<MDBIcon icon={!demoDisplay ? 'chevron-right' : 'chevron-down'} />
														</MDBCol>
													</MDBRow>
												</MDBBtn>
												{demographicList ? (demographicList.rows.map((demo) => (
													<button
														className="m-0 p-1"
														color="text-white"
														outline
														small
														style={{ display: demoDisplay ? 'block' : 'none', border: 'antiquewhite' }}
													>
														<div className="d-flex justify-content-around align-items-center">
															<Select
																id="clinical-select"
																defaultValue={demo.inclusion}
																style={{ textAlign: 'left', width: '150px' }}
															>
																{IncExcList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																defaultValue={demo.value}
																style={{ textAlign: 'left', width: '184px' }}
															>
																{DemographicVarList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																defaultValue={demo.condition}
																style={{ textAlign: 'left', width: '70px' }}
															>
																{ConditionList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															{demo.value === 'Age' ? (
																<input style={{ width: '70px' }} defaultValue={demo.genderListvalue}
																></input>
															) : (
																<Select
																	id="clinical-select"
																	defaultValue={demo.genderListvalue}
																	style={{ textAlign: 'left', width: '70px' }}
																>
																	{DemographicGenderList.map((ent) => (
																		<Option value={ent.id}>{ent.value}</Option>
																	))}
																</Select>
															)}
														</div>

													</button>
												))) : (
													<Loader type="Grid" height={30} width={30} color="#00BFFF" />
												)}

												<MDBBtn
													className="m-0 p-1 mt-2"
													color="text-white"
													outline
													onClick={toggleVitalDisplay}
												>
													<MDBRow className="d-flex justify-content-end">
														<MDBCol size="10" style={inputLabelWidth}>Vital Criteria</MDBCol>
														<MDBCol size="2" style={inputLabelWidth}>
															<MDBIcon icon={!vitalDisplay ? 'chevron-right' : 'chevron-down'} />
														</MDBCol>
													</MDBRow>
												</MDBBtn>
												{vitalList ? (vitalList.rows.map((vital) => (
													<button
														className="m-0 p-1"
														color="text-white"
														outline
														small
														style={{ display: vitalDisplay ? 'block' : 'none', border: 'antiquewhite' }}
													>
														<div className="d-flex justify-content-around align-items-center">
															<Select
																id="clinical-select"
																defaultValue={vital.inclusion}
																style={{ textAlign: 'left', width: '150px' }}
															>
																{IncExcList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																defaultValue={vital.value}
																style={{ textAlign: 'left', width: '184px' }}
															>
																{VitalsList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>
															<Select
																id="clinical-select"
																style={{ textAlign: 'left', width: '70px' }}
																defaultValue={vital.condition}
															>
																{ConditionList.map((ent) => {
																	return <Option value={ent.id}>{ent.value}</Option>;
																})}
															</Select>

															<input style={{ width: '70px' }} defaultValue={vital.genderListvalue}
															></input>
														</div>


													</button>
												))) : (
													<Loader type="Grid" height={30} width={30} color="#00BFFF" />
												)}

											</MDBCardText>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							</MDBRow>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn small color="primary" onClick={() => setCancel()}>
								OK
				</MDBBtn>

						</MDBModalFooter>
					</MDBModal>
				
	);
};

export default InclusionExclusionCriteria;
