import React, { useState } from 'react';

import {CONTEXT} from '../../../../config';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBCol,
	MDBIcon,
	MDBInput,
	MDBBtnGroup,
	MDBBtn,
	MDBBreadcrumb,
	MDBBreadcrumbItem,
} from 'mdbreact';
import { CR_CurContractParams, CR_RecContractParams, eventTable } from '../../../../utilities/AllTables_LS';
import {NDC, ContractEntity} from '../../../../utilities/AllDropDowns';
import BarChart from '../../../../utilities/BarChart_';
import AddEvent from '../AddEvent';
import RelativeAccessChange from '../RelativeAccessChange';
import ProviderSegment from './ProviderSegment';
import { chartFormatPercent } from '../../../../utilities/commonfunctions';
import PageTitle from '../../../../utilities/PageTitle';
import 'antd/dist/antd.css'; 

import { Select } from 'antd';

const { Option } = Select;
const newDate = new Date().toLocaleString();
const ContractRecommender = () => {
	const [currentTargetData, setCurrentTargetData] = useState(null);
	const [optTargetData, setOptTargetData] = useState(null);
	// const [ndc, setNDC] = useState('DRUG A');
	const [cname, setCname] = useState('Mar-20 to Feb-22');
	const [EventTable, setEventTable] = useState(eventTable.fields);
	const [account, setAccount] = useState('Payer1');
	const [aperiod, setAperiod] = useState('Mar-20');
	const [dtargetval, setDTargetValue] = useState('45%');
	const [displayResult, toggleResult] = useState('hidden');
	const [ctmpData, setctmpData] = useState(null);
	const [otmpData, setotmpData] = useState(null);
	const [primary, setPrimary] = useState(false);
	const [relative, setRelative] = useState(false);
	const [segment, setSegment] = useState(false);

	const togglePrimary = () => {
		// console.log(primary, !primary);
		setPrimary(!primary);
	};
	const toggleRelative = () => {
		
		setRelative(!relative);
	};
	const toggleSegment = () => {
		
		setSegment(!segment);
	};

	const changeDisplayResult = () => {
		if (displayResult === 'hidden') {
			toggleResult('visible');
			getChartData();
		} else if (displayResult === 'visible') {
			toggleResult('hidden');
		}
	};

	const getChartData = () => {
		getCurrentTargetData();
		getOptTargetData();
	};

	const getCurrentTargetData = async () => {
		const result = await axios(`${CONTEXT}/performance/crctmp.json`);
		setctmpData(result.data);
	};
	const getOptTargetData = async () => {
		const result = await axios(`${CONTEXT}/performance/crotmp.json`);
		setotmpData(result.data);
	};

	const addNewEvent=(evtObj)=>{
		let evtTable=[...EventTable];
		evtTable.push(evtObj);
		setEventTable(evtTable);
	}

	return (
		<MDBContainer fluid flexcenter >
			{/* <PageTitle title={"Contract Recommender"} /> */}

			<MDBContainer fluid flexCenter>
				<MDBRow className="mt-3">
					<MDBCol className="p-0">
						<MDBCard className="pt-1 pb-2 pr-2 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
								NDC
							</MDBCardTitle>
							<MDBCardBody className="p-0">
							<Select style={{ width: '90%', border:'0px' }} defaultValue={0}>
								<Option value="">Select DRUG</Option>
								{NDC.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
							</Select>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="pt-1 pb-2  pr-2 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
								PBM/Account
							</MDBCardTitle>
							<MDBCardBody id="crndc" className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select Payer</Option>
								{ContractEntity.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
							</Select>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2  pr-2 border-0">
							<MDBCardBody id="crinput" className="p-0">
								<MDBInput
									className="pt-3"
									label="Contract Period"
									value={cname}
									onChange={(e) => setCname(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2  pr-2 border-0">
							<MDBCardBody id="crinput" className="p-0">
								<MDBInput
									className="pt-3"
									label="Anchor Period"
									value={aperiod}
									onChange={(e) => setAperiod(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="p-0">
						<MDBCard className="pt-1 border-0">
							<MDBCardTitle className="mb-1" tag="h6">
								Target Metric
							</MDBCardTitle>
							<MDBCardBody className="p-0">
								<Select style={{ width: '90%' }} defaultValue="0">
									<Option value="">
										Select Target Metric
									</Option>

									<Option value="0">
										GTN
									</Option>
									<Option value="1">
										ROC
									</Option>
								</Select>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol className="p-0 ">
						<MDBCard className="text-center pt-1 pb-2 border-0">
							<MDBCardBody id="crinputadjust" className="p-0">
								<MDBInput
									className="m-0 pt-3"
									label="Desired Target Value"
									value={dtargetval}
									onChange={(e) => setDTargetValue(e.target.value)}
								></MDBInput>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>

				<MDBRow className="mt-1">
					<MDBCol className="p-0" md="3">
						<MDBTable small className="border mb-0 text-center table-editable" style={{ height: '10rem' }}>
							<MDBTableHead color="elegant-color" textWhite>
								<tr>
									<th>Rebate Limits</th>
									<th>Max%</th>
									<th>Min%</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody className="mb-0">
								<tr>
									<td>P</td>
									<td contenteditable="true">45%</td>
									<td contenteditable="true">37%</td>
								</tr>
								<tr>
									<td>E</td>
									<td contenteditable="true">25%</td>
									<td contenteditable="true">20%</td>
								</tr>
								<tr>
									<td>N</td>
									<td contenteditable="true">11%</td>
									<td contenteditable="true">7%</td>
								</tr>
							</MDBTableBody>
						</MDBTable>
					</MDBCol>
					<MDBCol className="p-0" md="3">
						<MDBTable small className="border mb-0 ml-3 text-center" style={{ height: '10rem' }}>
							<MDBTableHead color="elegant-color" textWhite>
								<tr>
									<th>KPI Limits</th>
									<th>Max%</th>
									<th>Min%</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody className="mb-0">
								<tr>
									<td>MS%</td>
									<td contenteditable="true">100%</td>
									<td contenteditable="true">17%</td>
								</tr>
								<tr>
									<td>GTN%</td>
									<td contenteditable="true">100%</td>
									<td contenteditable="true">35%</td>
								</tr>
							</MDBTableBody>
						</MDBTable>
						<MDBBtnGroup className="d-flex">
							<MDBBtn onClick={changeDisplayResult} size="sm" color="danger" className="mr-3">
								Run
							</MDBBtn>
						</MDBBtnGroup>
					</MDBCol>
					<MDBCol className="p-0 " md="6">
						<MDBTable
							small
							className="border mb-0 ml-4 mr-1 table-wrapper-scroll-y"
							style={{ height: '10rem', width: '95%' }}
						>
							<MDBTableHead color="elegant-color" textWhite>
								<tr>
									<th>Event Name</th>
									<th>Date Anticipated</th>
									<th>Impact Length(M)</th>
									<th>Impact Type</th>
									<th>Probability</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody className="mb-0">
							{EventTable.map((evt) => (
									<tr>
										<td>{evt.event}</td>
										<td>{evt.dateAnticipated}</td>
										<td>{evt.impactLength}</td>
										<td>{evt.impactType}</td>
										<td>{evt.probability}</td>
									</tr>
								))}
								
							</MDBTableBody>
						</MDBTable>

						<MDBBtn size="sm" color="success" className="float-right" onClick={togglePrimary}>
							Add Event
						</MDBBtn>
						<AddEvent primary={primary} togglePrimary={togglePrimary} addNewEvent={addNewEvent} />
						<ProviderSegment segment={segment} toggleSegment={toggleSegment} />
						<RelativeAccessChange relative={relative} toggleRelative={toggleRelative} />
					</MDBCol>
				</MDBRow>

				{/* <MDBRow className="border border-top-0 d-flex justify-content-center">
					
				</MDBRow> */}

				<MDBRow style={{ visibility: displayResult }} className="mt-2">
					<MDBCol md="5">
						<MDBCard style={{ borderRadius: '5%' }} className="border border-primary">
							<MDBCardBody className="pt-2">
								<MDBCardTitle className="text-center" tag="h5">
									Current Contract Parameters
								</MDBCardTitle>
								<MDBTable small className="border">
									<MDBTableBody>
										{CR_CurContractParams.fields.map((rec) => {
											return (
												<tr>
													<td className="mdb-color white-text">{rec.label}</td>
													<td>{rec.value}</td>
												</tr>
											);
										})}
									</MDBTableBody>
								</MDBTable>
								{ctmpData ? (
									<BarChart
										categories={ctmpData.categories}
										series={ctmpData.series}
										yaxis={ctmpData.yaxis}
										colors={['#5698D4']}
										formatter={chartFormatPercent}
										height={200}
									/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol md="2" className="text-center">
						<MDBIcon icon="caret-right" size="10x" className="green-text" />
					</MDBCol>
					<MDBCol md="5">
						<MDBCard style={{ borderRadius: '5%' }} className="border border-success">
							<MDBCardBody className="pt-2">
								<MDBCardTitle className="text-center" tag="h5">
									Recommended Contract Parameters
								</MDBCardTitle>
								<MDBTable small className="border">
									<MDBTableBody>
										{CR_RecContractParams.fields.map((rec) => {
											if (
												CR_RecContractParams.keyFields.findIndex(
													(k) => k.label === rec.label
												) >= 0
											) {
												return (
													<tr>
														<td className="mdb-color green-text">{rec.label}</td>
														<td className="bg-success" 
														onClick={rec.id===3?
														toggleRelative
														:rec.id===8?toggleSegment:null}
														style={rec.id===3 || rec.id===8?{cursor:"pointer"}:null}
														>
															{rec.value}</td>
													</tr>
												);
											} else {
												return (
													<tr>
														<td className="mdb-color white-text">{rec.label}</td>
														<td>{rec.value}</td>
													</tr>
												);
											}
										})}
									</MDBTableBody>
								</MDBTable>
								{otmpData ? (
									<BarChart
										categories={otmpData.categories}
										series={otmpData.series}
										yaxis={otmpData.yaxis}
										colors={['#00AE4B']}
										formatter={chartFormatPercent}
										height={200}
									/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</MDBContainer>
	);
};
export default ContractRecommender;
