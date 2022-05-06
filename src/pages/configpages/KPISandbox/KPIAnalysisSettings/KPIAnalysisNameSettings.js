import React from 'react';
import {MDBCol} from 'mdbreact';
import {FormControl, Link,  TextField, Icon }  from '@material-ui/core';

const KPIAnalysisFilterSettings = (props) => (
	<>
        <MDBCol>
						<div>
							<h6 className="mb-0 font-weight-bold">Name of Analysis</h6>
							<TextField
								id="outlined-basic"
								className={props.control}
								label="Insert Name"
								variant="outlined"
								autoComplete="off"
								value={props.analysisName}
								onChange={props.setAnalysisName}
							/>
						</div>
						<div>
							<h6 className="mb-0 font-weight-bold">Goal of Analysis</h6>
							<TextField
								id="outlined-multiline-static"
								className={props.control}
								label="Insert Goal"
								multiline
								rows={4}
								variant="outlined"
								autoComplete="off"
								value={props.analysisGoal}
								onChange={props.setAnalysisGoal}
							/>
						</div>
					</MDBCol>
					<MDBCol>
						<div className="mt-2">
							<h6 className="mb-0 font-weight-bold">Drivers of Analysis</h6>
							<div className="ml-5 mt-3" style={{ overflowY: 'scroll', height: '12rem' }}>
								{props.driverList.map((driver, i) => {
									return (
										<div className="d-flex flex-column">
											<span className="font-weight-bold d-flex flex-row align-items-end">
												<span>Driver {i + 1}</span>
												{i !== 0 && (
													<Icon
														style={{ cursor: 'pointer' }}
														onClick={() => props.handleRemoveDriverClick(i)}
													>
														delete
													</Icon>
												)}
											</span>
											<FormControl
												variant="outlined"
												className={props.formControl}
												style={{ marginTop: '0rem' }}
											>
												<TextField
													id="outlined-basic"
													className={props.control}
													label="Insert Driver"
													variant="outlined"
													autoComplete="off"
													value={driver}
													onChange={(e) => props.handleDriverChange(e, i)}
												/>
											</FormControl>
										</div>
									);
								})}
							</div>
						</div>

						<div className="mt-3" style={{ marginLeft: '2rem' }}>
							<Link component="button" variant="body2" onClick={() => props.handleAddDriverClick()}>
								+ ADD ANOTHER DRIVER
							</Link>
							<br />
						</div>
					</MDBCol>
				
    </>
);
export default KPIAnalysisFilterSettings;