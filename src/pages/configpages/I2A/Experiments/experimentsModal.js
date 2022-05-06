import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Card,
    CircularProgress,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {DatePicker, Modal, Popover, Table} from "antd";
import moment from 'moment';
import uuid from 'react-uuid';
import ReactEcharts from 'echarts-for-react';
import {CONTEXT} from "../../../../config";
import {createExperiment, deleteExperiment, fetchExperiment, updateExperiment} from "../../../../services/I2AService";
import {AppContext} from '../../../../AppProvider';

const ExperimentsModal = (props) => {
    const appContext = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [splitValue, setSplitValue] = useState(100);
    const [audience, setAudience] = useState(0);
    const [variant, setVariant] = useState({name: '', description: ''});
    const [formData, setFormData] = useState({
        expActionId: "",
        expKpiTreeId: 0,
        expId: "",
        expName: "",
        expDesc: "",
        expTypeCode: "",
        expKeyMetric: "",
        expStartDate: "",
        expEndDate: "",
        expSampleType: "",
        expPopulation: 0,
        expGoalType: "",
        expGoalValue: "",
        expRecommendStatus: "N",
        expStatus: "NEW",
        variants: [
            {
                variantId: 'variant' + uuid().split('-').join(''),
                variantName: "No Treatment",
                variantDesc: "The control variant is for the group of customers, that do not receive any test treatment. The Experimenters compare their test group performance to the control group to check if the treatment had an effect.",
                variantSplit: 100,
                variantType: "Control",
                variantMetricName: '',
                variantMetricValue: 0,
                variantMetricUnit: '',
                variantChartData: []
            },
        ],
    });

    const handleExpTypeCode = (expTypeCode) => {
        setAudience(0);
        if (expTypeCode !== 'Test vs Control') {
            setFormData({
                ...formData,
                expTypeCode,
                expSampleType: "",
                expPopulation: props.cohortPopulation,
                variants: []
            });
        } else {
            setFormData({
                ...formData, expTypeCode, variants: [
                    {
                        variantId: 'variant' + uuid().split('-').join(''),
                        variantName: "No Treatment",
                        variantDesc: "The control variant is for the group of customers, that do not receive any test treatment. The Experimenters compare their test group performance to the control group to check if the treatment had an effect.",
                        variantSplit: 100,
                        variantType: "Control"
                    }
                ]
            });
            setVariant({name: '', description: ''});
            setSplitValue(100);
        }
    }

    const validateFormData = () => {
        if (formData.expTypeCode === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment type!'
            });
            return false;
        } else if (formData.expKeyMetric === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select Key Metric!'
            });
            return false;
        } else if (formData.expStartDate === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment start date!'
            });
            return false;
        } else if (formData.expEndDate === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment end date!'
            });
            return false;
        } else if (formData.expTypeCode === `Test vs Control` && formData.expSampleType === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment Audience type!'
            });
            return false;
        } else if (formData.expTypeCode === `Test vs Control` && formData.expSampleType !== `Full` && formData.expPopulation === 0) {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Add experiment Population!'
            });
            return false;
        } else if (formData.expGoalType === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment goal type!'
            });
            return false;
        } else if (formData.expGoalValue === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Select experiment goal Value!'
            });
            return false;
        } else if (formData.variants.length < 1) {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Create test variant!'
            });
            return false;
        } else if (formData.expTypeCode === `Test vs Control` && formData.variants.length < 2) {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Create test variant!'
            });
            return false;
        } else {
            return true;
        }
    }

    const resetFormData = () => {
        setFormData({
            expActionId: "",
            expKpiTreeId: 0,
            expId: "",
            expName: "",
            expDesc: "",
            expTypeCode: "",
            expKeyMetric: "",
            expStartDate: "",
            expEndDate: "",
            expSampleType: "",
            expPopulation: 0,
            expGoalType: "",
            expGoalValue: "",
            expRecommendStatus: "N",
            variants: [
                {
                    variantId: 'variant' + uuid().split('-').join(''),
                    variantName: "No Treatment",
                    variantDesc: "The control variant is for the group of customers, that do not receive any test treatment. The Experimenters compare their test group performance to the control group to check if the treatment had an effect.",
                    variantSplit: 100,
                    variantType: "Control"
                }
            ],
        });
    }

    const addVariant = () => {
        const duplicate = formData.variants.filter(x => x.variantName === variant.name);
        if (duplicate.length) {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Variant Name already in use!'
            });
            return false;
        }
        if (variant.name === '' || variant.description === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Name and Description required!'
            });
            return false;
        }
        let newVariant = {
            variantName: variant.name,
            variantDesc: variant.description,
            variantSplit: 100,
            variantType: "Test",
            variantId: 'variant' + uuid().split('-').join(''),
        }
        setFormData({...formData, variants: [...formData.variants, newVariant]})
        setSplitValue(100 / (formData.variants.length + 1));
        setCreate(false);
        setVariant({name: '', description: ''});
    }

    const updateVariant = (variantId) => {
        const duplicate = formData.variants.filter(x => x.variantName === variant.name);
        if (duplicate.length > 1) {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Variant Name already in use!'
            });
            return false;
        }
        if (variant.name === '' || variant.description === '') {
            appContext.useSnackBar({
                status: true,
                severity: "error",
                horizontal: "center",
                message: 'Name and Description required!'
            });
            return false;
        }
        let variants = formData.variants.map(item => {
            if (item.variantId === variantId) {
                item.variantName = variant.name;
                item.variantDesc = variant.description;
            }
            return item;
        });

        setFormData({...formData, variants});
        setVariant({name: '', description: ''});
    }

    const removeVariant = (variantId) => {
        if (window.confirm("Are you sure you want to delete this variant?")) {
            let variants = formData.variants.filter(x => x.variantId !== variantId);
            setFormData({...formData, variants});
            let ln = formData.variants.length > 1 ? formData.variants.length - 1 : formData.variants.length;
            setSplitValue(100 / ln);
            setVariant({name: '', description: ''});
        }
    }

    const getExperiment = (actionId) => {
        //setIsLoading(true);
        fetchExperiment(actionId)
            .then(({data}) => {
                if (data.code === 200) {
                    let isJsonVariants = isJsonString(data.response.variants);
                    let variants = isJsonVariants.map(item => ({
                        ...item,
                        variantChartData: isJsonString(item.variantChartData)
                    }));
                    setFormData({...data.response, expPopulation: props.cohortPopulation, variants});
                    setSplitValue(variants[0]['variantSplit']);
                    setAudience(Math.round((parseInt(data.response.expPopulation) * 100) / props.cohortPopulation));
                }
                //setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    };

    const postExperiment = () => {
        if (!validateFormData()) return false;
        let variants = formData.variants.map(item => {
            item.variantSplit = Math.round(splitValue);
            return item;
        })
        let experiment = {
            ...formData,
            expCohortPopulation: props.cohortPopulation,
            variants,
            expId: 'exp' + uuid().split('-').join('')
        };
        setIsLoading(true);
        createExperiment(experiment)
            .then(({data}) => {
                if (data.code === 200) {
                    appContext.useSnackBar({
                        status: true,
                        severity: "success",
                        message: 'Experiment saved successfully!'
                    });
                    props.fetchActions();
                    setIsLoading(false);
                } else {
                    appContext.useSnackBar({status: true, severity: "error", message: data?.message});
                    setIsLoading(false);
                }
            })
            .catch(error => {
                appContext.useSnackBar({status: true, severity: "error", message: 'Error found: ' + error?.message});
                setIsLoading(false);
            })
    };

    const putExperiment = () => {

        //const { expActionId, ...experiment } = formData;
        if (!validateFormData()) return false;
        let variants = [];
        formData.variants.map(item => {
            let obj = {
                variantId: item.variantId,
                variantName: item.variantName,
                variantDesc: item.variantDesc,
                variantSplit: Math.round(splitValue),
                variantType: item.variantType
            }
            variants.push(obj);
            //return item; 
        });
        let newFormData = {
            expActionId: formData.expActionId,
            expCohortPopulation: props.cohortPopulation,
            expDesc: formData.expDesc,
            expEndDate: formData.expEndDate,
            expGoalType: formData.expGoalType,
            expGoalValue: formData.expGoalValue,
            expId: formData.expId,
            expKeyMetric: formData.expKeyMetric,
            expKpiTreeId: formData.expKpiTreeId,
            expName: formData.expName,
            expPopulation: formData.expPopulation,
            expRecommendStatus: formData.expRecommendStatus,
            expRescheduleStatus: formData.expRescheduleStatus,
            expSampleType: formData.expSampleType,
            expStartDate: formData.expStartDate,
            expStatus: formData.expStatus,
            expTypeCode: formData.expTypeCode,
        }
        setIsLoading(true);
        updateExperiment({...newFormData, variants})
            .then(({data}) => {
                if (data.code === 200) {
                    appContext.useSnackBar({
                        status: true,
                        severity: "success",
                        message: 'Experiment updated successfully!'
                    });
                    props.fetchActions();
                    setIsLoading(false);
                } else {
                    appContext.useSnackBar({status: true, severity: "error", message: data?.message});
                    setIsLoading(false);
                }
            })
            .catch(error => {
                appContext.useSnackBar({status: true, severity: "error", message: 'Error found: ' + error?.message});
                setIsLoading(false);
            })
    };

    const removeExperiment = (expId) => {
        if (!window.confirm("Are you sure you want to delete this variant?")) {
            return false;
        }
        deleteExperiment([{expId}])
            .then(({data}) => {
                if (data.code === 200) {
                    appContext.useSnackBar({status: true, message: 'Experiment deleted successfully!'});
                    props.fetchActions();
                } else {
                    appContext.useSnackBar({status: true, severity: "error", message: data?.message});
                }
            })
            .catch(error => {
                appContext.useSnackBar({status: true, severity: "error", message: 'Error found: ' + error?.message});
                setIsLoading(false);
            })
    };

    const optionsExperimentChart = () => {
        let data = [];
        formData.variants.map(x => data.push({value: Math.round(splitValue), name: x.variantName}));

        return {
            tooltip: {trigger: 'item'}, // add %
            formatter: function (params) {

                return `${params.seriesName}<br />
                        ${params.name}: ${params.data.value} %`;
            },
            grid: {
                //top: '20%',
            },
            series: [
                {
                    name: 'Audience',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    color: ['#d4ebf8', '#043365', '#004c9d', '#558aa9'],
                    label: {show: false},
                    labelLine: {show: false},
                    emphasis: {
                        itemStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            //color: '#ccc'
                        }
                    },
                    data: data,
                }
            ]
        }
    }

    useEffect(() => {
        const {mode, expStatus, expKpiTreeId, expActionId, expName, expDesc} = props;

        if (mode === 'edit') {
            getExperiment(expActionId);
        } else {
            setFormData({...formData, expStatus, expKpiTreeId, expActionId, expName, expDesc})
        }

    }, [props]);

    console.log(formData, props);
    return (<>
        <Modal className="action-modal" width="1098px"
               title={`${props.mode === 'add' ? 'Create Experiment' : props.mode === 'edit' && props.expStatus != `IN-PROGRESS` ? 'Edit Experiment' : 'Experiment Hub'}`}
               visible={props.isVisible}
               onCancel={() => {
                   props.setIsVisible(false);
                   resetFormData();
               }}
               footer={[
                   formData.expStatus !== 'IN-PROGRESS' && formData.expStatus !== 'CONCLUDED' ? (
                           props.mode !== 'edit' ?
                               <Button size="small"
                                       className={`${isLoading ? 'bg-light text-muted' : 'bg-primary-blue text-white'} px-3 py-1`}
                                       disabled={isLoading} onClick={() => postExperiment()}>
                                   Submit {isLoading && <CircularProgress size={18} className="text-muted ml-2"/>}
                               </Button>
                               :
                               <>
                                   <Button size="small" variant="outlined" className="text-primary-blue px-3 py-1 mr-2"
                                           onClick={() => removeExperiment(formData.expId)}>
                                       Delete
                                   </Button>
                                   <Button size="small"
                                           className={`${isLoading ? 'bg-light text-muted' : 'bg-primary-blue text-white'} px-3 py-1`}
                                           disabled={isLoading} onClick={() => putExperiment()}>
                                       Update {isLoading && <CircularProgress size={18} className="text-muted ml-2"/>}
                                   </Button>
                               </>
                       )
                       : formData.expStatus === 'CONCLUDED' ?
                           (
                               <Button size="small" className={`bg-primary-blue text-white px-3 py-1`}
                                       onClick={() => props.setIsVisible(false)}>
                                   Ignore this Experiment
                               </Button>
                           )
                           :
                           null
               ]}
        >
            <div className="container px-0">
                {/* // Action card // */}
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <Card className="d-flex border mx-auto action-card">
                            <div className="pr-2 d-flex align-items-center"><img src={`${CONTEXT}/flask.svg`}
                                                                                 alt="experiments"/></div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-top action-card-header">
                                    <div className="flex-grow-1">
                                        <h6 className="text-nowrap text-muted font-weight-normal fs12">{props.cohortData}</h6>
                                        <h6 className="fs14 mb-0">{props.expName}</h6>
                                        <h6 className="text-nowrap text-muted font-weight-normal fs12">{formData.expTypeCode}</h6>
                                    </div>
                                    <div className="rounded-circle bg-primary-blue40 text-center"
                                         style={{width: "24px", height: "24px"}}>
                                        <span className="small align-bottom text-uppercase text-white"
                                              title={props.actionCreatedBy.split(".").join(" ")}>{props.actionCreatedBy.split(".").map((n) => n[0]).join("")}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-weight-normal pr-3">{props.expDesc}</p>
                                    <h6 className="text-nowrap text-muted font-weight-normal fs12 m-0">
                                        {new Date(props.actionStartDate).getDate() + '/' + (new Date(props.actionStartDate).getMonth() + 1) + '/' + new Date(props.actionStartDate).getFullYear()}
                                        {` - `}
                                        {new Date(props.actionEndDate).getDate() + '/' + (new Date(props.actionEndDate).getMonth() + 1) + '/' + new Date(props.actionEndDate).getFullYear()}

                                        <strong
                                            className="text-primary-blue pl-5">{formData.expStatus !== `DELETED` && formData.expStatus}</strong>
                                    </h6>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="border rounded p-3 mt-3">
                    {formData.expStatus !== 'IN-PROGRESS' && formData.expStatus !== 'CONCLUDED' &&
                        <>
                            <div className="row mt-2 mb-4">
                                <div className="col-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" className="label-mui">Experiment
                                            Type</InputLabel>
                                        <Select
                                            label="Experiment Type"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="select-mui"
                                            name="expTypeCode"
                                            variant="outlined"
                                            value={formData.expTypeCode}
                                            onChange={e => handleExpTypeCode(e.target.value)}
                                        >
                                            {['Test vs Control', 'Pre / Post Analysis', 'A/B Testing'].map((item, i) =>
                                                <MenuItem key={i} value={item}>{item}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" className="label-mui">Key
                                            Metric</InputLabel>
                                        <Select
                                            label="Key Metric"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="select-mui"
                                            name="expKeyMetric"
                                            variant="outlined"
                                            value={formData.expKeyMetric}
                                            onChange={e => setFormData({...formData, expKeyMetric: e.target.value})}
                                        >
                                            {Object.keys(props.attributes).map((key, i) => (key != "node_status") &&
                                                <MenuItem key={i} value={key}>{key}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-4">
                                    <DatePicker.RangePicker size="large" className="w-100"
                                                            disabledDate={disabledDate}
                                                            value={formData.expStartDate && formData.expEndDate
                                                                ? [moment(formData.expStartDate), moment(formData.expEndDate)] : null
                                                            }
                                                            onChange={date => date ? setFormData({
                                                                ...formData,
                                                                expStartDate: date[0]._d.toISOString(),
                                                                expEndDate: date[1]._d.toISOString()
                                                            }) : setFormData({
                                                                ...formData,
                                                                expStartDate: '',
                                                                expEndDate: ''
                                                            })}
                                    />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-6">
                                    {formData.expTypeCode !== `Pre / Post Analysis` &&
                                        <div className="row mb-4">
                                            <div className="col-md-12 mb-3">
                                                <h5 className="text-muted font-weight-normal">Audience</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label"
                                                                className="label-mui">Audience</InputLabel>
                                                    <Select
                                                        label="Audience"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        className="select-mui"
                                                        name="expSampleType"
                                                        variant="outlined"
                                                        value={formData.expSampleType}
                                                        onChange={e => {
                                                            setFormData({
                                                                ...formData,
                                                                expSampleType: e.target.value,
                                                                expPopulation: e.target.value === `Full` ? props.cohortPopulation : 0
                                                            });
                                                            setAudience(0);
                                                        }}
                                                    >
                                                        {['Sample Population', 'Full'].map((item, i) => <MenuItem
                                                            key={i} value={item}>{item}</MenuItem>)}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            {formData.expSampleType !== `Full` &&
                                                <div className="d-flex align-items-center col-md-6">
                                                    <FormControl className="w75">
                                                        <TextField
                                                            id="demo-simple-select"
                                                            className="select-mui"
                                                            name="expPopulation"
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            InputProps={{inputProps: {min: 0, className: "px-2"}}}
                                                            value={audience}
                                                            onChange={e => {
                                                                setAudience(e.target.value);
                                                                setFormData({
                                                                    ...formData,
                                                                    expPopulation: Math.round((props.cohortPopulation * e.target.value) / 100)
                                                                })
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <label className="flex-grow-1 pl-2 mb-0">%
                                                        of {props.cohortPopulation} = {Math.round((props.cohortPopulation * audience) / 100)}</label>
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <h5 className="text-muted font-weight-normal">Goal of Experiement</h5>
                                        </div>
                                        <div className="d-flex align-items-center pr-0 col-md-6">
                                            <label className="text-nowrap bold500 pr-2 mb-0">Goal is to</label>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label"
                                                            className="label-mui">Change</InputLabel>
                                                <Select
                                                    label="Change"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className="select-mui"
                                                    name="expGoalType"
                                                    variant="outlined"
                                                    value={formData.expGoalType}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        expGoalType: e.target.value
                                                    })}
                                                >
                                                    {['Increase', 'Decrease'].map((item, i) => <MenuItem key={i}
                                                                                                         value={item}>{item}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="d-flex align-items-center col-md-6">
                                            <label
                                                className="flex-grow-1 text-center pr-2 mb-0">{formData.expKeyMetric.length ? formData.expKeyMetric : "keymetric"} by</label>
                                            <FormControl className="w75">
                                                <TextField
                                                    id="demo-simple-select"
                                                    className="select-mui"
                                                    name="expGoalValue"
                                                    variant="outlined"
                                                    size="small"
                                                    type="number"
                                                    InputProps={{inputProps: {min: 0, className: "px-2"}}}
                                                    value={formData.expGoalValue}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        expGoalValue: e.target.value
                                                    })}
                                                />
                                            </FormControl>
                                            <label
                                                className="pl-2 mb-0">{formData.expKeyMetric.length ? props.attributesUnit[formData.expKeyMetric] : '%'}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <ReactEcharts option={optionsExperimentChart()} style={{height: "200px"}}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="d-flex justify-content-between col-md-12 mb-2">
                                    <h5 className="text-muted font-weight-normal mb-0">Target / Variants</h5>
                                    <Popover
                                        content={
                                            <Card className="d-flex border mx-auto mw-100 h-100 action-card">
                                                <div>
                                                    <div
                                                        className="d-flex justify-content-between align-items-top action-card-header">
                                                        <div className="flex-grow-1 pr-2">
                                                            <h6 className="fs14">{`Test`}</h6>
                                                            <FormControl className="w-100 mb-3">
                                                                <TextField
                                                                    required
                                                                    label="Name"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    className="select-mui"
                                                                    name="name"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={variant.name}
                                                                    onChange={e => setVariant({
                                                                        ...variant,
                                                                        name: e.target.value
                                                                    })}
                                                                />
                                                            </FormControl>
                                                            <FormControl className="w-100">
                                                                <TextField
                                                                    required
                                                                    multiline
                                                                    rows={4}
                                                                    label="Description"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    className="select-mui"
                                                                    name="description"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={variant.description}
                                                                    onChange={e => setVariant({
                                                                        ...variant,
                                                                        description: e.target.value
                                                                    })}
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        <div
                                                            className='d-flex flex-column justify-content-between align-items-center px-3'>
                                                            <Icon className="text-primary-blue">groups</Icon>
                                                            <h4 className="font-weight-bold mb-0">{Math.round(splitValue)}%</h4>
                                                            <Button variant="contained"
                                                                    className="bg-primary-blue text-white"
                                                                    onClick={() => addVariant()}>Create</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        }
                                        placement="topRight"
                                        trigger="click"
                                        visible={create}
                                        onVisibleChange={e => setCreate(e)}
                                    >
                                        {formData.expTypeCode === `Pre / Post Analysis` && formData.variants.length > 0 ? null :
                                            <Button variant="contained" size="small"
                                                    className="bg-primary-blue text-white px-3 py-1" onClick={() => {
                                                setCreate(!create)
                                            }}>
                                                New Variant
                                            </Button>
                                        }
                                    </Popover>
                                </div>
                            </div>
                        </>
                    }
                    {/* // Target / variants  //*/}
                    <div className="container rounded">
                        <div className="row">
                            {formData.expStatus !== 'IN-PROGRESS' && formData.expStatus !== 'CONCLUDED'
                                ? <VariantView variants={formData.variants} variant={variant} setVariant={setVariant}
                                               splitValue={splitValue} updateVariant={updateVariant}
                                               removeVariant={removeVariant}/>
                                : <VariantResults variants={formData.variants}
                                                  expCohortPopulation={formData.expCohortPopulation}
                                                  expStartDate={formData.expStartDate} expEndDate={formData.expEndDate}
                                                  expStatus={formData.expStatus}/>
                            }
                            {formData.variants.length < 1 &&
                                <div className="col-md-6 mb-4">
                                    <Card className="d-flex mx-auto mw-100 h-100 border action-card"
                                          style={{minHeight: '145px'}}>
                                        <div className="row m-0 justify-content-around align-items-center">
                                            <div className="col-4">
                                                <img className="w-100" src={`${CONTEXT}/empty-state.svg`}
                                                     alt="Empty State"/>
                                            </div>
                                            <div className="col-8 text-center">
                                                <h6>No Test Variants</h6>
                                                <p className="font-weight-normal fs12 mb-0">Test variants are created as
                                                    different treatment options and compared against the control group.
                                                    Click on <strong>New Variant</strong> to create a new test variant.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </>);
}

export default ExperimentsModal;


const VariantView = (props) => {
    const [editIdx, setEditIdx] = useState(null);

    return props.variants.map((item, i) => {
        return <div key={i} className="col-md-6 mb-4">
            {editIdx !== i
                ? <Card
                    className={`d-flex mx-auto mw-100 action-card ${(i < 1 && item.variantType === "Control") ? "expanded" : "border"}`}
                    style={{minHeight: '145px'}}>
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-top action-card-header">
                            <div className="flex-grow-1">
                                <h6 className="fs14 mb-1">{item.variantType}</h6>
                                <h6 className="text-nowrap text-muted font-weight-normal fs12">{item.variantName}</h6>
                                <p className="mb-0 text-muted font-weight-normal fs12 pt-2"
                                   style={{minHeight: '75px'}}>{item.variantDesc}</p>

                            </div>
                            <div className='d-flex flex-column justify-content-between align-items-center pl-3 py-2'>
                                {item.variantType !== "Control" &&
                                    <div className="d-flex">
                                        <IconButton className="outline-none mr-2" size="small" color="primary"
                                                    aria-label="delete"
                                                    onClick={() => props.removeVariant(item.variantId)}>
                                            <Icon fontSize="small">delete_outlined</Icon>
                                        </IconButton>
                                        <IconButton className="outline-none" size="small" color="primary"
                                                    aria-label="edit" onClick={() => {
                                            setEditIdx(i);
                                            props.setVariant({name: item.variantName, description: item.variantDesc});
                                        }}>
                                            <Icon fontSize="small">edit_outlined</Icon>
                                        </IconButton>
                                    </div>
                                }
                                <Icon className="text-primary-blue">groups</Icon>
                                <h4 className="font-weight-bold mb-0">{Math.round(props.splitValue)}%</h4>
                            </div>
                        </div>
                    </div>
                </Card>
                : <Card className="d-flex border mx-auto mw-100 h-100 action-card">
                    <div>
                        <div className="d-flex justify-content-between align-items-top action-card-header">
                            <div className="flex-grow-1 pr-2">
                                <h6 className="fs14">{`Test`}</h6>
                                <FormControl className="w-100 mb-3">
                                    <TextField
                                        required
                                        label="Name"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className="select-mui"
                                        name="name"
                                        variant="outlined"
                                        size="small"
                                        value={props.variant['name']}
                                        onChange={e => props.setVariant({...props.variant, name: e.target.value})}
                                    />
                                </FormControl>
                                <FormControl className="w-100">
                                    <TextField
                                        required
                                        multiline
                                        rows={4}
                                        label="Description"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className="select-mui"
                                        name="description"
                                        variant="outlined"
                                        size="small"
                                        value={props.variant['description']}
                                        onChange={e => props.setVariant({
                                            ...props.variant,
                                            description: e.target.value
                                        })}
                                    />
                                </FormControl>
                            </div>
                            <div className='d-flex flex-column justify-content-between align-items-center px-3'>
                                <Icon className="text-primary-blue">groups</Icon>
                                <h4 className="font-weight-bold mb-0">{Math.round(props.splitValue)}%</h4>
                                <Button variant="contained" className="bg-primary-blue text-white" onClick={() => {
                                    props.updateVariant(item.variantId);
                                    setEditIdx(null);
                                }}>Update</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            }
        </div>
    });
}

const VariantResults = (props) => {
    const [isRecommend, setIsRecommend] = useState(false);
    const [listView, setListView] = useState(false);
    let best = {variantMetricName: '', variantName: '', variantChangedValue: '', variantDesiredGoalValue: ''};
    let filtered = props.variants.filter(v => v.variantBestValue === v.variantMetricValue);
    if (filtered.length) {
        best = filtered[0];
    }

    return <>
        <div className="col-md-12 row justify-content-between align-items-center border-bottom mx-0 mb-4">
            <div className="col-md-3">
                {listView && <div className='mx-auto d-flex flex-column justify-content-between align-items-center'
                                  style={{maxWidth: `155px`}}>
                    <div className="d-flex align-items-center w-100 mb-2">
                        <LinearProgress variant="determinate" className="flex-grow-1 w-100 rounded"
                                        value={best['expCompletedPercentage'] * 10}/>
                        <small className="pl-2 text-nowrap text-muted">{best['expDurationDays']}</small>
                    </div>
                    <h6 className="text-nowrap text-muted font-weight-normal fs12 m-0">
                        {new Date(props.expStartDate).getDate() + '/' + (new Date(props.expStartDate).getMonth() + 1) + '/' + new Date(props.expStartDate).getFullYear()}
                        {` - `}
                        {new Date(props.expEndDate).getDate() + '/' + (new Date(props.expEndDate).getMonth() + 1) + '/' + new Date(props.expEndDate).getFullYear()}
                    </h6>
                </div>}
            </div>
            <div className="col-md-5 text-center">
                <h6 className="fs20 mb-1"><Icon className="align-middle mr-3"
                                                title="List">flag</Icon>{`Desired ${best['variantMetricName']} = ${best['variantDesiredGoalValue']} ${best['variantMetricUnit']}`}
                </h6>
                <h6 className="text-muted font-weight-normal fs14">{`${best['goalMessage']}`}</h6>
            </div>
            <div className="col-md-4 text-md-right">
                <Button color="primary" className="outline-none" onClick={() => setListView(!listView)}>
                    <Icon className="align-middle">{!listView ? `format_list_bulleted` : `grid_view`}</Icon>
                </Button>
                <Popover
                    content={
                        <Card className="d-flex flex-column border mx-auto mw-100 h-100 action-card">
                            <div>
                                <div className="action-card-header">
                                    <h6 className="fs16">{`Recommend`}</h6>
                                    <p className="mb-1">Select the Variant, you want to Recommend<br/> for the Action.
                                    </p>
                                    <FormControl className="w-100 my-3">
                                        <InputLabel id="demo-simple-select-label" className="label-mui">Experiment
                                            Name</InputLabel>
                                        <Select
                                            label="Experiment Name"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className="select-mui"
                                            name="expTypeCode"
                                            variant="outlined"
                                            // value={}
                                            // onChange={e => {}}
                                        >
                                            {props.variants.map((item, i) => <MenuItem key={i}
                                                                                       value={item.variantId}>{item.variantName}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" className="bg-primary-blue text-white"
                                            onClick={() => setIsRecommend(false)}>Done</Button>
                                </div>
                            </div>
                        </Card>
                    }
                    placement="topRight"
                    trigger="click"
                    visible={isRecommend}
                    onVisibleChange={e => setIsRecommend(e)}
                >
                    <Button size="small" variant="outlined"
                            disabled={props.expStatus !== `CONCLUDED` ? true : false}
                            className={`${props.expStatus !== `CONCLUDED` ? 'text-muted bg-light' : 'bg-primary-blue text-white'} border-light px-3 py-1`}
                            onClick={() => setIsRecommend(!isRecommend)}>
                        Recommend
                    </Button>
                </Popover>
                <Button color="primary" className="outline-none" onClick={() => {
                }}>
                    <Icon className="align-middle" title="Action">more_vert</Icon>
                </Button>
            </div>
        </div>
        {
            !listView ?
                props.variants.map((item, i) => {
                    return <div key={i} className="col-md-6 mb-4">
                        <Card
                            className={`d-flex mx-auto mw-100 action-card ${item.variantType === `Control` ? "expanded" : "border"}`}
                            style={{minHeight: '145px'}}>
                            <div className="w-100">
                                <div className="d-flex align-items-center action-card-header">
                                    <div className="flex-grow-1">
                                        <h6 className="fs14 mb-1">{item.variantType}</h6>
                                        <h6 className="text-nowrap text-muted font-weight-normal fs12">{item.variantName}</h6>
                                    </div>
                                    <h6 className={`text-${item.variantStatus === `Most Significant` ? 'success' : 'danger'} font-weight-normal fs12 mb-0`}>{item.variantStatus}</h6>
                                </div>
                                <div>
                                    <div
                                        className='d-flex justify-content-around align-items-center border-top border-bottom py-2'>
                                        <div className='d-flex flex-column justify-content-between align-items-center'>
                                            <h6 className="fs12 mb-0">{item.variantMetricName}</h6>
                                            <h4 className="mb-0">{Math.round(item.variantMetricValue) + item.variantMetricUnit}</h4>
                                            {item.variantVsText !== "" &&
                                                <p className="mb-0 text-muted font-weight-normal fs12">
                                                    {<Icon
                                                        className={`align-middle text-primary-blue font-weight-bold ${(item.variantVsValue < 0) ? 'fa-rotate-90' : (item.variantVsValue > 0) ? 'fa-rotate-270' : 'd-none'}`}>arrow_right_alt</Icon>}
                                                    <span
                                                        className="text-dark fs14">{Math.abs(item.variantVsValue) + item.variantMetricUnit} </span>
                                                    {item.variantVsText}
                                                </p>
                                            }
                                        </div>
                                        <div className='d-flex flex-column justify-content-between align-items-center'>
                                            <Icon className="text-primary-blue">groups</Icon>
                                            <h4 className="font-weight-bold mb-0">{Math.round(item.variantSplit)}%</h4>
                                            <p className="mb-0 text-muted font-weight-normal fs12">{`of ${item.expCohortPopulation}`}</p>
                                        </div>
                                        <div
                                            className='flex-grow-1 d-flex flex-column justify-content-between align-items-center'
                                            style={{maxWidth: `155px`}}>
                                            <div className="d-flex align-items-center w-100 mb-2">
                                                <LinearProgress variant="determinate"
                                                                className="flex-grow-1 w-100 rounded"
                                                                value={item.expCompletedPercentage * 10}/>
                                                <small
                                                    className="pl-2 text-nowrap text-muted">{item.expDurationDays}</small>
                                            </div>
                                            <h6 className="text-nowrap text-muted font-weight-normal fs12 m-0">
                                                {new Date(props.expStartDate).getDate() + '/' + (new Date(props.expStartDate).getMonth() + 1) + '/' + new Date(props.expStartDate).getFullYear()}
                                                {` - `}
                                                {new Date(props.expEndDate).getDate() + '/' + (new Date(props.expEndDate).getMonth() + 1) + '/' + new Date(props.expEndDate).getFullYear()}
                                            </h6>
                                        </div>
                                    </div>
                                    <ReactEcharts className="w-100 m-0 pt-2" style={{height: "200px"}}
                                                  option={getOption(item.variantChartData)}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                })
                :
                <Table
                    className="table-theme-bordered"
                    dataSource={dataSource(props.variants)}
                    columns={tableHeader(best)}
                    pagination={false}
                    tableLayout={`fixed`}
                />
        }
    </>
}

const dataSource = (variants) => {
    let arr = [];
    variants.map((item, idx) => {
        arr.push(
            {
                key: idx,
                variantType: item['variantType'],
                variantName: item['variantName'],
                variantDesc: item['variantDesc'],
                variantMetricName: item['variantMetricName'],
                variantMetricValue: item['variantMetricValue'],
                variantMetricUnit: item['variantMetricUnit'],
                variantVsText: item['variantVsText'],
                variantVsValue: item['variantVsValue'],
                variantSplit: item['variantSplit'],
                expCohortPopulation: item['expCohortPopulation'],
                variantChartData: item['variantChartData'],
                status: item['variantStatus']
            }
        )
    });
    return arr;
}

const tableHeader = (variant) => {
    return [
        {
            title: `Treatment`,
            dataIndex: `treatment`,
            key: `treatment`,
            width: 220,
            render: (_, record) => {
                return <>
                    <h6 className="fs14 mb-1">{record.variantType}</h6>
                    <h6 className="text-muted font-weight-normal fs12">{record.variantName}</h6>
                    <h6 className="text-muted font-weight-normal fs12">{record.variantDesc}</h6>
                </>
            },
            // sorter: (a, b) => a.actionName.localeCompare(b.actionName, 'en', { sensitivity: 'base' }),
        },
        {
            title: () => variant['variantMetricName'],
            dataIndex: `rollRate`,
            key: `rollRate`,
            align: `center`,
            render: (_, record) => {
                return <>
                    <h4 className="mb-0">{Math.round(record.variantMetricValue) + record.variantMetricUnit}</h4>
                    {record.variantVsText !== "" &&
                        <p className="mb-0 text-muted font-weight-normal fs12">
                            {<Icon
                                className={`align-middle text-primary-blue font-weight-bold ${(record.variantVsValue < 0) ? 'fa-rotate-90' : (record.variantVsValue > 0) ? 'fa-rotate-270' : 'd-none'}`}>arrow_right_alt</Icon>}
                            <span
                                className="text-dark fs14">{Math.abs(record.variantVsValue) + record.variantMetricUnit} </span>
                            {record.variantVsText}
                        </p>
                    }
                </>
            },
        },
        {

            title: () => {
                return variant.variantChartData.series.map((item, i) => {
                    let str = item.name + '';
                    if (str.length >= 12) {
                        str = str.substring(0, 12) + '...';
                    }
                    return <span key={i} title={item.name}>
                                <Icon className={`align-middle fs14 mr-2`}
                                      style={{color: i === 0 ? '#C4C4C4' : i === 1 ? '#DA8A8A' : '#365C84'}}
                                >circle</Icon>
                                <span className="text-muted font-weight-normal fs12 mr-2">{str}</span>
                            </span>;
                });
                // <>
                //     <Icon className={`align-middle fs14 mr-2`} style={{color: '#C4C4C4'}}>circle</Icon><span className="text-muted font-weight-normal fs12">Desired Roll Rate</span>
                //     <Icon className={`align-middle fs14 mr-2 ml-3`} style={{color: '#DA8A8A'}}>circle</Icon><span className="text-muted font-weight-normal fs12">Control Roll Rate</span>
                //     <Icon className={`align-middle fs14 mr-2 ml-3`} style={{color: '#365C84'}}>circle</Icon><span className="text-muted font-weight-normal fs12">Test Roll Rate</span>
                // </>
            },
            dataIndex: `chart`,
            key: `chart`,
            align: `center`,
            width: `400px`,
            render: (_, record) => {
                return <ReactEcharts className="row m-0" style={{height: '70px', width: '400px'}}
                                     option={getOptionList(record.variantChartData)}/>
            }
        },
        {
            title: () => <span><Icon className={`align-middle text-primary-blue mr-2`}>groups</Icon>Sample Size</span>,
            dataIndex: `sampleSize`,
            key: `sampleSize`,
            align: `center`,
            render: (_, record) => {
                return <>
                    <h4 className="font-weight-bold mb-0">{Math.round(record.variantSplit)}%</h4>
                    <p className="mb-0 text-muted font-weight-normal fs12">{`of ${record.expCohortPopulation}`}</p>
                </>
            },
        },
        {
            title: `Status`,
            dataIndex: `status`,
            key: `status`,
            align: `center`,
            render: (_, record) => {
                return <span
                    className={`text-${record.status === `Most Significant` ? 'success' : 'danger'}`}>{record.status}</span>
            },
        }

    ];
};

function disabledDate(current) {
    // Can not select days before today
    return current < moment().subtract(1, 'day');
}

function isJsonString(str) {
    if (typeof str !== "string") {
        return str;
    }
    try {
        var json = JSON.parse(str);
        return json; //(typeof json === 'object');
    } catch (error) {
        return [];
    }
}

const getOption = (data) => {
    let chartStr = (`series` in data) ? data : {
        xAxis: {data: []},
        series: [{data: [], markLine: {data: [{xAxis: ''}]}}]
    };
    //let idx = (chartStr.xAxis.data).indexOf(chartStr.series[0].markLine.data.xAxis);
    const option = {
        tooltip: {show: true},
        legend: {
            show: true,
            top: 0,
            data: chartStr.series.map((item, i) => ({name: item.name, icon: 'circle'})),
            formatter: function (name) {
                var str = name + '';
                if (str.length >= 15) {
                    str = str.substring(0, 15) + '...';
                }
                return str;
            }
        },
        xAxis: {
            type: 'category',
            data: chartStr.xAxis.data,
            showGrid: true,
            splitLine: {
                show: true,
                lineStyle: {type: 'dashed', color: '#ddd'},
            },
        },
        yAxis: {
            type: 'value',
            showGrid: false,
            splitLine: {show: false},
            axisLabel: {
                formatter: function (value) {
                    return shortInt(value)
                }
            }
        },
        tooltip: {
            show: true,
        },
        grid: {
            top: '15%',
            bottom: '15%',
            //containLabel: true
        },
        visualMap: {
            show: false,
            dimension: 0,
            // pieces: [
            //     {
            //         lte: idx > 0 ? idx : 0,
            //         color: 'blue'
            //     },
            //     {
            //         gt: idx > 0 ? idx : 0,
            //         lte: chartStr.length ? (chartStr.xAxis.data).length : 0,
            //         color: 'green'
            //     }
            // ]
        },
        series: chartStr.series.map((item, i) => ({
            data: item.data,
            name: item.name,
            type: 'line',
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: i === 0 ? '#BDBDBD' : i === 2 ? '#DA8A8A' : '#365C84',
                    lineStyle: {
                        width: i === 0 ? 1 : 2,
                        color: i === 0 ? '#BDBDBD' : i === 2 ? '#DA8A8A' : '#365C84'
                    }
                }
            }
        }))

        // {
        //     data: chartStr.length ? chartStr.series[0].data : [],
        //     type: 'line',
        //     smooth: false,

        //     // markLine: {
        //     //     symbol: ['none', 'none'],
        //     //     label: { show: false },
        //     //     data: [{ xAxis: chartStr ? chartStr.series[0].markLine.data.xAxis : '' }]
        //     // }
        // }
    };
    return option;
}

const getOptionList = (data) => {
    let chartStr = (`series` in data) ? data : {
        xAxis: {data: []},
        series: [{data: [], markLine: {data: [{xAxis: ''}]}}]
    };
    //let idx = (chartStr.xAxis.data).indexOf(chartStr.series[0].markLine.data.xAxis);
    const option = {
        xAxis: {
            show: false,
            type: 'category',
        },
        yAxis: {
            show: true,
            type: 'value',
            showGrid: false,
            splitLine: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            fontSize: 10,
            axisLabel: {
                formatter: function (value) {
                    return shortInt(value)
                }
            }
        },
        grid: {
            //top: '15%',
            //bottom: '15%',
            //containLabel: true
        },
        visualMap: {
            show: false,
            dimension: 0,
        },
        series: chartStr.series.map((item, i) => ({
            data: item.data,
            name: item.name,
            type: 'line',
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: i === 0 ? '#BDBDBD' : i === 2 ? '#DA8A8A' : '#365C84',
                    lineStyle: {
                        width: i === 0 ? 1 : 2,
                        color: i === 0 ? '#BDBDBD' : i === 2 ? '#DA8A8A' : '#365C84'
                    }
                }
            }
        }))
    };
    return option;
}

function shortInt(value) {
    let n = Math.abs(value);
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}