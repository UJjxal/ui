import React, { Component } from "react";
import { Col, Row, Select, Card } from "antd";
import {CONTEXT} from '../../../config';
import { VectorMap } from "@south-paw/react-vector-maps";

import axios from "axios";
import TableData from "../../../utilities/Table";
import Loader from "../../../utilities/Loader";
import styled from "styled-components";
import dominicanRepublic from "./dominican-republic.json";

const color = {
  color1: "#ea4924;",
  color2: "#f37547;",
  color3: "#fa9a6d;",
  hover: "#952f17",
};

const Map = styled.div`
  margin: 1rem;
  width: 70%;

  svg {
    stroke: #fff;

    // All layers are just path elements
    path {
      fill: #ffbc98;
      cursor: pointer;
      outline: none;

      // When a layer is hovered
      &:hover {
        fill: ${color.hover};
      }

      // When a layer is focused.
      &:focus {
        fill: #bf3c1d;
      }

      // You can also highlight a specific layer via it's id
      &[id="do-01"] {
        fill: ${color.color1};
      }
      &[id="do-01"]:hover {
        fill: ${color.hover};
      }
      &[id="do-32"] {
        fill: ${color.color1};
      }
      &[id="do-32"]:hover {
        fill: ${color.hover};
      }
      &[id="do-11"] {
        fill: ${color.color2};
      }
      &[id="do-11"]:hover {
        fill: ${color.hover};
      }
      &[id="do-25"] {
        fill: ${color.color2};
      }
      &[id="do-25"]:hover {
        fill: ${color.hover};
      }
      &[id="do-12"] {
        fill: ${color.color2};
      }
      &[id="do-12"]:hover {
        fill: ${color.hover};
      }
      &[id="do-23"] {
        fill: ${color.color2};
      }
      &[id="do-23"]:hover {
        fill: ${color.hover};
      }
      &[id="do-21"] {
        fill: ${color.color3};
      }
      &[id="do-21"]:hover {
        fill: ${color.hover};
      }
      &[id="do-18"] {
        fill: ${color.color3};
      }
      &[id="do-18"]:hover {
        fill: ${color.hover};
      }
      &[id="do-13"] {
        fill: ${color.color3};
      }
      &[id="do-13"]:hover {
        fill: ${color.hover};
      }
      &[id="do-06"] {
        fill: ${color.color3};
      }
      &[id="do-06"]:hover {
        fill: ${color.hover};
      }
    }
  }
`;

class Geographical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      hovered: null,
      focused: null,
      clicked: null,
      accounts: null,
      balance: null,
      holidays: null,
      covid: null,
    };
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = async () => {
    let url = `${CONTEXT}/covid/geographical.json`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      //console.log("data121", result.data.table);
      this.setState({
        records: result.data.table,
        map: result.data.map,
      });
    });
  };

  onChange = () => {};

  render() {
    const layerProps = {
      onMouseEnter: ({ target }) => {
        let layerDtl = this.state.map
          ? this.state.map.filter(
              (item) => item.id === target.attributes.id.value
            )[0]
          : null;
        //console.log("layerDtl121", layerDtl);
        this.setState({
          hovered: target.attributes.name.value,
          accounts: layerDtl ? layerDtl.accounts : null,
          balance: layerDtl ? layerDtl.balance : null,
          holidays: layerDtl ? layerDtl.holidays : null,
          covid: layerDtl ? layerDtl.covid : null,
        });
      },
      // onMouseLeave: ({ target }) => this.setState({ hovered: "None" }),
      // onFocus: ({ target }) =>
      //   this.setState({ focused: target.attributes.name.value }),
      // onBlur: ({ target }) => this.setState({ focused: "None" }),
      // onClick: ({ target }) =>
      //   this.setState({ clicked: target.attributes.name.value }),
    };

    return (
      <React.Fragment>
        <Card>
          <Row>
            <Col className="w-50" style={{ border: "1px solid #e8e8e8" }}>
              <Map>
                <VectorMap {...dominicanRepublic} layerProps={layerProps} />
              </Map>
              <div
                style={{
                  bottom: "1rem",
                  right: "2rem",
                  listStyle: "none",
                  display: "table",
                  borderCollapse: "separate",
                  position: "absolute",
                  border: "3px solid #e8e8e8",
                  width: "15rem",
                  padding: "0.5rem",
                }}
              >
                <ul id="legend" className="m-0" style={{ paddingLeft: 0 }}>
                  <b>Legend - # Accounts</b>
                  <li>
                    <strong
                      className="percent"
                      style={{
                        backgroundColor: "#ea4924",
                      }}
                    ></strong>
                    <span className="choice"> {'>'} 16,000</span>
                  </li>
                  <li>
                    <strong
                      className="percent"
                      style={{
                        backgroundColor: "#f37547",
                      }}
                    ></strong>
                    <span className="choice"> 16,000 - 6000</span>
                  </li>
                  <li>
                    <strong
                      className="percent"
                      style={{
                        backgroundColor: "#fa9a6d",
                      }}
                    ></strong>
                    <span className="choice"> 6000 - 2000</span>
                  </li>
                  <li>
                    <strong
                      className="percent"
                      style={{
                        backgroundColor: "#ffbc98",
                      }}
                    ></strong>
                    <span className="choice"> {"< 2000"}</span>
                  </li>
                </ul>
              </div>

              <div
                style={{
                  top: "1rem",
                  right: "2rem",
                  listStyle: "none",
                  display: "table",
                  borderCollapse: "separate",
                  position: "absolute",
                  border: "3px solid #e8e8e8",
                  width: "15rem",
                  padding: "0.5rem",
                }}
              >
                <div>
                  Provincia:{" "}
                  {this.state.hovered && <code>{this.state.hovered}</code>}
                </div>
                <div>
                  Number of Accounts:{" "}
                  {this.state.accounts && <code>{this.state.accounts}</code>}
                </div>
                <div>
                  Balance (in bn RD$):{" "}
                  {this.state.balance && <code>{this.state.balance}</code>}
                </div>
                <div>
                  Payment Holidays (%):{" "}
                  {this.state.holidays && <code>{this.state.holidays}</code>}
                </div>
                <div>
                  COVID Cases:{" "}
                  {this.state.covid && <code>{this.state.covid}</code>}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{ border: "1px solid #e8e8e8" }}>
              {this.state.records ? (
                <TableData
                  rowClassName="rowSubTable"
                  dataSource={this.state.records}
                  scroll={true}
                />
              ) : (
                <Loader />
              )}
            </Col>
          </Row>
        </Card>
      </React.Fragment>
    );
  }
}

export default Geographical;
