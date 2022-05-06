import { Input, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
	MDBBtn,
	MDBCard, MDBCol,
	MDBIcon,
	MDBModal,
	MDBModalBody,
	MDBModalFooter, MDBRow,
	MDBTable, MDBTableBody,
	MDBTableHead
} from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { CONTEXT } from "../../../../../config";

const { Option } = Select;
const InputGroup = Input.Group;
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
	
const RelativeSites = (props) => {
	const [reachData, setReachData] = useState(null);
    useEffect(() => {
		const siteData = async () => {
			const result = await axios(`${CONTEXT}/Clinical/RWE/NetworkSites.json`);
			setReachData(result.data);
		};
		siteData();
	}, []);    
	const setCancel = () => {
		props.toggleSites();
	};
	return (
		<MDBModal isOpen={props.relative} toggle={() => setCancel()} className="cascading-modal mt-5" size="fluid">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Network Sites Information
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol className="p-0">
						<MDBCard className="text-left pt-1 pb-2 pr-2 border-0">
						<MDBTable mdbTableScroll scrollY="true" className="border" border="1"> 
<MDBTableHead style={inputLabelWidth}>
<tr>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Rank</th>
<th style={{textAlign:'center',verticalAlign:'middle',lineHeight:'normal',width:'36%' }}>Site Name</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>City</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>County</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Ongoing Studies</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Completed Studies</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Enrollment</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Attrition (%)</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Study Patients</th>
</tr>
</MDBTableHead>

<MDBTableBody className="mb-0">
{reachData ? (
reachData.rows.map((row, index) => {
return (
<tr>
<td
style={{
textAlign: 'Center',
}}>{row.Rank}</td>
<td
style={{
textAlign: 'left',
lineHeight: 'normal'
}}
>
{row.SiteName}
</td>
<td
style={{
textAlign: 'left',
}}
>
{row.City}
</td>
<td
style={{
textAlign: 'left',
}}
>
{row.County}
</td>
<td
style={{
textAlign: 'center',
}}
>
{row.OngStudies}
</td>
<td
style={{
textAlign: 'center',
}}
>
{row.Cstudies}
</td>
<td
style={{
textAlign: 'center',
}}
>
{row.Enrollment}
</td>
<td
style={{
textAlign: 'center',
}}
>
{row.Attrition}
</td>
<td
style={{
textAlign: 'center',
}}
>
{row.studypatients}
</td>
</tr>

);
})
) : (
<div className="loader">Loading...</div>
)}
</MDBTableBody>
                    </MDBTable>
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
	);
}
export default RelativeSites;
