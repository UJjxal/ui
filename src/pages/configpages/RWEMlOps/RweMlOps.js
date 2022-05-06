import React from "react";
import { MDBRow, MDBTabPane, MDBContainer } from "mdbreact";
import Card from "../../../utilities/Card";
import Breadcrumb from "../../../utilities/Breadcrumb";
import Therapy from "../../configtabs/Therapy/index";
import Hypertension from "../../configtabs/Hypertension/index";
import Osteo from "../../configtabs/Osteo/index";
import PageTitle from "../../../utilities/PageTitle";

const icons = [
  require('../../../assets/homeIcon/price.svg'),
  require('../../../assets/homeIcon/gear.svg'),
  require('../../../assets/homeIcon/PA.svg'),
  require('../../../assets/homeIcon/CRS.svg'),
  require('../../../assets/homeIcon/price.svg'),
  require('../../../assets/homeIcon/gear.svg'),
  require('../../../assets/homeIcon/CRS.svg'),
];

const items = {
  GrowthEngine: [
    {
      displayName: "Acquisition Engine",
      subTitle: "",
      link: "#",
      menuKey: "1",
      breadcrumb: [],
    },
    {
      displayName: "Growth Engine",
      subTitle: "",
      link: "/datasciencestudiomloperations?GrowthEngine",
      menuKey: "2",
    },
    { displayName: "Retention Engine", subTitle: "", link: "#", menuKey: "3" },
  ],
  MLOps: [
    {
      displayName: "Therapy Non-Adherence Prediction",
      subTitle: "",
      link: "/datasciencestudiomloperations?therapy",
      menuKey: "1",
      // breadcrumb: [
      //   {
      //     link: "/datasciencestudiomloperations",
      //     displayName: "Machine Learning Operations",
      //   },
      // ],
    },
    {
      displayName: "Hypertension Risk Indicators",
      subTitle: "",
      link: "/datasciencestudiomloperations?hypertension",
      menuKey: "2",
    },
    {
      displayName: "Osteoporosis Risk Indicators",
      subTitle: "",
      link: "/datasciencestudiomloperations?osteoporosis",
      menuKey: "3",
    },
    {
      displayName: "Claim Rejection Summary",
      subTitle: "",
      link: "/datasciencestudiomloperations?claim",
      menuKey: "4",
    },
  ],
  therapy: [
    {
      displayName: "Therapy Non-Adherence Prediction",
      breadcrumb: [
        {
          link: "/datasciencestudiomloperations",
          displayName: "Machine Learning Operations",
        },
        // {
        //   link: "/datasciencestudiomloperations?GrowthEngine",
        //   displayName: "GrowthEngine",
        // },
      ],
    },
  ],
  hypertension: [
    {
      displayName: "Hypertension Risk Indicators",
      breadcrumb: [
        {
          link: "/datasciencestudiomloperations",
          displayName: "Machine Learning Operations",
        },
        // {
        //   link: "/datasciencestudiomloperations?GrowthEngine",
        //   displayName: "GrowthEngine",
        // },
      ],
    },
  ],
  osteoporosis: [
    {
      displayName: "Osteoporosis Risk Indicators",
      breadcrumb: [
        {
          link: "/datasciencestudiomloperations",
          displayName: "Machine Learning Operations",
        },
        // {
        //   link: "/datasciencestudiomloperations?GrowthEngine",
        //   displayName: "GrowthEngine",
        // },
      ],
    },
  ],
  claim: [
    {
      displayName: "Claim Rejection Summary",
      breadcrumb: [
        {
          link: "/datasciencestudiomloperations",
          displayName: "Machine Learning Operations",
        },
        // {
        //   link: "/datasciencestudiomloperations?GrowthEngine",
        //   displayName: "GrowthEngine",
        // },
      ],
    },
  ],
};

class RweMlOps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: false,
      title: "ML Ops",
      breadcrumb: [],
      page: null,
    };
  }

  componentDidMount() {
    this.getCardsPerPage();
  }

  getCardsPerPage() {
    let param = window.location.search
      ? window.location.search.replace("?", "")
      : "MLOps";

    let title = this.camelToSnakeCase(param);
    if (title === "M L Ops") {
      title = "Machine Learning Operations";
    }
    this.setState({
      cards: items[param],
      title: title,
    });
  }

  cardOnClick(e) {
    e.preventDefault();
    if (e.currentTarget.href.includes("?")) {
      let link = e.currentTarget.href.split("?")[1];
      let title = this.camelToSnakeCase(link);
      const pages = ["therapy", "hypertension", "osteoporosis", "claim"];
      if (title === "M L Ops") {
        title = "Machine Learning Operations";
      }

      if (pages.indexOf(link) >= 0) {
        this.setState({
          cards: items[link],
          title: items[link][0].displayName,
          page: link,
        });
        return;
      }
      this.setState({
        cards: items[link],
        title: title,
      });
    }
  }

  camelToSnakeCase(field) {
    return field
      .split(/(?=[A-Z])/)
      .map((x) => x) //.map((x) => x.toLowerCase())
      .join(" ");
  }

  renderTab(page) {
    switch (page) {
      case "therapy":
        return <Therapy />;
        break;
      case "hypertension":
        return <Hypertension />;
        break;
      case "osteoporosis":
        return <Osteo />;
        break;
      case "claim":
        return (
          <MDBTabPane tabId="4">
            <MDBContainer fluid flexCenter>
              <iframe
                style={{ height: "35rem", width: "100%", overflow: "auto" }}
                src={"https://idsp.incedolabs.com:8080/"}
              />
            </MDBContainer>
          </MDBTabPane>
        );
        break;
      default:
        break;
    }
  }

  render() {
    let statePage = this.state.page;
    return (
      <React.Fragment>
        {/* <Breadcrumb
          title={this.state.title}
          breadcrumb={this.state.cards[0] ? this.state.cards[0].breadcrumb : []}
        /> */}
        <PageTitle title={this.state.title}/>

        {statePage ? (
          this.renderTab(statePage)
        ) : (
          <MDBRow center>
            {this.state.cards
              ? this.state.cards.map((item) => {
                  const icon = icons[item.menuKey];
                  return (
                    <Card
                      icon={icon}
                      onClick={(e) => {
                        this.cardOnClick(e);
                      }}
                      title={item.displayName}
                      subTitle={item.subTitle}
                      navLinkTo={item.link}
                    />
                  );
                })
              : null}
          </MDBRow>
        )}
      </React.Fragment>
    );
  }
}
export default RweMlOps;
