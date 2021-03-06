import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import GTNInsights from './GTNInsights';
import {
    MDBBtn,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
} from 'mdbreact';

import {CONTEXT} from '../../../../config';
import BarRangeChart from '../../../../utilities/BarRangeChart';
import {chartFormatPercent} from '../../../../utilities/commonfunctions';
import 'antd/dist/antd.css';
import {BOB, ContractEntity, NDC, ThArea} from '../../../../utilities/AllDropDowns';
import moment from 'moment';
import {DatePicker, Select} from 'antd';

const {RangePicker} = DatePicker;
const {Option} = Select;

const ModelSummary = () => {
    const [data, setData] = useState(null);
    const [gtninsights, setgtninsights] = useState(false);

    const toggleGTNInsights = () => {

        setgtninsights(!gtninsights);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${CONTEXT}/performance/gtn.json`);
            setData(result.data);
        };
        fetchData();
    }, []);
    console.log("fetched data", data);
    return (
        <MDBContainer fluid flexCenter>
            <MDBRow className="d-flex flex-row-reverse">
                <MDBBtnGroup className="mt-3">
                    <MDBBtn size="sm" color="primary" className="mr-3">
                        Export
                    </MDBBtn>
                    <MDBBtn size="sm" color="primary" className="mr-3">
                        Print
                    </MDBBtn>
                    <MDBBtn size="sm" color="primary" className="mr-3">
                        Help
                    </MDBBtn>
                </MDBBtnGroup>
            </MDBRow>
            <MDBRow className="mt-3">
                <MDBCol className="p-0">
                    <MDBCard className="text-center pt-2 pb-4 border border-right-0">
                        <MDBCardTitle tag="h6">Therapeutic Area</MDBCardTitle>
                        <MDBCardBody className="p-0">
                            <Select style={{width: '90%'}} defaultValue={0}>
                                <Option value="">Select Therapeutic Area</Option>
                                {ThArea.map(ent => {
                                    return (<Option value={ent.id}>{ent.value}</Option>)
                                })}
                            </Select>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol className="p-0">
                    <MDBCard className="text-center pt-2 pb-4 border border-left-0 border-right-0">
                        <MDBCardTitle tag="h6">Contracted Entity</MDBCardTitle>
                        <MDBCardBody className="p-0">
                            <Select style={{width: '90%'}} defaultValue={0}>
                                <Option value="">Select Entity</Option>
                                {ContractEntity.map(ent => {
                                    return (<Option value={ent.id}>{ent.value}</Option>)
                                })}
                            </Select>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol className="p-0">
                    <MDBCard className="text-center pt-2 pb-4 border border-right-0 border-left-0">
                        <MDBCardTitle tag="h6">NDC</MDBCardTitle>
                        <MDBCardBody className="p-0">
                            <Select style={{width: '90%'}} defaultValue={0}>
                                <Option value="">Select Drug</Option>
                                {NDC.map(ent => {
                                    return (<Option value={ent.id}>{ent.value}</Option>)
                                })}
                            </Select>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol className="p-0">
                    <MDBCard className="text-center pt-2 pb-4 border border-right-0 border-left-0">
                        <MDBCardTitle tag="h6">BoB</MDBCardTitle>
                        <MDBCardBody className="p-0">
                            <Select style={{width: '90%'}} defaultValue={0}>
                                <Option value="">Select BoB</Option>
                                {BOB.map(ent => {
                                    return (<Option value={ent.id}>{ent.value}</Option>)
                                })}
                            </Select>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>


                <MDBCol className="p-0">
                    <MDBCard className="text-center pt-2 pb-4 border border-left-0">
                        <MDBCardTitle tag="h6">Review Period</MDBCardTitle>
                        <MDBCardBody id="dateranger" className="p-0">
                            <RangePicker
                                defaultValue={[moment('2018/1', 'YYYY-[Q]Q'), moment('2019/4', 'YYYY-[Q]Q')]}
                                format={'YYYY-[Q]Q'}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBRow className="mt-1">

                <MDBCard style={{width: "60%"}}>
                    <MDBCardBody className="pb-0">
                        <MDBCardTitle tag="h5" className="text-center" style={{color: 'black'}}>
                            GTN Performance
                        </MDBCardTitle>
                        <MDBCardText className="text-center">
                            {data ? (
                                <BarRangeChart series={data.series} height={300} formatter={chartFormatPercent}/>
                            ) : (
                                <Loader type="Grid" height={30} width={30} color="#00BFFF"/>
                            )}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard style={{width: "40%"}}>
                    <MDBCardBody className="pl-2 ml-0 pb-0">
                        <MDBCardTitle tag="h5" className="text-center" style={{color: 'black'}}>
                            Key Insights
                        </MDBCardTitle>
                        <MDBCardText>
                            <MDBTable>
                                <MDBTableBody className="mb-0">
                                    {data ? data.keyinsights.map((insight, index) => (
                                        <tr>
                                            <td md="2" className="pt-1">{insight.trend == "down" ?
                                                <MDBIcon className="red-text" size="3x" icon="caret-down"/> :
                                                <MDBIcon size="3x" className="green-text" icon="caret-up"/>
                                            }</td>
                                            <td md="10" className="p-0 pt-1"
                                                onClick={index === 0 ? toggleGTNInsights : null}
                                                style={index === 0 ? {cursor: "pointer", color: "blue"} : null}
                                            >{insight.text}</td>
                                        </tr>
                                    )) : null}
                                </MDBTableBody>
                            </MDBTable>
                            <GTNInsights gtninsights={gtninsights} toggleGTNInsights={toggleGTNInsights}/>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

            </MDBRow>
        </MDBContainer>
    );
};
export default ModelSummary;
