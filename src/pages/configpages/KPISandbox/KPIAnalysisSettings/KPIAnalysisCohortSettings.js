import React from 'react';
import { FormControl, InputLabel, Link, Select, MenuItem, TextField, Icon } from '@material-ui/core';
import CohortAutosuggest from './CohortAutosuggest';

const KPIAnalysisCohortSettings = (props) => (
	<>
		<div id="metrics-parent" style={{ overflowY: 'scroll', height: '12rem' }}>
			{props.cohortsList.map((cohort, i) => {
				return (
					<div className="d-flex flex-column" key={i}>
						<span className="ml-5 font-weight-bold d-flex flex-row align-items-end">
							<span>Cohort {i + 1}</span>
							{i !== 0 && (
								<Icon style={{ cursor: 'pointer' }} onClick={() => props.handleRemoveCohortClick(i)}>
									delete
								</Icon>
							)}
						</span>
						<div className="ml-5 mt-1">
							<div className="text-danger font-weight-bold" style={{ marginLeft: '6rem' }}>
								{props.cohortError[i]}
							</div>
							<FormControl
								variant="outlined"
								className={props.formControl}
								style={{ marginLeft: '3rem', marginTop: '0rem' }}
							>
								{/* <InputLabel htmlFor="outlined-age-native-simple">Choose Cohort</InputLabel> */}

								{/* <Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									label="Choose Cohort"
									value={cohort}
									onChange={(e) => props.handleCohortChange(e, i)}
								>
									{props.allFilters.length > 0 &&
										props.allFilters.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
									{availableCohortsList.length > 0 &&
										availableCohortsList.map((cohort) => (
											<MenuItem value={cohort}>{cohort}</MenuItem>
										))}
								</Select> */}
								<CohortAutosuggest
									input="muiObj"
									// label="Choose Cohort"
									required={false}
									options={[...props.availableCohortsList, 
										// ...props.allFilters.map(row=>row.filter)
									]}
									value={cohort}
									handler={(e, v, i) => props.handleCohortChange(e, v, i)}
									cohortIndex={i}
									returnId
								/>
							</FormControl>
						</div>
					</div>
				);
			})}
		</div>
		<div className="mt-1">
			<Link
				component="button"
				variant="body2"
				style={{
					marginLeft: '6rem',
				}}
				onClick={() => props.handleAddCohortClick()}
			>
				+ ADD ANOTHER COHORT
			</Link>
			<br />
		</div>
	</>
);
export default KPIAnalysisCohortSettings;
