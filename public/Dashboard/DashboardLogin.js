import React, { useState, useEffect } from "react";

import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple, blue } from "@material-ui/core/colors";
import MuiTable from '../../../utilities/MuiTable';
import Loader from '../../../utilities/Loader';

import {
  MDBContainer,
  MDBBtn,
  MDBBox,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
  MDBCardImage,
  MDBBtnGroup,
  MDBSelect,
  MDBCardTitle,
  MDBCardFooter,
} from "mdbreact";

import dspart from "../../../assets/image-login-cropped.png";

const DashboardLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [iconInput, setIconInput] = useState("eye-slash");
  const [typeInput, setTypeInput] = useState("password");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [dashboard, setDashboard] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);


  const redTheme = createMuiTheme({
    palette: { primary: { main: blue[500] } },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid(username, password)) {
      setErrors([]);
      setLoading(true);
      console.log("In Login", props.token);
      try {
        let response = await axios({
          method: "post",
          url: "https://idsp.incedolabs.com:8093/login/",
          data: {
            "username": username,
            "password": password,
            // "csrf_token":props.token
          },
          "headers": {
            "Content-Type": "application/json",
            "Accept": "*/*",
            // "X-CSRFToken":props.token,
            withCredentials: true
            // "Referer": "https://idsp.incedolabs.com:8093/login/"
          },
        });
        console.log("signed in response", response);
        

        if (response.data) {
          setloggedIn(true);
          setLoading(false);

        } else {
          setLoading(false);
          setErrors([response.data.message]);
        }
      } catch (err) {
        setLoading(false);
        setErrors(["An error occured while login"]);
      }
    } else {
      setErrors(["Username and/or password is blanks"]);
    }
  };

  const isFormValid = (username, password) => username && password;

  const domainValue = (val) => {
    props.setDomain(val.target.value);
  };
  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error}</p>);

  const getDashboard = async () => {
   
    
    try {
      axios.defaults.withCredentials = true;
      let listDashboard = await axios({
        method: 'get',
        url: 'https://idsp.incedolabs.com:8093/api/v1/dashboard/?q={%22order_column%22:%22changed_on_delta_humanized%22,%22order_direction%22:%22desc%22,%22page%22:0,%22page_size%22:25}',
        //url: '/dashboard/dashboardlist.json'
        // "crossDomain": true,
        "headers": {
          // "Content-Type": "application/json",
          "Accept": "*/*",
          "Access-Control-Allow-Credentials": true,
          // Cookie: session_cookie,
          withCredentials: true
        },
      });
      console.log('Dashboard', listDashboard.data);
      if (listDashboard.data.label_columns) { setDashboardHeader(listDashboard.data.label_columns, listDashboard.data.result); }
      // if(listDashboard.data.result){setDashboardRecords(listDashboard.data.result);}
    } catch (e) {
      throw e;
    }
  };

  const setDashboardHeader = (listColumns, listRecords) => {
    let dashboardHeader = [{
      field: "dashboard_title",
      headerName: "Dashboard",
      flex: 2
    },
    {
      field: "changed_by_name",
      headerName: "Modified By",
      flex: 2
    },
    {
      field: "changed_on_utc",
      headerName: "Modified On",
      flex: 2
    }
    ]

    let dashboardRecords = [...listRecords];

    // dashboardRecords.forEach(record => {
    //     dashboardHeader.forEach(header => {
    //         if (!record[header.field]) {
    //            console.log(record);
    //             dashboardRecords.push(record);
    //         }
    //     })
    // })

    setDashboard({ dashboardHeader, dashboardRecords });

  }

  return (
    <>
      {dashboard && (

        <MuiTable
          columns={dashboard.dashboardHeader}
          rows={dashboard.dashboardRecords}
        />

      ) 
}
 {loggedIn ? 
 
     <MDBBtn primary onClick={()=>getDashboard()}>GET Dashboard</MDBBtn>     
      :

        (
          <ThemeProvider theme={redTheme}>
            <MDBContainer fluid>
              <MDBRow className="d-flex align-items-center justify-content-center">


                <MDBCol md="4">
                  <MDBCard
                    className="login mt-6 .h-100 .w-100 p-1 "
                    style={{ boxShadow: "none" }}
                  // color="elegant-color-dark"
                  >

                    {/* changed the className below  to preview and added bootstrap classses */}
                    <MDBCardBody className="preview">
                      {/* overlay over the button  */}

                      <h5 className="signin  text-center">Dashboard Sign In</h5>

                      <form className="needs-validation" noValidate>
                        <MDBRow className="d-flex justify-content-start">
                          <MDBCol className="text-left">
                            <TextField
                              style={{
                                height: "25px",
                                width: "100%",
                                marginBottom: "70px",
                                marginTop: "30px",
                              }}
                              //labelClass="labelBg"
                              variant="outlined"
                              label="Username"
                              name="username"
                              type="email"
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
                                style={{
                                  height: "25px",
                                  width: "100%",
                                  marginBottom: "10px",
                                }}
                                label="Password"
                                variant="outlined"
                                required
                                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
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
                      </form>
                      <MDBBtnGroup id="loginbtn" className="d-flex mt-5">
                        <MDBBtn
                          color="#1e88e5 blue darken-2"
                          // className="indigo accent-4"
                          type="submit"
                          style={{
                            color: "#FFFFFF",
                            height: "40px",
                            width: "100%",
                            margin: "0px",
                            borderRadius: "5px",
                          }}
                          onClick={(e) => handleSubmit(e)}
                        >
                          {loading === true ? (
                            <Loader
                              type="TailSpin"
                              color="#000000"
                              height={20}
                              style={{ color: "#000000" }}
                            />
                          ) : (
                            <span
                              style={{
                                fontSize: "1",
                                width: "100%",
                                letterSpacing: "0.2rem",
                              }}
                            >
                              SIGN IN
                            </span>
                          )}
                        </MDBBtn>
                      </MDBBtnGroup>
                      {/* {errors.length > 0 && ( */}
                      <MDBBox className="text-center red-text mt-2"> {/* error */}
                        {displayErrors(errors)}
                      </MDBBox>
                      {/* )} */}
                    </MDBCardBody>
                    <MDBCardFooter
                      className="text-center"
                      style={{ backgroundColor: "#fff", border: "0px" }}
                    ></MDBCardFooter>
                  </MDBCard>
                </MDBCol>

              </MDBRow>
            </MDBContainer>
          </ThemeProvider>
        )
      }
    </>
  )

};

export default DashboardLogin;
