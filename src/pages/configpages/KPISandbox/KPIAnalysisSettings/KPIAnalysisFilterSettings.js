import React, { useEffect } from 'react';
import { FormControl, InputLabel, Link, Select, MenuItem, TextField, Icon, Input, Checkbox, ListItemText, Button, IconButton } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// const MenuProps = {
// 	PaperProps: {
// 	  style: {
// 		maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 		width: 250,
// 	  },
// 	},
//   };

const KPIAnalysisFilterSettings = (props) => {

	return (
		<>
			<div id="metrics-parent">

				{props.filterList.map((filter, i) => { console.log(props.allFilters, filter)
					//let name = (filter.name).replace(/_/g, ' ').replace((/(\b[a-z](?!\s))/g), function(x){return x.toUpperCase();});
					return (
						<div className="d-flex flex-column" key={i}>
							<span className="ml-5 mb-3 font-weight-bold">
								{ //SI-103 Provide Filter 
								
								// ?
								<Input placeholder={`Filter ${i + 1}`} value={filter.label} onChange={(e)=>props.handleFilterLabelChange(e, i)}/> 	
								// :<span>Filter {i + 1}</span>
								}
							</span>
							<div className="ml-5 mt-1">
								<div className="text-danger font-weight-bold" style={{ marginLeft: '6rem' }}>
									{props.filterError[i]}
								</div>
								{/* <TextField variant="outlined" label="Filter Name" placeholder="Filter Name" 
									className={props.formControl}
									value={filter.name}
									onChange={(e) => props.handleFilterChange(e, i)}
								/> */}
								<FormControl 							//SI-138 temporary
									variant="outlined"
									className={props.formControl}
									style={{ marginLeft: '3rem', marginTop: '0rem' }}
								>
									<InputLabel htmlFor="outlined-age-native-simple">Choose Filter</InputLabel>
									<Select
										className={'text-capitalize'}
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										label="Choose Filter"
										value={filter.name}
										onChange={(e) => props.handleFilterChange(e, i)}
									>
										<MenuItem value="">Choose Filter</MenuItem>
										{ props.allFilters.map((val) => <MenuItem key={val.filter} value={val.filter}>{val.filter}</MenuItem>) }
									</Select>
								</FormControl>

								<div className="mx-2 d-none align-top" style={{minWidth: "25rem"}}>
									{/* <Autocomplete
										variant="outlined" className={'text-capitalize'}
										multiple
										options={filter.name !== "" ? props.allFilters.filter(row => row.filter.toLowerCase() === filter.name..toLowerCase())[0].values : []}
										getOptionLabel={(option) => option}
										renderOption={(option) => option}
										filterSelectedOptions
										renderInput={(params) => (
											<TextField variant="outlined" label="Filter Values" placeholder="Filter Values"
												{...params}
											/>
										)}
										value={filter.name !== "" && filter.values}
										onChange={(event, newValue) => props.setFilterValue(newValue, i)}
									/> */}
								</div>
								{i !== 0 && (
									<IconButton aria-label="delete" title="Delete" className="align-text-top mt-2"
										onClick={() => {
											window.confirm("Are you sure, want to delete?") && props.handleRemoveFilterClick(i)
										}}>
										<Icon>delete</Icon>
									</IconButton>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="mt-1">
				{
				(props.filterList.length < 3) &&
					<Link component="button" variant="body2" className="pl-5 ml-5"
						onClick={() => props.handleAddFilterClick()}>
						+ ADD ANOTHER FILTER
					</Link>
				}
			</div>
		</>
	);
}
export default KPIAnalysisFilterSettings;
