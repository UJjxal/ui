import React, {useState, useEffect, useRef} from "react";
import {Select, DatePicker, Card,Switch} from 'antd';
import regeneronService from "../../../services/regeneronService";

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 20,verticalAlign:"top" }} spin />;

const {Option}=Select;
const {RangePicker}=DatePicker;

const FilterList=(props)=>{
    const [flBrands, setFlBrands]=useState(null);
    const [flSalesTeam, setFlSalesTeam]=useState(null);
    const [flStates, setFlStates]=useState(null);
    const [flPlans, setFlPlans]=useState([]);
    const [flData, setFlData]=useState({});
    const impactedPlans = useRef();

    const handleImpactedPlan = (v) =>{
        flData.plan_name=v;
        if(v===undefined){
            setFlData({...flData})
            //console.log('handleImpactedPlan121',v,flData)
            props.OnChangeImpactedPlan({...flData});
            return true;
        }
        try {
            const plan_ref_id = impactedPlans.current.filter(plan=>plan.plan_name===v);
            flData.plan_ref_id= v?plan_ref_id[0].plan_ref_id:'';
            setFlData({...flData})
            //console.log('handleImpactedPlan121',v,flData)
            props.OnChangeImpactedPlan({...flData});
        } catch (error) {
            
        }
    }

    const getImpactedPlan = () =>{
        setFlPlans(null);
        flData.plan_name='';
        setFlData({...flData})
        regeneronService.maImpactedPlan({...flData}).then(({data})=>{
            if(data.body){
                impactedPlans.current = data.body;
                const plans = data.body.map(plan=>{return plan.plan_name});
                setFlPlans(plans);
            }else{
                setFlPlans([]);
            }
        });
    }


    const handleStateChange=()=>{
        props.OnChangeState({...flData});
    }

    const handleSaleTeamChange=()=>{
        props.OnChangeSaleTeam({...flData});
    }

    const handleChange = ()=>{
        getImpactedPlan();
        props.OnChangeChange({...flData});
    }

    useEffect(()=>{
        regeneronService.maFilters().then(({data})=>{
            const {brand,sales_team,state} = data.body;
            //console.log('maFilters121',data.body)
            setFlBrands(brand);
            setFlSalesTeam(sales_team);
            setFlStates(state);
        });
        getImpactedPlan();
        // setFlBrands(["EYLEA", "Dupixent", "Praluent", "Kevzara", "Libtayo", "ARCALYST", "ZALTRAP"]);
        // setFlSalesTeam(["ELYEA MS", "ELYEA RBM", "EYLEA DEMS"]);
        // setFlStates(["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]);

        // eslint-disable-next-line
    }, []);

    return (
        <div className="border radius6 p2 pt5">
            <Card size="small" bordered={false}>
                <div className="d-flex justify-content-between">
                    <div className="pr-2" style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl ">Brand </div>
                            <Select 
                                className="w-100" 
                                showSearch
                                allowClear
                                placeholder="Select Brand"
                                value={flData.brand?flData.brand:null}
                                options={flBrands?.map(v=>{return {label:v, value:v}})}
                                bordered={false}
                                onChange={v=>{
                                    flData.brand=v;
                                    setFlData({...flData});
                                    //getImpactedPlan();
                                }}
                                loading={flBrands===null}
                            >
                            </Select>
                        </div>
                    </div>
                    <div className="pr-2" style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl">Region </div>
                            <Select 
                                className="w-100" 
                                mode="multiple"
                                showSearch
                                allowClear
                                placeholder="Select Region"
                                value={flData.state}
                                options={flStates?.map(v=>{return {label:v, value:v}})}
                                bordered={false}
                                onChange={v=>{
                                    flData.state=v;
                                    setFlData({...flData});
                                    //getImpactedPlan();
                                    handleStateChange();
                                }}
                                loading={flStates===null}
                            >
                            </Select>
                        </div>
                    </div>
                    <div className="pr-2" style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl">Time Period</div>
                            <RangePicker className="w-100" bordered={false} />
                        </div>
                    </div>
                    <div className="pr-2" style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl">Sales Team</div>
                            <Select 
                                className="w-100" 
                                showSearch
                                allowClear
                                placeholder="Select Sales Team"
                                value={flData.selling_team_name?flData.selling_team_name:null}
                                options={flSalesTeam?.map(v=>{return {label:v, value:v}})}
                                bordered={false}
                                onChange={v=>{
                                    //setFlData({...flData, salesTeam:v});
                                    flData.selling_team_name=v;
                                    setFlData({...flData});
                                    //getImpactedPlan();
                                    handleSaleTeamChange();
                                }}
                                loading={flSalesTeam===null}
                            >
                            </Select>
                        </div>
                    </div>

                    <div className="pr-2" style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl">Change</div>
                            <Select placeholder="Select Change" className="w-100" mode="multiple" value={flData.change} bordered={false} onChange={v=>{
                                flData.change=v;
                                setFlData({...flData});
                                handleChange();
                            }}>
                                <Option value="PA_Note">PA Note</Option>
                                <Option value="Restriction">Restriction</Option>
                                <Option value="Status">Status</Option>
                                <Option value="ST_Note">ST Note</Option>
                            </Select>
                        </div>
                    </div>

                    <div style={{width:'16.66%'}}>
                        <div className="antd-lbl-input">
                            <div className="lbl">Impacted Plan </div>
                            <Select 
                                className="w-100" 
                                showSearch
                                allowClear
                                placeholder="Select Impacted Plan"
                                value={flData.plan_name?flData.plan_name:null}
                                options={flPlans?.map(v=>{return {label:v, value:v}})}
                                bordered={false}
                                onChange={v=>{
                                    handleImpactedPlan(v);
                                }}
                                loading={flPlans===null}
                            >
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FilterList