import React from 'react';
import {CONTEXT} from "../../../../config";
import {NavLink} from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
} from 'mdbreact';

import Chart from "react-apexcharts";

const EnrollmentSupport = (props) => {

    return (
        <MDBContainer fluid flexCenter>
            <MDBRow className="mt-1">
                <MDBCard style={{width: "calc(40% - 10px)", marginRight: "10px"}}>
                    <MDBCardBody className="pb-0">
                        <MDBCardTitle tag="h5">
                            Enrollment Support – New Enrollment & Abandonment
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

                <MDBCard style={{width: "60%"}}>
                    <MDBCardBody className="pl-2 ml-0 pb-0">
                        <MDBCardTitle tag="h5" className="text-center text-dark">
                            Key Insights
                            <NavLink to={CONTEXT + "/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU5RW5yb2xsbWVudCBLUEk="}
                                     style={{right: "26px"}}
                                     className="position-absolute ml-3">
                    <span title="View Analysis" class="material-icons"
                          style={{
                              verticalAlign: "middle",
                              fontSize: "24px",
                          }}>device_hub</span>
                            </NavLink>
                        </MDBCardTitle>
                        <MDBCardText>
                            <MDBTable>
                                <MDBTableBody className="mb-0">
                                    <tr>
                                        <td className="align-middle">
                                            <MDBIcon className="green-text" size="2x" icon="circle"/>
                                        </td>
                                        <td className="align-middle"><h5 className="text-nowrap mb-0">Total
                                            Enrollment</h5></td>
                                        <td className="align-middle pr-0"><h5
                                            className="mb-0 font-weight-bold">23517</h5></td>
                                        <td md="2" className="pl-1 align-middle">
                                            <MDBIcon className="green-text" size="3x" icon="caret-up"/>
                                        </td>
                                        <td md="10" className="p-0 pt-1">
                                            {`• Enrollment for Brand A increased by 12%, Brand B increased by 9% in Dec '20`}<br/>
                                            {`• Total Enrollment declined from 18% to 11% between Nov '20 to Dec '20`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle">
                                            <MDBIcon className="green-text" size="2x" icon="circle"/>
                                        </td>
                                        <td className="align-middle"><h5 className="text-nowrap mb-0">New
                                            Enrollment</h5></td>
                                        <td className="align-middle pr-0"><h5
                                            className="mb-0 font-weight-bold text-right">3453</h5></td>
                                        <td md="2" className="pl-1 align-middle">
                                            <MDBIcon className="green-text" size="3x" icon="caret-up"/>
                                        </td>
                                        <td md="10" className="p-0 pt-1">
                                            {`• New Enrollment through Anthem and CVS has decreased more than 20 %`}<br/>
                                            {`• ND, NC and AZ has lowest New Enrollments (less than 200)`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle">
                                            <MDBIcon className="red-text" size="2x" icon="circle"/>
                                        </td>
                                        <td className="align-middle"><h5 className="text-nowrap mb-0">Abandonment</h5>
                                        </td>
                                        <td className="align-middle pr-0"><h5
                                            className="mb-0 font-weight-bold text-right">21%</h5></td>
                                        <td md="2" className="pl-1 align-middle">
                                            <MDBIcon className="red-text" size="3x" icon="caret-up"/>
                                        </td>
                                        <td md="10" className="p-0 pt-1">
                                            {`• Patient Abandonment from CA, GA and MA  is greater than 500 in Dec '20`}<br/>
                                            <a onClick={() => props.setContent(`Illustrative II`)} style={{
                                                cursor: "pointer",
                                                color: "blue",
                                                textDecoration: "underline"
                                            }}>{`• Switch to Competition drug is the key Abandonment reason from Jul '20 - Dec '20`}</a>
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
    series: [{
        name: "New Enrollment",
        data: [1450, 1294, 1854, 1964, 1910, 1885]
    }, {
        name: "New Patient Abondonment",
        data: [3304, 2598, 1109, 810, 668, 535]
    }],
    options: {
        chart: {
            type: 'bar',
            height: 430
        },
        fill: {
            colors: ['#4caf50', '#f44336']
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        legend: {
            markers: {
                fillColors: ['#4caf50', '#f44336']
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: 30,
            style: {
                fontSize: '11px',
                colors: ['#000'],
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: ["Dec '20", "Nov '20", "Oct '20", "Sep '20", "Aug '20", "Jul '20"],
        }
    },
};
export default EnrollmentSupport;