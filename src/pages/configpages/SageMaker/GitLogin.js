import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import Frame from "../../../utilities/Frame";
import { GITCLIENTID, GITCLIENTSECRET } from "../../../config";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      gitUrl:null
    };
  }

  componentDidMount = () => {
    this.getAccessToken();
  }

  getAccessToken = () => {
    const clientId = GITCLIENTID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    this.setState({gitUrl:url})
  }

  changeHandler = (event) => {
    let name = event.target.name;
    let fieldValue = event.target.value;
    this.setState({ [name]: fieldValue });
  };

  render() {
    return (
      <React.Fragment>
        <MDBModal
          isOpen={this.props.gitPopup}
          toggle={() => this.props.toggleGitPopup()}
          size="lg"
        >
          <Frame link={this.state.gitUrl} />
          <div className="modal-header no-border">
            <h5 className="text-center w-100">
              <i className="fa-2x fab fa-github"></i>
            </h5>
            <span
              //type="button"
              className="close"
              onClick={() => this.props.toggleGitPopup()}
              style={{ opacity: 1 }}
            >
              <span aria-hidden="true">×</span>
            </span>
          </div>
          <div className="modal-header pt-0">
            <h5 className="modal-title text-center w-100">Sign in to GitHub</h5>
          </div>
          <MDBModalBody>
            <form className="grey-text text-left m-2" id="modalForm">
              <MDBRow>
                {/* <MDBCol className="text-center"><h5>Sign in to GitHub</h5></MDBCol> */}
                <MDBCol size="12">
                  <div className="form-group">
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.changeHandler}
                      value={this.state.username}
                      placeholder="Username"
                      required
                    ></input>
                  </div>
                </MDBCol>

                <MDBCol size="12">
                  <div className="form-group">
                    <input
                      autoComplete="off"
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.changeHandler}
                      value={this.state.password}
                      placeholder="Password"
                      required
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              outline
              size="sm"
              color="success"
              className="w-100"
              style={{
                textTransform: "none",
                fontSize: 13,
              }}
              onClick={() => this.props.gitSignIn(this.state)}
            >
              <span>
                <i className="fa fa-check"></i> Sign in
              </span>
            </MDBBtn>

            {/* <MDBBtn color="light" onClick={() => this.props.toggleGitPopup()}>
              Close
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => this.props.gitSignIn(this.state)}
            >
              Sign in
            </MDBBtn> */}
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}
