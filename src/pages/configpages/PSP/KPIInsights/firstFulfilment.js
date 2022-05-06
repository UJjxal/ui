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

const FirstFulfilment = () => {

	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="mt-1">
          <MDBCard style={{width:"calc(40% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5">
              First Fulfilment – Fulfilment TAT & Gap Days to Fill
							</MDBCardTitle>
							<MDBCardText className="text-center">
								<Chart
                    options={dataChart.options}
                    series={dataChart.series}
                    //type="bar"
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
                        <MDBIcon className="green-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="mb-0">Days to Fill</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">31</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="green-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Providers A, B, C & D has taken the highest days to fill ( greater than 41 days) in Dec '20`}<br/>
                        {`• NDC 001 for Brand A takes the highest time to fill (greater than 48 days) in Dec '20`}
                      </td>
										</tr>
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="mb-0">Patient pickup delays (Gap Days)</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">11</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-up" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Avg. Gap Days has increased by more than 20% for the States LV, MI, LA, FL in Dec '20`}<br/>
                        {`• Book of Business more than 30% in Gap Days in Dec '20`}
                      </td>
										</tr>
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">Drop Offs</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">15%</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-up" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Side Effect (38%)  is the biggest drop off driver after first fill in Dec '20`}<br/>
                        {`• NDC 002 for Brand B has the highest drop off (28%) after first fill in Dec '20`}
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
  series: [
    {
      name: "Fullfilment TAT",
      data: [21, 25, 31, 35, 36, 35]
    },
    {
      name: "Gap Days",
      data: [13, 11, 12, 11, 10, 11]
    }
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ["Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"]
    },
    yaxis: {
      title: {
        text: 'Days'
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: true,
      offsetY: 0,
      offsetX: 0
    }
  },
};
export default FirstFulfilment;