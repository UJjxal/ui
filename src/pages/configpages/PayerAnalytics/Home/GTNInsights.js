import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {	
	MDBRow,
	MDBCol,	
	MDBBtn,
	MDBIcon,
	MDBCard,	
	MDBCardBody,
	MDBModal,
	MDBModalBody,
	MDBModalFooter
} from 'mdbreact';

import {CONTEXT} from '../../../../config';
import 'antd/dist/antd.css';
import BarRangeChart from '../../../../utilities/BarRangeChart';
import LineChart from '../../../../utilities/LineChart_';
import { chartFormatPercent, chartFormatDollar } from '../../../../utilities/commonfunctions';
import { Select } from 'antd';
const { Option } = Select;

const ncsannotations = {
	xaxis: [
		{
			x: "Q4'18",
			strokeDashArray: 0,

			borderColor: '#775DD0',
			label: {
				orientation: 'horizontal',
				borderColor: '#775DD0',
				offsetX: 4,
				offsetY: 4,
				style: {
					color: '#fff',
					background: '#775DD0',
				},
				text: 'Drug B Launch',
			},
		},
	],
};
const ProviderSegment = (props) => {
	const [gtndata, setgtnData] = useState(null);
	const [ncsdata, setncsData] = useState(null);
	const [dccdata, setdccData] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		getGTNData();
		getNCSData();
		getDCCData();
	};
	const getGTNData = async () => {
		const result = await axios(`${CONTEXT}/performance/gtn.json`);
		setgtnData(result.data);
	};
	const getNCSData = async () => {
		const result = await axios(`${CONTEXT}/performance/gtninsightsncs.json`);
		setncsData(result.data);
	};
	const getDCCData = async () => {
		const result = await axios(`${CONTEXT}/performance/gtninsightsdcc.json`);
		setdccData(result.data);
	};

	const setCancel = () => {
		props.toggleGTNInsights();
	};

	return (
		<MDBModal isOpen={props.gtninsights} toggle={() => setCancel()} className="cascading-modal mt-5" size="lg">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> GTN Insights
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol className="p-0 text-center">
						<span style={{ color: 'red' }}>
							<strong>
								GTN has decreased by 9% from Q1-18 to Q4-19 due to increase in rebate by 19% by Payer 1
							</strong>
						</span>
						<MDBCard className="text-center pt-1 pb-2 pr-2">
							<MDBCardBody className="">
								<strong>GTN</strong>
								{gtndata ? (
									<BarRangeChart
										series={gtndata.series}
										height={300}
										formatter={chartFormatPercent}
									/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
				<MDBRow className="d-flex justify-content-between">
					
					<MDBCol md="5" className="p-0 text-center">
						<MDBIcon icon="arrow-down" size="3x" className="red-text" />
						<MDBCard className="text-center">
							<MDBCardBody>
								<strong>Net Contract Sales ($) by Payer 1</strong>
								{ncsdata ? (
									<LineChart
										categories={ncsdata.categories}
										series={ncsdata.series}
										yaxis={ncsdata.yaxis}
										mintick={ncsdata.mintick}
										maxtick={ncsdata.maxtick}
										tickAmount={ncsdata.tickAmount}
										height={200}
										formatter={chartFormatPercent}
										annotations={ncsannotations}
									/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol md="5" className="p-0 text-center">
						<MDBIcon icon="arrow-down" size="3x" className="red-text" />
						<MDBCard className="text-center">
							<MDBCardBody>
								<strong>Direct Contracting Cost ($) by Payer 1</strong>
								{dccdata ? (
									<LineChart
										categories={dccdata.categories}
										series={dccdata.series}
										yaxis={dccdata.yaxis}
										mintick={dccdata.mintick}
										maxtick={dccdata.maxtick}
										tickAmount={dccdata.tickAmount}
										height={200}
										formatter={chartFormatDollar}
										annotations={ncsannotations}
									/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={() => setCancel()}>
					OK
				</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	);
};

export default ProviderSegment;
