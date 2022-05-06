import React, { useState, useEffect } from 'react';

import { MenuItem, Button, TextField, Select, InputLabel, OutlinedInput, FormControl, InputAdornment, Icon, IconButton, Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { Drawer, Table, Tree } from 'antd';
import uuid from 'react-uuid';

import { unitList, initialMetricsList } from '../../../utilities/AllTables';
import { CONTEXT } from "../../../config";
import Loader from '../../../utilities/Loader';

import { dataCatalog } from '../../../components/DataCatalog';
import kpiService from '../../../services/kpiService';
import { ParameterTreeList, TreeList } from './KPINodeDrawer/KPIVisualNodeDrawer';


const KPIMetricsMaintenance = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isAlert, setAlert] = useState({status: false, message: ''});
	const [selected, setSelected] = useState(null);
	const [create, setCreate] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [availableMetricsList, setAvailableMetricsList] = useState([]);
	const [rawData, setRawData] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		retrieveMetricsList();
	}, []);


	const retrieveMetricsList = () => {
		setIsLoading(true);
		kpiService.getAllMetrics()
		.then(({ data }) => {
			if (data.code === 200) {
				let selectedMetrics = data.response.map((metric) => ({
					key: metric.metricId,
					description: metric.metricDescription,
					name: metric.metricName,
					unit: metric.metricUnit,
					polarity: metric.metricPolarity,
					text: metric.metricSqlSelect
				}));
				setAvailableMetricsList([...selectedMetrics]);
				setRawData([...selectedMetrics]);
				setSelected(null);
				setCreate(false);
			}
			setIsLoading(false);
		})
		.catch(err => {setIsLoading(false); console.error(err);})
	};

	const deleteMetrics = (selectedRows) => {
		if (!window.confirm("Are you sure you want to disable this metrics?")) {
			return false;
		}

		let metricsList = [];
		if (selectedRows.length) {
			selectedRows.map(metricId => metricsList.push({ metricId }));
		}

		kpiService.deleteMetrics(metricsList)
			.then(({ data }) => {
				if (data.code === 200) {
					setAlert({status:true, message: 'Metrics disabled successfully!'});
					setSelectedRowKeys([]);
					retrieveMetricsList();
				}
			})
			.catch(error => console.error(error.message))
	};

	const searchMetrics = (val) => {
        setSearchText(val);
        let filtered = rawData;
        if(val.length > 0){
            filtered = filtered.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
            setAvailableMetricsList(filtered)
            return
		}
        setAvailableMetricsList(filtered)
	}


	//~_~//
	const toggleCreate = (val) => {
		setCreate(val);
		setSelected(null);
	};

	const updateSelected = (paramData) => {
		if(create){ return;}
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
			title: "Metric Name",
			dataIndex: "name",
			key: "_name",
			width: 160
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "_description",
			render: (_, record) => {return <p style={{maxWidth: "250px"}}>{record.description}</p>}
		},
		{
			title: "Polarity",
			dataIndex: "polarity",
			key: "_polarity",
		},
	];

	const dataSource = () => {
		let data = [];
		for (let x = 0; x < availableMetricsList.length; x++) {
			data.push({
				key: availableMetricsList[x].key,
				name: availableMetricsList[x].name,
				description: availableMetricsList[x].description,
				polarity: availableMetricsList[x].polarity,
				unit: availableMetricsList[x].unit,
				text: availableMetricsList[x].text
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
							onChange={(e) => searchMetrics(e.target.value)}
							className="pr-0 rounded-pill"
							style={{ minWidth: "233px", height: "2.1rem" }}
							endAdornment={
								<InputAdornment position="end" className='py-0'>
									{searchText !== '' &&
										<Button color="primary" className="outline-none" onClick={() => searchMetrics('')}
										>
											<Icon className="align-middle" title="Search Metrics">close</Icon>
										</Button>
									}
								</InputAdornment>
							}
						/>
					</FormControl>
					<Button variant="contained" size="small" className="bg-primary-blue text-white px-3 py-1" onClick={() => toggleCreate(true)}>
						<Icon className="text-white fs14 mr-2">add</Icon> Create new metric
					</Button>
				</div>
				{availableMetricsList.length > 0 || create ?
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
										selectedRows={selectedRowKeys}
										onSelectChange={onSelectChange}
										deleteMetrics={deleteMetrics}
									/>
								) : selected || create ? (
									<InputForm
										create={create}
										toggleCreate={toggleCreate}
										selectedItem={selected}
										listMetrics={retrieveMetricsList}
										deleteMetrics={deleteMetrics}
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
							<h4>{rawData.length ? `No search result found!` : `No Metrics Created!`}</h4>
							<p className="fs16">There are no metrics created yet. Metrics help you track and manage strategies to improve your Key Metrics. Click the New Metric button to get started.</p>
						</div>
					</div>
				}
			</div>
		}

		<Snackbar open={isAlert.status} autoHideDuration={6000}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
			onClose={() => setAlert(false)}>
		  <Alert variant="filled" severity={isAlert?.severity ?? "success"} sx={{ width: '100%' }}>{isAlert.message}</Alert>
		</Snackbar>

	</>);
};
export default KPIMetricsMaintenance;


const NotSelected = () => {
	return (
		<div className="text-center">
			<img className="img-200" src={`${CONTEXT}/groups.svg`} alt="No Metric selected" />
			<div className="h-3">No Metric selected</div>
			<p>Select a Metric to see its details</p>
		</div>
	);
};

const MultipleSelected = ({ selectedRows, onSelectChange, deleteMetrics }) => {

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
				<div className="h-3">{selectedRows.length} Metrics selected</div>
				<p>Uncheck and click on Metric name to see details of one.</p>
				<div className="d-flex justify-content-center w-100 pt-3">
					<Button
						type="submit"
						variant="contained"
						className="bg-primary-blue text-white mr-2"
						onClick={(e) => deleteMetrics(selectedRows)}
					>
						Delete Metrics ({selectedRows.length})
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
	listMetrics,
	toggleCreate,
	deleteMetrics
}) => {
	const [formData, setFormData] = useState({
		metricId: "",
		metricName: "",
		metricDescription: "",
		metricUnit: "",
		metricPolarity: "",
		metricSqlSelect: ""
	});
	const [isDrawer, setIsDrawer] = useState("");
	const [toggleEdit, setToggleEdit] = useState(false);
	const [allParametersList, setAllParametersList] = useState([]);

	const getOptionsForParameters = () => {
		setIsDrawer('parameter')
		kpiService
			.getAllParameters()
			.then(({ data }) => {
				if (data.code === 200) {
					setAllParametersList(data.response.map((parm) => {
						return {
							key: "{" + parm.parameterName + "}",
							title: parm.parameterName,
							value: parm.parameterValue,
						};
					}))
				}
			})
			.catch((error) => console.error(error.message));
	};

	const onSelectTableData = (selectedKeys) => {
		let str = selectedKeys[0].split('#');
		setFormData({ ...formData, metricSqlSelect: (formData.metricSqlSelect) + ' ' + str[0] });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		return setFormData({ ...formData, [name]: value });
	};

	const postMetrics = () => {
		let metrics = { ...formData, metricId: 'metric' + uuid().split('-').join('') };
		kpiService.createMetrics(metrics)
			.then(({ data }) => {
				if (data.response === `success`) {
					setAlert({ status: true, message: 'Metrics saved successfully!' });
					listMetrics();
				}else{
					setAlert({ status: true, severity:"error", message: data?.message });
				}
			})
			.catch(error => console.error(error.message))
	};

	const putMetrics = () => {
		kpiService.updateMetrics(formData)
			.then(({ data }) => {
				if (data.code === 200) {
					setAlert({ status: true, message: 'Metrics updated successfully!' });
					listMetrics();
				}else{
					setAlert({ status: true, severity:"error", message: data?.message });
				}
			})
			.catch(error => console.error(error.message))
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedItem) {
			putMetrics();
		} else {
			postMetrics();
		}

	};

	useEffect(() => {
		if (selectedItem && !toggleEdit) {
			setFormData({
				metricId: selectedItem.key,
				metricName: selectedItem.name,
				metricDescription: selectedItem.description,
				metricUnit: selectedItem.unit,
				metricPolarity: selectedItem.polarity,
				metricSqlSelect: selectedItem.text
			})
		} else {
			setFormData({
				metricId: "",
				metricName: "",
				metricDescription: "",
				metricUnit: "",
				metricPolarity: "",
				metricSqlSelect: ""
			})
		}
	}, [selectedItem]);

	return (
		<div>
			<div className="d-flex justify-content-between border-bottom pb-3 mb-4">
				<div className="h-4 text-dark">
					{toggleEdit ? "Edit Metric Details" : selectedItem ? "Metric Details" : "New Metric Details"}
				</div>
				<div>
					<IconButton className="outline-none mr-3" size="small" color="primary" aria-label="delete" onClick={() => deleteMetrics([selectedItem.key])}>
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
							name="metricName"
							value={formData.metricName}
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
							name="metricDescription"
							value={formData.metricDescription}
							variant="outlined"
						/>
					</FormControl>
					<div className="row">
						<div className="col">
							<FormControl fullWidth className="pb-4">
								<InputLabel id="demo-simple-select-label" className="label-mui">Polarity</InputLabel>
								<Select
									required
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									className="select-mui"
									value={formData.metricPolarity}
									onChange={handleChange}
									name="metricPolarity"
									variant="outlined"
									label="Polarity"
								>
									{['Positive', 'Negative'].map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
								</Select>
							</FormControl>
						</div>
						<div className="col">
							<FormControl fullWidth className="pb-4">
								<InputLabel id="demo-simple-select-label" className="label-mui">Format</InputLabel>
								<Select
									required
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									className="select-mui"
									value={formData.metricUnit}
									onChange={handleChange}
									name="metricUnit"
									variant="outlined"
									label="Format"
								>
									{unitList.map(item => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
								</Select>
							</FormControl>
						</div>
					</div>
					<FormControl fullWidth>
						<TextField
							size="small"
							label="Expression"
							multiline
							rows={4}
							variant="outlined"
							autoComplete="off"
							name="metricSqlSelect"
							value={formData.metricSqlSelect}
							onChange={handleChange}
						/>
						<div className="d-flex align-items-center justify-content-between pt-1">
							<Button className="outline-none" size="small" color="primary" onClick={() => setIsDrawer('column')}>SELECT COLUMN</Button>
							<Button className="outline-none" size="small" color="primary" onClick={() => getOptionsForParameters()}>SELECT PARAMETER</Button>
						</div>
					</FormControl>

					<div className="d-flex justify-content-end pt-4">
						<Button variant="contained" className="bg-primary-blue text-white mr-2" type="submit">Save</Button>
						<Button variant="outlined"
							//onClick={() => selectedItem ? setToggleEdit(false) : toggleCreate(false)}
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
					<div className="row">
						<div className="col">
							<div className="text-primary-default">Polarity</div>
							{selectedItem.polarity}
						</div>
						<div className="col">
							<div className="text-primary-default">Format</div>
							{selectedItem.unit}
						</div>
					</div>
					<hr />
					<div>
						<div className="text-primary-default">Expression</div>
						{selectedItem.text}
					</div>
				</div>
			}
			<Drawer
				style={{ zIndex: "9999" }}
				title={isDrawer === 'parameter' ? "Available Parameters" : "Available Data Tables"}
				width={320}
				onClose={() => setIsDrawer("")}
				mask={false}
				visible={isDrawer !== "" ? true : false}
			>
				{
					isDrawer === 'parameter'
						? <ParameterTreeList
							treeData={allParametersList}
							onSelectTableData={onSelectTableData}
						/>
						:
						<TreeList
							onSelectTableData={onSelectTableData}
						/>
				}
			</Drawer>
		</div>
	);
};