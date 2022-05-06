import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Card,
    Checkbox,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    ListItemText,
    MenuItem,
    MenuList,
    OutlinedInput,
    Select
} from '@material-ui/core';
import {DatePicker, Dropdown, Menu, Modal, Table} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {Link} from "react-router-dom";
import {ACTION_EXPERIMENTS, CONTEXT} from "../../../config";
import {ShimmerLoaderActions} from '../../../utilities/Loader';
import moment from 'moment';
import {AppContext} from "../../../AppProvider";
import {
    createAction,
    deleteAction,
    listActions,
    markAsCompleteAction,
    pushAction,
    updateAction
} from "../../../services/I2AService";
import {Paper} from "material-ui";
import {MuiThemeProvider} from "material-ui/styles";

import ExperimentsModal from "./Experiments/experimentsModal";

const filterList = [
    {
        id: 1,
        group: "Completion",
        items: [
            {
                id: 1,
                title: 'Completed',
                value: {
                    column: "actionCompletedStatus",
                    value: "Y"
                }
            },
            {
                id: 2,
                title: 'Incomplete',
                value: {
                    column: "actionCompletedStatus",
                    value: "N"
                }
            }
        ]
    },
    {
        id: 2,
        group: "Status",
        items: [
            {
                id: 1,
                title: 'Published',
                value: {
                    column: "actionPushedStatus",
                    value: "Yes"
                }
            },
            {
                id: 2,
                title: 'Unpublished',
                value: {
                    column: "actionPushedStatus",
                    value: "No"
                }
            }
        ]
    },
];

const InsightsToAction = (props) => {
    const [isNewAction, setIsNewAction] = useState(false);
    const [actionsData, setActionsData] = useState([]);
    const [mode, setMode] = useState(''); // new / edit / delete
    const [rawData, setRawData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cardView, setCardView] = useState(true);
    const [actionFormData, setActionFormData] = useState({
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
    });
    const [activeFilter, setactiveFilter] = useState([])

    const {theme} = useContext(AppContext);

    const filterMenu = (record) => {

        return (
            <MuiThemeProvider>
                <Paper>

                    {filterList.map((list, i) => (
                        <MenuList key={i}>
                            <h6 className="font-weight-bold px-3">{list.group}</h6>
                            {
                                list.items.map((item, index) =>
                                    <MenuItem key={index} onClick={() => onFilterChange(item.value)}>
                                        {
                                            activeFilter.find((emp) => emp[item.value.column] === item.value.value) &&
                                            <Icon className="text-primary-blue mr-2">check</Icon>
                                        }
                                        <ListItemText className="mr-auto">{item.title}</ListItemText>
                                    </MenuItem>
                                )
                            }
                        </MenuList>
                    ))}
                </Paper>
            </MuiThemeProvider>
        );
    }

    const fetchActions = () => {
        setIsLoading(true);
        const data = {
            "actionFilter": JSON.stringify(props.filter),
            "actionKpiTreeId": props.kpiId,
            "actionNodeId": props.nodeId
        }
        listActions(data)
            .then(({data}) => {
                if (data.code === 200) {
                    setActionsData(data.response);
                    setRawData(data.response)
                    setMode('');
                    setSearchText('');
                } else {
                    setActionsData([]);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    const searchAction = (val) => {
        setactiveFilter([]);
        setSearchText(val);
        let filtered = [...rawData];
        if (val.length > 0) {
            filtered = filtered.filter(item => item.actionName.toLowerCase().includes(val.toLowerCase()));
            setActionsData(filtered)
            return
        }
        setActionsData(filtered)
    }

    const onFilterChange = (val) => {
        searchAction('')
        let newArray = [];
        const exists = activeFilter.find((emp) => emp[val.column] === val.value);
        if (!exists) {
            newArray = [...activeFilter, {[val.column]: val.value}];
            setactiveFilter(newArray);
        } else {
            const array = [...activeFilter];
            const removeIndex = array.findIndex(item => item[val.column] === val.value);
            array.splice(removeIndex, 1);
            newArray = [...array];
            setactiveFilter(newArray);
        }

        filterAccordingtoValue(newArray);
    }

    const filterAccordingtoValue = (activeFilterArray) => {
        let filtered = [...rawData];

        let myArray = [];

        if (activeFilterArray.length > 0) {
            const filteredActive = activeFilterArray.map(item => {
                    let fArray = filtered.filter(f => f[Object.keys(item)[0]] === item[Object.keys(item)[0]]);
                    myArray = [...myArray, ...fArray];
                }
            );
            const uniqueArray = [...new Set(myArray.map(item => item))];
            setActionsData(uniqueArray)
            return
        }
        setActionsData(filtered)
    }

    const addAction = (formData) => {
        let data = {
            ...formData,
            actionAssetClass: props.selectedKPIDomain,
            actionFilter: JSON.stringify(props.filter),
            actionKpiTreeId: props.kpiId,
            actionNodeId: props.nodeId
        }

        createAction(data)
            .then(({data}) => {
                if (data.code === 201) {
                    setIsNewAction(false);
                    window.alert('Action created successfully!');
                    fetchActions();
                } else {
                    window.alert(data.message);
                }
            })
            .catch(err => console.log(err))

    }

    const handleAddAction = (val) => {
        setIsNewAction(val);
        setActionFormData({
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

        });
        setMode('add');
    }

    const editAction = (formData) => {
        let data = {
            actionName: formData.actionName,
            actionDesc: formData.actionDesc,
            actionDurationTypeCode: formData.actionDurationTypeCode,
            actionStartDate: formData.actionStartDate,
            actionEndDate: formData.actionEndDate,
            actionId: formData.actionId,
            actionRemarks: formData.actionRemarks,
        }
        updateAction(data)
            .then(({data}) => {
                if (data.code === 200) {
                    setIsNewAction(false);
                    window.alert('Action updated successfully!');
                    fetchActions();
                } else {
                    window.alert(data.message);
                }
            })
            .catch(err => console.log(err))
    }

    const handleEditAction = (key) => {
        let record = actionsData[key];
        setIsNewAction(true);
        setActionFormData({
            actionName: record.actionName,
            actionDesc: record.actionDesc,
            actionDurationTypeCode: record.actionDurationTypeCode,
            actionStartDate: record.actionStartDate,
            actionEndDate: record.actionEndDate,
            actionDirectRecommendation: record.actionDirectRecommendation,
            actionId: record.actionId,
            actionFilter: record.actionFilter,
            actionRemarks: record.actionRemarks,
            actionCohortType: record.actionCohortType,
            actionCohortName: record.actionCohortName,

        });
        setMode('edit');
    }

    const removeAction = (record) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return false;
        }

        deleteAction(record.actionId)
            .then(({data}) => {
                if (data.code === 200) {
                    window.alert('Action deleted successfully!');
                    fetchActions();
                }
            })
            .catch(err => console.log(err))
    }

    const recommendAction = (record) => {

        pushAction([{actionId: record.actionId}])
            .then(({data}) => {
                if (data.code === 200) {
                    window.alert('Action recommended successfully!');
                    fetchActions();
                }
            })
            .catch(err => console.log(err))
    }

    const completeAction = (record) => {

        markAsCompleteAction([{actionId: record.actionId}])
            .then(({data}) => {
                if (data.code === 200) {
                    window.alert('Action marked as completed!');
                    fetchActions();
                }
            })
            .catch(err => console.log(err))
    }

    const cohortPopulation = () => {
        return props.cohortData ? props.cohortData.map(item => item.noOfAccounts).reduce((a, b) => a + b) : 0;
    }

    useEffect(() => {
        fetchActions();

    }, [props.cohortData])

    return (
        <div>
            {/* Header controls */}
            <div className="row mx-0 justify-content-center pb-4 mb-2" style={{borderBottom: "1px solid #cdd6e0"}}>
                <div className="col-md-5">
                    <FormControl variant="outlined" style={{width: "15rem"}}>
                        <OutlinedInput
                            placeholder="Search Actions"
                            value={searchText}
                            onChange={(e) => searchAction(e.target.value)}
                            className="pr-0"
                            style={{minWidth: "233px", height: "2.1rem"}}
                            endAdornment={
                                <InputAdornment position="end">
                                    {searchText !== '' &&
                                        <Button color="primary" className="outline-none"
                                                onClick={() => searchAction('')}>
                                            <Icon className="align-middle" title="Search Actions">close</Icon>
                                        </Button>
                                    }
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Dropdown overlay={filterMenu()} trigger={['click']}>
                        <Button color="primary" className="outline-none" onClick={e => e.preventDefault()}>
                            <Icon className="align-middle font-weight-bold" title="Filter Actions">filter_list</Icon>
                        </Button>
                    </Dropdown>
                </div>
                <div className="col-md-5 text-md-right">
                    <Button color="primary" className="outline-none" onClick={() => setCardView(!cardView)}>
                        <Icon className="align-middle"
                              title="List">{cardView ? `format_list_bulleted` : `grid_view`}</Icon>
                    </Button>
                    <Button variant="contained" className="bg-primary-blue text-white mr-2"
                            onClick={() => handleAddAction(true)}>New Action</Button>
                    <Button color="primary" variant="outlined"><Link
                        to={CONTEXT + getUri(props.menuContent, "I2A/actionsMonitoring")}>See All
                        Actions</Link></Button>
                </div>
            </div>

            {isLoading ? <ShimmerLoaderActions/> :
                cardView ?
                    actionsData.length > 0 ?
                        <div className="row justify-content-center">
                            {actionsData.map((item, i) => (
                                <div className="m-2" key={i}>
                                    <CardAction data={item} fetchActions={fetchActions} attributes={props.attributes}
                                                unit={props.unit} cohortPopulation={cohortPopulation}/>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="w-100 row align-items-center justify-content-center my-5">
                            <div className="col-md-4">
                                <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State"/>
                            </div>
                            <div className="col-md-4 text-center">
                                <h4>No Actions Created!</h4>
                                <p className="fs16">There are no actions created yet. Actions help you track and manage
                                    strategies to improve your Key Metrics. Click the New Action button to get
                                    started.</p>
                            </div>
                        </div>
                    :
                    <TableAction actionsData={actionsData} handleEditAction={handleEditAction}
                                 removeAction={removeAction} recommendAction={recommendAction}
                                 completeAction={completeAction}/>
            }

            <NewAction
                mode={mode}
                setMode={setMode}
                isNewAction={isNewAction}
                setIsNewAction={setIsNewAction}
                cohortType={props.cohortType ? props.cohortType : []}
                cohortData={props.cohortData ? props.cohortData : []}
                handleAddAction={handleAddAction}
                addAction={addAction}
                editAction={editAction}
                formData={actionFormData}
                setFormData={setActionFormData}
            />
        </div>
    )
}

const CardAction = ({data, fetchActions, attributes, unit, cohortPopulation}) => {
    const [isVisible, setIsVisible] = useState(false); // Experiments modal
    const [mode, setMode] = useState('add'); //add | edit  - Experiments

    const [expand, setExpand] = useState(false);
    let actionCohortName = data.actionCohortName.length > 30 ? data.actionCohortName.substring(0, 30) + "..." : data.actionCohortName;
    let actionName = data.actionName.length > 45 ? data.actionName.substring(0, 45) + "..." : data.actionName;
    let actionDesc = data.actionDesc.length > 85 ? data.actionDesc.substring(0, 85) + "..." : data.actionDesc;

    const getOption = (data) => {
        let chartStr = data !== undefined ? JSON.parse(data) : {
            xAxis: {data: []},
            series: [{data: [], markLine: {data: [{xAxis: ''}]}}]
        };
        //let idx = (chartStr.xAxis.data).indexOf(chartStr.series[0].markLine.data.xAxis)
        const option = {
            tooltip: {show: true},
            legend: {
                show: true,
                bottom: 0,
                //textStyle: { overflow: 'truncate', width: 74 },
                data: chartStr.series.map((item, i) => ({name: item.name, icon: 'circle'})),
                formatter: function (name) {
                    var str = name + '';
                    if (str.length >= 10) {
                        str = str.substring(0, 10) + '...';
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
                        var n = Math.abs(value);
                        if (n < 1e3) return n;
                        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
                        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
                        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
                        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
                    }
                }
            },
            tooltip: {
                show: true,
            },
            grid: {
                left: '10%',
                top: '10%',
                bottom: '32%',
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

    return (
        <Card className={expand ? "mx-auto action-card expanded" : "border mx-auto action-card"}>
            <div className="d-flex justify-content-between align-items-top action-card-header">
                <div className="flex-grow-1">
                    <h6 className="text-nowrap text-muted font-weight-normal fs12"
                        title={data.actionCohortName}>{`${data.actionCohortType} | ${actionCohortName}`}</h6>
                    <h6 className="fs14" title={data.actionName}>{actionName}</h6>
                </div>
                <IconButton className="text-primary-blue p-0" style={{height: "28px"}}
                            onClick={() => setExpand(!expand)}>
                    <Icon className="font-weight-bold">{expand ? `unfold_less` : `unfold_more`}</Icon>
                </IconButton>
            </div>
            <div className="d-flex justify-content-between mt-2">
                <div className="d-flex flex-column justify-content-between flex-grow-1">
                    <p className="mb-0" style={{minHeight: '68px'}}>{actionDesc}</p>
                    <div className="d-flex mt-2">
                        <h6 className="text-nowrap text-muted font-weight-normal fs12 m-0">
                            {new Date(data.actionStartDate).getDate() + '/' + (new Date(data.actionStartDate).getMonth() + 1) + '/' + new Date(data.actionStartDate).getFullYear()}
                            {` - `}
                            {new Date(data.actionEndDate).getDate() + '/' + (new Date(data.actionEndDate).getMonth() + 1) + '/' + new Date(data.actionEndDate).getFullYear()}
                        </h6>
                        {startActionAlert(data.actionStartDate) && <>
                            <Icon className="font-weight-bold text-danger fs16 mx-2 mb-1"
                                  title={`Starts in ${startActionAlert(data.actionStartDate)} days`}>warning_amber</Icon>
                            <h6 className="d-none text-nowrap text-muted font-weight-normal fs12 m-0">{`Starts in ${startActionAlert(data.actionStartDate)} days`}</h6>
                        </>
                        }
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-between border-left border-right px-3 mx-3 py-2'>
                    {data.actionPushedStatus === "Yes" && !data.actionExperiments
                        ? <Icon className="text-primary-blue">published_with_changes</Icon>
                        : data.actionExperiments
                            ? <Icon className="text-primary-blue40">science</Icon>
                            : <Icon className="text-primary-blue40">unpublished_outline</Icon>

                    }
                    {data.actionType === "USER" ?
                        <div className="rounded-circle bg-primary-blue40 text-center"
                             style={{width: "24px", height: "24px"}}>
                            <span className="small align-bottom text-uppercase text-white"
                                  title={data.actionCreatedBy.split(".").join(" ")}>{data.actionCreatedBy.split(".").map((n) => n[0]).join("")}</span>
                        </div> :
                        <Icon className="text-muted">precision_manufacturing</Icon>
                    }
                </div>
                <div className="text-center mr-3">
                    {data.actionExperiments && JSON.parse(data.actionExperiments).length
                        ?
                        <div className='d-flex flex-column justify-content-between align-items-center'>
                            <h6 className="fs12 mb-0">Experiment - <span
                                className="text-primary-blue text-capitalize">{JSON.parse(data.actionExperiments)[0].expStatus.toLowerCase()}</span>
                            </h6>
                            <div className="d-flex flex-column align-items-center w-100 mb-2">
                                <small className="text-nowrap text-muted mb-1">{data.expDurationDays}</small>
                                <LinearProgress variant="determinate" className="flex-grow-1 w-75 rounded"
                                                value={data.expCompletedPercentage * 10}/>
                            </div>
                            <h6 className="text-nowrap text-muted font-weight-normal fs12 m-0">
                                {new Date(JSON.parse(data.actionExperiments)[0].expStartDate).getDate() + '/' + (new Date(JSON.parse(data.actionExperiments)[0].expStartDate).getMonth() + 1) + '/' + new Date(JSON.parse(data.actionExperiments)[0].expStartDate).getFullYear()}
                                {` - `}
                                {new Date(JSON.parse(data.actionExperiments)[0].expEndDate).getDate() + '/' + (new Date(JSON.parse(data.actionExperiments)[0].expEndDate).getMonth() + 1) + '/' + new Date(JSON.parse(data.actionExperiments)[0].expEndDate).getFullYear()}
                            </h6>
                        </div>
                        :
                        <>
                            <h6 className="fs12">{data.primaryMetric}</h6>
                            <div className="d-flex justify-content-center align-items-center mb-1">
                                <Icon
                                    className={`text-primary-blue font-weight-bold ${(data.vsBAU < 0) ? 'fa-rotate-90' : (data.vsBAU > 0) ? 'fa-rotate-270' : 'd-none'}`}>arrow_right_alt</Icon>
                                {data.actionPushedStatus === "Yes" ?
                                    <h4 className="mb-0">{data.vsBAU}%</h4> :
                                    <h4 className="mb-0">{`-`}</h4>
                                }
                            </div>
                            <h6 className="text-muted text-nowrap small mb-0">{data.compareAgainst}</h6>
                        </>
                    }
                </div>
            </div>
            <div className={`${!expand && "d-none"} border-top mt-3`}>
                {ACTION_EXPERIMENTS ? (<>
                        {data.actionExperiments && JSON.parse(data.actionExperiments).length ?
                            JSON.parse(data.actionExperiments).map((item, idx) => {
                                let best = JSON.parse(item.variants).filter(v => v.variantBestValue === v.variantMetricValue);

                                return <div key={idx} className="mt-2">
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                        <h6 className="fs14 mb-0">{item.expType} Experiment - <span
                                            className="text-primary-blue text-capitalize">{(item.expStatus).toLowerCase()}</span>
                                        </h6>
                                        <h6 className="text-nowrap text-muted font-weight-normal fs11 mb-0">
                                            {(best && data.expStatus === 'IN-PROGRESS')
                                                ? `${best[0].variantName} is leading`
                                                : (best && data.expStatus === 'CONCLUDED')
                                                    ? `${best[0].variantName} is winner`
                                                    : `${JSON.parse(item.variants).length} Variants Created`}
                                        </h6>
                                    </div>
                                    {data.expStatus !== 'IN-PROGRESS' && data.expStatus !== 'CONCLUDED' ?
                                        JSON.parse(item.variants).slice(0, 2).map((subItem, i) => {
                                            return <div key={i}
                                                        className="d-flex justify-content-between align-items-center border-bottom py-1">
                                                <div className="flex-grow-1">
                                                    <h6 className="fs14 mb-1">{subItem.variantType}</h6>
                                                    <h6 className="text-nowrap text-muted font-weight-normal fs12 mb-0">{subItem.variantName}</h6>
                                                </div>
                                                <Icon className="text-primary-blue mr-3">groups</Icon>
                                                <div
                                                    className='d-flex flex-column justify-content-between align-items-center'>
                                                    <h4 className="font-weight-bold mb-0">{Math.round(subItem.variantSplit) + `%`}</h4>
                                                    <p className="mb-0 text-muted font-weight-normal fs12">{`of ${subItem.expCohortPopulation}`}</p>
                                                </div>
                                            </div>
                                        })
                                        :
                                        best.length
                                            ? data.expStatus === 'CONCLUDED' ?
                                                <div
                                                    className="d-flex justify-content-between align-items-center border-bottom py-1 px-2"
                                                    style={{margin: '5px -10px', background: '#d4ebf8'}}>
                                                    <div><Icon className="text-primary-blue mr-1">check_circle_outline</Icon>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs14 mb-1">{best[0].variantType}</h6>
                                                        <h6 className="text-nowrap text-muted font-weight-normal fs12 mb-0">{best[0].variantName}</h6>
                                                    </div>
                                                    {/* <div className='d-flex flex-column justify-content-between align-items-center'>
                                            <h4 className="font-weight-bold mb-0">{Math.round(best[0].variantSplit) + `%`}</h4>
                                            <p className="mb-0 text-muted font-weight-normal fs12">{`of ${best[0].expCohortPopulation}`}</p>
                                        </div> */}
                                                    <div
                                                        className='d-flex flex-column justify-content-between align-items-center'>
                                                        <h6 className="fs12 mb-0">{best[0].variantMetricName}</h6>
                                                        <h4 className="mb-0">{Math.round(best[0].variantMetricValue) + best[0].variantMetricUnit}</h4>
                                                        {best[0].variantVsText !== "" &&
                                                            <p className="mb-0 text-muted font-weight-normal fs12">
                                                                {<Icon
                                                                    className={`align-middle text-primary-blue font-weight-bold ${(best[0].variantVsValue < 0) ? 'fa-rotate-90' : (best[0].variantVsValue > 0) ? 'fa-rotate-270' : 'd-none'}`}>arrow_right_alt</Icon>}
                                                                <span
                                                                    className="text-dark fs14">{Math.abs(best[0].variantVsValue) + best[0].variantMetricUnit} </span>
                                                                {best[0].variantVsText}
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                                : <ReactEcharts className="w-100 m-0" style={{height: "150px"}}
                                                                option={getOption(best[0].variantChartData)}/>
                                            : <div className="row m-0 mt-3 justify-content-around w-100">
                                                <div className="col-12 p-0 text-center">
                                                    <div className="span font-weight-bold">{`No winning variants`}</div>
                                                    <div className="span small mb-2">None of the test variants is currently
                                                        significant.
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                    <div className="text-center mt-2">
                                        <Button size="small" variant="outlined"
                                                className="text-primary-blue border-dark px-3 py-1"
                                                onClick={() => {
                                                    setIsVisible(!isVisible);
                                                    setMode('edit');
                                                }}>
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            })
                            : data.actionStatus !== 'NEW' ?
                                <div className="row m-0 mt-3 justify-content-around w-100">
                                    <div className="col-12 p-0 text-center">
                                        <div className="span font-weight-bold">{`Action: ${data.actionStatus}`}</div>
                                        <div className="span small mb-2">This action was completed without experiment.</div>
                                    </div>
                                </div>
                                :
                                <div className="row m-0 mt-3 justify-content-around w-100">
                                    <div className="col-3 p-0">
                                        <img className="w-100" src={`${CONTEXT}/empty-state.svg`} alt="Empty State"/>
                                    </div>
                                    <div className="col-8 p-0 text-center">
                                        <div className="span font-weight-bold">No Experiments Running</div>
                                        <div className="span small mb-2">Experiments allow you to test the effectiveness of
                                            an action or variants of an action on a subset a cohort.
                                        </div>
                                        <Button size="small" className="bg-primary-blue text-white px-3 py-1"
                                                onClick={() => setIsVisible(!isVisible)}>
                                            <Icon className="text-white fs14 mr-2">science</Icon> New Experiment
                                        </Button>
                                    </div>
                                </div>
                        }
                        <ExperimentsModal
                            isVisible={isVisible}
                            mode={mode}
                            expStatus={data.expStatus}
                            setIsVisible={setIsVisible}
                            expKpiTreeId={data.actionKpiTreeId}
                            expActionId={data.actionId}
                            expName={actionName}
                            expDesc={actionDesc}
                            cohortData={`${data.actionCohortType} | ${actionCohortName}`}
                            cohortPopulation={cohortPopulation()}
                            attributes={attributes}
                            attributesUnit={unit}
                            actionCreatedBy={data.actionCreatedBy}
                            actionStartDate={data.actionStartDate}
                            actionEndDate={data.actionEndDate}
                            chartData={getOption()}
                            fetchActions={fetchActions}
                        />
                    </>)
                    :
                    <ReactEcharts className="w-100 m-0" style={{height: "150px"}} option={getOption()}/>
                }
            </div>
        </Card>
    )
}

const TableAction = ({actionsData, handleEditAction, removeAction, recommendAction, completeAction}) => {
    const contextMenu = (record) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <Button fullWidth color="primary" className="outline-none"
                            onClick={() => handleEditAction(record.key)}>Edit</Button>
                </Menu.Item>
                <Menu.Item key="1">
                    <Button fullWidth color="primary" className="outline-none" onClick={() => removeAction(record)}>
                        {record.actionStatus === "NEW" ? 'Cancel' : record.actionStatus === "ACTIVE" ? 'Abort' : 'Delete'}
                    </Button>
                </Menu.Item>
                {record.actionStatus === "NEW" &&
                    <Menu.Item key="2">
                        <Button fullWidth color="primary" className="outline-none"
                                onClick={() => recommendAction(record)}>Recommend</Button>
                    </Menu.Item>
                }
                {record.actionStatus === "ACTIVE" &&
                    <Menu.Item key="3">
                        <Button fullWidth color="primary" className="outline-none"
                                onClick={() => completeAction(record)}>Mark as Completed</Button>
                    </Menu.Item>
                }
            </Menu>
        );
    }
    const columns = [
        {
            title: 'Action Name',
            dataIndex: 'name',
            key: '0',
            sorter: (a, b) => a.name.localeCompare(b.name, 'en', {sensitivity: 'base'}),
        },
        {
            title: 'Start Date',
            dataIndex: 'actionStartDate',
            key: 'actionStartDate',
            render: (_, record) => {
                let dt = new Date(record.actionStartDate);
                return moment(dt).format('L');
            },
            sorter: (a, b) => new Date(a.actionStartDate) - new Date(b.actionStartDate)
        },
        {
            title: 'End Date',
            dataIndex: 'actionEndDate',
            key: 'actionEndDate',
            render: (_, record) => {
                let dt = new Date(record.actionEndDate);
                return moment(dt).format('L');
            },
            sorter: (a, b) => new Date(a.actionEndDate) - new Date(b.actionEndDate),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: '6',
            sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),

        },
        {
            title: 'Metric',
            dataIndex: 'metric',
            key: '12',
            sorter: (a, b) => a.metric.localeCompare(b.metric, 'en', {sensitivity: 'base'}),
        },
        {
            title: 'Cohort Type',
            dataIndex: 'cohortType',
            key: '1',
            sorter: (a, b) => a.cohortType.localeCompare(b.cohortType, 'en', {sensitivity: 'base'}),
        },
        {
            title: 'Cohort Name',
            dataIndex: 'cohort',
            key: '2',
            width: `200px`,
        },
        {
            title: 'Recommended',
            dataIndex: 'pushedStatus',
            key: '3',
        },
        {
            title: 'Status',
            dataIndex: 'actionStatus',
            key: '4',
            sorter: (a, b) => a.actionStatus.localeCompare(b.actionStatus, 'en', {sensitivity: 'base'}),
        },
        {
            title: 'BAU Avg.→Action Avg.',
            dataIndex: 'prePostAvg',
            key: '5',
        },
        {
            title: 'Impact',
            dataIndex: 'impact',
            key: '6',
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            align: "center",
            render: (_, record) => {
                let elem = <span className="d-block text-muted"><Icon className="align-middle"
                                                                      title="Action">more_vert</Icon></span>;
                if (record.actionStatus === "ACTIVE" || record.actionStatus === "NEW") {
                    elem = <Dropdown overlay={contextMenu(record)} trigger={['click']}
                                     getPopupContainer={() => document.querySelector('.ant-table-row')}>
                        <Button color="primary" disabled={true} className="outline-none"
                                onClick={e => e.preventDefault()}>
                            <Icon className="align-middle" title="Action">more_vert</Icon>
                        </Button>
                    </Dropdown>
                }

                return elem;
            },
        }

    ]
    const dataSource = () => {
        let data = [];
        for (let x = 0; x < actionsData.length; x++) {
            data.push(
                {
                    key: x,
                    name: actionsData[x].actionName,
                    cohortType: actionsData[x].actionCohortType,
                    cohort: actionsData[x].actionCohortName,
                    pushedStatus: actionsData[x].actionPushedStatus,
                    actionStatus: actionsData[x].actionStatus,
                    prePostAvg: actionsData[x].prePostAvg,
                    impact: actionsData[x].impact,
                    duration: actionsData[x].actionDurationTypeCode,
                    actionId: actionsData[x].actionId,
                    actionFilter: actionsData[x].actionFilter,
                    actionStartDate: actionsData[x].actionStartDate,
                    actionEndDate: actionsData[x].actionEndDate,
                    actionDirectRecommendation: actionsData[x].actionDirectRecommendation,
                    metric: actionsData[x].primaryMetric
                }
            )
        }
        return data;
    }

    return actionsData.length > 0 ?
        <Table className="table-theme-bordered mt-4" dataSource={dataSource()} columns={columns} pagination={false}/> :
        <div className="text-center mt-5"><img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State"/>
        </div>
}

const NewAction = (props) => {
    const {formData, setFormData, mode, setMode} = props;

    const handleOk = () => {
        if (mode === 'edit') {
            if (formData.actionName === '' || formData.actionStartDate === '' || formData.actionEndDate === '') {
                window.alert('Fields required!');
                return false;
            }
            props.editAction(formData)
        } else {
            if (formData.actionCohortName === '' || formData.actionCohortType === '' || formData.actionName === '' || formData.actionStartDate === '' || formData.actionEndDate === '') {
                window.alert('Fields required!');
                return false;
            }
            props.addAction(formData)
        }
        // props.setIsNewAction(false);
    };


    return (
        <Modal className="action-modal" title="Create New Action" visible={props.isNewAction} onOk={handleOk}
               onCancel={() => props.handleAddAction(false)}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Select Cohort Type</InputLabel>
                        <Select
                            disabled={mode === 'edit' ? true : false}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={formData.actionCohortType}
                            onChange={event => setFormData({...formData, actionCohortType: event.target.value})}
                            label="Select Cohort Type" placeholder="Select Cohort Type"
                        >
                            {
                                props.cohortType.map((item, i) => (
                                    <MenuItem key={i} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-6 mb-3">
                    <FormControl variant="filled" className="w-100">
                        <InputLabel id="demo-simple-select-filled-label">Select Cohort</InputLabel>
                        <Select
                            disabled={mode === 'edit' ? true : false}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={formData.actionCohortName}
                            onChange={event => setFormData({...formData, actionCohortName: event.target.value})}
                            label="Select Cohort" placeholder="Select Cohort"
                        >
                            {
                                props.cohortData.filter(el => el.entity === formData.actionCohortType).map((item, i) => (
                                    <MenuItem key={i} value={item.segments}>{item.segments}</MenuItem>
                                ))
                            }
                        </Select>
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
                            labelWidth={100}
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
                            labelWidth={100}
                        />
                    </FormControl>
                </div>
                <div className="col-md-12 mb-3">
                    <DatePicker.RangePicker size="large" className="w-100 bg-light"
                                            style={{borderBottom: "1px solid #888"}}
                                            disabledDate={disabledDate}
                                            value={
                                                formData.actionStartDate && formData.actionEndDate ?
                                                    [moment(formData.actionStartDate), moment(formData.actionEndDate)] :
                                                    null
                                            }
                                            onChange={date => date ? setFormData({
                                                ...formData,
                                                actionStartDate: date[0]._d.toISOString(),
                                                actionEndDate: date[1]._d.toISOString()
                                            }) : setFormData({...formData, actionStartDate: '', actionEndDate: ''})}
                    />
                </div>
                {mode !== 'edit' &&
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
                }
            </div>
        </Modal>
    )
}

function disabledDate(current) {
    // Can not select days before today
    return current < moment().subtract(0, 'day');
}

function startActionAlert(startDate) {
    let dt = new Date(startDate);
    if (moment(dt).isValid()) {
        let diff = moment(dt).diff(moment(), 'days');
        if (diff > 0 && diff < 4) {
            return diff;
        }
    }
    return false;
}

function getUri(menuContent, internalLink) {
    let uri = menuContent.filter(item => item.children.some(submenu => submenu.internalLink === internalLink));
    //Check length and only then pass links as it is breaking for /demo-bk - Sanjit 
    if (uri.length > 0) {
        return uri[0].children[0].link;
    } else {
        return "#";
    }
}

export default InsightsToAction;