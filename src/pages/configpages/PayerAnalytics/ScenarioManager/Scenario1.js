import React, { useState } from 'react';

import axios from 'axios';
import Loader from 'react-loader-spinner';
import {
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardBody,	
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBCol,	
	MDBInput,
	MDBBtnGroup,
	MDBBtn	
} from 'mdbreact';
import {CONTEXT} from '../../../../config';
import LineChart from '../../../../utilities/LineChart_';
import LineBar1 from '../../../../utilities/LineBarHi1';
import LineBar2 from '../../../../utilities/LineBarHi2';
import {chartFormatPercent,	chartNoFormat} from '../../../../utilities/commonfunctions';
import 'antd/dist/antd.css';
import { eventTable } from '../../../../utilities/AllTables_LS';
import { ContractEntity, BrandBasket, RelFP, RelNoFP } from '../../../../utilities/AllDropDowns';
import AddEvent from '../AddEvent';
import { Select } from 'antd';

const { Option } = Select;
const newDate = new Date().toLocaleString();
const Scenario1 = () => {
	const [rxData, setrxData] = useState(null);
	const [gtnData, setgtnData] = useState(null);
	const [msData, setmsData] = useState(null);
	const [rocData, setrocData] = useState(null);
	const [displayResult, toggleResult] = useState('hidden');
	const [primary, setPrimary] = useState(false);
	const [EventTable, setEventTable] = useState(eventTable.fields);
	const [entryPoint, setEntryPoint] = useState('11.75%');
	const [allInRebate, setAllInRebate] = useState('15%');
	const togglePrimary = () => {
		// console.log(primary, !primary);
		setPrimary(!primary);
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
		getRxData();
		getMarketShareData();
		getGTNData();
		getROCData();
	};

	const getRxData = async () => {
		const result = await axios(`${CONTEXT}/performance/smrx.json`);
		setrxData(result.data);
	};
	const getMarketShareData = async () => {
		const result = await axios(`${CONTEXT}/performance/smmarketshare.json`);
		setmsData(result.data);
	};
	const getGTNData = async () => {
		const result = await axios(`${CONTEXT}/performance/smgtn.json`);
		setgtnData(result.data);
	};
	const getROCData = async () => {
		const result = await axios(`${CONTEXT}/performance/smroc.json`);
		setrocData(result.data);
	};

	const addNewEvent = (evtObj) => {
		let evtTable = [...EventTable];
		evtTable.push(evtObj);
		setEventTable(evtTable);
	};

	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="mt-3 border border-bottom-0">
				<MDBCol className="p-0">
					<MDBCard className="mt-1 ml-1 mr-2 pt-1 pb-2 pl-1 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
							Contracted Entity
						</MDBCardTitle>

						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={1}>
								<Option value="">Select Payer</Option>
								{ContractEntity.map((ent) => {
									return <Option value={ent.id}>{ent.value}</Option>;
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="pt-1 pb-2 mt-1 mr-2 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
							Market Basket
						</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select Brand</Option>
								{BrandBasket.map((ent) => {
									return <Option value={ent.id}>{ent.value}</Option>;
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-1 pb-2 mt-1 mr-2 border-0">
						{/* <MDBCardTitle className="mb-1" tag="h6">
								Entry Point MS%
							</MDBCardTitle> */}
						<MDBCardBody id="sminput" className="p-0">
							<MDBInput
								className="m-0 pt-3"
								label="Entry Point MS%"
								value={entryPoint}
								onChange={(e) => setEntryPoint(e.target.value)}
							></MDBInput>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-1 pb-2 mt-1 mr-2 border-0">
						{/* <MDBCardTitle className="mb-1" tag="h6">
								Contract Period
							</MDBCardTitle> */}
						<MDBCardBody id="sminput" className="p-0">
							<MDBInput
								className="m-0 pt-3"
								label="Contract Period"
								value="Mar-20 to Dec-21"
								// onChange={(e) => setNDC(e.target.value)}
							></MDBInput>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-1 pb-2 mt-1 mr-2 border-0">
						{/* <MDBCardTitle className="mb-1" tag="h6">
								All-in Rebate %
							</MDBCardTitle> */}
						<MDBCardBody id="sminput" className="p-0">
							<MDBInput
								className="m-0 pt-3"
								label="All-in Rebate %"
								value={allInRebate}
								onChange={(e) => setAllInRebate(e.target.value)}
							></MDBInput>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			<MDBRow className="border border-top-0 border-bottom-0 mt-1">
				<MDBCol className="p-0" md="3">
					<MDBCard className="pt-1 pb-2 pl-1 ml-1 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
							Relative FP(Deal)
						</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Relative FP(Deal)</Option>
								{RelFP.map((ent) => {
									return <Option value={ent.id}>{ent.value}</Option>;
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
					<MDBBtnGroup className="mt-1 d-flex justify-content-around">
						<MDBBtn size="sm" color="primary" className="mr-3 p-0">
							Load Scenario
						</MDBBtn>
						<MDBBtn size="sm" color="primary" className="mr-3 pl-0 pr-0">
							Save Scenario
						</MDBBtn>
					</MDBBtnGroup>
				</MDBCol>
				<MDBCol className="p-0" md="3">
					<MDBCard className="pt-1 pb-2 border-0">
						<MDBCardTitle className="mb-1" tag="h6">
							Relative FP(No Deal)
						</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '92%' }} defaultValue={2}>
								<Option value="">Relative FP(No Deal)</Option>
								{RelNoFP.map((ent) => {
									return <Option value={ent.id}>{ent.value}</Option>;
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
					<MDBBtnGroup className="mt-1 d-flex justify-content-end">
						<MDBBtn onClick={changeDisplayResult} size="sm" color="danger" className="mr-3">
							Simulate
						</MDBBtn>
					</MDBBtnGroup>
				</MDBCol>

				<MDBCol>
					<MDBTable small stickyHeader="true" mdbTableScroll scrollY="true" className="border">
						<MDBTableHead className="sticky-top" color="elegant-color" textWhite>
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
				</MDBCol>
			</MDBRow>

			<MDBRow className="border border-top-0 d-flex justify-content-center"></MDBRow>

			<MDBRow style={{ visibility: displayResult }} className="mt-2 border border-bottom-0">
				<MDBCol>
					<h5>Inputs summary</h5>
					<MDBTable small>
						<MDBTableHead color="elegant-color" textWhite>
							<tr>
								<th>Contracted Entity</th>
								<th>Market basket</th>
								<th>Entry Point MS%</th>
								<th>Relative access change</th>
								<th>Relative access change if no deal</th>
								<th>Start date</th>
								<th>End date</th>
								<th>All in Rebate(%)</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody className="mb-0">
							<tr>
								<td className="border">Payer 1</td>
								<td className="border">DRUG A, DRUG B, DRUG C, DRUG D</td>
								<td className="border">11.75%</td>
								<td className="border">E-&gt;P</td>
								<td className="border">E-&gt;E</td>
								<td className="border">3/1/2020</td>
								<td className="border">2/1/2022</td>
								<td className="border">42%</td>
							</tr>
						</MDBTableBody>
					</MDBTable>
				</MDBCol>
			</MDBRow>
			<h5 style={{ visibility: displayResult }}>Contracted vs Non-Contracted Performance</h5>
			<MDBRow style={{ visibility: displayResult }} className="mt-1 d-flex justify-content-around">
				<MDBCard style={{ width: '45%' }}>
					<MDBCardBody className="p-0 pt-1">
						<MDBCardTitle tag="h6" className="text-center p-0 m-0" style={{ color: 'black' }}>
							Rx
						</MDBCardTitle>
						<MDBCardText className="text-center">
							{rxData ? (
								<LineChart
									categories={rxData.categories}
									series={rxData.series}
									yaxis={rxData.yaxis}
									mintick={rxData.mintick}
									maxtick={rxData.maxtick}
									colors={['#00AE4B', '#5698D4', '#A9A9A9', '#FFC000']}
									dashArray={[0,5,0,6]}
									tickAmount={rxData.tickAmount}
									formatter={chartNoFormat}
									height={250}
								/>
							) : (
								<Loader type="Grid" height={30} width={30} color="#00BFFF" />
							)}
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>

				<MDBCard style={{ width: '45%' }}>
					<MDBCardBody className="p-0 pt-1">
						<MDBCardTitle tag="h6" className="text-center p-0 m-0" style={{ color: 'black' }}>
							Market Share
						</MDBCardTitle>
						<MDBCardText className="text-center">
							{msData ? (
								<LineChart
									categories={msData.categories}
									series={msData.series}
									yaxis={msData.yaxis}
									mintick={msData.mintick}
									maxtick={msData.maxtick}
									tickAmount={msData.tickAmount}
									formatter={chartFormatPercent}
									dashArray={[0, 5, 5, 0]}
									colors={['#00AE4B', '#5698D4', '#A9A9A9', '#FFC000']}
									height={250}
								/>
							) : (
								<Loader type="Grid" height={30} width={30} color="#00BFFF" />
							)}
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBRow>

			<MDBRow style={{ visibility: displayResult }} className="mt-5 d-flex justify-content-around">
				<MDBCard style={{ width: '45%' }}>
					<MDBCardBody className="p-0 pt-1">
						{/* <MDBCardTitle tag="h6" className="text-center p-0 m-0" style={{ color: 'black' }}>
							GTN
						</MDBCardTitle> */}
						<MDBCardText className="text-center">
							{gtnData ? (
								// <LineBarCombo
								// 	categories={gtnData.categories}
								// 	series={gtnData.series}
								// 	yaxis={gtnData.yaxis}
								// 	maxoppositetick={20}
								// 	minoppositetick={0}
								// 	// colors={['#00AE4B', '#5698D4', '#']}
								// 	formatter={chartFormatPercent}
								// 	formatter2={chartNoFormat2dec}
								// 	height={250}
								// />
								<LineBar1/>
							) : (
								<Loader type="Grid" height={30} width={30} color="#00BFFF" />
							)}
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>

				<MDBCard style={{ width: '45%' }}>
					<MDBCardBody className="p-0 pt-1">
						{/* <MDBCardTitle tag="h6" className="text-center p-0 m-0" style={{ color: 'black' }}>
							ROC
						</MDBCardTitle> */}
						<MDBCardText className="text-center">
							{rocData ? (
								<LineBar2/>
								// <LineBarCombo
								// 	categories={rocData.categories}
								// 	series={rocData.series}
								// 	yaxis={rocData.yaxis}
								// 	maxoppositetick={2.00}
								// 	minoppositetick={0}
								// 	formatter={chartFormatPercent}
								// 	formatter2={chartNoFormat2dec}
								// 	height={250}
								// />
							) : (
								<Loader type="Grid" height={30} width={30} color="#00BFFF" />
							)}
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBRow>
		</MDBContainer>
	);
};
export default Scenario1;
