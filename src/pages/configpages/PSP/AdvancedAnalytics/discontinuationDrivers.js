import React, { useState, useEffect } from 'react';
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


const DiscontinuationDrivers = () => {
  const  handleFilter = () => {

  }

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
                  // defaultValue={[moment('2018/1', 'YYYY-[Q]Q'), moment('2019/4', 'YYYY-[Q]Q')]}
                  // format= {'YYYY-[Q]Q'}
                  />
            </div>
            </div>
			</MDBRow>
			
			<MDBRow className="mt-1">
        <MDBCard style={{width:"calc(60% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
                Mix of discontinuation drivers  
							</MDBCardTitle>
							<MDBCardText className="text-center">
                    <Chart
                      options={dataChart.options}
                      series={dataChart.series}
                      type="bar"
                    />
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
										<tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Highest discontinuation rate of 20% drop at Y1 Q4 is driven by a "Patient Financial Challenges,"<br/>
                        <b>(PSP Intervention - Financial Support/ Copay Cards)</b>
                      </td>
										</tr>
                    <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Highest discontinuation rate of 15% drop at Y1 Q2 is driven by a "Physicians Decision," <br/>
                        <b>(PSP Intervention – HCP Support & Engagement)</b>
                      </td>
										</tr>
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
      categories: ["Y1 Q1", "Y1 Q2", "Y1 Q3", "Y1 Q4", "Y2 Q1", "Y1 Q1", "Y2 Q2", "Y2 Q3", "Y2 Q4"],
      title: {
        text: 'Month of Therapy'
      }
    },
    yaxis: {
        title: {
          text: '% Patients on Therapy'
        }
      },
    tooltip: {
      shared: true,
      followCursor: true,
      inverseOrder: true,
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<div class="arrow_box">' +
          //'<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
          '<div className="something" style="position: absolute;width: 200px;height: 200px;border-radius: 50%;background-image: conic-gradient(pink '+series[seriesIndex][dataPointIndex]+'deg, yellow 30deg, green 0 235deg, orange 0);"></div> '+
          '</div>'
      }
    },
    plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
      },
  },
  series: [
    {
      name: "",
      data: [100, 85, 80, 60, 50, 40, 35, 30]
    }
  ]
};

export default DiscontinuationDrivers;