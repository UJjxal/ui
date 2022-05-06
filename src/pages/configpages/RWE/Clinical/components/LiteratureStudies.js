import React, { useState,useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import { AppContext } from '../../../../../AppProvider';
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
import 'antd/dist/antd.css';

import { Radio, Checkbox, Row, Col, Input, Card, Select, Tabs, Avatar, Button, Icon, Table } from 'antd';
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
const LiteratureStudies = (props) => {
	 const tableValues = (row, index) =>{
		// console.log("Recvd row", row);
		let property = "";
		let valueArray = [];
		for (property in row){
			// console.log("row with prop", row[prop]);
			if(property.toUpperCase() === "ACTIVE"){
				valueArray.push(<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						
						containerClass="mb-4"
					/>)
			}else{
			valueArray.push(row[property]);
			}
		}
		return valueArray;
	}			
	const setCancel = () => {
		props.toggleLiterature();
	};
	return (
		<AppContext.Consumer>
			{({literatureData}) => {

	return (
		<MDBModal isOpen={props.literature} toggle={() => setCancel()} className="cascading-modal mt-5" size="fluid">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Similar Published Articles
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
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Published Literature</th>
<th style={{textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Study Link</th>
</tr>
</MDBTableHead>

<MDBTableBody className="mb-0">
					{literatureData ? (
literatureData.rows.map((row, index) => {
return (
<tr>
<td style={{textAlign:'left',verticalAlign:'middle'}}>{row.pub_lit}</td>
<td>	
<a style={{
cursor: 'pointer',
color: 'blue',
"text-decoration": "underline",
textAlign: 'left',
verticalAlign:'middle'
}} href={row.StudyLink} target="_blank">{row.StudyLink}</a>
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
}}
</AppContext.Consumer>
);
};

export default LiteratureStudies;
