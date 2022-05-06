import React from 'react';
import {CONTEXT} from "../../../../config";
import {NavLink} from 'react-router-dom';
import {MDBCard, MDBCardBody, MDBCardTitle, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody,} from 'mdbreact';

import Chart from "react-apexcharts";

const DiscontinuationCount = () => {

    return (
        <MDBContainer fluid flexCenter>
            <MDBRow className="mt-1">
                <MDBCard style={{width: "calc(40% - 10px)", marginRight: "10px"}}>
                    <MDBCardBody className="pb-0">
                        <MDBCardTitle tag="h5">
                            Discontinuation Count
                        </MDBCardTitle>
                        <div className="text-center">
                            <Chart
                                options={dataChart.options}
                                series={dataChart.series}
                                type="bar"
                            />
                        </div>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard style={{width: "60%"}}>
                    <MDBCardBody className="pl-2 ml-0 pb-0">
                        <MDBCardTitle tag="h5" className="text-center text-dark">
                            Key Insights
                            <NavLink to={CONTEXT + "/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU3U291cmNlIG9mIFJ4"}
                                     style={{right: "26px"}}
                                     className="position-absolute ml-3">
                    <span title="View Analysis" class="material-icons"
                          style={{
                              verticalAlign: "middle",
                              fontSize: "24px",
                          }}>device_hub</span>
                            </NavLink>
                        </MDBCardTitle>
                        <MDBTable>
                            <MDBTableBody className="mb-0">
                                <tr>
                                    <td className="align-middle">
                                        <MDBIcon className="red-text" size="2x" icon="circle"/>
                                    </td>
                                    <td className="align-middle"><h5 className="mb-0"># Discontinued</h5></td>
                                    <td className="align-middle pr-0"><h5
                                        className="mb-0 font-weight-bold text-right">6347</h5></td>
                                    <td md="2" className="pl-1 align-middle">
                                        <MDBIcon className="red-text" size="3x" icon="caret-up"/>
                                    </td>
                                    <td md="10" className="p-0 pt-1">
                                        {`• Discontinuation % has increased from 41% to 47% between Nov '20 - Dec '20`}<br/>
                                        {`• Patients Discontinued from CA, AL, GA  and MA in Dec '20 is more than 2000`}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <MDBIcon className="red-text" size="2x" icon="circle"/>
                                    </td>
                                    <td className="align-middle"><h5 className="mb-0">Discontinuation Drivers</h5></td>
                                    <td className="align-middle pr-0"><h5
                                        className="mb-0 font-weight-bold text-right">Financial</h5></td>
                                    <td md="2" className="pt-1 align-middle">
                                        &nbsp;
                                    </td>
                                    <td md="10" className="p-0 pt-1">
                                        {`• Financial is the biggest Discontinuation Driver (36%)`}<br/>

                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <MDBIcon className="green-text" size="2x" icon="circle"/>
                                    </td>
                                    <td className="align-middle"><h5 className="mb-0">Switched To</h5></td>
                                    <td className="align-middle pr-0"><h5
                                        className="mb-0 font-weight-bold text-right">Brand A</h5></td>
                                    <td md="2" className="pt-1 align-middle">
                                        <MDBIcon className="green-text" size="3x" icon="caret-up"/>
                                    </td>
                                    <td md="10" className="p-0 pt-1">
                                        {`• Switch to Brand A has increased from 12% to 19% between Nov '20 - Dec '20`}<br/>
                                        {`• Switch to Brand B leading to discontinuation in Dec '20 has been 2.4%`}
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
        name: "Patient Count",
        data: [6347, 5434, 5321, 4345, 3404, 3102]
    }],
    options: {
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: ["Dec '20", "Nov '20", "Oct '20", "Sep '20", "Aug '20", "Jul '20"],
            title: {
                text: 'Patient Count'
            }
        }
    },
};
export default DiscontinuationCount;