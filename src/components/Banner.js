import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppProvider";
import Homescreen1 from "./../assets/homeIcon/home screen mock 1.png";

const delay = 5;

const Banner = () => {
  const { authUser } = useContext(AppContext);

  let bannerState = Boolean(window.sessionStorage["banner"]);
  const [displayFrame, setDisplayFrame] = useState(bannerState?false:true);
  const hideFrameHandler = () => {
    window.sessionStorage["banner"] = false;
    setDisplayFrame(false);
  };
  let today = new Date();
  let currentHr = today.getHours();
  useEffect(() => {
    if(!bannerState)
    {
      let bannerTimer = setTimeout(() => hideFrameHandler(), delay * 1000);
      return () => {
        clearTimeout(bannerTimer);
      };
    }
  }, [])

  return (
    <>
      {displayFrame && (
        <div className="salute-section">
          <h1 className="salutation">
            Good{" "}
            {currentHr < 12
              ? "Morning"
              : currentHr < 18
              ? "Afternoon"
              : "Evening"}
            , {authUser}
          </h1>
          <div className="d-flex flex-column flex-md-row salutation-description">
            <div className="d-flex flex-column justify-content-around">
              <div className="font-weight-bolder pb-3">
                Welcome to your Insights to Action
              </div>
              <div className="font-weight-light pb-3">
                Everything you need at one place: Your top visuals are displayed
                for easy consumption. Your favourites , frequents, and recents
                are close at hand.{" "}
              </div>
              <div className="pb-3">
                <input
                  type="button"
                  className="gotit-btn"
                  onClick={hideFrameHandler}
                  value="Got it"
                />
              </div>
            </div>
            <div className="sal-image d-flex flex-column-reverse">
              <img src={Homescreen1} className="img-fluid" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
