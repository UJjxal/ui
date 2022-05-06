import React from "react";
import { Icon } from '@material-ui/core';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

const Tiles = (props) => {
    return (
        <div className="container-fluid">
            <MDBRow>
                {
                    props.tilesDetails.length > 0 ? props.tilesDetails.map(({ label, value, percentage, icon, color, img }, i) => (
                        <MDBCol md="3" key={i}>
                            <MDBCard>
                                <MDBCardBody className="px-3 py-2" style={{height: props.tileStyle && props.tileStyle.height+"px"}}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 style={{ color: "#868686" }}>{label}</h6>
                                            <h3 className="font-weight-bold mt-2 mb-0 text-left">{value}</h3>
                                        </div>
                                        <div>
                                            <h3 className="m-0"><Icon className={`font-weight-bold text-${color}`} style={{ fontSize: "2.3rem" }}>{icon}</Icon></h3>
                                            <h6 className={`font-weight-bold text-${color} text-center`}>{percentage}</h6>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )) : <div className="text-center">No Data</div>
                }
            </MDBRow>
        </div>
    )
}

export default Tiles;