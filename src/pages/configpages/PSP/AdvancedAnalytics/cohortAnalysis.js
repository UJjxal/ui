import React, { useState } from 'react';
import { Modal, Button, DatePicker, Select, Table } from "antd";
import { MDBContainer, MDBTabPane, MDBRow, MDBCard, MDBCardBody, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import moment from 'moment';
import { CONTEXT } from "../../../../config";

import DiscontinuationDrivers from './discontinuationDrivers';
import PatientProfile from './patientProfile';

const CohortAnalysis = () => {
    const [content, setContent] = useState(null);
    const [visible, setVisible] = useState(false);
    const [chart, setChart] = useState(`bar`);

    const handleSetContent = (parms) => {
        setContent(parms)
    }

    const handleFilter = (e, parm) => {
        if(parm === "firstFill" && e !== "ALL"){
            setChart(`pie`)
        }
    }

    return <div className="container">
	<div className="row">
        {content === null ? <>
            <h3 className="my-2">Cohort Analysis</h3>
        <div className="my-4 border p-3 d-flex flex-wrap">
            <div className="mb-2">
                <h6 className="mb-0">Age</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `state`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">0-10</Select.Option>
                    <Select.Option value="">10-20</Select.Option>
                    <Select.Option value="">20-40</Select.Option>
                    <Select.Option value="">04-60</Select.Option>
                    <Select.Option value="">60-80</Select.Option>
                    <Select.Option value="">80+</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Gender</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `payer`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">Male</Select.Option>
                    <Select.Option value="">Female</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Race</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `provider`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">Black</Select.Option>
                    <Select.Option value="">White</Select.Option>
                    <Select.Option value="">Asian</Select.Option>
                    <Select.Option value="">Hispanic</Select.Option> 
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Book of Business</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">Medicaid Part D</Select.Option>
                    <Select.Option value="">Medicaid Part C</Select.Option>
                    <Select.Option value="">Commercial</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Days of Enrollment</h6>
                <DatePicker.RangePicker style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `Date of Enrollment`) }/>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Date of First Fill </h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `firstFill`)}>
                    <Select.Option value="ALL">ALL PERIODS</Select.Option>
                    <Select.Option value="<6 months">{`<6 months`}</Select.Option>
                    <Select.Option value="6-12 months">{`6-12 months`}</Select.Option>
                    <Select.Option value=">12 Months <2 Year">{`>12 Months <2 Year`}</Select.Option>
                    <Select.Option value="<2 yrs">{`<2 yrs`}</Select.Option>
                    <Select.Option value=">2 Years < 4 years">{`>2 Years < 4 years`}</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Date of Last Refill </h6>
                <DatePicker style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `Date of Enrollment`) }/>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Total Fills</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="2 & < 20">{`2 & < 20`}</Select.Option>
                    <Select.Option value="> 20">{`> 20`}</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Month of Discontinuation</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL Periods</Select.Option>
                    <Select.Option value="July 2020">{`Jul 2020`}</Select.Option>
                    <Select.Option value="July 2020">{`Aug 2020`}</Select.Option>
                    <Select.Option value="July 2020">{`Sep 2020`}</Select.Option>
                    <Select.Option value="July 2020">{`Oct 2020`}</Select.Option>
                    <Select.Option value="July 2020">{`Nov 2020`}</Select.Option>
                    <Select.Option value="July 2020">{`Dec 2020`}</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Reason of Discontinuation</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">Financial</Select.Option>
                    <Select.Option value="">Fulfillment</Select.Option>
                    <Select.Option value="">Payer</Select.Option>
                    <Select.Option value="">BV/PA</Select.Option>
                    <Select.Option value="">Side Effect</Select.Option>
                    <Select.Option value="">Death</Select.Option>
                    <Select.Option value="">Switch</Select.Option>
                    <Select.Option value="">Physician Recommendation</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Discontinuation Comments</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">Heart Attack</Select.Option>
                    <Select.Option value="">Switch to Clozaril</Select.Option>
                    <Select.Option value="">Coverage Denied</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Payer Name</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">CVS</Select.Option>
                    <Select.Option value="">Caremark</Select.Option>
                    <Select.Option value="">ESI</Select.Option>
                    <Select.Option value="">Anthem</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Provider ID</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="">BCBS CA</Select.Option>
                    <Select.Option value="">BCBS GA</Select.Option>
                    <Select.Option value="">Keiser</Select.Option>
                    <Select.Option value="">UCLA</Select.Option>
                </Select>
            </div>
		</div>	

        <MDBRow className="mt-1 mx-auto">
            <MDBCard className="mx-2" style={{maxWidth:"350px"}}>
			    <MDBCardBody className="pb-0 text-center">
                    <img src={`${CONTEXT}/static/media/gear.38edfac1.svg`} style={{height: "4rem", width: "4rem"}} />
                        <a onClick={() => setContent("PatientProfile")} className="nav-link Ripple-parent" style={{display: "inline", paddingLeft: "0px"}}>
                            <h5 className="text-center" style={{paddingTop: "1rem"}}>Identify Discontinuation Drivers for patients on Therapy</h5>
                        </a>
		        </MDBCardBody>
		    </MDBCard>
            <MDBCard className="mx-2" style={{maxWidth:"350px"}}>
			    <MDBCardBody className="pb-0 text-center">
                    <img src={`${CONTEXT}/static/media/price.cc209037.svg`} style={{height: "4rem", width: "4rem"}} />
                        <a className="nav-link Ripple-parent" style={{display: "inline", paddingLeft: "0px"}}>
                            <h5 className="text-center" style={{paddingTop: "1rem"}}>Identify Non Adherence Drivers for Patients on  therapy</h5>
                        </a>
		        </MDBCardBody>
		    </MDBCard>
		</MDBRow>        
        
        </>: null}

        {content === "PatientProfile" ? 
        <div>
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-4">
              <PatientProfile profile={chart}/>
          </div>
        </div> : null}
        

    </div>
</div>
}

export default CohortAnalysis;