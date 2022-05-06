import React from 'react';
import { MDBCard, MDBCardBody, MDBCardFooter, MDBNavLink, MDBIcon } from 'mdbreact';
import { AppContext } from '../AppProvider';
import { convertToInternationalCurrencySystem } from './commonfunctions';
import Icon from '@material-ui/core/Icon';
const Card = (props) => {
	return (
		<AppContext.Consumer>
			{({ theme }) => {
				const { color12, color7 } = theme;	
						
				return (
					<>
						<MDBCard
							className="text-center"
							style={{
								width: props.width ? `${props.width}rem` : '20rem',
								height: props.height ? `${props.height}rem` : '12rem',
								borderRadius: '5%',
								backgroundColor: color12,
							}}
						>
							<MDBCardBody className="d-flex flex-column p-2 pl-3">
								{/*side-node-title is defined in TreeChart.css*/}

								<MDBNavLink style={{ padding: '0px' }} exact to={props.navLinkTo}>
									<div
										style={{ width: '12rem' }}
										className="d-flex flex-row align-items-center justify-content-between"
									>
										<div className="node-title" style={{ fontSize: '1rem', color: '#111111' }}>
											{props.title}
											{/* <span className="custom-tooltip">{nodeData.name}</span> */}
										</div>
										<MDBIcon className="mr-2" style={{ fontSize: '1rem', color: '#111111' }} icon="chevron-right" />
									</div>
								</MDBNavLink>
								<div>
									{props.attributes &&
										Object.entries(props.attributes).map(function (key) {
											
											if (key[0] != 'node_status') {
												return (
													<div key={key} className="d-flex">
														<span className="home-node-attr-1">
															{/* {props.polarity && <MDBIcon icon={props.polarity[key[0]]=="-"?"arrow-down":"arrow-up"}/>} */}
														</span>
														<span style={{ maxWidth: '8rem' }} className="home-node-attr-1 mr-1">{props.unit && props.unit[key[0]]==='$'?convertToInternationalCurrencySystem(key[1]) :key[1]}</span>
														<span className="home-node-attr-1 mr-2">
															{props.unit && props.unit[key[0]]}
														</span>
														<span style={{ maxWidth: '8rem' }} className="home-node-attr-2">{key[0]}</span>
													</div>
												);
											}
										})}
								</div>

								{/* <div className="node-status" ></div> */}
							</MDBCardBody>
							<MDBCardFooter className="d-flex flex-column align-items-center" style={{ padding: '0px' }}>
								<div style={{ height: '0.8rem',
								width:'100%', 
								borderBottomLeftRadius:"5%", 
								borderBottomRightRadius:"5%",
								background: props.color }}></div>

								<div className="node-bottom">
									<MDBIcon icon="plus" />
								</div>
							</MDBCardFooter>
						</MDBCard>
					</>
				);
			}}
		</AppContext.Consumer>
	);
};
export default Card;
