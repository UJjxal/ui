import React from 'react';
import { MDBContainer, MDBNavItem, MDBLink, MDBTabPane, MDBTabContent, MDBNav } from 'mdbreact';

import { AppContext } from '../AppProvider';
import TabRender from './TabRender';
import {CONTEXT} from '../config';
import { useContext, useEffect } from 'react';

const TabPageRouter = (props) => {
	const {
		match: { url },
	} = props;
	const {
		location: { pathname },
	} = props;
	console.log('url is tab', url, pathname);

	//const { setCurrentPageName } = useContext(AppContext)
	
	useEffect(() => {
		//setCurrentPageName(pathname)
	}, [])

	return (
		<AppContext.Consumer>
			{({
				pageContent,
				activeItemPills,
				togglePills,
				changeLoginStatus,
				authUser,
				hasRights,
				userPosition,
				userPic,
				userMail,
			}) => {
				let tabContent = pageContent.filter((pg) => CONTEXT + pg.link === pathname)[0].tabs;
				let newTabContent = [];
				tabContent.forEach((tab) => {
					let foundGroup = false;
					tab.userGroups.forEach((group) => {
						if (hasRights.includes(group)) {
							foundGroup = true;
						}
					});
					if (foundGroup) {
						newTabContent.push({ ...tab });
					}
				});
				newTabContent.forEach((tab, index) => {
					tab.key = index + 1;
				});
				console.log('Tab link', tabContent, hasRights, newTabContent);
				tabContent = [...newTabContent];
				return (
					<MDBContainer fluid className="p-0 h-100">
						<MDBNav className="flex-nowrap nav nav-tabs pt-1 pl-2" color="info">
							{pageContent
								? tabContent.map((tab,i) => {
										return (
											<MDBNavItem className="pt-1" key={i}>
												<MDBLink
													to="#"
													active={activeItemPills === tab.key}
													onClick={togglePills(tab.key)}
													link
												>
													{tab.displayName}
												</MDBLink>
											</MDBNavItem>
										);
								  })
								: null}
						</MDBNav>

						<MDBTabContent activeItem={activeItemPills} style={{height:"calc(100% - 95px)"}}>
							{pageContent
								? tabContent.map((tab) => {
										return (
											<MDBTabPane tabId={tab.key} className="h-100">
												<TabRender tabKey={tab.key} tab={tab} url={pathname} className="h-100"/>
											</MDBTabPane>
										);
								  })
								: null}
						</MDBTabContent>
					</MDBContainer>
				);
			}}
		</AppContext.Consumer>
	);
};

export default TabPageRouter;
