/** configtabs/Therapy/RootCauseAnalysis */
import React from "react";
import { MDBDataTable } from "mdbreact";

const MdbTable = (props) => {
  return (
    <React.Fragment>
      <MDBDataTable
        striped
        bordered
        hover
        noBottomColumns
        data={props.mdbDataTable}
        paging={false}
        searching={false}
      />
    </React.Fragment>
  );
};

export default MdbTable;
