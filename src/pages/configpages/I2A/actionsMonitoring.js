import React,{ useState, useEffect } from 'react';
import { Card, Icon, Button, MenuItem, InputAdornment, Select, FormControl, OutlinedInput } from "@material-ui/core";
import { Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { CONTEXT } from "../../../config";
import { ShimmerLoaderTable } from '../../../utilities/Loader';
import { listActionsMonitoring } from "../../../services/I2AService";
import moment from 'moment';

const ActionsMonitoring = () => {
    const currentYear = new Date().getFullYear();
    const [isLoading, setIsLoading] = useState(false);
    const [monitoringData, setMonitoringData] = useState({header:[], data:[], headerInfo: {}});
    const [rawData, setRawData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const fetchActionsMonitoring = () => {
        setIsLoading(true);
        const data = {currentPeriodEndDate: `${selectedYear}-12-31T00:00:00`, currentPeriodStartDate: `${selectedYear}-01-01T00:00:00`};
        
        listActionsMonitoring(data)
            .then(({ data }) => {
                if (data.code === 200) {
                    setMonitoringData({header: data.response.header, data: data.response.data, headerInfo:data.response.actionMonitoringHeaderInfo});
                    setRawData(data.response.data);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    const getOption = (chartData) => {
        let chartStr = JSON.parse(chartData);
        let idx = (chartStr.xAxis.data).indexOf(chartStr.series[0].markLine.data.xAxis)

        const option = {
            xAxis: {
              type: 'category',
              show: false,
              data: chartStr ? chartStr.xAxis.data : [],
            },
            yAxis: {
              type: 'value',
              show: false
            },
          
            visualMap: {
              show: false,
              dimension: 0,
              pieces: [
                {
                  lte: idx > 0 ? idx : 0,
                  color: 'blue'
                },
                {
                  gt: idx > 0 ? idx : 0,
                  lte: chartStr ? (chartStr.xAxis.data).length : 0,
                  color: 'green'
                }
              ]
            },
            series: [
              {
                data: chartStr ? chartStr.series[0].data : [],
                type: 'line',
                smooth: false,
                symbol:'none',
          
                markLine: {
                  symbol: ['none', 'none'],
                  label: { show: false },
                  data: [{ xAxis: chartStr ? chartStr.series[0].markLine.data.xAxis : '' }]
                }
              }
            ]
          };
        return option;
    }

    const tableHeader = (headerData) => {
		return [
                {
                    title: `Action Details`,
					dataIndex: `actionName`,
					key: `actionName`,
					render: (_, record) => {
                        let startDate = new Date(record.actionFrom);
                        let endDate = new Date(record.actionTo);
						return <>
                                <h6>{record.actionName}</h6>
                                <p>{moment(startDate).format('ll')} - {moment(endDate).format('ll')}</p>
                            </>
                },
                sorter: (a, b) => a.actionName.localeCompare(b.actionName, 'en', { sensitivity: 'base' }),
				},
                {
                    title: `Duration`,
					dataIndex: `duration`,
					key: `duration`,
                    align: `center`,
                    render: (_, record) => {
						return <>
                                {
                                record.pushedStatus === "Y" ? 
                                    <Icon className="text-primary-blue">published_with_changes</Icon> :
                                    <Icon className="text-primary-blue40">unpublished_outline</Icon>
                                }
                                <h6>{record.duration}</h6>
                            </>
                    },
                    sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),
				},
                {

                    title: `Performance`,
					dataIndex: `primaryMetricName`,
					key: `primaryMetricName`,
                    align: `center`,
                    render: (_, record) => {
                        return <>
                            <p className="text-center m-0 font-weight-normal">{`${record.primaryMetricName}(${record.primaryMetricType})`}</p>
                            <div className="d-flex justify-content-center align-items-center">
                                <p className="m-0"><b>{`${record.previousValue}${record.primaryMetricType}`}</b></p>
                                <ReactEcharts className="row m-0" style={{ height: '70px', width: '120px' }} option={getOption(record.chartData)} />
                                <p className="m-0"><b>{`${record.currentValue}${record.primaryMetricType}`}</b></p>
                            </div>
                        </>
                    }
				},
                {
                    title: `KPI Tree - Node`,
					dataIndex: `kpiTreeName`,
					key: `kpiTreeName`,
					render: (_, record) => {
						return <>
                                <h6>{record.kpiTreeName} - </h6>
                                <p>{record.nodeName}</p>
                            </>
                    },
                    sorter: (a, b) => a.kpiTreeName.localeCompare(b.kpiTreeName, 'en', { sensitivity: 'base' }),
				},
                {
                    title: `Cohort`,
					dataIndex: `cohortName`,
					key: `cohortName`,
					render: (_, record) => {
						return <>
                                <h6>{record.cohortType}</h6>
                                <p>{record.cohortName}</p>
                            </>
                    },
                    sorter: (a, b) => a.cohortName.localeCompare(b.cohortName, 'en', { sensitivity: 'base' }),
				},
                {
                    title: `No. of Accounts`,
					dataIndex: `currentNoOfAccounts`,
					key: `currentNoOfAccounts`,
                    width: `150px`,
					render: (_, record) => {
						return <>
                                <p><strong>{record.currentNoOfAccounts}</strong></p>
                            </>
                    },
                    sorter: (a, b) => a.currentNoOfAccounts - b.currentNoOfAccounts,
				},
                {
					title: "",
					dataIndex: "",
					key: "action",
                    width: `80px`,
					render: (_, record) => {
                        return <Button color="primary" className="outline-none">
                                <Icon className="align-middle" title="Create action for this Cohort">more_vert</Icon>
                            </Button>
                    }
                }
			
        ];
    };

	const searchAction = (val) => {
        setSearchText(val);
        let filtered = rawData;
        console.log('value', val);
        if(val.length > 0){
            filtered = filtered.filter(item => item.actionName.toLowerCase().includes(val.toLowerCase()));
            setMonitoringData({...monitoringData, data:filtered})
            return
		}
        setMonitoringData({...monitoringData, data:filtered})
	}

    const handleYearChange = (value) => {
        if(value==='This Year'){
            setSelectedYear(currentYear);
        }
        else{
            setSelectedYear(currentYear - 1);
        }
    }

    useEffect(() => {
        fetchActionsMonitoring();
    }, [selectedYear])


    return (
        <div className="container-fluid px-5 py-4">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="font-weight-bold mb-4">Actions Monitoring</h4>
                </div>
                <div className="col-md-6 text-md-right">
                    <FormControl className="text-left" variant="outlined" style={{ width: "15rem" }}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            style={{ minWidth: "220px", height: "2.1rem" }}
                            defaultValue={`This Year`}
                            onChange={event => handleYearChange(event.target.value)}
                        >
                            {
                                ["This Year","Previous Year"].map((item, i) => (
                                    <MenuItem key={i} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-12 d-flex px-0 mb-3">
                    <div className="col-md-3">
                        <Card className="col border py-3 shadow-sm">
                            <div className="col" style={{ color: '#090A0B' }}>
                                <div className="row  opacity-50">Total Actions</div>
                                <div className="row">
                                    <h1 className="col p-0 m-0 my-2 text-dark">{monitoringData.headerInfo?.totalAction}</h1>
                                    <span className="col text-right">
                                        <Icon className="p-0" style={{ fontSize: '70px', color: '#9BADC1' }}>tips_and_updates_black</Icon>
                                    </span>
                                </div>
                                <div className="row opacity-50">&nbsp;</div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card className="col border py-3 shadow-sm">
                            <div className="col" style={{ color: '#090A0B' }}>
                                <div className="row  opacity-50">Recommended Actions</div>
                                <div className="row">
                                    <h1 className="col p-0 m-0 my-2 text-dark">{monitoringData.headerInfo?.recommendedAction && ((monitoringData.headerInfo?.recommendedAction * 100 / monitoringData.headerInfo?.totalAction).toFixed(2))}%</h1>
                                    <span className="col text-right">
                                        <Icon className="p-0" style={{ fontSize: '70px', color: '#9BADC1' }}>published_with_changes</Icon>
                                    </span>
                                </div>
                                <div className="row  opacity-50">{monitoringData.headerInfo?.recommendedAction} Recommendations</div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card className="col border py-3 shadow-sm">
                            <div className="col" style={{ color: '#090A0B' }}>
                                <div className="row  opacity-50">Total Experiments</div>
                                <div className="row">
                                    <h1 className="col p-0 m-0 my-2 text-dark">{monitoringData.headerInfo?.totalExperiments}</h1>
                                    <span className="col text-right">
                                        <Icon className="p-0" style={{ fontSize: '70px', color: '#9BADC1' }}>science_black</Icon>
                                    </span>
                                </div>
                                <div className="row  opacity-50">From {monitoringData.headerInfo?.recommendedAction} Actions</div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-3">
                        <Card className="col border py-3 shadow-sm">
                            <div className="col" style={{ color: '#090A0B' }}>
                                <div className="row  opacity-50">Experiment Success</div>
                                <div className="row">
                                    <h1 className="col p-0 m-0 my-2 text-dark">{monitoringData.headerInfo?.successfulExperiments}</h1>
                                    <span className="col text-right">
                                        <Icon className="p-0" style={{ fontSize: '70px', color: '#9BADC1' }}>check_circle_black</Icon>
                                    </span>
                                </div>
                                <div className="row  opacity-50">{monitoringData.headerInfo?.totalExperiments} Experiments</div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="col-md-12 mb-5">
                    <div className="row justify-content-between border rounded mx-0 mb-1 py-3" style={{backgroundColor: '#F2F5F7'}}>
                        <div className="col-md-5">
                            <FormControl variant="outlined" style={{ width: "15rem" }}>
                                <OutlinedInput
                                    placeholder="Search Actions"
                                    value={searchText}
                                    onChange={(e) => searchAction(e.target.value)}
                                    className="pr-0"
                                    style={{ minWidth: "233px", height: "2.1rem" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {searchText !== '' &&
                                            <Button color="primary" className="outline-none" onClick={() => searchAction('')}>
                                                <Icon className="align-middle" title="Search Actions">close</Icon>
                                            </Button>
                                            }
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button color="primary" className="outline-none">
                                <Icon className="align-middle font-weight-bold" title="Search Actions">filter_list</Icon>
                            </Button>
                        </div>
                        <div className="col-md-5 text-md-right">
                            <FormControl className="text-left" variant="outlined" style={{ width: "15rem" }}>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    style={{ minWidth: "220px", height: "2.1rem" }}
                                    defaultValue={`Sort By`}
                                    //onChange={event => func(event.target.value)}
                                >
                                    {
                                        ["Sort By"].map((item, i) => (
                                            <MenuItem key={i} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {isLoading ? <ShimmerLoaderTable /> :
                        (monitoringData.data).length > 0 ?
                            <Table
                                className="table-theme-bordered"
                                dataSource={monitoringData.data}
                                columns={tableHeader(monitoringData.header)}
                                pagination={false}
                                tableLayout={`fixed`}
                            />
                            :
                            <div className="w-100 row align-items-center justify-content-center my-5">
                                <div className="col-md-4">
                                    <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
                                </div>
                                <div className="col-md-4 text-center">
                                    <h4>No Actions!</h4>
                                    <p className="fs16">There are no actions which are currently running or completed. The performance of all the running or completed actions will automatically show-up on this view.</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ActionsMonitoring;