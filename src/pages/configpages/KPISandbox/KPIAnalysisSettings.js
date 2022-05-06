import React, {useEffect, useState} from 'react';
import ExampleAnalysis from '../../../assets/KPI/ExampleAnalysis.svg';
import ExampleNode from '../../../assets/KPI/ExampleNode.svg';
import {Button, makeStyles, Snackbar} from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import {
    colorRange,
    initialColorThresholdList,
    initialMetricsList,
    initialParameterList,
    thresholdRange,
    unitList
} from '../../../utilities/AllTables';
import FilterSettings from './KPIAnalysisSettings/KPIAnalysisFilterSettings';
import ThresholdSettings from './KPIAnalysisSettings/KPIAnalysisThresholdSettings';
import CohortSettings from './KPIAnalysisSettings/KPIAnalysisCohortSettings';
import NameSettings from './KPIAnalysisSettings/KPIAnalysisNameSettings';
import MetricsSettings from './KPIAnalysisSettings/KPIAnalysisMetricsSettings';

import 'antd/dist/antd.css';
import {MDBCard, MDBCardImage, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBRow} from 'mdbreact';
import kpiService from '../../../services/kpiService';
import KPIAnalysisParameters from './KPIAnalysisSettings/KPIAnalysisParameters';

const KPIAnalysisSettings = (props) => {
    const [colorSetup, setColorSetup] = useState('manual');
    const [colorThreshold, setColorThreshold] = useState([]);
    const [analysisName, saveAnalysisName] = useState('');
    const [analysisGoal, saveAnalysisGoal] = useState('');
    const [analysisParameter, saveAnalysisParameter] = useState('');
    const [metricsList, saveMetricsList] = useState([initialMetricsList]);
    const [parameterList, saveParameterList] = useState([initialParameterList]);

    //SI-103 Provide Filter alias name
    const [allFilters, setFilterValues] = useState([]);
    //const [filterList, saveFilterList] = useState([{ name: '', values: [''] }]);
    const [filterList, saveFilterList] = useState([{name: '', label: '', values: ['']}]);
    const [filterValuesAvailable, setFilterValuesAvailable] = useState(false);
    const [filterError, setFilterError] = useState(['']); //LH-572

    const [driverList, saveDriverList] = useState(['']);
    const [availableMetricsList, setAvailableMetricsList] = useState([]);
    const [availableParameterList, setAvailableParameterList] = useState([]);

    const [availableCohortsList, setAvailableCohortsList] = useState([]); //LH-572
    const [cohortsList, saveCohortsList] = useState(['']); //LH-572
    const [cohortError, setCohortError] = useState(['']); //LH-572
    const [commonError, setCommonError] = useState('');

    const [goalDisplay, setGoalDisplay] = useState(false);
    const [parameterDisplay, setParameterDisplay] = useState(false);
    const [metricDisplay, setMetricDisplay] = useState(false);
    const [nodeDisplay, setNodeDisplay] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState(false);
    const [cohortDisplay, setCohortDisplay] = useState(false); //LH-572

    const [isAlert, setAlert] = useState({status: false, severity: 'success', origin: "right", message: ''});

    const calculateFiltersWithExpression = () => {
        let filterValues = [];

        props.optionsForDataField.forEach(table => {

            let filterArray = table.children.filter(row => row.columnFilter === "true");

            let newFilterArray = [];
            //let allFilters = [];
            if (filterArray.length > 0) {
                filterArray.forEach(row => {
                    newFilterArray.push({
                        filter: row.title,
                        values: row.filterExpression.split(",")
                    })
                    // allFilters.push(row.title);

                })
            }
            filterValues = [...filterValues, ...newFilterArray]

        })
        setFilterValues(filterValues);
    }

    useEffect(() => {


        //LH-572
        retrieveCohortsList();

        saveAnalysisGoal(props.analysisGoal);
        saveAnalysisParameter(props.analysisParameter);
        saveAnalysisName(props.analysisName);

        setAvailableMetricsList([...props.availableMetricsList]);
        setAvailableParameterList([...props.availableParameterList]);

        // metricFields.forEach((metric) => {
        // 	let fIndex = selectedMetrics.findIndex((n) => n.key === metric.key);
        // 	if (fIndex !== -1) {
        // 		metricsList.push(selectedMetrics[fIndex]);
        // 	} else {
        // 		metricsList.push(initialMetricsList);
        // 	}
        // });
        saveMetricsList(props.metricsList);
        saveParameterList(props.parameterList);

        //Set Filters and Filter errors from recieved props
        //SI-103 Provide Filter Alias Name

        calculateFiltersWithExpression();
        // props.filters.length === 0 ? saveFilterList([{ name: '', values: [''] }]) : saveFilterList(props.filters);
        let filterList = [];
        props.filters.length === 0
            ? saveFilterList([{name: '', label: '', values: ['']}])
            :
            //Check if label is not there, set filter name as label
            props.filters.forEach(filter => {
                filterList.push({
                    name: filter.name,
                    label: filter.label ? filter.label : filter.name,
                    values: [...filter.values]
                })
            })
        saveFilterList(filterList);


        props.filters.length > 0 && setFilterError(props.filters.map((filter) => '')); //LH-572
        props.filters.length > 0 && checkFilterValuesAvailability(props.filters);

        props.drivers.length === 0 ? saveDriverList(['']) : saveDriverList(props.drivers);

        //LH-572 Set Cohorts and Cohorts errors from recieved props
        props.cohortsList.length === 0 ? saveCohortsList(['']) : saveCohortsList(props.cohortsList);
        props.cohortsList.length > 0 && setCohortError(props.cohortsList.map((cohort) => ''));

        if (typeof props.colorThreshold === 'string') {
            setColorSetup('automatic');
        } else {
            if (props.colorThreshold.length > 0) {
                let newcolorThreshold = props.colorThreshold.slice(0);
                newcolorThreshold.forEach((thres, ind) => {

                    // Set the color Threshold
                    let newThreshold = [];
                    for (const [key, value] of Object.entries(thres.threshold)) {
                        newThreshold.push({
                            range: key,
                            label: value
                                .split('_')
                                .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
                                .join(' '),
                        });
                    }

                    let setThreshold = [];
                    thresholdRange.forEach((val) => {
                        let rngInd = newThreshold.findIndex((colth) => colth.label === val.label);
                        if (rngInd > -1) {
                            val.range = newThreshold[rngInd].range;
                        }
                        setThreshold.push({label: val.label, range: rngInd > -1 ? newThreshold[rngInd].range : ""});
                    });
                    thres.threshold = [...setThreshold];

                    //Set the filters
                    for (const [key, value] of Object.entries(thres)) {
                        let filterIndex = null;
                        let valueIndex = null;
                        if (ind === 0 && key === "") {
                            thres["1"] = value;
                            delete thres[key];
                        }
                        if (ind !== 0 && key !== 'threshold') {
                            filterIndex = props.filters.findIndex((row) => row.name === key);
                            if (filterIndex > -1) {
                                valueIndex = props.filters[filterIndex].values.findIndex(val => val === value);
                                if (valueIndex > -1) {
                                    thres[key] = valueIndex;
                                }
                            }
                            if (filterIndex === -1 || valueIndex === -1) {
                                thres[key] = "";
                            }
                        }
                    }
                });

                setColorThreshold([...newcolorThreshold]);
            } else {
                setColorThreshold(JSON.parse(JSON.stringify([{...initialColorThresholdList}])));
            }
            setColorSetup('manual');

        }
    }, []);


    const retrieveCohortsList = async () => {
        kpiService.getAllCohorts()
            .then(({data}) => {
                if (data.code === 200) {
                    //LC-510
                    let selectedCohorts = data.response.map((cohort) => cohort.cohortName);
                    setAvailableCohortsList([...selectedCohorts]);
                }
            })
            .catch(error => console.error(error.message))
    };

    const handleSelectedMetricChange = (e, index) => {
        if (metricsList.filter(metric => metric.key === e.target.value).length === 0) {
            let newMetrics = availableMetricsList.filter((avlMet) => avlMet.key === e.target.value)[0];
            let newMetricsList = [...metricsList];

            newMetricsList.splice(index, 1, newMetrics);
            saveMetricsList(newMetricsList);
        }
    };

    const handleSelectedParameterChange = (e, index) => {
        if (parameterList.filter(parameter => parameter.key === e.target.value).length === 0) {
            let newParameter = availableParameterList.filter((avlParam) => avlParam.key === e.target.value)[0];
            let newParameterList = [...parameterList];

            newParameterList.splice(index, 1, newParameter);
            saveParameterList(newParameterList);
        }
    };

    const handleMetricQuery = (value, index, toggle) => {
        let arr = [...metricsList];
        if (toggle === `input`) {
            arr[index]['text'] = value;
        } else {
            arr[index]['text'] += ' ' + value;
        }
        saveMetricsList(arr);
    };

    const handleParameterQuery = (value, index, toggle) => {
        let arr = [...parameterList];
        if (toggle === `input`) {
            arr[index]['parameterValue'] = value;
        } else {
            arr[index]['parameterValue'] += ' ' + value;
        }
        //saveMetricsList(arr); - Unit Testing not done properly
        saveParameterList(arr);
    };

    const inputBtn = {
        backgroundColor: '#3F88C5',
        left: '-3rem',
        top: '-3rem',
    };

    const setAnalysisName = (e) => {
        saveAnalysisName(e.target.value);
    };
    const setAnalysisGoal = (e) => {
        saveAnalysisGoal(e.target.value);
    };
    const setAnalysisParameter = (e) => {
        saveAnalysisParameter(e.target.value);
    };

    //PNC Header
    const handleAddDriverClick = () => {
        let list = [...driverList];
        list.push('');
        saveDriverList(list);
    };
    const handleRemoveDriverClick = (index) => {
        const list = [...driverList];
        list.splice(index, 1);
        saveDriverList(list);
    };
    const handleDriverChange = (e, index) => {
        const {value} = e.target;
        const list = [...driverList];

        list[index] = value;
        saveDriverList(list);
    };

    const toggleGoalDisplay = () => {
        setGoalDisplay(!goalDisplay);
    };

    const toggleParameterDisplay = () => {
        setParameterDisplay(!parameterDisplay);
    };

    const toggleMetricDisplay = () => {
        setMetricDisplay(!metricDisplay);
    };
    const toggleNodeDisplay = () => {
        setNodeDisplay(!nodeDisplay);
    };
    const toggleFilterDisplay = () => {
        setFilterDisplay(!filterDisplay);
    };

    const toggleCohortDisplay = () => {
        setCohortDisplay(!cohortDisplay);
    };

    const handleAddMetricsClick = () => {
        let list = [...metricsList];
        if (list.length < 5) {
            list.push({
                key: '',
                description: '',
                name: '',
                unit: '',
                polarity: 'Positive',
                text: '',
            });

            saveMetricsList(list);
        }
    };

    const handleAddParameterClick = () => {
        let list = [...parameterList];
        //if (list.length < 5) {
        list.push({
            key: "",
            parameterName: "",
            parameterDescription: "",
            parameterType: "",
            parameterValue: ""
        });

        saveParameterList(list);
        //}
    };

    //LH-581
    const handleAddFilterValueClick = (filterIndex) => {
        let list = [...filterList];
        list[filterIndex].values.push('');
        saveFilterList(list);
        setFilterValuesAvailable(true);
    };

    const handleRemoveFilterValueClick = (filterIndex, valueIndex) => {
        const list = [...filterList];
        const selectedFilter = list[filterIndex].name;
        const selectedFilterValue = list[filterIndex].values.splice(valueIndex, 1);
        let newColorThreshold = [...colorThreshold];
        newColorThreshold.forEach((thres) => {
            if (thres[selectedFilter] !== undefined && thres[selectedFilter] === selectedFilterValue[0]) {
                thres[selectedFilter] = '';
            }
        });
        saveFilterList(list);
        setColorThreshold(newColorThreshold);
        checkFilterValuesAvailability(list);
    };

    const handleAddFilterClick = () => {
        let list = [...filterList];
        let newFilterError = [...filterError];
        if (list.length < 3) {
            list.push({name: '', label: '', values: ['']});
            newFilterError.push('');
            saveFilterList(list);
            setFilterError(newFilterError);
        }
    };

    const handleRemoveFilterClick = (index) => {
        const list = [...filterList];
        let newFilterError = [...filterError];
        let newColorThreshold = [...colorThreshold];

        let deletedFilter = list.splice(index, 1);

        newFilterError.splice(index, 1);
        newColorThreshold.forEach((thres, ind) => {
            if (thres[deletedFilter[0].name] !== undefined) {
                // newColorThreshold.splice(ind, 1);
                delete thres[deletedFilter[0].name];
            }
        });
        saveFilterList(list);
        setFilterError(newFilterError);
        setColorThreshold(newColorThreshold);
        checkFilterValuesAvailability(list);
    };

    //LH-572
    const handleAddCohortClick = () => {
        let list = [...cohortsList];
        let newCohortError = [...cohortError];
        list.push('');
        newCohortError.push('');
        saveCohortsList(list);
        setCohortError(newCohortError);
    };

    //LH-572
    const handleRemoveCohortClick = (index) => {
        const list = [...cohortsList];
        let newCohortError = [...cohortError];
        list.splice(index, 1);
        newCohortError.splice(index, 1);
        saveCohortsList(list);
        setCohortError(newCohortError);
    };

    const checkFilterValuesAvailability = (filterList) => {
        let valueFound = false;
        const list = filterList.filter((elm) => {
            if (elm.name !== '' && elm.values.filter((val) => val !== '').length > 0) {
                valueFound = true;
            }
        });
        setFilterValuesAvailable(valueFound);
    };

    const handleAddThresholdClick = () => {
        let list = [...colorThreshold];
        let thresholdObject = {
            threshold: [
                {range: '', label: 'Significant Growth'},
                {range: '', label: 'Modest Growth'},
                {range: '', label: 'No Change'},
                {range: '', label: 'Modest Loss'},
                {range: '', label: 'Significant Loss'},
            ],
        };
        filterList.forEach((elm) => {
            thresholdObject[elm.name] = '';
        });

        list.push(thresholdObject);
        // list.push({...initialColorThresholdList});
        setColorThreshold(list);
    };

    const handleRemoveThresholdClick = (index) => {
        const list = [...colorThreshold];
        list.splice(index, 1);
        setColorThreshold(list);
    };

    const handleExceptionThresholdValue = (e, index, filt) => {
        let list = [...colorThreshold];
        console.log("EXCEPTION", e.target.value, index, filt, list);

        list[index][filt] = e.target.value !== undefined || e.target.value !== "" ? e.target.value : "";
        setColorThreshold(list);
    };

    const exceptionThresholdValue = (index, name) => {
        return colorThreshold[index][name] !== undefined ? colorThreshold[index][name] : 'No Selection';
    };

    const goalbtnvalue = goalDisplay === false ? ' EXPAND' : ' COLLAPSE';
    const parameterbtnvalue = parameterDisplay === false ? ' EXPAND' : ' COLLAPSE';
    const metricbtnvalue = metricDisplay === false ? ' EXPAND' : ' COLLAPSE';
    const nodebtnvalue = nodeDisplay === false ? ' EXPAND' : ' COLLAPSE';
    const filterbtnvalue = filterDisplay === false ? ' EXPAND' : ' COLLAPSE';
    const cohortbtnvalue = cohortDisplay === false ? ' EXPAND' : ' COLLAPSE';

    const handleRemoveMetricsClick = (index) => {
        const list = [...metricsList];
        list.splice(index, 1);
        saveMetricsList(list);
    };

    const handleRemoveParameterClick = (index) => {
        const list = [...parameterList];
        list.splice(index, 1);
        saveParameterList(list);
    };

    const handleColorSetupChange = (event) => {
        if (event.target.value === "manual" && colorSetup === "automatic") {
            setColorThreshold(JSON.parse(JSON.stringify([{...initialColorThresholdList}])));
        }
        setColorSetup(event.target.value);

    };

    const handleColorThresholdChange = (e, thresholdIndex, colorIndex) => {
        let newcolorThresholdElm = colorThreshold.filter((row, index) => thresholdIndex === index)[0];
        let list = [...colorThreshold];

        newcolorThresholdElm.threshold[colorIndex].range = e.target.value;
        //     //threshold.forEach((color, index)=>{if(index===colorIndex){color.range=e.target.value} }));

        list.splice(thresholdIndex, 1, newcolorThresholdElm);
        // // newcolorThreshold.[thresholdIndex].threshold[colorIndex].range = e.target.value;
        setColorThreshold(list);
    };

    //LH-581
    //SI-66 Set Filter Values as checkbox
    //const setFilterValue = (e, filterIndex, valueIndex) => {
    const setFilterValue = (value, filterIndex) => {
        const list = [...filterList];
        const updatedValues = [...value];
        if (list[filterIndex].name !== '') {

            let newColorThreshold = [...colorThreshold];

            newColorThreshold.forEach((thres) => {
                if (thres[list[filterIndex].name] !== undefined) {

                    if (!updatedValues.includes(thres[list[filterIndex].name])) {
                        thres[list[filterIndex].name] = '';
                    }

                }
            });
            //SI-66
            //list[filterIndex].values[valueIndex] = e.target.value;
            list[filterIndex].values = [...updatedValues];

            setColorThreshold(newColorThreshold);
            saveFilterList(list);
            checkFilterValuesAvailability(list);
        }
    };

    //SI-103 Provide Filter Alias Name
    const handleFilterLabelChange = (e, index) => {
        const list = [...filterList];
        let newFilterError = [...filterError];
        newFilterError[index] = '';
        let value = e.target.value;//.replace(/\s/g, "").toLowerCase();
        list[index].label = value;
        saveFilterList(list);
        if (newFilterError[index] === '') {
            let duplicateFilters = list.filter(f => f.label.toLowerCase() === value.toLowerCase());
            if (duplicateFilters.length > 1) {
                newFilterError[index] = 'Filter label with same name already there';
            }
        }
        setFilterError(newFilterError);
    }

    //LH-572
    const handleFilterChange = (e, index) => {
        let newFilterError = [...filterError];
        newFilterError[index] = '';
        setFilterError(newFilterError);
        //SI-103 Filter name label
        let value = e.target.value;//.replace(/\s/g, "").toLowerCase();
        // let filterValues = props.optionsForDataField.filter(obj=> obj.columnFilter )
        const list = [...filterList];

        //if (list.filter((element) => element.name === value).length === 0) { SI-138 temporary
        let newColorThreshold = [...colorThreshold];
        newColorThreshold.forEach((thres) => {
            if (thres[list[index].name] !== undefined) {
                let filterVal = thres[list[index].name];
                thres[value] = filterVal;
                delete thres[list[index].name];
            }
        });
        list[index].name = value;
        list[index].label = value;
        //list[index].values = [];
        const filterval = allFilters.filter(row => row.filter === value);
        if (filterval.length > 0) {
            list[index].values = filterval[0].values;
            saveFilterList(list);
            setColorThreshold(newColorThreshold);
            checkFilterValuesAvailability(list);
            //SI-103 Provide Filter Alias Name
            handleFilterLabelChange(e, index);
        }
        //}
        //if the filter value exist in Cohort List, set cohortError
        if (cohortsList.includes(value) && value !== '') {
            newFilterError[index] = 'Filter has already been selected as Cohort';
            setFilterError(newFilterError);
        } else {
            let newCohortError = cohortError.map((cohort) => '');
            setCohortError(newCohortError);
        }

        //SI-103 Dont allow duplicate Filter names
        if (newFilterError[index] === '') {
            let duplicateFilters = list.filter(f => f.name.toLowerCase() === value.toLowerCase());
            if (duplicateFilters.length > 1) {
                newFilterError[index] = 'Filter with same name already there';
                setFilterError(newFilterError);
            }
        }
    };

    //LH-572
    const handleCohortChange = (name, value, index) => {
        let newCohortError = [...cohortError];
        newCohortError[index] = '';
        setCohortError(newCohortError);

        const list = [...cohortsList];
        if (!list.includes(value)) {
            list[index] = value;
            saveCohortsList(list);
        }
        if (filterList.filter((element) => element.name === value).length > 0) {
            newCohortError[index] = 'Cohort has already been selected as Filter';
            setCohortError(newCohortError);
        } else {
            let newFilterError = filterError.map((filter) => '');
            setFilterError(newFilterError);
        }
    };

    const checkCommonErrors = () => {
        if (analysisName === '') {
            setCommonError('Analysis name cannot be blank');
            setAlert({status: true, severity: "error", origin: "center", message: 'Analysis name cannot be blank!'});
            return true;
        }

        if (props.checkDuplicateTree(analysisName, props.isNewAnalysis).length > 0) {
            setCommonError('Analysis name already exists');
            setAlert({status: true, severity: "error", origin: "center", message: 'Analysis name already exists'});
            return true;
        }

        if (metricsList.filter(metric => metric.name === '').length > 0) {
            setCommonError('Metrics name cannot be blank');
            setAlert({status: true, severity: "error", origin: "center", message: 'Metrics name cannot be blank'});
            return true;
        }

        // if(parameterList.filter(parameter=>parameter.parameterName==='').length > 0){
        // 	setCommonError('Parameter name cannot be blank');
        // 	setAlert({status:true, severity:"error", origin:"center", message: 'Parameter name cannot be blank'});
        // 	return true;
        // }

        if (filterList.filter(fil => fil.name !== '').length > 0) {
            if (filterList[0].name === '') {
                setCommonError('First Filter cannot be blanks');
                setAlert({status: true, severity: "error", origin: "center", message: 'First Filter cannot be blanks'});
                return true;
            }
        }

        setCommonError('');
        return false;
    }
    const saveAnalysisSettings = () => {
        let allCohortError = cohortError.filter((err) => err !== ''); //LH-572
        let allFilterError = filterError.filter((err) => err !== ''); //LH-572

        if (allCohortError.length === 0 && allFilterError.length === 0 && !checkCommonErrors()) {
            //LH-581 if filterList has some name as '', then remove them except for index 1
            //let newFilterList = filterList.filter((elm, index) => elm.name !== '' && index!==0);

            //Color Threshold
            let setColorThreshold = null;
            //"Automatic"
            // if (typeof colorThreshold === 'string') {
            if (colorSetup === "automatic") {
                //setColorThreshold = colorThreshold;
                setColorThreshold = "automatic";
            } else {
                setColorThreshold = [...colorThreshold];
                setColorThreshold.forEach((thresh, index) => {

                    for (const [key, value] of Object.entries(thresh)) {

                        if (key !== 'threshold' && index !== 0) {
                            let selectedFilter = filterList.filter((row) => row.name === key);
                            thresh[key] = selectedFilter.length > 0
                                ? selectedFilter[0].values[value] ? selectedFilter[0].values[value] : ""
                                : "";
                        }

                    }
                    let convertedThreshold = {};
                    thresh.threshold.forEach((val) => {
                        convertedThreshold[val.range] = val.label.split(' ').join('_').toLowerCase();
                    });
                    thresh.threshold = {...convertedThreshold};
                });
            }


            props.saveAnalysisDetails(
                analysisName,
                analysisGoal,
                analysisParameter,
                metricsList,
                parameterList,
                setColorThreshold,
                colorSetup,
                filterList,
                driverList,
                cohortsList //LH-572
            );
        }
    };

    const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
        formControl: {
            margin: theme.spacing(1),
            width: '25rem',
            marginLeft: '3rem',
        },

        control: {
            margin: theme.spacing(1),
            width: '30.5rem',
            marginLeft: '0rem',
        },
        layout: {
            width: 'auto',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
        span: {
            border: '1px solid #676767',
            borderRadius: '50%',
            padding: '2px',
            height: '20px',
        },
    }));

    const classes = useStyles();

    return (<>
        <MDBModal
            isOpen={props.settingsModal}
            toggle={() => props.toggleSettingsModal}
            className="cascading-modal px-5 my-5"
            size="fluid"
        >
            <MDBModalBody className="pt-0 ml-3">
                <button
                    type="button"
                    className="close text-dark mt-4"
                    aria-label="Close"
                    onClick={() => props.toggleSettingsModal()}
                >
                    <span aria-hidden="true">×</span>
                </button>

                <h2 className="mt-5" style={{color: '#1E4564'}}>
                    Settings
                </h2>
                <hr/>

                <div className="ml-2">
                    <h5>Name & Goal</h5>
                    <span>Name your Analysis, define its goal and drivers.</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleGoalDisplay}>
                            <MDBIcon icon={!goalDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {goalbtnvalue}
                        </Button>
                    </div>
                </div>

                <MDBRow className="ml-2" style={{display: goalDisplay ? 'flex' : 'none'}}>
                    {goalDisplay && <NameSettings
                        control={classes.control}
                        formControl={classes.formControl}
                        analysisName={analysisName}
                        setAnalysisName={setAnalysisName}
                        analysisGoal={analysisGoal}
                        setAnalysisGoal={setAnalysisGoal}
                        driverList={driverList}
                        handleRemoveDriverClick={handleRemoveDriverClick}
                        handleDriverChange={handleDriverChange}
                        handleAddDriverClick={handleAddDriverClick}
                    />}
                </MDBRow>


                <hr/>
                <div className="ml-2">
                    <h5 style={{fontWeight: 'bold'}}>Parameters</h5>
                    <span>Behold, Which parameter you are going to use</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleParameterDisplay}>
                            <MDBIcon icon={!parameterDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {parameterbtnvalue}
                        </Button>
                    </div>
                </div>
                <MDBRow className="d-flex justify-content-around">
                    <MDBCol
                        style={{
                            display: parameterDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        <KPIAnalysisParameters
                            parameterList={parameterList}
                            analysisParameter={analysisParameter}
                            availableParameterList={availableParameterList}
                            setAnalysisParameter={setAnalysisParameter}
                            handleAddParameterClick={handleAddParameterClick}
                            handleRemoveParameterClick={handleRemoveParameterClick}
                            handleSelectedParameterChange={handleSelectedParameterChange}
                            formControl={classes.formControl}
                            handleParameterQuery={handleParameterQuery}
                        />
                        <br/>
                    </MDBCol>
                    <MDBCol
                        style={{
                            display: parameterDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        <MDBCard style={{width: '90%'}}>
                            {/* <MDBCardImage className="img-fluid" src={ExampleAnalysis} waves /> */}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <hr/>
                <div className="ml-2">
                    <h5 style={{fontWeight: 'bold'}}>Metrics (up to 5)</h5>
                    <span>Name and define metrics to analyze.</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleMetricDisplay}>
                            <MDBIcon icon={!metricDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {metricbtnvalue}
                        </Button>
                    </div>
                </div>
                <MDBRow className="d-flex justify-content-around">
                    <MDBCol
                        style={{
                            display: metricDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        <MetricsSettings
                            metricsList={metricsList}
                            handleRemoveMetricsClick={handleRemoveMetricsClick}
                            handleSelectedMetricChange={handleSelectedMetricChange}
                            handleMetricQuery={handleMetricQuery}
                            availableMetricsList={availableMetricsList}
                            formControl={classes.formControl}
                            unitList={unitList}
                            handleAddMetricsClick={handleAddMetricsClick}
                            optionsForDataField={props.optionsForDataField}
                            token={props.token}
                            resetMetricQuery={props.resetMetricQuery}
                            // allParametersList={props.allParametersList} //LC-723 Parameterized SQL Queries
                            allParametersList={parameterList}  //Allow only selecter
                        />
                        <br/>
                    </MDBCol>
                    <MDBCol
                        style={{
                            display: metricDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        <MDBCard style={{width: '90%'}}>
                            <MDBCardImage className="img-fluid" src={ExampleAnalysis} waves/>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <hr/>
                <div className="ml-2">
                    <h5 style={{fontWeight: 'bold'}}>Node Thresholds</h5>
                    <span>
						Determine when data changes node colors. The color will reflect the most significant metric on a
						node.
					</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleNodeDisplay}>
                            <MDBIcon icon={!nodeDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {nodebtnvalue}
                        </Button>
                    </div>
                </div>
                <MDBRow className="d-flex justify-content-around">
                    <MDBCol
                        style={{
                            display: nodeDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        {nodeDisplay && <ThresholdSettings
                            colorRange={colorRange}
                            colorSetup={colorSetup}
                            handleColorSetupChange={handleColorSetupChange}
                            colorThreshold={colorThreshold}
                            handleColorThresholdChange={handleColorThresholdChange}
                            filterValuesAvailable={filterValuesAvailable}
                            filterList={filterList}
                            handleAddThresholdClick={handleAddThresholdClick}
                            handleRemoveThresholdClick={handleRemoveThresholdClick}
                            exceptionThresholdValue={exceptionThresholdValue}
                            handleExceptionThresholdValue={handleExceptionThresholdValue}
                        />}
                    </MDBCol>
                    <MDBCol
                        style={{
                            display: nodeDisplay ? 'block' : 'none',
                            width: '50%',
                        }}
                    >
                        <MDBCard style={{width: '90%'}}>
                            <MDBCardImage className="img-fluid w-100" src={ExampleNode} waves/>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <hr/>
                <div className="ml-2">
                    <h5 style={{fontWeight: 'bold'}}>Add Filters (Optional; up to 3)</h5>
                    <span>Choose how your Analysis results can be filtered.</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleFilterDisplay}>
                            <MDBIcon icon={!filterDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {filterbtnvalue}
                        </Button>
                    </div>
                </div>
                <MDBRow className="d-flex justify-content-around">
                    <MDBCol style={{display: filterDisplay ? 'block' : 'none'}}>
                        {filterDisplay && <FilterSettings
                            filterList={filterList}
                            handleRemoveFilterClick={handleRemoveFilterClick}
                            handleAddFilterClick={handleAddFilterClick}
                            filterError={filterError}
                            formControl={classes.formControl}
                            handleFilterChange={handleFilterChange}
                            //SI-103
                            // allFilters={props.allFilters}
                            allFilters={allFilters}
                            control={classes.control}
                            setFilterValue={setFilterValue}
                            handleAddFilterValueClick={handleAddFilterValueClick}
                            handleRemoveFilterValueClick={handleRemoveFilterValueClick}
                            handleFilterLabelChange={handleFilterLabelChange} //SI-103
                            token={props.token}
                        />}
                    </MDBCol>
                </MDBRow>

                <hr/>
                <div className="ml-2">
                    <h5 style={{fontWeight: 'bold'}}>Add Cohorts</h5>
                    <span>Choose the cohorts to apply on Analysis results.</span>
                    <div className="d-flex justify-content-end">
                        <Button variant="contained" color="primary" style={inputBtn} onClick={toggleCohortDisplay}>
                            <MDBIcon icon={!cohortDisplay ? 'chevron-down' : 'chevron-up'}/>
                            &nbsp; {cohortbtnvalue}
                        </Button>
                    </div>
                </div>
                <MDBRow className="d-flex justify-content-around">
                    <MDBCol style={{display: cohortDisplay ? 'block' : 'none'}}>
                        <CohortSettings
                            // allFilters={props.allFilters}
                            availableCohortsList={availableCohortsList}
                            cohortError={cohortError}
                            cohortsList={cohortsList}
                            handleRemoveCohortClick={handleRemoveCohortClick}
                            formControl={classes.formControl}
                            handleCohortChange={handleCohortChange}
                            handleAddCohortClick={handleAddCohortClick}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBModalBody>
            <MDBModalFooter className="d-flex flex-row align-items-center justify-content-between">
                <Button
                    variant="outlined"
                    color="primary"
                    style={{
                        color: '#5AAFE3',
                    }}
                    onClick={() => props.toggleSettingsModal()}
                >
                    CANCEL
                </Button>
                <div className="text-danger font-weight-bold d-none">{commonError}</div>

                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: '#3F88C5',
                    }}
                    onClick={() => saveAnalysisSettings()}
                >
                    SAVE AND CONTINUE
                </Button>

            </MDBModalFooter>
        </MDBModal>

        <Snackbar open={isAlert.status} autoHideDuration={6000}
                  anchorOrigin={{vertical: 'bottom', horizontal: isAlert.origin}}
                  onClose={() => setAlert({...isAlert, status: false})}>
            <Alert variant="filled" severity={isAlert.severity} sx={{width: '100%'}}>{isAlert.message}</Alert>
        </Snackbar>
    </>);
};
export default KPIAnalysisSettings;
