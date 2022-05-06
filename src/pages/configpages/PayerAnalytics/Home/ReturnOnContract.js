import React, { useState, useEffect } from 'react';
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
	MDBTableBody,
	MDBCol,
	MDBIcon,
	MDBBtnGroup,
	MDBBtn,
} from 'mdbreact';
import {CONTEXT} from '../../../../config';
import LineBarChart from '../../../../utilities/LineBarComboChart';
import {chartFormatDollar, chartFormatratio } from '../../../../utilities/commonfunctions';
import 'antd/dist/antd.css'; 
import {ThArea, NDC} from '../../../../utilities/AllDropDowns';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const ReturnOnContract = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`${CONTEXT}/performance/contractperformance.json`);
			setData(result.data);
		};
		fetchData();
	},[]);
	console.log("fetched data", data);
	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="d-flex flex-row-reverse">
				<MDBBtnGroup className="mt-3">
					<MDBBtn size="sm" color="primary" className="mr-3">
						Export
					</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">
						Print
					</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">
						Help
					</MDBBtn>
					{/* <MDBBtn size="sm" color="primary" className="mr-3">
						Settings
					</MDBBtn> */}
				</MDBBtnGroup>
			</MDBRow>
			<MDBRow className="mt-3">
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-right-0">
						<MDBCardTitle tag="h6">Contract No.</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue="0">
								<Option value="">Select Contract</Option>
								<Option value="0">7128</Option>
								<Option value="1">6297</Option>
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-right-0 border-left-0">
						<MDBCardTitle tag="h6">Therapeutic Area</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select Therapeutic Area</Option>
								{ThArea.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-right-0 border-left-0">
						<MDBCardTitle tag="h6">NDC</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select DRUG</Option>
								{NDC.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-left-0">
						<MDBCardTitle tag="h6">Review Period</MDBCardTitle>
						<MDBCardBody id="dateranger" className="p-0">
						<RangePicker 
						defaultValue={[moment('2018/1', 'YYYY-[Q]Q'), moment('2019/4', 'YYYY-[Q]Q')]}
						format= {'YYYY-[Q]Q'}
						/>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			
			<MDBRow className="mt-1">

				
					<MDBCard style={{width:"60%"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
								Return On Contract Performance
							</MDBCardTitle>
							<MDBCardText className="text-center">
								{data ? (
									<LineBarChart categories={data.categories} series={data.series} yaxis={data.yaxis} height={300} formatter={chartFormatDollar} formatter2={chartFormatratio}/>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)} 
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>

					<MDBCard style={{width:"40%"}}>
						<MDBCardBody className="pl-2 ml-0 pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
								Key Insights
							</MDBCardTitle>
							<MDBCardText>
								<MDBTable>
									<MDBTableBody className="mb-0">
									{data?data.keyinsights.map(insight=>(
										<tr>
										<td md="2">{insight.trend=="down"?<MDBIcon className="red-text" size="3x" icon="caret-down" />:
										<MDBIcon size="3x" className="green-text" icon="caret-up" />
										}</td>
									    <td md="10" className="p-0">{insight.text}</td>
										</tr>
									)):null}
								</MDBTableBody>
								</MDBTable>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				
			</MDBRow>
		</MDBContainer>
	);
};
export default ReturnOnContract;
