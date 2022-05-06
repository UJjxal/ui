import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "./AppProvider";
import PageRouter from "./components/PageRouter";
import TabPageRouter from "./components/TabPageRouter";
import {CONTEXT} from './config';

const Routes = () => {
  const history = useHistory();

  // useEffect(() => {
  //   history.push(CONTEXT + "/");
  // }, []);

  return (
    <AppContext.Consumer>
      {({ pageContent }) => {
        return (
          <Switch>
            {
              pageContent ? (
                pageContent.map((p,i) => {
                  if (!p.allowTabs) {
                    return <Route key={i} exact path={CONTEXT + p.link} component={PageRouter} />;
                  } else {  
                    return ( 
                      <Route key={i} exact path={CONTEXT + p.link} component={TabPageRouter} />
                    );
                  }
                })
              ) : (
                <Redirect
                  to={{
                    path: CONTEXT + "/",
                  }}
                />
              )
                 
            
            }
            
          </Switch>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Routes;
