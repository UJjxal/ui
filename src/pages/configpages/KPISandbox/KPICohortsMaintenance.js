import React, { useState, useEffect } from 'react';
import { Button, Icon, IconButton, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Table } from "antd";

import { CONTEXT } from "../../../config";
import Loader from '../../../utilities/Loader';

import uuid from 'react-uuid';
import kpiService from '../../../services/kpiService';


const KPICohortsMaintenance = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isAlert, setAlert] = useState({status: false, message: ''});
	const [selected, setSelected] = useState(null);
	const [create, setCreate] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const [availableCohortsList, setAvailableCohortsList] = useState([]);
	const [rawData, setRawData] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		retrieveCohortsList();
	}, []);

	const searchCohorts = (val) => {
        setSearchText(val);
        let filtered = rawData;
        if(val.length > 0){
            filtered = filtered.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
            setAvailableCohortsList(filtered)
            return
		}
        setAvailableCohortsList(filtered)
	}

	const retrieveCohortsList = () => {
		setIsLoading(true);
		kpiService.getAllCohorts()
		.then(({ data }) => {
			if (data.code === 200) {
				let selectedCohorts = [];
				data.response.forEach((cohort) => {
					selectedCohorts.push({
						key: cohort.cohortId,
						description: cohort.cohortDescription,
						name: cohort.cohortName,
						type: cohort.cohortType,
						features: (cohort.cohortFeature).length > 0 ? JSON.parse(cohort.cohortFeature) : []
					})
				});

				setAvailableCohortsList([...selectedCohorts]);
				setRawData([...selectedCohorts]);
				setSelected(null);
				setCreate(false);
				setIsLoading(false);

			}
			setIsLoading(false);
		})
		.catch(error => {setIsLoading(false); console.error(error);})
	}

	const deleteCohorts = (selectedRows) => {
		if (!window.confirm("Are you sure you want to disable this cohorts?")) {
			return false;
		}

		let cohortsList = [];
		if (selectedRows.length) {
			selectedRows.map(cohortId => cohortsList.push({ cohortId }));
		}

		kpiService.deleteCohorts(cohortsList)
			.then(({ data }) => {
				if (data.code === 200) {
					setAlert({status:true, message: 'Cohorts disabled successfully!'});
					setSelectedRowKeys([]);
					retrieveCohortsList();
				}
			})
			.catch(error => console.error(error.message))
	};

	
	//~_~//
	const toggleCreate = (val) => {
		setCreate(val);
		setSelected(null);
	};

	const updateSelected = (paramData) => {
		if (create) { return; }
		setSelected(paramData);
	};

	const onSelectChange = (selectedRowKeys) => {
		setSelectedRowKeys(selectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const columns = [
		{
			title: "Cohort Name",
			dataIndex: "name",
			key: "_name",
			width: 160
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "_description",
			render: (_, record) => {return <p style={{maxWidth: "230px"}}>{record.description}</p>}
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "_type",
			//width: 210,
			// render: (_, record) => {return <span><b>{record.type}</b><br/><small>{record.features}</small></span>}
		},
	];

	const dataSource = () => {
		let data = [];
		for (let x = 0; x < availableCohortsList.length; x++) {
			data.push({
				key: availableCohortsList[x].key,
				name: availableCohortsList[x].name,
				description: availableCohortsList[x].description,
				type: availableCohortsList[x].type,
				features: availableCohortsList[x].features.join(', ')
			});
		}
		return data;
	};


	return (<>

		{isLoading ? <Loader className="mt-3 text-center" /> :
			<div className="container px-0">
				<div className="d-flex justify-content-between pb-3">
					<FormControl variant="outlined" style={{ width: "15rem" }}>
						<OutlinedInput
							placeholder="Search Metrics"
							value={searchText}
							onChange={(e) => searchCohorts(e.target.value)}
							className="pr-0 rounded-pill"
							style={{ minWidth: "233px", height: "2.1rem" }}
							endAdornment={
								<InputAdornment position="end" className='py-0'>
									{searchText !== '' &&
										<Button color="primary" className="outline-none" onClick={() => searchCohorts('')}
										>
											<Icon className="align-middle" title="Search Metrics">close</Icon>
										</Button>
									}
								</InputAdornment>
							}
						/>
					</FormControl>
					<Button variant="contained" size="small" className="bg-primary-blue text-white px-3 py-1" onClick={() => toggleCreate(true)}>
						<Icon className="text-white fs14 mr-2">add</Icon> Create new cohort
					</Button>
				</div>
				{availableCohortsList.length > 0 || create ?
					<div className="row align-items-start justify-content-between">
						<div className="col-md-7 pr-md-2">
							<Table
								className="table-theme-bordered"
								dataSource={dataSource()}
								columns={columns}
								rowSelection={rowSelection}
								onRow={record => {
									return {
										onClick: () => updateSelected(record),
									};
								}}
							/>
						</div>
						<div className="col-md-5 pl-md-2">
							<div className="border rounded p-3">
								{selectedRowKeys.length ? (
									<MultipleSelected
										deleteCohorts={deleteCohorts}
										selectedRows={selectedRowKeys}
										onSelectChange={onSelectChange} />
								) : selected || create ? (
									<InputForm
										create={create}
										toggleCreate={toggleCreate}
										selectedItem={selected}
										listCohorts={retrieveCohortsList}
										deleteCohorts={deleteCohorts}
										setAlert={setAlert}
									/>
								) : (
									<NotSelected />
								)}
							</div>
						</div>
					</div>
					:
					<div className="w-100 row align-items-center justify-content-center my-5">
						<div className="col-md-4">
							<img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
						</div>
						<div className="col-md-4 text-center">
							<h4>{rawData.length ? `No search result found!` : `No Cohort Created!`}</h4>
							<p className="fs16">There are no cohort created yet. Cohort help you track and manage strategies to improve your Key Metrics. Click the New Cohort button to get started.</p>
						</div>
					</div>
				}
			</div>
		}

		<Snackbar open={isAlert.status} autoHideDuration={6000}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			onClose={() => setAlert(false)}>
			<Alert variant="filled" severity={isAlert?.severity ?? "success"}  sx={{ width: '100%' }}>{isAlert.message}</Alert>
		</Snackbar>
	</>);
};
export default KPICohortsMaintenance;


const NotSelected = () => {
	return (
		<div className="text-center">
			<img className="img-200" src={`${CONTEXT}/groups.svg`} alt="No Cohort selected" />
			<div className="h-3">No Cohort selected</div>
			<p>Select a Cohort to see its details</p>
		</div>
	);
};

const MultipleSelected = ({ selectedRows, onSelectChange, deleteCohorts }) => {
	return (
		<div className="d-flex flex-column justify-content-center">
			<div className="d-flex justify-content-center w-100">
				<img
					className="img-200"
					src={`${CONTEXT}/groups.svg`}
					alt="Group"
				/>
			</div>
			<div className="align-items-center d-flex flex-column justify-content-center">
				<div className="h-3">{selectedRows.length} Cohorts selected</div>
				<p>Uncheck and click on Cohort name to see details of one.</p>
				<div className="d-flex justify-content-center w-100 pt-3">
					<Button
						type="submit"
						variant="contained"
						className="bg-primary-blue text-white mr-2"
						onClick={(e) => deleteCohorts(selectedRows)}
					>
						Delete Cohorts ({selectedRows.length})
					</Button>
					<Button variant="outlined" onClick={() => onSelectChange([])}>Cancel</Button>
				</div>
			</div>
		</div>
	);
};

const InputForm = ({
	setAlert,
	create,
	selectedItem,
	listCohorts,
	toggleCreate,
	deleteCohorts
}) => {
	const [formData, setFormData] = useState({
		cohortId: "",
		cohortName: "",
		cohortDescription: "",
		cohortType: "Algorithm Driven",
		cohortFeature: [],
	});
	const [toggleEdit, setToggleEdit] = useState(false);
	const [selectedCohorts, setSelectedCohorts] = useState({ cohortType: 'Algorithm Driven', cohortFeature: [] });
	const [cohortDriven, setCohortDriven] = useState({ algorithm: [], categorical: [], type: '' });

	const { algorithm, categorical } = cohortDriven;
	const cohortTypeList = ['Algorithm Driven', 'Categorical Variable Driven'];

	const handleCohortsChange = (e) => {

		if (selectedCohorts[`cohortFeature`].length > 0 &&

			!window.confirm(`As you are changing the Cohort Type, you may lose out on the currently selected features. Are you sure you want to proceed?`)) {
			return false;
		}

		let newSelectedCohorts = { ...selectedCohorts };
		newSelectedCohorts[e.target.name] = e.target.value;
		setSelectedCohorts({ ...newSelectedCohorts, cohortFeature: [] });
		e.target.name === 'cohortType' && listCohortDriven();
	};

	const postCohorts = () => {
		let cohorts = { ...formData, cohortType: selectedCohorts.cohortType, cohortFeature: JSON.stringify(selectedCohorts.cohortFeature), cohortId: 'cohort' + uuid().split('-').join('') }
		kpiService.createCohorts(cohorts)
			.then(({ data }) => {
				if (data.response === `success`) {
					setAlert({ status: true, message: 'Cohorts saved successfully!' });
					listCohorts();
				}else{
					setAlert({ status: true, severity:"error", message: data?.message });
				}
			})
			.catch(error => console.error(error.message))
	};

	const putCohorts = () => {
		let cohorts = { ...formData, cohortType: selectedCohorts.cohortType, cohortFeature: JSON.stringify(selectedCohorts.cohortFeature) }
		kpiService.updateCohorts(cohorts)
			.then(({ data }) => {
				if (data.code === 200) {
					setAlert({ status: true, message: 'Cohorts updated successfully!' });
					listCohorts();
				}else{
					setAlert({ status: true, severity:"error", message: data?.message });
				}
			})
			.catch(error => console.error(error.message))
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedItem) {
			putCohorts(formData);
		} else {
			postCohorts(formData);
		}
	};

	const listCohortDriven = () => {
		kpiService.listCohortDriven()
			.then(({ data }) => {
				if (data.code === 200) {
					setCohortDriven(data.response);
				}
			})
			.catch(error => console.error(error.message))
	}

	useEffect(() => {
		if (selectedItem && !toggleEdit) {
			setFormData({
				cohortId: selectedItem.key,
				cohortName: selectedItem.name,
				cohortDescription: selectedItem.description,
				//type: selectedItem.type,
				//features: selectedItem.features.split(', '),
			});
			setSelectedCohorts({ cohortType: selectedItem.type, cohortFeature: selectedItem.features.split(', ') });
		} else {
			setFormData({
				cohortId: "",
				cohortName: "",
				cohortDescription: "",
			});
			setSelectedCohorts({ cohortType: 'Algorithm Driven', cohortFeature: [] });
		}
		listCohortDriven();
	}, [selectedItem]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		return setFormData({ ...formData, [name]: value });
	};

	return (
		<div>
			<div className="d-flex justify-content-between border-bottom pb-3 mb-4">
				<div className="h-4 text-dark">
					{toggleEdit ? "Edit Cohort Details" : selectedItem ? "Cohort Details" : "New Cohort Details"}
				</div>
				<div>
					<IconButton className="outline-none mr-3" size="small" color="primary" aria-label="delete" onClick={() => deleteCohorts([selectedItem.key])}>
						<Icon fontSize="small">delete_outlined</Icon>
					</IconButton>
					<IconButton className="outline-none" size="small" color="primary" aria-label="edit" onClick={() => setToggleEdit(true)}>
						<Icon fontSize="small">edit_outlined</Icon>
					</IconButton>
				</div>
			</div>
			{toggleEdit || create ?
				<form onSubmit={handleSubmit}>
					<FormControl fullWidth className="pb-4">
						<TextField
							size="small"
							label="Name"
							onChange={handleChange}
							name="cohortName"
							value={formData.cohortName}
							variant="outlined"
							required
						/>
					</FormControl>
					<FormControl fullWidth className="pb-4">
						<TextField
							size="small"
							multiline
							rows={3}
							label="Description"
							onChange={handleChange}
							name="cohortDescription"
							value={formData.cohortDescription}
							variant="outlined"
						/>
					</FormControl>
					<FormControl fullWidth className="pb-4">
						<InputLabel id="demo-simple-select-label" className="label-mui">Type</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							className="select-mui"
							value={selectedCohorts.cohortType}
							onChange={handleCohortsChange}
							name="cohortType"
							variant="outlined"
							label="Type"
						>
							{cohortTypeList.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
						</Select>
					</FormControl>
					{selectedCohorts.cohortType !== '' && selectedCohorts.cohortType === 'Algorithm Driven' &&
						<div className="d-flex flex-column">
							<Autocomplete
								variant="outlined"
								className="select-mui"
								multiple
								options={(selectedCohorts.cohortType === 'Algorithm Driven') ? algorithm : (selectedCohorts.cohortType === 'Categorical Variable Driven') ? categorical : []}
								getOptionLabel={(option) => option.replace(/_/g, ' ')}
								renderOption={(option) => <Typography className="text-capitalize">{option.replace(/_/g, ' ')}</Typography>}
								filterSelectedOptions
								renderInput={(params) => (
									<TextField variant="outlined" label="Features" placeholder="Features"
										{...params}
									/>
								)}
								value={selectedCohorts['cohortFeature']}
								onChange={(event, newValue) => setSelectedCohorts({ ...selectedCohorts, cohortFeature: newValue })}
							/>
						</div>
					}
					{selectedCohorts.cohortType !== '' && selectedCohorts.cohortType === 'Categorical Variable Driven' &&
						<div className="d-flex flex-column">
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label" className="label-mui">Features</InputLabel>
								<Select
									variant="outlined"
									className="select-mui"
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={selectedCohorts['cohortFeature'].length > 0 ? selectedCohorts['cohortFeature'][0] : ''}
									onChange={(event) => setSelectedCohorts({ ...selectedCohorts, cohortFeature: [event.target.value] })}
									label="Features"
								>
									<MenuItem value=""><em>None</em></MenuItem>
									{categorical && categorical.map((option, key) => (
										<MenuItem key={key} className="text-capitalize" value={option}>{option.replace(/_/g, ' ')}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					}
					<div className="d-flex justify-content-end pt-4">
						<Button variant="contained" className="bg-primary-blue text-white mr-2" type="submit">Save</Button>
						<Button variant="outlined"
							//onClick={() => selectedItem ? setEdit(false) : toggleCreate(false)}
							onClick={() => toggleCreate(false)}
						>
							Cancel
						</Button>
					</div>
				</form>
				:
				<div>
					<div>
						<div className="text-primary-default">Name</div>
						{selectedItem.name}
					</div>
					<hr />
					<div style={{overflowWrap: "break-word"}}>
						<div className="text-primary-default">Description</div>
						{selectedItem.description}
					</div>
					<hr />
					<div>
						<div className="text-primary-default">Type</div>
						{selectedItem.type}
					</div>
					<hr />
					<div>
						<div className="text-primary-default">Features</div>
						{selectedItem.features ?? '-'}
					</div>
				</div>
			}
		</div>
	);
};