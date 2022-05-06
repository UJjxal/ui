import React, { useState,useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBIcon,
	MDBCard,
	MDBCardTitle,
	MDBCardBody,
	MDBCardText,
	MDBModal,
	MDBModalBody,
	MDBModalFooter,
	MDBCollapse,
	MDBBadge,
	MDBTableBody,
	MDBCardImage,
	MDBTable,
	MDBTableHead,
} from 'mdbreact';
import { Radio, Checkbox, Row, Col, Input, Card, Select, Tabs, Avatar, Button, Icon, Table } from 'antd';

import 'antd/dist/antd.css';
import { CONTEXT } from "../../../../../config";

const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;
const inputGroup = {
padding: "1px 5px",
marginLeft: "13px",
},
inputLabel = {
width: "40%",
background: "rgb(32, 56, 100)",
color: "#fff",
fontWeight: "bold",
textAlign: "center",
height: "32px",
padding: "4px 8px",
margin: "0",
},
select = {
width: "55%",
},
pdL50 = {
paddingLeft: "13%", //"50px"
},
inputLabelWidth = {
width: "50%",
background: "rgb(32, 56, 100)",
color: "#fff",
fontWeight: "bold",
textAlign: "center",
height: "32px",
padding: "4px 8px",
margin: "0",
},
inputGroupR = {
padding: "1px 5px",
marginLeft: "17%",
};
const SyntheticInclusion = (props) => {
		const setCancel = () => {
        props.toggleSCAdisplay();        
    };	
    // const [CTSCA1, setCTSCA1] = useState(null);
    // const [CTSCA2, setCTSCA2] = useState(null);
    // const [EHRSCA1, setEHRSCA1] = useState(null);
	// const [EHRSCA2, setEHRSCA2] = useState(null);
	const [EHRSCAdisplay1, setEHRSCAdisplay1] = useState(false);
    const [EHRSCAdisplay2, setEHRSCAdisplay2] = useState(false);
	const [CTSCAdisplay1, setCTSCAdisplay1] = useState(false);
	const [CTSCAdisplay2, setCTSCAdisplay2] = useState(false);

	const toggleEHRSCA1 = () => {
		setEHRSCAdisplay1(!EHRSCAdisplay1);
		   };
		
		const toggleEHRSCA2 = () => {
		setEHRSCAdisplay2(!EHRSCAdisplay2);
		};
		
		const toggleCTSCA1 = () => {
		setCTSCAdisplay1(!CTSCAdisplay1);
		};
		
		const toggleCTSCA2 = () => {
		setCTSCAdisplay2(!CTSCAdisplay2);
		};
    // useEffect(() => {
	// 	const fetchCTSCA1 = async () => {
	// 		const result = await axios(`${CONTEXT}/Clinical/RWE/viewCTSCA1.json`);
	// 		setCTSCA1(result.data);
    //     };
    //     const fetchCTSCA2 = async () => {
	// 		const result = await axios(`${CONTEXT}/Clinical/RWE/viewCTSCA2.json`);
	// 		setCTSCA2(result.data);
    //     };
    //     const fetchEHRSCA1 = async () => {
	// 		const result = await axios(`${CONTEXT}/Clinical/RWE/viewEHRSCA1.json`);
	// 		setEHRSCA1(result.data);
    //     };
    //     const fetchEHRSCA2 = async () => {
	// 		const result = await axios(`${CONTEXT}/Clinical/RWE/viewEHRSCA2.json`);
	// 		setEHRSCA2(result.data);
    //     };
    //     fetchCTSCA1();
    //     fetchCTSCA2();
    //     fetchEHRSCA1();
    //     fetchEHRSCA2();        
	// }, []);
	let {CTSCA1,  CTSCA2,  EHRSCA1,	EHRSCA2  } = props;
		return (
		<MDBModal isOpen={props.SCAdisplay} toggle={() => setCancel()} className="cascading-modal mt-5" size="fluid">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Synthetic Control Data
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				
            <MDBBtn
className="m-0 p-1"
small
color="text-secondary"
outline
onClick={toggleCTSCA1}
style={{width:'100%'}}
>
<MDBRow className="d-flex justify-content-end" >
<MDBCol size="10" style={inputLabelWidth}>CT SCA 1 Data</MDBCol>
<MDBCol size="2" style={inputLabelWidth}>
<MDBIcon icon={!CTSCAdisplay1 ? 'chevron-right' : 'chevron-down'} />
</MDBCol>
</MDBRow>
</MDBBtn>
<MDBCard className="" style={{ height: '21rem', overflow: 'scroll',display:CTSCAdisplay1 ? 'block' : 'none' }}>
<MDBCardBody className="pt-1" style={{ lineHeight: '11px', overflow: 'scroll' }}>
<MDBTable
small
className="border" border="1"
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
{CTSCA1 ? (
CTSCA1.rows.map((row, index) => {
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
<MDBBtn
className="m-0 p-1"
small
color="text-secondary"
outline
onClick={toggleCTSCA2}
style={{width:'100%'}}
>
<MDBRow className="d-flex justify-content-end" >
<MDBCol size="10" style={inputLabelWidth}>CT SCA 2 Data</MDBCol>
<MDBCol size="2" style={inputLabelWidth}>
<MDBIcon icon={!CTSCAdisplay2 ? 'chevron-right' : 'chevron-down'} />
</MDBCol>
</MDBRow>
</MDBBtn>
<MDBCard className="" style={{ height: '21rem', overflow: 'scroll',display:CTSCAdisplay2 ? 'block' : 'none' }}>
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
{CTSCA2 ? (
CTSCA2.rows.map((row, index) => {
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
<MDBBtn
className="m-0 p-1"
small
color="text-secondary"
outline
onClick={toggleEHRSCA1}
style={{width:'100%'}}
>
<MDBRow className="d-flex justify-content-end" >
<MDBCol size="10" style={inputLabelWidth}>EHR SCA 1 Data</MDBCol>
<MDBCol size="2" style={inputLabelWidth}>
<MDBIcon icon={!EHRSCAdisplay1 ? 'chevron-right' : 'chevron-down'} />
</MDBCol>
</MDBRow>
</MDBBtn>
<MDBCard className="" style={{ height: '21rem', overflow: 'scroll',display:EHRSCAdisplay1 ? 'block' : 'none' }}>
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
{EHRSCA1 ? (
EHRSCA1.rows.map((row, index) => {
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
<MDBBtn
className="m-0 p-1"
small
color="text-secondary"
outline
onClick={toggleEHRSCA2}
style={{width:'100%'}}
>
<MDBRow className="d-flex justify-content-end" >
<MDBCol size="10" style={inputLabelWidth}>EHR SCA 2 Data</MDBCol>
<MDBCol size="2" style={inputLabelWidth}>
<MDBIcon icon={!EHRSCAdisplay2 ? 'chevron-right' : 'chevron-down'} />
</MDBCol>
</MDBRow>
</MDBBtn>
<MDBCard className="" style={{ height: '21rem', overflow: 'scroll',display:EHRSCAdisplay2 ? 'block' : 'none' }}>
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
{EHRSCA2 ? (
EHRSCA2.rows.map((row, index) => {
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
			
				</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn small color="primary" onClick={() => setCancel()}>
					OK
				</MDBBtn>
				
			</MDBModalFooter>
		</MDBModal>
	)
}
export default SyntheticInclusion;
