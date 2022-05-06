import React, {useState} from 'react';
import './styles.css';

import DiscontinuationKPI from './discontinuationKPI';
import AdherenceKPI from './adherenceKPI';
import AdherenceKPI3 from './adherenceKPI3';
import AdherenceKPI5 from './adherenceKPI5';
import PatientAdherence from './patientAdherence';
import DiscontinuationCount from './discontinuationCount';

const KeepingPatients = () => {
    const [content, setContent] = useState(null);

    const handleSetContent = (parms) => {
        setContent(parms)
    }
console.log(content)
    return <div className="container">
	<div className="row">
        {content === null ? <>
        <h3 className="my-2 d-none">KPI Dashboard & Data Insights: Illustrative 2</h3>
        <div className="tree d-none">
            <ul className="px-0">
                <li>
                    <a href="#" className="parent">Keeping Patients on Treatment</a>
                    <ul>
                        <li>
                            <a href="#" className="sub-parent">Adherence</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1">#Active Patients</a>
                                    <a onClick={() => setContent("Illustrative V")} className="d-block mb-1 bg-light">Adherence Rate/ Score</a>
                                    <a href="#" className="d-block mb-1">Moving average of active patient </a>
                                    <a href="#" className="d-block mb-1">Average Adherence interval</a>
                                    <a href="#" className="d-block mb-1">Order within 90 days</a>
                                    <a href="#" className="d-block mb-1">Order days lapse</a>
                                    <a onClick={() => setContent("Illustrative III")} className="d-block mb-1 bg-light">Refill Outlier</a>
                                    <a href="#" className="d-block mb-1">Time on Therapy</a>
                                    <a href="#" className="d-block mb-1">Avg. Days in patient journey phase</a>
                                    <a onClick={() => setContent("Illustrative3")} className="d-block mb-1 bg-light">Patient Experience Score</a>

                                </li>
                            </ul>
                        </li>
                        <li>
                            <a onClick={() => setContent("Illustrative IV")} className="sub-parent">Discontinuation</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1"># Discontinued Patients</a>
                                    <a href="#" className="d-block mb-1">Discontinued Rate</a>
                                    <a href="#" className="d-block mb-1">Moving average of discontinued patients</a>
                                    <a href="#" className="d-block mb-1">Patient Switch to %</a>
                                    <a href="#" className="d-block mb-1">Reasons to Switch</a>
                                    <a href="#" className="d-block mb-1">Preferred Brand Choice</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="sub-parent">Payer  Support</a>
                            <ul className="children">
                                <li>
                                    <a href="#" className="d-block mb-1">Time from approval to local reimbursement</a>
                                    <a href="#" className="d-block mb-1">Avg. Claim Pending rate</a>
                                    <a href="#" className="d-block mb-1">Avg. Denial rate </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <div>
          <div className="mb-4">
              <PatientAdherence setContent={(e) => handleSetContent(e)}/>
          </div>
        </div>

        <div>
          <div className="mb-4">
              <DiscontinuationCount />
          </div>
        </div>
        
        
        </>: null}

        {content === "Illustrative IV" ? 
        <div className="w-100">
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
              <DiscontinuationKPI />
          </div>
        </div> : null}

        {content === "Illustrative III" ? 
        <div className="w-100">
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
            <AdherenceKPI />
          </div>
        </div> : null}

        {content === "Illustrative3" ? 
        <div className="w-100">
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
            <AdherenceKPI3 setContent={(e) => handleSetContent(e)}/>
          </div>
        </div> : null}

        {content === "Illustrative V" ? 
        <div className="w-100">
            <button className="btn btn-primary btn-sm mx-0" onClick={() => setContent(null)}>Back</button>
          <div className="mb-5">
              <AdherenceKPI5 setContent={(e) => handleSetContent(e)}/>
          </div>
        </div> : null}

    </div>
</div>
}

export default KeepingPatients;