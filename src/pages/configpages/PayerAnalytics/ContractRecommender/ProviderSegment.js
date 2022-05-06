import React, { useState } from 'react';

import MapUsa from '../../../../utilities/usamap';
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
import { providersegment } from '../../../../utilities/AllTables_LS';
import { EventImpactCalendar, CustomSegment } from '../../../../utilities/AllTables_LS';
import { Select } from 'antd';
const { Option } = Select;

const ProviderSegment = (props) => {
	

	const setCancel = () => {
		props.toggleSegment();
	};


	return (
		<MDBModal isOpen={props.segment} toggle={() => setCancel()} className="cascading-modal mt-5" size="lg">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Provider Segments to Cover
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2 pr-2 border-0">
							<MDBCardBody className="">
								<span><strong>We recommend to reach the HCOs and HCPs in LIST B through Contract coverage or marketing or both</strong></span>
								<br></br>
								<span>The list has been build in the following flow:</span>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
				<MDBRow>

					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2  pr-2 border-0">
							<MDBCardBody className="p-0">
								<MapUsa states={CustomSegment} width={400} height={400}/>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol className="p-0 mr-2">
						<MDBCard className="text-center pt-1 border-0 mt-3">
							
							<MDBCardBody className="pt-5 mt-5">
							<MDBTable small striped className="border">
							<MDBTableHead color="elegant-color" textWhite>
								<tr>
									{providersegment.header.map((rec, index) => {
										return (
											<th>{rec.label}</th>
										);
									})}
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								{providersegment.fields.map((rec) => {
									return (
										<tr>
											<td>{rec.npi}</td>
											<td>{rec.name}</td>
											<td>{rec.state}</td>
										</tr>
									);
								})}
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
	);
};

export default ProviderSegment;
