import React, { useState,useEffect } from 'react';
import axios from 'axios';

import {	
	MDBRow,
	MDBCol,	
	MDBBtn,
	MDBIcon,
	MDBCard,	
	MDBCardBody,	
	MDBModal,
	MDBModalBody,
	MDBModalFooter,	
	MDBTableBody,	
	MDBTable,
	MDBTableHead,
} from 'mdbreact';
import 'antd/dist/antd.css';
import { CONTEXT } from "../../../../../config";


const inputLabelWidth = {
width: "50%",
background: "rgb(32, 56, 100)",
color: "#fff",
fontWeight: "bold",
textAlign: "center",
height: "32px",
padding: "4px 8px",
margin: "0",
};

const CTSCA2Inclusion = (props) => {
		const setCancel = () => {
        props.toggleCTSCA2();        
    };	
    const [CTSCA2data, setCTSCAdata] = useState(null);
    useEffect(() => {
		const fetchCTSCA2data = async () => {
			const result = await axios(`${CONTEXT}/Clinical/RWE/viewCTSCA2.json`);
			setCTSCAdata(result.data);
        };
        fetchCTSCA2data();        
	}, []);
		return (
		<MDBModal isOpen={props.CTSCAdisplay2} toggle={() => setCancel()} className="cascading-modal mt-5" size="fluid">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> CT SCA2 
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
			<MDBRow className="mt-2 d-flex justify-content-around">
<MDBCol>
<MDBCard className="" style={{ height: '21rem' }}>
<MDBCardBody className="pt-1" style={{ lineHeight: '11px', overflow: 'scroll' }}>
<MDBTable
small
className="border" border="1"
style={{ height: '' }}
>
<MDBTableHead style={inputLabelWidth}>
<tr>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Patient ID</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Age</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Gender</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Ethnicity</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Race</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Bladder Cancer</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>COPD</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Gastro</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Hepatitis</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Other Fracture</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Creatinine Median</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Hemoglobin Median</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Platelets Median</th>
<th style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>Bilirubintotal Median</th>
</tr>
</MDBTableHead>
<MDBTableBody className="mb-0">
{CTSCA2data ? (
CTSCA2data.rows.map((row, index) => {
return (
<tr>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}>{row.Patient_Id}</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Age}
</td>
<td

style={{
textAlign: 'left',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Gender}
</td>
<td

style={{
textAlign: 'left',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Ethnicity}
</td>
<td

style={{
textAlign: 'left',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Race}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Bladder_Cancer}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Copd}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Gastro}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Hepatitis}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Other_Fracture}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Creatinine_Median}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Hemoglobin_Median}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Platelets_Median}
</td>
<td

style={{
textAlign: 'center',
lineHeight: 'initial',
'vertical-align': 'middle'
}}
>
{row.Bilirubintotal_Median}
</td>
</tr>

);
})
) : (
<div className="loader">Loading...</div>
)}
</MDBTableBody>
</MDBTable>
</MDBCardBody>
</MDBCard>
</MDBCol>
</MDBRow>				
				</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn small color="primary" onClick={() => setCancel()}>
					OK
				</MDBBtn>
				
			</MDBModalFooter>
		</MDBModal>
	)
}
export default CTSCA2Inclusion;
