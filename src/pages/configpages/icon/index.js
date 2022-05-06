import React from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";
import "./icon.css";
const icons = [
  "fa fa-dice-d6",
  "far fa-futbol",
  "fa fa-atom",
  "fas fa-chart-bar",
  "fas fa-chart-line",
  "fa fa-chess-rook",
  "fas fa-address-book",
  "fas fa-address-card",
  "fas fa-child",
  "fas fa-id-badge",
  "fas fa-power-off",
  "fas fa-smile",
];

const IconPicker = (props) => {
  return (
    <React.Fragment>
      <MDBModal isOpen={props.modal} toggle={props.toggleModal}>
        <MDBModalHeader toggle={props.toggleModal}>Select Icon</MDBModalHeader>
        <MDBModalBody>
          <div className="rfipicons__selector">
            {icons.map((icon, index) => {
              return (
                <span
                  className="rfipicons__icon"
                  title={icon}
                  onClick={(e) => props.iconSelected(e)}
                >
                  <span
                    className="rfipicons__ibox"
                    tabIndex={index}
                    role="button"
                  >
                    <i className={icon}></i>
                  </span>
                </span>
              );
            })}
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={props.toggleModal}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </React.Fragment>
  );
};
export default IconPicker;
