import React, { useEffect, useState } from 'react';
import { TextField, OutlinedInput, InputAdornment, Typography, FormControlLabel, FormControl, Select, MenuItem, InputLabel, RadioGroup, Radio, Button, Icon } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MDBModal, MDBIcon, MDBModalBody, MDBModalFooter, MDBTooltip} from 'mdbreact';
import {KPIDomainList} from '../../../../utilities/AllTables';
import kpiService from '../../../../services/kpiService';

export default function Experiments(props) {
    const createTypes=['Tracking', 'Dashboards'];
    const [step, setStep] = useState(0);
    const [selectedData, setSelectedData] = useState({});

    return (
        <>
            <div className="mb15">
                <div className="uc fs16 text-primary cpointer" onClick={() => props.setCreateType('')}>
                    <i className="fa fa-chevron-left"></i> Actions Home
                </div>
                <div className="fs30" style={{ color: '#3F729B' }}>
                {step === 0 ? `Experiments` : `Create A/B Test - Step 2`}
                </div>
            </div>
            {
                (step < 1) ?
                    <Experiment setStep={setStep} setSelectedData={setSelectedData} />
                    :
                    <ABTest setStep={setStep} selectedData={selectedData} />
            }
        </>
    )
}


const Experiment = ({ setStep, setSelectedData }) => {
    const [data, setData] = useState({
        domain: '',
        recommendation: '',
        audience: 'All',
        split: 'Percentage',
        featureExclusion: [],
        duration: '1 Month'
    });
    const [cohortList, setCohortList] = useState({ list: [], selected: '' });
    const [featureList, setFeatureList] = useState([]);
    const userCohorts = () => {
		kpiService.getAllCohorts()
        .then(({data}) => setCohortList({...cohortList, list:data.response}))
		.catch(error => console.error(error.message))
	}

    const handleCohorts = (cohort_id) => {
        let arr = cohortList['list'].filter(x => x.cohort_id === cohort_id)[0];

        setData({...data, featureExclusion: []});
        setCohortList({...cohortList, selected: cohort_id});
        if(arr.cohort_feature !== ""){
            setFeatureList(arr.cohort_feature);
        }else{
            setFeatureList([]) ;
        }
    }

    useEffect(() => {
        userCohorts();
    },[])

    return (
        <div>
            <div className="form-group mt-4 pt-3">
                <h5>KPI Tree Domain</h5>
                <ul className="list-inline mb-4">
                    {
                        KPIDomainList.map((displayName, i) =>
                            <li key={i} className="list-inline-item">
                                <label className={((data['domain'] !== displayName) ? `pills w-auto px-3` : `pills w-auto px-3 bg-primary border-primary text-white`)}>
                                    <input name={displayName} type="checkbox" className="d-none"
                                        checked={(data['domain'] !== displayName) ? false : true}
                                        onChange={() => setData({...data, domain:displayName})} />
                                    {displayName}
                                </label>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="form-group mt-4 pt-3">
                <h5>Action Recommendation</h5>
                <ul className="list-inline mb-4">
                    {
                        ['Recommendation 1', 'Recommendation 2', 'Recommendation 3', 'Recommendation 4'].map((displayName, i) =>
                            <li key={i} className="list-inline-item">
                                <label className={((data['recommendation'] !== displayName) ? `pills w-auto px-3` : `pills w-auto px-3 bg-primary border-primary text-white`)}>
                                    <input name={displayName} type="checkbox" className="d-none"
                                        checked={(data['recommendation'] !== displayName) ? false : true}
                                        onChange={() => setData({...data, recommendation:displayName})} />
                                    {displayName}
                                </label>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="form-group mt-4 pt-3">
                <h5>Target Audience</h5>
                <div>
                    <RadioGroup className="flex-row" value={data['audience']} onChange={e => setData({...data, audience:e.target.value})}>
                        <FormControlLabel value="All" control={<Radio color="primary" />} label="All" />
                        <FormControlLabel value="User Cohorts" control={<Radio color="primary" />} label="User Cohorts" />
                        {/* <FormControlLabel value="Sample Population" control={<Radio color="primary" />} label="Sample Population" /> */}
                    </RadioGroup>
                    {
                    data['audience'] === `User Cohorts` &&
                    <FormControl variant="outlined" style={{ width: "50rem" }}>
                        <InputLabel id="demo-simple-select-outlined-label">Available Cohorts</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={cohortList['selected']}
                            onChange={(event) => handleCohorts(event.target.value)}
                            label="Available Cohorts" placeholder="Available Cohorts"
                        >
                            {cohortList['list'].map(({ cohort_id, cohort_name }) => (
                                <MenuItem key={cohort_id} value={cohort_id}>{cohort_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    }
                </div>
            </div>
            <div className="form-group mt-4 pt-3">
                <h5>Split Type</h5>
                <div>
                    <RadioGroup className="flex-row" value={data['split']} onChange={e => setData({...data, split:e.target.value})}>
                        <FormControlLabel value="Percentage" control={<Radio color="primary" />} label="Percentage (%)" />
                        <FormControlLabel value="Absolute Value" control={<Radio color="primary" />} label="Absolute Value" />
                    </RadioGroup>
                </div>
            </div>
            {
                data['audience'] === `User Cohorts` &&
                <div className="form-group mt-4 pt-3">
                    <h5>Feature Exclusion</h5>
                    <div>
                        <Autocomplete
                            style={{ width: "50rem" }}
                            variant="outlined" className='text-capitalize'
                            multiple
                            options={featureList}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField variant="outlined"
                                    placeholder="Select Feature"
                                    {...params}
                                />
                            )}
                            value={data['featureExclusion']}
                            onChange={(event, newValue) => setData({ ...data, featureExclusion: newValue })}
                        />
                    </div>
                </div>
            }
            <div className="form-group mt-4 pt-3">
                <h5>Experiment Duration</h5>
                <div>
                    <RadioGroup className="flex-row" value={data['duration']} onChange={e => setData({...data, duration:e.target.value})}>
                        <FormControlLabel value="1 Day" control={<Radio color="primary" />} label="1 Day" />
                        <FormControlLabel value="1 Week" control={<Radio color="primary" />} label="1 Week" />
                        <FormControlLabel value="1 Month" control={<Radio color="primary" />} label="1 Month" />
                        <FormControlLabel value="Custom" control={<Radio color="primary" />} label="Custom" />
                    </RadioGroup>
                    {   
                        data['duration'] === `Custom` &&
                        <TextField variant="outlined" placeholder="Add Duration" />
                    }
                </div>
            </div>
            <div className="text-right">
                <Button variant="contained" color="primary" style={{ backgroundColor: '#3f88c5' }}
                    onClick={() => { setSelectedData(data); setStep(1); }}
                >Next</Button>
            </div>
        </div>
    );
}

const ABTest = ({ setStep, selectedData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState([`input-0`])
    const [selectedVariant, setSelectedVariant] = useState([])

    const removeItem = (i, key) => {
        let arr = [...inputs]
        arr.splice(i, 1)
       setInputs(arr);
    }

    const indexInAlphabet = (i) => {
        var alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
        return alphabet[i];
    }

    const getVariantValues = () => {
        let desc = document.querySelectorAll('.split-desc input');
        let val = document.querySelectorAll('.split-value input');
        let variant = [];
        for (let i = 0; i < desc.length; ++i) {
            if(desc[i].value !== "" && val[i].value !== "")
            variant = [...variant, { desc: desc[i].value, value: val[i].value }];
            
        }
        setSelectedVariant(variant);
        setIsOpen(true);
    }
    
    const { split, duration } = selectedData;

    return (
        <div>
            <div className="form-group mt-4 pt-3">
                <h5>Your Target Action Recommendation</h5> 
                <p className="p-2 border">80% of your midwest customers are likely to buy credit cards with credit limit of more than $10000.</p>
            </div>
            
                {
                    inputs.map((input, i) => (
                    <div key={i} className="form-group mt-4 pt-3">
                        {i !== 0 && <h5 className="text-light mb-5">V/S</h5>}
                        <h5>Variant {indexInAlphabet(i)}</h5>
                        <div>
                            <TextField variant="outlined" placeholder="Define your variant here" className="split-desc" style={{ width: "50rem" }} />
                            <OutlinedInput
                                id="demo-simple-select-outlined-label" className="mx-3 split-value"
                                placeholder="Define split here"
                                //value={50}
                                //onChange={() => handleSplitValue()}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography>{split === `Percentage` && `%`}</Typography>
                                    </InputAdornment>
                                }
                            />
                            { 
                                i === (inputs.length - 1) ?
                                <Button color="primary" className="outline-none" onClick={() => setInputs([...inputs, `input-${inputs.length}`])}>+ Add Another Variant</Button>
                                :
                                <Button color="primary" className="outline-none"
                                    onClick={() => removeItem(i, `input-${i}`)}
                                >
                                    <Icon className="align-middle" title="Delete Variant">delete_forever</Icon>
                                </Button>
                            }
                        </div>
                    </div>
                    ))
                }
            
            {/* <Typography className="border-top my-4"/>
            <div>
                <h6><i>Points to be noted:</i></h6>
                <ul>
                    <li>The sum of audience split (A+) should not go beyond 80%</li>
                    <li>In the list of credit carrds in the above dropdown, each credit card type has a credit limit more than $10000.</li>
                </ul>
            </div> */}
            <Typography className="border-top my-4"/>
            <div className="d-flex justify-content-between">
                <Button variant="contained" color="primary" style={{ backgroundColor: '#3f88c5' }} onClick={() => setStep(0)}>Back</Button>
                <Button variant="contained" color="primary" style={{ backgroundColor: '#3f88c5' }} onClick={() => getVariantValues()}>Preview</Button>
            </div>
            <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} info={{duration, split, variant: selectedVariant}}/>
        </div>
    );
}

const PreviewModal = (props) => {
    return (
        <MDBModal isOpen={props.isOpen} toggle={props.setIsOpen}  className="cascading-modal px-5 my-5" size="fluid">
            <div className="py-3 px-4 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #dee2e6" }}>
                <h2 className="m-0 font-weight-normal" style={{ color: '#1E4564' }}>Confirm the A/B Test</h2>
                <button className="border-0 bg-white" onClick={() => props.setIsOpen(false)}><MDBIcon icon="times" /></button>
            </div>
            <MDBModalBody className="py-4">
                <h4>For the next {props.info['duration']}</h4>
                {
                    props.info['variant'].map(({desc, value}) => (
                        <p className="d-flex justify-content-between align-items-center">
                            <span className="p-2 border text-dark" style={{width: "90%"}}>{desc}</span>
                            <MDBIcon icon="times" />
                            <strong>{value}{props.info['split'] === `Percentage` && `%`}</strong>
                        </p>
                    ))
                }
                {props.info['variant'] < 1 && <p className="p-2 border text-dark">No Variant added.</p>}
                {/* // <p className="p-2 border text-dark"><b>30%</b> of your midwest customers should be sold <b>X</b> Credit Cards</p>
                // <p className="p-2 border text-dark"><b>50%</b> of your midwest customers should be sold <b>Y</b> Credit Cards</p> */}
            </MDBModalBody>
            <MDBModalFooter className="d-flex justify-content-between">
                <Button variant="contained" color="primary" style={{ backgroundColor: '#DFC575' }} onClick={() => props.setIsOpen(false)}>Make Changes to this Test</Button>
                <Button variant="contained" color="primary" style={{ backgroundColor: '#15995E' }}>Run this Experiment</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}