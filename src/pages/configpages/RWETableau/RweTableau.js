import React from "react";
import axios from "axios";
import Frame from "../../../components/Frame";
//import TableauReport from "tableau-react";

import Loader from "../../../utilities/Loader";

class RweTableau extends React.Component {
  constructor(props) {
    console.log("callTableau", props);
    super(props);
    this.state = {
      token: null,
      tableauLink:
        "https://tableau.incedolabs.com/views/PNC/AnamolyDetector/vikashupadhyay/PNCAnamolyDetector?iframeSizedToWindow=true&:embed=y",
      tableauLink2:
        "https://tableau.incedolabs.com/views/DQM_V2/StatusDashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
      tableauLink3:
        "https://tableau.incedolabs.com/trusted/<ticket>/views/DQM_V2/QADashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
    };
  }

  async componentDidMount() {
    this.getTableauToken();
  }

  getTableauToken = async () => {
    const heroku = ""; //"https://cors-anywhere.herokuapp.com/";
    const url = "https://tableau.incedolabs.com:3000/tableau/login";
    axios({
      method: "post",
      url: url,
      data: {
        server: "https://tableau.incedolabs.com",
        site: "",
        username: "vikashupadhyay", //"djangoauth",vikashupadhyay
        ip: "https://idsp.incedolabs.com",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "7e6c1675340a89cd74fea8c7f0e06f26:45f0e967ec71a7653b6d6e79859d0ac66526b76ad10088d2bd2553d85f928ac821f1979c21909d2edd89e217829e18ea",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then((response) => {
      console.log("responseToken121", response);
      const token = response.data;
      this.setState({ token });
    });
  };

  render() {
    const newLink = this.state.token
      ? this.state.tableauLink2.replace("<ticket>", this.state.token)
      : null;
    console.log("newLink121", newLink);
    return (
      <React.Fragment>
        {newLink ? (
          <Frame link={newLink} />
        ) : (
          <Loader style={{ margin: "10% 40%" }} />
        )}
        {/* {this.state.token ? (
          <TableauReport
            url={this.state.tableauLink2}
            token={this.state.token}
          />
        ) : (
          <Loader style={{ margin: "10% 40%" }} />
        )} */}
      </React.Fragment>
    );
  }
}
export default RweTableau;
