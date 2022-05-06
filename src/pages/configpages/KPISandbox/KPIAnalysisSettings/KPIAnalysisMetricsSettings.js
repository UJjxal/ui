import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Drawer, Tree } from 'antd';
import { FormControl, FormControlLabel, InputLabel, RadioGroup, Radio, Link, Select, MenuItem, TextField, Icon } from '@material-ui/core';
import { ParameterTreeList } from '../KPINodeDrawer/KPIVisualNodeDrawer';

//1. AvailableMetricsList - All Metrics List recieved from API call
//2. MetricsList/MetricsFields (Temporary Queries between Analysis Settings and Individual Node Queries)
//3. Node 1 Queries (Use as the metrics Settings Queries - when opening in existing mode and when Saving Tree)
//4. Individual Node Queries 

const KPIAnalysisMetricsSettings = (props) => {
	const [isDrawer, setIsDrawer] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState({});
	const [inputFocus, setInputFocus] = useState(0);
	const [drawerSelected, setDrawerSelected] = useState("");

	const onSelectTableData = (selectedKeys) => {
		if (selectedKeys.length > 0) {
			let str = selectedKeys[0];
			if (/[#]+/.test(str)) {
				str = str.split('#')[0];
			}
			props.handleMetricQuery(str, inputFocus, `drawer`)
		}
	};

	// useEffect(()=>{
	// 	for(let x = 0; x < (props.metricsList).length; x++){

	// 		if(props.metricsList[x].text !== ''){
	// 		setTimeout(function(){ 
	// 			setSelectedColumn({...selectedColumn, [`queryBox${x}`]: (props.metricsList[x].text)})
	// 		}, 0); }
	// 	}
	// },[props.metricsList])

	useEffect(() => {
		for (let x = 0; x < (props.metricsList).length; x++) {
			setSelectedColumn({ ...selectedColumn, [`queryBox${x}`]: (props.metricsList[x].text) });
		}
	}, [props.metricsList]);

	
	const handleReset = (metric, listIdx) => {
		const value = props.resetMetricQuery(metric, `settings`);
		if(window.confirm("Are you sure you want to restore the original version for this metric query?")){
			props.handleMetricQuery(value, listIdx, `input`);
		}
	}

	//LC-723 Parameterized SQL Queries
	const openDrawer=(listIdx, drawerSelected)=>{
		setIsDrawer(true); 
		setInputFocus(listIdx);
		setDrawerSelected(drawerSelected);
	}

	return <>
		<div id="metrics-parent" style={{ overflowY: 'scroll', height: '36rem', boxShadow: 'inset 0px -11px 11px -10px #f1f0f0' }}>
			{props.metricsList.map((metric, listIdx) => {
				return (
					<div id="metrics-section" key={listIdx}>
						<div className="mt-2 ml-2">
							<span className="ml-5 font-weight-bold d-flex flex-row align-items-end">
								<span>Metric {listIdx + 1}</span>
								{listIdx !== 0 ? (
									<Icon style={{ cursor: 'pointer' }} onClick={() => props.handleRemoveMetricsClick(listIdx)}>
										delete
									</Icon>
								)
									: <span>-Primary Metric to be used for Calculations</span>
								}
							</span>
						</div>
						<div className="mt-3 ml-5">
							<span className="ml-5 font-weight-bold">Name</span>
							<span style={{ fontSize: '12px' }}>
								<i>(Examples: Online Sales,Recovery Rate,etc.)</i>
							</span>
						</div>
						<div className="ml-5">
							<FormControl variant="outlined" className={props.formControl}>
								<InputLabel id="demo-simple-select-outlined-label">Available Metrics</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={metric.key}
									onChange={(e) => props.handleSelectedMetricChange(e, listIdx)}
									label="Available Metrics"
								>
									{props.availableMetricsList.map((avlMetrics, i) => (
										<MenuItem key={i} value={avlMetrics.key}>{avlMetrics.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className="ml-5">
							<span className="ml-5 font-weight-bold">Metric Description</span>
						</div>
						<div className="ml-5">
							<TextField
								className={props.formControl}
								label="Description"
								multiline
								rows={4}
								variant="outlined"
								disabled={true}
								name="description"
								value={metric.description}
							/>
						</div>
						<div className="ml-5 mt1 d-flex flex-column">
							<span className="ml-5 font-weight-bold">Format</span>
							<FormControl variant="outlined" className={props.formControl}>
								<InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={metric.unit}
									disabled={true}
									label="Unit"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{props.unitList.map((unit, i) => (
										<MenuItem key={i} value={unit.value}>{unit.value}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className="ml-5">
							<span className="ml-5 font-weight-bold">Polarity</span>
							<RadioGroup
								aria-label="position"
								name="polarity"
								value={metric.polarity || ''}
								disabled={true}
								style={{ marginLeft: '3rem', lineHeight: '0rem', maxWidth: '210px' }}
							>
								<FormControlLabel
									value="Positive"
									control={<Radio color="primary" />}
									label={
										<div>
											<div>Positive</div>
											<div>
												<i>(Example: "Revenue")</i>
											</div>
										</div>
									}
								/>
								<br />
								<FormControlLabel
									value="Negative"
									control={<Radio color="primary" />}
									label={
										<div>
											<div>Negative</div>
											<div>
												<i>(Example: "Cost")</i>
											</div>
										</div>
									}
								/>
							</RadioGroup>
						</div>
						<div className="d-flex flex-row align-items-center justify-content-between" style={{ width: "31rem" }}>
							<div className="ml-5"><span className="ml-5 font-weight-bold">Expression</span></div>
							<Button color="primary" onClick={() => handleReset(metric.key, listIdx)}>RESET</Button>
							{/* <Button color="primary" onClick={() => { setIsDrawer(true); setInputFocus(listIdx) }}>SELECT COLUMN</Button> */}
						</div>
						<div className="ml-5">
							<TextField
								className={props.formControl}
								label={((''+metric.text).length > 0) ? "" : "Insert Query"}
								multiline
								rows={4}
								variant="outlined"
								autoComplete="off"
								name="text"
								value={metric.text}
								onChange={(e) => props.handleMetricQuery(e.target.value, listIdx, `input`)}
								onFocus={() => setInputFocus(listIdx)}
							/>
						</div>
						<div className="d-flex flex-row align-items-center justify-content-between" style={{ width: "25.5rem", marginLeft:"5.5rem" }}>
							<Button color="primary" onClick={() => openDrawer(listIdx, 'column') }>SELECT COLUMN</Button>
							<Button color="primary" onClick={() => openDrawer(listIdx, 'parameter')}>SELECT PARAMETER</Button>
						</div>
					</div>
				);
			})}
			<Drawer
				style={{ zIndex: "9999" }}
				//LC-723 Parameterized SQL Queries
				title={drawerSelected==="parameter"?"Available Parameters":"Available Data Tables"}
				width={320}
				onClose={() => setIsDrawer(false)}
				mask={false}
				visible={isDrawer}
			>
				{drawerSelected==="parameter"
				?<ParameterTreeList treeData=
				{props.allParametersList.map((parm) => {
					return {
					  key: "{" + parm.parameterName + "}",
					  title: parm.parameterName,
					  value: parm.parameterValue,
					};
				  })} 
				onSelectTableData={onSelectTableData}/>
				// 	<Tree
				// 	style={{ font: 'Roberto', fontWeight: 'bold' }}
				// 	onSelect={(val) => onSelectTableData(val)}
				// 	treeData={props.allParametersList}
				// />	
				:<Tree
					style={{ font: 'Roberto', fontWeight: 'bold' }}
					onSelect={(val) => onSelectTableData(val)}
					treeData={props.optionsForDataField}
				/>
				}
			</Drawer>
		</div>

		<Link
			component="button"
			variant="body2"
			style={{
				marginLeft: '6rem',
				marginTop: '1rem',
			}}
			onClick={() => props.handleAddMetricsClick()}
		>
			+ ADD NEW METRIC
		</Link>
	</>
};
export default KPIAnalysisMetricsSettings;
