import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import { MDBIcon } from "mdbreact";

const NodeLabel = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  className,
  addChild,
  removeChild,
  showDrawer,
  options,
  setOptions
}) => { 
  return (
    <foreignObject {...foreignObjectProps}>
      <div className={className} style={{ border: `2px solid ${nodeDatum.error === "" ? "#6885A3" : "#ff4141"}`}}>
        <div className="node-data">
          <h5 className="font-weight-bold node-title" style={{fontSize: '1.2rem'}}>
            {nodeDatum.name !== "" ? nodeDatum.name : "No Title"}
          </h5>
          
          {Object.prototype.toString.call(nodeDatum.attributes) === "[object Object]"
            ? Object.entries(nodeDatum.attributes).map(function (key) {
                //if (key[0] != "statusVal") {
                return (
                  <div className="d-flex align-items-senter justify-content-between ml-1 mr-1">
                    <span style={{ fontWeight: "bold" }}>
                      {key[1]} {key[0]}
                    </span>
                  </div>
                );
                //}
              })
            : //attributes is an array
              nodeDatum.attributes.map(function (metric) {
                return Object.entries(metric).map(function (key) {
                  
                  return (key[0] !== "show") && (
                    <div className="d-flex mx-1">
                      {metric.show || !metric.hasOwnProperty("show") ? (
                        <Icon
                          style={{ color: "green", fontSize: "1rem" }}
                          className="align-middle mr-1"
                        >
                          check_circle_sharp
                        </Icon>
                      ) : (
                        <Icon
                          style={{ color: "red", fontSize: "1rem" }}
                          className="align-middle text-secondary-red mr-1"
                        >
                          cancel_sharp
                        </Icon>
                      )}

                      {key[1] !== "undefined" && key[0] !== "undefined" && (
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {key[1]} {key[0]}
                        </span>
                      )}
                    </div>
                  );
                });
              })}
        </div>

        <div className="d-flex flex-column justify-content-center position-relative pl-3 node-status">
          {options !== nodeDatum.nodeId ?
            <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="edit" 
              onClick={() => setOptions(nodeDatum.nodeId)}>
              <Icon>more_vert</Icon>
            </IconButton>
            :
            <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="close" 
              onClick={() => setOptions('')}>
              <Icon>close</Icon>
            </IconButton>
          }

            <div className="position-absolute"
              style={ options === nodeDatum.nodeId ? {left: '70px', visibility: 'visible', opacity: 1, transition: 'all 0.2s linear 0s'} : {left: '50px', visibility: 'hidden', opacity: 0, transition: 'all 0.2s linear 0s'} }>
              <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="drive_file_rename_outline" 
                onClick={() => showDrawer(nodeDatum)} style={{margin: '0 0 20px -20px'}}>
                <Icon>drive_file_rename_outline</Icon>
              </IconButton>
              <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="add_circle_outline" 
                onClick={() => addChild(nodeDatum.nodeId)} style={{margin: '0 0 20px 0'}}>
                <Icon>add_circle_outline</Icon>
              </IconButton>
              <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="content_copy" 
                onClick={() => addChild(nodeDatum.nodeId)} style={{margin: '0 0 20px 0'}}>
                <Icon>content_copy</Icon>
              </IconButton>
              <IconButton className="outline-none bg-white icon-btn-shadow p-2" size="small" color="primary" aria-label="delete_outline" 
                onClick={() => removeChild(nodeDatum.nodeId)} style={{margin: '0 0 0 -20px'}}>
                <Icon>delete_outline</Icon>
              </IconButton>
            </div>


          {/* <div onClick={() => addChild(nodeDatum.nodeId)}>
            <i
              className="fa fa-copy"
              style={{ fontSize: "25px", color: "#000" }}
            ></i>
          </div>
          {nodeDatum.nodeId!=="1" &&
            <div onClick={() => removeChild(nodeDatum.nodeId)}>
              <i
                className="fa fa-trash"
                style={{ fontSize: "25px", color: "#000" }}
              ></i>
            </div>
          }
          {nodeDatum.children.length >0 && (
            <div className="node-action" onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? (
                  <MDBIcon
                    icon="plus"
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                ) : (
                  <MDBIcon
                    icon="minus"
                    style={{ fontSize: "25px", color: "#000" }}
                  />
                )}
            </div>
          )} */}

        </div>

        {nodeDatum.children.length > 0 && (
            nodeDatum.__rd3t.collapsed
              ? <IconButton className="outline-none border node-action node-action-vertical"
                  style={{ margin: '-11px 0 0 -11px' }}
                  size="small" color="primary"
                  onClick={toggleNode}>
                  <Icon className="text-secondary-blue">keyboard_double_arrow_right</Icon>
                </IconButton>
              : <IconButton className="outline-none border node-action node-action-vertical"
                  style={{ margin: '-11px 0 0 -11px' }}
                  size="small" color="primary"
                  onClick={toggleNode}>
                  <Icon className="text-secondary-blue">keyboard_double_arrow_left</Icon>
                </IconButton>
        )}

      </div>
    </foreignObject>
)};

export default NodeLabel;
