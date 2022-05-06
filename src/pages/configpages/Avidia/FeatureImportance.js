import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardGroup, MDBCardText, MDBCardTitle, MDBContainer } from 'mdbreact';

import FeatureChart from './utilities/ApexBarFeatureListChart';
import EventChart from './utilities/ApexLineModelEvent';
import EventBarChart from './utilities/ApexBarModelEvent';


import 'antd/dist/antd.css';

import { Select } from 'antd';

const { Option } = Select;

const FeatureImportance = () => {
	const [selectedData, setSelectedData] = useState([{ data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6]}]);
	const [selectedChart, setSelectedChart] = useState('Line');
	const [selectedBarChart, setSelectedBarChart] = useState('');


	const changeData = e => {
		if (e == 'marseg') {
			setSelectedChart('Bar');
			setSelectedData([{
				name: 'Market Segment',
				data: [8, 12]
			  }]);
			  setSelectedBarChart(e);
		}
		if (e == 'numproava') {
			setSelectedChart('Bar');
			setSelectedData([{
				name: 'No. of Products availed',
				data: [7, 9, 12]
			  }]);
			  setSelectedBarChart(e);
		}
		if (e == 'creshawal') {
			setSelectedChart('Line');
			setSelectedData([{ data: [5.6, 5.8, 6.2, 7.5, 8.1, 9.1, 10.0, 11.9, 12.4, 14.8] }]);
		}
		if (e == 'lenrel') {
			setSelectedChart('Line');
			setSelectedData([{ data: [5.2, 5.6, 6.7, 7.2, 8.4, 9.5, 10.1, 12.5, 13.1, 15.2] }]);
		}
		if (e == 'totloaout') {
			setSelectedChart('Line');
			setSelectedData([{ data: [5.2, 5.7, 6.3, 7.2, 8.8, 10.2, 13.7, 14.9, 11.7, 9.5] }]);
		}
		if (e == 'debincrat') {
			setSelectedChart('Line');
			setSelectedData([{ data: [5.1, 5.6, 6.3, 7.3, 8.3, 9.9, 11.6, 13.2, 14.8, 14.7] }]);
		}
		if (e == 'balexicar') {
			setSelectedChart('Line');
			setSelectedData([{ data: [5.3, 6.7, 7.4, 8.1, 8.2, 8.9, 9.9, 11.1, 12.4, 14.5] }]);
		}
		if (e == 'complaints') {
			setSelectedChart('Line');
			setSelectedData([{ data: [15.2, 14.3, 12.8, 10.9, 9.7, 8.5, 8.1, 7.9, 7.5, 6.1] }]);
		}
		if (e == 'behave') {
			setSelectedChart('Line');
			setSelectedData([{ data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6] }]);
		}
		if (e == 'others') {
			setSelectedData([{ data: [1.1, 2.1, 2.6, 2.4, 3.1, 3.8, 3.9, 4.5, 4.6, 5.1] }]);
		}
	};
	return (
		<MDBContainer fluid flexCenter className="mt-4">
			<MDBRow>
				<MDBCardGroup deck className="mt-1">
					<MDBCard style={{ width: '32.5rem' }} className="pl-1">
						<MDBCardBody className="pl-1 pr-1">
							<MDBCardTitle tag="h5" style={{ color: 'black' }} className="text-center ">
								Significant Feature List
							</MDBCardTitle>
							<MDBCardText>
								<FeatureChart />
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>

					<MDBCard style={{ width: '32.5rem' }} className="pl-1">
						<MDBCardBody className="pl-1 pr-1">
							<MDBCardTitle tag="h5" style={{ color: 'black' }} className="text-center">
								Relationship with Model Event
							</MDBCardTitle>
							<div style={{ display: 'grid', gridTemplateColumns: '0.92fr auto' }}>
								<h6 className="pt-2 pl-4">
									Select Feature
									<img
										src="./right.svg"
										style={{ height: '1rem', width: '1rem', marginLeft: '0.5rem' }}
									/>
								</h6>
								<Select defaultValue="behave" style={{ width: 240 }} onChange={e => changeData(e)}>
									
									<Option value="behave">Behavior score</Option>
									<Option value="debincrat">Debt to Income ratio</Option>
									<Option value="lenrel">Length of Relationship</Option>
									<Option value="creshawal">Credit Share of Wallet</Option>
									<Option value="marseg">Market Segment</Option>
									<Option value="balexicar">Balance on existing card</Option>
									<Option value="complaints">Complaints in the last 6 months</Option>
									<Option value="numproava">Number of products owned</Option>
									<Option value="totloaout">Total loan outstanding</Option>
									{/* <Option value="others">Others</Option> */}
								</Select>
							</div>
							{ selectedChart=='Line'? 
							<EventChart data={selectedData} />:
							<EventBarChart series={selectedData} chartName={selectedBarChart} />}
						</MDBCardBody>
					</MDBCard>
				</MDBCardGroup>
			</MDBRow>
		</MDBContainer>
	);
};
export default FeatureImportance;
