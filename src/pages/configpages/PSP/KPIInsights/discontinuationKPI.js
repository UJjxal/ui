import React from 'react';
import { CaretRightFilled, ArrowDownOutlined } from '@ant-design/icons';
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
	MDBIcon,
	MDBBtnGroup,
	MDBBtn,
} from 'mdbreact';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const DiscontinuationKPI = () => {
    const handleFilter = (value, label) => {
        console.log(`selected ${value} ${label}`);
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
      }
	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">KPI Dashboard & Data Insights: Illustrative IV Discontinuation KPIs</h4>
				<MDBBtnGroup>
					<MDBBtn size="sm" color="primary" className="mr-3">Export</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">Print</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">Help</MDBBtn>
                    <MDBBtn size="sm" color="primary" className="mr-3">Settings</MDBBtn>
				</MDBBtnGroup>
			</MDBRow>
			<MDBRow className="mt-4 border px-3 pt-3 pb-1">
			<div className="mb-2 ml-auto d-flex">
                <div>
                <h6 className="mb-0">State</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `state`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="AL">AL</Select.Option>
                    <Select.Option value="CA">CA</Select.Option>
                    <Select.Option value="GA">GA</Select.Option>
                    <Select.Option value="FL">FL</Select.Option>
                    <Select.Option value="NV">NV</Select.Option>
                    <Select.Option value="NY">NY</Select.Option>
                </Select>
                </div>
                <div>
                <h6 className="mb-0">Payer</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `payer`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="Anthem">Anthem</Select.Option>
                    <Select.Option value="Caremark">Caremark</Select.Option>
                    <Select.Option value="CVS">CVS</Select.Option>
                    <Select.Option value="ESI">ESI</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Provider</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `provider`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="BCBS CA">BCBS CA</Select.Option>
                    <Select.Option value="BCBS GA">BCBS GA</Select.Option>
                    <Select.Option value="Keiser">Keiser</Select.Option>
                    <Select.Option value="UCLA">UCLA</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Brand/ NDC</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="Tocilizumab">Tocilizumab</Select.Option>
                    <Select.Option value="Bevacizumab">Bevacizumab</Select.Option>
                    <Select.Option value="Pimavanserin">Pimavanserin</Select.Option>
                    <Select.Option value="Remdesivir">Remdesivir</Select.Option>
                    <Select.Option value="Viltolarsen">Viltolarsen</Select.Option>
                </Select>
            </div>
            <div>
                <h6 className="mb-0">Review Period</h6>
                <RangePicker
						// defaultValue={[moment('2018/1', 'YYYY-[Q]Q'), moment('2019/4', 'YYYY-[Q]Q')]}
						// format= {'YYYY-[Q]Q'}
						/>
            </div>
            </div>
			</MDBRow>
			<MDBRow className="mt-1">
					<MDBCard className="w-100">
						<MDBCardBody className="d-flex">
                        <div className="col border-right">
                            <MDBCardTitle tag="h4" 
                                style={{fontWeight: 500, fontStyle: "italic", color: "#008c00"}}>
                                    % Discontinued Patients
                            </MDBCardTitle>
							<MDBCardText>
                                % of Patient (on treatment) who discontinued the recommended treatment/ total Patients on treatment
							</MDBCardText>
                            <ul className="list-inline mt-4">
                                <li className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <CaretRightFilled style={{color: "#ef8600", fontSize: "30px"}}/>
                                        <span
                                            style={{
                                                borderBottom: "7px solid #ef8600",
                                                padding: "0 20px 5px 0",
                                                fontSize: "20px"
                                                }}>
                                            DISCONTINUED % <b>42%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow.svg" width="20" />
                                </li>
                                <li className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <CaretRightFilled style={{color: "#ef8600", fontSize: "30px"}}/>
                                        <span
                                            style={{
                                                borderBottom: "7px solid #ef8600",
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        DISCONTINUED # <b>32,219</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow.svg" width="20" />
                                </li>
                            </ul>
                            <div class="mt-5 pt-3">
                                <h6
                                    style={{
                                        padding: "12px",
                                        background: "#fff1e8",
                                        borderRadius: "10px",
                                        color: "#002060"
                                    }}>
                                    <strong>Discontinuation %</strong> has decreased from 47% to 41% between 2018 Q1 and 2019 Q4
                                </h6>
                            </div>
                        </div>
                        <div className="col border-right">
                            <MDBCardTitle tag="h4" 
                                style={{fontWeight: 500, fontStyle: "italic", color: "#008c00"}}>
                                    Discontinuation Drivers
                            </MDBCardTitle>
							<MDBCardText>
                            Top 5 reasons for Caregiver/ patients to discontinue treatment 
							</MDBCardText>
                            <ul className="list-inline mt-4">
                                <li className="d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>1</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 20px 5px 0",
                                                fontSize: "20px"
                                                }}>
                                            FINANCIAL <b>14%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow-red.svg" width="20" />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>2</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        SIDE EFFECTS <b>10%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow-red.svg" width="20" />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>3</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        SWITCH DRUGS <b>08%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow.svg" width="20" style={{transform: "scale(-1)"}}/>
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>4</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        PHYSICIAN DECISION <b>06%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow.svg" width="20" style={{transform: "scale(-1)"}} />
                                </li>
                                <li className="d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>5</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        DEATH <b>05%</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow-red.svg" width="20" />
                                </li>
                            </ul>
                            <div class="mt-4">
                                <h6
                                    style={{
                                        padding: "12px",
                                        background: "#fff1e8",
                                        borderRadius: "10px",
                                        color: "#002060"
                                    }}>
                                    <strong>Financial - Coverage Denial %</strong> grew from 2.5% to 5.3% between 2018 Q1 and 2019 Q4
                                </h6>
                            </div>
                        </div>
                        <div className="col">
                            <MDBCardTitle tag="h4" 
                                style={{fontWeight: 500, fontStyle: "italic", color: "#008c00"}}>
                                    % Patient Switch To
                            </MDBCardTitle>
							<MDBCardText>
                            % of Patients switched another/novel therapy in the past 12 months
							</MDBCardText>
                            <ul className="list-inline mt-4">
                                <li className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>1</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 20px 5px 0",
                                                fontSize: "20px"
                                                }}>
                                            Clozaril <b>5% (9,231)</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow.svg" width="20" style={{transform: "scale(-1)"}} />
                                </li>
                                <li className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>2</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        Quetiapine <b>2.4% (4,412)</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow-red.svg" width="20" />
                                </li>
                                <li className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <b 
                                            style={{
                                                background: "#ef8600",
                                                color: "#fff",
                                                fontSize: "18px",
                                                padding: "2px 8px",
                                                borderRadius: "4px"
                                            }}>3</b>
                                            <CaretRightFilled style={{color: "#ef8600", fontSize: "30px", verticalAlign: "top"}}/>
                                        <span
                                            style={{
                                                padding: "0 0 5px 0",
                                                fontSize: "20px"
                                                }}>
                                        Others <b>1.9% (3,512)</b>
                                        </span>
                                    </span>
                                    <img src="./down-arrow-red.svg" width="20" />
                                </li>
                            </ul>
                            <div class="mt-4 pt-3">
                                <h6
                                    style={{
                                        padding: "12px",
                                        background: "#fff1e8",
                                        borderRadius: "10px",
                                        color: "#002060"
                                    }}>
                                    <strong>Drug switch to Clozaril</strong> has decreased from 8.3% in 2018Q1 to 5 % in 2019Q4
                                </h6>
                            </div>
                        </div>
                        </MDBCardBody>
                    </MDBCard>
            
            </MDBRow>
		</MDBContainer>
	);
};
export default DiscontinuationKPI;