import React from "react";
import { Row, Col } from "antd";
import { AppContext } from "../AppProvider";


const PageTitle = (props) => {
  return (
    <AppContext.Consumer>
      {({ theme }) => {
        return (
          <>
            <Row>
              <Col span={12}>
                <h3
                  style={{
                    margin: props.margin ? props.margin :"1rem",
                    marginLeft: props.marginLeft ? props.marginLeft : "3.5rem",
                    color: theme.color11,
                    fontFamily: theme.font,
                  }}
                >
                  {props.title}
                </h3>
              </Col>
              <Col span={12}>{props.extra ? props.extra : null}</Col>
            </Row>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};
export default PageTitle;
