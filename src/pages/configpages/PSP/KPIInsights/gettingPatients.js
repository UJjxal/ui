import React, { useState } from 'react';
import { Modal, Button, DatePicker, Select, Table } from "antd";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import './styles.css';

import PriorAuthorizationKPI from './priorAuthorizationKPI';
import AdherenceKPI5 from './adherenceKPI5';
import PaSupport from './paSupport';
import EnrollmentSupport from './enrollmentSupport';
import FirstFulfilment from './firstFulfilment';

const GettingPatients = () => {
    const [content, setContent] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleSetContent = (parms) => {
        setContent(parms)
    }

    return <div className="container">
	<div className="row">
        {content === null ? <>
        <h3 className="my-2 d-none">KPI Dashboard & Data Insights: Illustrative 1</h3>
        <div className="tree d-none">
            <ul className="px-0">
                <li>
                    <a href="#" className="parent">Getting Patients on Product</a>
                    <ul>
                        <li>
                            <a onClick={() => setVisible(true)} className="sub-parent">PA Support</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1"># PA TAT</a>
                                    <a href="#" className="d-block mb-1"># Error % in Data Capture, Submission</a>
                                    <a className="d-block mb-1">Insurance Approval Rate</a>
                                    <a className="d-block mb-1">Insurance claims rejection/ reversal rate</a>
                                    <a onClick={() => setContent("Illustrative II")} className="d-block mb-1 bg-light"># New Patient Abandonment %</a>
                                    <a className="d-block mb-1">Deviation to Std. Requirement List -%</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="sub-parent">Financial Support</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1"># BV, PA verifications</a>
                                    <a href="#" className="d-block mb-1">Patient out of pocket</a>
                                    <a href="#" className="d-block mb-1">Co-pay Penetration</a>
                                    <a href="#" className="d-block mb-1">Average Co-pay burden</a>
                                    <a href="#" className="d-block mb-1">Conversion rate</a>
                                    <a href="#" className="d-block mb-1">% of patient cost sharing</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="sub-parent">Fulfillment</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1">Time to fill</a>
                                    <a href="#" className="d-block mb-1">Average Time to Therapy</a>
                                    <a href="#" className="d-block mb-1">Total / Avg. Gap Days</a>
                                    <a href="#" className="d-block mb-1">Turnaround time</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="sub-parent">Enrollment Support</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1"># New Patients</a>
                                    <a href="#" className="d-block mb-1">Moving average of New  patient</a>
                                    <a href="#" className="d-block mb-1">Switch to my product</a>
                                    <a href="#" className="d-block mb-1">Patient Count by Gender/ Age</a>
                                    <a href="#" className="d-block mb-1">Brand perception</a>
                                    <a href="#" className="d-block mb-1">Safety perception</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
	    
        <div>
          <div className="mb-4">
              <PaSupport />
          </div>
        </div>
        
        <div>
          <div className="mb-4">
              <EnrollmentSupport setContent={(e) => handleSetContent(e)}/>
          </div>
        </div>

        <div>
          <div className="mb-4">
              <FirstFulfilment />
          </div>

        </div>
        
        
        </>: null}
     
        {content === "Illustrative II" ? 
        <div>
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
            <PriorAuthorizationKPI />
          </div>
        </div> : null}

        {content === "Illustrative V" ? 
        <div>
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
              <AdherenceKPI5 />
          </div>
        </div> : null}
        

    </div>
    <Modal
        top
        title="KPI Dashboard & Data Insights: Illustrative I Prior Authorization"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1200}
        footer={[<Button key="back" onClick={() => setVisible(false)}>Close</Button>]}
      >
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
      </Modal>
</div>
}

const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'KPI Name',
        dataIndex: 'KPIName',
        key: 'KPIName',
      },
      {
        title: 'KPI Definition',
        dataIndex: 'KPIDefinition',
        key: 'KPIDefinition',
      },
      {
        title: 'KPI Measurement',
        dataIndex: 'KPIMeasurement',
        key: 'KPIMeasurement',
      },
      {
        title: 'KPI Type',
        dataIndex: 'KPIType',
        key: 'KPIType',
      },
      {
        title: 'Desired State',
        dataIndex: 'DesiredState',
        key: 'DesiredState',
      }
]
const dataSource = [{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
}
];
export default GettingPatients;