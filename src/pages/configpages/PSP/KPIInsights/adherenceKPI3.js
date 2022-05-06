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
import moment from 'moment';
import { Select, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const AdherenceKPI3 = () => {
	const [data, setData] = useState(null);
	const[gtninsights, setgtninsights] = useState(false);

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
          <h4 className="mb-0">&nbsp;</h4>
				<MDBBtnGroup>
					<MDBBtn size="sm" color="primary" className="mr-3">
						Export
					</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">
						Print
					</MDBBtn>
					<MDBBtn size="sm" color="primary" className="mr-3">
						Help
					</MDBBtn>
					{/* <MDBBtn size="sm" color="primary" className="mr-3">
						Settings
					</MDBBtn> */}
				</MDBBtnGroup>
			</MDBRow>
			<MDBRow className="mt-4">
			  <MDBCard className="w-100">
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
                Morisky Adherence Score across Patient Population  
							</MDBCardTitle>
							<MDBCardText className="text-center">
								{data ? (
                  <div className="position-relative">
                    <Chart
                      options={dataChartMorisky.options}
                      series={dataChartMorisky.series}
                      type="bar"
                      height="300"
                    />
                    <img src={`${CONTEXT}/psp/gradietImageFinal.png`}
                      style={{ 
                        position: "relative",
                        left: "0px",
                        bottom: "40px",
                        width: "100%",
                        paddingLeft: "60px"}} 
                      />
                  </div>
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
			</MDBRow>
			
			<MDBRow className="mt-1">
					<MDBCard style={{width:"calc(60% - 10px)", marginRight: "10px"}}>
						<MDBCardBody className="pb-0">
							<MDBCardTitle tag="h5" className="text-center" style={{ color: 'black' }}>
							</MDBCardTitle>
							<MDBCardText className="text-center">
								{data ? (
                    <Chart
                      options={dataChart.options}
                      series={dataChart.series}
                      type="bar"
                    />
								) : (
									<Loader type="Grid" height={30} width={30} color="#00BFFF" />
								)}
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>

					<MDBCard style={{width:"40%"}}>
						<MDBCardBody className="pl-2 ml-0 pb-0">
							<MDBCardTitle tag="h5" className="text-center d-flex" style={{ color: 'black' }}>
								<span>Abandonment Cliff Drivers Patient</span>
                <Select defaultValue="40-50"
                    style={{ width: 120, marginRight: "10px" }} onChange={(e) => handleFilter(e, `provider`)}>
                    <Select.Option value="">ALL</Select.Option>
                    <Select.Option value="10-20">10-20</Select.Option>
                    <Select.Option value="40-50">40-50</Select.Option>
                    <Select.Option value="50-65">50-55</Select.Option>
                    <Select.Option value="55-60">55-60</Select.Option>
                    <Select.Option value="60-65">60-65</Select.Option>
                    <Select.Option value="65-70">65-70</Select.Option>
                    <Select.Option value="70-75">70-75</Select.Option>
                    <Select.Option value="75-80">75-80</Select.Option>
                    <Select.Option value="80-90">80-90</Select.Option>
                    <Select.Option value="90+">90+</Select.Option>
                </Select>
							</MDBCardTitle>
								  <Chart
                      className="mt-5"
                      options={dataPieChart.options}
                      series={dataPieChart.series}
                      type="pie"
                    />
						</MDBCardBody>
					</MDBCard>
				
			</MDBRow>
		</MDBContainer>
	);
};
const dataChartMorisky = {
    options: {
    chart: {
      id: "basic-bar",
      stacked: true,
    },
    xaxis: {
      categories: ["0 - Low Adherence", "5", "10 - High Adherence"]
    },
    yaxis: {
        title: {
          text: 'Patient Count'
        }
      },
    tooltip: {
      shared: true,
      followCursor: true,
      inverseOrder: true
    },
    fill: {
      //colors: ['#feb019'],
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        }
      },
  },
  series: [
    {
      name: "",
      data: [2546, 4567, 6534, 6754, 8753, 10345, 12678, 10864, 7890, 6789, 2346]
    }
  ]
};
const dataChart = {
  options: {
  chart: {
    id: "basic-bar",
    stacked: true
  },
  xaxis: {
    title:{
      text: 'Age'
    },
    categories: ["10-20", "20-40", "40-50", "50-55", "55-60", "60-65", "65-70", "70-75", "75-80", "80-90", "90+"]
  },
  yaxis: {
      title: {
        text: 'Patient Adherence'
      }
    },
  tooltip: {
    shared: true,
    followCursor: true,
    inverseOrder: true
  },
  fill: {
    colors: ['#4285f4'],
  },
  dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      }
    },
},
series: [
  {
    name: "",
    data: [5.1, 6.7, 4.7, 4.9, 5.8, 6.5, 6.2, 6.7, 6.8, 6.9, 7.1]
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
            }
}
export default AdherenceKPI3;