import React, { useState, useEffect } from "react";
import axios from "axios";
import AppProvider from "./AppProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { API_ROOT, PROJECT_ID } from "./config";
import Routes from "./Routes";
import LoginModal from "./pages/LoginPage";
import LoginCard from "./components/LoginCard";
import SidebarSelection from "./components/SidebarSelection";
import Header from "./components/Header";
import HeaderbarSelection from "./components/HeaderbarSelection";
import Card from "./utilities/Card";
import Alert from "./assets/KPI/danger-alert.svg";
import MenuProvider from "./context/MenuContext";
import Banner from "./components/Banner";
import { CONTEXT } from "./config";
import LHLoader from './utilities/LH_Loader';

const App = () => {
  let appConfig = window.globalConfig;
  const [loggedIn, setLogin] = useState(false);
  const [domain, setDomain] = useState("");
  const [token, setToken] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [errors, setErrors] = useState("");
  const [SSOType, setSSOType] = useState("SSO"); //initially SSO only

  const contextLogged = CONTEXT===''?'Dev':CONTEXT.replace('/','').toUpperCase();
  
  
  useEffect(() => {
    document.title = `${contextLogged} - Incedo Lighthouse`
    let lsData = window.sessionStorage["resp"];
    if (lsData) {
      lsData = JSON.parse(lsData);
      setLogin(lsData.isLogged === contextLogged ? true : false);
      setToken(lsData.token || "");
      setLoginData(lsData.response || "");
      setDomain(lsData.isLogged === contextLogged ? appConfig.projectId : "");
    }

    if (SSOType === "SSO") {
      handleSSO();
    }
    handleVerifyToken();
  }, []);

  const handleVerifyToken = async () =>{
      let lsData = window.sessionStorage["resp"];
      if (lsData) {
        lsData = JSON.parse(lsData);
        await axios({
          method: `GET`,
              url: API_ROOT + `userProfile/`,
              headers: { Authorization: `Bearer ${lsData.token}`, "Access-Control-Allow-Origin": "*", }
        }).then((res)=>{
          if(res.data.code !== 200)
          {
            resetLoggedIn();
          }
        }).catch((e)=>{
          resetLoggedIn();
        });
      }
      else{
        resetLoggedIn();
      }
  }

  const handleSSO = async () => {
    setErrors([]);
    try {
      let response = await axios({
        method: "get",
        url: API_ROOT + "getSSOUser",
        timeout: 30000,
      });

      if (response.status === 200) {
        //for newer API
        // if (response.data.code === 200) {
        // console.log("Login Type",response.data.response.loginType );
        setSSOType(response.data.loginType);
        window.sessionStorage["version"] = response.data.version;
        // setSSOType(response.data.response.loginType);

        if (response.data.loginType === "SSO") {
          // if (response.data.response.loginType === 'SSO') {
          const apiResponse = response.data;
          // const apiResponse = response.data.response;
          // const theme = response.data.response.theme === 'Dark' || '' ? 0 : 1;
          setLoggedIn(apiResponse.token, apiResponse);

          if (PROJECT_ID) {
            setDomain(PROJECT_ID);
          }
        }
      } else {
        setErrors([response.data.message]);
      }
    } catch (err) {
      console.log(err);
      setErrors(["Error in Loading Lighthouse Application"]);
      //setSSOType('LDAP');
    }
  };

  const setAPICallErrors = (error) => {
    setErrors(error);
    setDomain("");
    setLogin(false);
    setToken(null);
    setLoginData(null);
  };
  const setLoggedIn = (token, response) => {
    let lsData = JSON.stringify({ isLogged: contextLogged, token, response });
    window.sessionStorage["resp"] = lsData;
    setDomain(appConfig.projectId);

    setLogin(true);
    setToken(token);
    setLoginData(response);
  };
  const resetLoggedIn = () => {
    window.sessionStorage["resp"] = "";

    setDomain("");
    setLogin(false);
    setToken(null);
    setLoginData(null);
  };

  const changeDomain = (domain) => {
    setDomain(domain);
  };

  return (
    <AppProvider
      domain={domain}
      resetLoggedIn={resetLoggedIn}
      token={token}
      loginData={loginData}
      setAPICallErrors={setAPICallErrors}
      setToken={setToken}
      SSOType={SSOType}
    >
      <MenuProvider>
        <Router>
          {loggedIn === false || domain < 0 ? (
            SSOType !== "SSO" ? (
              <LoginModal
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                resetLoggedIn={resetLoggedIn}
                setDomain={changeDomain}
                errorFromAPIcall={errors}
              />
            ) : errors.length > 0 ? (
              <div className="d-flex flex-row align-items-center justify-content-center">
                <Card
                  icon={Alert}
                  title={errors[0]}
                  navLinkTo={""}
                  subTitle={"Contact Technical Team"}
                />
              </div>
            ) : (
              // <div className="d-flex flex-row align-items-center justify-content-center">
              //   <Loader height={100} width={100} />
              // </div>
              <div className="row w-100 my-5 justify-content-center">
                <div className="col-md-4 text-center">
                  <h3 className="loading">Loading</h3>
                  <LHLoader />
                </div>
              </div>
            )
          ) : (
            <div className="flyout">
              <Header className="header" />
              <div className="midarea">
                <SidebarSelection domain={domain} />
                <main className="main">
                  <HeaderbarSelection domain={domain} />
                  <Banner />
                  <Routes/>
                </main>
              </div>
              <LoginCard loginData={loginData} resetLoggedIn={resetLoggedIn} contextLogged={contextLogged} />
              <footer className="footer d-none">
                <p className="footer-copyright mb-0 py-2">
                  &copy; {new Date().getFullYear()} Copyright:
                  <a href="https://www.incedoinc.com"> Incedoinc.com </a>
                </p>
              </footer>
            </div>
          )}
        </Router>
      </MenuProvider>
    </AppProvider>
  );
};

export default App;
