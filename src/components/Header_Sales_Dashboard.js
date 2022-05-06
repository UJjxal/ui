import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow } from "mdbreact";

import Card from "../utilities/Card_Sales";
import { CONTEXT } from "../config";

import Skeleton from "@material-ui/lab/Skeleton";
import { KPIDomainIcons } from "../utilities/AllTables";

const Sales_header = (props) => {
  const [dataLoading, setDataLoading] = useState(true);
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
      getSalesData();
    },
    []);

  const getSalesData = async () => {
    let sales = await axios({
      method: "get",
      url: `${CONTEXT}/${props.fileName}`,
      data: {
        id: "1234",
      },
    });
	console.log("SALES DATA", sales.data);
    setSalesData(sales.data.sales_text);
    setDataLoading(false);
  };

  return (
    <React.Fragment>
      <MDBRow
        className="d-flex flex-row justify-content-around mt-1 ml-1 mr-1 pb-2"
        center
      >
        {dataLoading ? (
          <>
            {[...Array(4)].map(() => (
              <Skeleton
                variant="rect"
                width={192}
                height={144}
                animation="wave"
              />
            ))}
          </>
        ) : salesData.length > 0 ? (
          salesData.map((item, index) => {
            return (
              <Card
                key={index}
                icon={"settings"}
                width={10}
                height={7}
                title={item.title}
				text={item.text}
                navLinkTo={CONTEXT + props.link}
              />
            );
          })
        ) : (
          <Card icon={"settings"} title={"No Data"} navLinkTo={"#"} />
        )}
      </MDBRow>
    </React.Fragment>
  );
};
export default Sales_header;
