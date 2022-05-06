import React, { Component } from "react";
import axios from "axios";

import { MDBContainer, MDBNavItem, MDBLink, MDBTabPane, MDBTabContent, MDBNav } from 'mdbreact';
import {
  NDCArray,
  StudyInformation,
  IndicationCriteria,
  DemographicCriteria, 
  VitalCriteria,
  OptimalDesign,
  SimilarStudies,
  LiteratureReview,
  InterventionDrugArr
} from "../../../../utilities/AllTables_LS";
import AnalyzeStudy from "./AnalyzeStudy";
import FinalizeStudy from "./FinalizeStudy";
import StudyParameters from "./StudyParameters";
import BuildSynthetic from "./BuildSynthetic";
import { CONTEXT } from "../../../../config";
// export const DataContext = React.createContext();

export default class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Tabs
      activeItem: "1",
      toggle: this.toggle,
      //RWE key Selection
      ndc: "NCT00234494",
      sponsor: "Christopher Sweeney, MBBS",
      investigator: "Christopher Sweeney, M.B.B.S.",
      indication: "Bladder Cancer",
      phase: "Phase II",
      briefTitle:
        "Cisplatin, Gemcitabine and Bevacizumab in Combination for Metastatic Transitional Cell Cancer",
      briefDesc:
        "A Phase II Trial of Cisplatin, Gemcitabine and Bevacizumab in Combination for Metastatic Transitional Cell Cancer: Hoosier Oncology Group GU04-75",
      indicationList: null,
      demographicList: null,
      vitalList: null,
      //Optimized design
      patientCount: 50,
      arms: 1,
      drugs: 4,
      procedures: 1,
      sites: 10,
      patientAttrition: 2,
      fetchvitalList: this.fetchvitalList,
      fetchdemographicList: this.fetchdemographicList,
      fetchindicationList: this.fetchindicationList,
      getvitalList: this.getvitalList,
      getindicationList: this.getindicationList,
      getdemographicList: this.getdemographicList,

      setbriefDesc: this.setbriefDesc,
      setoptimalvalues: this.setoptimalvalues,
      setbriefTitle: this.setbriefTitle,
      modelingWindow: "1",
      setmodelingWindow: this.setmodelingWindow,
      setNDC: this.setNDC,

      fetchNDC: this.fetchNDC,
      fetchSimilar: this.fetchSimilar,
      fetchLiterature: this.fetchLiterature,
      dvtablecreatedata:null,
      dvtablecreatedataloading:false,
      fetchDvtableData: this.fetchDvtableData,
      fetchloadRCTData: this.fetchloadRCTData,
      fetchviewRCTData: this.fetchviewRCTData,
      fetchSimilarStudiesData: this.fetchSimilarStudiesData,
      fetchLiteratureData: this.fetchLiteratureData,
      fetchclinicalTrialData: this.fetchclinicalTrialData,
      fetchEHRData: this.fetchEHRData,
      fetchaltData: this.fetchaltData,
      fetchdemoData: this.fetchdemoData,
      dvtableData: null,
      clinicalTrialData: null,
      EHRData: null,
      loadRCTData: null,
      viewRCTData: null,
      similarstudiesData: null,
      literatureData: null,
      altData: null,
      demoData: null,

    //Finalize Study Data  
    bladderdata:null,
	allergydata:null,
	secondarydata:null,
	colondata:null,
	stageofcancerdata:null,
	stomachfludata:null,
	otherfracturedata:null,
	copddata:null,
	cardiacdata:null,
	hivdata:null,
	bilirubindata:null,
	creatininedata:null,
	hemoglobindata:null,
	plateletsdata:null,
	systolicdata:null,
	diastolicdata:null,
	genderdata:null,
	racedata:null,
	diagnosisdata:null,
	retentiondata:null,
	petdata:null,
	chemotherapydata:null,
	cystoscopydata:null,
	intravenousdata:null,
	turbtdata:null,
	//relative:null,
  finalizeStudyLoading:false,

  //Provider Drug - called from Study Parameters
  reachData: null,
  getReachData:this.getReachData,
  DrugData:this.DrugData,
  
  //RCTArmData
  fetchRCTArmdata:this.fetchRCTArmdata,
  RCTArmdata:null,

  //Synthetic Data
  CTSCA1:null,
  CTSCA2:null,
  EHRSCA1:null,
	EHRSCA2:null,
  fetchCTSCA1:this.fetchCTSCA1,
  fetchCTSCA2:this.fetchCTSCA2,
  fetchEHRSCA1:this.fetchEHRSCA1,
  fetchEHRSCA2:this.fetchEHRSCA2,
    };
  }

  //RCT Arm Data
  fetchRCTArmdata = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/viewRCTArm.json`);
    this.setState({RCTArmdata:result.data});
  }

  //Synthetic Data 
  fetchCTSCA1 = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/viewCTSCA1.json`);
    this.setState({CTSCA1:result.data});
      };
  fetchCTSCA2 = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/viewCTSCA2.json`);
    this.setState({CTSCA2:result.data});
      };
  fetchEHRSCA1 = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/viewEHRSCA1.json`);
    this.setState({EHRSCA1:result.data});
      };
  fetchEHRSCA2 = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/viewEHRSCA2.json`);
    this.setState({EHRSCA2:result.data});
      };

  //Provider drug
  DrugData = async (filename) => {
		const result = await axios(`${CONTEXT}/${filename}`);
		this.setState({reachData:result.data});
	};

	getReachData =(ndc) =>{
		let filename = InterventionDrugArr.filter(
			(x)=>
			x.NDC == ndc
		);
		if(typeof filename[0] == 'undefined'){
			this.DrugData(`${CONTEXT}/Clinical/RWE/IntDrugNCT00234494.json`)
		}	
		else{
			let file = filename[0].filename;
			this.DrugData(file);
		}
	}

  //Fetch Data for Finalize Studies
  fetchFinalizeStudyData = async () => {
    this.setState({finalizeStudyLoading:true});
		const result = await axios(`${CONTEXT}/Clinical/Finalize/BladderCancer.json`);
    this.setState({
		bladderdata:result.data.row[0],
		allergydata:result.data.row[1],
		secondarydata:result.data.row[2],
		colondata:result.data.row[3],
		stageofcancerdata:result.data.row[4],
		stomachfludata:result.data.row[5],
		otherfracturedata:result.data.row[6],
		copddata:result.data.row[7],
		cardiacdata:result.data.row[8],
		hivdata:result.data.row[9],
		bilirubindata:result.data.row[10],
		creatininedata:result.data.row[11],
		hemoglobindata:result.data.row[12],
		plateletsdata:result.data.row[13],
		systolicdata:result.data.row[14],
		diastolicdata:result.data.row[15],
		genderdata:result.data.row[16],
		racedata:result.data.row[17],
		diagnosisdata:result.data.row[18],
		retentiondata:result.data.row[19],
		petdata:result.data.row[20],
		chemotherapydata:result.data.row[21],
		cystoscopydata:result.data.row[22],
		intravenousdata:result.data.row[23],
		turbtdata:result.data.row[24],
    finalizeStudyLoading:false
  })
	};

  // toggleInclusion=()=>{
  //   const  {relative} = this.state;
  //   this.setState({relative:!relative});
  // }

  //RWE Changes
  setNDC = (ndc, modelingWindow) => {
    this.setState({ ndc });
    this.fetchNDC(ndc, modelingWindow);
    this.setbriefDesc(ndc);
    this.getindicationList(ndc);
    this.getdemographicList(ndc);
    this.getvitalList(ndc);
    this.fetchSimilar(ndc);
    this.fetchLiterature(ndc);
    this.getReachData(ndc);
  };

  getindicationList = (ndc) => {
    let newContext = 'ls';
    let filename = IndicationCriteria.filter((x) => x.NDC == ndc);
    
    if (typeof filename[0] == "undefined") {
      this.fetchindicationList(`${newContext}/Clinical/RWE/IndicationCriteria.json`);
    } else {
      let file = filename[0].filename;
      this.fetchindicationList(file);
    }

    console.log(filename);
  };
  fetchindicationList = async (filename) => {
    const result = await axios(filename);
    this.setState({ indicationList: result.data });
  };

  getdemographicList = (ndc) => {
    let filename = DemographicCriteria.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.fetchdemographicList(`${CONTEXT}/Clinical/RWE/DemographicCriteria.json`);
    } else {
      let file = filename[0].filename;
      this.fetchdemographicList(file);
    }

    console.log(filename);
  };
  fetchdemographicList = async (filename) => {
    const result = await axios(filename);
    this.setState({ demographicList: result.data });
  };

  getvitalList = (ndc) => {
    let filename = VitalCriteria.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.fetchvitalList(`${CONTEXT}/Clinical/RWE/VitalCriteria.json`);
    } else {
      let file = filename[0].filename;
      this.fetchvitalList(file);
    }

    console.log(filename);
  };
  fetchvitalList = async (filename) => {
    const result = await axios(filename);
    this.setState({ vitalList: result.data });
  };

  onChangeModelingWindow = (indicationWindow) => {
    this.setState({ indicationWindow });
  };

  setbriefDesc = (ndc) => {
    let filename = StudyInformation.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.setState({
        briefTitle:
          "Cisplatin, Gemcitabine and Bevacizumab in Combination for Metastatic Transitional Cell Cancer",
      });
      this.setState({
        briefDesc:
          "A Phase II Trial of Cisplatin, Gemcitabine and Bevacizumab in Combination for Metastatic Transitional Cell Cancer: Hoosier Oncology Group GU04-75",
      });
    } else {
      this.setState({ briefDesc: filename[0].briefDesc });
      this.setState({ briefTitle: filename[0].briefTitle });
      this.setState({ sponsor: filename[0].Sponsor });
      this.setState({ investigator: filename[0].Investigator });
      this.setState({ indication: filename[0].Indication });
      this.setState({ phase: filename[0].Phase });
    }
  };

  setoptimalvalues = (ndc) => {
    let filename = OptimalDesign.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.setState({ patientCount: "50" });
      this.setState({ arms: "1" });
      this.setState({ drugs: "4" });
      this.setState({ procedures: "1" });
      this.setState({ sites: "10" });
      this.setState({ patientAttrition: "2" });
    } else {
      this.setState({ patientCount: filename[0].patientCount });
      this.setState({ arms: filename[0].arms });
      this.setState({ drugs: filename[0].drugs });
      this.setState({ procedures: filename[0].procedures });
      this.setState({ sites: filename[0].sites });
      this.setState({ patientAttrition: filename[0].patientAttrition });
    }
  };

  fetchNDC = (ndc, modelingWindow) => {
    let filename = NDCArray.filter(
      (x) => x.NDC == ndc && x.modelingWindow == modelingWindow
    );
    
    if (typeof filename[0] == "undefined") {
      this.fetchDvtableData(`${CONTEXT}/Clinical/RWE/DesignVariableTable.json`);
    } else {
      let file = filename[0].filename;
      this.fetchDvtableData(file);
    }
  };

  fetchDvtableData = async (filename) => {
    const result = await axios(filename);
    this.setState({ dvtableData: result.data });
  };

  fetchloadRCTData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/LoadRCTArms.json`);
    this.setState({ loadRCTData: result.data });
  };

  fetchviewRCTData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/ViewRCTArms.json`);
    this.setState({ viewRCTData: result.data });
  };

  fetchclinicalTrialData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/ClinicalTrail.json`);
    this.setState({ clinicalTrialData: result.data })
  };
  fetchEHRData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/EHRCohort.json`);
    this.setState({ EHRData: result.data })
  };
  fetchaltData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/AlternateDesign.json`);
    this.setState({ altData: result.data })
  };

  fetchdemoData = async () => {
    const result = await axios(`${CONTEXT}/Clinical/RWE/Demographic.json`);
    this.setState({ demoData: result.data })
  };

  fetchSimilar = (ndc) => {

    let filename = SimilarStudies.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.fetchSimilarStudiesData(
        `${CONTEXT}/Clinical/Finalize/SimilarStudies_NCT00234494.json`
      );
    } else {
      let file = filename[0].filename;
      this.fetchSimilarStudiesData(file);
    }
  };

  fetchSimilarStudiesData = async (filename) => {
    const result = await axios(filename);
    console.log("Fetch Similar NDC",);
    this.setState({ similarstudiesData: result.data });
  };

  fetchLiterature = (ndc) => {
    let filename = LiteratureReview.filter((x) => x.NDC == ndc);
    if (typeof filename[0] == "undefined") {
      this.fetchLiteratureData(`${CONTEXT}/Clinical/Finalize/SSL_NCT00234494.json`);
    } else {
      let file = filename[0].filename;
      this.fetchLiteratureData(file);
    }
  };

  fetchLiteratureData = async (filename) => {
    const result = await axios(filename);
    this.setState({ literatureData: result.data });
  };

  setmodelingWindow = (ndc, modelingWindow) => {
    this.setState({ modelingWindow });
    this.fetchNDC(ndc, modelingWindow);
  };

  toggle = (e, tab) => {
    e.preventDefault();
    const activeI = this.state.activeItem;
    if ( activeI !== tab) {
      this.setState({activeItem: tab});
    }
  };

  fetchdvtableCreate = async () => {
    this.setState({dvtablecreatedataloading:true})
    const result = await axios(`${CONTEXT}/Clinical/RWE/DvtRangeNCT00234494.json`);
    console.log("DV TABLE", result.data);
    this.setState({dvtablecreatedata:result.data, dvtablecreatedataloading:false});
};

  componentDidMount(){
    this.fetchdvtableCreate();
    this.fetchNDC();
    this.fetchSimilar("NCT00234494");
    this.fetchLiterature("NCT00234494");
    this.getindicationList("NCT00234494");
    this.getdemographicList("NCT00234494");
    this.getvitalList("NCT00234494");
    this.fetchloadRCTData();
    this.fetchviewRCTData();
    this.fetchclinicalTrialData();	
    this.fetchEHRData();
    this.fetchaltData();
    this.fetchdemoData();
    this.fetchFinalizeStudyData();
    this.fetchRCTArmdata();
    this.fetchCTSCA1();
    this.fetchCTSCA2();
    this.fetchEHRSCA1();
    this.fetchEHRSCA2();
  }


  render() {
    

    return (
      <MDBContainer fluid>
        <MDBNav className="nav-pills z-depth-1" color="primary">

          <MDBNavItem key="1">
            <MDBLink
              to="#"
              active={this.state.activeItem === "1"}
              onClick={(e)=>this.toggle(e, "1")}
              role="tab"
            >
              Study Parameters
							</MDBLink>
          </MDBNavItem>
          <MDBNavItem key="2">
            <MDBLink
              to="#"
              active={this.state.activeItem === "2"}
              onClick={(e)=>this.toggle(e,"2")}
              role="tab"
            >
              Finalize Study
							</MDBLink>
          </MDBNavItem>
          <MDBNavItem key="3">
            <MDBLink
              to="#"
              active={this.state.activeItem === "3"}
              onClick={(e)=>this.toggle(e,"3")}
              role="tab"
            >
              Build Synthetics
							</MDBLink>
          </MDBNavItem>
          <MDBNavItem key="4">
            <MDBLink
              to="#"
              active={this.state.activeItem === "4"}
              onClick={(e)=>this.toggle(e,"4")}
              role="tab"
            >
              Analyze Study
							</MDBLink>
          </MDBNavItem>
        </MDBNav>

        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel">
            <StudyParameters
             dvtablecreatedata={this.state.dvtablecreatedata}
             dvtabledataloading={this.state.dvtablecreatedataloading}
              dvtableData={this.state.dvtableData} setNDC={this.setNDC} ndc={this.state.ndc}
              setmodelingWindow={this.setmodelingWindow} setoptimalvalues={this.setoptimalvalues}
              modelingWindow={this.state.modelingWindow} briefTitle={this.state.briefTitle} briefDesc={this.state.briefDesc}
              sponsor={this.state.sponsor} investigator={this.state.investigator}
              indication={this.state.indication} phase={this.state.phase} indicationList={this.state.indicationList} demographicList={this.state.demographicList}
              vitalList={this.state.vitalList} reachData={this.state.reachData}/>
              
          </MDBTabPane>
        </MDBTabContent>

        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="2" role="tabpanel">
            <FinalizeStudy
              finalizeStudyLoading={this.state.finalizeStudyLoading}
              similarstudiesData={this.state.similarstudiesData} literatureData={this.state.literatureData} ndc={this.state.ndc}
              altData={this.state.altData} briefTitle={this.state.briefTitle}
              patientCount={this.state.patientCount} arms={this.state.arms} drugs={this.state.drugs} procedures={this.state.procedures}
              sites={this.state.sites} patientAttrition={this.state.patientAttrition} 
              bladderdata={this.state.bladderdata}
              allergydata={this.state.allergydata}
              secondarydata={this.state.secondarydata}
              colondata={this.state.colondata}
              stageofcancerdata={this.state.stageofcancerdata}
              stomachfludata={this.state.stomachfludata}
              otherfracturedata={this.state.otherfracturedata}
              copddata={this.state.copddata}
              cardiacdata={this.state.cardiacdata}
              hivdata={this.state.hivdata}
              bilirubindata={this.state.bilirubindata}
              creatininedata={this.state.creatininedata}
              hemoglobindata={this.state.hemoglobindata}
              plateletsdata={this.state.plateletsdata}
              systolicdata={this.state.systolicdata}
              diastolicdata={this.state.diastolicdata}
              genderdata={this.state.genderdata}
              racedata={this.state.racedata}
              diagnosisdata={this.state.diagnosisdata}
              retentiondata={this.state.retentiondata}
              petdata={this.state.petdata}
              chemotherapydata={this.state.chemotherapydata}
              cystoscopydata={this.state.cystoscopydata}
              intravenousdata={this.state.intravenousdata}
              turbtdata={this.state.turbtdata}
              indicationList={this.state.indicationList} 
              demographicList={this.state.demographicList}
              vitalList={this.state.vitalList}
              //relative={this.state.relative} 
              />
          </MDBTabPane>
        </MDBTabContent>
        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="3" role="tabpanel">
            <BuildSynthetic 
            indicationList={this.state.indicationList} 
            demographicList={this.state.demographicList}
            vitalList={this.state.vitalList}
            ndc={this.state.ndc} EHRData={this.state.EHRData} 
            clinicalTrialData={this.state.clinicalTrialData} 
            briefTitle={this.state.briefTitle} 
            loadRCTData={this.state.loadRCTData}
            viewRCTData={this.state.viewRCTData} demoData={this.state.demoData}
            />
          </MDBTabPane>
        </MDBTabContent>
        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="4" role="tabpanel">
            <AnalyzeStudy 
            indicationList={this.state.indicationList} 
            demographicList={this.state.demographicList}
            vitalList={this.state.vitalList}
            ndc={this.state.ndc} briefTitle={this.state.briefTitle}
            demoData={this.state.demoData}
            RCTArmdata={this.state.RCTArmdata}
            CTSCA1={this.state.CTSCA1}
            CTSCA2={this.state.CTSCA2}
            EHRSCA1={this.state.EHRSCA1}
            EHRSCA2={this.state.EHRSCA2}
            />
          </MDBTabPane>
        </MDBTabContent>


      </MDBContainer>
    );
  }
}
