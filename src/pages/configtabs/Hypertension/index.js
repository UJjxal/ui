import React, {useState} from "react";
import ModelSummary from "./ModelSummaryPatient";
import FeatureImportance from "./FeatureImportancePatient";
import {AIRFLOW_URL} from "../../../config";

import {MDBContainer, MDBLink, MDBNav, MDBNavItem, MDBTabContent, MDBTabPane,} from "mdbreact";

const Therapy = (props) => {
    const [activeItemPills, setactiveItemPills] = useState("1");

    const togglePills = (tab) => (e) => {
        const {activePills} = activeItemPills;
        if (activePills !== tab) {
            setactiveItemPills(tab);
        }
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <MDBContainer>
                <MDBNav className="nav-pills z-depth-1" color="primary">
                    <MDBNavItem>
                        <MDBLink
                            to="#"
                            active={activeItemPills === "1"}
                            onClick={togglePills("1")}
                            link
                        >
                            Model Summary
                        </MDBLink>
                    </MDBNavItem>

                    <MDBNavItem>
                        <MDBLink
                            to="#"
                            active={activeItemPills === "3"}
                            onClick={togglePills("3")}
                            link
                        >
                            Feature Importance
                        </MDBLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBLink
                            to="#"
                            active={activeItemPills === "4"}
                            onClick={togglePills("4")}
                            link
                        >
                            Model Workflow
                        </MDBLink>
                    </MDBNavItem>
                </MDBNav>

                <MDBTabContent activeItem={activeItemPills}>
                    <MDBTabPane tabId="1">
                        <ModelSummary page={props.page}/>
                    </MDBTabPane>
                    <MDBTabPane tabId="3">
                        <FeatureImportance page={props.page}/>
                    </MDBTabPane>
                    <MDBTabPane tabId="4">
                        <MDBContainer fluid flexCenter>
                            <iframe
                                style={{height: "35rem", width: "100%", overflow: "auto"}}
                                src={
                                    AIRFLOW_URL +
                                    "admin/airflow/graph?dag_id=RWE_NHANES_Analysis&execution_date="
                                }
                            />
                        </MDBContainer>
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        </React.Fragment>
    );
};

export default Therapy;
