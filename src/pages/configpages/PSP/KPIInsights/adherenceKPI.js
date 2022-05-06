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

import Chart from "react-apexcharts";
import 'antd/dist/antd.css';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const AdherenceKPI = () => {
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
                  // defaultValue={[moment('2019/1', 'YYYY-[Q]Q'), moment('2020/4', 'YYYY-[Q]Q')]}
                  // format= {'YYYY-[Q]Q'}
                  />
            </div>
            </div>
			</MDBRow>
			
			<MDBRow className="mt-1">
				
                    <MDBCard style={{width:"calc(60% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
                            Refill Outlier (Days since expected Refill Date) 
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
									{data?data.keyinsightsadherence.map((insight, index)=>(
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
      categories: ["On Time", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31-35", "35-40", "40+ days"]
    },
    yaxis: {
        title: {
          text: 'Patient Count'
        }
      },
    tooltip: {
      shared: true,
      followCursor: true,
      inverseOrder: true
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        }
      },
  },
  series: [
    {
      name: "",
      data: [25853, 3234, 5432, 6714, 8146, 5121, 3456, 1974, 875, 4543]
    }
  ]
};
export default AdherenceKPI;