import React, {useState, useEffect} from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Avatar,
  Button,
  Icon,
  Popover,
} from "antd";


import { MDBIcon } from "mdbreact";
import util from "../../../../utilities/util";

const InputGroup = Input.Group;
const { Option } = Select;

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
    width: "65%",
    background: "rgb(32, 56, 100)",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
    /*height: "32px",*/
    padding: "4px 8px",
    margin: "0",
  },
  inputGroupR = {
    padding: "5px 5px",
    marginLeft: "0%",
  };

function getAvatar(color) {
	//console.log("color", color)
  const avatar = {
    green: (
      <Avatar
        style={{
          backgroundColor: "green",
          verticalAlign: "middle",
          display: "block",
        }}
        size="small"
      />
    ),
    orange: (
      <Avatar
        style={{
          backgroundColor: "orange",
          verticalAlign: "middle",
          display: "block",
        }}
        size="small"
      />
    ),
    red: (
      <Avatar
        style={{
          backgroundColor: "red",
          verticalAlign: "middle",
          display: "block",
        }}
        size="small"
      />
    ),
	grey: (
		<Avatar
		  style={{
			backgroundColor: "grey",
			verticalAlign: "middle",
			display: "block",
		  }}
		  size="small"
		/>
	  ),
  };
  return avatar[color];
}

const MonitoringFilter = (props) => {
	const item =  props.modelData.selected;
	const [isNewDetailPage, setNewDetailPage]=useState(props.isNewDetailPage);
	const [selected, setSelected]=useState(props.modelData.selected);
	const [modelData, setModelData]=useState({
    RankOrdering: null,
    apiData: [],
    apiListResponse: null ,
    apiResponse: null ,
    comments: [], 
    csiStatus: null ,
    discriminationStatus:null ,
    isNewDetailPage: null ,
    modelDetails: null ,
    modelId: "" ,
    modelIdParms: null ,
    modelsList: [] ,
    objective: "",
    psiStatus: "" ,
    rankOrderingStatus: "" ,
    riskRatingStatus: "" ,
    selected: null ,
    submittingcomment: null ,
  });
  
	useEffect(()=>{
		setNewDetailPage(props.isNewDetailPage);
	}, [props.isNewDetailPage]);

	useEffect(()=>{
		setSelected(props.modelData.selected);
	  }, [props.modelData.selected]);
  
	useEffect(()=>{
		setModelData(props.modelData);
	}, [props.modelData]);

	let mdl=modelData.modelDetails?(modelData.modelDetails.Model_Monitor?modelData.modelDetails.Model_Monitor[0].Model_Monitor_View:null):null;

  let filteredBankUser = util.mrmUsersEmail().filter(option => (option.email === util.getEmailID()))
  const bankOption = [...new Set(filteredBankUser.length === 0 ? util.mrmUsersEmail().map(item => item.bank) : filteredBankUser.map(item => item.bank))];
  const filteredModelIdData = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
       var arr = arr2.find(element => {
          return element === el.bank && el.status ==="Active";
       });
       return arr ? true : false
    });
    return res;
 }

  // let filteredModelIdData=modelData.modelsList.filter(model => model.status ==="Active")
  
  let newModelIdData=[] 
  // console.log("test newModelIdData", newModelIdData)
  
  filteredModelIdData(modelData.modelsList, bankOption).forEach((v)=>{
    let el={
      label:v.modelId,  
      value:v.key ,  
    }
    
    newModelIdData.push(el) 
    }
  )

  let newModelNameData=[] 
  let newModelBusinessSponsorData=[]
  let newModelRiskManagerData=[]
  let newModelDeveloperData=[]
  let newModelValidatorData=[]

  modelData.modelsList.forEach((v)=>{
    let el={
      label:v.modelName,  
      value:v.key , 
    }

    let el2={
      label:v.businessSponsor,
      value:v.key 
    }

    let el3={
      label:v.riskManager ,
      value:v.key 
    }

    let el4={
      label:v.developer ,
      value:v.key 
    }

    let el5={
      label:v.validator ,
      value:v.key 
    }

    newModelNameData.push(el) 
    newModelBusinessSponsorData.push(el2) 
    newModelRiskManagerData.push(el3) 
    newModelDeveloperData.push(el4) 
    newModelValidatorData.push(el5) 

    }
  )

  return (
    <>
    <Row className="d-flex">
      <Col span={24}>
        <div className="border radius6 p15 pt20">
            <div className="d-flex justify-content-between">
              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl ">Model ID</div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      showSearch
                      placeholder="Select Model_ID"
                      value={modelData.selected}
                      style={select}
                      options={newModelIdData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                      filterOption={
                        (input, option) => {
                            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                     }
                    />
                </div>
              </div>

              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl">Model Name </div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      value={modelData.selected}
                      style={select}
                      placeholder="Select Model Name"
                      options={newModelNameData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                    />
                </div>
              </div>
                   
              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl">Business Sponsor</div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      value={modelData.selected}
                      style={select}
                      placeholder="Select Business Sponsor"
                      options={newModelBusinessSponsorData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                    />
                </div>
              </div>

              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl">Risk Manager</div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      value={modelData.selected}
                      style={select}
                      placeholder="Select Risk Manager"
                      options={newModelRiskManagerData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                    />      
                </div>
              </div>

              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl">Model Developer</div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      value={modelData.selected}
                      style={select}
                      placeholder="Select Model Developer"
                      options={newModelDeveloperData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                    />
                </div>
              </div>

              <div className="pr-2" style={{width:'16.66%'}}>
                <div className="antd-lbl-input">
                  <div className="lbl">Model Validator</div>
                    <Select
                      className="w-100" 
                      bordered={false}
                      value={modelData.selected}
                      style={select}
                      placeholder="Select Model Validator"
                      options={newModelValidatorData}
                      onChange={(ev) =>
                        props.onChange(ev, modelData.modelsList)
                      }
                    / >
                </div>
              </div>
            </div>
        </div>
      </Col>
    </Row>
       
	   {props.modelData.apiResponse &&
			<>
				{isNewDetailPage?(
					<div>
						{modelData.modelId==='PB_RISK_LGD1'?(
							<div className="border radius6 p15">
								<div className="row">
									<div className="col-md-4">
										<InputGroup style={inputGroupR} compact>
											<label style={inputLabelWidth}>
												<Popover
													style={{ border: "1px solid black !important" }}
													className="text-center"
													content={
														<div className="d-flex flex-column p-2">
															{modelData.riskRatingStatus === "red" ? (
															<div className="d-flex">
															<span className="align-self-center pr-2">
															<MDBIcon icon="square" className="red-text mr-1" />
															</span>
															<span>
															{"Significant decrease in discriminatory power,"}<br/>
															{"opportunity to rebuild the model,"}<br/>
															{"and high drift observed in population profile."}
															</span>
															</div>
															) : null}
															{modelData.riskRatingStatus === "orange" ? (
															<div className="d-flex">
															<span className="align-self-center pr-2">
															<MDBIcon icon="square" className="orange-text mr-1" />
															</span>
															<span>
															{"Decrease in discriminatory power though model still"}<br/>
															{"provides discrimination between events and non-events"}<br/>
															{"and medium drift observed in the population profile"}
															</span>
															</div>
															) : null}
															{modelData.riskRatingStatus === "green" ? (
															<div className="d-flex">
															<span className="align-self-center pr-2">
															<MDBIcon icon="square" className="green-text mr-1" />
															</span>
															<span>
															{"Satisfactory performance in terms of model discrimination"}<br/>
															{"and minimal drift in the population profile."}
															</span>
															</div>
															) : null}
														</div>
													}
													trigger="hover"
													>
													Model Risk Rating
													<MDBIcon
													icon="info-circle"
													className="ml-3"
													style={{ cursor: "pointer" }}
												/>
												</Popover>
											</label>
											<div style={pdL50}>
												{getAvatar(modelData.riskRatingStatus)}
											</div>
										</InputGroup>
									</div>
								</div>
							</div>
						):(
							<Row className="border radius6">
								<Col className="p-0" span={12}>
									<Card bordered={false}>
										{mdl!==null &&
											<>
												{mdl.Model_Type.map((v,i)=>(
												(i<2)?(
												<InputGroup style={inputGroupR} compact key={i}>
													<label style={inputLabelWidth}>{v}</label>
													<div style={pdL50}>
														{getAvatar(mdl.Colour_Code[i].toLowerCase())}
													</div>
												</InputGroup>
												):"" ))}
											</>
										}
									</Card>
								</Col>

								<Col className="p-0" span={12} >
									<Card  bordered={false}>
										{ mdl!==null &&
											<>
												{mdl.Model_Type.map((v,i)=>(
													(i>=2)?(
													<InputGroup style={inputGroupR} compact key={i}>
													<label style={inputLabelWidth}>{v}</label>
													<div style={pdL50}>
														{getAvatar(mdl.Colour_Code[i].toLowerCase())}
													</div>
													</InputGroup>
													):""
												))}
											</>
										}
									</Card>
								</Col>
							</Row>
						)}
					</div>
				):(
					<div className="border radius6 p15">
						<div className="row">
							{(modelData.riskRatingStatus !== "") &&
								<div className="col-md-4">
									<InputGroup style={inputGroupR} compact>
										<label style={inputLabelWidth}>
											<Popover
												style={{ border: "1px solid black !important" }}
												className="text-center"
												content={
													<div className="d-flex flex-column p-2">
														{modelData.riskRatingStatus === "red" ? (
														<div className="d-flex">
														<span className="align-self-center pr-2">
														<MDBIcon icon="square" className="red-text mr-1" />
														</span>
														<span>
														{"Significant decrease in discriminatory power,"}<br/>
														{"opportunity to rebuild the model,"}<br/>
														{"and high drift observed in population profile."}
														</span>
														</div>
														) : null}
														{modelData.riskRatingStatus === "orange" ? (
														<div className="d-flex">
														<span className="align-self-center pr-2">
														<MDBIcon icon="square" className="orange-text mr-1" />
														</span>
														<span>
														{"Decrease in discriminatory power though model still"}<br/>
														{"provides discrimination between events and non-events"}<br/>
														{"and medium drift observed in the population profile"}
														</span>
														</div>
														) : null}
														{modelData.riskRatingStatus === "green" ? (
														<div className="d-flex">
														<span className="align-self-center pr-2">
														<MDBIcon icon="square" className="green-text mr-1" />
														</span>
														<span>
														{"Satisfactory performance in terms of model discrimination"}<br/>
														{"and minimal drift in the population profile."}
														</span>
														</div>
														) : null}
													</div>
												}
												trigger="hover"
												>
												Model Risk Rating
												<MDBIcon
												icon="info-circle"
												className="ml-3"
												style={{ cursor: "pointer" }}
											/>
											</Popover>
										</label>
										<div style={pdL50}>
											{getAvatar(modelData.riskRatingStatus)}
										</div>
									</InputGroup>
								</div>
							}
							
							{(modelData.rankOrderingStatus !== "") &&
								<div className="col-md-4">
									<InputGroup style={inputGroupR} compact>
										<label style={inputLabelWidth}>Rank Ordering</label>
										<div style={pdL50}>
										{getAvatar(modelData.rankOrderingStatus)}
										</div>
									</InputGroup>
								</div>
							}
							
							{(modelData.csiStatus !== "") &&
								<div className="col-md-4">
									<InputGroup style={inputGroupR} compact>
										<label style={inputLabelWidth}>Characteristic Stability</label>
										<div style={pdL50}>{getAvatar(modelData.csiStatus)}</div>
									</InputGroup>
								</div>
							}

							{(modelData.discriminationStatus !== "") &&
								<div className="col-md-4">
									<InputGroup style={inputGroupR} compact>
										<label style={inputLabelWidth}>Model Discrimination</label>
										<div style={pdL50}>
											{getAvatar(modelData.discriminationStatus)}
										</div>
									</InputGroup>
								</div>
							}
							
							{(modelData.psiStatus !== "") &&
								<div className="col-md-4">
									<InputGroup style={inputGroupR} compact>
										<label style={inputLabelWidth}>Population Stability</label>
										<div style={pdL50}>{getAvatar(modelData.psiStatus)}</div>
									</InputGroup>
								</div>
							}
						</div>
					</div> 
				)}
			</>
		}
    </>
  );
};

export default MonitoringFilter;