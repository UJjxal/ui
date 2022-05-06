import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { CONTEXT } from "../../../../config";
import {
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardBody,
	MDBCardGroup,
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBCol,
	MDBIcon,
	MDBBtnGroup,
	MDBBtn,
} from 'mdbreact';

import BarRangeChart from '../../../../utilities/BarRangeChart';
import Chart from "react-apexcharts";
import { chartFormatPercent, chartFormatdollar, chartNoFormat } from '../../../../utilities/commonfunctions';
import 'antd/dist/antd.css';
//import {ContractEntity, BOB, ThArea, NDC} from '../../../utilities/AllDropdowns';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const PriorAuthorizationKPI = () => {
	const [data, setData] = useState(null);
	const[gtninsights, setgtninsights] = useState(false);

	const toggleGTNInsights = () => {
		
		setgtninsights(!gtninsights);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`${CONTEXT}/psp/datainsights.json`);
			setData(result.data);
		};
		fetchData();
    },[]);
    const handleFilter = (value, label) => {
        console.log(`selected ${value} ${label}`);
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
      }
	console.log("fetched data", data);
	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">&nbsp;</h4>
				<MDBBtnGroup>
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
			<MDBRow className="mt-4 border px-3 pt-3 pb-1">
			<div className="mb-2 ml-auto d-flex">
                <div>
                <h6 className="mb-0">State</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `state`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="AL">AL</Select.Option>
                    <Select.Option value="CA">CA</Select.Option>
                    <Select.Option value="GA">GA</Select.Option>
                    <Select.Option value="FL">FL</Select.Option>
                    <Select.Option value="NV">NV</Select.Option>
                    <Select.Option value="NY">NY</Select.Option>
                </Select>
                </div>
                <div>
                <h6 className="mb-0">Payer</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `payer`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="Anthem">Anthem</Select.Option>
                    <Select.Option value="Caremark">Caremark</Select.Option>
                    <Select.Option value="CVS">CVS</Select.Option>
                    <Select.Option value="ESI">ESI</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Provider</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `provider`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="BCBS CA">BCBS CA</Select.Option>
                    <Select.Option value="BCBS GA">BCBS GA</Select.Option>
                    <Select.Option value="Keiser">Keiser</Select.Option>
                    <Select.Option value="UCLA">UCLA</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Brand/ NDC</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="Tocilizumab">Tocilizumab</Select.Option>
                    <Select.Option value="Bevacizumab">Bevacizumab</Select.Option>
                    <Select.Option value="Pimavanserin">Pimavanserin</Select.Option>
                    <Select.Option value="Remdesivir">Remdesivir</Select.Option>
                    <Select.Option value="Viltolarsen">Viltolarsen</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Review Period</h6>
                <RangePicker
						      //defaultValue={[moment('2019/1', 'YYYY-[Q]Q'), moment('2020/4', 'YYYY-[Q]Q')]}
						      //format= {'YYYY-[Q]Q'}
						    />
            </div>
            </div>
			</MDBRow>
			
			<MDBRow className="mt-1">
				
                    <MDBCard style={{width:"calc(60% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
                                New Patient Abandonment % 
							</MDBCardTitle>
							<MDBCardText className="text-center">
								{data ? (
                                    <Chart
                                        options={dataChart.options}
                                        series={dataChart.series}
                                        type="bar"
                                        />
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
									{data?data.keyinsightsprior.map((insight, index)=>(
										<tr>
										<td md="2" className="pt-1">{insight.trend=="down"?<MDBIcon className="red-text" size="3x" icon="caret-down" />:
										<MDBIcon size="3x" className="green-text" icon="caret-up" />
										}</td>
										<td md="10" className="p-0 pt-1"
										//onClick={index===0?toggleGTNInsights:null}
										//style={index===0?{cursor:"pointer", color:"blue"}:null}
										>{insight.text}</td>
										</tr>
									)):null}
								</MDBTableBody>
								</MDBTable>
								{/* <GTNInsights gtninsights={gtninsights} toggleGTNInsights={toggleGTNInsights}/> */}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				
			</MDBRow>
		</MDBContainer>
	);
};
const dataChart = {
    options: {
    chart: {
      id: "basic-bar",
      stacked: true
    },
    xaxis: {
      categories: ["Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"]
    },
    yaxis: {
        title: {
            text: 'Percentage'
        },
        categories: ["0.00%", "10.00%", "20.00%", "30.00%", "40.00%", "50.00%", "60.00%", "70.00%"],
    },
    tooltip: {
      shared: true,
      followCursor: true,
      inverseOrder: true
    },
    dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        }
      },
  },
  series: [
    {
      name: "Coverage Denial",
      data: [2.81, 4.35, 5.35, 6.35, 6.35, 7.35]
    },
    
    {
      name: "PA Denial",
      data: [2.45, 2.45, 4.45, 4.92, 2.45, 2.45]
    },
    {
      name: "BV Unsuccessful",
      data: [13.14, 12.14, 16.14, 12.14, 12.14, 12.14]
    },
    {
      name: "Drug Switched",
      data: [28.32, 27.32, 29.32, 27.32, 25.32, 27.32]
    },
    {
      name: "Others",
      data: [2.57, 2.57, 4.57, 3.57, 2.57, 2.57]
    }
  ]
};
export default PriorAuthorizationKPI;