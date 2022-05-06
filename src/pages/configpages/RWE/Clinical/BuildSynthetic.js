import React, { useState, useEffect } from 'react';
import { Radio, Checkbox, Row, Col, Input, Card, Select, Tabs, Avatar, Button, Icon, Table } from 'antd';

import Loader from 'react-loader-spinner';
import InclusionExclusionCriteria from './components/InclusionExclusionCriteria';
import MatchClinicalInclusion from './components/MatchClinicalInclusion';
import AgeDistribution from '../../../../assets/AgeDistribution.png';
import GenderDistribution from '../../../../assets/GenderDistribution.png';
import RaceDistribution from '../../../../assets/RaceDistribution.png';
// import Slider from 'react-rangeslider';
import EHRSCA1display from './components/EHRSCA1';
import EHRSCA2display from './components/EHRSCA2';
import CTSCA1display from './components/CTSCA1';
import CTSCA2display from './components/CTSCA2';
// import 'react-rangeslider/lib/index.css';
import './clinical.css';
import {
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,

    MDBCardText,

    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCol,
    MDBInput,
    MDBIcon,

    MDBBtn,

} from 'mdbreact';
import {

    VitalsList,
    IncExcList,
    ConditionList,
    YesNoList,
    DemographicVarList,
    DemographicGenderList,
    IndicationList,
    outcomes, RWEVariable, comparatordrug, RCTArms, SCAArms
} from '../../../../utilities/AllDropDowns';
const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;
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


const BuildSynthetic = (props) => {
    const [relative, setRelative] = useState(false);
    const [radio, setRadio] = useState(0);
    const [primary, setPrimary] = useState(false);
    const [EHRSCAdisplay1, setEHRSCAdisplay1] = useState(false);
    const [EHRSCAdisplay2, setEHRSCAdisplay2] = useState(false);
    const [CTSCAdisplay1, setCTSCAdisplay1] = useState(false);
    const [CTSCAdisplay2, setCTSCAdisplay2] = useState(false);
    const [volume, setVolume] = useState(33);
    const [indiDisplay, setIndiDisplay] = useState(false);
    const [demoDisplay, setDemoDisplay] = useState(false);
    const [vitalDisplay, setVitalDisplay] = useState(false);
    const [indiDisplay2, setIndiDisplay2] = useState(false);
    const [demoDisplay2, setDemoDisplay2] = useState(false);
    const [vitalDisplay2, setVitalDisplay2] = useState(false);

    const onClick = nr => {
        setRadio(nr);
    };

    const toggleIndiDisplay = () => {
        setIndiDisplay(!indiDisplay);
    };
    const toggleDemoDisplay = () => {
        setDemoDisplay(!demoDisplay);
    };
    const toggleVitalDisplay = () => {
        setVitalDisplay(!vitalDisplay);
    };

    const toggleIndiDisplay2 = () => {
        setIndiDisplay2(!indiDisplay2);
    };
    const toggleDemoDisplay2 = () => {
        setDemoDisplay2(!demoDisplay2);
    };
    const toggleVitalDisplay2 = () => {
        setVitalDisplay2(!vitalDisplay2);
    };

    const toggleEHRSCA1 = () => {
        setEHRSCAdisplay1(!EHRSCAdisplay1);
    };

    const toggleEHRSCA2 = () => {
        setEHRSCAdisplay2(!EHRSCAdisplay2);
    };

    const toggleCTSCA1 = () => {
        setCTSCAdisplay1(!CTSCAdisplay1);
    };

    const toggleCTSCA2 = () => {
        setCTSCAdisplay2(!CTSCAdisplay2);
    };
    const tableValues = (row, index) => {
        // console.log("Recvd row", row);
        let property = "";
        let valueArray = [];
        for (property in row) {
            // console.log("row with prop", row[prop]);
            if (property.toUpperCase() === "VIEW") {
                valueArray.push(<MDBInput
                    style={{ height: '1.2rem', width: '1.2rem', textAlign: 'center', 'vertical-align': 'middle', 'margin-left': '10px' }}
                    onClick={() => onClick(index)}
                    checked={radio === index ? true : false}
                    label=""
                    type="radio"
                    id={`radio${index}`}
                    containerClass="mb-4"
                />)
            }
            else {
                valueArray.push(row[property]);
            }
        }
        return valueArray;
    }
    const toggleExclusion = () => {
        setPrimary(!primary);
    };

    const toggleInclusion = () => {
        setRelative(!relative);
    };

    let { ndc, EHRData, clinicalTrialData,briefTitle, loadRCTData, viewRCTData, demoData,
        indicationList, demographicList, vitalList } = props;

    return (
        <React.Fragment>
            <Row >

                <Col style={{ width: '100%', "margin-bottom": "-9px" }}>

                    <Card
                        className="ant-card-small"
                        style={{ margin: "0 10px 10px 0" }}

                    >
                        <Tabs
                            defaultActiveKey="1"
                            animated={false}
                            tabPosition="top"
                            className="tabCustomization"
                            style={{ "margin-top": "-6px" }}

                        >
                            <TabPane tab="RCT Arms" key={1}>
                                <div className="row">
                                    <div className="" style={{ width: '40%' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Study ID</label>
                                                <input className="ant-select-selection ant-select-selection--single"
                                                    type="text" value={ndc} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                            </InputGroup>
                                            <input className="clinical-input ant-select-selection ant-select-selection--single"
                                                type="text" value='Inclusion/Exclusion Criteria' onClick={toggleInclusion} readOnly />
                                            <InclusionExclusionCriteria relative={relative} toggleInclusion={toggleInclusion}
                                                indicationList={indicationList}
                                                demographicList={demographicList}
                                                vitalList={vitalList}

                                            />
                                        </React.Fragment>
                                    </div>
                                    <div className="" style={{ width: '60%', marginLeft: '-24px' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={{
                                                    width: "30%",
                                                    background: "rgb(32, 56, 100)",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    height: "32px",
                                                    padding: "4px 8px",
                                                    marginBottom: "0px"
                                                }}>Brief Title</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '70%', "padding-top": "0px", height: "62px", resize: 'none' }} readOnly>{briefTitle}</textarea>
                                            </InputGroup>
                                        </React.Fragment>
                                    </div>
                                </div>
                                <Row style={{ marginRight: '-6px' }}>
                                    <Col style={{ width: '100%' }}>
                                        <Card
                                            className="ant-card-small"
                                            style={{ margin: "0 10px 10px 0" }}
                                        >
                                            <Tabs
                                                defaultActiveKey="1"
                                                animated={false}
                                                tabPosition="top"
                                                style={{ "margin-top": "-6px" }}
                                                className="tabCustomization"
                                            >
                                                <TabPane tab="Load RCT Arms" key={1}>
                                                    <div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
                                                        <MDBCard className="" style={{ height: '9rem' }}>
                                                            <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '102%' }}>
                                                                <MDBTable
                                                                    small
                                                                    className="border" border="1"
                                                                    style={{ height: '5rem' }}
                                                                >
                                                                    <MDBTableHead style={inputLabelWidth}>
                                                                        <tr>
                                                                            <th style={{ width: '4%', textAlign: 'left' }}>Arm Label</th>
                                                                            <th style={{ width: '5%' }}>Intervention Drug</th>
                                                                            <th style={{ width: '8%' }}>Drug Dosage</th>
                                                                            <th style={{ width: '5%' }}>Patients Count</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody className="mb-0">
                                                                        {loadRCTData ? (
                                                                            loadRCTData.rows.map((row, index) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                lineHeight: 'initial'
                                                                                            }}>{row.arm_label}</td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                lineHeight: 'initial'
                                                                                            }}
                                                                                        >
                                                                                            {row.int_drug}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                lineHeight: 'initial'
                                                                                            }}
                                                                                        >
                                                                                            {row.dose}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial'
                                                                                            }}
                                                                                        >
                                                                                            {row.pat_count}
                                                                                        </td>
                                                                                    </tr>

                                                                                );
                                                                            })
                                                                        ) : (
                                                                            <div className="loader">Loading...</div>
                                                                        )}
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                                <a style={{
                                                                    "text-decoration": "underline",
                                                                    width: '100%',
                                                                    position: 'absolute',
                                                                    marginLeft: '-30px',
                                                                    textAlign: 'end',
                                                                    cursor: 'pointer',
                                                                    color: 'blue',
                                                                }}> Load RCT Arm(s)
                                                                </a>
                                                            </MDBCardBody>

                                                        </MDBCard>
                                                    </div>
                                                </TabPane>
                                                <TabPane tab="View RCT Arms " key={2}>
                                                    <div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
                                                        <MDBCard className="" style={{ height: '21rem', overflow: 'scroll' }}>
                                                            <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '112%' }}>
                                                                <MDBTable
                                                                    small
                                                                    className="border" border="1"
                                                                    style={{ height: '' }}
                                                                >
                                                                    <MDBTableHead style={inputLabelWidth}>
                                                                        <tr>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '2%'
                                                                            }}>Patient ID</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '2%'
                                                                            }}>Age</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle'
                                                                            }}>Gender</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '20%'
                                                                            }}>Ethnicity</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '23%'
                                                                            }}>Race</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Bladder Cancer</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>COPD</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Gastro</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Hepatitis</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Other Fracture</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Creatinine Median</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle'
                                                                            }}>Hemoglobin Median</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Platelets Median</th>
                                                                            <th style={{
                                                                                textAlign: 'center',
                                                                                lineHeight: 'initial',
                                                                                'vertical-align': 'middle',
                                                                                width: '1%'
                                                                            }}>Bilirubintotal Median</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody className="mb-0">
                                                                        {viewRCTData ? (
                                                                            viewRCTData.rows.map((row, index) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}>{row.Patient_Id}</td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Age}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Gender}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Ethnicity}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'left',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Race}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Bladder_Cancer}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Copd}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Gastro}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Hepatitis}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Other_Fracture}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Creatinine_Median}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Hemoglobin_Median}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Platelets_Median}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                textAlign: 'center',
                                                                                                lineHeight: 'initial',
                                                                                                'vertical-align': 'middle'
                                                                                            }}
                                                                                        >
                                                                                            {row.Bilirubintotal_Median}
                                                                                        </td>
                                                                                    </tr>

                                                                                );
                                                                            })
                                                                        ) : (
                                                                            <div className="loader">Loading...</div>
                                                                        )}
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="SCA Arms" key={2}>
                                <div className="row">
                                    <div className="" style={{ width: '40%' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Study ID</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={ndc} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                            </InputGroup>
                                            <input className="clinical-input ant-select-selection ant-select-selection--single"
                                                type="text" value='Inclusion/Exclusion Criteria' onClick={toggleInclusion} readOnly />
                                            <InclusionExclusionCriteria relative={relative} toggleInclusion={toggleInclusion}
                                                indicationList={indicationList}
                                                demographicList={demographicList}
                                                vitalList={vitalList}

                                            />
                                        </React.Fragment>
                                    </div>
                                    <div className="" style={{ width: '60%', marginLeft: '-24px' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={{
                                                    width: "30%",
                                                    background: "rgb(32, 56, 100)",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    height: "32px",
                                                    padding: "4px 8px",
                                                    marginBottom: "0px"
                                                }}>Brief Title</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '70%', "padding-top": "0px", height: "62px", resize: 'none' }} readOnly>{briefTitle}</textarea>
                                            </InputGroup>
                                        </React.Fragment>
                                    </div>
                                </div>
                                <Row style={{ marginRight: '-6px' }}>
                                    <Col style={{ width: '100%' }}>
                                        <Card
                                            className="ant-card-small"
                                            style={{ margin: "0 10px 10px 0" }}
                                        >
                                            <Tabs
                                                defaultActiveKey="1"
                                                animated={false}
                                                tabPosition="top"
                                                style={{ "margin-top": "-6px" }}
                                                className="tabCustomization"
                                            >
                                                <TabPane tab="Set SCA Filters" key={1}>
                                                    <div className="row" >
                                                        <div className="" style={{ width: '100%' }}>
                                                            <React.Fragment>
                                                                <InputGroup style={inputGroup} compact>
                                                                    <label style={{
                                                                        width: "14%",
                                                                        background: "rgb(32, 56, 100)",
                                                                        color: "#fff",
                                                                        fontWeight: "bold",
                                                                        textAlign: "center",
                                                                        height: "32px",
                                                                        padding: "4px 8px",
                                                                        margin: "1px",
                                                                        marginRight: "3px"
                                                                    }}>Comparator drug</label>
                                                                    <Select
                                                                        style={{ width: "28%", fontWeight: '400', height: '32px', overflow: 'scroll', 'overflow-x': 'hidden' }}
                                                                        mode="multiple"
                                                                        defaultValue={[5, 8]}
                                                                    >
                                                                        {comparatordrug.map((el) => {
                                                                            return (
                                                                                <Option value={el.id}>
                                                                                    {el.value}</Option>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                    <label compact style={{
                                                                        width: "14%",
                                                                        background: "rgb(32, 56, 100)",
                                                                        color: "#fff",
                                                                        fontWeight: "bold",
                                                                        textAlign: "center",
                                                                        height: "32px",
                                                                        padding: "4px 8px",
                                                                        margin: "1px",
                                                                        marginLeft: "5px",
                                                                        marginRight: "3px"
                                                                    }}>Select outcomes</label>
                                                                    <Select
                                                                        style={{ width: "40%", fontWeight: '400', height: '32px', overflow: 'scroll', 'overflow-x': 'hidden' }}
                                                                        mode="multiple"
                                                                        defaultValue={['Overall Survival (OS)', 'Adverse Events (AE/SAE)']}
                                                                    // placeholder="Overall Survival (OS) Adverse Events (AE/SAE)"
                                                                    // maxTagCount={5}

                                                                    >
                                                                        {outcomes.map((el) => {
                                                                            return (
                                                                                <Option value={el.value}>
                                                                                    {el.value}</Option>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                    <label style={{
                                                                        width: "14%",
                                                                        background: "rgb(32, 56, 100)",
                                                                        color: "#fff",
                                                                        fontWeight: "bold",
                                                                        textAlign: "center",
                                                                        height: "32px",
                                                                        padding: "4px 8px",
                                                                        margin: "1px",
                                                                        marginLeft: "1px",
                                                                        marginTop: "2px",
                                                                        marginRight: "3px"
                                                                    }}>RWE Data</label>
                                                                    <Select
                                                                        style={{ width: "43%", fontWeight: '400', height: '32px', overflow: 'scroll', 'overflow-x': 'hidden', marginTop: "2px" }}
                                                                        mode="multiple"
                                                                        defaultValue={['Past Clinical Trials', 'Electronic Health Records']}

                                                                    >
                                                                        {RWEVariable.map((el) => {
                                                                            return (
                                                                                <Option value={el.value}>
                                                                                    {el.value}</Option>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                </InputGroup>
                                                            </React.Fragment>
                                                        </div>
                                                    </div>
                                                    <MDBContainer>
                                                        <div class="row">

                                                            <div class="col-md-7">
                                                                <label class="p-1 mt-1 font-weight-bold text-center w-100 text-white"
                                                                    style={{ background: "rgb(32, 56, 100)", height: "32px" }}>EHR</label>

                                                                <div class="row align-items-center">
                                                                    <div class="col-4">
                                                                        <label class="font-weight-bold">Patients universe:</label>
                                                                        <div class="w-100"></div>
                                                                        <label class="font-weight-bold">Filtered Patients:</label>
                                                                    </div>
                                                                    <div class="col-2 p-1 w-100">
                                                                        <input type="text" value='7460' />
                                                                        <div class="w-100"></div>
                                                                        <input type="text" value='540' />
                                                                    </div>

                                                                    <div class="col-4">
                                                                        <svg style={{ height: '120px', marginLeft: '100px' }}>
                                                                            <circle cx="75" cy="62" r="57" fill="#A8CAF1" />
                                                                        </svg>
                                                                        <svg style={{ position: 'absolute', top: '15px', left: '8px', marginLeft: '100px', height: '200px' }}>
                                                                            <circle cx="82" cy="47" r={volume / 2 + 7} fill="#0451AA" />
                                                                        </svg>
                                                                    </div>
                                                                </div>


                                                                <label class="p-1 mt-1 font-weight-bold text-center w-100 text-white"
                                                                    style={{ background: "rgb(32, 56, 100)", height: "32px" }}>CT</label>
                                                                <div class="row align-items-center">
                                                                    <div class="col-4">
                                                                        <label class="font-weight-bold">Clinical Trial Universe:</label>
                                                                        <div class="w-100"></div>
                                                                        <label class="font-weight-bold">Filtered Clinical Trials:</label>
                                                                    </div>
                                                                    <div class="col-2 p-1 w-100">
                                                                        <input type="text" value='75' />
                                                                        <div class="w-100"></div>
                                                                        <input type="text" value='53' />
                                                                    </div>
                                                                    <div class="col-4">
                                                                        <svg style={{ margin: '0', height: '122px', marginLeft: '-26px' }}>
                                                                            <circle cx="200" cy="64" r="57" fill="#F59673" />
                                                                        </svg>

                                                                        <svg style={{ position: 'absolute', top: '-1px', left: '15px', marginLeft: '-26px', height: '200px' }}>
                                                                            <circle cx="200" cy="65" r={volume / 1.5 - 9} fill="#E9470A" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-5">
                                                                <React.Fragment>
                                                                    <Row style={{ marginRight: '12px', marginLeft: '-11px', "font-weight": "bold" }}>
                                                                        <Col style={{ width: '100%' }}>
                                                                            <Card
                                                                                className="ant-card-small"
                                                                                style={{ margin: "0 10px 10px 0" }}
                                                                            >
                                                                                <Tabs
                                                                                    defaultActiveKey="1"
                                                                                    animated={false}
                                                                                    tabPosition="top"
                                                                                    className="tabCustomization"
                                                                                    style={{ "margin-top": "-6px" }}

                                                                                >
                                                                                    <TabPane tab="Match SCA with RCT I/E criteria" key={1}>
                                                                                        <MDBRow className="mt-2 d-flex justify-content-around">
                                                                                            <MDBCol>
                                                                                                <MDBCard className="" style={{ height: '23rem', "margin-left": "-12px" }}>
                                                                                                    <MDBCardBody style={{ overflowY: 'scroll', "margin-top": "-25px" }}>
                                                                                                        <MDBCardText className="d-flex flex-column mt-2" >
                                                                                                            <InputGroup style={inputGroup} compact>
                                                                                                                <label style={{
                                                                                                                    width: "40%",
                                                                                                                    background: "rgb(32, 56, 100)",
                                                                                                                    color: "#fff",
                                                                                                                    fontWeight: "bold",
                                                                                                                    textAlign: "center",
                                                                                                                    height: "32px",
                                                                                                                    padding: "4px 8px",
                                                                                                                    margin: "1px",
                                                                                                                    marginLeft: "-20px",
                                                                                                                    "margin-top": "9px"
                                                                                                                }}>Matching Caliper(%)</label>
                                                                                                                <div style={{ width: '54%' }}>
                                                                                                                    {/* <Slider
                                                                                                                        value={volume}
                                                                                                                        tooltip={false}
                                                                                                                        orientation="horizontal"
                                                                                                                        onChange={(e) => setVolume(e)}
                                                                                                                    /> */}
                                                                                                                </div>
                                                                                                                <input style={{ width: '36px', 'margin-top': '12px', 'margin-left': '5px', border: 'antiquewhite' }} value={volume + '%'}
                                                                                                                ></input>
                                                                                                            </InputGroup>
                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1"
                                                                                                                small
                                                                                                                color="text-secondary"
                                                                                                                outline
                                                                                                                onClick={toggleIndiDisplay}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Indication Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!indiDisplay ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>
                                                                                                            {indicationList ? (indicationList.rows.map((indication) => (
                                                                                                                <button
                                                                                                                    id={indication.id}
                                                                                                                    className="m-0 p-1"
                                                                                                                    color="text-white"
                                                                                                                    style={{ display: indiDisplay ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                                >
                                                                                                                    <div className="d-flex justify-content-around align-items-center">

                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={indication.inclusion}
                                                                                                                            style={{ textAlign: 'left', width: '115px' }}
                                                                                                                        >
                                                                                                                            {IncExcList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={indication.value}
                                                                                                                            style={{ textAlign: 'left', width: '155px' }}
                                                                                                                        >
                                                                                                                            {IndicationList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={indication.condition}
                                                                                                                            style={{ textAlign: 'left', width: '61px' }}
                                                                                                                        >
                                                                                                                            {ConditionList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        {indication.value === "Stage of cancer" ? (
                                                                                                                            <input style={{ width: '61px' }} value={indication.yesorno}
                                                                                                                            ></input>
                                                                                                                        ) : (
                                                                                                                            <Select
                                                                                                                                id="clinical-select"
                                                                                                                                defaultValue={indication.yesorno}
                                                                                                                                style={{ textAlign: 'left', width: '61px' }}
                                                                                                                            >
                                                                                                                                {YesNoList.map((ent) => (
                                                                                                                                    <Option value={ent.id}>{ent.value}</Option>
                                                                                                                                ))}
                                                                                                                            </Select>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                </button>
                                                                                                            ))) : (
                                                                                                                <Loader type="Grid" height={30} width={30} color="#00BFFF" />
                                                                                                            )}

                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: indiDisplay ? 'block' : 'none'
                                                                                                            }}>Add new Indication criteria
                                                                                                            </a>


                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1 mt-2"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                onClick={toggleDemoDisplay}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Demographics Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!demoDisplay ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>
                                                                                                            {demographicList ? (demographicList.rows.map((demo) => (
                                                                                                                <button
                                                                                                                    className="m-0 p-1"
                                                                                                                    color="text-white"
                                                                                                                    outline
                                                                                                                    small
                                                                                                                    style={{ display: demoDisplay ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                                >
                                                                                                                    <div className="d-flex justify-content-around align-items-center">
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={demo.inclusion}
                                                                                                                            style={{ textAlign: 'left', width: '115px' }}
                                                                                                                        >
                                                                                                                            {IncExcList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={demo.value}
                                                                                                                            style={{ textAlign: 'left', width: '155px' }}
                                                                                                                        >
                                                                                                                            {DemographicVarList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={demo.condition}
                                                                                                                            style={{ textAlign: 'left', width: '61px' }}
                                                                                                                        >
                                                                                                                            {ConditionList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        {demo.value === 'Age' ? (
                                                                                                                            <input style={{ width: '61px' }} value={demo.genderListvalue}
                                                                                                                            ></input>
                                                                                                                        ) : (
                                                                                                                            <Select
                                                                                                                                id="clinical-select"
                                                                                                                                defaultValue={demo.genderListvalue}
                                                                                                                                style={{ textAlign: 'left', width: '61px' }}
                                                                                                                            >
                                                                                                                                {DemographicGenderList.map((ent) => (
                                                                                                                                    <Option value={ent.id}>{ent.value}</Option>
                                                                                                                                ))}
                                                                                                                            </Select>
                                                                                                                        )}
                                                                                                                    </div>

                                                                                                                </button>
                                                                                                            ))) : (
                                                                                                                <Loader type="Grid" height={30} width={30} color="#00BFFF" />
                                                                                                            )}

                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: demoDisplay ? 'block' : 'none'
                                                                                                            }}>Add new demographic criteria
                                                                                                            </a>
                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1 mt-2"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                onClick={toggleVitalDisplay}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Vital Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!vitalDisplay ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>
                                                                                                            {vitalList ? (vitalList.rows.map((vital) => (
                                                                                                                <button
                                                                                                                    className="m-0 p-1"
                                                                                                                    color="text-white"
                                                                                                                    outline
                                                                                                                    small
                                                                                                                    style={{ display: vitalDisplay ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                                >
                                                                                                                    <div className="d-flex justify-content-around align-items-center">
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={vital.inclusion}
                                                                                                                            style={{ textAlign: 'left', width: '115px' }}
                                                                                                                        >
                                                                                                                            {IncExcList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            defaultValue={vital.value}
                                                                                                                            style={{ textAlign: 'left', width: '155px' }}
                                                                                                                        >
                                                                                                                            {VitalsList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>
                                                                                                                        <Select
                                                                                                                            id="clinical-select"
                                                                                                                            style={{ textAlign: 'left', width: '61px' }}
                                                                                                                            defaultValue={vital.condition}
                                                                                                                        >
                                                                                                                            {ConditionList.map((ent) => {
                                                                                                                                return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                            })}
                                                                                                                        </Select>

                                                                                                                        <input style={{ width: '61px' }} value={vital.genderListvalue}
                                                                                                                        ></input>
                                                                                                                    </div>


                                                                                                                </button>
                                                                                                            ))) : (
                                                                                                                <Loader type="Grid" height={30} width={30} color="#00BFFF" />
                                                                                                            )}

                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: vitalDisplay ? 'block' : 'none'
                                                                                                            }}>Add new vital criteria
                                                                                                            </a>
                                                                                                        </MDBCardText>
                                                                                                    </MDBCardBody>
                                                                                                </MDBCard>
                                                                                            </MDBCol>
                                                                                        </MDBRow>
                                                                                    </TabPane>
                                                                                    <TabPane tab="Set different SCA I/E criteria" key={2}>
                                                                                        <MDBRow className="mt-2 d-flex justify-content-around">
                                                                                            <MDBCol>
                                                                                                <MDBCard className="" style={{ height: '23rem', "margin-left": "-12px" }}>
                                                                                                    <MDBCardBody style={{ overflowY: 'scroll', "margin-top": "-25px" }}>
                                                                                                        <MDBCardText className="d-flex flex-column mt-2" >
                                                                                                            <InputGroup style={inputGroup} compact>
                                                                                                                <label style={{
                                                                                                                    width: "40%",
                                                                                                                    background: "rgb(32, 56, 100)",
                                                                                                                    color: "#fff",
                                                                                                                    fontWeight: "bold",
                                                                                                                    textAlign: "center",
                                                                                                                    height: "32px",
                                                                                                                    padding: "4px 8px",
                                                                                                                    margin: "1px",
                                                                                                                    marginLeft: "-20px",
                                                                                                                    "margin-top": "9px"
                                                                                                                }}>Matching Caliper(%)</label>
                                                                                                                <div style={{ width: '54%' }}>
                                                                                                                    {/* <Slider
                                                                                                                        value={volume}
                                                                                                                        tooltip={false}
                                                                                                                        orientation="horizontal"
                                                                                                                        onChange={(e) => setVolume(e)}
                                                                                                                    /> */}
                                                                                                                </div>
                                                                                                                <input style={{ width: '36px', 'margin-top': '12px', 'margin-left': '5px', border: 'antiquewhite' }} value={volume + '%'}
                                                                                                                ></input>
                                                                                                            </InputGroup>
                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1"
                                                                                                                small
                                                                                                                color="text-secondary"
                                                                                                                outline
                                                                                                                onClick={toggleIndiDisplay2}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Indication Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!indiDisplay2 ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>

                                                                                                            <button
                                                                                                                className="m-0 p-1"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                small
                                                                                                                style={{ display: indiDisplay2 ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                            >
                                                                                                                <div className="d-flex justify-content-around align-items-center">

                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '115px' }}
                                                                                                                    >
                                                                                                                        {IncExcList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '155px' }}
                                                                                                                    >
                                                                                                                        {IndicationList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '61px' }}
                                                                                                                    >
                                                                                                                        {ConditionList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })
                                                                                                                        }
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '61px' }}
                                                                                                                    >
                                                                                                                        {YesNoList.map((ent) => (
                                                                                                                            <Option value={ent.id}>{ent.value}</Option>
                                                                                                                        ))}
                                                                                                                    </Select>

                                                                                                                </div>
                                                                                                            </button>

                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: indiDisplay2 ? 'block' : 'none'
                                                                                                            }}>Add new Indication criteria
                                                                                                            </a>


                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1 mt-2"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                onClick={toggleDemoDisplay2}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Demographics Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!demoDisplay2 ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>

                                                                                                            <button
                                                                                                                className="m-0 p-1"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                small
                                                                                                                style={{ display: demoDisplay2 ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                            >
                                                                                                                <div className="d-flex justify-content-around align-items-center">
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '115px' }}
                                                                                                                    >
                                                                                                                        {IncExcList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '155px' }}
                                                                                                                    >
                                                                                                                        {DemographicVarList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '61px' }}
                                                                                                                    >
                                                                                                                        {ConditionList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '61px' }}
                                                                                                                    >
                                                                                                                        {DemographicGenderList.map((ent) => (
                                                                                                                            <Option value={ent.id}>{ent.value}</Option>
                                                                                                                        ))}
                                                                                                                    </Select>

                                                                                                                </div>

                                                                                                            </button>

                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: demoDisplay2 ? 'block' : 'none'
                                                                                                            }}>Add new demographic criteria
                                                                                                            </a>
                                                                                                            <MDBBtn
                                                                                                                className="m-0 p-1 mt-2"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                onClick={toggleVitalDisplay2}
                                                                                                            >
                                                                                                                <MDBRow className="d-flex justify-content-end">
                                                                                                                    <MDBCol size="10" style={inputLabelWidth}>Vital Criteria</MDBCol>
                                                                                                                    <MDBCol size="2" style={inputLabelWidth}>
                                                                                                                        <MDBIcon icon={!vitalDisplay2 ? 'chevron-right' : 'chevron-down'} />
                                                                                                                    </MDBCol>
                                                                                                                </MDBRow>
                                                                                                            </MDBBtn>
                                                                                                            <button
                                                                                                                className="m-0 p-1"
                                                                                                                color="text-white"
                                                                                                                outline
                                                                                                                small
                                                                                                                style={{ display: vitalDisplay2 ? 'block' : 'none', border: 'antiquewhite' }}
                                                                                                            >
                                                                                                                <div className="d-flex justify-content-around align-items-center">
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '115px' }}
                                                                                                                    >
                                                                                                                        {IncExcList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        defaultValue={''}
                                                                                                                        style={{ textAlign: 'left', width: '155px' }}
                                                                                                                    >
                                                                                                                        {VitalsList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>
                                                                                                                    <Select
                                                                                                                        id="clinical-select"
                                                                                                                        style={{ textAlign: 'left', width: '61px' }}
                                                                                                                        defaultValue={''}
                                                                                                                    >
                                                                                                                        {ConditionList.map((ent) => {
                                                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                                                        })}
                                                                                                                    </Select>

                                                                                                                    <input style={{ width: '61px' }} value={''}
                                                                                                                    ></input>
                                                                                                                </div>

                                                                                                            </button>


                                                                                                            <a style={{
                                                                                                                "text-decoration": "underline",
                                                                                                                textAlign: 'end',
                                                                                                                cursor: 'pointer',
                                                                                                                color: 'blue',
                                                                                                                display: vitalDisplay2 ? 'block' : 'none'
                                                                                                            }}>Add new vital criteria
                                                                                                            </a>
                                                                                                        </MDBCardText>
                                                                                                    </MDBCardBody>
                                                                                                </MDBCard>
                                                                                            </MDBCol>
                                                                                        </MDBRow>
                                                                                    </TabPane>
                                                                                </Tabs>
                                                                            </Card>
                                                                        </Col>
                                                                    </Row>
                                                                </React.Fragment>
                                                            </div>
                                                        </div>
                                                        <MDBRow className="d-flex flex-row-reverse">
                                                            <MDBBtn size="sm" color="primary" className="mr-3">
                                                                Execute
                                                            </MDBBtn>
                                                        </MDBRow>
                                                    </MDBContainer>


                                                </TabPane>

                                                <TabPane tab="Build SCA Cohort" key={2}>
                                                    <Row style={{ marginRight: '12px', marginLeft: '-11px', "font-weight": "bold" }}>
                                                        <Col style={{ width: '100%' }}>
                                                            <Card
                                                                className="ant-card-small"
                                                                style={{ margin: "0 10px 10px 0" }}
                                                            >
                                                                <Tabs
                                                                    defaultActiveKey="1"
                                                                    animated={false}
                                                                    tabPosition="top"
                                                                    className="tabCustomization"
                                                                    style={{ "margin-top": "-6px" }}

                                                                >
                                                                    <TabPane tab="Matched Clinical Trials Cohort" key={1}>
                                                                        <div className='' style={{ "margin-left": "-17px", "margin-top": "-17px" }}>
                                                                            <MDBRow className="mt-1 d-flex justify-content-around">
                                                                                <MDBCol style={{ width: '50%' }}>
                                                                                    <MDBCard className="" style={{ height: '15.5rem' }}>
                                                                                        <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '103%' }}>
                                                                                            <MDBTable
                                                                                                small
                                                                                                className="border" border="1"
                                                                                                style={{ height: '10rem' }}
                                                                                            >
                                                                                                <MDBTableHead style={inputLabelWidth}>
                                                                                                    <tr>
                                                                                                        <th style={{
                                                                                                            width: '4%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Study ID</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Arms</th>
                                                                                                        <th style={{
                                                                                                            width: '8%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Matched Patients</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Match %</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>View</th>
                                                                                                    </tr>
                                                                                                </MDBTableHead>
                                                                                                <MDBTableBody className="mb-0">
                                                                                                    {clinicalTrialData ? (
                                                                                                        clinicalTrialData.rows.map((row, index) => {
                                                                                                            return (
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}>{row.id}</td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            cursor: 'pointer',
                                                                                                                            color: 'blue',
                                                                                                                            "textDecoration": "underline",
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                        onClick={index === 0 ? toggleCTSCA1 : null || index === 1 ? toggleCTSCA2 : null}
                                                                                                                    >
                                                                                                                        {row.arms}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}

                                                                                                                    >
                                                                                                                        {row.mat_pat}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {row.perc}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <MDBInput
                                                                                                                            style={{ height: '1.2rem', width: '1.2rem', textAlign: 'center', 'vertical-align': 'middle', 'margin-left': '0px' }}
                                                                                                                            onClick={() => onClick(index)}
                                                                                                                            checked={radio === index ? true : false}
                                                                                                                            label=""
                                                                                                                            type="radio"
                                                                                                                            id={`radio${index}`}
                                                                                                                            containerClass="mb-4"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                            );
                                                                                                        })
                                                                                                    ) : (
                                                                                                        <div className="loader">Loading...</div>
                                                                                                    )}
                                                                                                    <CTSCA1display CTSCAdisplay1={CTSCAdisplay1} toggleCTSCA1={toggleCTSCA1} />
                                                                                                    <CTSCA2display CTSCAdisplay2={CTSCAdisplay2} toggleCTSCA2={toggleCTSCA2} />
                                                                                                </MDBTableBody>
                                                                                            </MDBTable>
                                                                                            <a style={{
                                                                                                "text-decoration": "underline",
                                                                                                width: '100%',
                                                                                                position: 'absolute',
                                                                                                marginLeft: '-30px',
                                                                                                textAlign: 'center',
                                                                                                cursor: 'pointer',
                                                                                                color: 'blue',
                                                                                            }}>Save Selected SCA Cohort
                                                                                            </a>
                                                                                        </MDBCardBody>
                                                                                    </MDBCard>
                                                                                </MDBCol>
                                                                                <MDBCol style={{ width: '50%', marginLeft: '-41px' }}>
                                                                                    <React.Fragment>
                                                                                        <InputGroup style={inputGroup} compact>
                                                                                            <label style={inputLabel}>Study ID</label>
                                                                                            <input className="ant-select-selection
ant-select-selection--single" type="text" value={'NCT00645593'} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                                                                        </InputGroup>
                                                                                        <InputGroup style={inputGroup} compact>
                                                                                            <label style={inputLabel}>Brief Title</label>
                                                                                            <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '56%', "padding-top": "0px", height: "62px", resize: 'none' }} readOnly>{'Study of Gemcitabine and Cisplatin With or Without Cetuximab in Urothelial Cancer'}</textarea>
                                                                                        </InputGroup>
                                                                                        <InputGroup style={inputGroup} compact>
                                                                                            <label style={inputLabel}>Intervention Arm</label>
                                                                                            <input className="ant-select-selection
ant-select-selection--single" type="text" value={radio === 0 ? 'Cetuximab, Gemcitabine and Cisplatin' : 'Gemcitabine and Cisplatin'} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                                                                        </InputGroup>
                                                                                        <InputGroup style={inputGroup} compact>
                                                                                            <label style={inputLabel}>Sponsor</label>
                                                                                            <input className="ant-select-selection
ant-select-selection--single" type="text" value={'University of Michigan Rogel Cancer Center'} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                                                                        </InputGroup>
                                                                                        <InputGroup style={inputGroup} compact>
                                                                                            <label style={inputLabel}>Investigator</label>
                                                                                            <input className="ant-select-selection
ant-select-selection--single" type="text" value={'Maha Hussain, M.D.'} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                                                                        </InputGroup>
                                                                                        <input className="ant-select-selection
ant-select-selection--single" style={{
                                                                                                cursor: 'pointer',
                                                                                                color: 'blue',
                                                                                                "text-decoration": "underline",
                                                                                                padding: '4px 8px', width: '95%',
                                                                                                height: "32px",
                                                                                                textAlign: 'right',
                                                                                                margin: '1px',
                                                                                                border: 'antiquewhite',
                                                                                                marginLeft: '23px'
                                                                                            }} type="text" value='Inclusion/Exclusion Criteria' onClick={toggleExclusion} readOnly />
                                                                                        <MatchClinicalInclusion primary={primary} toggleExclusion={toggleExclusion} />
                                                                                    </React.Fragment>
                                                                                </MDBCol>
                                                                            </MDBRow>
                                                                        </div>
                                                                    </TabPane>
                                                                    <TabPane tab="Matched EHR Cohort" key={2}>
                                                                        <div className='' style={{ "margin-left": "-17px", "margin-top": "-17px" }}>
                                                                            <MDBRow className="mt-1 d-flex justify-content-around">
                                                                                <MDBCol >
                                                                                    <MDBCard className="" style={{ height: '19rem', overflow: 'scroll', 'overflow-x': 'hidden' }}>
                                                                                        <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '103%' }}>
                                                                                            <MDBTable
                                                                                                small
                                                                                                className="border" border="1"
                                                                                                style={{ height: '10rem' }}
                                                                                            >
                                                                                                <MDBTableHead style={inputLabelWidth}>
                                                                                                    <tr>
                                                                                                        <th style={{
                                                                                                            width: '4%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Cohort Rank</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Matched Patients</th>
                                                                                                        <th style={{
                                                                                                            width: '4%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Match %</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Sites</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Years Range</th>
                                                                                                        <th style={{
                                                                                                            width: '5%', 'vertical-align': 'middle',
                                                                                                            textAlign: 'center',
                                                                                                            lineHeight: 'initial'
                                                                                                        }}>Select</th>
                                                                                                    </tr>
                                                                                                </MDBTableHead>
                                                                                                <MDBTableBody className="mb-0">
                                                                                                    {EHRData ? (
                                                                                                        EHRData.rows.map((row, index) => {
                                                                                                            let bcolor = row.perc > 89 && row.perc < 100 ? 'green' : null || row.perc > 80 && row.perc < 89 ? 'orange' : null || row.perc > 0 && row.perc < 79 ? 'red' : null
                                                                                                            return (
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}>{row.rank}</td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            cursor: 'pointer',
                                                                                                                            color: 'blue',
                                                                                                                            "textDecoration": "underline",
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                        onClick={index === 0 ? toggleEHRSCA1 : null || index === 1 ? toggleEHRSCA2 : null}
                                                                                                                    >
                                                                                                                        {row.mat_pat}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial',
                                                                                                                            backgroundColor: bcolor,
                                                                                                                            color: 'white',
                                                                                                                            fontWeight: 'bold'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {row.perc}%
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {row.sites}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {row.years}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            'vertical-align': 'middle',
                                                                                                                            textAlign: 'center',
                                                                                                                            lineHeight: 'initial'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <MDBInput
                                                                                                                            style={{ height: '1.2rem', width: '1.2rem', textAlign: 'center', 'vertical-align': 'middle', 'margin-left': '38px' }}
                                                                                                                            onClick={() => onClick(index)}
                                                                                                                            checked={radio === index ? true : false}
                                                                                                                            label=""
                                                                                                                            type="radio"
                                                                                                                            id={`radio${index}`}
                                                                                                                            containerClass="mb-4"
                                                                                                                        />
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                            );
                                                                                                        })

                                                                                                    ) : (
                                                                                                        <div className="loader">Loading...</div>
                                                                                                    )}
                                                                                                    <EHRSCA1display EHRSCAdisplay1={EHRSCAdisplay1} toggleEHRSCA1={toggleEHRSCA1} />
                                                                                                    <EHRSCA2display EHRSCAdisplay2={EHRSCAdisplay2} toggleEHRSCA2={toggleEHRSCA2} />
                                                                                                </MDBTableBody>
                                                                                            </MDBTable>
                                                                                            <a style={{
                                                                                                "text-decoration": "underline",
                                                                                                width: '100%',
                                                                                                position: 'absolute',
                                                                                                marginLeft: '-30px',
                                                                                                textAlign: 'center',
                                                                                                cursor: 'pointer',
                                                                                                color: 'blue',
                                                                                            }}>Save Selected SCA Cohort
                                                                                            </a>
                                                                                        </MDBCardBody>
                                                                                    </MDBCard>
                                                                                </MDBCol>

                                                                            </MDBRow>
                                                                        </div>
                                                                    </TabPane>
                                                                </Tabs>
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                </TabPane>
                                            </Tabs>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Arms Comparison" key={3}>
                                <div className="row">
                                    <div className="" style={{ width: '40%' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Study ID</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={ndc} style={{ padding: '0px 9px', width: '56%' }} readOnly />
                                            </InputGroup>
                                            <input className="clinical-input ant-select-selection ant-select-selection--single"
                                                type="text" value='Inclusion/Exclusion Criteria' onClick={toggleInclusion} readOnly />
                                            <InclusionExclusionCriteria relative={relative} toggleInclusion={toggleInclusion}
                                                indicationList={indicationList}
                                                demographicList={demographicList}
                                                vitalList={vitalList}

                                            />
                                        </React.Fragment>
                                    </div>
                                    <div className="" style={{ width: '60%', marginLeft: '-24px' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={{
                                                    width: "30%",
                                                    background: "rgb(32, 56, 100)",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    height: "32px",
                                                    padding: "4px 8px",
                                                    marginBottom: "0px"
                                                }}>Brief Title</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '70%', "padding-top": "0px", height: "62px", resize: 'none' }} readOnly>{briefTitle}</textarea>
                                            </InputGroup>
                                        </React.Fragment>
                                    </div>
                                </div>

                                <Row style={{ marginRight: '-6px' }}>
                                    <Col style={{ width: '100%' }}>
                                        <Card
                                            className="ant-card-small"
                                            style={{ margin: "0 10px 10px 0" }}
                                        >
                                            <Tabs
                                                defaultActiveKey="1"
                                                animated={false}
                                                tabPosition="top"
                                                style={{ "margin-top": "-6px" }}
                                                className="tabCustomization"
                                            >
                                                <TabPane tab="DEMOGRAPHIC" key={1}>

                                                    <div className="row">
                                                        <div className="" style={{ width: '40%' }}>
                                                            <React.Fragment>
                                                                <InputGroup style={inputGroup} compact>
                                                                    <label style={inputLabel}>RCT Arms</label>
                                                                    <Select
                                                                        style={{ padding: '0px 2px', width: '56%', fontWeight: '400', height: '32px' }}
                                                                        mode="multiple"
                                                                        defaultValue={['RCT Arm1']}

                                                                    >
                                                                        {RCTArms.map((el) => {
                                                                            return (
                                                                                <Option value={el.value}>
                                                                                    {el.value}</Option>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                </InputGroup>
                                                            </React.Fragment>
                                                        </div>
                                                        <div className="" style={{ width: '60%', marginLeft: '-24px' }}>
                                                            <React.Fragment>
                                                                <InputGroup style={inputGroup} compact>
                                                                    <label style={{
                                                                        width: "31%",
                                                                        background: "rgb(32, 56, 100)",
                                                                        color: "#fff",
                                                                        fontWeight: "bold",
                                                                        textAlign: "center",
                                                                        height: "32px",
                                                                        padding: "4px 3px",
                                                                        margin: "0"
                                                                    }}>SCA Arms</label>
                                                                    <Select
                                                                        style={{ padding: '0px 2px', width: '69%', fontWeight: '400', height: '32px', overflow: 'scroll', 'overflow-x': 'hidden' }}
                                                                        mode="multiple"
                                                                        defaultValue={['CT SCA 1', 'CT SCA 2', 'EHR SCA 1', 'EHR SCA 2']}

                                                                    >
                                                                        {SCAArms.map((el) => {
                                                                            return (
                                                                                <Option value={el.value}>
                                                                                    {el.value}</Option>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                </InputGroup>
                                                            </React.Fragment>
                                                        </div>
                                                    </div>
                                                    <div className='' style={{ "margin-left": "-17px", "margin-top": "6px" }}>
                                                        <MDBRow className="mt-1 d-flex justify-content-around">
                                                            <MDBCol style={{ width: '50%' }}>
                                                                <MDBCard className="card" style={{ marginRight: '-26px', height: '14rem' }}>
                                                                    <MDBCardBody className="pt-1" style={{ width: '100%', lineHeight: '11px' }}>
                                                                        <MDBTable
                                                                            small
                                                                            className="border" border="1" style={{ width: '101%' }}
                                                                        >
                                                                            <MDBTableHead style={inputLabelWidth}>
                                                                                <tr>
                                                                                    <th style={{ width: '5%', textAlign: 'left' }}>Arm Name</th>
                                                                                    <th style={{ width: '1%' }}>Patient</th>
                                                                                    <th style={{ width: '14%' }}>Intervention Drug</th>
                                                                                </tr>
                                                                            </MDBTableHead>
                                                                            <MDBTableBody className="mb-0">
                                                                                {demoData ? (
                                                                                    demoData.rows.map((row, index) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: 'left'
                                                                                                    }}>{row.arm_name}</td>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: 'center'
                                                                                                    }}
                                                                                                >
                                                                                                    {row.patient}
                                                                                                </td>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: 'left'
                                                                                                    }}
                                                                                                >
                                                                                                    {row.int_drug}</td>
                                                                                            </tr>
                                                                                        );
                                                                                    })
                                                                                ) : (
                                                                                    <div className="loader">Loading...</div>
                                                                                )}
                                                                            </MDBTableBody>
                                                                        </MDBTable>
                                                                    </MDBCardBody>
                                                                </MDBCard>
                                                            </MDBCol>
                                                            <MDBCol style={{ width: '50%', "margin-right": "6px" }}>
                                                                <MDBCard id="card1" style={{ width: '100%', overflow: 'scroll', height: '14rem', 'overflow-x': 'hidden' }}>
                                                                    <MDBCardBody className="pb-0">
                                                                        <MDBCardText className="text-center">
                                                                            <MDBCardImage className="img-fluid" style={{ marginBottom: '10px' }} src={AgeDistribution} />
                                                                            <MDBCardImage className="img-fluid" style={{ marginBottom: '10px' }} src={GenderDistribution} />
                                                                            <MDBCardImage className="img-fluid" style={{ marginBottom: '10px' }} src={RaceDistribution} />
                                                                        </MDBCardText>
                                                                    </MDBCardBody>
                                                                </MDBCard>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </div>

                                                </TabPane>
                                                <TabPane tab="PRE-EXISTING CONDITIONS" key={2}>
                                                </TabPane>
                                                <TabPane tab="VITALS" key={3}>
                                                </TabPane>
                                            </Tabs>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BuildSynthetic;