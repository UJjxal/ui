import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardGroup,
    MDBCardText,
    MDBCardTitle,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCol,
    MDBInput,
    MDBIcon,
    MDBBtnGroup,
    MDBBtn,
    MDBCardFooter,
} from 'mdbreact';

import { Radio, Checkbox, Row, Col, Input, Card, Select, Tabs, Avatar, Button, Icon, Table } from 'antd';
import {
    LoadStudyID,
    VitalsList,
    IncExcList,
    ConditionList,
    YesNoList,
    DemographicVarList,
    DemographicGenderList,
    IndicationList,
    IndicaList, Phases
} from '../../../../utilities/AllDropDowns';
// import { DataContext } from './index';
import TextArea from 'antd/lib/input/TextArea';
import ProviderDrug from './components/ProviderDrug';
import Loader from 'react-loader-spinner';
import RelativeSites from './components/RelativeSites';
import RelativeProcedure from './components/RelativeProcedure';
import RelativeSitesNew from './components/RelativeSitesCreateNew';
import RelativeProcedureNew from './components/RelativeProcedureCreateNew';
import ProviderDrugCreateNew from './components/ProviderDrugCreateNew';
import RelativeProcedureCreateNew from './components/RelativeProcedureCreateNew';

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
       inputLabelWidth = {
        width: "50%",
        background: "rgb(32, 56, 100)",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        height: "32px",
        padding: "4px 8px",
        margin: "0",
    };


const StudyParameters = (props) => {
    const [relative2, setRelative2] = useState(false);
    const [segment2, setSegment2] = useState(false);
    const [primary2, setPrimary2] = useState(false);
    const [primary, setPrimary] = useState(false);
    const [val, setVal] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [indiDisplay, setIndiDisplay] = useState(false);
    const [demoDisplay, setDemoDisplay] = useState(false);
    const [vitalDisplay, setVitalDisplay] = useState(false);
    const [indiDisplay2, setIndiDisplay2] = useState(false);
    const [demoDisplay2, setDemoDisplay2] = useState(false);
    const [vitalDisplay2, setVitalDisplay2] = useState(false);
    const [relative, setRelative] = useState(false);
    const [segment, setSegment] = useState(false);
    const [selectedIndication, setSelectedIndication] = useState([0, 0, 0, 0, 0]);
    const [indi2, setindi2] = useState('');
    const [phase2, setphase2] = useState('');
    // const [dvtablecreatedata, setdvtablecreate] = useState(null);

    const handleValue = (e) => {
        setVal(e);
    }
    const handleMin = (e) => {
        setMin(e);
    }
    const handleMax = (e) => {
        setMax(e);
    }

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
    const toggleProc = () => {
        // console.log(primary, !primary);
        setPrimary(!primary);
    };

    const toggleSites = () => {
        setRelative(!relative);
    };
    const toggleDrug = () => {
        setSegment(!segment);
    };

    const toggleProc2 = () => {
        // console.log(primary, !primary);
        setPrimary2(!primary2);
    };

    const toggleSites2 = () => {
        setRelative2(!relative2);
    };
    const toggleDrug2 = () => {
        setSegment2(!segment2);
    };

    const [modelingWindow, setmodelingWindow] = useState('1');
    const handleNDC = (e, setNDC, modelingWindow, setoptimalvalues) => {
        setNDC(e, modelingWindow);
        setoptimalvalues(e);
    }

    // useEffect(() => {
    //     const fetchdvtableCreate = async () => {
    //         const result = await axios('/Clinical/RWE/DvtRangeNCT00234494.json');
    //         console.log("DV TABLE", result.data);
    //         setdvtablecreate(result.data);
    //     };
    //     fetchdvtableCreate();
    // }, []);

    let { dvtableData, setNDC, ndc, setoptimalvalues, briefTitle, briefDesc, sponsor, 
        investigator, indication, phase, indicationList, demographicList, vitalList, reachData } = props;

        console.log("PROPS ARE:", props);

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
                            <TabPane tab="Select Study" key={1}>

                                <div className="row">
                                    <div className="" style={{ width: '50%' }}>

                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Study ID</label>
                                                <Select
                                                    value={ndc}
                                                    style={{ width: "60%", fontWeight: '400' }}
                                                    onChange={e => handleNDC(e, setNDC, modelingWindow, setoptimalvalues)}
                                                >
                                                    {LoadStudyID.map((el) => {
                                                        return (
                                                            <Option value={el.value}>
                                                                {el.value}</Option>
                                                        );
                                                    })}
                                                </Select>

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Sponsor</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={sponsor} style={{ padding: '0px 9px', width: '60%', boxSizing: 'border-box' }} readOnly />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Investigator</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={investigator} style={{ padding: '0px 9px', width: '60%' }} readOnly />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Indication</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={indication} style={{ padding: '0px 9px', width: '60%' }} readOnly />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Phase</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" value={phase} style={{ padding: '0px 9px', width: '60%' }} readOnly />

                                            </InputGroup>
                                        </React.Fragment>

                                    </div>
                                    <div className="" style={{ width: '50%', marginLeft: '-2px' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Brief Title</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '93.5%', height: '2.7rem', fontSize: '13.5px', resize: 'none' }} readOnly>{briefTitle}</textarea>
                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact><label style={inputLabel}>Description</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single"style={{ width: '93.5%', height: '4.4rem', fontSize: '13.5px', resize: 'none' }} readOnly>{briefDesc}</textarea>
                                            </InputGroup>

                                        </React.Fragment>
                                    </div>
                                </div>
                                <Row style={{ marginLeft: '-6px' }}>
                                    <Col  style={{ width: '100%' }}>
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
                                                <TabPane tab="Design Variable" key={1} >
                                                    <div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
                                                        <MDBCard className="" style={{ height: '12rem' }}>
                                                            <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '103%' }}>
                                                                <MDBTable
                                                                    small
                                                                    className="border" border="1"
                                                                    style={{ height: '10rem' }}
                                                                >
                                                                    <MDBTableHead style={inputLabelWidth}>
                                                                        <tr>
                                                                            <th style={{ width: '10%' }}>Parameters</th>
                                                                            <th style={{ width: '5%' }}>Value</th>
                                                                            <th style={{ width: '5%' }}>Minimum</th>
                                                                            <th style={{ width: '5%' }}>Maximum</th>
                                                                            <th style={{ width: '20%' }}>Additional Data Capture</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody className="mb-0">
                                                                        {
                                                                        
                                                                        dvtableData ? (
                                                                            dvtableData.rows.map((row, index) => {
                                                                                let style_additional =
                                                                                    row.additional_data_capture === 'View Sites' ||
                                                                                        row.additional_data_capture === 'View Drugs' ||
                                                                                        row.additional_data_capture === 'View Procedures.'
                                                                                        ? 'true'
                                                                                        : false;
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{row.model}</td>
                                                                                        <td
                                                                                            onChange={(e) => handleValue(e)}
                                                                                            contenteditable={min.length > 0 || max.length > 0 ? 'false' : 'true'}
                                                                                            style={{
                                                                                                textAlign: 'center'
                                                                                            }}
                                                                                        >
                                                                                            {row.value}
                                                                                        </td>
                                                                                        <td
                                                                                            onChange={(e) => handleMin(e)}
                                                                                            contenteditable={val.length > 0 ? 'false' : 'true'}
                                                                                            style={{
                                                                                                textAlign: 'center'
                                                                                            }}



                                                                                        >
                                                                                            {row.min}
                                                                                        </td>
                                                                                        <td
                                                                                            onChange={(e) => handleMax(e)}
                                                                                            contenteditable={val.length > 0 ? 'false' : 'true'}
                                                                                            style={{
                                                                                                textAlign: 'center'
                                                                                            }}
                                                                                        >
                                                                                            {row.max}
                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                cursor: style_additional ? 'pointer' : 'none',
                                                                                                color: style_additional ? 'blue' : '#111',
                                                                                                "text-decoration": "underline",
                                                                                                textAlign: 'center',
                                                                                            }}
                                                                                            onClick={index === 2 ? toggleSites : null || index === 3 ? toggleDrug : null || index === 4 ? toggleProc : null}
                                                                                        >
                                                                                            {row.additional_data_capture}
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                        ) : (
                                                                            <Loader/>
                                                                        )}
                                                                        <ProviderDrug segment={segment} toggleDrug={toggleDrug} reachData={reachData} />
                                                                        <RelativeSites relative={relative} toggleSites={toggleSites} ndc={ndc} />
                                                                        <RelativeProcedure primary={primary} toggleProc={toggleProc} ndc={ndc} />
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </MDBCardBody>
                                                        </MDBCard>

                                                    </div>
                                                </TabPane>
                                                <TabPane tab="Inclusion/Exclusion" key={2} style={{ "margin-left": "-3px" }} >
                                                    <MDBRow className="mt-2 d-flex justify-content-around">
                                                        <MDBCol>
                                                            <MDBCard className="" style={{ height: '23rem', "margin-left": "-12px" }}>
                                                                <MDBCardBody style={{ overflowY: 'scroll', "margin-top": "-25px" }}>
                                                                    <MDBCardText className="d-flex flex-column mt-2" >
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
                                                                                color="text-secondary"
                                                                                style={{ display: indiDisplay ? 'block' : 'none', border: 'antiquewhite' }}
                                                                            >
                                                                                <div className="d-flex justify-content-around align-items-center">

                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={indication.inclusion}
                                                                                        style={{ textAlign: 'left', width: '150px' }}
                                                                                    >
                                                                                        {IncExcList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={indication.value}
                                                                                        style={{ textAlign: 'left', width: '184px' }}
                                                                                    >
                                                                                        {IndicationList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={indication.condition}
                                                                                        style={{ textAlign: 'left', width: '70px' }}
                                                                                    >
                                                                                        {ConditionList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    {indication.value === "Stage of cancer" ? (
                                                                                        <input style={{ width: '70px' }} value={indication.yesorno}
                                                                                        ></input>
                                                                                    ) : (
                                                                                        <Select
                                                                                            id="clinical-select"
                                                                                            defaultValue={indication.yesorno}
                                                                                            style={{ textAlign: 'left', width: '70px' }}
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
                                                                                        style={{ textAlign: 'left', width: '150px' }}
                                                                                    >
                                                                                        {IncExcList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={demo.value}
                                                                                        style={{ textAlign: 'left', width: '184px' }}
                                                                                    >
                                                                                        {DemographicVarList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={demo.condition}
                                                                                        style={{ textAlign: 'left', width: '70px' }}
                                                                                    >
                                                                                        {ConditionList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    {demo.value === 'Age' ? (
                                                                                        <input style={{ width: '70px' }} value={demo.genderListvalue}
                                                                                        ></input>
                                                                                    ) : (
                                                                                        <Select
                                                                                            id="clinical-select"
                                                                                            defaultValue={demo.genderListvalue}
                                                                                            style={{ textAlign: 'left', width: '70px' }}
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
                                                                                        style={{ textAlign: 'left', width: '150px' }}
                                                                                    >
                                                                                        {IncExcList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        defaultValue={vital.value}
                                                                                        style={{ textAlign: 'left', width: '184px' }}
                                                                                    >
                                                                                        {VitalsList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>
                                                                                    <Select
                                                                                        id="clinical-select"
                                                                                        style={{ textAlign: 'left', width: '70px' }}
                                                                                        defaultValue={vital.condition}
                                                                                    >
                                                                                        {ConditionList.map((ent) => {
                                                                                            return <Option value={ent.id}>{ent.value}</Option>;
                                                                                        })}
                                                                                    </Select>

                                                                                    <input style={{ width: '70px' }} value={vital.genderListvalue}
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
                                            </Tabs>


                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Create New Study" key={2} style={{ "margin-left": "-3px" }} >
                                <div className="row">
                                    <div className="" style={{ width: '50%' }}>

                                        <React.Fragment>

                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Study ID</label>
                                                <input className="ant-select-selection ant-select-selection--single" 
                                                type="text" style={{ padding: '0px 9px', width: '60%', boxSizing: 'border-box' }} />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Sponsor</label>
                                                <input className="ant-select-selection ant-select-selection--single" type="text" style={{ padding: '0px 9px', width: '60%' }} />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Investigator</label>
                                                <input className="ant-select-selection
ant-select-selection--single" type="text" style={{ padding: '0px 9px', width: '60%' }} />

                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Indication</label>
                                                <Select
                                                    value={indi2}
                                                    style={{ width: "60%", fontWeight: '400' }}
                                                    onChange={(e) => setindi2(e)}
                                                >
                                                    {IndicaList.map((el) => {
                                                        return (
                                                            <Option value={el.value}>
                                                                {el.value}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Phase</label>
                                                <Select
                                                    value={phase2}
                                                    style={{ width: "60%", fontWeight: '400' }}
                                                    onChange={(e) => setphase2(e)}

                                                >
                                                    {Phases.map((el) => {
                                                        return (
                                                            <Option value={el.value}>
                                                                {el.value}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </InputGroup>
                                        </React.Fragment>

                                    </div>
                                    <div className="" style={{ width: '50%', marginLeft: '-2px' }}>
                                        <React.Fragment>
                                            <InputGroup style={inputGroup} compact>
                                                <label style={inputLabel}>Brief Title</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single" style={{ width: '93.5%', height: '2.7rem', resize: 'none' }}></textarea>
                                            </InputGroup>
                                            <InputGroup style={inputGroup} compact><label style={inputLabel}>Description</label>
                                                <textarea className="ant-select-selection
ant-select-selection--single"style={{ width: '93.5%', height: '4.4rem', resize: 'none' }}></textarea>
                                            </InputGroup>
                                        </React.Fragment>
                                    </div>
                                </div>
                                <Row style={{ marginLeft: '-6px' }}>
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
                                                <TabPane tab="Design Variable" key={1} >
                                                    <div className='' style={{ "margin-left": "-17px", "margin-top": "-9px" }}>
                                                        <MDBCard className="" style={{ height: '12rem' }}>
                                                            <MDBCardBody className="pt-1" style={{ lineHeight: '11px', width: '103%' }}>
                                                                <MDBTable
                                                                    small
                                                                    className="border" border="1"
                                                                    style={{ height: '10rem' }}
                                                                >
                                                                    <MDBTableHead style={inputLabelWidth}>
                                                                        <tr>
                                                                            <th style={{ width: '10%' }}>Parameters</th>
                                                                            <th style={{ width: '5%' }}>Value</th>
                                                                            <th style={{ width: '5%' }}>Minimum</th>
                                                                            <th style={{ width: '5%' }}>Maximum</th>
                                                                            <th style={{ width: '20%' }}>Additional Data Capture</th>
                                                                        </tr>
                                                                    </MDBTableHead>
                                                                    <MDBTableBody className="mb-0">
                                                                        {
                                                                        props.dvtabledataloading? (
                                                                            <Loader/>
                                                                        )
                                                                        :props.dvtablecreatedata && (
                                                                            props.dvtablecreatedata.rows.map((row, index) => {
                                                                                let style_additional =
                                                                                    row.additional_data_capture === 'Add/Edit Sites' ||
                                                                                        row.additional_data_capture === 'Add/Edit Drugs' ||
                                                                                        row.additional_data_capture === 'Add/Edit Procedures.'
                                                                                        ? 'true'
                                                                                        : false;
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{row.model}</td>
                                                                                        <td
                                                                                            contenteditable='true'
                                                                                            style={{

                                                                                                textAlign: 'center'
                                                                                            }}
                                                                                        >

                                                                                        </td>
                                                                                        <td
                                                                                            contenteditable='true'
                                                                                            style={{
                                                                                                textAlign: 'center'
                                                                                            }}
                                                                                        >

                                                                                        </td>
                                                                                        <td
                                                                                            contenteditable='true'
                                                                                            style={{
                                                                                                textAlign: 'center'
                                                                                            }}
                                                                                        >

                                                                                        </td>
                                                                                        <td
                                                                                            style={{
                                                                                                cursor: style_additional ? 'pointer' : 'none',
                                                                                                color: style_additional ? 'blue' : '#111',
                                                                                                "text-decoration": "underline",
                                                                                                textAlign: 'center',
                                                                                            }}
                                                                                            onClick={index === 2 ? toggleSites2 : null || index === 3 ? toggleDrug2 : null || index === 4 ? toggleProc2 : null}
                                                                                        >
                                                                                            {row.additional_data_capture}
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                        )  }
                                                                        <ProviderDrugCreateNew segment2={segment2} toggleDrug2={toggleDrug2} ndc={ndc} />
                                                                        <RelativeSitesNew relative2={relative2} toggleSites2={toggleSites2} ndc={ndc} />
                                                                        <RelativeProcedureCreateNew primary2={primary2} toggleProc2={toggleProc2} ndc={ndc} />
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </MDBCardBody>
                                                        </MDBCard>

                                                    </div>
                                                </TabPane>
                                                <TabPane tab="Inclusion/Exclusion" key={4} style={{ "margin-left": "-3px" }} >
                                                    <MDBRow className="mt-2 d-flex justify-content-around">
                                                        <MDBCol>
                                                            <MDBCard className="" style={{ height: '23rem', "margin-left": "-12px" }}>
                                                                <MDBCardBody style={{ overflowY: 'scroll', "margin-top": "-25px" }}>
                                                                    <MDBCardText className="d-flex flex-column mt-2" >
                                                                        <MDBBtn
                                                                            className="m-0 p-1"
                                                                            small
                                                                            color="text-white"
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
                                                                                    style={{ textAlign: 'left', width: '150px' }}
                                                                                >
                                                                                    {IncExcList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '184px' }}
                                                                                >
                                                                                    {IndicationList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '70px' }}
                                                                                >
                                                                                    {ConditionList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '70px' }}
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
                                                                                    style={{ textAlign: 'left', width: '150px' }}
                                                                                >
                                                                                    {IncExcList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '184px' }}
                                                                                >
                                                                                    {DemographicVarList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '70px' }}
                                                                                >
                                                                                    {ConditionList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '70px' }}
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
                                                                                    style={{ textAlign: 'left', width: '150px' }}
                                                                                >
                                                                                    {IncExcList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    defaultValue={''}
                                                                                    style={{ textAlign: 'left', width: '184px' }}
                                                                                >
                                                                                    {VitalsList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>
                                                                                <Select
                                                                                    id="clinical-select"
                                                                                    style={{ textAlign: 'left', width: '70px' }}
                                                                                    defaultValue={''}
                                                                                >
                                                                                    {ConditionList.map((ent) => {
                                                                                        return <Option value={ent.id}>{ent.value}</Option>;
                                                                                    })}
                                                                                </Select>

                                                                                <input style={{ width: '70px' }} value={''}
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
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>

            </Row>



        </React.Fragment>
    );


};


export default StudyParameters;
