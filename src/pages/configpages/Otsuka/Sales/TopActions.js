import React from 'react';
import {
	MDBBtnGroup,
	MDBBtn,
    MDBIcon
} from 'mdbreact';

const TopActions=(props)=>{
    return(
        <div className="d-flex">
            <div className="my-auto ml-auto">
                <MDBBtnGroup>
					<MDBBtn size="sm" className="m0 mr10 blue-bg brd-rds4">
                        <MDBIcon icon="file-export" className="mr3" />
						Export
					</MDBBtn>
					<MDBBtn size="sm" className="m0 mr10 blue-bg brd-rds4">
                        <MDBIcon icon="print" className="mr3" />
						Print
					</MDBBtn>
					<MDBBtn size="sm" className="m0 mr10 blue-bg brd-rds4">
                        <MDBIcon far icon="question-circle" className="mr3" />
						Help
					</MDBBtn>
					<MDBBtn size="sm" className="m0 blue-bg brd-rds4">
                        <MDBIcon icon="cog" className="mr3" />
						Settings
					</MDBBtn>
				</MDBBtnGroup>
            </div>
        </div>
    )
}

export default TopActions;