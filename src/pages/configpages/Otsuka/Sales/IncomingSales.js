import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CONTEXT} from "../../../../config";
import {ApexBarChart} from '../../../../utilities/Controls';
import KeyInsights from './KeyInsights';
//Sales and Rx Summary and Rx Fulfillment tabs
import {
    MDBCard, 
    MDBCardTitle,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
} from "mdbreact";
import TopActions from "./TopActions";

const MonthlySalesAndGoal=()=>{
    let initData={
        monthlySales:{},
        salesAndgoals:{},
        keyInsights:[]
    };
    const [d, setData]=useState({...initData});

    let monthlySalesYaxis=[
        {title:{text: 'Sales (In $ Millions)'}, labels:{formatter:function (value){return value/1000000;}}},
        {title:{text: 'Calls'}, opposite:true}
    ]

    const init=async()=>{
        const result=await axios(`${CONTEXT}/otsuka/sales/incomingYtdSales.json`);
        if(result.data.code===200){
            const res=result.data.response;
            let monthlyChart={categories:res.monthlySales.months, series:res.monthlySales.series};
            monthlyChart.series.forEach((v,i)=>{
                v.type="column";
                if(i===monthlyChart.series.length-1){
                    v.type="line";
                }
            });
            
            let sg={
                categories:[''],
                series:[
                    {
                        name: "Sales YTD",
                        data: [(res.salesAndgoals.sales/1000000).toFixed(2)]
                    },
                    {
                        name: "Goals YTD",
                        data: [(res.salesAndgoals.goals/1000000).toFixed(2)]
                    }
                ]
            };

            d.monthlySales=monthlyChart;
            d.salesAndgoals=sg;
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
            {/* <MDBCard> */}
                {/* <div className="d-flex pt20 pl20 pr20">
                    <div className="my-auto">
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold uc">
                            YTD Sales performance – against goals 
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
                                        title="Monthly Sales"
                                        titlealign="center"
                                        categories={d.monthlySales.categories}
                                        series={d.monthlySales.series}
                                        yaxis={monthlySalesYaxis}
                                        showDatalables={false}
                                        stroke={{width:[0, 4]}}
                                        type="line"
                                        height="350"
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        {/* <MDBCol size="2">
                            <MDBCard border="light">
                                <MDBCardBody>
                                    <div className="d-flex1 mb10 pl15 pr15 pb10 font-weight-bold fs15">
                                        <div className="my-auto1 text-center">Actual VS Forecast<br />(In Millions)</div>
                                    </div>
                                    <ApexBarChart
                                        title=""
                                        titlealign="center"
                                        categories={d.salesAndgoals.categories}
                                        series={d.salesAndgoals.series}
                                        colors=['#26C281', '#fd7e14']
                                        showDatalables={false}
                                        height="286"
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol> */}

                        <MDBCol size="5">
                            <MDBCard border="light">
                                <MDBCardBody className="p0">
                                    <div className="d-flex mb10 pt15 pl15 pr15 pb10 font-weight-bold fs15">
                                        <div className="my-auto pt3 text-center flex-grow-1">Key Insights</div>
                                        <div className="my-auto ml-auto">
                                            <div style={{overflow:'hidden', height:'22px'}}>
                                                <Link to={CONTEXT+"/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU2U2FsZXMgRHJvcA=="}>
                                                    {/* <MDBIcon icon="share-alt" size="1x" className="cpointer text-primary fs20" /> */}
                                                    <span className="material-icons MuiIcon-root" aria-hidden="true">device_hub</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="key-insights-ht1">
                                        <KeyInsights data={d.keyInsights} />
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

const TrxBreakup=()=>{
    let initData={
        trxBreakups:{},
        keyInsights:[]
    };
    const [d, setData]=useState({...initData});

    let yaxis=[
        {seriesName:'NBRx', title:{text:'Source of Rx'}},
        {seriesName:'NBRx', show:false},
        {seriesName:'NBRx', show:false},
        {seriesName:'NBRx/TRx', title:{text:'NBRx/TRx'}, opposite:true, labels:{formatter:function (value){return value+'%';}}},
    ];

    let dataLabelsFormatter=(val, opts)=>{
        return val+'%';
    }

    const init=async()=>{
        const result=await axios(`${CONTEXT}/otsuka/sales/incomingTrxBreakups.json`);
        if(result.data.code===200){
            const res=result.data.response;
            let trxBreakups={months:res.trxBreakups.months, series:res.trxBreakups.series};
            trxBreakups.series.forEach((v,i)=>{
                v.type="column";
                if(i===trxBreakups.series.length-1){
                    v.type="line";
                }
            });

            d.trxBreakups=trxBreakups;
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
            {/* <MDBCard> */}
                {/* <div className="d-flex pt20 pl20 pr20">
                    <div className="my-auto">
                        <MDBCardTitle tag="h6" className="m0 font-weight-bold">
                            TRx BREAKUP
                        </MDBCardTitle>
                    </div>
                    <div className="my-auto ml-auto">
                        <Link to={CONTEXT+"/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU3U291cmNlIG9mIFJ4"}>
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
                                        title="Source of Rx Distribution"
                                        titlealign="center"
                                        categories={d.trxBreakups.months}
                                        yaxis={yaxis}
                                        series={d.trxBreakups.series}
                                        stacked={true}
                                        showDatalables={true}
                                        showDatalablesOn={[3]}
                                        dataLabelsFormatter={dataLabelsFormatter}
                                        stroke={{width:[0, 0, 0, 4]}}
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
                                            <div style={{overflow:'hidden', height:'22px'}}>
                                                <Link to={CONTEXT+"/QW5hbHlzaXNIdWItUHVibGlzaGVkLTU3U291cmNlIG9mIFJ4"}>
                                                    {/* <MDBIcon icon="share-alt" size="1x" className="cpointer text-primary fs20" /> */}
                                                    <span className="material-icons MuiIcon-root" aria-hidden="true">device_hub</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="key-insights-ht1">
                                        <KeyInsights data={d.keyInsights} />
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

const IncomingSales=()=>{
    return(
        <div className="font-opensans1">
            <div className="pt10 pb10">
                <TopActions />

                <div className="pt15">
                    <div className="mb15">
                        <MonthlySalesAndGoal />
                    </div>
                    <div className="mb15">
                        <TrxBreakup />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomingSales;