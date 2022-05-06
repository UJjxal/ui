import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import KPIAnalysisSettings from "./KPIAnalysisSettings";
import Preview from "./KPIPreviewDraft";
import CreateAnalysisModal from "./CreateAnalysisModal";
import NodeDrawer from "./KPINodeDrawer/KPIVisualNodeDrawer";
import { Icon, Button } from "@material-ui/core";
import { CONTEXT } from "../../../config";
import { dataCatalog } from "../../../components/DataCatalog";
import kpiService from "../../../services/kpiService";
import { MenuContext } from "../../../context/MenuContext";
import uuid from "react-uuid";
import { evaluate } from "mathjs";
import { Popover } from "antd";
import TreeChart from "./KPIEditAnalysis/TreePreviewChart";
import ace from "ace-builds";

function filterBy(option, state) {
  if (state.selected.length) {
    return true;
  }
  return option.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
}
const elementList = [
  { id: 1, element: "Parent" },
  { id: 2, element: "Leaf" },
];
const initialRnd = {
  nodeId: "",
  displayName: "KPI",
  dataNode: false,
  formula: [],
  dataValue: [],
  filterValue: "",
  error: "No Title",
  parentId: [],
  childId: [],
  height: 120,
  width: 200,
  x: 250,
  y: 2,
  children: [],
};

class KPIVisualComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rnds: [],
      relations: [],
      optionsForDataField: [],
      optionsForDataTable: [], //LH-588
      optionsForEditorTable: [], //SQL Editor
      optionsFilter: [],
      errorInTree: false,
      selectedRnd: initialRnd,
      selectedRndFuntionOptions: [],
      selectedRndIndex: 0,
      nodeType: { key: 0, label: "Add Node" },
      drawerVisible: false,
      childrenDrawer: false,
      metricFields: [
        { key: "", name: "", unit: "", polarity: "Positive", text: "" },
      ],
      parameterFields: [
        {
          key: "",
          parameterName: "",
          parameterDescription: "",
          parameterType: "",
          parameterValue: "",
        },
      ],
      selectedKPIFieldIndex: -1,
      selectedKPIRndIndex: -1,
      modal10: false, // modal for displaying bottom alert
      modal11: false,
      leavingMessage: "Do you want to save the KPI?",
      settingsModal: false,
      previewModal: false,
      displayNewAnalysisModal: false,
      allFiltersList: [],
      filters: [{ name: "", label: "", values: [""] }], //SI-103 Provide alias filter name
      cohorts: [""], //LH-572
      drivers: [""],
      analysisName: "",
      analysisGoal: "",
      analysisParameter: "",
      colorThreshold: [],
      nextTreeID: -1, //LH-580
      availableMetricsList: [], // SI-72
      availableParameterList: [], // SI-72
      isLoading: false,
      allParametersList: [], //LC-723 Parameterized SQL Queries
      drawerSelected: "", //LC-723 Parameterized SQL Queries
      sampleKPITree: [],
    };
  }

  setSampleTreeData = (data) => {
    this.setState({ sampleKPITree: data });
  };

  toggleSettingsModal = () => {
    this.setState({ settingsModal: !this.state.settingsModal });
  };

  togglePreviewModal = () => {
    this.setState({ previewModal: false });
  };

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
  };

  setElementType = (e, nodeId, index) => {
    const rnds = [...this.state.rnds];
    let relations = [...this.state.relations];
    rnds[index].dataValue.forEach(
      (el, metricIdx) => (el.value = this.state.metricFields[metricIdx].text)
    );
    rnds[index].filterValue = "";
    rnds[index].formula.forEach((el) => {
      el.value = [];
      //Copy Primary's Formula to other fields
      el.sameasprimary = false;
    });
    if (e === "Parent") {
      rnds[index].dataNode = false;
    } else {
      rnds[index].dataNode = true;
      if (rnds[index].childId.length > 0) {
        rnds[index].childId.forEach((nodeId) => {
          rnds.forEach((rnd) => {
            if (rnd.nodeId === nodeId) {
              rnd.parentId = [];
            }
          });
        });
        rnds[index].childId = [];
        rnds[index].children = [];
        relations = relations.filter(
          (rel) => "parent" + nodeId !== rel.parentId
        );
      }
    }
    this.setState({
      rnds,
      relations,
      selectedRnd: { ...rnds[index] },
      selectedRndIndex: index,
    });
  };

  showDrawer = (node) => {
    let index = 0;
    const rnds = [...this.state.rnds];
    let rndData = rnds.filter((item, i) => {
      if (item.nodeId === node.nodeId) {
        index = i;
        return true;
      }
    });
    let functionOptions = this.functionRelationOptionsNew(rndData[0]);
    this.setState({
      drawerVisible: true,
      selectedRnd: rndData[0],
      selectedRndFuntionOptions: functionOptions,
      selectedRndIndex: index,
      selectedKPIFieldIndex: -1,
      selectedKPIRndIndex: -1,
    });
  };

  onClose = (RndIndex, dataNode, error) => {
    let rnds = [...this.state.rnds];
    rnds.forEach((rnd, index)=>{
      
      if(index===RndIndex){
        if (dataNode){
          rnd.error=error;
        }else{
       //Relation Error has highest priority
        if(rnd.error !== 'Child Relation missing')
        rnd.error=error;
      }
    }
    })
    let sampleKPITree = this.generatePreviewTree(rnds);
    this.setState({
      drawerVisible: false,
      sampleKPITree,
      rnds
    });
  };

  showChildrenDrawer = (rndIndex, dataIndex, drawerSelected) => {
    this.setState({
      childrenDrawer: true,
      selectedKPIRndIndex: rndIndex,
      selectedKPIFieldIndex: dataIndex,
      drawerSelected, //LC-723 Parameterized SQL Queries
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  getInitialRnds = () => {
    let rnds = [...this.props.initialData];
    let relations = [];
    let metricFields = [
      //Added alias and show
      { key: "", name: "", alias:"", show:"", unit: "", polarity: "Positive", text: "" },
    ];
    let parameterFields = this.props.kpiTreeParameter?this.props.kpiTreeParameter:[
      {
        key: "",
        parameterName: "",
        parameterDescription: "",
        parameterType: "",
        parameterValue: "",
      },
    ];
    let analysisName = "";
    let analysisGoal = "";
    let analysisParameter = "";
    let colorThreshold = [];
    let filters = [];
    let cohorts = [""]; //LH-572
    let drivers = [""];

    if (this.props.isNewAnalysis) {
      filters = [{ name: "", values: [""] }];
      rnds[0].displayName = "";
      rnds[0].dataNode = false;
      //Copy Primary's Formula to other fields
      rnds[0].formula = [
        //Added alias and show
        { name: "",  alias:"", show:"", unit: "", polarity: "", value: [], sameasprimary: false },
      ];
      rnds[0].dataValue = [];
      rnds[0].error = "No Title";
      rnds[0].parentId = [];
      rnds[0].childId = [];
      rnds[0].relation = "";
      rnds[0].height = 120;
      rnds[0].width = 200;
      rnds[0].x = 250;
      rnds[0].y = 2;
      rnds[0].children = [];
    }
    // For Edit of an existing KPI Tree
    if (!this.props.isNewAnalysis || this.props.newAnalysisSaved) {
      analysisName = this.props.analysisName;
      analysisGoal = this.props.analysisGoal;
      analysisParameter = this.props.analysisParameter;

      //SI-66 Retrieve Metrics List from the Root Node
      let tempMetric = this.props.initialData.filter(
        (rnd) => rnd.nodeId === "1"
      );
      let newTemp = [...tempMetric[0].dataValue];
      metricFields = [...newTemp];
      metricFields.forEach((m) => {
        if (m.value) {
          m.text = m.value;
          delete m.value;
        }
      });

      if (
        this.props.filters.length > 0 &&
        this.props.filters[0].name !== undefined
      ) {
        filters = [...this.props.filters];
      } else {
        //SI-103 Provide filter alias name
        filters.push({ name: "", label: "", values: [""] });
      }
      cohorts = [...this.props.cohorts]; //LH-572

      //Save the drivers
      drivers = [...this.props.drivers];

      //Save the threshold
      if (typeof this.props.colorThreshold === "string") {
        colorThreshold = "automatic";
      } else {
        if (
          Object.prototype.toString.call(this.props.colorThreshold) ===
          "[object Object]"
        ) {
          colorThreshold = [
            { 1: "default", threshold: { ...this.props.colorThreshold } },
          ];
        } else {
          colorThreshold = JSON.parse(
            JSON.stringify(this.props.colorThreshold)
          );
        }
      }
    }

    rnds.forEach((rnd) => {
      if (rnd.childId.length > 0) {
        rnd.childId.forEach((id) => {
          relations.push({
            parentId: "parent" + rnd.nodeId,
            childId: "child" + id,
          });
        });
      }
    });

    //Save Analysis Name and Goal for existing tree
    let selectedRnd;
    if (rnds) {
      selectedRnd = { ...rnds.filter((rnd) => rnd.nodeId === "1")[0] };
    }

    let sampleKPITree = this.generatePreviewTree(rnds);

    this.setState({
      rnds,
      sampleKPITree,
      relations,
      metricFields,
      parameterFields,
      colorThreshold,
      selectedRnd,
      analysisName,
      analysisGoal,
      analysisParameter,
      filters,
      cohorts, //LH-572
      drivers,
      domain: this.props.domain,
    }, ()=> this.setModalFlow());
  };

  getOptionsForData = (token) => {
    this.setState({ isLoading: true });
    dataCatalog()
      .then(
        ({
          optionsForDataField,
          optionsForDataTable,
          optionsForEditorTable,
        }) => {
          this.setState({
            optionsForDataField,
            optionsForDataTable,
            optionsForEditorTable,
            isLoading: false,
          });
        }
      )
      .catch((error) => console.error(error.message));
  };

  //LC-723 Parameterized SQL Queries
  getOptionsForParameters = () => {
    kpiService
      .getAllParameters()
      .then(({ data }) => {
        if (data.code === 200) {
          this.setState({
            allParametersList: data.response.map((parm) => {
              return {
                key: "{" + parm.parameterName + "}",
                title: parm.parameterName,
                value: parm.parameterValue,
              };
            }),
          });
        }
      })
      .catch((error) => console.error(error.message));
  };

  getFilterValue = (nodeData) => {
    let returnVal = [];
    if (nodeData.length > 0) {
      nodeData.forEach((node) => {
        let tempVal = this.state.optionsFilter.filter(
          (val) => val.label === node.label
        );
        if (tempVal.length > 0 && tempVal[0].filterValue) {
          returnVal = [...returnVal, ...JSON.parse(tempVal[0].filterValue)];
        } else {
          returnVal = ["No Filters"];
        }
      });
    }
    return returnVal;
  };

  //PNC header
  getFiltersForKPI = () => {
    kpiService
      .getFiltersForKPI()
      .then(({ data }) => {
        if (data.code === 200) {
          this.setState({ allFiltersList: [...data.response] });
        }
      })
      .catch((error) => console.error(error.message));
  };

  retrieveMetricsList = () => {
    kpiService
      .getAllMetrics()
      .then((res) => {
        if (res.data.code === 200) {
          let selectedMetrics = res.data.response.map((metric) => ({
            key: metric.metricId,
            description: metric.metricDescription,
            name: metric.metricName,
            unit: metric.metricUnit,
            polarity: metric.metricPolarity,
            orig_text: metric.metricSqlSelect,
            text: metric.metricSqlSelect,
          }));

          this.setState({ availableMetricsList: selectedMetrics });
          this.getInitialRnds();
        }
      })
      .catch((error) => {
        console.error(error.message);
        this.getInitialRnds();
      });
  };

  retrieveParameterList = () => {
    kpiService
      .getAllParameters()
      .then((res) => {
        if (res.data.code === 200) {
          let selectedParameters = res.data.response.map((parameter) => ({
            key: parameter.parameterId,
            parameterName: parameter.parameterName,
            parameterDescription: parameter.parameterDescription,
            parameterType: parameter.parameterType,
            parameterValue: parameter.parameterValue,
          }));

          this.setState({ availableParameterList: selectedParameters });
          this.getInitialRnds();
        }
      })
      .catch((error) => {
        console.error(error.message);
        this.getInitialRnds();
      });
  };

  componentDidMount() {
    this.getOptionsForData();
    this.getFiltersForKPI(); //PNC Header
    this.retrieveMetricsList();
    this.retrieveParameterList();
    this.getOptionsForParameters(); //Lc-723 Parameterized SQL Queries
  }

  setModalFlow = () => {
    if (this.props.isNewAnalysis) {
      if (this.props.newAnalysisSaved === true) {
        this.setState({ previewModal: true });
      } else {
        this.setState({ displayNewAnalysisModal: true });
      }
    } else {
      if (
        !this.props.status ||
        (this.props.status && !this.props.status === "Published")
      ) {
        this.setState({ previewModal: true });
      }
    }
  };

  //LC-695 Clone the Leaf Node
  addCard = (parentId) => {
    const rnds = [...this.state.rnds];
    let { metricFields, selectedRnd } = this.state;
    let newID = "node" + uuid().split("-").join("");
    let dataFieldArray = [];
    let formulaArray = [];

    metricFields.forEach((fld) => {
      //Leaf Node Data for New Card
      dataFieldArray.push({
        key: fld.key,
        name: fld.name,
        alias: fld.name,      //Metrics Alias Name 
        unit: fld.unit,
        polarity: fld.polarity,
        value: fld.text,
        show: true        //Metrics show on chart
      });
      //LC-695 Clone Leaf node Code Ends

      formulaArray.push({
        key: fld.key,
        name: fld.name,
        alias: fld.name,      //Metrics Alias Name 
        unit: fld.unit,
        polarity: fld.polarity,
        value: [],
        //Copy Primary's Formula to other fields
        sameasprimary: false,
        show: true        //Metrics show on chart
      });
    });
    rnds.push({
      nodeId: newID,
      displayName: "",
      dataNode: true,
      children: [],
      dataValue: [...dataFieldArray],
      formula: [...formulaArray],
      parentId: [parentId],
      childId: [],
      //relation: "", LC-695
      relation: selectedRnd.relation,
      error: "No Title",
      height: 113,
      width: 150,
      x: selectedRnd.displayName !== "KPI" ? selectedRnd.x + 20 : 0,
      y: selectedRnd.displayName !== "KPI" ? selectedRnd.y + 20 : 0,
    });

    rnds.forEach((rnd) => {
      if (rnd.nodeId === parentId) {
        rnd.childId.push(newID);
        rnd.dataNode = false;
      }
    });

    let sampleKPITree = this.generatePreviewTree(rnds);

    this.setState({ rnds, sampleKPITree });
  };

  removeCard = (nodeId) => {
    let deletedNode = this.state.rnds.filter((rnd) => rnd.nodeId === nodeId);
    let confirmation = true;
    if(deletedNode[0].children.length > 0){
      alert("This node contains child node. Please delete children first.");
      confirmation = false;
    }
    if (confirmation) {
      let rnds = this.state.rnds.filter((rnd) => rnd.nodeId !== nodeId);
      let relations = this.state.relations.filter(
        (rel) => "parent" + nodeId !== rel.parentId
      );
      relations = relations.filter((rel) => "child" + nodeId !== rel.childId);
  
      rnds.forEach((rnd) => {
        if (rnd.parentId[0] === nodeId) {
          rnd.parentId = [];
        }
        rnd.childId.forEach((id) => {
          if (id === nodeId) {
            rnd.childId = rnd.childId.filter((el) => el !== nodeId);
  
            rnd.children = rnd.children.filter(
              (child) => child.nodeId !== nodeId
            );
            rnd.error = "Invalid Expression";
  
            rnd.formula.forEach((val) => {
              let newExp = val.value.filter(
                (f) => f.label !== deletedNode[0].displayName
              );
              val.value = [...newExp];
            });
          }
        });
      });

      rnds.forEach(rnd => {
        if(rnd.nodeId!=='1' && deletedNode[0].parentId.length > 0 && deletedNode[0].parentId[0]===rnd.nodeId){
          if(rnd.children.length === 0){
            rnd.dataNode =true;
            let dataError = "";
            rnd.dataValue.forEach((fld, i) => {
              if (fld.value.length === 0)  {
                dataError = "Empty Expressions";
              }
            });
            rnd.error = dataError;
          }
        }
      })

      let sampleKPITree = this.generatePreviewTree(rnds);
      this.setState({ rnds, relations, drawerVisible: false, sampleKPITree });
    }
  };

  setRelationString = (e, index) => {
    let { rnds } = this.state;
    rnds[index].relation = e;
    this.setState({ rnds });
  };

  setFieldNames = (e, index) => {
    let { metricFields, rnds } = this.state;
    let error = "";
    metricFields[index].name = e;
    this.state.metricFields.forEach((fld) => {
      if (fld.name === "") {
        error = "Fieldnames are empty";
      }
    });
    rnds.forEach((rnd) => {
      if (rnd.nodeId === "1") {
        if (rnd.formula.length === 0) {
          error = "No Expression";
        }
        rnd.error = error;
      }
      rnd.dataValue[index].name = e;
    });

    this.setState({ metricFields, rnds });
  };

  //PNC Header
  saveAnalysisDetails = (
    analysisName,
    analysisGoal,
    analysisParameter,
    metricsList,
    parameterList,
    colorThreshold,
    colorSetup,
    filters,
    drivers,
    cohorts
  ) => {
    let dataFieldArray = [];
    let formulaArray = [];
    metricsList.forEach((fld) => {
      dataFieldArray.push({
        key: fld.key,
        name: fld.name,
        unit: fld.unit,
        polarity: fld.polarity,
        value: fld.text,
      });
      formulaArray.push({
        key: fld.key,
        name: fld.name,
        unit: fld.unit,
        polarity: fld.polarity,
        value: [],
        //Copy Primary's Formula to other fields
        sameasprimary: false,
      });
    });

    let { rnds } = this.state;
    metricsList.forEach((metric) => {
      rnds.forEach((rnd) => {
        if (rnd.dataNode) {
          // For Data node
          let fIndex = rnd.dataValue.findIndex((n) => n.key === metric.key);
          if (fIndex !== -1) {
          } else {
            //key not found, add new metric
            rnd.dataValue.push({
              key: metric.key,
              name: metric.name,
              unit: metric.unit,
              polarity: metric.polarity,
              // SI-72 Query passed from Settings
              value: metric.text,
            });
          }
          // Also set the formula fields in case user changes type later on
          rnd.formula = [...formulaArray];
        } else {
          //for Formula Node
          let fIndex = rnd.formula.findIndex((n) => n.key === metric.key);
          if (fIndex !== -1) {
            //key found, set same value, change everything else
            rnd.formula[fIndex].name = metric.name;
            rnd.formula[fIndex].unit = metric.unit;
            rnd.formula[fIndex].polarity = metric.polarity;
          } else {
            //key not found, add Metric
            rnd.formula.push({
              key: metric.key,
              name: metric.name,
              unit: metric.unit,
              polarity: metric.polarity,
              value: [],
              //Copy Primary's Formula to other fields
              sameasprimary: false,
            });
          }
          // Also set the data fields in case user changes type later on
          rnd.dataValue = [...dataFieldArray];
        }
      });
    });

    //Check that if metric key is not found, remove that field
    rnds.forEach((rnd) => {
      if (rnd.dataNode) {
        rnd.dataValue.forEach((val, i) => {
          if (metricsList.findIndex((m) => m.key === val.key) === -1) {
            rnd.dataValue.splice(i, 1);
          }
        });
      } else {
        rnd.formula.forEach((val, i) => {
          if (metricsList.findIndex((m) => m.key === val.key) === -1) {
            rnd.formula.splice(i, 1);
          }
        });
      }
    });

    //SI-66 Save Metrics List as data Value of Root Node, as it would be used as reference
    // in the next Edit
    rnds[0].dataValue = [...metricsList];
    let sampleKPITree = this.generatePreviewTree(rnds);

    this.setState({
      rnds,
      sampleKPITree,
      settingsModal: !this.state.settingsModal,
      analysisName,
      analysisGoal,
      analysisParameter,
      colorThreshold: colorSetup === "manual" ? colorThreshold : "automatic",
      metricFields: [...metricsList],
      parameterFields: [...parameterList],
      filters: [...filters],
      drivers: [...drivers],
      cohorts: [...cohorts], //LH-572
    });
  };

  setDisplayName = (nodeId, e, index, error) => {
    let expression = e;
    let duplicateError = "";
    let rnds = [...this.state.rnds];
    let relations = [...this.state.relations];
    let previousName = rnds.filter((rnd) => rnd.nodeId === nodeId)[0]
      .displayName;
    if (
      rnds.filter(
        (rnd) => rnd.displayName.toLowerCase() === expression.toLowerCase()
      ).length > 0
    ) {
      duplicateError = "Title already exists";
    }
    rnds[index].displayName = expression;
    let newerr = error ? error : "";

    rnds[index].error = duplicateError !== "" ? duplicateError : newerr;
    this.setState({ rnds, relations });
  };

  addRelation = (nodeId, event, index, fIndex, error) => {
    let rnds = [...this.state.rnds]; 
     //Sanjit - Separate Labels for selected Metrics in a Formula Node 
    //e.g. ChildNode1.[Met2] = {label:ChildNode1}, {label:[Met2]}
    let exploded_event = [];
    event.forEach((e, index)=>{
      let newIndex = e.label.indexOf(".['");
      if(newIndex >= 0){
        exploded_event.push({label:e.label.slice(0, newIndex), id:"val-" + index});
        exploded_event.push({label:e.label.slice(newIndex + 1), id:"val-" + index, customOption:true, 
        metricName:e.metricName.slice(newIndex + 1)
      });
      }else{
        if(e.customOption){        
          exploded_event.push(e);
        }else{
          exploded_event.push({label:e.label, id:"val-" + index});
        }
      }
    })
    // console.log("EXPLODED EVENT", exploded_event);
    rnds[index].formula[fIndex].value = exploded_event;
    //Copy Primary's Formula to other fields
    rnds[index].formula.forEach((row, rowIdx) => {
      if (rowIdx !== 0 && row.sameasprimary) {
        row.value = [...exploded_event];
      }
    });

    let allChildName=this.state.rnds.filter(rnd=>rnd.nodeId === nodeId)[0].children.map(child=>child.displayName);
    let relationError="";

    rnds.forEach((rnd) => {
      if (rnd.parentId[0] === nodeId) {
        if(!exploded_event.map(n=>n.label).includes(rnd.displayName) && allChildName.includes(rnd.displayName)){
          relationError ="Child Relation missing";
        }
      }
    });
    
    if(relationError){
      rnds[index].error = relationError;
    }else{
     rnds[index].error = this.validateEmptyFormulaInAllMetrices(fIndex);
    }
    //Remove existing relations if event is blanks
    if (
      event.length === 0 ||
      (event.length === 1 && event[0].label === "") ||
      (event.length === 1 && event[0] === "")
    ) {
      rnds[index].formula[fIndex].value = [];
    }
      this.setState({ rnds });
   
  };

  checkMetricEntry = (nodeId, event, index, fIndex, error) => {
    let rnds = [...this.state.rnds];
     //Sanjit - Separate Labels for selected Metrics in a Formula Node 
    //e.g. ChildNode1.[Met2] = {label:ChildNode1}, {label:[Met2]}
    let exploded_event = [];
    event.forEach((e, index)=>{
      let newIndex = e.label.indexOf(".['");
      if(newIndex >= 0){
        exploded_event.push({label:e.label.slice(0, newIndex), id:"val-" + index});
        exploded_event.push({label:e.label.slice(newIndex + 1), id:"val-" + index, customOption:true, 
        metricName:e.metricName.slice(newIndex + 1)
      });
      }else{
        if(e.customOption){        
          exploded_event.push(e);
        }else{
          exploded_event.push({label:e.label, id:"val-" + index});
        }
      }
    })

    rnds[index].formula[fIndex].value = exploded_event;

    rnds[index].error =  error;
    this.setState({ rnds });
  };

  //SI-72 Remove FROM WHERE fields and set a single field
  setDataNode = (event, rndIndex, dataIndex) => {
    let newError = "";

    let rnds = [...this.state.rnds];
    rnds[rndIndex].dataValue[dataIndex].value = event;
    newError = this.validateDataNode(dataIndex);   
    rnds[rndIndex].error = newError;

    this.setState({ rnds });
  };

  //SI-66
  resetMetricQuery = (key, mode) => {
    if (mode === "settings") {
      let availableMetric = this.state.availableMetricsList.find(
        (ml) => ml.key === key
      );
      if (availableMetric) return availableMetric.orig_text;
    }
    if (mode === "node") {
      let metric = this.state.metricFields.find((mf) => mf.key === key);
      if (metric) return metric.text;
    }
    return null;
  };

  validateDataNode = (title, indx=null) => {
     // If the name of the node is blanks, send error message
    let nodeGeneralError = this.validateNode(title);
    if(nodeGeneralError) return nodeGeneralError;
    
    let dataError="";
    this.state.selectedRnd.dataValue.forEach((fld, i) => {
      if((indx && indx!== i) || !indx){
      if (fld.value.length === 0)  {
        dataError = "Empty Expressions";
      }
    }
    });
    return dataError;
  };

  // General Node fields check - Title and Metrics Name not blanks
  validateNode = (title) => {
    if (title === "") {
      return "No Title";
    }

    let fieldnameerror = "";
    this.state.metricFields.forEach((fld) => {
      if (fld.name === "") {
        fieldnameerror = "Fieldnames are empty";
      }
    });
    if (fieldnameerror) {
      return fieldnameerror;
    }
    return "";
  };

  validateEmptyFormulaInAllMetrices = (indx=null) => {
       
     // If the expression is blanks, send error message
    let formulaError = "";
    this.state.selectedRnd.formula.forEach((fld, i) => {
      if((indx && indx!== i) || !indx){
      if (fld.value.length === 0)  {
        formulaError = "Empty Expressions";
      }
    }
    });

    return formulaError;
    
  }

 
  validateFormulaNode = (title, formula, dataOptions, metIndx=null) => {
    // If the expression is blanks, send error message
    if (formula.length === 0) {
      return "No Expression";    // Returning Node level error
    }
   
    let errorInExpression = false;
    let validExpression = false;
    formula.forEach((n, index) => {
      let expression = "";

      if (dataOptions && dataOptions.filter((opt) => opt.label === n.label).length > 0) {
        expression = expression + "1";
        if (index < formula.length - 1) {
          if (
            dataOptions.filter((opt) => opt.label === formula[index + 1].label)
              .length > 0
          ) {
            errorInExpression = true;
          }
        }
      } else {
        expression = expression + n.label;
      }
      // });
      if (errorInExpression) {
        return "Invalid Expression";    //Node level error
      }

      if (!errorInExpression) {
        expression = expression.toLowerCase();

        let newExpression = (" " + expression + " ").replace(
          /([a-z]{2,})/gi,
          "$1"
        );
        newExpression = newExpression.replace("count", "mean");

        try {
          validExpression = !isNaN(evaluate(newExpression));
        } catch (e) {
          validExpression = false;
        }
        return validExpression ? "" : "Invalid Expression";
      }
    });
  

     // If the name of the node is blanks, send error message
     let nodeGeneralError = this.validateNode(title);
     if(nodeGeneralError) return nodeGeneralError;

     //Check formula in all 
      let allFormulaError= this.validateEmptyFormulaInAllMetrices(metIndx);
      if (allFormulaError) return allFormulaError;

      //No error return blank string
      return "";
  };

  //Copy Primary's Formula to other fields
  setSameAsPrimaryFalse = (rndIndx, formulaIndx) => {
    let rnds = [...this.state.rnds];
    rnds[rndIndx].formula[formulaIndx].sameasprimary = false;
    this.setState({ rnds });
  };

  //Copy Primary's Formula to other fields
  changeSameAsPrimary = (e, rndIndx, formulaIndx) => {
    let rnds = [...this.state.rnds];
    if (e.target.checked === true) {
      rnds[rndIndx].formula[formulaIndx].sameasprimary = true;
      if (rnds[rndIndx].formula[0].value.length > 0) {
        rnds[rndIndx].formula[formulaIndx].value = [
          ...rnds[rndIndx].formula[0].value,
        ];
      }

      //Validate Empty Expressions - LC-837
      let formulaError = this.validateEmptyFormulaInAllMetrices(formulaIndx);
    
      if(!rnds[rndIndx].error !== 'Child Relation missing'){
      rnds[rndIndx].error = formulaError;
      }
    } else {
      rnds[rndIndx].formula[formulaIndx].sameasprimary = false;
      rnds[rndIndx].formula[formulaIndx].value = [];
    }
    this.setState({ rnds });
  };

  //Change Metrics Unit
  changeMetricsUnit = (e, rndIndx, indx, dataNode) => {
    let rnds = [...this.state.rnds];
    if (!dataNode) {
      rnds[rndIndx].formula[indx].unit = e.target.value;
    } else {
        rnds[rndIndx].dataValue[indx].unit = e.target.value;
    }

    this.setState({ rnds});
  };

  
   //Display Metrics On/off 
   changeMetricsShow = (e, rndIndx, indx, dataNode) => {
    let rnds = [...this.state.rnds];
    //Sanjit - Change Show attribute on both Formula and datavalue of the Node
    // if (!dataNode) {
      rnds[rndIndx].formula[indx].show = !rnds[rndIndx].formula[indx].show;
    // } else {
        rnds[rndIndx].dataValue[indx].show = !rnds[rndIndx].dataValue[indx].show;
    // }

    this.setState({ rnds});
  };

  //Change Metrics Alias 
  changeMetricsAlias = (e, rndIndx, indx, dataNode) => {
    let rnds = [...this.state.rnds];
    // if (!dataNode) {
      rnds[rndIndx].formula[indx].alias = e.target.value;
    // } else {
        rnds[rndIndx].dataValue[indx].alias = e.target.value;
    // }

    this.setState({ rnds });
  };


  functionRelationOptionsNew = (currentRnd) => {
    let rnds = [...this.state.rnds];
    let options = [];

    if (rnds.length > 0) {

      //Sanjit = Allow Self Metric Entries
      currentRnd.dataValue.forEach(val=>{
        options.push({ label: `this.['${val.alias?val.alias:val.name}']`, metricName:`this.['${val.name}']` });   // Sanjit - Show Cross Metrics 
      })

      let childIDs = []; 
      currentRnd.childId.map(child=> {
        let childData = this.state.rnds.filter(rnd => rnd.nodeId===child)
        childIDs = [...childIDs,...childData]
      })
      if (childIDs.length > 0) {
        
        //Sanjit = Allow child Name[Metric] entry also
       
        childIDs.forEach(opt=>{
          options.push({ label: opt.displayName });
          opt.dataValue.forEach(val=>{
            options.push({ label: `${opt.displayName}.['${val.alias?val.alias:val.name}']`, metricName:`${opt.displayName}.['${val.name}']` });   // Sanjit - Show Cross Metrics 
          })
        })
        return options;

      } 
      //Intra node metrics allowed - commenting below code because dropdowns will be 
      //available even if there are no children
      // else {
        // return [{ label: "No Valid Node" }];
      // }
    } else {
      return [{ label: "No Ids" }];
    }
  };

  functionRelationOptions = (currentRnd) => {
    let rnds = [...this.state.rnds];

    if (rnds.length > 0) {
      //Pick current children for dropdown
      let childIDs = this.state.rnds.filter(
        (rnd) => rnd.parentId[0] === currentRnd.nodeId
      );

      //Pick nodes with no parents for dropdown
      let filteredIDs = this.state.rnds.filter(
        (rnd) => rnd.parentId.length === 0
      );

      //Remove Top most node from dropdown
      filteredIDs = filteredIDs.filter((rnd) => rnd.nodeId !== "1");

      //Remove nodes with no Title
      // filteredIDs = filteredIDs.filter((rnd) => rnd.displayName !== ''); - covered with error check below

      filteredIDs = [...childIDs, ...filteredIDs];

      //Remove nodes with error
      filteredIDs = filteredIDs.filter((rnd) => rnd.error === "");

      if (filteredIDs.length > 0) {
        let options = filteredIDs.map((opt) => {
          return { label: opt.displayName };
        });
        return options;
      } else {
        return [{ label: "No Valid Node" }];
      }
    } else {
      return [{ label: "No Ids" }];
    }
  };

  //LC-460 Dont allow save if mandatory fields are blanks
  validateMandatoryFields = () => {
    if (
      this.state.analysisName !== "" &&
      this.state.metricFields[0].key !== ""
    ) {
      return true;
    }
    return false;
  };

  acceptNewAnalysis = () => {
    this.setState({ displayNewAnalysisModal: false, settingsModal: true });
  };

  // SI-72 Replace FROM WHERE with one Text Field
  onSelectTableData = (selectedKeys) => {
    if (this.state.selectedKPIRndIndex > -1) {
      // let rnds = [...this.state.rnds];  //LC-1081 - Add parameter/catalog in the editor now
      if (selectedKeys.length > 0) {
        let str = selectedKeys[0];
        if (/[#]+/.test(str)) {
          str = str.split("#")[0];
        }

      //LC-1081 Set Parameter on cursor location - Change starts
        // let newData =
        //   rnds[this.state.selectedKPIRndIndex].dataValue[
        //     this.state.selectedKPIFieldIndex
        //   ].value +
        //   " " +
        //   str;

        // rnds[this.state.selectedKPIRndIndex].dataValue[
        //   this.state.selectedKPIFieldIndex
        // ].value = newData;

        // this.setState({ rnds });
        let editor = ace.edit("sql_editor"+'_' +this.state.selectedKPIRndIndex+'_' 
                                          + this.state.selectedKPIFieldIndex);
        let cursorPosition = editor.getCursorPosition();
        editor.session.insert(cursorPosition, str);
    //LC-1081 Set Parameter on cursor location - Change ends
      }
    }
  };

  //Sanjit - Insert Python operator
  onSelectOperator= (selectedKeys) => {
    let rnds=this.state.rnds;
    let curr_length=rnds[this.state.selectedKPIRndIndex]
    .formula[this.state.selectedKPIFieldIndex].value.length;
    if (this.state.selectedKPIRndIndex > -1) {
      // console.log("KEYS", selectedKeys);
      rnds[this.state.selectedKPIRndIndex].formula[this.state.selectedKPIFieldIndex].value.push(
        {label:selectedKeys[0], id:"opr-" + curr_length, customOption: true}
      );
      // console.log("ADDED FORMULA:",rnds[this.state.selectedKPIRndIndex].formula[this.state.selectedKPIFieldIndex].value);
      this.setState({rnds});
    }}

  setDataFieldFocus = (rndIndex, dataIndex) => {
    this.setState({
      selectedKPIRndIndex: rndIndex,
      selectedKPIFieldIndex: dataIndex,
    });
  };
  processNodeChildren = (children) => {
    let childrenObjects = [];
    children.forEach((child) => childrenObjects.push(this.processChild(child)));
    return childrenObjects;
  };

  processChild = (child) => {
    let childObject = {
      nodeSvgShape: {
        shape: "",
      },
      attributes: [],
      children: [],
    };
    childObject.nodeId = child.nodeId;
    childObject.name = child.displayName;
    childObject.error = child.error;
    childObject.relation = child.relation ? child.relation : "";
    childObject.nodeSvgShape.shape = "rect";

    // for add metrics on parent card
    if (child.dataNode) {
      child.dataValue.forEach((val) => {
        let attName = val.alias ?val.alias:val.name;  //use alias name 
        let newObj = {};
        newObj.show = val.hasOwnProperty('show')?val.show:true;
        let polarity = val.polarity === "Positive" ? "+" : "-";
        newObj[attName] = val.unit && polarity + "__" + val.unit;
        // childObject.attributes[val.name] = polarity + "__" + val.unit;
        childObject.attributes.push(newObj);
      });
    }

    if (!child.dataNode) {
      child.formula.forEach((val) => {
        // let labels = "";
        // val.value.forEach((n) => {
        //   if (n !== "") {
        //     labels = labels + n.label;
        //   }

          let attName = val.alias ?val.alias:val.name; //use alias name
          let newObj = {};
          newObj.show = val.hasOwnProperty('show')?val.show:true;
          let polarity = val.polarity === "Positive" ? "+" : "-";
          newObj[attName] = val.unit && polarity + "__" + val.unit;
          // childObject.attributes[val.name] = polarity + "__" + val.unit;
          childObject.attributes.push(newObj);
        // });
      });

      childObject.children = this.processNodeChildren(child.children);
    }
    return childObject;
  };

  generatePreviewTree = (rnds) => {
    let errorInTree = false;
    let currentTreeObject = {
      nodeSvgShape: {
        shape: "",
      },
      attributes: [],
      relation: "",
      children: [],
    };

    const addRndChildren = (node) => {
      node.children = [];
      if (node.error !== "") {
        errorInTree = true;
      }
      //Set Show attribute to True for each Metrics of Child Node if show does not exist
      node.formula.forEach(f=>{ if(!f.hasOwnProperty('show')){f.show=true; }})
      node.dataValue.forEach(d=>{ if(!d.hasOwnProperty('show')){d.show=true; }})

      if (node.childId.length > 0) {
        let unique = [...new Set(node.childId)];
        node.childId = [...unique];
        node.childId.forEach((id) => {
          let child = rnds.filter((rnd) => rnd.nodeId === id);
          node.children.push(addRndChildren(child[0]));
        });
      }
      return node;
    };
    // Node Id = "1" is the primary node
    let tree = rnds.filter((rnd) => rnd.nodeId === "1");

    tree[0].children = [];
    if (tree[0].error !== "") {
      errorInTree = true;
    }

    //Set Show attribute to True for each Metrics of Node #1 if show does not exist
    tree[0].formula.forEach(f=>{ if(!f.hasOwnProperty('show')){f.show=true; }})

    let unique = [...new Set(tree[0].childId)];
    tree[0].childId = [...unique];
    tree[0].childId.forEach((id) => {
      let child = rnds.filter((rnd) => rnd.nodeId === id);
      tree[0].expanded = true; //property to make it openable in Menu version
      tree[0].children.push(addRndChildren(child[0]));
    });

    //Tree structure for Processed KPI Tree
    tree.forEach((node) => {
      currentTreeObject.nodeId = node.nodeId;
      currentTreeObject.name = node.displayName;
      currentTreeObject.error = node.error;
      currentTreeObject.nodeSvgShape.shape = "rect";
      currentTreeObject.relation = node.relation ? node.relation : "";

      if (node.dataNode) {
        node.dataValue.forEach((val) => {
          currentTreeObject.attributes[val.name] = val.value;
        });
      }

      if (!node.dataNode) {
        node.formula.forEach((val) => {
          // let labels = "";
          // val.value.forEach((n) => {
          //   if (n !== "") {
          //     labels = labels + n.label;
          //   }
            let polarity = val.polarity === "Positive" ? "+" : "-";

            //Save with alias Name First
            let attName = val.alias ?val.alias:val.name;
            let newObj = {};
            newObj[attName] = polarity + "__" + val.unit;
            newObj.show = val.show;
            currentTreeObject.attributes.push(newObj);
            // currentTreeObject.attributes[val.name] = polarity + "__" + val.unit;
          // });
        });
        currentTreeObject.children = this.processNodeChildren(node.children);
      }
    });
    return [currentTreeObject];
  };

  saveData = (setKPITreeData, status) => {
    document
      .querySelector("#savePreviewBtn")
      .setAttribute("disabled", "disabled");
    if (!this.validateMandatoryFields()) {
      return;
    }
    let errorInTree = false;

    //Create Tree from rnds;
    const rnds = [...this.state.rnds];
    let calcTree = [];
    rnds.forEach((rnd) => {
      let treeObj = {
        childrenIdList: JSON.stringify(rnd.childId),
        kpiTreeId: "",
        nodeId: rnd.nodeId,
        nodeName: rnd.displayName,
        nodeExpression: "",
        parentId: rnd.parentId[0] ? rnd.parentId[0] : "0",
        relation: rnd.relation ? rnd.relation : "",
      };

      let obj = {};
      let pol = {};
      let unit = {};
      let unit_field = rnd.dataNode
        // ? rnd.dataValue[0].name
        // : rnd.formula[0].name;
        ? rnd.dataValue[0].alias? rnd.dataValue[0].alias:rnd.dataValue[0].name
        : rnd.formula[0].alias?rnd.formula[0].alias:rnd.formula[0].name;

      if (rnd.dataNode && rnd.dataValue.length > 0) {
        rnd.dataValue.forEach((val) => {
          //Use metrics Alias rather than metrics name if it is available 
          //Dont save metrics if show is false
          //Use metrics Alias rather than metrics name if it is available 
          // if(val.show){
            let metName = val.alias?val.alias:val.name;
            // obj[val.name] = val.value;
            // pol[val.name] = val.polarity === "Positive" ? "+" : "-";
            // unit[val.name] = val.unit;
  
            obj[metName] = val.value;
            pol[metName] = val.polarity === "Positive" ? "+" : "-";
            unit[metName] = val.unit;
           
            // }
        });
      }

      if (!rnd.dataNode) {
        if (rnd.formula.length > 0) {
          rnd.formula.forEach((val) => {
            let labels = "";
            val.value.forEach((n, index) => {
              if (n !== "") {
                let IDLabelArr = rnds.filter(
                  (rnd) => rnd.displayName === n.label
                );
                let label =
                  IDLabelArr.length > 0 ? IDLabelArr[0].nodeId : n.label;
                labels = index === 0 ? label : labels + label;
              }
            });
          //Use metrics Alias rather than metrics name if it is available 
          // if(val.show){ - Commented to save a metrics if it is shown 
            let metName = val.alias?val.alias:val.name;
          
            obj[metName] = labels ? labels.split(" ").join("") : "";
            pol[metName] = val.polarity === "Positive" ? "+" : "-";
            unit[metName] = val.unit;

          });
        }
      }
      treeObj.nodeExpression = JSON.stringify({ ...obj });
      treeObj.polarity = JSON.stringify({ ...pol });
      treeObj.unit = JSON.stringify({ ...unit });
      treeObj.cohortEntities = "";
      treeObj.unitField = unit_field;
      calcTree.push(treeObj);
    });

    if (errorInTree) {
      setTimeout(() => this.showSaveError(), 5000);
    }
    let finalStructure = this.generatePreviewTree(rnds);
    if (this.props.analysisId) {
      setKPITreeData({
        raw: [...rnds],
        processed: [...finalStructure],
        calculations: [...calcTree],
        description: this.state.analysisName,
        kpi_tree_goal: this.state.analysisGoal,
        kpi_tree_parameter: this.state.parameterFields,
        status: status,
        colorThreshold: this.state.colorThreshold,
        treeId: this.props.analysisId,
        kpi_tree_domain: this.props.domain,
        chosen_filter: this.state.filters,
        populate_drivers: this.state.drivers,
        cohort_name: this.state.cohorts,
        existingTree: true,
      });
    } else {
      kpiService
        .getSequence()
        .then(({ data }) => {console.log(data)
          if (data.code === 200) {
            setKPITreeData({
              raw: [...rnds],
              processed: [...finalStructure],
              calculations: [...calcTree],
              description: this.state.analysisName,
              kpi_tree_goal: this.state.analysisGoal,
              kpi_tree_parameter: this.state.parameterFields,
              status: status,
              colorThreshold: this.state.colorThreshold,
              treeId: data.response.nextval,
              kpi_tree_domain: this.props.domain,
              chosen_filter: this.state.filters,
              populate_drivers: this.state.drivers,
              cohort_name: this.state.cohorts, //LH-572
              existingTree: false,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  showSaveError = () => {
    this.setState({ errorInTree: true });
    setTimeout(() => this.setState({ errorInTree: false }), 5000);
  };

  render() {
    let {
      selectedRnd,
      selectedRndFuntionOptions,
      selectedRndIndex,
      selectedKPILink,
    } = this.state;
    //LC-460 Dont allow save if mandatory fields are blanks
    let isTreeValidated = this.validateMandatoryFields();
    return (
      <AppContext.Consumer>
        {({
          setKPITreeData,
          deleteKPITree,
          theme,
          selectedKPILink,
          checkDuplicateTree,
        }) => {
          //PNC Header set fluid
          return (
            <MenuContext.Consumer>
              {({ siderCollapsed }) => {
                return (
                  <React.Fragment>
                    <div className="container-fluid bg-white border-bottom p-3 position-relative">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="kpi--heading font-weight-bold">
                          <span
                            className={
                              this.props.isNewAnalysis ? "d-inline" : "d-none"
                            }
                          >
                            [Draft]
                          </span>
                          {this.state.analysisName
                            ? this.state.analysisName
                            : "Set Analysis Name"}
                          <Popover
                            content={
                              <div className="p-3">
                                <p>
                                  {this.state.analysisGoal
                                    ? this.state.analysisGoal
                                    : "Set Analysis Goal"}
                                </p>
                              </div>
                            }
                            placement="bottomLeft"
                            overlayStyle={{ maxWidth: "500px" }}
                            arrow
                          >
                            <Icon className="align-middle text-secondary-blue ml-2">
                              info_outlined
                            </Icon>
                          </Popover>
                        </div>

                        <div className="d-flex flex-row align-items-center">
                            <div className="mr-3">
                              <Button
                                color="primary"
                                size="large"
                                variant="outlined"
                                onClick={() => {
                                  if (this.props.status === 'Published') {
                                    this.props.editAnalysis()
                                  } else {
                                    this.setState({previewModal: true})
                                  }
                                }}>
                                Go Back
                              </Button>
                            </div>

                          {this.props.isNewAnalysis && (
                            <Button
                              color="primary"
                              size="large"
                              variant="outlined"
                              className="mr-3"
                            >
                              <NavLink
                                to={selectedKPILink ? selectedKPILink : "#"}
                              >
                                CANCEL
                              </NavLink>
                            </Button>
                          )}

                          {!this.props.isNewAnalysis && (
                            <Button
                              color="primary"
                              size="large"
                              variant="outlined"
                              className="mr-3"
                              onClick={() => {
                                const confirmation = window.confirm(
                                  "Are you sure you want to disable this Analysis Tree?"
                                );
                                if (confirmation) {
                                  deleteKPITree(this.props.analysisId);
                                  this.props.history.goBack();
                                }
                              }}
                            >
                              DISABLE TREE
                            </Button>
                          )}
                          <Button
                            color="primary"
                            size="large"
                            variant="outlined"
                            className="mr-3"
                            onClick={this.toggleSettingsModal}
                          >
                            EDIT SETTINGS
                          </Button>
                          <Button
                            id="savePreviewBtn"
                            color="primary"
                            size="large"
                            variant="contained"
                            style={{
                              background: this.state.errorInTree
                                ? "red"
                                : //LC-460 - Do not allow Save when mandatory fields empty
                                isTreeValidated
                                ? "#043365"
                                : "#D3D3D3",
                            }}
                            onClick={() =>
                              this.saveData(
                                setKPITreeData,
                                this.props.status ? this.props.status : "Saved"
                              )
                            }
                          >
                            {this.state.errorInTree ? (
                              <span
                                style={{
                                  font: "Roberto",
                                  textTransform: "capitalize",
                                }}
                              >
                                Error in Tree
                              </span>
                            ) : (
                              <span
                                style={{
                                  font: "Roberto",
                                  textTransform: "capitalize",
                                  color: "#ffffff",
                                }}
                              >
                                SAVE & PREVIEW
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="container-fluid rnd-container position-relative"
                      style={{
                        background: `url('${CONTEXT}/dot-bg.svg') repeat`,
                        height: "calc(100% - 125px)",
                        width: "auto",
                        overflow: "auto",
                      }}
                    >
                      {this.state.sampleKPITree.length > 0 && (
                        <TreeChart
                          treeData={this.state.sampleKPITree}
                          colorThreshold={"automatic"}
                          addChild={this.addCard}
                          removeChild={this.removeCard}
                          rndData={this.state.rnds}
                          showDrawer={this.showDrawer}
                        />
                      )}

                      {this.state.drawerVisible && (
                        <NodeDrawer
                          onClose={this.onClose}
                          visible={this.state.drawerVisible}
                          theme={theme}
                          selectedRnd={selectedRnd}
                          setDisplayName={this.setDisplayName}
                          validateNode={this.validateNode}
                          validateDataNode={this.validateDataNode}
                          validateFormulaNode={this.validateFormulaNode}
                          validateEmptyFormulaInAllMetrices={this.validateEmptyFormulaInAllMetrices}
                          selectedRndIndex={selectedRndIndex}
                          addRelation={this.addRelation}
                          checkMetricEntry={this.checkMetricEntry}
                          filterBy={filterBy}
                          selectedRndFuntionOptions={selectedRndFuntionOptions}
                          showChildrenDrawer={this.showChildrenDrawer}
                          setDataFieldFocus={this.setDataFieldFocus}
                          setRelationString={this.setRelationString}
                          removeCard={this.removeCard}
                          onChildrenDrawerClose={this.onChildrenDrawerClose}
                          childrenDrawer={this.state.childrenDrawer}
                          onSelectTableData={this.onSelectTableData}
                          optionsForEditorTable={
                            this.state.optionsForEditorTable
                          } //SQL Editor
                          elementList={elementList}
                          setDataNode={this.setDataNode}
                          setElementType={this.setElementType}
                          resetMetricQuery={this.resetMetricQuery}
                          setSameAsPrimarytoFalse={this.setSameAsPrimaryFalse}
                          changeSameAsPrimary={this.changeSameAsPrimary}
                          changeMetricsAlias={this.changeMetricsAlias} //Metrics Alias Name Change
                          changeMetricsUnit={this.changeMetricsUnit}  //Metrics Unit Change
                          changeMetricsShow={this.changeMetricsShow}  //Metrics Show On/Off
                          token={this.props.token}
                          cloneCard={this.addCard} //LC-695 Clone the Leaf Node
                          //allParametersList={this.state.allParametersList} //LC-723 Parameterized SQL Queries
                          allParametersList={this.state.parameterFields}   //LC-1124
                          drawerSelected={this.state.drawerSelected} //LC-723 Parameterized SQL Queries
                          onSelectOperator={this.onSelectOperator} //Add Python operators for selection
                        />
                      )}

                      {this.state.settingsModal && (
                        <KPIAnalysisSettings
                          settingsModal={this.state.settingsModal}
                          toggleSettingsModal={this.toggleSettingsModal}
                          metricsList={this.state.metricFields}
                          // parameterList={this.props.kpiTreeParameter}  //LC-1124
                          parameterList={this.state.parameterFields}        //LC-1124
                          availableMetricsList={this.state.availableMetricsList}
                          availableParameterList={
                            this.state.availableParameterList
                          }
                          analysisName={this.state.analysisName}
                          analysisGoal={this.state.analysisGoal}
                          analysisParameter={this.state.analysisParameter}
                          saveAnalysisDetails={this.saveAnalysisDetails}
                          colorThreshold={
                            this.state.colorThreshold.length > 0
                              ? JSON.parse(
                                  JSON.stringify(this.state.colorThreshold)
                                )
                              : this.state.colorThreshold
                          }
                          allFilters={this.state.allFiltersList}
                          filters={this.state.filters}
                          drivers={this.state.drivers}
                          cohortsList={this.state.cohorts} //LH-572
                          optionsForDataField={this.state.optionsForDataField}
                          token={this.props.token}
                          resetMetricQuery={this.resetMetricQuery}
                          isNewAnalysis={this.props.isNewAnalysis}
                          checkDuplicateTree={checkDuplicateTree}
                          allParametersList={this.state.allParametersList} //LC-723 Parameterized SQL Queries
                        />
                      )}
                      <CreateAnalysisModal
                        displayNewAnalysisModal={
                          this.state.displayNewAnalysisModal
                        }
                        acceptNewAnalysis={this.acceptNewAnalysis}
                      />

                      {this.state.previewModal ? (
                        <Preview
                          previewModal={this.state.previewModal}
                          togglePreviewModal={this.togglePreviewModal}
                          analysisName={this.props.analysisName}
                          analysisGoal={this.props.analysisGoal}
                          analysisParameter={this.props.analysisParameter}
                          sampleTree={this.state.sampleKPITree}
                          treeLoading={this.props.loading}
                          saveData={this.saveData}
                          setKPITreeData={setKPITreeData}
                          colorThreshold={this.props.colorThreshold}
                          selectedKPILink={selectedKPILink}
                        />
                      ) : null}
                    </div>
                  </React.Fragment>
                );
              }}
            </MenuContext.Consumer>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default withRouter(KPIVisualComponent);
