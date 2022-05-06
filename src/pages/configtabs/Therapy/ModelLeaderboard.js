import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBInput,
} from "mdbreact";

import Loader from "../../../utilities/Loader";
import MDBTable from "../../../utilities/MDBTable";
import { CONTEXT } from "../../../config";

const ModelLeaderboard = () => {
  const [radio, setRadio] = useState(0);
  const [modelLeaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = `${CONTEXT}/therapynonadherenceprediction/leaderboard.json`;
      const result = await axios(url);
      setLeaderboard(result.data);
    };
    fetchData();
  }, []);

  const onClick = (nr) => {
    setRadio(nr);
  };

  const tableValues = (row, index) => {
    // console.log("Recvd row", row);
    let property = "";
    let valueArray = [];
    for (property in row) {
      // console.log("row with prop", row[prop]);
      if (property.toUpperCase() === "ACTIVE") {
        valueArray.push(
          <MDBInput
            style={{ height: "1.2rem", width: "1.2rem" }}
            onClick={() => onClick(index)}
            checked={radio === index ? true : false}
            label=""
            type="radio"
            id={`radio${index}`}
            containerClass="mb-4"
          />
        );
      } else {
        valueArray.push(row[property]);
      }
    }
    return valueArray;
  };

  return (
    <MDBContainer fluid flexCenter className="mt-4 mb-3">
      <MDBRow>
        <MDBCardGroup deck className="mt-1">
          <MDBCard
            style={{ width: "66.5rem", height: "100%" }}
            className="pl-1"
          >
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardText>
                {modelLeaderboard ? (
                  <MDBTable
                    leaderBoard={modelLeaderboard}
                    tableValues={tableValues}
                  />
                ) : (
                  <Loader />
                )}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>
    </MDBContainer>
  );
};

export default ModelLeaderboard;
