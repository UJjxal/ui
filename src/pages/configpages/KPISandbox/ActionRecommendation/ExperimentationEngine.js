import React from 'react';
import {MDBCard, MDBCardBody} from 'mdbreact';

export default function ExperimentationEngine(props) {
    const createTypes=['A/B Tests', 'Pre/Post Analysis'];

    return (
        <div className="container-fluid">
            <div className="uc fs16 text-primary cpointer" onClick={() => props.handleCardClick('')}>
                    <i className="fa fa-chevron-left"></i> Actions Home
                </div>
            <div className="p10">
                <div className="d-flex justify-content-around">
                    {createTypes.map((type, i) => (
                        <div key={i} className="cpointer" style={{ width: "15%" }} onClick={() => props.handleCardClick(type)}>
                            <MDBCard style={{ height: '7rem', borderRadius: '1%' }}>
                                <MDBCardBody className="d-flex flex-column align-items-center justify-content-center py-0 px-2">
                                    <span className="text-center" style={{ color: '', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                                        {type}
                                    </span>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
