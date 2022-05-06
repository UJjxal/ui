import React, { useState } from 'react';

import {
	MDBRow,
	MDBCard,
	MDBCardBody,
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBInput
} from 'mdbreact';
import './clinical.css';

import LineBarChart from '../../../../utilities/LineBarHiCombo';
import { Row, Col, Input, Card, Select, Tabs } from 'antd';

import BarChart from '../../../../utilities/BarChart_';
import Loader from 'react-loader-spinner';
import { chartFormatPercent } from '../../../../utilities/commonfunctions';

import InclusionExclusionCriteria from './components/InclusionExclusionCriteria';

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
		/*height: "32px",*/
		padding: "4px 8px",
		margin: "0",
	},
	inputGroupR = {
		padding: "1px 5px",
		marginLeft: "17%",
	};

const FinalizeStudy = (props) => {

	const [relative, setRelative] = useState(null);
	const [radio, setRadio] = useState(0);

	const onClick = nr => {
		setRadio(nr);
	};


	const toggleInclusion = () => {
		setRelative(!relative);
	};

	let { similarstudiesData, literatureData, ndc, altData,
		briefTitle, patientCount, arms, drugs, procedures, sites, patientAttrition,
		
		bladderdata,
		allergydata,
		secondarydata,
		colondata,
		stageofcancerdata,
		stomachfludata,
		otherfracturedata,
		copddata,
		cardiacdata,
		hivdata,
		bilirubindata,
		creatininedata,
		hemoglobindata,
		plateletsdata,
		systolicdata,
		diastolicdata,
		genderdata,
		racedata,
		diagnosisdata,
		retentiondata,
		petdata,
		chemotherapydata,
		cystoscopydata,
		intravenousdata,
		turbtdata,
		// relative,
		indicationList, demographicList, vitalList,
		finalizeStudyLoading
	} = props;
	console.log("DATA RCVD:", similarstudiesData, literatureData, ndc, finalizeStudyLoading);
	return (
		<React.Fragment>
			<Row>

				<Col style={{ width: '100%', "margin-bottom": "-9px" }}>

					<Card
						className="ant-card-small"
						style={{ margin: "0 10px 10px 0" }}

					>
						<Tabs
							defaultActiveKey="1"
							tabPosition="top"
							animated={false}
							className="tabCustomization"
							style={{ "margin-top": "-6px" }}
						>
							<TabPane tab="Optimal Design" key={1} style={{ transition: 'none' }}>
								<div className="row">
									<div className="" style={{ width: '40%' }}>

										<React.Fragment>
											<InputGroup style={inputGroup} compact>
												<label style={{
													width: "95%",
													background: "rgb(32, 56, 100)",
													color: "#fff",
													fontWeight: "bold",
													textAlign: "center",
													height: "32px",
													padding: "4px 8px"
												}}>Patient Attrition Probability</label>
											</InputGroup>

											<InputGroup style={inputGroup} compact>
												<svg height="100%" width="100%" style={{ padding: '0px 122px', marginBottom: '-39px' }}>
													<circle cx="55" cy="55" r="55" fill={patientAttrition >= 0 && patientAttrition < 11 ? 'green' : null || patientAttrition > 11 && patientAttrition < 40 ? 'orange' : null || patientAttrition > 40 ? 'red' : null} />
													<text x="40" y="62" fill="white" style={{ fontWeight: 'bold', fontSize: '23px' }}>{patientAttrition}%</text>
												</svg>
											</InputGroup>
										</React.Fragment>

									</div>
									<div className="" style={{ width: '60%', marginLeft: '-24px' }}>
										<React.Fragment>
											<InputGroup style={inputGroup} compact>
												<label style={{
													width: "20%",
													background: "rgb(32, 56, 100)",
													color: "#fff",
													fontWeight: "bold",
													textAlign: "center",
													height: "32px",
													padding: "4px 8px",
													marginBottom: "0px"
												}}>Study ID</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={ndc} style={{ padding: '0px 9px', width: '80%' }} readOnly />
											</InputGroup>
											<InputGroup style={inputGroup} compact>
												<label style={{
													width: "20%",
													background: "rgb(32, 56, 100)",
													color: "#fff",
													fontWeight: "bold",
													textAlign: "center",
													height: "32px",
													padding: "4px 8px",
													marginBottom: "0px"
												}}>Brief Title</label>
												<textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '80%', "padding-top": "0px", height: "62px", resize: 'none' }} readOnly>{briefTitle}</textarea>
											</InputGroup>
											<InputGroup style={inputGroup} compact>
												<label className="finalize-label"
													style={{width: "20%"}}>Patient Count</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={patientCount} style={{ padding: '0px 9px', width: '10%' }} readOnly />
												<label className="finalize-label"
													style={{width: "25%"}}>Study Sites</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={sites} style={{ padding: '0px 9px', width: '10%' }} readOnly />
												<label className="finalize-label"
													style={{width: "25%"}}>Study Arms</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={arms} style={{ padding: '0px 9px', width: '10%' }} readOnly />

											</InputGroup>
											<InputGroup style={inputGroup} compact>

											</InputGroup>
											<InputGroup style={inputGroup} compact>
												<label className="finalize-label"
													style={{width: "20%"}}>Study Drugs</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={drugs} style={{ padding: '0px 9px', width: '10%' }} readOnly />
												<label className="finalize-label"
													style={{width: "25%"}}>Study Procedures</label>
												<input className="ant-select-selection
ant-select-selection--single" type="text" value={procedures} style={{ padding: '0px 9px', width: '10%' }} readOnly />
												<input className="ant-select-selection
ant-select-selection--single" style={{
														cursor: 'pointer',
														color: 'blue',
														"text-decoration": "underline",
														padding: '4px 8px', width: '35%',
														height: "32px",
														textAlign: 'center',
														margin: '1px',
														border: 'antiquewhite'
													}} type="text" value='Inclusion/Exclusion Criteria' onClick={toggleInclusion} readOnly />

												<InclusionExclusionCriteria relative={relative} 
												toggleInclusion={toggleInclusion} ndc={ndc} 
												indicationList={indicationList} 
												demographicList={demographicList}
              									vitalList={vitalList}/>

											</InputGroup>

										</React.Fragment>
									</div>
								</div>
								<Row style={{ marginRight: '-6px' }}>
									<Col style={{ width: '100%' }}>
										<Card
											className="ant-card-small"
											style={{ margin: "0 10px 10px 0" }}
										>
											<Tabs
												defaultActiveKey="1"
												animated={false}
												tabPosition="top"
												style={{ "margin-top": "-6px" }}
												className="tabCustomization"
											>
												<TabPane tab="Inclusion/Exclusion" key={1}>
													<MDBRow className="mt-1 d-flex justify-content-around" style={{ width: '100%', height: '250px', 'overflow-x': 'hidden' }}>

														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Bladder Cancer-Attrition sensitivity
																</MDBCardTitle>
																<MDBCardText className="text-center">
																	{finalizeStudyLoading ?
																		(
																			<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																		)

																		: (
																			bladderdata && <BarChart categories={bladderdata.categories}
																				series={bladderdata.series}
																				yaxis={bladderdata.yaxis}
																				mintick={bladderdata.mintick}
																				maxtick={bladderdata.maxtick}
																				tickAmount={bladderdata.tickAmount}
																				markers={6}
																				height={200}
																				formatter={chartFormatPercent}
																				colors={['#DC7633', '#5698D4']}
																			/>
																		)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00234494' ||
																ndc === 'NCT01282463' ||
																ndc === 'NCT02300610' ||
																ndc === 'NCT00421889' ? 'inline' : 'none'
														}}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Allergy-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{allergydata ? (
																		<BarChart categories={allergydata.categories}
																			series={allergydata.series}
																			yaxis={allergydata.yaxis}
																			mintick={allergydata.mintick}
																			maxtick={allergydata.maxtick}
																			tickAmount={allergydata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT00234494' ||
																ndc === 'NCT00461851' ||
																ndc === 'NCT01282463' ||
																ndc === 'NCT00645593' ||
																ndc === 'NCT00045630' ? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Secondary malignancy-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{secondarydata ? (
																		<BarChart categories={secondarydata.categories}
																			series={secondarydata.series}
																			yaxis={secondarydata.yaxis}
																			mintick={secondarydata.mintick}
																			maxtick={secondarydata.maxtick}
																			tickAmount={secondarydata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}

																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT00234494' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT02302807' ||
																ndc === 'NCT00421889'
																? 'inline' : 'none'
														}}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Colon Cancer - Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{colondata ? (
																		<BarChart categories={colondata.categories}
																			series={colondata.series}
																			yaxis={colondata.yaxis}
																			mintick={colondata.mintick}
																			maxtick={colondata.maxtick}
																			tickAmount={colondata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>

														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Stage of Cancer-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{stageofcancerdata ? (
																		<BarChart categories={stageofcancerdata.categories}
																			series={stageofcancerdata.series}
																			yaxis={stageofcancerdata.yaxis}
																			mintick={stageofcancerdata.mintick}
																			maxtick={stageofcancerdata.maxtick}
																			tickAmount={stageofcancerdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT00234494' ||
																ndc === 'NCT00461851' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT01282463' ||
																ndc === 'NCT00045630' ? 'inline' : 'none'
														}}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Stomach flu-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{stomachfludata ? (
																		<BarChart categories={stomachfludata.categories}
																			series={stomachfludata.series}
																			yaxis={stomachfludata.yaxis}
																			mintick={stomachfludata.mintick}
																			maxtick={stomachfludata.maxtick}
																			tickAmount={stomachfludata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>

														<MDBCard style={{ width: '45%', marginBottom: '10px', display: ndc === 'NCT00234494' || ndc === 'NCT00461851' || ndc === 'NCT01282463' ? 'inline' : 'none' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Other Fracture-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{otherfracturedata ? (
																		<BarChart categories={otherfracturedata.categories}
																			series={otherfracturedata.series}
																			yaxis={otherfracturedata.yaxis}
																			mintick={otherfracturedata.mintick}
																			maxtick={otherfracturedata.maxtick}
																			tickAmount={otherfracturedata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}

																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	COPD - Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{copddata ? (
																		<BarChart categories={copddata.categories}
																			series={copddata.series}
																			yaxis={copddata.yaxis}
																			mintick={copddata.mintick}
																			maxtick={copddata.maxtick}
																			tickAmount={copddata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>

														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT00234494' ||
																ndc === 'NCT00461851' ||
																ndc === 'NCT03159143' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT01282463' ||
																ndc === 'NCT00645593' ||
																ndc === 'NCT02300610' ||
																ndc === 'NCT00421889' ? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Cardiac Arrest-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{cardiacdata ? (
																		<BarChart categories={cardiacdata.categories}
																			series={cardiacdata.series}
																			yaxis={cardiacdata.yaxis}
																			mintick={cardiacdata.mintick}
																			maxtick={cardiacdata.maxtick}
																			tickAmount={cardiacdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}

																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', display: ndc === 'NCT02302807' ? 'inline' : 'none' }}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	HIV infection - Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{hivdata ? (
																		<BarChart categories={hivdata.categories}
																			series={hivdata.series}
																			yaxis={hivdata.yaxis}
																			mintick={hivdata.mintick}
																			maxtick={hivdata.maxtick}
																			tickAmount={hivdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Gender-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{genderdata ? (
																		<BarChart categories={genderdata.categories}
																			series={genderdata.series}
																			yaxis={genderdata.yaxis}
																			mintick={genderdata.mintick}
																			maxtick={genderdata.maxtick}
																			tickAmount={genderdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', display: 'none' }}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Race-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{racedata ? (
																		<BarChart categories={racedata.categories}
																			series={racedata.series}
																			yaxis={racedata.yaxis}
																			mintick={racedata.mintick}
																			maxtick={racedata.maxtick}
																			tickAmount={racedata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT03159143' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT00045630' ||
																ndc === 'NCT00421889' ? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Bilirubin-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{bilirubindata ? (
																		<BarChart categories={bilirubindata.categories}
																			series={bilirubindata.series}
																			yaxis={bilirubindata.yaxis}
																			mintick={bilirubindata.mintick}
																			maxtick={bilirubindata.maxtick}
																			tickAmount={bilirubindata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00461851' ||
																ndc === 'NCT03159143' ||
																ndc === 'NCT01108055' ? 'inline' : 'none'
														}}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Creatinine-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{creatininedata ? (
																		<BarChart categories={creatininedata.categories}
																			series={creatininedata.series}
																			yaxis={creatininedata.yaxis}
																			mintick={creatininedata.mintick}
																			maxtick={creatininedata.maxtick}
																			tickAmount={creatininedata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00461851' ||
																ndc === 'NCT03159143' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT00045630' ? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Hemoglobin-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{hemoglobindata ? (
																		<BarChart categories={hemoglobindata.categories}
																			series={hemoglobindata.series}
																			yaxis={hemoglobindata.yaxis}
																			mintick={hemoglobindata.mintick}
																			maxtick={hemoglobindata.maxtick}
																			tickAmount={hemoglobindata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00461851' ||
																ndc === 'NCT03159143' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT00045630' ? 'inline' : 'none'
														}}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Platelets-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{plateletsdata ? (
																		<BarChart categories={plateletsdata.categories}
																			series={plateletsdata.series}
																			yaxis={plateletsdata.yaxis}
																			mintick={plateletsdata.mintick}
																			maxtick={plateletsdata.maxtick}
																			tickAmount={plateletsdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', display: ndc === 'NCT00461851' || ndc === 'NCT01108055' ? 'inline' : 'none' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Systolic blood pressure-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{systolicdata ? (
																		<BarChart categories={systolicdata.categories}
																			series={systolicdata.series}
																			yaxis={systolicdata.yaxis}
																			mintick={systolicdata.mintick}
																			maxtick={systolicdata.maxtick}
																			tickAmount={systolicdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', display: ndc === 'NCT00461851' || ndc === 'NCT01108055' ? 'inline' : 'none' }}>

															<MDBCardBody className="p-0 pt-1">
																<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
																	Diastolic blood pressure-Attrition sensitivity
</MDBCardTitle>
																<MDBCardText className="text-center">
																	{diastolicdata ? (
																		<BarChart categories={diastolicdata.categories}
																			series={diastolicdata.series}
																			yaxis={diastolicdata.yaxis}
																			mintick={diastolicdata.mintick}
																			maxtick={diastolicdata.maxtick}
																			tickAmount={diastolicdata.tickAmount}
																			markers={6}
																			height={200}
																			formatter={chartFormatPercent}
																			colors={['#DC7633', '#5698D4']}
																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
													</MDBRow>


												</TabPane>
												<TabPane tab="Recruitment" key={2} style={{ "margin-left": "-3px" }} >
												</TabPane>
												<TabPane tab="Intervention" key={3} style={{ "margin-left": "-3px" }} >
													<MDBRow className="mt-1 d-flex justify-content-around" style={{ width: '100%', height: '300px', overflow: 'scroll' }}>
														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{diagnosisdata ? (
																		<LineBarChart
																			categories={diagnosisdata.categories}
																			title={diagnosisdata.title}
																			series={diagnosisdata.series}
																			yaxis={diagnosisdata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={diagnosisdata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{retentiondata ? (
																		<LineBarChart
																			categories={retentiondata.categories}
																			title={retentiondata.title}
																			series={retentiondata.series}
																			yaxis={retentiondata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={retentiondata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00234494' ||
																ndc === 'NCT00045630' ||
																ndc === 'NCT00421889' ||
																ndc === 'NCT00461851' ||
																ndc === 'NCT00645593' ||
																ndc === 'NCT01108055' ||
																ndc === 'NCT02300610'
																? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{petdata ? (
																		<LineBarChart
																			categories={petdata.categories}
																			title={petdata.title}
																			series={petdata.series}
																			yaxis={petdata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={petdata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT00045630' ||
																ndc === 'NCT00461851' ||
																ndc === 'NCT02302807'
																? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{chemotherapydata ? (
																		<LineBarChart
																			categories={chemotherapydata.categories}
																			title={chemotherapydata.title}
																			series={chemotherapydata.series}
																			yaxis={chemotherapydata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={chemotherapydata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px',
															display: ndc === 'NCT01282463' ||
																ndc === 'NCT02302807'
																? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{cystoscopydata ? (
																		<LineBarChart
																			categories={cystoscopydata.categories}
																			title={cystoscopydata.title}
																			series={cystoscopydata.series}
																			yaxis={cystoscopydata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={cystoscopydata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{
															width: '45%', marginBottom: '10px', display: ndc === 'NCT00421889' ||
																ndc === 'NCT02300610'
																? 'inline' : 'none'
														}}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{intravenousdata ? (
																		<LineBarChart
																			categories={intravenousdata.categories}
																			title={intravenousdata.title}
																			series={intravenousdata.series}
																			yaxis={intravenousdata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={intravenousdata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', display: ndc === 'NCT00045630' ? 'inline' : 'none' }}>
															<MDBCardBody className="p-0 pt-1">
																<MDBCardText className="text-center">
																	{turbtdata ? (
																		<LineBarChart
																			categories={turbtdata.categories}
																			title={turbtdata.title}
																			series={turbtdata.series}
																			yaxis={turbtdata.yaxis}
																			colors={['#DC7633', '#B2BABB', '#3498DB']}
																			maxtick={turbtdata.maxtick}
																			height={150} format={'{value}'}

																		/>
																	) : (
																		<Loader type="Grid" height={30} width={30} color="#00BFFF" />
																	)}
																</MDBCardText>
															</MDBCardBody>
														</MDBCard>
														<MDBCard style={{ width: '45%', marginBottom: '10px', visibility: 'hidden', display: ndc === 'NCT00234494' || ndc === 'NCT01108055' || ndc === 'NCT01282463' || ndc === 'NCT00645593' ? 'inline' : 'none' }}>
															<MDBCardBody className="p-0 pt-1">
															</MDBCardBody>
														</MDBCard>
													</MDBRow>
												</TabPane>
												<TabPane tab="Similar Studies" key={4} style={{ "margin-left": "-3px" }} >
													<div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
														<MDBCard className="" style={{ height: '14rem', 'overflow-x': 'hidden' }}>
															<MDBCardBody className="pt-1" style={{ width: '102%' }}>
																<MDBTable
																	small
																	className="border" border="1"
																	style={{ height: '10rem' }}
																>
																	<MDBTableHead style={inputLabelWidth}>
																		<tr>
																			<th style={{ width: '2%' }}>Study ID</th>
																			<th style={{ width: '20%', textAlign: 'center' }}>Title</th>
																			<th style={{ width: '1%' }}>Study Link</th>
																		</tr>
																	</MDBTableHead>
																	<MDBTableBody className="mb-0" >
																		{similarstudiesData ? (
																			similarstudiesData.rows.map((row, index) => {
																				return (
																					<tr> 
																						<td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{row.SimilarStudyID}</td>
																						<td
																							style={{
																								textAlign: 'left',
																								lineHeight: '17px'
																							}}
																						>
																							{row.Title}
																						</td>
																						<td>
																							<a style={{
																								cursor: 'pointer',
																								color: 'blue',
																								"text-decoration": "underline",
																								textAlign: 'left',
																								verticalAlign: 'middle'
																							}} href={row.StudyLink} target="_blank">{row.StudyLink}</a>
																						</td>
																					</tr>
																				);
																			})
																		) : (
																			<div className="loader">Loading...</div>
																		)}
																	</MDBTableBody>
																</MDBTable>
															</MDBCardBody>
														</MDBCard>

													</div>
												</TabPane>
												<TabPane tab="Literature Review" key={5} style={{ "margin-left": "-3px" }} >
													<div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
														<MDBCard className="" style={{ height: '14rem', 'overflow-x': 'hidden' }}>
															<MDBCardBody className="pt-1" style={{ width: '100%' }}>
																<MDBTable
																	small
																	className="border" border="1"
																	style={{ height: '10rem', 'table-layout': 'fixed', 'width': '100%' }}
																>
																	<MDBTableHead style={inputLabelWidth}>
																		<tr>
																			<th >Article Title</th>
																			<th >Study Link</th>
																		</tr>
																	</MDBTableHead>
																	<MDBTableBody className="mb-0" >
																		{literatureData ? (
																			literatureData.rows.map((row, index) => {
																				return (
																					<tr>
																						<td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{row.pub_lit}</td>
																						<td>
																							<a style={{
																								cursor: 'pointer',
																								color: 'blue',
																								"text-decoration": "underline",
																								textAlign: 'left',
																								verticalAlign: 'middle'
																							}} href={row.StudyLink} target="_blank">{row.StudyLink}</a>
																						</td>
																					</tr>
																				);
																			})
																		) : (
																			<div className="loader">Loading...</div>
																		)}
																	</MDBTableBody>
																</MDBTable>
															</MDBCardBody>
														</MDBCard>

													</div>
												</TabPane>
											</Tabs>


										</Card>
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="Alternate Designs" key={2} style={{ "margin-left": "-3px" }} >
								<div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
									<MDBCard className="" style={{}}>
										<MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '103%' }}>
											<MDBTable
												small
												className="border" border="1"
												style={{ height: '10rem' }}
											>
												<MDBTableHead style={inputLabelWidth}>
													<tr>
														<th style={{ lineHeight: 'initial' }}>Design Rank</th>
														<th style={{ lineHeight: 'initial' }}>Patient Attrition</th>
														<th style={{ lineHeight: 'initial' }}>Patient Count</th>
														<th style={{ lineHeight: 'initial' }}>Study Arms</th>
														<th style={{ lineHeight: 'initial' }}>Study Sites</th>
														<th style={{ lineHeight: 'initial' }}>Intervention Drug</th>
														<th style={{ lineHeight: 'initial' }}>Intervention Procedures</th>
														<th style={{ lineHeight: 'initial' }}>View Design</th>
													</tr>
												</MDBTableHead>
												<MDBTableBody className="mb-0">
													{altData ? (
														altData.rows.map((row, index) => {
															let bcolor = row.pat_attrition >= 0 && row.pat_attrition < 11 ? 'green' : null || row.pat_attrition > 10 && row.pat_attrition < 21 ? 'orange' : null || row.pat_attrition > 20 && row.pat_attrition < 100 ? 'red' : null
															return (
																<tr>
																	<td
																		style={{
																			'vertical-align': 'middle',
																			textAlign: 'center',
																			lineHeight: 'initial'
																		}}>{row.rank}</td>
																	<td
																		style={{
																			textAlign: 'center',
																			'vertical-align': 'middle',
																			lineHeight: 'initial',
																			backgroundColor: bcolor,
																			color: 'white',
																			fontWeight: 'bold'
																		}}
																	>
																		{row.pat_attrition}%
</td>
																	<td
																		style={{
																			'vertical-align': 'middle',
																			textAlign: 'center',
																			lineHeight: 'initial'
																		}}
																	>
																		{row.pat_count}
																	</td>
																	<td
																		style={{
																			'vertical-align': 'middle',
																			textAlign: 'center',
																		}}
																	>
																		{row.study_arms}
																	</td>
																	<td
																		style={{
																			'vertical-align': 'middle',
																			textAlign: 'center',
																		}}
																	>
																		{row.study_sites}
																	</td>
																	<td
																		style={{
																			textAlign: 'center',
																			'vertical-align': 'middle'
																		}}
																	>
																		{row.int_drug}
																	</td>
																	<td
																		style={{
																			textAlign: 'center',
																			'vertical-align': 'middle'
																		}}
																	>
																		{row.int_Proc}
																	</td>
																	<td
																		style={{
																			textAlign: 'center',
																			'vertical-align': 'middle'
																		}}
																	><MDBInput
																			style={{ height: '1.2rem', width: '1.2rem', textAlign: 'center', 'vertical-align': 'middle', 'margin-left': '10px' }}
																			onClick={() => onClick(index)}
																			checked={radio === index ? true : false}
																			label=""
																			type="radio"
																			id={`radio${index}`}
																			containerClass="mb-4"
																		/>
																	</td>
																</tr>

															);
														})
													) : (
														<div className="loader">Loading...</div>
													)}
												</MDBTableBody>
											</MDBTable>
											{/* <a style={{
"text-decoration": "underline",
width:'100%',
position:'absolute',
marginLeft:'-30px',
textAlign: 'end',
cursor: 'pointer',
color: 'blue',
}}> Load RCT Arm(s)
</a> */}
										</MDBCardBody>

									</MDBCard>
								</div>
							</TabPane>
						</Tabs>
					</Card>
				</Col>

			</Row>

		</React.Fragment>
	)




};
export default FinalizeStudy;