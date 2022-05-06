/** configtabs/Therapy/ModelSummary */
import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

const MdbTable = (props) => {
  return (
    <React.Fragment>
      {props.leaderBoard ? (
        <div data-test="table" className="table-responsive">
          <table className="table table-striped pl-3">
            <thead data-test="table-head" class>
              <tr>
                {props.leaderBoard ? (
                  props.leaderBoard.columns.map((col) => {
                    return (
                      <td style={{ textTransform: "capitalize" }}>
                        <strong>{col.label}</strong>
                      </td>
                    );
                  })
                ) : (
                  <div className="loader">Loading...</div>
                )}
              </tr>
            </thead>
            <tbody data-test="table-body">
              {props.leaderBoard ? (
                props.leaderBoard.rows.map((row, index) => {
                  return (
                    <tr>
                      {props.tableValues(row, index).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <div className="loader">Loading...</div>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <MDBTable
          className="pb-0"
          responsive
          striped
          className={props.className ? props.className : "condensed-table"}
          hover
        >
          <MDBTableHead
            className="pb-0 pt-2"
            columns={props.columns}
            style={{ fontWeight: "bold", backgroundColor: "#c1c1c1" }}
          />
          <MDBTableBody rows={props.rows} />
        </MDBTable>
      )}
    </React.Fragment>
  );
};

export default MdbTable;
