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

const PatientAdherence = (props) => {

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
              Patient Adherence
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
								<MDBTable>
									<MDBTableBody className="mb-0">
										<tr>
                      <td className="align-middle">
                        <MDBIcon className="green-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">Active Patients</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">35900</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="green-text" size="3x" icon="caret-up" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        {`• Active Patients for Brand A increased by 12%, Brand B increased by 9% in Dec '20`}<br/>
                        {`• Growth of Active Patients has declined from 18% in Nov '20 to 09% in Dec '20`}
                      </td>
										</tr>
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="text-nowrap mb-0">Adherence Score</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">6.6</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        <a onClick={() => props.setContent(`Illustrative V`)} style={{cursor:"pointer", color:"blue", textDecoration: "underline"}}>{`• Adherence Score between age group 40-50 has dropped to 4.7 (by 9.2 %) between Nov '20 - Dec '20`}</a><br/>
                        {`• Patients on Therapy between 2 -3 years  has the lowest adherence score of 3.8 in Dec '20`}
                      </td>
										</tr>
                    <tr>
                      <td className="align-middle">
                        <MDBIcon className="red-text" size="2x" icon="circle" />
                      </td>
                      <td className="align-middle"><h5 className="mb-0">Adherence Outliers (Days)</h5></td>
                      <td className="align-middle pr-0"><h5 className="mb-0 font-weight-bold text-right">16-20</h5></td>
                      <td md="2" className="pl-1 align-middle">
                        <MDBIcon className="red-text" size="3x" icon="caret-up" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                      <a onClick={() => props.setContent(`Illustrative III`)} style={{cursor:"pointer", color:"blue", textDecoration: "underline"}}>{`• Adherence Refill Outlier is maximum between the period 16-20 days in Dec '20`}</a><br/>
                      </td>
										</tr>
								</MDBTableBody>
								</MDBTable>
						</MDBCardBody>
					</MDBCard>
				
			</MDBRow>
		</MDBContainer>
	);
};
const dataChart = {
  series: [{
    name: 'Active Patients',
    type: 'column',
    data: [30000, 32000, 33000, 33500, 35000, 35900]
  }, {
    name: 'Adherence Score',
    type: 'line',
    data: [7.1 ,7.3, 7.0, 6.9, 6.7, 6.6]
  }],
  options: {
    chart: {
      type: 'line',
    },
    stroke: {
      width: [0, 4]
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: ["Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
    yaxis: [{
      title: {
        text: 'Patient Count',
      },
    }, {
      opposite: true,
      title: {
        text: 'Adherence Score'
      }
    }]
  },
};
export default PatientAdherence;