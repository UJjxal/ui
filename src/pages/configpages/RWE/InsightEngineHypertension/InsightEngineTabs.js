import React, { useState } from "react";
import BiomarkerInsights from "./BiomarkerInsights";
import StudyDesigns from "./StudyDesigns";
import { AppContext } from '../../../../AppProvider';
import {
  MDBContainer,
  MDBNavItem,
  MDBLink,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBIframe
} from "mdbreact";

const InsightEngine = () => {
  const [activeItemPills, setactiveItemPills] = useState("1");

  const togglePills = tab => () => {
    const { activePills } = activeItemPills;
    if (activePills !== tab) {
      setactiveItemPills(tab);
    }
  };

  return (
    <AppContext.Consumer>
			{({
				selectedDashboard,
				selectedInsightMSURL
			}) => {
        console.log("selected ms url", selectedInsightMSURL);
				return (
          
    <MDBContainer>{selectedDashboard === 'Insights'?
      (<React.Fragment><MDBNav className="nav-pills z-depth-1" color="primary">
        <MDBNavItem>
          <MDBLink
            to="#"
            active={activeItemPills === "1"}
            onClick={togglePills("1")}
            link
          >
            Study Design
          </MDBLink>
        </MDBNavItem>
        <MDBNavItem>
					<MDBLink to="#" active={activeItemPills === '2'} onClick={togglePills('2')} link>
						Biomarker Insights
					</MDBLink>
				</MDBNavItem>
				<MDBNavItem>
					<MDBLink to="#" active={activeItemPills === '3'} onClick={togglePills('3')} link>
						Cohort Analyser
					</MDBLink>
				</MDBNavItem>
			</MDBNav>

      <MDBTabContent activeItem={activeItemPills}>
       
        <MDBTabPane tabId="1">
          <StudyDesigns/>
        </MDBTabPane>
        <MDBTabPane tabId="2">
          <BiomarkerInsights/>
        </MDBTabPane>
        <MDBTabPane tabId="3">
        <MDBContainer fluid flexCenter  style={{ paddingLeft: '0px'}}>
	<iframe style={{ marginTop: '1rem', height: '38rem', width: '104%', overflow: 'auto' }}
	frameborder="0" scrolling="no"
	src="https://incedoin-my.sharepoint.com/personal/himanshu_babbar_incedoinc_com/_layouts/15/Doc.aspx?sourcedoc={82fa0812-c417-49bf-b227-4af75c399e82}&action=embedview&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True">
	</iframe>
</MDBContainer>
        </MDBTabPane>
      </MDBTabContent>
    
     </React.Fragment>):<MDBIframe src={selectedInsightMSURL} /> }</MDBContainer>
  ) }}</AppContext.Consumer>)
};

export default InsightEngine;
