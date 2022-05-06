import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { CONTEXT } from "../../../../config";
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

import Chart from "react-apexcharts";
import 'antd/dist/antd.css';
import './styles.css';
import moment from 'moment';
import { Select, DatePicker, Table, Modal, Button } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const PatientProfile = (props) => {
	const [data, setData] = useState(null);
	const[gtninsights, setgtninsights] = useState(false);
  const [visible, setVisible] = useState(null);

	const toggleGTNInsights = () => {
		
		setgtninsights(!gtninsights);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`${CONTEXT}/psp/datainsights.json`);
			setData(result.data);
		};
		fetchData();
    },[]);
    const handleFilter = (value, label) => {
        console.log(`selected ${value} ${label}`);
    }
    function onChange(date, dateString) {
        console.log(date, dateString);
      }
	console.log("fetched data", data);
	return (
		<MDBContainer fluid flexCenter>
			<MDBRow className="d-flex justify-content-between align-items-center">
          <h4 className="mt-3 mb-0">Risk Prediction Model</h4>
			</MDBRow>
			<MDBRow className="mt-2 border px-3 pt-3 pb-1">
			    <div className="mb-2 ml-auto d-flex">
            <div className="mb-2">
                <h6 className="mb-0">Book of Business</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Period</h6>
                <Select defaultValue={props.profile !== "pie" ? `Y1 Q4` : `< 2 Yrs`}
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Reason of Discontinuation</h6>
                <Select defaultValue="ALL"
                    style={{ width: 220, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Total Fills</h6>
                <Select defaultValue={props.profile !== "pie" ? `ALL` : `> 2 & < 20`}
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Provider</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            <div className="mb-2">
                <h6 className="mb-0">Payer</h6>
                <Select defaultValue="ALL"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `brand`)}>
                    <Select.Option value="">ALL</Select.Option>
                </Select>
            </div>
            </div>
			</MDBRow>
			
			<MDBRow className="mt-1">
        <MDBCard style={{width:"calc(60% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
                Discontinuation Across Therapy and Drivers(2 years)
							</MDBCardTitle>
							<MDBCardText className="text-center">
								{data ? (<>
                  {props.profile !== "pie" ? 
                      <Chart
                       className="barwithpie"
                        options={dataChart.options}
                        series={dataChart.series}
                        type="bar"
                      />
                      :
                      <Chart
                        options={dataPieChart.options}
                        series={dataPieChart.series}
                        type="pie"
                      />
                  }
								</>) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
          <MDBCard style={{width:"40%"}}>
						<MDBCardBody className="pl-2 ml-0 pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
								Key Insights
							</MDBCardTitle>
							<MDBCardText>
								<MDBTable>
                {props.profile !== "pie" ? 
									<MDBTableBody className="mb-0">
                  <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        The combination of Switch to Competition and Financial Barrier is the top reason of Discontinuation for 25% of the existing patient population
                      </td>
										</tr>
                  <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        The Payer Denial from CVS, AETNA, and ANTHEM is the 2nd highest Reason of Discontinuation for 20% of the patient population
                      </td>
										</tr>
                    <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        The combination of Side Effects and Physician Reco. is the 3rd reason of Discontinuation for 15% of the patients
                      </td>
										</tr>
										<tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Highest discontinuation rate of 20% drop at Y1 Q4 driven by financial factors, is maximum for the Age Group 60-65, Race: Hispanic, Gender: Female
                      </td>
										</tr>
                    <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Physicians decision is the 2nd most important driver for discontinuation, among Age Group 40-45, Race: White, Gender: Female, States: GA, NV, PA
                      </td>
										</tr>
								</MDBTableBody>
                : <MDBTableBody className="mb-0">
                  <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Highest discontinuation rate of 20% drop at Y1 Q4 driven by financial factors, is maximum for the Age Group 70-80, Race: White, Gender: Female
                      </td>
                    </tr>
                  <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        Physicians decision is the 2nd most important driver for discontinuation, among Age Group 50-55, Race: Asian, Gender: Female, States: CA, NV, MA
                      </td>
                    </tr>
                    <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        The combination of Side Effects and Physician Reco. is the 3rd reason of Discontinuation for 35% of the patients
                      </td>
                    </tr>
                    <tr>
                      <td md="2" className="pt-1">
                        <MDBIcon className="red-text" size="3x" icon="caret-down" />
                      </td>
                      <td md="10" className="p-0 pt-1">
                        The Payer Denial from CVS, AETNA, and ANTHEM is the 2nd highest Reason of Discontinuation for 20% of the patient population
                      </td>
                    </tr>
                </MDBTableBody>
                }
                </MDBTable>
								</MDBCardText>
                <MDBBtnGroup>
                  <MDBBtn className="mr-3" size="sm" color="primary" onClick={() => setVisible(1)}>High Risk Patient (Discontinuation) </MDBBtn>
                  <MDBBtn size="sm" color="primary" onClick={() => setVisible(2)}>Recommended Actions</MDBBtn>
                </MDBBtnGroup>
						</MDBCardBody>
					</MDBCard>
      </MDBRow>
        <Modal
          top
          title={visible === 2 ? "Recommended Actions" : "List of patients with high risk of discontinuation"}
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1200}
          footer={[<Button key="back" onClick={() => setVisible(false)}>Close</Button>]}
        >
          {visible === 2 ?
              props.profile !== "pie" ?
                <Table dataSource={dataSourceBar} columns={columns} pagination={false} bordered />
                :
                <Table dataSource={dataSourcePie} columns={columns} pagination={false} bordered />
            : visible === 1 ?
              props.profile !== "pie" ?
                <Table dataSource={dataSourceBar2} columns={columns2} pagination={false} scroll={{ x: '120vw' }} bordered />
                :
                <Table dataSource={dataSourcePie2} columns={columns2} pagination={false} scroll={{ x: '120vw' }} bordered />
            : null
          }
        </Modal>
		</MDBContainer>
	);
};
const columns = [
  {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
    },
    {
      title: 'Expected Conversion Rate',
      dataIndex: 'Expected Conversion Rate',
      key: 'Expected Conversion Rate',
    }
]
const dataSourceBar = [
  {
    "key": "1",
    "Actions": "Increase communication on Financial Assistance Program details to patients/ caregiver pre-enrollment by 50%",
    "Expected Conversion Rate": "15%",
  },
  {
    "key": "2",
    "Actions": "Increase calls to Physicians/ HCPs by 50% between week 1 of patient enrollment and week 12",
    "Expected Conversion Rate": "10%",
  },
  {
    "key": "3",
    "Actions": "Reimb. Team to reduce Error in Payer Documentation Process by 80% and set up a standardized template for document submission in 12 weeks for Payers CVS, Anthem and Aetna",
    "Expected Conversion Rate": "8%",
  },
  {
    "key": "4",
    "Actions": "Increase call volume to patients with Refill due in more than 7 days by 50%",
    "Expected Conversion Rate": "6%",
  },
  {
    "key": "5",
    "Actions": "Online dispatch of Drug for eligible patients in Age Group 60+",
    "Expected Conversion Rate": "5%",
  }
];
const dataSourcePie = [
  {
    "key": "1",
    "Actions": "Increase communication on Financial Assistance Program details to patients/ caregiver pre-enrollment by 50%",
    "Expected Conversion Rate": "20%",
  },
  {
    "key": "2",
    "Actions": "Increase calls to Physicians/ HCPs by 50% between week 1 of patient enrollment and week 12",
    "Expected Conversion Rate": "15%",
  },
  {
    "key": "3",
    "Actions": "Reimb. Team to reduce Error in Payer Documentation Process by 80% and set up a standardized template for document submission in 12 weeks for Payers CVS, Anthem and Aetna",
    "Expected Conversion Rate": "10%",
  },
  {
    "key": "4",
    "Actions": "Increase call volume to patients with Refill due in more than 7 days by 50%",
    "Expected Conversion Rate": "8%",
  },
  {
    "key": "5",
    "Actions": "Online dispatch of Drug for eligible patients in Age Group 60+",
    "Expected Conversion Rate": "5%",
  }
];
const columns2 = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Patient ID',
      dataIndex: 'Patient ID',
      key: 'Patient ID',
    },
    {
      title: 'Patient Name',
      dataIndex: 'Patient Name',
      key: 'Patient Name',
    },
    {
      title: 'Risk Score(out of 100)',
      dataIndex: 'Risk Score',
      key: 'Risk Score',
    },
    {
      title: 'State',
      dataIndex: 'State',
      key: 'State',
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      key: 'Brand',
    },
    {
      title: 'Payer',
      dataIndex: 'Payer',
      key: 'Payer',
    },
    {
      title: 'Provider',
      dataIndex: 'Provider',
      key: 'Provider',
    },
    {
      title: 'Date of Last Fill',
      dataIndex: 'Date of Last Fill',
      key: 'Date of Last Fill',
    },
    {
      title: 'Discontinuation Driver 1',
      dataIndex: 'Discontinuation Driver 1',
      key: 'Discontinuation Driver 1',
    },
    {
      title: 'Discontinuation Driver 2',
      dataIndex: 'Discontinuation Driver 2',
      key: 'Discontinuation Driver 2',
    },
    {
      title: 'Discontinuation Driver 3',
      dataIndex: 'Discontinuation Driver 3',
      key: 'Discontinuation Driver 3',
    },

]
const dataSourceBar2 = [
  {
  "key": "1",
  "Patient ID": "1234",
  "Patient Name": "John Smith",
  "Risk Score": "99.7",
  "State": "AL",
  "Brand": "Brand A  ",
  "Payer": "Anthem",
  "Provider": "Provider C",
  "Date of Last Fill": "08/20/2017",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "2",
  "Patient ID": "4668",
  "Patient Name": "Mathew Perry",
  "Risk Score": "99.4",
  "State": "CA",
  "Brand": "Brand B",
  "Payer": "Caremark",
  "Provider": "Provider A",
  "Date of Last Fill": "03/02/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},{
  "key": "3",
  "Patient ID": "3245",
  "Patient Name": "Emily Rhodes",
  "Risk Score": "99.3",
  "State": "GA",
  "Brand": "Brand C  ",
  "Payer": "CVS",
  "Provider": "Provider B",
  "Date of Last Fill": "18/04/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Financial - Copay"
},{
  "key": "4",
  "Patient ID": "6784",
  "Patient Name": "Tom Kirkman",
  "Risk Score": "99.2",
  "State": "FL",
  "Brand": "Brand D  ",
  "Payer": "ESI",
  "Provider": "Provider D",
  "Date of Last Fill": "18/20/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "5",
  "Patient ID": "6356",
  "Patient Name": "John Doe",
  "Risk Score": "99.2",
  "State": "NY",
  "Brand": "Brand A  ",
  "Payer": "Caremark",
  "Provider": "Provider B",
  "Date of Last Fill": "03/04/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},{
  "key": "6",
  "Patient ID": "8654",
  "Patient Name": "Tom De",
  "Risk Score": "99.2",
  "State": "CO",
  "Brand": "Brand B  ",
  "Payer": "CVS",
  "Provider": "Provider D",
  "Date of Last Fill": "08/04/2019",
  "Discontinuation Driver 1": "Physician Decision",
  "Discontinuation Driver 2": "Financial- Coverage",
  "Discontinuation Driver 3": "Financial - Copay"
},{
  "key": "7",
  "Patient ID": "7793",
  "Patient Name": "Lily May",
  "Risk Score": "99.0",
  "State": "MI",
  "Brand": "Brand A  ",
  "Payer": "CVS",
  "Provider": "Provider C",
  "Date of Last Fill": "08/04/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "8",
  "Patient ID": "6890",
  "Patient Name": "Simon White",
  "Risk Score": "99.0",
  "State": "NC",
  "Brand": "Brand B",
  "Payer": "ESI",
  "Provider": "Provider C",
  "Date of Last Fill": "18/20/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},
  
];
const dataSourcePie2 =  [
  {
  "key": "1",
  "Patient ID": "2321",
  "Patient Name": "Steve Smith",
  "Risk Score": "99.3",
  "State": "AL",
  "Brand": "Brand A  ",
  "Payer": "Anthem",
  "Provider": "Provider C",
  "Date of Last Fill": "08/21/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "2",
  "Patient ID": "2323",
  "Patient Name": "Simon Jones",
  "Risk Score": "99.4",
  "State": "CA",
  "Brand": "Brand B",
  "Payer": "Caremark",
  "Provider": "Provider A",
  "Date of Last Fill": "03/21/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},{
  "key": "3",
  "Patient ID": "3245",
  "Patient Name": "John Doe",
  "Risk Score": "99.3",
  "State": "GA",
  "Brand": "Brand C  ",
  "Payer": "CVS",
  "Provider": "Provider B",
  "Date of Last Fill": "18/02/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Financial - Copay"
},{
  "key": "4",
  "Patient ID": "3122",
  "Patient Name": "David Ferguson",
  "Risk Score": "99.2",
  "State": "FL",
  "Brand": "Brand D  ",
  "Payer": "ESI",
  "Provider": "Provider D",
  "Date of Last Fill": "18/21/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "5",
  "Patient ID": "4345",
  "Patient Name": "John Doe",
  "Risk Score": "99.2",
  "State": "NY",
  "Brand": "Brand A  ",
  "Payer": "Caremark",
  "Provider": "Provider B",
  "Date of Last Fill": "03/07/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},{
  "key": "6",
  "Patient ID": "8654",
  "Patient Name": "Louise Ferguson",
  "Risk Score": "99.2",
  "State": "CO",
  "Brand": "Brand B  ",
  "Payer": "CVS",
  "Provider": "Provider D",
  "Date of Last Fill": "08/06/2020",
  "Discontinuation Driver 1": "Physician Decision",
  "Discontinuation Driver 2": "Financial- Coverage",
  "Discontinuation Driver 3": "Financial - Copay"
},{
  "key": "7",
  "Patient ID": "2112",
  "Patient Name": "Sheldon Cooper",
  "Risk Score": "99.0",
  "State": "MI",
  "Brand": "Brand A",
  "Payer": "CVS",
  "Provider": "Provider C",
  "Date of Last Fill": "08/23/2018",
  "Discontinuation Driver 1": "Financial - Copay",
  "Discontinuation Driver 2": "Side Effect",
  "Discontinuation Driver 3": "Physician Decision"
},{
  "key": "8",
  "Patient ID": "1229",
  "Patient Name": "Simon Doule",
  "Risk Score": "99.0",
  "State": "NC",
  "Brand": "Brand B",
  "Payer": "ESI",
  "Provider": "Provider C",
  "Date of Last Fill": "18/20/2018",
  "Discontinuation Driver 1": "Financial- Coverage",
  "Discontinuation Driver 2": "Fulfilment Delay",
  "Discontinuation Driver 3": "Side Effect"
},
];
const dataChart = {
  options: {
  chart: {
    id: "basic-bar",
    stacked: true
  },
  xaxis: {
    categories: ["Y1 Q1", "Y1 Q2", "Y1 Q3", "Y1 Q4", "Y2 Q1", "Y2 Q2", "Y2 Q3", "Y2 Q4"],
    title: {
      text: 'Period of Therapy'
    }
  },
  yaxis: {
      title: {
        text: '% Patients on Therapy'
      }
    },
  tooltip: {
    // shared: true,
    followCursor: true,
    inverseOrder: true,
    custom: function({series, seriesIndex, dataPointIndex, w}) {
      let res = splitInteger(series[seriesIndex][dataPointIndex], 4),
      val = series[seriesIndex][dataPointIndex],
      label = ["Side Effects", "Financial", "Fullfilment", "Payer"],
      perc = [30, 20, 40, 10];
      if(val === 100) return ''; {perc = [30, 20, 40, 10]; label = ["Side Effects", "Financial", "Fullfilment", "Payer"];}
      if(val === 85) {perc = [30, 40, 15, 15]; label = ["Side Effects", "Financial", "Switch Drugs", "Payer"];}
      if(val === 80) {perc = [45, 35, 20, 10]; label = ["Side Effects", "Financial", "Fullfilment", "Payer"];}
      if(val === 60) {perc = [44, 36, 10, 10]; label = ["Side Effects", "Financial", "Fullfilment", "Payer"];}
      if(val === 50) {perc = [20, 20, 35, 25]; label = ["Side Effects", "Financial", "Switch Drugs", "Payer"];}
      if(val === 40) {perc = [20, 15, 40, 25]; label = ["Side Effects", "BV/PA", "Switch Drugs", "Payer"];}
      if(val === 35) {perc = [20, 25, 50, 5]; label = ["Side Effects", "Financial", "Switch Drugs", "Death"];}
      if(val === 30) {perc = [10, 10, 60, 20]; label = ["Side Effects", "Financial", "Physician Reco.", "Payer"];}
        return '<div class="arrow_box">' +
          '<div style="position: absolute;width: 200px;height: 200px;border-radius: 50%;background-image: conic-gradient(red 0 '+(perc[0]+60)+'deg, pink 0 '+(perc[1]+200)+'deg, yellow '+(perc[2]+10)+'deg, green 0 '+(perc[3]+270)+'deg, orange 0);"><span style="position: absolute;top: 20%;left: 43px;font-weight: bold;color: #fff;">'+label[0]+'<br/>'+perc[0]+'%</span><span style="position: absolute;top: 14%;left: -34px;font-weight: bold;color: #000;">'+label[1]+'<br/>'+perc[1]+'%</span><span style="position: absolute;top: 63%;right: -30px;font-weight: bold;color: #000;">'+label[2]+'<br/>'+perc[2]+'%</span><span style="position: absolute;top: 53%;left: -63px;font-weight: bold;color: #fff;">'+label[3]+'<br/>'+perc[3]+'%</span></div></div>';
    }
  },
  plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
  dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
    },
},
series: [
  {
    name: "",
    data: [100, 85, 80, 60, 50, 40, 35, 30]
  }
]
};
const dataPieChart = {
  series: [20, 10, 20, 50],
            options: {
              legend: {
                position: 'bottom'
              },
              labels: ['Financial', 'Fullfilment', 'Payer', 'BV/PA'],
              tooltip: {enabled: false}
            }
}
const splitInteger = (number, parts) => {
  const remainder = number % parts
  const baseValue = (number - remainder) / parts
  return Array(parts).fill(baseValue).fill(baseValue + 1, parts - remainder)
}
export default PatientProfile;