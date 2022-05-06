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
import LineChart from  '../../../../utilities/LineChart_';
import {chartFormatPercent} from '../../../../utilities/commonfunctions';
import {ContractEntity, BOB, ThArea, BrandBasket} from '../../../../utilities/AllDropDowns';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const MarketShare = () => {
	const [data, setData] = useState(null);

	console.log(data)
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`${CONTEXT}/performance/marketshare.json`);
			setData(result.data);
			
		};
		fetchData();
	}, []);
	console.log('fetched data', data);
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
				
				</MDBBtnGroup>
			</MDBRow>
			<MDBRow className="mt-3">
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-right-0">
						<MDBCardTitle tag="h6">Contracted Entity</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={1}>
								<Option value="">Select Payer</Option>
								{ContractEntity.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}

							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-right-0 border-left-0">
						<MDBCardTitle tag="h6">BoB</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select BoB</Option>
								{BOB.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
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
						<MDBCardTitle tag="h6">Brand Basket</MDBCardTitle>
						<MDBCardBody className="p-0">
							<Select style={{ width: '90%' }} defaultValue={0}>
								<Option value="">Select Brand</Option>
								{BrandBasket.map(ent=>{
									return(<Option value={ent.id}>{ent.value}</Option>)
								})}
							</Select>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol className="p-0">
					<MDBCard className="text-center pt-2 pb-4 border border-left-0">
						<MDBCardTitle tag="h6">Review Period</MDBCardTitle>
						<MDBCardBody  id="dateranger" className="p-0">
						<RangePicker 
						defaultValue={[moment('2018/1', 'YYYY-[Q]Q'), moment('2019/4', 'YYYY-[Q]Q')]}
						format= {'YYYY-[Q]Q'}
						/>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			<MDBRow className="mt-1">
				<MDBCard style={{ width: '60%' }}>
					<MDBCardBody className="pb-0">
						<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
							Market Share Performance
						</MDBCardTitle>
						<MDBCardText className="text-center">
							{data ? (
								<LineChart categories={data.categories} 
								series={data.series} 
								yaxis={data.yaxis}
								mintick={data.mintick}
								maxtick={data.maxtick}
								tickAmount={data.tickAmount} 
								markers={6}
								height={300} 
								formatter={chartFormatPercent} 
								colors={['#00AE4B', '#5698D4', '#A9A9A9', '#FFC000']}
								/>
							) : (
								<Loader type="Grid" height={30} width={30} color="#00BFFF" />
							)}
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>

				<MDBCard style={{ width: '40%' }}>
					<MDBCardBody className="pl-2 ml-0 pb-0">
						<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
							Key Insights
						</MDBCardTitle>
						<MDBCardText>
							<MDBTable borderless>
								<MDBTableBody className="mb-0">
									{data
										? data.keyinsights.map((insight) => (
												<tr>
													<td md="2">
														{insight.trend == 'down' ? (
															<MDBIcon className="red-text" size="3x" icon="caret-down" />
														) : (
															<MDBIcon size="3x" className="green-text" icon="caret-up" />
														)}
													</td>
													<td md="10"  className="p-0">{insight.text}</td>
												</tr>
										  ))
										: null}
								</MDBTableBody>
							</MDBTable>
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBRow>
		</MDBContainer>
	);
};
export default MarketShare;
