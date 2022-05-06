import React from "react";
import { MDBRow, MDBCard, MDBCardBody } from "mdbreact";
import { getUrl, getServices } from "../../../services/SageMaker/awsService";
import PageTitle from "../../../utilities/PageTitle";
import Loader from "../../../utilities/Loader";
import Athena from "../../../assets/aws/aws_athena.svg";
import QuickSight from "../../../assets/aws/aws_quicksight.svg";
import s3 from "../../../assets/aws/aws_s3.svg";
import DataBrew from "../../../assets/aws/aws_DataBrew.svg";
import LakeFormation from "../../../assets/aws/aws_LakeFormation.svg";
import GlueStudio from "../../../assets/aws/aws_glue.svg";
import DataCatalog from "../../../assets/aws/aws_DataCatalog.svg";

import AthenaDisable from "../../../assets/aws/aws_athena_d.svg";
import QuickSightDisable from "../../../assets/aws/aws_quicksight_d.svg";
import s3Disable from "../../../assets/aws/aws_s3_d.svg";
import DataBrewDisable from "../../../assets/aws/aws_DataBrew_d.svg";
import LakeFormationDisable from "../../../assets/aws/aws_LakeFormation_d.svg";
import GlueStudioDisable from "../../../assets/aws/aws_glue_d.svg";
import DataCatalogDisable from "../../../assets/aws/aws_DataCatalog_d.svg";

class AwsServercies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.authUser
        ? props.authUser.replace(/\s+/g, "-").replace(/\./g, "-").toLowerCase()
        : "",
      athenaUrl: null,
      quickSightUrl: null,
      s3Url: null,
      dataBrewUrl: null,
      lakeFormationUrl: null,
      glueStudioUrl: null,
      dataCatalogUrl: null,
      apiResponse: null,
      services: [],
      role: props.memberOf?props.memberOf[0]:'',
    };
  }

  componentDidMount() {
    //console.log('props123',this.props);
    //const services = this.awsServices();
    // this.setState({
    //   athenaUrl: athenaUrl,
    //   quickSightUrl: quickSightUrl,
    //   s3Url: s3Url,
    //   apiResponse: true,
    //   services: [
    //     { name: "Athena", icon: Athena },
    //     { name: "QuickSight", icon: QuickSight },
    //     { name: "S3", icon: QuickSight },
    //   ],
    // });
    const services = [
      { name: "athena", stateVar: "athenaUrl" },
      { name: "quicksight", stateVar: "quickSightUrl" },
      { name: "s3", stateVar: "s3Url" },
      { name: "databrew", stateVar: "dataBrewUrl" },
      { name: "lakeformation", stateVar: "lakeFormationUrl" },
      { name: "gluestudio", stateVar: "glueStudioUrl" },
      { name: "gluedatacatalog", stateVar: "dataCatalogUrl" },
    ];
    services.map((service) => this.getUrl(service.name, service.stateVar));
  }

  awsServices = async () => {
    try {
      const { data } = await getServices(this.props.token, this.props.awsRole);

      if (data.code === 200) {
        console.log("awsServices121if", data);
      }
    } catch (error) {
      console.log("error121#", error);
    }
  };

  getUrl = async (service = "athena", stateVar = "athenaUrl") => {
    try {
      const { data } = await getUrl(
        this.state.role,
        this.state.userName,
        service,
        this.props.token
      );
      if (data) {
        this.setState({
          [stateVar]: data.response,
          apiResponse: true,
        });
      }
      //console.log("res", data);
    } catch (error) {
      console.log("error121#", error);
      this.setState({
        apiResponse: true,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <PageTitle title={"Data Services"} />
        {this.state.apiResponse ? (
          <MDBRow center>
            <ServiceBox
              url={this.state.glueStudioUrl}
              name={"Glue Studio"}
              imgEnable={GlueStudio}
              imgDisable={GlueStudioDisable}
            />

            <ServiceBox
              url={this.state.dataCatalogUrl}
              name={"Data Catalog"}
              imgEnable={DataCatalog}
              imgDisable={DataCatalogDisable}
            />

            <ServiceBox
              url={this.state.athenaUrl}
              name={"Athena"}
              imgEnable={Athena}
              imgDisable={AthenaDisable}
            />

            <ServiceBox
              url={this.state.dataBrewUrl}
              name={"Data Brew"}
              imgEnable={DataBrew}
              imgDisable={DataBrewDisable}
            />

            <ServiceBox
              url={this.state.s3Url}
              name={"S3"}
              imgEnable={s3}
              imgDisable={s3Disable}
            />

            <ServiceBox
              url={this.state.lakeFormationUrl}
              name={"Lake Formation"}
              imgEnable={LakeFormation}
              imgDisable={LakeFormationDisable}
            />

            <ServiceBox
              url={this.state.quickSightUrl}
              name={"Quick Sight"}
              imgEnable={QuickSight}
              imgDisable={QuickSightDisable}
            />
          </MDBRow>
        ) : (
          <Loader style={{ marginLeft: "30%" }} />
        )}
      </React.Fragment>
    );
  }
}

class ServiceBox extends React.Component {
  render() {
    return (
      <>
        <a
          href={this.props.url ? this.props.url : null}
          target="_blank"
          style={this.props.url ? {} : { color: "#777", cursor: "default" }}
          key="6"
        >
          <MDBCard
            className="m-3 text-center"
            style={{
              width: "10rem",
              height: "10rem",
              borderRadius: "5%",
              background: this.props.url ? "#fff" : "#eee",
            }}
          >
            <MDBCardBody className="text-primary">
              <img
                src={
                  this.props.url ? this.props.imgEnable : this.props.imgDisable
                }
                style={{ height: "4rem", width: "4rem" }}
              />
              <h5
                className="text-center"
                style={
                  this.props.url
                    ? { paddingTop: "1rem" }
                    : { color: "#777", paddingTop: "1rem" }
                }
              >
                {this.props.name}
              </h5>
            </MDBCardBody>
          </MDBCard>
        </a>
      </>
    );
  }
}

export default AwsServercies;
