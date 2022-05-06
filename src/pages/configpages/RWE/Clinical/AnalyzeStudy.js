import React, { useState } from "react";
import {Input,Select,Tabs} from "antd";
import { AppContext } from "../../../../AppProvider";

import InclusionExclusionCriteria from "./components/InclusionExclusionCriteria";
import AnalyzeMedian from "../../../../assets/AnalyzeMedian.png";
import AnalyzeKaplan from "../../../../assets/AnalyzeKaplan.png";
import RCTArmInclusion from "./components/RCTArm1";
import SCAInclusion from "./components/SyntheticData";
import {MDBRow,MDBCard,MDBCardBody,MDBCardImage,MDBTable,MDBTableHead,MDBTableBody,MDBCol} from "mdbreact";
import {outcomes,RCTArms,SCAArms} from "../../../../utilities/AllDropDowns";
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
const AnalyzeStudy = (props) => {
  const [relative, setRelative] = useState(false);
  const [RCTArmdisplay, setRCTArmdisplay] = useState(false);
  const [SCAdisplay, setSCAdisplay] = useState(false);
  const toggleInclusion = () => {
    setRelative(!relative);
  };
  const toggleRCTArm = () => {
    setRCTArmdisplay(!RCTArmdisplay);
  };
  const toggleSCAdisplay = () => {
    setSCAdisplay(!SCAdisplay);
  };

  let {indicationList, demographicList, vitalList, ndc,briefTitle,demoData, RCTArmdata,
    CTSCA1,  CTSCA2,  EHRSCA1,	EHRSCA2  } = props;
  return (
    
          <MDBCard>
            <MDBCardBody>
              <div>
                <div
                  className="row"
                  style={{ marginTop: "17px", height: "107px" }}
                >
                  <div className="" style={{ width: "40%" }}>
                    <React.Fragment>
                      <InputGroup style={inputGroup} compact>
                        <label style={inputLabel}>Study ID</label>
                        <input
                          className="ant-select-selection
        ant-select-selection--single"
                          type="text"
                          value={ndc}
                          style={{ padding: "0px 9px", width: "56%" }}
                          readOnly
                        />
                      </InputGroup>
                      <input
                        className="ant-select-selection
        ant-select-selection--single"
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          "text-decoration": "underline",
                          padding: "4px 8px",
                          width: "85%",
                          height: "32px",
                          textAlign: "center",
                          margin: "1px",
                          border: "antiquewhite",
                        }}
                        type="text"
                        value=" View Inclusion/Exclusion Criteria"
                        onClick={toggleInclusion}
                        readOnly
                      />
                     
                      <InclusionExclusionCriteria 
                        relative={relative}
                        toggleInclusion={toggleInclusion}
                        indicationList={indicationList} 
												demographicList={demographicList}
              					vitalList={vitalList}

                      />

                      <input
                        className="ant-select-selection
        ant-select-selection--single"
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          "text-decoration": "underline",
                          padding: "4px 8px",
                          width: "85%",
                          height: "32px",
                          textAlign: "center",
                          margin: "1px",
                          border: "antiquewhite",
                        }}
                        type="text"
                        value="View RCT Arms(s)"
                        onClick={toggleRCTArm}
                      />
                      <RCTArmInclusion
                        RCTArmdisplay={RCTArmdisplay}
                        toggleRCTArm={toggleRCTArm}
                        RCTArmdata={RCTArmdata}
                      />
                    </React.Fragment>
                  </div>
                  <div
                    className=""
                    style={{ width: "60%", marginLeft: "-24px" }}
                  >
                    <React.Fragment>
                      <InputGroup style={inputGroup} compact>
                        <label
                          style={{
                            width: "30%",
                            background: "rgb(32, 56, 100)",
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                            height: "32px",
                            padding: "4px 8px",
                            marginBottom: "0px",
                          }}
                        >
                          Brief Title
                        </label>
                        <textarea
                          className="ant-select-selection
        ant-select-selection--single"
                          style={{
                            width: "70%",
                            "padding-top": "0px",
                            height: "62px",
                            resize: "none",
                          }}
                          readOnly
                        >
                          {briefTitle}
                        </textarea>
                      </InputGroup>
                      <input
                        className="ant-select-selection
        ant-select-selection--single"
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          "text-decoration": "underline",
                          padding: "4px 8px",
                          width: "85%",
                          height: "32px",
                          textAlign: "center",
                          margin: "1px",
                          border: "antiquewhite",
                        }}
                        type="text"
                        value="View Synthetic Control Arms(s)"
                        onClick={toggleSCAdisplay}
                      />
                      <SCAInclusion
                        SCAdisplay={SCAdisplay}
                        toggleSCAdisplay={toggleSCAdisplay}
                        CTSCA1={CTSCA1}
                        CTSCA2={CTSCA2}
                        EHRSCA1={EHRSCA1}
                        EHRSCA2={EHRSCA2}
                      />
                    </React.Fragment>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "15px" }}>
                  <div className="" style={{ width: "100%" }}>
                    <React.Fragment>
                      <InputGroup style={inputGroup} compact>
                        <label
                          style={{
                            width: "14%",
                            background: "rgb(32, 56, 100)",
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                            height: "32px",
                            padding: "4px 8px",
                            margin: "1px",
                          }}
                        >
                          Select outcomes
                        </label>
                        <Select
                          style={{
                            width: "19%",
                            fontWeight: "400",
                            height: "32px",
                            overflow: "scroll",
                            "overflow-x": "hidden",
                          }}
                          mode="multiple"
                          defaultValue={["Overall Survival (OS)"]}
                          // placeholder="Overall Survival (OS) Adverse Events (AE/SAE)"
                          // maxTagCount={5}
                        >
                          {outcomes.map((el) => {
                            return <Option value={el.value}>{el.value}</Option>;
                          })}
                        </Select>
                        <label
                          style={{
                            width: "12%",
                            background: "rgb(32, 56, 100)",
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                            height: "32px",
                            padding: "4px 8px",
                            margin: "1px",
                          }}
                        >
                          RCT Arms
                        </label>
                        <Select
                          style={{
                            width: "19%",
                            fontWeight: "400",
                            height: "32px",
                            overflow: "scroll",
                            "overflow-x": "hidden",
                          }}
                          mode="multiple"
                          defaultValue={["RCT Arm 1"]}
                        >
                          {RCTArms.map((el) => {
                            return <Option value={el.value}>{el.value}</Option>;
                          })}
                        </Select>
                        <label
                          style={{
                            width: "14%",
                            background: "rgb(32, 56, 100)",
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                            height: "32px",
                            padding: "4px 8px",
                            margin: "1px",
                          }}
                        >
                          SCA Arms
                        </label>
                        <Select
                          style={{
                            width: "19%",
                            fontWeight: "400",
                            height: "32px",
                            overflow: "scroll",
                            "overflow-x": "hidden",
                          }}
                          mode="multiple"
                          defaultValue={[
                            "CT SCA 1",
                            "CT SCA 2",
                            "EHR SCA 1",
                            "EHR SCA 2",
                          ]}
                          // placeholder="Cisplatin Gemcitabine"
                        >
                          {SCAArms.map((el) => {
                            return <Option value={el.value}>{el.value}</Option>;
                          })}
                        </Select>
                      </InputGroup>
                    </React.Fragment>
                  </div>
                </div>
                <div
                  className=""
                  style={{ "marginLeft": "-17px", "marginTop": "6px" }}
                >
                  <MDBRow className="mt-1 d-flex justify-content-around">
                    <MDBCol style={{ width: "50%" }}>
                      <MDBCard
                        className="card"
                        style={{ marginRight: "-26px", height: "16rem" }}
                      >
                        <MDBCardBody
                          className="pt-1"
                          style={{ width: "100%", lineHeight: "11px" }}
                        >
                          <MDBTable
                            small
                            className="border"
                            border="1"
                            style={{ width: "101%" }}
                          >
                            <MDBTableHead style={inputLabelWidth}>
                              <tr>
                                <th style={{ width: "5%", textAlign: "left" }}>
                                  Arm Name
                                </th>
                                <th style={{ width: "1%" }}>Patient</th>
                                <th style={{ width: "14%" }}>
                                  Intervention Drug
                                </th>
                              </tr>
                            </MDBTableHead>
                            <MDBTableBody className="mb-0">
                              {demoData ? (
                                demoData.rows.map((row, index) => {
                                  return (
                                    <tr>
                                      <td
                                        style={{
                                          textAlign: "left",
                                        }}
                                      >
                                        {row.arm_name}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "center",
                                        }}
                                      >
                                        {row.patient}
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "left",
                                        }}
                                      >
                                        {row.int_drug}
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
                    </MDBCol>
                    <MDBCol style={{ width: "50%", "marginRight": "6px" }}>
                      <MDBCard
                        id="card1"
                        style={{
                          width: "100%",
                          overflow: "scroll",
                          height: "16rem",
                        }}
                      >
                        <MDBCardBody className="pb-0">
                          {/* <MDBCardText className="text-center"> */}
                          <MDBCardImage
                            className="img-fluid"
                            style={{ marginBottom: "10px" }}
                            src={AnalyzeMedian}
                          />
                          <MDBCardImage
                            className="img-fluid"
                            style={{ marginBottom: "10px" }}
                            src={AnalyzeKaplan}
                          />
                          {/* </MDBCardText> */}
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
  );
};

export default AnalyzeStudy;
