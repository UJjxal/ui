import React, {Component} from "react";
import {MDBContainer,} from "mdbreact";
import {Checkbox, FilledInput, FormControl, FormControlLabel, FormGroup, InputLabel} from '@material-ui/core';
import {DatePicker, Modal} from 'antd';

import axios from "axios";
import {API_ROOT, COHORT_HEADER, CONTEXT} from "../../../config";
import Skeleton from "@material-ui/lab/Skeleton";
import KpiCalculated from "./KPICalculatedTree";
import KPIVisualConfiguration from "./KPIVisualConfiguration";
import {AppContext} from "../../../AppProvider";
import {createAction} from "../../../services/I2AService";
import {
    tableHeader,
    tableHeader_CS,
    tableHeader_CX,
    tableHeader_RX,
    tableHeader_SRX,
    tableHeader_WM
} from "./KPICalculatedCohortTableHeaders";

import uuid from "react-uuid";

import kpiService from "../../../services/kpiService";
import {addkeyInsight, deletekeyInsight, listKeyInsights, updatekeyInsight} from "../../../services/keyInsightsService";
import {getDeepDiveAnalysis} from "../../../services/deepDiveAnalysisService";
import moment from 'moment';

export const CreateCohortAction = (props) => {
    const {formData, setFormData, mode, setMode, isNewAction} = props;

    const handleOk = () => {
        if (formData.actionCohortName === '' || formData.actionCohortType === '' || formData.actionName === '' || formData.actionStartDate === '' || formData.actionEndDate === '') {
            window.alert('Fields required!');
            return false;
        }
        props.addAction(props)
        props.setIsNewAction(false);
    };

    return (
        <Modal className="action-modal" title="Create New Action" visible={props.isNewAction} onOk={handleOk}
               onCancel={() => props.handleAddActionToCohort(false)}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Cohort Type</InputLabel>
                        <FilledInput
                            id="demo-simple-select-filled-label"
                            label="Cohort Type" placeholder="Cohort Type"
                            value={formData.actionCohortType}
                            disabled
                        />
                    </FormControl>
                </div>
                <div className="col-md-6 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Cohort Name</InputLabel>
                        <FilledInput
                            id="demo-simple-select-filled-label"
                            label="Cohort Name" placeholder="Cohort Name"
                            value={formData.actionCohortName}
                            disabled
                        />
                    </FormControl>
                </div>
                <div className="col-md-12 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Action Name</InputLabel>
                        <FilledInput
                            id="demo-simple-select-filled-label"
                            label="Action Name" placeholder="Action Name"
                            value={formData.actionName}
                            onChange={event => setFormData({...formData, actionName: event.target.value})}
                        />
                    </FormControl>
                </div>
                <div className="col-md-12 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Action Description</InputLabel>
                        <FilledInput
                            id="demo-simple-select-filled-label"
                            label="Action Description" placeholder="Action Description"
                            multiline
                            rows={4}
                            value={formData.actionDesc}
                            onChange={event => setFormData({...formData, actionDesc: event.target.value})}
                        />
                    </FormControl>
                </div>
                <div className="col-md-12 mb-3">
                    <DatePicker.RangePicker size="large" className="w-100 bg-light"
                                            style={{borderBottom: "1px solid #888"}}
                        // disabledDate={disabledDate}
                                            value={
                                                formData.actionStartDate && formData.actionEndDate ?
                                                    [moment(formData.actionStartDate), moment(formData.actionEndDate)] :
                                                    null
                                            }
                                            onChange={date => setFormData({
                                                ...formData,
                                                actionStartDate: date[0]._d.toISOString(),
                                                actionEndDate: date[1]._d.toISOString()
                                            })}
                    />
                </div>
                <div className="col-md-12">
                    <FormGroup>
                        <FormControlLabel
                            label="Directly recommend this action."
                            control={
                                <Checkbox color="primary"
                                          checked={formData.actionDirectRecommendation === 'Y' ? true : false}
                                          onChange={event => setFormData({
                                              ...formData,
                                              actionDirectRecommendation: event.target.checked ? 'Y' : 'N'
                                          })}
                                />
                            }
                        />
                    </FormGroup>
                </div>
            </div>
        </Modal>
    )
}


export default class KPICalculatedConfiguration extends Component {
    state = {
        kpiData: [],
        sampleKPITree: [],
        //Set Sample Tree Loading
        sampleKPITreeLoading: false,
        analysisId: "",
        analysisName: "",
        analysisGoal: "",
        treeFilter: null,
        treeFilterResponse: null,
        colorThreshold: null,
        editMode: false,
        selectedFilter: null,
        cohortTbl: null,
        cohort: {cohortRecords: [], selected: ""},
        cohortDescription: [], //LH-525
        cohortLoading: false,
        entities: null,
        anamolies: null,
        anamoliesLoading: false,
        insights: [],
        insightsLoading: true,
        polarity: null,
        unit: null,
        scatterYAxis: null,
        drivers: [],
        headers: [], //LH-445
        deepDiveLoading: false,
        deepDiveObj: null,
        NodesForRecEngineTree: [], //SI-79
        NodesForRecEngineTreeLoading: false, //SI-79
        apiError: "",
        isNewAction: false,
        mode: '',
        actionFormData: {
            actionCohortType: '',
            actionCohortName: '',
            actionName: '',
            actionDesc: '',
            actionStartDate: '',
            actionEndDate: '',
            actionDirectRecommendation: 'N',

            actionDurationTypeCode: "1W",
            actionRemarks: "For Testing",
            actionStatus: "NEW",
            actionType: "USER"
        },
        kpiTemplateName: "" //Sanjit - Template Name associated with a KPI
    };


    setIsNewAction = (val) => {
        this.setState({isNewAction: val})
    }

    setMode = (val) => {
        this.setState({mode: val})
    }

    setActionFormData = (val) => {
        this.setState({actionFormData: val})
    }

    handleAddActionToCohort = (record) => {
        this.setIsNewAction(record);
        this.setActionFormData({
            actionCohortType: record ? record.entity : '',
            actionCohortName: record ? record.segments : '',
            actionName: '',
            actionDesc: '',
            actionStartDate: '',
            actionEndDate: '',
            actionDirectRecommendation: 'N',

            actionDurationTypeCode: "1W",
            actionRemarks: "For Testing",
            actionStatus: "NEW",
            actionType: "USER"

        });
        this.setMode('add');
    }

    addAction = ({formData, isNewAction, selectedKPIDomain}) => {
        let data = {
            ...formData,
            actionAssetClass: selectedKPIDomain,
            actionFilter: isNewAction.filter,
            actionKpiTreeId: isNewAction.kpiTreeId,
            actionNodeId: isNewAction.nodeId
        }

        createAction(data)
            .then(({data}) => {
                if (data.code === 201) {
                    window.alert('Action created successfully!');
                }
            })
            .catch(err => console.log(err))
    }

    getCalculatedTreeList = (treeID) => {
        kpiService
            .getCalculatedTreeList()
            .then((res) => {
                let myCalcTreeIndex = res.data.response.findIndex(
                    (tree) => tree.kpiTreeId == treeID
                );
                if (myCalcTreeIndex > -1) {
                    this.getKPITreeFilter(treeID);
                } else {
                    this.getKPITreeData(treeID);
                }
            })
            .catch((error) => console.error(error.message));
    };

    changeFilterValue = (e, idx) => {
        let {treeFilter} = this.state;
        treeFilter.forEach((filter) => {
            if (filter.name === e.target.name) {
                filter.selected = e.target.value;
            }
        });
        this.setState({treeFilter});
        if (idx === 0) {
            let filtered = this.state.treeFilterResponse.filter(
                (item) => item[e.target.name] === e.target.value
            );
            this.getFilterList(filtered);
        }
    };

    getKPITreeFilter = (treeID) => {
        if (treeID !== "") {
            kpiService
                .getKPITreeFilter(treeID)
                .then(({data}) => {
                    const parsedFilters = data.response.map((item) => JSON.parse(item));

                    let k = [],
                        v = [];

                    parsedFilters.map((t) => {
                        k = [...k, Object.keys(t)[0]];
                        v = [...v, t[Object.keys(t)[0]]];
                    });

                    const initFiltered = parsedFilters.filter(
                        (item) => item[k[0]] === v[0]
                    );
                    this.setState({treeFilterResponse: parsedFilters});
                    this.getFilterList(initFiltered);
                })
                .catch((error) => console.error(error.message));
        }
    };

    getFilterList = (data) => {
        let treeFilter = [];
        if (data !== "") {
            let ar = [];
            data.map((item) => {
                Object.entries(item).map((el) => {
                    ar = [...ar, el[0]];
                });
            });

            let obj = {};
            [...new Set(ar)].map((rec) => {
                data.map((item, i) => {
                    if (item.hasOwnProperty(rec)) {
                        if (obj[rec]) {
                            obj = {...obj, [rec]: [...obj[rec], item[rec]]};
                        } else {
                            obj = {...obj, [rec]: [item[rec]]};
                        }
                    }
                });
            });

            const objectArray = Object.entries(obj);
            objectArray.forEach(([key, value]) => {
                treeFilter.push({name: key, value: value, selected: value[0]});
            });
        } else {
            treeFilter = "";
        }
        this.setState({treeFilter});
        this.getFilteredAnalysis(true, treeFilter, []);
    };

    getKPITreeData = (treeID) => {
        let colorThreshold = null;
        this.setState({sampleKPITreeLoading: true});
        if (treeID !== "") {
            kpiService
                .getTreeNodes(treeID)
                .then(({data}) => {
                    if (data.response.rawTree !== "") {
                        try {
                            let tempcolorThreshold = JSON.parse(data.response.colorThreshold);
                            if (
                                Object.prototype.toString.call(tempcolorThreshold) ===
                                "[object Object]"
                            ) {
                                colorThreshold = tempcolorThreshold;
                            } else {
                                colorThreshold = tempcolorThreshold.threshold;
                            }
                        } catch (err) {
                            colorThreshold = data.response.colorThreshold;
                        }
                        this.getKPITreeFilter(treeID);
                        this.setState({
                            kpiData: [...JSON.parse(data.response.rawTree)],
                            sampleKPITree: [...JSON.parse(data.response.sampleTree)],
                            analysisId: data.response.kpiTreeId,
                            analysisName: data.response.kpiTreeName,
                            analysisGoal: data.response.kpiTreeGoal,
                            colorThreshold: colorThreshold,
                            drivers:
                                data.response.populateDrivers &&
                                data.response.populateDrivers !== undefined
                                    ? [...JSON.parse(data.response.populateDrivers)] //PNC Header
                                    : [],
                            treeFilter: null,
                            polarity: null,
                            unit: null,
                            // sampleKPITreeLoading:false
                        });
                    } else {
                        this.setState({sampleKPITreeLoading: false});
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                    this.setState({sampleKPITreeLoading: false});
                })
        }
    };

    getKPITreeNodeData = (treeID) => {
        //SI-79

        this.setState({NodesForRecEngineTreeLoading: true});

        kpiService
            .getTreeNodes(treeID)
            .then(({data}) => {
                if (data.response.rawTree !== "") {
                    let nodesList = JSON.parse(data.response.rawTree).map((raw) => {
                        return {
                            nodeId: raw.nodeId,
                            displayName: raw.displayName,
                        };
                    });

                    this.setState({
                        NodesForRecEngineTree: [...nodesList],
                        NodesForRecEngineTreeLoading: false,
                    });
                }
            })
            .catch((error) => console.error(error.message));
    };

    getFilteredAnalysis = (initialLoad, treeFilter, nodeData) => {
        let colorThreshold = null;
        let selectedFilter = {};
        let allFilters = [];
        this.setState({sampleKPITreeLoading: true})

        if (initialLoad === true && treeFilter === "") {
            selectedFilter = "";
        } else {
            allFilters =
                initialLoad === true ? [...treeFilter] : [...this.state.treeFilter];
            allFilters.forEach((filter) => {
                selectedFilter[filter.name] = filter.selected;
            });
        }

        const postData = {
            kpiTreeId: this.props.EditTreeID,
            filter: JSON.stringify(selectedFilter),
        }; //{"Timeframe":"YoY","DPD":"0-30"}
        kpiService
            .getFilteredAnalysis(postData)
            .then(({data}) => {
                if (data.code === 200) {
                    try {
                        let tempcolorThreshold = JSON.parse(data.response.colorThreshold);
                        if (
                            Object.prototype.toString.call(tempcolorThreshold) ===
                            "[object Object]"
                        ) {
                            colorThreshold = tempcolorThreshold;
                        } else {
                            let selectedThreshold = tempcolorThreshold[0].threshold;

                            //Select threshold as per the Selected Filter - LH-581
                            const haveSameData = function (obj1, obj2) {
                                const obj1Length = Object.keys(obj1).length;
                                const obj2Length = Object.keys(obj2).length;

                                if (obj1Length === obj2Length) {
                                    return Object.keys(obj1).every(
                                        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
                                    );
                                }
                                return false;
                            };

                            // let filtersLength = Object.keys(selectedFilter).length - 1;

                            tempcolorThreshold.forEach((thres) => {
                                let trimmedSelectedFilter = {...selectedFilter};
                                delete trimmedSelectedFilter.Timeframe;

                                let trimmedThresholds = {...thres};
                                delete trimmedThresholds.threshold;

                                if (haveSameData(trimmedThresholds, trimmedSelectedFilter)) {
                                    selectedThreshold = {...thres.threshold};
                                }
                            });
                            colorThreshold = {...selectedThreshold};
                            //colorThreshold="automatic";
                        }
                    } catch (err) {
                        // colorThreshold = JSON.parse(data.response[0].colorThreshold);
                        colorThreshold = "automatic";
                    }

                    this.setState({
                        sampleKPITree: data.response.kpiTree,
                        colorThreshold: colorThreshold,
                        analysisId: this.props.EditTreeID,
                        analysisName: data.response.kpiTree[0].treeName,
                        analysisGoal: data.response.kpiTreeGoal,
                        selectedFilter: selectedFilter,
                        polarity: JSON.parse(data.response.polarity),
                        unit: JSON.parse(data.response.unit),
                        drivers:
                            data.response.populateDrivers &&
                            data.response.populateDrivers !== undefined
                                ? [...JSON.parse(data.response.populateDrivers)] //PNC Header
                                : [],
                        kpiTemplateName: data.response.templateName
                    });
                    if (!initialLoad && nodeData) {
                        // when sidebar expands
                        this.getCohortDetails(
                            nodeData,
                            this.props.EditTreeID,
                            selectedFilter
                        );
                        this.getAnamoliesData(
                            nodeData,
                            this.props.EditTreeID,
                            selectedFilter
                        );
                        //this.getInsightsData(nodeData, data.response.KPI_Tree[0].treeId, selectedFilter);
                        this.setState({
                            insights: [],
                            insightsLoading: false,
                        });
                    }
                } else {
                    this.setState({
                        insights: [],
                        insightsLoading: false,
                        // sampleKPITree:[],
                        sampleKPITreeLoading: false,
                        apiError: data.message
                    });
                    console.log("Error in Aggregation Details")
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    insights: [],
                    insightsLoading: false,
                    // sampleKPITree:[],
                    sampleKPITreeLoading: false
                });
            });
    };

    editAnalysis = () => {
        this.setState((ps) => ({editMode: !ps.editMode}));
    };

    componentDidMount() {
        if (this.props.EditTreeID) {
            this.getCalculatedTreeList(this.props.EditTreeID);
        }
    }

    getTableHeader = () => {
        if (COHORT_HEADER === 'WM') {
            return tableHeader_WM(this.state.cohort.selected, this.handleAddActionToCohort);
        }
        if (this.state.kpiTemplateName === 'CREDIT-PORTFOLIO') {
            return tableHeader_CX(this.state.cohort.selected);
        }
        if (this.state.kpiTemplateName === 'CROSS-SELL') {
            return tableHeader_CS(this.state.cohort.selected);
        }
        if (this.state.kpiTemplateName === 'MVP') {
            return tableHeader_CS(this.state.cohort.selected);
        }
        if (this.state.kpiTemplateName === 'COLLECTION') {
            return tableHeader_CX(this.state.cohort.selected);
        }
        if (this.state.kpiTemplateName === 'RX') {
            return tableHeader_RX(this.state.cohort.selected);
        }
        if (this.state.kpiTemplateName === 'SOURCE RX') {
            return tableHeader_SRX(this.state.cohort.selected);
        }
        return tableHeader(this.state.cohort.selected, this.handleAddActionToCohort);
    }

    getCohortDetails = (nodeData, kpiId, selectedFilter) => {
        this.getCohortData(nodeData, kpiId, selectedFilter);
    };

    getCohortData = (nodeData, kpiId, selectedFilter) => {
        let selectedCohort = null;
        this.setState({cohortLoading: true});

        const postData = {
            kpiTreeId: kpiId,
            nodeId: nodeData.nodeId,
            filter: JSON.stringify(selectedFilter),
        };
        kpiService
            .getTreeNodeCohorts(postData)
            .then(({data}) => {
                if (data.code === 200) {
                    if (selectedFilter !== "") {
                        let entities = [];
                        let headers = [...data.response.header]; //LH-445
                        let cohortDescription =
                            data.response.description.length > 0
                                ? [...data.response.description]
                                : [];

                        let nextEntity = data.response.data[0].entity; //LH-445
                        entities.push(nextEntity);
                        data.response.data.forEach((item) => {
                            //LH-445
                            if (item.entity !== nextEntity) {
                                nextEntity = item.entity;
                                entities.push(nextEntity);
                            }
                        });

                        //Remove duplicate entities
                        let uniqueEntities = Array.from(new Set([...entities]));

                        selectedCohort = uniqueEntities[0];
                        const filterTbl = data.response.data.filter(
                            (item) => item.entity === selectedCohort
                        );

                        this.setState({
                            cohortTbl: data.response.data,
                            cohort: {cohortRecords: filterTbl, selected: selectedCohort},
                            cohortDescription,
                            cohortLoading: false,
                            entities,
                            headers: [...headers],
                        });

                        // Call Deep Dive Analysis Get
                        // this.getDeepDiveAnalysis(nodeData.nodeId, kpiId, selectedFilter, selectedCohort);
                    }
                } else {
                    this.setState({
                        cohortTbl: null,
                        cohortLoading: false,
                        entities: null,
                        cohort: {cohortRecords: [], selected: ""},
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({cohortLoading: false});
            });
    };

    changeCohortSegment = (e) => {
        const filterTbl = this.state.cohortTbl.filter(
            (item) => item.entity === e.target.value
        );
        this.setState({
            cohort: {cohortRecords: [...filterTbl], selected: e.target.value},
            cohortLoading: false,
            insights: [],
            insightsLoading: false,
        });
    };

    getDeepDiveAnalysis = (
        nodeId,
        kpiId,
        selectedFilter,
        selectedEntity
    ) => {
        !this.state.deepDiveLoading && this.setState({deepDiveLoading: true});
        let data = {
            entity: selectedEntity,
            filter: selectedFilter,
            kpiTreeId: kpiId,
            nodeId: nodeId
        };
        getDeepDiveAnalysis(data)
            .then(response => {
                    if (response.data.code === 200) {
                        this.setState({
                            deepDiveObj: response.data,
                            deepDiveLoading: false,
                        });
                    } else {
                        this.setState({deepDiveLoading: false, deepDiveObj: null});
                    }
                },
                (error) => {
                    this.setState({deepDiveLoading: false, deepDiveObj: null});
                    console.log(error);
                }
            )

    };

    setDeepDiveAnalysis = async (
        nodeId,
        kpiId,
        selectedEntity,
        selectedFilter,
        user,
        email,
        fileObj
    ) => {
        this.setState({deepDiveLoading: true});
        try {
            let formData = new FormData();
            formData.append("node_id", nodeId);
            formData.append("kpi_tree_id", kpiId);
            formData.append("entity", selectedEntity);
            formData.append("filter", JSON.stringify(selectedFilter));
            formData.append("created_by", user);
            formData.append("email", email);
            formData.append("file", fileObj, fileObj.name);

            let deepDiveUploaded = await axios({
                method: "post",
                url: API_ROOT + `uploadDeepDiveAnalysis`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.props.token}`,
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (deepDiveUploaded.status === 200) {
                // this.getDeepDiveAnalysis(nodeId, kpiId, selectedFilter, selectedEntity);
            } else {
                this.setState({deepDiveLoading: false});
            }
        } catch (e) {
            console.log(e);
            this.setState({deepDiveLoading: false});
        }
    };

    getDeepDiveAnalysis = (nodeId) => {

        let data = {
            filter: JSON.stringify(this.state.selectedFilter),
            entity: this.state.cohort.selected,
            kpiTreeId: this.state.analysisId,
            nodeId: nodeId
        }
        getDeepDiveAnalysis(data)
            .then((response) => {
                    if (response.data.code === 200) {
                        this.setState({deepDiveObj: response.data.response, deepDiveLoading: false});
                    } else {
                        this.setState({deepDiveLoading: false, deepDiveObj: null});
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({deepDiveLoading: false, deepDiveObj: null});
                }
            )
    };

    uploadDeepDiveAnalysis = async (
        nodeId,
        urlString,
        {userMail, authUser}
    ) => {
        let response = await axios({
            method: "post",
            url: `${API_ROOT}uploadDeepDiveAnalysis/`,
            data: {
                node_id: nodeId,
                kpi_tree_id: this.state.analysisId,
                filter: JSON.stringify(this.state.selectedFilter),
                entity: this.state.cohort.selected,
                urlString,
                created_by: authUser,
                email: userMail,
            },
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        });
        return response;
    };

    deleteDeepDiveAnalysis = () => {

    }

    getInsightsData = (nodeId) => {
        this.setState({insightsLoading: true});

        let data = {
            filter: JSON.stringify(this.state.selectedFilter),
            kpiTreeId: this.state.analysisId,
            nodeId: nodeId,
            // entity: this.state.cohort.selected,
        };

        listKeyInsights(data).then(
            (response) => {

                if (
                    response.data.code === 200 &&
                    response.data.response.length > 0
                ) {
                    let newInsights = [...response.data.response];
                    this.setState({
                        insights: [...newInsights],
                        insightsLoading: false,
                    });
                } else {
                    this.setState({insights: null, insightsLoading: false});
                }
            },
            (error) => {
                this.setState({insightsLoading: false});
                console.log(error);
            }
        );
    };

    createInsightsData = (nodeId, insights, user) => {
        this.setState({insightsLoading: true});

        let data = {
            // createdBy: user.authUser,
            // createdDate: new Date().toUTCString(),
            email: user.userMail,
            entity: this.state.cohort.selected,
            filter: JSON.stringify(this.state.selectedFilter),
            insightsId: uuid(),
            insightsValue: insights,
            kpiTreeId: this.state.analysisId,
            name: "",
            nodeId: nodeId,
        };
        addkeyInsight(data).then(
            (response) => {
                if (response.data.code === 200) {
                    this.props.useSnackBar({
                        status: true,
                        severity: "success",
                        message: 'Key Insight added successfully'
                    })
                    this.setState({insights: [], insightsLoading: false});
                } else {
                    this.setState({insights: [], insightsLoading: false});
                }
            },
            (error) => {
                this.setState({insightsLoading: false});
                console.log(error);
            }
        );
    };

    updateInsightsData = (nodeId, insights_id, insights_value, user) => {
        this.setState({insightsLoading: true});

        let data = {
            // createdBy: user.authUser,
            // createdDate: new Date().toUTCString(),
            email: user.userMail,
            entity: this.state.cohort.selected,
            filter: JSON.stringify(this.state.selectedFilter),
            insightsId: insights_id,
            insightsValue: insights_value,
            kpiTreeId: this.state.analysisId,
            name: "",
            nodeId: nodeId,
        };
        updatekeyInsight(data).then(
            (response) => {
                if (response.data.code === 200) {
                    this.props.useSnackBar({
                        status: true,
                        severity: "success",
                        message: 'Key Insight updated successfully'
                    })
                    this.setState({insights: [], insightsLoading: false});
                } else {
                    this.setState({insights: [], insightsLoading: false});
                }
            },
            (error) => {
                this.setState({insightsLoading: false});
                console.log(error);
            }
        );
    };

    deleteInsightsData = (nodeId, insights_id) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return false;
        }
        this.setState({insightsLoading: true});
        deletekeyInsight(insights_id).then(
            (response) => {
                if (response.data.code === 200) {
                    this.props.useSnackBar({
                        status: true,
                        severity: "error",
                        message: 'Key Insight deleted successfully'
                    })
                    this.setState({insights: [], insightsLoading: false});
                } else {
                    this.setState({insights: [], insightsLoading: false});
                }
            },
            (error) => {
                this.setState({insightsLoading: false});
                console.log(error);
            }
        );
    };

    getAnamoliesData = (nodeData, kpiId, selectedFilter) => {
        this.setState({anamoliesLoading: true});

        const postData = {
            kpiTreeId: kpiId,
            nodeId: nodeData.nodeId,
            filter: JSON.stringify(selectedFilter),
        };

        kpiService
            .getAnamoliesData(postData)
            .then((res) => {

                if (res.data.code === 200) {
                    // let anamolies={series:[], xAxis:"", yAxis:"", chartType:"scatter"};
                    this.setState({
                        anamolies: res.data.response ? JSON.parse(res.data.response) : null,
                        scatterYAxis: "Monthly Charges($)",
                        anamoliesLoading: false,
                    }); // remove
                } else {
                    this.setState({anamolies: null, anamoliesLoading: false});
                }
            })
            .catch((error) => {
                this.setState({anamolies: null, anamoliesLoading: false});
                console.error(error.message);
            });
    };

    render() {

        return (
            <AppContext.Consumer>
                {({
                      token, KPITreeLoading, KPIError, domain, selectedKPIDomain, selectedTemplateTreeID,
                      selectedKPITemplateName
                  }) =>
                    <>
                        {this.state.editMode ? (
                                <KPIVisualConfiguration
                                    EditTreeID={this.props.EditTreeID}
                                    newAnalysis={false}
                                    newAnalysisSaved={false}
                                    editAnalysis={this.editAnalysis}
                                    NewTreeID={""}
                                    KPITreeLoading={false}
                                    token={token}
                                    status={"Published"}
                                />
                            )
                            : this.state.sampleKPITree.length > 0 ? (
                                    <KpiCalculated
                                        sampleKPITree={this.state.sampleKPITree}
                                        token={token}
                                        loading={KPITreeLoading}
                                        KPIError={KPIError}
                                        analysisName={this.state.analysisName}
                                        analysisGoal={this.state.analysisGoal}
                                        analysisId={this.state.analysisId}
                                        colorThreshold={this.state.colorThreshold}
                                        drivers={this.state.drivers} //PNC Header
                                        treeFilter={this.state.treeFilter}
                                        treeFilterResponse={this.state.treeFilterResponse}
                                        changeFilterValue={this.changeFilterValue}
                                        getFilteredAnalysis={this.getFilteredAnalysis}
                                        editAnalysis={this.editAnalysis}
                                        selectedFilter={this.state.selectedFilter}
                                        getCohortDetails={this.getCohortDetails}
                                        getAnamoliesData={this.getAnamoliesData}
                                        cohortTbl={this.state.cohortTbl}
                                        cohortLoading={this.state.cohortLoading}
                                        cohort={this.state.cohort}
                                        cohortDescription={this.state.cohortDescription}
                                        tableHeader={this.getTableHeader}
                                        anamolies={this.state.anamolies}
                                        anamoliesLoading={this.state.anamoliesLoading}
                                        insights={this.state.insights}
                                        insightsLoading={this.state.insightsLoading}
                                        getDeepDiveAnalysis={this.getDeepDiveAnalysis}
                                        uploadDeepDiveAnalysis={this.uploadDeepDiveAnalysis}
                                        getInsightsData={this.getInsightsData}
                                        createInsightsData={this.createInsightsData}
                                        updateInsightsData={this.updateInsightsData}
                                        deleteInsightsData={this.deleteInsightsData}
                                        changeCohortSegment={this.changeCohortSegment}
                                        entities={this.state.entities}
                                        polarity={this.state.polarity}
                                        unit={this.state.unit}
                                        scatterYAxis={this.state.scatterYAxis} //Telecom only
                                        deepDiveObj={this.state.deepDiveObj}
                                        deepDiveLoading={this.state.deepDiveLoading}
                                        setDeepDiveAnalysis={this.setDeepDiveAnalysis}
                                        NodesForRecEngineTree={this.state.NodesForRecEngineTree}
                                        NodesForRecEngineTreeLoading={
                                            this.state.NodesForRecEngineTreeLoading
                                        }
                                        getKPITreeNodeData={this.getKPITreeNodeData}
                                        addAction={(data) => this.addAction(data)}
                                        handleAddActionToCohort={() => this.handleAddActionToCohort()}
                                        kpiTemplateName={this.state.kpiTemplateName}   //Sanjit - Template Name associated with a KPI
                                        selectedTemplateTreeID={selectedTemplateTreeID}
                                        selectedKPITemplateName={selectedKPITemplateName}
                                    />
                                )
                                : this.state.sampleKPITreeLoading ? (
                                        <div>
                                            <div className="container-fluid px-3">
                                                <div className="row justify-content-between">
                                                    <div className="col-md-4">
                                                        <Skeleton animation="wave" variant="text" height={45}/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Skeleton animation="wave" variant="text" height={45}/>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-between">
                                                    <div className="col-md-4">
                                                        <div className="d-flex">
                                                            <Skeleton animation="wave" variant="text" width={120}
                                                                      height={75}
                                                            />
                                                            <Skeleton className="mx-2" animation="wave" variant="text"
                                                                      width={120} height={75}/>
                                                            <Skeleton animation="wave" variant="text" width={160}
                                                                      height={75}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="d-flex justify-content-end">
                                                            <Skeleton className="mr-2" animation="wave" variant="text"
                                                                      width={88} height={75}/>
                                                            <Skeleton animation="wave" variant="text" width={142}
                                                                      height={75}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-center pt80">
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-center">
                                                            <Skeleton animation="wave" variant="text" height={200}
                                                                      width={204}/>
                                                            <div className="ml80">
                                                                <Skeleton animation="wave" variant="text" height={200}
                                                                          width={204}/>
                                                                <Skeleton animation="wave" variant="text" height={200}
                                                                          width={204}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    : this.state.apiError &&
                                    <div style={{marginTop: "1.5rem"}}>
                                        {/* <Loader height={100} width={100} /> */}
                                        <MDBContainer className="my-5 mx-0 mw-100">
                                            <div className="w-100 row align-items-center justify-content-center my-5">
                                                <div className="col-md-4">
                                                    <img className="w300" src={`${CONTEXT}/empty-state.svg`}
                                                         alt="Empty State"/>
                                                </div>
                                                <div className="col-md-4 text-center">
                                                    <h4>No Nodes!</h4>
                                                    <p className="fs16">There are no nodes created for this KPI Tree.
                                                        The nodes are a way to break down the overall analysis into
                                                        various dimensions.</p>
                                                </div>
                                            </div>
                                        </MDBContainer>
                                    </div>
                        }

                        <CreateCohortAction
                            mode={this.state.mode}
                            setMode={() => this.setMode()}
                            isNewAction={this.state.isNewAction}
                            setIsNewAction={() => this.setIsNewAction()}
                            handleAddActionToCohort={() => this.handleAddActionToCohort()}
                            addAction={(data) => this.addAction(data)}
                            formData={this.state.actionFormData}
                            setFormData={(data) => this.setActionFormData(data)}
                            selectedKPIDomain={selectedKPIDomain}
                        />
                    </>
                }
            </AppContext.Consumer>
        );
    }
}
