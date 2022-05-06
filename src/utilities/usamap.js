import React, { useState } from "react";
//import "./styles.css"; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import "./usamap.css";

const style = {
  height: "30rem",
  width: "30rem",
  marginLeft: "2rem"
};


const MapUsa=(props)=> {
  
  /* mandatory */
  const mapHandler = event => {
    alert(event.target.dataset);
  };

  
  /* optional customization of filling per state and calling custom callbacks per state */
  const statesCustomConfig = (states) => {
    return states;
  };

  
    return (
      <div>
        <USAMap
          onMouseOver={mapHandler}
          customize={statesCustomConfig(props.states)}
          onClick={mapHandler}
          width={props.width}
          height={props.height}
          defaultFill={"#BFBFBF"}
          title={""}
        />
      </div>
    );
  }

export default MapUsa;
