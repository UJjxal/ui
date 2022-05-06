import React from 'react';
import { MDBRow } from 'mdbreact';
import { AppContext } from '../AppProvider';

import Card from '../utilities/Card_PNC';
import { CONTEXT } from '../config';
import Loader from '../utilities/Loader';
import Skeleton from '@material-ui/lab/Skeleton';
import { KPIDomainIcons } from '../utilities/AllTables';
import Radium, { StyleRoot } from 'radium';
// import { useMediaQuery } from '@material-ui/core';


const Header_PNC = (props) => {
	// const style_ = useMediaQuery(
	// 	{minDeviceWidth: 700},
	// 	{deviceWidth: 1280}
	// )
	
	return (
		<AppContext.Consumer>
			{({ menuContent, hasRights, mainMenuLoading }) => {
				let homePage = [];

				const checkAuthorizedTreeCount = (children) => {
					let treeCount = 0;
					children.forEach((tab) => {
						if (tab.userGroups) {
							tab.userGroups.forEach((group) => {
								if (hasRights.includes(group)) {
									treeCount++;
								}
							});
						}
					});
					return treeCount;
				};

				const processChildren = (children) => {
					children.length > 0 && children.forEach((child) => processChild(child));
				};

				const processChild = (menu) => {
					if (menu.link === '/') {
						homePage.push(menu);
					} else {
						menu.children && menu.children.length > 0 && processChildren(menu.children);
					}
				};

				menuContent.forEach((menu) => {
					if (menu.link === '/') {
						homePage.push(menu);
					} else {
						menu.children && menu.children.length > 0 && processChildren(menu.children);
					}
				});

				let newChildren = [];

				if (homePage.length > 0 && homePage[0].children && homePage[0].children.length > 0) {
					homePage[0].children.forEach((tab) => {
						let foundGroup = false;
						if (tab.userGroups) {
							tab.userGroups.forEach((group) => {
								if (hasRights.includes(group)) {
									foundGroup = true;
								}
							});
						} else {
							foundGroup = true;
						}
						if (foundGroup) {
							newChildren.push({ ...tab });
						}
					});

					// newChildren = newChildren.filter((child) => child.displayName !== 'Published');
					// newChildren = newChildren.filter(child=>child.displayName!== 'Drafts');
					homePage[0].children = [...newChildren];
				}

				// console.log('Home link', homePage, hasRights, newChildren);

				return (
					<React.Fragment>
						<MDBRow className="d-flex flex-row justify-content-around mt-1 ml-1 mr-1 pb-2" 
						// style={{backgroundColor:"#fff"}}
						center>
							{mainMenuLoading ? (
								<>
									{[...Array(8)].map(() => <Skeleton variant="rect" width={192} height={144} animation="wave" />)}
								</>
							) : 
							newChildren.length > 0 ? (
								newChildren.map((item, index) => {
									let treeCount = checkAuthorizedTreeCount(item.children);
									return (
										<Card
											key={index}
											icon={
												KPIDomainIcons[item.displayName]
													? KPIDomainIcons[item.displayName]
													: 'settings'
											}
											width={10}
											height={7}
											title={item.displayName}
											//navLinkTo={domainAccess.includes(item.displayName)? CONTEXT + item.link:'#'}
											navLinkTo={CONTEXT + item.link}
											analysisCount={treeCount}
										/>
									);
								})
							) : (
								<Card icon={'settings'} title={'No Children'} navLinkTo={'#'} />
							)}
						</MDBRow>
					</React.Fragment>
				);
			}}
		</AppContext.Consumer>
	);
};
export default Header_PNC;
