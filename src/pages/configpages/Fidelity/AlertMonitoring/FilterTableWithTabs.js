import React, { Fragment } from 'react';
import { Input, Button, Dropdown, Menu, Checkbox, Card } from 'antd';
import { ExportTableButton } from "ant-table-extensions";
import Loader from "../../../../utilities/Loader";
// import DataTable from "./AntDataTable";
import FilterSidebar from './FilterSidebar';
import FilterTags from './FilterTags';
import moment from 'moment';
import FilterCard from '../../../../utilities/FilterCard/FilterCard';
import DataTable from '../../../../utilities/AntCustomTable/Table';
import weeklyCases_light from '../../../../assets/weeklyCases_light.png';
import weeklyCases_dark from '../../../../assets/weeklyCases_dark.png';
import pendingCases_dark from '../../../../assets/pendingCases_dark.png';
import pendingCases_light from '../../../../assets/pendingCases_light.png';
import highRiskCases_dark from '../../../../assets/highRiskCases_dark.png';
import highRiskCases_light from '../../../../assets/highRiskCases_light.png';
import casesInQueue_dark from '../../../../assets/casesInQueue_dark.png';
import casesInQueue_light from '../../../../assets/casesInQueue_light.png';


class FilterTableWithTabs extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            searchText: '',
            searchedColumn: '',
            checkedColumns: props.appliedFilters.checkedColumns || [],
            visibleMenuSettings: false,
            columns: props.columns,
            initialColumns: [],
            isCurrentDate: false,
            weeklyCases: props.appliedFilters.weeklyCases || [],
            isMyQueue: props.appliedFilters.isMyQueue || false,
            isPendingReview: props.appliedFilters.isPendingReview || false,
            isYesterdayDate: props.appliedFilters.isYesterdayDate || false,
            filter: props.appliedFilters.filter || {},
            filterDateRange: props.appliedFilters.filterDateRange || [],
            dateRangeValue: props.appliedFilters.dateRangeValue || [],
            isTodayDate: props.appliedFilters.isTodayDate || false,
            isHighRiskCases: props.appliedFilters.isHighRiskCases || false,
            // filterTable: null,
            filterKeyword: null,
        }
    }

    componentDidMount() {
        this.setState({
            initialColumns: this.state.columns
        }, () => {
            if (this.state.checkedColumns.length > 0) {
                this.onChange()
            }
        })

    }

    onChange = e => {
        var checkedColumns = this.state.checkedColumns;

        if (e) {
            if (e.target.checked) {
                checkedColumns = checkedColumns.filter(id => {
                    return id !== e.target.id;
                });
            } else if (!e.target.checked) {
                checkedColumns.push(e.target.id);
            }
        }
        var filtered = this.state.initialColumns;
        for (let i = 0; i < checkedColumns.length; i++)
            filtered = filtered.filter(el => {
                return el.dataIndex !== checkedColumns[i];
            });

        this.setState({ columns: filtered, checkedColumns: checkedColumns });
        this.props.setAppliedFilters({ checkedColumns: checkedColumns })
    };
    handleVisibleChange = flag => {
        this.setState({ visibleMenuSettings: flag });
    };

    handleFilter = (value, label) => {
        this.setState({
            filter: { ...this.state.filter, [label]: value }
        }, () => {
            this.props.setAppliedFilters({ filter: this.state.filter })
        })

    }
    handleSideFilters = (data, filterArray) => {
        let obj = { ...filterArray }
        obj = Object.entries(obj).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {});
        var filteredInput = (data).filter(function (i) {
            return !Object.keys(obj).some(function (prop) {
                if (obj[prop].length > 0)
                    return !obj[prop].includes(i[prop]);
                else
                    return false
            });
        });
        return filteredInput
    }
    handleDateRange = (value, dateString) => {
        this.setState({
            filterDateRange: dateString,
            dateRangeValue: value
        }, () => {
            this.props.setAppliedFilters({ filterDateRange: dateString, dateRangeValue: value })
        })
    }

    handleDateRangeFilter = (data, filterDates) => {
        if (data && filterDates && filterDates.length > 0 && filterDates[0].length > 0) {
            var startDate = new Date(filterDates[0])
            var endDate = new Date(filterDates[1])
            var filterData = data.filter(item => {
                var date = new Date(item.dateAdded)
                return date >= startDate && date <= endDate;
            });
            return filterData;
        }
        return data
    }

    /** return current date */
    currentDate = () => {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    }
    /** return yesterday date */
    yesterdayDate = () => {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0);
        return yesterday.getTime();
    }
    /** return Current week date */
    getWeekDates = () => {
        let now = new Date();
        let dayOfWeek = now.getDay(); //0-6
        let numDay = now.getDate();

        let start = new Date(now); //copy
        start.setDate(numDay - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        start = moment(start).format("MM/DD/YYYY")

        let end = new Date(now); //copy
        end.setDate(numDay + (7 - dayOfWeek));
        end.setHours(0, 0, 0, 0);
        end = moment(end).format("MM/DD/YYYY")

        return [start, end];
    }

    /** return date in UTC format */
    getUTCDate = date => {
        var date = new Date(`${date} UTC`)
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    }

    /** Filter Current Date for All Cases */
    handleDateFilter = (data, status, filterDate) => {
        if (status && data != null) {
            data = data.filter(item => {
                return this.getUTCDate(item.dateAdded) === filterDate
            })
        }
        return data

    }
    /** Filter Weekly In my queue basis of Reviewed, RiskStatus and caseowner */
    handleMyQueueFilter = (data, status) => {
        if (status && data != null) {
            data = data.filter(item => {
                return item.reviewed === "No" && item.riskStatus === "Under Review" && item.caseOwner === this.props.username
            })
            data = this.handleDateRangeFilter(data, this.getWeekDates())
        }
        return data
    }
    /** Filter Weekly Pending Review basis of  Reviewed and RiskStatus */
    handlePendingReviewFilter = (data, status) => {
        if (status && data != null) {
            data = data.filter(item => {
                return item.reviewed === "No" && item.riskStatus === "Under Review"
            })
            data = this.handleDateRangeFilter(data, this.getWeekDates())
        }
        return data
    }
    /** Filter Weekly High Risk Cases basis of RiskLevel */
    handleHighRiskCasesFilter = (data, status) => {
        if (status && data != null) {
            data = data.filter(item => {
                return item.riskLevel > 3
            })
            data = this.handleDateRangeFilter(data, this.getWeekDates())
        }
        return data
    }
    filterCurrentDate = () => {
        this.setState({
            isCurrentDate: !this.state.isCurrentDate,
        })
    }

    filterWeeklyCases = () => {
        if (this.state.weeklyCases.length > 0) {
            this.setState({
                weeklyCases: []
            }, () => {
                this.props.setAppliedFilters({ weeklyCases: [] })
            })
        } else {
            this.setState({
                weeklyCases: this.getWeekDates()
            }, () => {
                this.props.setAppliedFilters({ weeklyCases: this.getWeekDates() })
            })
        }
    }

    filterYesterdayDate = () => {
        this.setState({
            isYesterdayDate: !this.state.isYesterdayDate,
        }, () => {
            this.props.setAppliedFilters({ isYesterdayDate: this.state.isYesterdayDate })
        })
    }
    filterTodayDate = () => {
        this.setState({
            isTodayDate: !this.state.isTodayDate
        }, () => {
            this.props.setAppliedFilters({ isTodayDate: this.state.isTodayDate })
        })
    }
    filterMyQueue = () => {
        this.setState({
            isMyQueue: !this.state.isMyQueue,
        }, () => {
            this.props.setAppliedFilters({ isMyQueue: this.state.isMyQueue })
        })
    }
    filterPendingReview = () => {
        this.setState({
            isPendingReview: !this.state.isPendingReview,
        }, () => {
            this.props.setAppliedFilters({ isPendingReview: this.state.isPendingReview })
        })
    }
    filterHighRiskCases = () => {
        this.setState({
            isHighRiskCases: !this.state.isHighRiskCases,
        }, () => {
            this.props.setAppliedFilters({ isHighRiskCases: this.state.isHighRiskCases })
        })
    }
    applyFilters = (data) => {
        // data = this.handleDateFilter(data, this.state.isCurrentDate, this.currentDate())
        data = this.handleDateRangeFilter(data, this.state.weeklyCases)
        data = this.handleDateFilter(data, this.state.isYesterdayDate, this.yesterdayDate())
        data = this.handleDateFilter(data, this.state.isTodayDate, this.currentDate())
        data = this.handleMyQueueFilter(data, this.state.isMyQueue)
        data = this.handlePendingReviewFilter(data, this.state.isPendingReview)
        data = this.handleHighRiskCasesFilter(data, this.state.isHighRiskCases)
        data = this.handleSideFilters(data, this.state.filter)
        data = this.handleDateRangeFilter(data, this.state.filterDateRange)
        return data
    }

    setColumns = columns => {
        this.setState({
            columns
        })
    }

    handleTagClick = tag => {
        if (tag === "Clear All") {
            this.setState({
                filter: {},
                isTodayDate: false,
                isYesterdayDate: false,
                filterDateRange: [],
                dateRangeValue: []
            }, () => {
                this.props.setAppliedFilters({})
            })
        } else if (tag === "Today") {
            this.setState({
                isTodayDate: false
            }, () => {
                this.props.setAppliedFilters({isTodayDate: false})
            })
        }
        else if (tag === "Yesterday") {
            this.setState({
                isYesterdayDate: false
            }, () => {
                this.props.setAppliedFilters({isYesterdayDate: false})
            })
        }
        else if (tag.includes("~")) {
            this.setState({
                filterDateRange: [],
                dateRangeValue: []
            }, () => {
                this.props.setAppliedFilters({filterDateRange: [], dateRangeValue: []})
            })
        }
        else {
            let obj = { ...this.state.filter }

            for (const [key, value] of Object.entries(obj)) {
                if (value.includes(tag)) {
                    value.splice(value.indexOf(tag), 1)
                    this.setState(prevState => ({
                        filter: {
                            ...prevState.filter,
                            [key]: value
                        }

                    }))
                }
            }
        }
    }

    setFilterKeyword = value => {
        this.setState({
            filterKeyword: value
        });
    }

    globalSearch = () => {
        const filterTable = this.props.rows.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(this.state.filterKeyword.toLowerCase())
            )
        );
        // this.setState({ filterTable });
        return filterTable;
    };
    getRowData = (data = []) => {
        let rows = [];
        // if (props.isApplyFilters) {
        data = this.applyFilters(data);
        // }
        try {
            data.forEach((data, index) => {
                rows.push({ ...data, key: index });

            });
        } catch (error) {
            console.log("getRowData", error);
        }
        return rows;
    }
    render() {
        const { columns, initialColumns, checkedColumns } = this.state
        const { isShowHide } = this.props

        const menu = (
            <Menu>
                <Menu.ItemGroup title="Columns">
                    {initialColumns.map((item, i) => (
                        <Menu.Item key={i}>
                            <Checkbox
                                id={item.dataIndex}
                                onChange={this.onChange}
                                defaultChecked={checkedColumns.filter(i => i === item.dataIndex).length === 0}
                            >
                                {item.title}
                            </Checkbox>
                        </Menu.Item>
                    ))}
                </Menu.ItemGroup>
            </Menu>
        );


        // /** Count for daily cases */
        // var data = this.handleDateFilter(this.props.rows, true, this.currentDate())
        // var dailyCasesCount = 0
        // if (data !== null)
        //     dailyCasesCount = data.length

        /** Count for weekly cases */
        var data = this.handleDateRangeFilter(this.props.rows, this.getWeekDates())
        var weeklyCasesCount = 0
        if (data != null)
            weeklyCasesCount = data.length

        /** Count for cases in my queue */
        var data = this.handleMyQueueFilter(this.props.rows, true)
        var myQueueCount = 0
        if (data != null)
            myQueueCount = data.length

        /** Count for cases pending reviwed */
        var data = this.handleHighRiskCasesFilter(this.props.rows, true)
        var highRiskCount = 0
        if (data != null)
            highRiskCount = data.length

        /** Count for cases pending reviwed */
        var data = this.handlePendingReviewFilter(this.props.rows, true)
        var pendingReviewedCount = 0
        if (data != null)
            pendingReviewedCount = data.length

        return (
            <Fragment>
                {/* <div className='d-flex mb-3'>
                    <FilterCard 
                        title="Total Weekly Cases"
                        icon={this.state.weeklyCases.length > 0 ? weeklyCases_dark : weeklyCases_light}
                        className={this.state.weeklyCases.length > 0 ? "enabled" : ""}
                        applyFilter={this.filterWeeklyCases}
                        count={weeklyCasesCount}
                    />
                    <FilterCard 
                        title="Cases Pending Review"
                        icon={this.state.isPendingReview ? pendingCases_dark : pendingCases_light}
                        className={this.state.isPendingReview ? "enabled" : ""}
                        applyFilter={this.filterPendingReview}
                        count={pendingReviewedCount}
                    />
                    <FilterCard 
                        title="High Risk Cases"
                        icon={this.state.isHighRiskCases ? highRiskCases_dark : highRiskCases_light}
                        className={this.state.isHighRiskCases ? "enabled" : ""}
                        applyFilter={this.filterHighRiskCases}
                        count={highRiskCount}
                    />
                    <FilterCard 
                        title="Cases In My Queue"
                        icon={this.state.isMyQueue ? casesInQueue_dark : casesInQueue_light}
                        className={this.state.isMyQueue ? "enabled" : ""}
                        applyFilter={this.filterMyQueue}
                        count={myQueueCount}
                    />
                </div> */}
                <div className="mb-3 d-flex tiles-wrapper">
                    {/* <Card className={this.state.isCurrentDate ? "boxShadow" : ""} onClick={this.filterCurrentDate} style={{ background: "#205684" }}>
                        <div className="d-flex justify-content-center">
                            <div className="text-center">
                                <span>{dailyCasesCount}</span>
                                <p>Daily Cases</p>
                            </div>
                        </div>
                    </Card> */}
                    <Card className={this.state.weeklyCases.length > 0 ? "boxGrey" : ""} onClick={this.filterWeeklyCases} style={{ background: "#59595b", border: '2px solid rgb(32, 86, 132)' }}>
                        <div className="d-flex justify-content-center">
                            <div className="text-center">
                                <span>{weeklyCasesCount}</span>
                                <p>Total Weekly Cases</p>
                            </div>
                        </div>
                    </Card>
                    <Card className={this.state.isPendingReview ? "boxOrange" : ""} onClick={this.filterPendingReview} style={{ background: "#f18934" }}>
                        <div className="d-flex justify-content-center">
                            <div className="text-center">
                                <span>{pendingReviewedCount}</span>
                                <p>Cases Pending Review</p>
                            </div>
                        </div>
                    </Card>
                    <Card className={this.state.isHighRiskCases ? "boxLightBlue" : ""} onClick={this.filterHighRiskCases} style={{ background: "#3e89a8" }}>
                        <div className="d-flex justify-content-center">
                            <div className="text-center">
                                <span>{highRiskCount}</span>
                                <p>High Risk Cases</p>
                            </div>
                        </div>
                    </Card>
                    <Card className={this.state.isMyQueue ? "boxBlue" : ""} onClick={this.filterMyQueue} style={{ background: "#215682" }}>
                        <div className="d-flex justify-content-center">
                            <div className="text-center">
                                <span>{myQueueCount}</span>
                                <p>Cases In My Queue</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <Input.Search
                        placeholder="Search by..."
                        onSearch={this.setFilterKeyword}
                        className="global-search"
                    />
                    <div>
                        <ExportTableButton
                            dataSource={this.getRowData(this.state.filterKeyword === null ? this.props.rows : this.globalSearch())}
                            columns={this.props.columns}
                            btnProps={{ className: "mr-2 ml-2", style: { borderColor: '#205684', borderRadius: '4px' } }}
                            showColumnPicker
                        >
                            <i className="fas fa-file-export" style={{ color: '#205684' }}></i>
                        </ExportTableButton>
                        {
                            isShowHide &&
                            <Dropdown
                                overlay={menu}
                                placement="bottomCenter"
                                onVisibleChange={this.handleVisibleChange}
                                visible={this.state.visibleMenuSettings}

                            >
                                <Button className="tile-btn mr-2" style={{ borderColor: '#205684', borderRadius: '4px' }}>
                                    <i style={{ transform: ' rotate(90deg)', color: '#205684' }} className="fa fa-bars" aria-hidden="true"></i>
                                </Button>
                            </Dropdown>
                        }
                        <FilterSidebar
                            {...this.props}
                            filterData={this.state.filter}
                            handleFilter={this.handleFilter}
                            handleDateRange={this.handleDateRange}
                            filterTodayDate={this.filterTodayDate}
                            filterYesterdayDate={this.filterYesterdayDate}
                            isTodayDate={this.state.isTodayDate}
                            isYesterdayDate={this.state.isYesterdayDate}
                            filterDateRange={this.state.filterDateRange}
                            dateRangeValue={this.state.dateRangeValue}
                        />
                    </div>
                </div>

                <FilterTags
                    filter={this.state.filter}
                    handleTagClick={this.handleTagClick}
                    filterDateRange={this.state.filterDateRange}
                    isTodayDate={this.state.isTodayDate}
                    isYesterdayDate={this.state.isYesterdayDate}
                />
                {this.props.rows.length > 0 ?
                    <DataTable
                        // {...this.props}
                        columns={columns}
                        setColumns={this.setColumns}
                        rows={this.getRowData(this.state.filterKeyword === null ? this.props.rows : this.globalSearch())}
                        apiCall={this.props.getAlertData}
                        selectedPage={this.props.selectedPage}
                        selectedRowPerPage={this.props.selectedRowPerPage}
                        setSelectedPage={this.props.setSelectedPage}
                        setSelectedRowPerPage={this.props.setSelectedRowPerPage}
                        onDragEnd={true}
                        rowKey={record => record.alertID}
                    // pageSize={this.props.pageSize}
                    // currentPage={this.props.currentPage}
                    // total={this.props.total}
                    />
                    : <Loader style={{ marginLeft: "40%" }} />
                }
            </Fragment>
        )
    }
}

export default FilterTableWithTabs;