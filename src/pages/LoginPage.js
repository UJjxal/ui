import React, { useEffect, useState } from 'react';
import { API_ROOT, PROJECT_ID, ENV_NAME, SSO_URL_GOOGLE, SSO_URL_OTHER, CONTEXT } from '../config';
import Loader from '../utilities/Loader';
import axios from 'axios';
import { AppContext } from '../AppProvider';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Google from "../assets/Google.png";
import SSO from "../assets/SSO.png"

import {
	MDBContainer,
	MDBBtn,
	MDBBox,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBRow,
	MDBBtnGroup,
	MDBCardTitle,
	MDBCardFooter,
} from 'mdbreact';
// import SectionContainer from '../components/sectionContainer';
// import { ReactComponent as Logo1 } from '../assets/incedo13.svg';
// import { ReactComponent as Logo1 } from '../assets/atom.svg';
import { ReactComponent as Logoincedo } from '../assets/incedo_logo.svg';
import { ReactComponent as Logolighthouse } from '../assets/incedo_LightHouse_black.svg';

import dspart from '../assets/image-login-cropped.png';

const pncLogo = require('../assets/pnc.png');
const LoginModal = (props) => {
	const [password, setPassword] = useState('');
	const [iconInput, setIconInput] = useState('eye-slash');
	const [typeInput, setTypeInput] = useState('password');
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const [appVersion, setAppVersion] = useState("1.0.0")
	useEffect(() => {
		setAppVersion(window.sessionStorage["version"]);
	}, [])

	const changePasswordView = () => {
		let icon = iconInput;
		let type = typeInput;

		icon === 'eye' ? (icon = 'eye-slash') : (icon = 'eye');
		icon === 'eye' ? (type = 'text') : (type = 'password');

		setIconInput(icon);
		setTypeInput(type);
	};
	
	const enterFunction = (event, applyUserSettings, username) => {
		
		if (event.keyCode == 13) {
			if (event.target.value === password) {
				handleSubmit(event, applyUserSettings, username);
			}
		}
	};

	const ssoGoogleLogin=()=>{
		setErrors([]);
		window.location.href=SSO_URL_GOOGLE;  
	}

	const ssoOtherLogin=()=>{
		setErrors([]);
		window.location.href=SSO_URL_OTHER;  
	}


	const ssoVerifyLogin = async () => {
		let params = new URLSearchParams(window.location.search);
		let provider = params.get('provider');
		if (provider)
		{
			try {
				console.log(window.location.hash.substring(1));
				let params1 = new URLSearchParams(window.location.hash.substring(1));
				let token = params1.get('access_token');
				let response =  await axios({
					method: "post",
					url: API_ROOT + "loginApi",
					data: {
					username: provider,
					password: token,
					},
					timeout: 30000,
				});
				if (response.data.code === 200) {
					const apiResponse = response.data.response;
					props.setLoggedIn(apiResponse.token, apiResponse);
					if (PROJECT_ID) {
					props.setDomain(PROJECT_ID);
					}
					window.location.href=window.location.origin + window.location.pathname;
				} else {
					setErrors([response.data.message]);
					setLoading(false);
				}
			} catch (err) {
					 setLoading(false);
					setErrors(["Connection Timeout"]);
			}
			 
		}
	  
	}
	if(errors.length==0)
	{
		ssoVerifyLogin();
	}
	

	const handleSubmit = async (e, applyUserSettings, username) => {
		e.preventDefault();

		// e.target.className += " was-validated";
		// console.log("handle submit");
		if (isFormValid(username, password)) {
			props.resetLoggedIn();
			setErrors([]);
			setLoading(true);
			try {
				let response = await axios({
					method: 'post',
					url: API_ROOT + 'loginApi',
					data: {
						username: username,
						password: password,
					},
					timeout: 30000,
				});

				if (response.data.code === 200) {
					setLoading(false);
					const apiResponse = response.data.response;
					// const theme = response.data.response.theme === 'Dark' || '' ? 0 : 1;
					props.setLoggedIn(apiResponse.token, apiResponse);
					// if (response.data.response.theme) {
					// 	applyUserSettings(response.data.response.theme);
					// }
					// remove domain selection
					if (PROJECT_ID) {
						props.setDomain(PROJECT_ID);
					}
					document.getElementById('domain').focus();
				} else {

					setErrors([response.data.message]);
					setLoading(false);

				}
			} catch (err) {
				setLoading(false);
				setErrors(['Connection Timeout']);
			}
		} else {
			setErrors(['Username and/or password is blanks']);
		}
	};

	const isFormValid = (username, password) => username && password;

	const domainValue = (val) => {
		props.setDomain(val.target.value);
		// if (val.target.value == 1) {
		//   props.setDomain("Banking");
		// }
	};
	const displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);
	// console.log("Error", errors);
	return (
		<AppContext.Consumer>
			{({ applyUserSettings, username, setUsername }) => {
				onkeydown = (e) => {
					enterFunction(e, applyUserSettings, username);
				};
				return (
					<MDBContainer fluid>					
						<MDBRow className="d-flex ">
							<MDBCol md="6" style={{ backgroundColor:'#cee1f0'}}>
								<div className="d-none d-md-block" >
									<MDBCard className="border-0 text-center mb-3" style={{ backgroundColor:'#cee1f0'}}>
										{/* style={{ backgroundImage: `url(${dspart})`, height: "100%" }} */}
										<img src={dspart} style={{ height: '100%', width: '95%' }} />
									</MDBCard>
								</div>
							</MDBCol>
							
							<MDBCol md="1"></MDBCol>
							<MDBCol md="4">
								<MDBCard
									className="mt-4"
									style={{
										
										boxShadow: 'none',																														
										padding: '15px',
									}}
								// color="elegant-color-dark"
								>
									<MDBCardTitle className="text-center mt-4">
										<img src={`${CONTEXT}/lighthouse-logo-black.png`} style={{ width: '18rem' }} />
										<p className='mt-3 mb-0 h5 text-muted'>{ENV_NAME}</p>
									</MDBCardTitle>
									<div className='text-center pb-4 text-muted'>

									Version {appVersion}
									</div>
									<MDBCardBody className="text-center">
										{/* <h5 style={{ fontWeight: 'bold', font: 'Roberto' }}>Sign In</h5> */}
										<form className="needs-validation" noValidate>
											<MDBRow className="d-flex justify-content-start mb-4">
												<MDBCol className="text-left">
													<TextField
														//   className="mb-2 form-control labelBg shadow-box-example z-depth-1"
														// ,boxShadow: '2px -2px 0px 0px #888888',boxShadow: '-1px -1px 0px 1px #888888',

														size="small"
														style={{ width: '100%' }}
														// labelClass="labelBg"
														variant="outlined"
														label="Username"
														name="username"
														// type="email"
														//  icon="user"
														autoComplete="off"
														required
														value={username}
														onChange={(e) => setUsername(e.target.value)}
													/>
												</MDBCol>
											</MDBRow>

											<MDBRow className="d-flex justify-content-around align-items-center">
												<MDBCol className="text-left">
													{
														<TextField
															size="small"
															style={{ width: '100%' }}
															label="Password"
															variant="outlined"
															required
															type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
															onChange={(e) => setPassword(e.target.value)}
															InputProps={{
																// <-- This is where the toggle button is added.
																endAdornment: (
																	<InputAdornment position="end">
																		<IconButton
																			aria-label="toggle password visibility"
																			onClick={handleClickShowPassword}
																			onMouseDown={handleMouseDownPassword}
																		>
																			{showPassword ? (
																				<Visibility />
																			) : (
																				<VisibilityOff />
																			)}
																		</IconButton>
																	</InputAdornment>
																),
															}}
														/>
													}

													{/* <MDBIcon icon="eye" style={{position: "absolute"}}/> */}
												</MDBCol>
											</MDBRow>

											{props.loggedIn ? (
												<MDBRow className="d-flex justify-content-around mt-4 mb-4">
													<MDBCol id="login1">
														<select
															className="browser-default custom-select p-0 text-grey border-top-0 border-left-0 border-right-0"
															// style={{ background: "#212121", color: "white" }}
															onChange={(e) => domainValue(e)}
															id="domain"
														>
															<option>Choose Domain</option>
															<option value="1">CX</option>
															<option value="2">RWE</option>
															<option value="4">Test</option>
														</select>
													</MDBCol>
												</MDBRow>
											) : null}
										</form>
										<MDBBtnGroup id="loginbtn" className="d-flex mt-4">
											<MDBBtn     //Sign In Button
												color="#3F88C5"
												type="submit"
												style={{
													height: '2.2rem',
													width: '100%',
													margin: '0px',
													background: '#3F88C5',
													fontWeight: '500',
													boxShadow: 'none',
													color: '#fff',
												}}
												className="d-flex flex-row align-items-center justify-content-center"
												onClick={(e) => handleSubmit(e, applyUserSettings, username)}
											>
												{loading === true ? (
													<Loader
														type="TailSpin"
														color="#000000"
														height={20}
														style={{ color: '#000000' }}
													/>
												) : props.loggedIn ? (
													<span>Logged In</span>
												) : (
													<span
														style={{
															fontSize: '1',
															width: '100%',
															letterSpacing: '0.2rem',
														}}
													>
														SIGN IN
													</span>
												)}
											</MDBBtn>

										</MDBBtnGroup>

										<p className="line">
											<span>Or sign in with</span>
										</p>
										<div className="d-flex justify-content-center pb-3 login-icon-btn">
											<div>
											<section>
												<button onClick={ssoGoogleLogin}>
												<img src={Google} width="20" />
												</button>
											</section>
											<label>Google</label>
											</div>
											<div>
											<section>
												<button  onClick={ssoOtherLogin}>
												<img src={SSO} width="22" />
												</button>
											</section>
											<label>SSO</label>
											</div>
										</div>

										<MDBBox className="text-center red-text mt-2">{displayErrors(errors)}</MDBBox>
									</MDBCardBody>
									<MDBCardFooter className="text-center bg-white border-0">Powered By Incedo</MDBCardFooter>
								</MDBCard>
							</MDBCol>							
							
							<MDBCol md="1"></MDBCol>
						</MDBRow>
					</MDBContainer>
				);
			}}
		</AppContext.Consumer>
	);
};

export default LoginModal;
