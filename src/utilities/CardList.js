import React from "react";
import { MDBIcon } from "mdbreact";

const CardList = (props) => {
  //console.log("keyInsight121", props);
  return (
    <React.Fragment>
      <div className="list-group" style={{ marginLeft: 3 }}>
        {props.listData.length > 0 ? (
          props.listData.map((item) => {
            return (
              <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-2">{item.Key_Insights}</p>
                </div>
                <small>
                  <ul className="list-unstyled list-inline font-small">
                    <li className="list-inline-item">
                      {item.date ? <MDBIcon far icon="clock" /> : null}
                      {item.date ? item.date : null}
                    </li>
                    <li className="list-inline-item float-right">
                      <a href="#!" className="">
                        <MDBIcon far icon="comments" className="mr-1" />
                        {item.comment ? item.comment : 0}
                      </a>
                    </li>
                  </ul>
                </small>
              </div>
            );
          })
        ) : (
          <div className="pl-3">No insight created</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CardList;
