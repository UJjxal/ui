import React, { useState,useEffect } from 'react';

import {CONTEXT} from '../../../config';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {	
	MDBRow,
	MDBCol,	
	MDBBtn,
	MDBIcon,
	MDBCard,
	MDBCardTitle,
	MDBCardText,
	MDBCardBody,
	MDBModal,
	MDBModalBody,
	MDBModalFooter,	
	MDBTableBody,	
	MDBTable	
} from 'mdbreact';
import LineChart from '../../../utilities/LineChart_';
import LineBar5 from '../../../utilities/LineBarHi5';
import {chartFormatPercent} from '../../../utilities/commonfunctions';

import 'antd/dist/antd.css';

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
	const [accessData, setAccessData] = useState(null);
	const [erosionData, setErosionData] = useState(null); 

	useEffect(() => {
		
		getChartData();
	},[]);
	const getChartData=()=>{
		getaccessData();
		geterosionData();
	}

	const getaccessData = async () => {
		const result = await axios(`${CONTEXT}/performance/relativeaccessroc.json`);
		setAccessData(result.data);
	};
	const geterosionData = async () => {
		const result = await axios(`${CONTEXT}/performance/erosionfactor.json`);
		setErosionData(result.data);
	};
	const setCancel = (onCancel) => {
		onCancel();
		props.toggleRelative();
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

	return (
		<MDBModal isOpen={props.relative} toggle={() => setCancel(onCancel)} className="cascading-modal mt-5" size="lg">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" />Relative Access Change
				</h4>
				<button type="button" className="close" onClick={() => setCancel(onCancel)}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol md="6" className="p-0">
						<MDBCard className="text-center border-0 mt-2">
							<MDBCardBody>
								<MDBTable className="dt-body-left" small borderless>
									<MDBTableBody className="border-0">
										<tr>
											<td className="text-left">Current FP</td>
											<td className="font-weight-bold text-left">E</td>
										</tr>
										<tr>
											<td className="text-left">Desired Target Metric</td>
											<td className="font-weight-bold text-left">GTN</td>
										</tr>
										<tr>
											<td className="text-left">Desired Targt Value</td>
											<td className="font-weight-bold text-left">45%</td>
										</tr>
									</MDBTableBody>
								</MDBTable>
								<span><i>Based on the projections, to maximize the target metric expectation</i></span>
								<br/>
								<span><strong>Formulatory change E=>P </strong>is recommended</span>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					
				</MDBRow>

				<MDBRow>
					<MDBCol>
				<MDBCard>
						<MDBCardBody className="p-0 pt-1">
						<MDBCardTitle tag="h6" className="text-center p-0 m-0 mt-1" style={{ color: 'black' }}>
							Erosion Factor Projection
						</MDBCardTitle>
							<MDBCardText className="text-center">
								{erosionData ? (
									<LineChart categories={erosionData.categories} series={erosionData.series} yaxis={erosionData.yaxis} formatter={chartFormatPercent} markers={5} height={250}/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
					</MDBCol>
					<MDBCol>
					<MDBCard>
						<MDBCardBody className="p-0 pt-1">
							
							<MDBCardText className="text-center">
								{accessData ? (
									<LineBar5/>
								// 	<LineBarCombo
								// 	categories={accessData.categories}
								// 	series={accessData.series}
								// 	yaxis={accessData.yaxis}
								// 	mintick={0}
								// 	maxoppositetick={0.12}
								// 	minoppositetick={0.03}
								// 	// colors={['#00AE4B', '#5698D4', '#']}
								// 	formatter={chartFormatdollar}
								// 	formatter2={chartNoFormat2dec}
								// 	height={250}
								// />
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={() => setCancel(onCancel)}>
					Back
				</MDBBtn>
				
			</MDBModalFooter>
		</MDBModal>
	);
};

export default AddEvent;
