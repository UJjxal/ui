import React from "react";
import Loader from "react-loader-spinner";
import Skeleton from "@material-ui/lab/Skeleton";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

const SpinnerLoader = (props) => {
    return (
        <React.Fragment>
            <Loader
                type={props.type ? props.type : "Bars"}
                height={props.height ? props.height : "30"}
                width={props.width ? props.width : "30"}
                style={props.style ? props.style : {marginTop: "3rem"}}
                className={props.className ? props.className : ""}
                color={props.color ? props.color : "#00BFFF"}
            />
        </React.Fragment>
    );
};

export const ShimmerLoader = () => {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {[...Array(15)].map((e, i) => <Skeleton className='domain-card-skeleton bordered-8' variant="rect"
                                                    width={344} height={312} animation="wave"/>)}
        </div>
    );
};

export const ShimmerLoaderTree = () => {
    return (
        <MDBContainer className="row mt-2 mx-0 px-5 mw-100 bordered-8" style={{width: '100%', height: '600px'}}>

            <MDBRow className="w-100 m-0">
                <MDBCol className="col-3 p-0">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
                <MDBCol className="col-6">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
                <MDBCol className="col-3 p-0">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
            </MDBRow>

            <MDBRow className="w-100 m-0">
                <MDBCol className="col-4 p-0">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
                <MDBCol className="col-4 offset-4 p-0">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
            </MDBRow>

            <MDBRow className='mb-2 shadow d-flex w-100 m-0' style={{height: '600px'}}>

                {/*Legend*/}
                <MDBCol className="col-2 mt-2">
                    <Skeleton className="w-100" variant="rect" animation="wave" height={250}/>
                </MDBCol>

                {/* KPI Tree */}
                <MDBCol className="col-2 d-flex align-items-center offset-1">
                    <Skeleton variant="rect" animation="wave" width={203} height={112}/>
                </MDBCol>
                <MDBCol className="col-2 d-flex align-items-center">
                    <MDBCol className="flex-column p-0">
                        <Skeleton className="mb-5" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                        <div style={{height: '20px'}}></div>
                        <Skeleton className="mt-5" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                    </MDBCol>
                </MDBCol>
                <MDBCol className="col-2 d-flex align-items-center">
                    <MDBCol className="flex-column p-0">
                        <Skeleton className="mb-2" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                        <Skeleton className="mt-2 mb-3" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                        <Skeleton className="mb-2 mt-3" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                        <Skeleton className="mt-2" variant="rect" animation="wave" height={112}
                                  style={{width: '100%'}}/>
                    </MDBCol>
                </MDBCol>

                {/* Zoom In/Out*/}
                <MDBCol className="col-1 offset-2 mt-2">
                    <Skeleton className="w-75" variant="rect" animation="wave" height={112} style={{width: '100%'}}/>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}


export const ShimmerLoaderEditAnalysis = () => {
    return (
        <MDBContainer className="row mt-2 mx-0 px-5 mw-100 bordered-8" style={{width: '100%', height: '600px'}}>

            <MDBRow className="w-100 m-0">
                <MDBCol className="p-0">
                    <Skeleton className='mb-2' variant="rect" animation="wave" style={{width: '100%', height: '50px'}}/>
                </MDBCol>
            </MDBRow>

            <MDBRow className="shadow d-flex w-100 m-0" style={{height: '600px'}}>
                <MDBCol className="col-2">
                    <Skeleton className='m-2 w-100' variant="rect" animation="wave"
                              style={{width: '100%', height: '50px'}}/>
                </MDBCol>
                <MDBCol className="col-10">
                    <MDBRow className="justify-content-center my-4">
                        <Skeleton className="my-2" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                    </MDBRow>
                    <MDBRow className="justify-content-center my-4">
                        <Skeleton className="my-2 mx-5" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                        <Skeleton className="my-2 mx-5" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                    </MDBRow>
                    <MDBRow className="justify-content-center my-4">
                        <Skeleton className="my-2 mx-1" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                        <Skeleton className="my-2 mx-1" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                        <Skeleton className="my-2 mx-1" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                        <Skeleton className="my-2 mx-1" variant="rect" animation="wave" height={112}
                                  style={{width: '203px'}}/>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export const ShimmerLoaderTable = () => {
    return (
        <MDBContainer className="row mt-2 mx-0 mw-100 p-0" style={{height: '600px'}}>
            <MDBCol className="border p-0" style={{borderRadius: '8px'}}>
                <Skeleton className='mb-5' variant="rect" animation="wave"
                          style={{width: '100%', height: '50px', borderRadius: '8px 8px 0 0'}}/>
                <MDBRow className="row justify-content-center">
                    {[...Array(15)].map((e, i) => <Skeleton className='bordered-8 px-5 mb-5' variant="rect" height={15}
                                                            animation="wave" style={{width: '95%'}}/>)}
                </MDBRow>
            </MDBCol>
        </MDBContainer>
    )
}

export const ShimmerLoaderActions = () => {
    return (
        <div className="d-flex flex-wrap py-4 justify-content-center">
            {[...Array(15)].map((e, i) => <Skeleton key={i} className='action-card-skeleton mx-auto mb-4' variant="rect"
                                                    width={416} height={168} animation="wave"/>)}
        </div>
    );
};

export default SpinnerLoader;