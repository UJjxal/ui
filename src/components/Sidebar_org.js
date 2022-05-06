import React, { useState } from 'react';
import { AppContext } from '../AppProvider';
import 'antd/dist/antd.css';
import { MDBIcon } from 'mdbreact';
import { NavLink, Link } from 'react-router-dom';
//import "../index.css";
import { Layout, Menu, Card, Button } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
//import { ReactComponent as Logoincedo } from "../assets/incedoProject.svg";
import Loader from '../utilities/Loader';
import {CONTEXT} from '../config';

let incedoLogo = {};
incedoLogo['0'] = require('../assets/incedoProject.svg');
incedoLogo['1'] = require('../assets/incedo_LightHouse.svg'); //incedoProject1
incedoLogo['2'] = require('../assets/incedo_LightHouse.svg'); //incedoProject2
incedoLogo['dark'] = require('../assets/incedo_LightHouse_black.svg');
let collapseLogo = {};
collapseLogo['0'] = 'DSP';
collapseLogo['1'] = 'CX';
collapseLogo['2'] = 'RWE';

const { SubMenu } = Menu;
const { Sider } = Layout;

const useStyles = makeStyles((theme) => ({
	root: {
		'& > span': {
			margin: theme.spacing(1),
		},
	},
}));

const styles = { borderLeft: "2px solid red", paddingLeft: "0px" };

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [width, setWidth] = useState(250);

	const classes = useStyles();

	const onCollapse = (collapse) => {
		let opCollapsed = !collapsed;
		setCollapsed(opCollapsed);
	};

	const renderItem = (val, setSiderKey, color6, sideClass, marginMenu) => {
		if (val.displayName === 'Response Propensity Model ') {
			console.log('sideclass', val, sideClass, marginMenu);
		}
		return (
			<Menu.Item key={`${val.menuKey}`} id="side-title"
			className="w-100 border-dark"
			>
				<span>
					{/* <MDBIcon icon={val.icon} />  */}
					&nbsp;
					{val.link ? (
						val.displayName == 'Integrated Quick Sight' ? (
							<NavLink
								to="route"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: color6 }}
								onClick={(event) => {
									event.preventDefault();
									window.open(val.externalLink);
								}}
							>
								<span
									style={
										collapsed
											? { marginLeft: '3rem' }
											: { color: color6, marginLeft: marginMenu + 'rem' }
									}
								>
									{val.displayName}
								</span>
							</NavLink>
						) : (
							<NavLink
								exact
								to={CONTEXT + val.link}
								onClick={() => {
									setSiderKey([`${val.menuKey}`]);
								}}
								className={sideClass}
							>
								<span
									style={
										collapsed
											? { marginLeft: '3rem' }
											: { color: color6, marginLeft: marginMenu + 'rem' }
									}
								>
									{val.displayName}
								</span>
							</NavLink>
						)
					) : (
						<span
							style={
								collapsed ? { marginLeft: '3rem' } : { color: color6, marginLeft: marginMenu + 'rem' }
							}
						>
							{val.displayName}
						</span>
					)}
				</span>
			</Menu.Item>
		);
	};

	const renderSubmenu = (val, setSiderKey, hasRights, color6, sideClass, marginMenu) => {
		let newMarginMenu = marginMenu + 0;
		return (
			<SubMenu
				id="sidemenu-title"
				key={`${val.menuKey}`}
				title={
					<div className="d-flex flex-row align-items-center">
						<Icon
							style={{
								margin: '0px',
								fontSize: '1.3rem',

								marginRight: '1.2rem',
								cursor: 'pointer',
							}}
						>
							{val.icon}
						</Icon>

						<NavLink
							exact
							to={CONTEXT + val.link}
							onClick={() => {
								setSiderKey([`${val.menuKey}`]);
							}}
							style={{ color: color6, fontWeight: 'bold', marginLeft: marginMenu + 'rem' }}
						>
							{val.displayName}
						</NavLink>
					</div>
				}
			>
				{val.children.map((subval) => {
					let isAccessProvided = false;
					if (subval.userGroups) {
						subval.userGroups.forEach((accessGroup) => {
							if (hasRights.findIndex((right) => right === accessGroup) > -1) {
								isAccessProvided = true;
							}
						});
					} else {
						isAccessProvided = true;
					}
					if (isAccessProvided) {
						if (subval.children && subval.children.length > 0 && !subval.allowTabs) {
							return renderSubmenu(subval, setSiderKey, hasRights, color6, sideClass, newMarginMenu);
						} else {
							return renderItem(subval, setSiderKey, color6, sideClass, newMarginMenu);
						}
					} else {
						return null;
					}
				})}
			</SubMenu>
		);
	};

	return (
		<AppContext.Consumer>
			{({
				siderKey,
				setSiderKey,

				hasRights,
				menuContent,
				theme,
				currentTheme,
				onOpenChange,
				openedKeys,
				domain,
			}) => {
				const sideClass = currentTheme === 0 ? 'sidebar-link-dark' : 'sidebar-link-light';
				let marginMenu = 0;

				return (
					<Layout
						style={{
							height: '100%',
							background: theme.color4,
							borderRight: '1px solid',
							borderRightColor: theme.color5,
							fontFamily: theme.font,
							fontSize: theme.size,
						}}
					>
						<Sider
							collapsible
							collapsed={collapsed}
							width={300}
							style={{
								background: theme.color4,
								marginBottom: '1.1rem',
							}}
							collapsedWidth="0"
							trigger={null}
						>
							<span
								onClick={() => setCollapsed(!collapsed)}
								className="aant-layout-sider-zero-width-trigger 
								ant-layout-sider-zero-width-trigger-left 
								d-flex justify-content-between align-items-center pb-2"
								style={{
									background: collapsed ? 'transparent' : theme.color4,
									color: collapsed ? '#111111' : theme.color6,
									top: '0.5rem',
									right: collapsed ? '-20px' : '0',
									width: collapsed ? '20px' : '250px',
									cursor: 'pointer',
								}}
							>
								<span>
									<MDBIcon icon="bars" style={{ fontSize: '0.8rem' }} className="ml-4 mr-3" />
									{collapsed ? null : (
										<span style={{ fontSize: '1rem', fontWeight: 'bold', font: 'Roberto' }}>
											Menu
										</span>
									)}
								</span>
								{collapsed ? null : (
									<MDBIcon style={{ fontSize: '0.8rem' }} className="mr-3" icon="chevron-left" />
								)}
							</span>
							<Card width={250} style={{ backgroundColor: theme.color4, border: '0' }}></Card>

							<Menu
								mode="inline"
								theme={currentTheme === 0 ? 'dark' : 'light'}
								// openKeys={openedKeys}
								onOpenChange={onOpenChange}
								selectedKeys={[`${siderKey}`]}
								style={{
									borderRight: 0,
									backgroundColor: theme.color4,
								}}
							>
								{menuContent ? (
									menuContent.map((val) => {
										if (val.children.length === 0 || (val.children.length > 0 && val.allowTabs)) {
											let isAccessProvided = false;
											if (val.userGroups) {
												val.userGroups.forEach((accessGroup) => {
													if (hasRights.findIndex((right) => right === accessGroup) > -1) {
														isAccessProvided = true;
													}
												});
											} else {
												isAccessProvided = true;
											}
											if (isAccessProvided) {
												return (
													<Menu.Item key={`${val.menuKey}`} id="side-title">
														<div className="d-flex flex-row align-items-center">
															<Icon
																style={{
																	margin: '0px',
																	fontSize: '1.3rem',
																	marginRight: '1.2rem',
																	cursor: 'pointer',
																}}
															>
																{val.icon}
															</Icon>
															<NavLink
																exact
																to={CONTEXT + val.link}
																onClick={() => {
																	setSiderKey([`${val.menuKey}`]);
																}}
																style={{ color: theme.color6, fontWeight: 'bold' }}
															>
																<div>{val.displayName}</div>
															</NavLink>
														</div>
													</Menu.Item>
												);
											} else {
												return null;
											}
										} else if (val.children.length >= 1 && !val.allowTabs) {
											let isAccessProvided = false;
											if (val.userGroups) {
												val.userGroups.forEach((accessGroup) => {
													if (hasRights.findIndex((right) => right === accessGroup) > -1) {
														isAccessProvided = true;
													}
												});
											} else {
												isAccessProvided = true;
											}
											if (isAccessProvided) {
												return renderSubmenu(
													val,
													setSiderKey,
													hasRights,
													theme.color6,
													sideClass,
													marginMenu
												);
											} else {
												return null;
											}
										}
									})
								) : (
									<Loader />
								)}
								{menuContent.length === 1 ? <Loader style={{ marginLeft: '40%' }} /> : null}
							</Menu>

							{/* <Button
                type="primary"
                onClick={onCollapse}
                style={{ marginBottom: 1 }}
              >
                {collapsed ? ">" : "<"}
              </Button> */}
						</Sider>
					</Layout>
				);
			}}
		</AppContext.Consumer>
	);
};

export default Sidebar;
