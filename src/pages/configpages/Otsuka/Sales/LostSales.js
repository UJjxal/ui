import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CONTEXT} from "../../../../config";
import {ApexBarChart, If} from '../../../../utilities/Controls';
import KeyInsights from './KeyInsights';
import AbondonmentDetail from './AbondonmentDetail';
import FillRateDetail from './FillRateDetail';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import TopActions from "./TopActions";

const FillRate = (props) => {
    let initData = {
        fillRate: {},
        keyInsights: []
    };
    const [d, setData] = useState({...initData});

    let yaxis = [
        {
            title: {text: 'Fill Rate (%)'}, labels: {
                formatter: function (value) {
                    return value + " %";
                }
            }
        },
        {title: {text: 'TRx'}, opposite: true}
    ]

    const init = async () => {
        const result = await axios(`${CONTEXT}/otsuka/sales/lostFillRate.json`);
        if (result.data.code === 200) {
            const res = result.data.response;
            let fillRate = {months: res.fillRate.months, series: res.fillRate.series};
            fillRate.series.forEach((v, i) => {
                v.type = "column";
                if (i === fillRate.series.length - 1) {
                    v.type = "line";
                }
            });
            d.fillRate = fillRate;
            d.keyInsights = res.keyInsights;
            setData({...d});
        } else {
            setData({...initData});
        }
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {/* <MDBCard> */}
            {/* <div className="d-flex pt20 pl20 pr20">
                    <div className="my-auto">
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold uc">
                            Prescription Fill Rate 
                        </MDBCardTitle>
                    </div>
                    <div className="my-auto ml-auto">
                        <Link to={CONTEXT+"/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU2TG9zcyBPZiBTYWxlcw=="}>
                            <MDBIcon icon="share-alt" size="1x" className="cpointer text-primary fs20" />
                        </Link>
                    </div>
                </div> */}

            {/* <MDBCardBody> */}
            <MDBRow className="mingap">
                <MDBCol size="7">
                    <MDBCard border="light">
                        <MDBCardBody>
                            <ApexBarChart
                                title="Fill Rate"
                                titlealign="center"
                                categories={d.fillRate.months}
                                series={d.fillRate.series}
                                yaxis={yaxis}
                                showDatalables={true}
                                showDatalablesOn={[1]}
                                stroke={{width: [0, 4]}}
                                type="line"
                                height="350"
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol size="5">
                    <MDBCard border="light">
                        <MDBCardBody className="p0">
                            <div className="d-flex mb10 pt15 pl15 pr15 pb10 font-weight-bold fs15">
                                <div className="my-auto pt3 text-center flex-grow-1">Key Insights</div>
                                <div className="my-auto ml-auto">
                                    <div style={{overflow: 'hidden', height: '22px'}}>
                                        <Link to={CONTEXT + "/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU5RW5yb2xsbWVudCBLUEk="}>
                                            <span className="material-icons MuiIcon-root"
                                                  aria-hidden="true">device_hub</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="key-insights-ht1">
                                <KeyInsights data={d.keyInsights} dtlPage={props.dtlPage}/>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            {/* </MDBCardBody> */}
            {/* </MDBCard> */}
        </div>
    )
}

const EnrollmentSupport = (props) => {
    let initData = {
        enrollment: {},
        keyInsights: [],
        colors: ["#3f6c51", "#b60000"]
    };
    const [d, setData] = useState({...initData});

    const init = async () => {
        const result = await axios(`${CONTEXT}/otsuka/sales/lostEnrollmentSupport.json`);
        if (result.data.code === 200) {
            const res = result.data.response;
            let enrollment = {categories: res.enrollment.categories, series: res.enrollment.series};
            d.enrollment = enrollment;
            d.keyInsights = res.keyInsights;
            setData({...d});
        } else {
            setData({...initData});
        }
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {/* <MDBCard> */}
            {/* <div className="d-flex pt20 pl20 pr20">
                    <div className="my-auto">
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold uc">
                            Enrollment Support – New Enrollment &amp; Abandonment 
                        </MDBCardTitle>
                    </div>
                    <div className="my-auto ml-auto">
                        <Link to={CONTEXT+"/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU2TG9zcyBPZiBTYWxlcw=="}>
                            <MDBIcon icon="share-alt" size="1x" className="cpointer text-primary fs20" />
                        </Link>
                    </div>
                </div> */}

            {/* <MDBCardBody> */}
            <MDBRow className="mingap">
                <MDBCol size="7">
                    <MDBCard border="light">
                        <MDBCardBody>
                            <ApexBarChart
                                title="Enrollment Support"
                                titlealign="center"
                                categories={d.enrollment.categories}
                                series={d.enrollment.series}
                                yaxis={[{title: {text: 'Patient Count'}}]}
                                showDatalables={true}
                                horizontal={true}
                                colors={d.colors}
                                type="bar"
                                height="350"
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol size="5">
                    <MDBCard border="light">
                        <MDBCardBody className="p0">
                            <div className="d-flex mb10 pt15 pl15 pr15 pb10 font-weight-bold fs15">
                                <div className="my-auto pt3 text-center flex-grow-1">Key Insights</div>
                                <div className="my-auto ml-auto">
                                    <div style={{overflow: 'hidden', height: '22px'}}>
                                        <Link to={CONTEXT + "/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU5RW5yb2xsbWVudCBLUEk="}>
                                            <span className="material-icons MuiIcon-root"
                                                  aria-hidden="true">device_hub</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="key-insights-ht1">
                                <KeyInsights data={d.keyInsights} dtlPage={props.dtlPage}/>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            {/* </MDBCardBody> */}
            {/* </MDBCard> */}
        </div>
    )
}

const LostSales = () => {
    const [d, setData] = useState({
        detailPageName: ''
    });

    const showFillRateDtlPage = () => {
        d.detailPageName = 'FillRate';
        setData({...d});
    }
    const showAbondonmentDtlPage = () => {
        d.detailPageName = 'Abondonment';
        setData({...d});
    }

    const back = () => {
        d.detailPageName = '';
        setData({...d});
    }

    return (
        <div className="font-opensans1">
            <div className="pt10 pb10">
                <If cond={!d.detailPageName}>
                    <TopActions/>

                    <div className="pt15">
                        <div className="mb15">
                            <FillRate dtlPage={showFillRateDtlPage}/>
                        </div>
                        <div className="mb15">
                            <EnrollmentSupport dtlPage={showAbondonmentDtlPage}/>
                        </div>
                    </div>
                </If>

                <If cond={d.detailPageName}>
                    <div className="d-flex mb15">
                        <div className="my-auto ml-auto">
                            <MDBBtn size="sm" className="m0 mr10 blue-bg brd-rds4" onClick={back}>
                                <MDBIcon icon="angle-left" className="mr3"/>
                                Back
                            </MDBBtn>
                        </div>
                    </div>
                    <div>
                        <If cond={d.detailPageName === 'FillRate'}>
                            <FillRateDetail/>
                        </If>
                        <If cond={d.detailPageName === 'Abondonment'}>
                            <AbondonmentDetail/>
                        </If>
                    </div>
                </If>
            </div>
        </div>
    )
}

export default LostSales;