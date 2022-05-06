import React from 'react';
import { Grid, Radio, RadioGroup, TextField, SvgIcon, FormControlLabel, Icon, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const KPIAnalysisThresholdSettings = props => {
	
	return (
			<div id="metrics-parent" style={{ overflowY: 'scroll', height: '30rem' }}>
				<RadioGroup
					className="d-flex flex-row px-1"
					aria-label="position"
					name="position"
					value={props.colorSetup}
					onChange={props.handleColorSetupChange}
				>
					<FormControlLabel
						className="mr-5"
						value="automatic"
						control={<Radio color="primary" />}
						label={
							<span>
								<h6 className="m-0">Automatic</h6>
								<em>(Recommended)</em>
							</span>
						}
					/>
					<FormControlLabel
						value="manual"
						control={<Radio color="primary" />}
						label={
							<span>
								<h6 className="m-0">Set Manually</h6>
								<em>For Advanced users</em>
							</span>
						}
					/>
				</RadioGroup>
				{props.colorSetup === 'manual' &&
					props.colorThreshold.map((row, rowIndex) => (
						<div className="ml-4 mt-4" key={rowIndex}>
							{!rowIndex > 0 ? 
								<h5 className="font-weight-bold mb-3">Default Threshold</h5>
								:
								<>
									<div className="d-flex justify-content-between align-items-center my-4 pr-5">
										<h5 className="font-weight-bold mb-0 mr-5">Exception Threshold {rowIndex}</h5>
										<Button color="primary" className="outline-none" onClick={() => props.handleRemoveThresholdClick(rowIndex)}>
											<Icon className="align-middle" title={`Delete Exception Threshold ${rowIndex}`}>delete_forever</Icon>
										</Button>
									</div>
									<div className="d-flex flex-row justify-content-start ml-4 pl-2 mb-4">
										{props.filterList
											.filter((fil) => fil.name !== '')
											.map((filterRow, filterIndex) => (
												<FormControl variant="outlined" className="mr-2" key={filterIndex}>
													<InputLabel htmlFor="outlined-age-native-simple">{filterRow.name}</InputLabel>
													<Select
														labelId="demo-simple-select-outlined-label"
														id="demo-simple-select-outlined"
														label={filterRow.name}
														style={{ width: '10rem' }}
														value={props.exceptionThresholdValue(rowIndex, filterRow.name)}
														onChange={(e) => props.handleExceptionThresholdValue(e, rowIndex, filterRow.name)}
													>
														{filterRow.values.map((val, valInd) => (
															<MenuItem key={valInd} value={valInd}>{val}</MenuItem>
														))}
													</Select>
												</FormControl>
											))}
									</div>
								</>
							}
							<Grid className="d-flex flex-wrap">
								{row.threshold.map((thres, index) => (
									<div key={index} className="d-flex align-items-center mb-4">
										<SvgIcon className="mt-4 mr-2" style={{ color: props.colorRange.filter(col => thres.label === col.label)[0].color }}>
											<path d="M6 6h12v12H6z" />
										</SvgIcon>
										<div className="mr-3">
											<h6 className="font-weight-bold">{thres.label}</h6>
											<TextField
												label=""
												id={"outlined-size-normal" + rowIndex + index}
												autoComplete="off"
												value={thres.range}
												placeholder="Insert Threshold"
												variant="outlined"
												onChange={(e) => props.handleColorThresholdChange(e, rowIndex, index)}
											/>
										</div>
									</div>
								))}
							</Grid>
						</div>
					))}
				{(props.colorSetup === 'manual' && props.filterValuesAvailable) && (
					<div className="mt-1">
						<Button color="primary" className="outline-none font-weight-bold" onClick={() => props.handleAddThresholdClick()}>
							{`+ Add Exception Threshold`}
						</Button>
					</div>
				)}
				<br />
			</div>
	);
};
export default KPIAnalysisThresholdSettings;
