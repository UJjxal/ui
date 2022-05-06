import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const TreeCard = ({ icon, title, image, navLinkTo, attributes, nodeCount }) => {
  const nodeStatus = (attributes && ("node_status" in attributes)) ? attributes["node_status"] : "no_change";
  
  return (
    false ?
    <div className="mb35 px-3">
      <div className="row position-relative mx-auto p-3" style={{ width: "344px", height: "150px", boxShadow: "0px 0px 3px #cdd6e0, 0px 2px 8px #cdd6e0", borderRadius: "8px" }}>

        <div className="col-8 px-0">
          <div className="d-flex align-items-center">
            <div>
              <Icon className="mr-3 fs20 align-middle text-primary-blue material-icons-outlined">account_tree</Icon>
            </div>
            <div>
              <NavLink title={title} className="h-4 text-d-none" exact to={navLinkTo} style={{ textDecoration: 'none' }}>
                {title.substr(0, 18)}{title.length > 18 && "..."}
              </NavLink>
            </div>
          </div>

          <div className="row mt-2" style={{ paddingLeft: "52px" }}>
            {attributes &&
              Object.entries(attributes).slice(1).map(key => key[0] !== "node_status" &&
                <div className="col-md-6 px-0" key={key}>
                  <span className="fs12 bold500 text-muted" title={key[0]}>{key[0].substr(0, 14)}</span>
                  <h6 className="fs14">{key[1]}</h6>
                </div>
              )}
          </div>
        </div>

        <div className="col-4 text-center pt-3 pr-0">
          <h2 className="mb-2" title={attributes && Object.values(attributes)[0]}>{attributes ? (Object.values(attributes)[0]).substr(0, 3) : "-"}</h2>
          <span className="fs12 bold500 text-muted" title={attributes && Object.keys(attributes)[0]}>{attributes ? (Object.keys(attributes)[0]).substr(0, 13) : "No Metric"}</span><br />
          <span className="fs12 bold500 text-muted py-1 px-2 rounded" style={{ background: '#F2F5F7' }}>{nodeCount} Nodes</span>
        </div>

        <div className="position-absolute h-100 node-status" style={{ width: "8px", left: 0, top: 0, background: getNodeStatus(nodeStatus), borderRadius: "8px 0 0 8px" }}></div>
      </div>
    </div>
    :
    <div className="d-flex flex-column mb-5 domain-card">
      <div className="tree-image d-flex align-items-center ">
        <img src={image} alt="tree" className="img-fluid p-4" />
      </div>
      <div className="tree-metrics d-flex bg-white">
        <div className="tree-icon">
          <Icon className="mr-1 material-icons-outlined">account_tree</Icon>
        </div>
        <div className="d-flex flex-column w-100">
            <NavLink className="h-4 text-d-none" exact to={navLinkTo}  style={{ textDecoration: 'none' }}>
              {title}
            </NavLink>
          <div className="metrics-values">
            {attributes &&
              Object.entries(attributes).map(
                (key) =>
                  key[0] !== "node_status" && <div  key={key}>{ key[0]} {key[1]}</div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCard;


function getNodeStatus(status) {
  switch (status) {
    case "significant_growth":
      return "#698aeb";

    case "modest_growth":
      return "#95C1A6";

    case "no_change":
      return "#CCCCCC";

    case "modest_loss":
      return "#E3C567";

    case "significant_loss":
      return "#e16a6a";

    case "l":
      return "#238823"; // green

    case "m":
      return "#FFBF00";// amber

    case "h":
      return "#CC0000";// red

    default:
      return "#CCCCCC";
  }
}