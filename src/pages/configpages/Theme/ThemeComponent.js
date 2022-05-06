import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtnGroup,
  MDBBtn,
  MDBContainer,
} from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Card from "../../../utilities/Card";
import Breadcrumb from "../../../utilities/Breadcrumb";
import { Form, Radio } from "antd";
import PageTitle from "../../../utilities/PageTitle";
import { NavLink } from "react-router-dom";
import { CONTEXT, GATEWAYBASED } from "../../../config";
const optionsForThemes = [
  { label: "Dark Theme", value: 0 },
  { label: "Light Theme", value: 1 },
  // { label: 'Green Theme', value: '2', disabled: true },
  // { label: 'Blue Theme', value: '3', disabled: true },
];

const optionsForDomainBased = [
  { label: "No", value: 0 },  //Dark Theme
  { label: "Yes", value: 1 },  //Light
  //Create new theme - Incedo theme
];

const optionsForNavigation = [
  { label: "Sidebar", value: 0 },
  { label: "Headerbar", value: 1 },
];

export default class ThemeComponent extends React.Component {
  state = {
    themeValue: this.props.currentTheme,
    domainBased: this.props.IsSOIDomainBased ? 1 : 0,
    navigationType: this.props.navigationType ?this.props.navigationType==="Sidebar"?0:1:0, 
  };

  onChangeTheme = (e) => {
    this.setState({
      themeValue: e.target.value,
    });
  };

  onChangeDomainBased = (e) => {
    console.log("radio selected", e);

    this.setState({
      domainBased: e.target.value,
    });
  };

  onChangeNavigation = (e) => {
    this.setState({ navigationType: e.target.value });
  };

  render() {
    // const { themeValue } = this.state;
    return (
      <AppContext.Consumer>
        {({ setTheme, username, navigationType }) => {
          return (
            <MDBContainer center>
               {navigationType === "Sidebar" && <PageTitle title={"User Configurations"} />}
              <MDBRow>
                <MDBCard className="ml-5 w-75 p-3">
                  <h5 className="mr-5" style={{ color: "#000" }}>
                    Appearance
                  </h5>
                  <div className="row align-items-center">
                    <div className="col-3">
                      <h6 className="mr-5">Choose Theme</h6>
                    </div>
                    <div className="col-9">
                      <Radio.Group
                        options={optionsForThemes}
                        onChange={!GATEWAYBASED && this.onChangeTheme}
                        value={this.state.themeValue}
                      />
                    </div>
                  
                    
                  </div>

                 <div className="row align-items-center">
                  <div className="col-3">
                    <h6 className="mr-5">Navigation Type</h6>
                  </div>
                  <div className="col-9">
                    <Radio.Group
                      options={optionsForNavigation}
                      onChange={!GATEWAYBASED && this.onChangeNavigation}
                      value={this.state.navigationType}
                    />
                  </div>
                  </div>
                </MDBCard>
              </MDBRow>
              <MDBRow className="mt-2">
                <MDBCard className="ml-5 w-75 p-3">
                  <h5 className="mr-5" style={{ color: "#000" }}>
                    Analysis Hub Settings - Pan-User
                  </h5>
                  <div className="row align-items-center">
                  <div className="col-3">
                    <h6 className="mr-5">Asset Class Based</h6>
                    </div>
                    <div className="col-9">
                    <Radio.Group
                      options={optionsForDomainBased}
                      onChange={!GATEWAYBASED && this.onChangeDomainBased}
                      value={this.state.domainBased}
                    />
                    </div>
                  </div>
                </MDBCard>
              </MDBRow>

              <MDBRow center>
                <MDBBtnGroup>
                  <NavLink to={`${CONTEXT}/`}>
                  <MDBBtn
                    size="sm"
                    color="mdb-color"
                    onClick={() =>
                      !GATEWAYBASED && setTheme(
                        {
                          theme: this.state.themeValue ? "Light" : "Dark",
                          ISSOIDomainBased: this.state.domainBased,
                          NavigationType:optionsForNavigation[this.state.navigationType].label
                        },

                        username
                      )
                    }
                  >
                    {!GATEWAYBASED?'Change Configurations':'Not Allowed For Gateway Screen'}
                  </MDBBtn>
                  </NavLink>
                </MDBBtnGroup>
              </MDBRow>
            </MDBContainer>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
