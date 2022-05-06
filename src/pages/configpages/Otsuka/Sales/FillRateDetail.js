import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CONTEXT} from "../../../../config";
import {ApexBarChart} from '../../../../utilities/Controls';
import KeyInsights from './KeyInsights';
import {
    MDBCard, 
    MDBCardTitle,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
} from "mdbreact";

const FillRateDetail=()=>{
    let initData={
        abondonment:{},
        keyInsights:[]
    };
    const [d, setData]=useState({...initData});

    const init=async()=>{
        const result=await axios(`${CONTEXT}/otsuka/sales/lostFillRateDetails.json`);
        if(result.data.code===200){
            const res=result.data.response;
            let abondonment={months:res.abondonment.months, series:res.abondonment.series};
            d.abondonment=abondonment;
            d.keyInsights=res.keyInsights;
            setData({...d});
        }else{
            setData({...initData});
        }
    }

    useEffect(()=>{
        init();
        // eslint-disable-next-line
    }, []);

    return(
        <div>
            <div className="mb15">
                <MDBCard>
                    <MDBCardBody>
                        <div className="d-flex">
                            <div className="my-auto w150 mr15">
                                <label className="mb2 bold600">State</label>
                                <select className="form-control form-control-sm">
                                    <option value="">ALL</option>
                                </select>
                            </div>
                            <div className="my-auto w150 mr15">
                                <label className="mb2 bold600">Payer</label>
                                <select className="form-control form-control-sm">
                                    <option value="">ALL</option>
                                </select>
                            </div>
                            <div className="my-auto w150 mr15">
                                <label className="mb2 bold600">Provider</label>
                                <select className="form-control form-control-sm">
                                    <option value="">ALL</option>
                                </select>
                            </div>
                            <div className="my-auto w150 mr15">
                                <label className="mb2 bold600">Brand/NDC</label>
                                <select className="form-control form-control-sm">
                                    <option value="">ALL</option>
                                </select>
                            </div>
                            <div className="my-auto">
                                <label className="mb2 bold600">Review Period</label>
                                <div className="d-flex">
                                    <div className="my-auto">
                                        <input type="date" className="form-control form-control-sm w150" />
                                    </div>
                                    <div className="my-auto">-</div>
                                    <div className="my-auto">
                                        <input type="date" className="form-control form-control-sm w150" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <MDBRow className="mingap">
                <MDBCol size="7">
                    <MDBCard>
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold uc pt20 pl20 pr20 text-center">
                            Key Reason for Low Fill Rate
                        </MDBCardTitle>
                        <MDBCardBody>
                            <ApexBarChart
                                title=""
                                titlealign="center"
                                categories={d.abondonment.months}
                                yaxis={[{title:{text:'Percentage'}, labels:{formatter:function (value){return value + " %";}}}]}
                                series={d.abondonment.series}
                                stacked={true}
                                showDatalables={false}
                                type="bar"
                                height="350"
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol size="5">
                    <MDBCard>
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold uc pt20 pl20 pr20 text-center">
                            Key Insights
                        </MDBCardTitle>
                        <MDBCardBody className="p0 pt20">
                            <div className="key-insights-ht2">
                                <KeyInsights data={d.keyInsights} />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default FillRateDetail;