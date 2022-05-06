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

const PaSupport = () => {

	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">&nbsp;</h5>
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
					<MDBBtn size="sm" color="primary" className="mr-3">
						Settings
					</MDBBtn>
				</MDBBtnGroup>
			</MDBRow>
			<MDBRow className="mt-1">
          <MDBCard style={{width:"calc(40% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5">
              PA Support – TAT
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

					<MDBCard style={{width:"60%"}}>
						<MDBCardBody className="pl-2 ml-0 pb-0">
							<MDBCardTitle tag="h5" className="text-center text-dark">
								Key Insights
							</MDBCardTitle>
							<MDBCardText>
								<MDBTable>
									<MDBTableBody className="mb-0">
										<tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">Prior Auth. TAT</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold">12%</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-up" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Reimb. Admin TAT for Brand A for states of GA, TX, MI increased by 1.5 days between Nov '20 - Dec '20`}<br/>
                        {`• Payers TAT for United Health and CVS for Brand B increased by 2 day between Nov '20 - Dec '20 `}
                      </td>
										</tr>                    
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="green-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">Appeals TAT</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold">21%</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="green-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Appeals TAT for the Brand A, has decreased by more than 2 days (25%) between Nov '20 - Dec '20`}<br/>
                        {`• Appeal TAT for States of CA, NY and SC has been lower than 6 days (avg.) between Nov '20 - Dec '20`}
                      </td>
										</tr>
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">PA Approval %</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold">14%</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• PA Approval by HCPs for Brand B, has decreased by more than 20 % between Nov '20 - Dec '20`}<br/>
                        {`• HCPs A, B, C, D has the lowest PA approval rates (less than 30%) between Nov '20 - Dec '20`}
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
      height: 350,
      id: "basic-bar",
      stacked: true
    },
    xaxis: {
      categories: ["Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"]
    },
    yaxis: {
        title: {
            text: 'PA TAT (Total Days)'
        },
        categories: ["0.00%", "10.00%", "20.00%", "30.00%", "40.00%", "50.00%", "60.00%", "70.00%"],
    },
    tooltip: {
      shared: false,
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
      name: "Reimb. Admin TAT",
      data: [2.81, 4.35, 5.35, 6.35, 6.35, 7.35]
    },
    {
      name: "Appeals TAT",
      data: [28.32, 27.32, 23.32, 27.32, 28.32, 29.32]
    },
    {
      name: "HCP TAT",
      data: [13.14, 12.14, 16.14, 12.14, 14.14, 16.14]
    },{
      name: "Payer TAT",
      data: [2.45, 2.45, 4.45, 4.92, 2.45, 2.45]
    },
    
    // {
    //   name: "PA Approval Rate",
    //   data: [2.57, 3.57, 2.57, 2.57, 4.57, 3.57, 2.57, 2.57]
    // }
  ]
};
export default PaSupport;
