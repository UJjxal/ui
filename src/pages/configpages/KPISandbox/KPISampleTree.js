import React, {Component} from "react";

import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdbreact";

import TreeChart from "../../../utilities/TreePreviewChart";

import { AppContext } from "../../../AppProvider";
  
export default class KPISampleTree extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ ProcessedKPITree }) =>
  {
    //console.log("Raw data", ProcessedKPITree);
    return (
      <MDBContainer fluid flexCenter className="">
       
          <MDBCardGroup deck className="mt-3">
            <MDBCard style={{ width: "100%" }} className="p-0 m-0">
              {/* <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center mt-3"
              >
                KPI Tree
              </MDBCardTitle> */}
              <MDBCardText>
                {this.props.sampleTree ? (
                  <TreeChart treeData={this.props.sampleTree} colorThreshold={this.props.colorThreshold}/>
                ) : <div className="text-center">Create a sample KPI structure at KPI Configuration</div>}
              </MDBCardText>
            </MDBCard>
          </MDBCardGroup>
        
      </MDBContainer>
    );
  }}
  </AppContext.Consumer>)
}
}

// export default KPISampleTree;
