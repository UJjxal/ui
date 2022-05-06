import React from 'react';
import axios from 'axios';
import { Button, FormControl, TextField, CircularProgress } from "@material-ui/core";
import { API_ROOT, CONTEXT } from '../config';

const LoginCard = ({loginData, resetLoggedIn, contextLogged}) => {
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const setLoggedIn = (token, response) => {
        let lsData = JSON.stringify({ isLogged: contextLogged, token, response });
        window.sessionStorage["resp"] = lsData;
      };

    const handleSubmit = async (e) => {
		e.preventDefault();
        let username = loginData ? loginData['mail'].split('@')[0] : '';

            if(!username || !password){
                setErrors('Username or password can not be blank');
                return;
            }
            
			setErrors('');
            setIsLoading(true);

			try {
				let response = await axios({ method: 'post', url: API_ROOT + 'loginApi',
					data: { username, password }, timeout: 30000,
				});

				if (response.data.code === 200) {
                    setIsLoading(false); setPassword('');
					const apiResponse = response.data.response;
					setLoggedIn(apiResponse.token, apiResponse);
                    document.querySelector('.login-card').classList.add('d-none');
				} else {
                    setIsLoading(false);
					setErrors(response.data.message);
				}
			} catch (err) { setIsLoading(false); setErrors(err?.message); }
		
	};


    return <div className="ant-modal-root login-card d-none" style={{zIndex: 10000}}>
                <div className="ant-modal-mask"></div>
                <div className="ant-modal-wrap">
                    <div role="document" className="ant-modal row justify-content-center">
                        <div className="ant-modal-content px-2 py-4 w-100 text-center justify-content-center rounded" style={{maxWidth: '520px'}}>
                            <div className="container px-0">
                                <div className="row justify-content-center">
                                    <div className="col-8 text-center">
                                        <img className="p-3" src="/refresh-session.svg" alt="refresh-session" />
                                        <h4 className="text-primary-blue mb-2">Your session has expired</h4>
                                        <p className="font-weight-normal fs14 mb-3">If you want to continue session as <span className='text-primary-blue text-capitalize'>{loginData ? loginData['name'] : 'user'}</span>, please re-write your password.</p>
                                        <div className="w-100 mb-4 px-2">
                                            <FormControl className="w-100">
                                                <TextField
                                                    required
                                                    focused
                                                    label="Password"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className="select-mui"
                                                    name="password"
                                                    variant="outlined"
                                                    type="password"
                                                    size="small"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </FormControl>
                                        </div>
                                        {errors.length > 0 && <p className='text-danger'>{errors}</p>}
                                        <Button size="small" variant="outlined" className={`outline-none text-primary-blue px-3 py-1 mr-3`} onClick={() => resetLoggedIn()}>
                                            No, Sign me out
                                        </Button>
                                        <Button size="small" className={`outline-none ${isLoading ? 'bg-light text-muted' : 'bg-primary-blue text-white'} px-3 py-1`}
                                            disabled={isLoading} onClick={e => handleSubmit(e)}>
                                            Login {isLoading && <CircularProgress size={18} className="text-muted ml-2" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

export default LoginCard;