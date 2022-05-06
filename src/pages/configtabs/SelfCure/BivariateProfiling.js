import React from "react";
import axios from "axios";
import { API_ROOT } from "../../../config";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import Loader from "../../../utilities/Loader";
import ApexBarChartFooter from "../../../utilities/ApexBarChartFooter";
import ApexLineChartFooter from "../../../utilities/ApexLineChartFooter";
import "antd/dist/antd.css";

const chartOptions = (opt) => {
  return {
    yaxisTitle: opt.feature,
  };
};

const chartSeries = (opt) => {
  return [
    {
      name: opt.feature,
      data: opt.Self_cure_,
    },
  ];
};

class RootCauseAnalysis extends React.Component {
  constructor() {
    super();
    this.state = {
      bivariateEDA: null,
    };
  }

  componentDidMount() {
    this.getBivariateChart("selfcure/");
  }

  getBivariateChart = (selectedUrl) => {
    let url = selectedUrl + "bivariateEDA.json";
    axios({
      method: "get",
      url: url,
      data: {
        id: "1234",
      },
    }).then((res) => {
      this.setState({ bivariateEDA: res.data });
    });
  };

  render() {
    return (
      <MDBContainer fluid className="mt-4">
        <MDBRow>
          {this.state.bivariateEDA ? (
            this.state.bivariateEDA.map(function (item, i) {
              if (item.col_type === "categorical") {
                return (
                  <MDBCol size="6" className="mt-3" key={i}>
                    <ApexBarChartFooter
                      title={item.feature}
                      series={chartSeries(item)}
                      footer={item.footer}
                      options={{
                        yaxisTitle: "Self Cure %",
                        xaxisCategories: item.Decile,
                        xaxisTitle: " ",
                      }}
                    />
                  </MDBCol>
                );
              } else {
                return (
                  <MDBCol size="6" className="mt-3" key={i}>
                    <ApexLineChartFooter
                      title={item.feature}
                      series={chartSeries(item)}
                      footer={item.footer}
                      options={{ yaxisTitle: "Self Cure %" }}
                    ></ApexLineChartFooter>
                  </MDBCol>
                );
              }
            })
          ) : (
            <Loader style={{ margin: "3% 49%" }} />
          )}
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default RootCauseAnalysis;
