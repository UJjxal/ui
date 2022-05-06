import React from 'react';
import { AppContext } from "../AppProvider";
import Headerbar from './Headerbar';
import {GATEWAYBASED} from '../config';

const HeaderbarSelection=(props)=>{
    return (
        <AppContext.Consumer>
          {({
            navigationType
          }) => 
           navigationType==="Headerbar" && !GATEWAYBASED && <Headerbar domain={props.domain}/>
        }
        </AppContext.Consumer>
      );
}

export default HeaderbarSelection;

