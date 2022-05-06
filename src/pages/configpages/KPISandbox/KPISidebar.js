import React, { Component } from 'react';
import { AppContext } from '../../../AppProvider';

import TableData from '../../../utilities/Table';
import 'antd/dist/antd.css';
import {
	MDBIcon,
	MDBCard,
	MDBBtn,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBContainer,
	MDBTable,
	MDBTableBody,
	MDBTableHead,
} from 'mdbreact';
import Icon from '@material-ui/core/Icon';
import { Layout } from 'antd';
import Loader from '../../../utilities/Loader';
import EChart from '../../../utilities/EChart';
import BubbleEChart from '../../../utilities/BubbleEChart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
const { Sider } = Layout;

let donutIconDark = require('../../../assets/donut_large.svg');
let donutIconLight = require('../../../assets/donut_large-white.svg');
let trendingUpDark = require('../../../assets/trending_up-black.svg');
let trendingUpLight = require('../../../assets/trending_up-white.svg');

class KPISidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nodeId: null,
		};
	}

	tableHeader = () => {
		
		return [
			{
				label: 'Segments',
				field: 'segments',
				minimal: 'sm',
			},
			// {
			// 	label: 'Status',
			// 	field: 'status',
			// },
		];
	};

	tableFields = () => {
		
		let tele_table = [];
		this.props.cohort.cohortRecords.forEach((rec, index) => {
			if (index < 5) {
				tele_table.push({
					Segments: rec.segments,
					// Status: <MDBIcon icon="circle" className={this.setStatusColor(rec.status)} />,
				});
			}
		});
		return tele_table;
	};

	setStatusColor = (val) => {
		switch (val) {
			case 'G':
				return 'green-text';

			case 'A':
				return 'amber-text';

			case 'R':
				return 'red-text';

			default:
				return 'grey-text';
		}
	};

	
	// 	return [
	// 		{
	// 			title: 'Segments',
	// 			dataIndex: 'segments',
	// 			key: 'segments',
	// 			render: (txt) => {
	// 				return {
	// 					children: (
	// 						<span
	// 							style={{
	// 								whiteSpace: 'nowrap',
	// 								overflow: 'hidden',
	// 								textOverflow: 'ellipsis',
	// 								width: '10rem',
	// 							}}
	// 						>
	// 							{txt}
	// 						</span>
	// 					),
	// 				};
	// 			},
	// 		},
	// 		{
	// 			title: 'Status',
	// 			dataIndex: 'status',
	// 			key: 'status',
	// 			render: (txt) => {
	// 				let icon = 'fa fa-circle';
	// 				let fontColor = 'grey-text';
	// 				switch (txt) {
	// 					case 'G':
	// 						fontColor = 'green-text';
	// 						break;
	// 					case 'A':
	// 						fontColor = 'amber-text';
	// 						break;
	// 					case 'R':
	// 						fontColor = 'red-text';
	// 						break;

	// 					default:
	// 						break;
	// 				}
	// 				return {
	// 					children: (
	// 						<span className={fontColor}>
	// 							<i className={icon} aria-hidden="true"></i>
	// 						</span>
	// 					),
	// 				};
	// 			},
	// 		},
	// 	];
	// };

	render() {
		return (
			<AppContext.Consumer>
				{({ theme, currentTheme, domain }) => {
					let { polarity, unit } = this.props;
					return (
						<Layout
							style={{
								height: '100%',
								background: theme.color3,
								borderRight: '1px solid',
								borderRightColor: theme.color5,
								fontFamily: theme.font,
								fontSize: theme.size,
							}}
						>
							<Sider
								collapsible
								collapsed={this.props.collapsed}
								width={300}
								style={{
									background: theme.color3,
									marginBottom: '1.1rem',
								}}
								collapsedWidth={50}
								trigger={null}
							>
								<div
									onClick={() => this.props.drawerCollapsed()}
									className="ant-layout-sider-zero-width-trigger 
								     ant-layout-sider-zero-width-trigger-left 
								     d-flex justify-content-between align-items-center"
									style={{
										background: 'transparent',
										color: '#ffffff',
										top: '.01rem',
										left: this.props.collapsed ? '-15px' : '-15px',
										width: this.props.collapsed ? '20px' : '250px',
										cursor: 'pointer',
									}}
								>
									<MDBIcon
										style={{ color: '#2a9fd8', fontSize: '2rem' }}
										icon={this.props.collapsed ? 'chevron-circle-left' : 'chevron-circle-right'}
									/>
								</div>

								<MDBContainer
									style={{
										visibility:
											this.props.treeRendered && !this.props.collapsed ? 'visible' : 'hidden',
									}}
									className="h-100 d-flex flex-column justify-content-around"
								>
									<div>
										<h5 className="mt-2 text-center" style={{color:theme.color6}}>Root Cause Analysis</h5>
										<MDBCard className="mt-3" style={{ borderRadius: '5px' }}>
										{this.props.treeInfo ? ( //side-node-title is defined in TreeChart.css
											<>
												<div
													className="side-node-title mt-2 ml-2"
													style={{ fontWeight: 'bold' }}
												>
													{this.props.treeInfo.name}
												</div>
												<div className="pl-2">
													{Object.entries(this.props.treeInfo.attributes).map(function (key) {
														if (key[0] != 'node_status') {
															return (
																<div key={key} className="d-flex flex-row align-items-center">
																	<span className="side-node-attr-1">
																		{polarity ? polarity[key[0]] : null}
																	</span>
																	<span className="side-node-attr-1 mr-1">
																		{key[1]}
																	</span>
																	<span className="side-node-attr-1 mr-2">
																		{unit ? unit[key[0]] : null}
																	</span>
																	<span className="side-node-attr-2">{key[0]}</span>
																</div>
															);
														}
													})}
												</div>

												<div
													className="node-status"
													style={this.props.selectedNodeStatus}
												></div>
											</>
										) : null}
									</MDBCard>
									</div>
									<div>
										<div className="d-flex flex-row align-items-center justify-content-between mt-3">
										<div className="d-flex flex-row align-items-center">
											<Icon style={{ color: theme.color6 }}>donut_large</Icon>
											<h6 className="m-0 ml-2" style={{ color: theme.color6 }}>
												Contributing Cohorts
											</h6>
										</div>
										<MDBBtn
											size="sm"
											color="primary"
											style={{ padding: '0.2rem' }}
											onClick={() => this.props.setCurrentSelected('cohort')}
										>
											Explore
										</MDBBtn>
									</div>
										<MDBCard
										className="pd-2 cohort-tbl-small"
										style={{
											height: '10rem',
											overflowY: 'scroll',
											visibility:
												this.props.treeRendered && !this.props.collapsed ? 'visible' : 'hidden',
										}}
									>
										{this.props.cohortLoading ? (
											<Loader style={{ alignSelf: 'center' }} />
										) : this.props.cohort.cohortRecords.length > 0 ? (
											<>
												{this.props.cohort.selected !== '' ? (
													<FormControl variant="outlined">
														<Select
															className="mt-1 side-select"
															style={{ height: '1.5rem'}}
															value={this.props.cohort.selected}
															name="cohortFilter"
															onChange={this.props.changeCohortSegment}
														>
															{this.props.entities
																? this.props.entities.map((val) => {
																		return <MenuItem key={val} value={val}>{val}</MenuItem>;
																  })
																: null}
														</Select>
													</FormControl>
												) : null}
												{/* {
												this.props.cohort.selected !== '' ? (
													<TableData
														cardStyle={{ padding: 5 }}
														column={this.tableHeader()}
														dataSource={this.props.cohort.cohortRecords}
													/>
												) : 
												
												( */}
													<MDBTable
														id="side-table"
														className="shadow-sm text-left"
														small
														striped
														bordered
														responsiveSm
													>
														<MDBTableHead columns={this.tableHeader()} />
														<MDBTableBody rows={this.tableFields()} />
													</MDBTable>
												{/* )
												} */}
											</>
										) : (<div className="text-center">No Cohort Data</div>)}
									</MDBCard>
									</div>
									<div>
										<div className="d-flex flex-row align-items-center justify-content-between mt-3">
										<div className="d-flex flex-row align-items-center">
											<Icon style={{ color: theme.color6 }}>trending_up</Icon>
											<h6
												className="m-0 ml-2"
												style={{
													color: theme.color6,
												}}
											>
												{domain === 5 ? (
													<span>Points of Interest</span>
												) : (
													<span>Anomalies</span>
												)}
											</h6>
										</div>
										<MDBBtn
											size="sm"
											color="primary"
											style={{ padding: '0.2rem' }}
											onClick={() => this.props.setCurrentSelected('anamolies')}
										>
											Explore
										</MDBBtn>
									</div>
										<MDBCard className="" style={{ height: '10rem' }}>
										{this.props.anamoliesLoading ? (
											<Loader style={{ alignSelf: 'center' }} />
										) : this.props.anamolies ? (
											<div style={{ height: '100%' }}>
												{this.props.selectedFilter !== '' ? (
													<EChart
														series={this.props.anamolies.series}
														xAxis={this.props.anamolies.xAxis}
														chartType={this.props.anamolies.yAxisType}
														mini={true}
													/>
												) : (
													<BubbleEChart
														title={this.props.treeInfo.name}
														mini={true}
														data={this.props.anamolies}
													/>
												)}
											</div>
										) : <div className="text-center">No Data</div>}
									</MDBCard>
									</div>
								</MDBContainer>
							</Sider>
						</Layout>
					);
				}}
			</AppContext.Consumer>
		);
	}
}
export default KPISidebar;
