import React, { Component } from "react";
import { DataContext } from "./index";
import AddProfile from "./AddProfile";
import axios from "axios";
import {
  MDBContainer,
  MDBBtn,
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCollapse,
  MDBIframe,
} from "mdbreact";
import PageTitle from "../../../utilities/PageTitle";
import { CONTEXT } from "../../../config";

class DataProfiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: false,
      catalogData: null,
      allProfiles: null,
    };
  }

  componentDidMount() {
    this.getCatalogData("reports");
    this.getProfiles("reports");
  }

  getCatalogData = async (folder) => {
    let dataset = await axios({
      method: "get",
      url: `${CONTEXT}/${folder}/catalogs.json`,
      data: {
        id: "1234",
      },
    });

    dataset = dataset.data;
    let catalogData = [];
    dataset.catalogs.forEach((set) => {
      catalogData.push(set);
    });
    this.setState({ catalogData });
  };

  getProfiles = async (folder) => {
    let allProfiles = await axios({
      method: "get",
      url: `${CONTEXT}/${folder}/ProfileMapping.json`,
      data: {
        id: "1234",
      },
    });
    this.setState({ allProfiles: allProfiles.data });
  };

  //state = { primary: false };

  toggleCollapse = (collapseID) => () => {
    console.log("collapse id", collapseID);
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  togglePrimary = () => {
    this.setState({ primary: !this.state.primary });
  };

  toggleEditSource = (id, setSelectedData, catalogData) => {
    setSelectedData(id, catalogData);
    this.setState({ primary: !this.state.primary });
  };

  render() {
    return (
      <DataContext.Consumer>
        {({
          setSelectedData,
          setSelectedProfile,
          profileCollapseId,
          selectedProfile,
          theme,
        }) => {
          console.log("Catalog data", this.state.catalogData);
          const { color6, color8, color2, color10 } = theme;

          return (
            <React.Fragment>
              {/* <Breadcrumb title="Data Profiler" /> */}
              {/* <h3>Data Profiler</h3> */}
              <PageTitle title={"Data Profiler"} />
              <MDBContainer
                fluid
                flexCenter
                className="text-center"
                style={{ marginTop: "1rem" }}
              >
                <MDBBtn color="info" onClick={this.togglePrimary}>
                  <i class="fas fa-dice-d6 fa-2x"></i> &nbsp; Add Catalog
                </MDBBtn>
                <AddProfile
                  primary={this.state.primary}
                  togglePrimary={this.togglePrimary}
                />

                <div className="float-none"></div>
                {this.state.catalogData
                  ? this.state.catalogData.map((data, blockIndex) => (
                      <MDBCard className="mt-1 mb-3" style={{ border: "none" }}>
                        <MDBCardBody
                          className="text-left pt-0"
                          style={{ backgroundColor: color10 }}
                        >
                          <span
                            className="ml-2"
                            style={{
                              color: color8,
                              height: "3rem",
                              fontSize: "1.2rem",
                            }}
                          >
                            <strong> {data.sourceName}</strong>
                            {"  "}
                            <i
                              className="fa fa-edit fa-md mt-4"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.toggleEditSource(
                                  data.sourceId,
                                  setSelectedData,
                                  this.state.catalogData
                                )
                              }
                            ></i>
                          </span>
                          <h6 className="ml-2 mb-2">{data.description}</h6>

                          <div className="" style={{ maxHeight: "7rem" }}>
                            <strong className="ml-2">Tags :</strong>
                            {"  "}
                            {data.tags.map((element) => {
                              return (
                                <MDBBadge
                                  color=""
                                  size="sm"
                                  className="mr-2 mb-2"
                                  style={{
                                    backgroundColor: color2,
                                  }}
                                >
                                  {element}
                                </MDBBadge>
                              );
                            })}
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "97% 3%",
                            }}
                          >
                            <div
                              style={{
                                overflowY: "hidden",
                                maxHeight: "2.2rem",
                              }}
                            >
                              <strong className="ml-2">Datasets :</strong>
                              {"  "}
                              {data.fileArray.map((file, fileIndex) => {
                                let badgeclass = "m-1 pt-2 ";

                                return (
                                  <MDBBadge
                                    color=""
                                    outline
                                    style={{
                                      cursor: "pointer",
                                      height: "1.8rem",
                                      backgroundColor: color2,
                                    }}
                                    className={badgeclass}
                                    onClick={() =>
                                      setSelectedProfile(
                                        data.sourceId,
                                        file.id,
                                        this.state.catalogData,
                                        this.state.allProfiles
                                      )
                                    }
                                  >
                                    {file.name}
                                  </MDBBadge>
                                );
                              })}
                            </div>
                            <MDBBtn
                              color="link"
                              style={{
                                height: "2rem",
                                width: "4rem",
                                border: "none",
                              }}
                            >
                              {/* <span>More</span> */}
                            </MDBBtn>
                          </div>
                          <MDBCollapse
                            className="mt-2"
                            id={data.sourceId}
                            isOpen={profileCollapseId}
                          >
                            <strong className="m-1"></strong>

                            <strong className="m-1 pt-1"></strong>

                            <MDBIframe
                              style={{
                                height: "50rem",
                                width: "100%",
                                overflow: "scroll",
                              }}
                              src={selectedProfile}
                            />
                          </MDBCollapse>
                        </MDBCardBody>
                      </MDBCard>
                    ))
                  : null}
              </MDBContainer>
            </React.Fragment>
          );
        }}
      </DataContext.Consumer>
    );
  }
}
export default DataProfiler;
