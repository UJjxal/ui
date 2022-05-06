import React, {useContext} from "react";
import ReactDynamicImport from "react-dynamic-import";
import { AppContext } from "../AppProvider";
import Frame from "../pages/configpages/Home/Frame";
import NoDashboard from "../pages/configpages/Home/NoDashboard";

const loader = (f) => import(`../pages/configpages${f}.js`);
const defaultErrorHandler = ({ name, error: { message } }) =>
  `No Page associated: ${name}.\nError: ${message}.`;

const TabRender = ({ url, tab, tabKey }) => {
  //let name = tab.displayName.split(" ").join("");
  const authUserId = useContext(AppContext).authUserId;

  let components = tab.internalLink;

  if (tab.allowExternalLink) {
    return <Frame link={tab.externalLink} name={tab.displayName} authUserId={authUserId}/>;
  } else if (!tab.internalLink) {
    return <NoDashboard />;
  }

  const RenderComponent = ReactDynamicImport({
    name:  `/${components}`,
    loader, 
    errorHandler: defaultErrorHandler
  });

  return (
    <AppContext.Consumer>
      {({ pageContent, token, setAPICallErrors, selectedTreeId }) => {
        let treeId = 4;
        if (
          components === "Delinquency/SelfCureKpi" ||
          components === "Delinquency/RootCauseaAnalysis"
        ) {
          treeId = 2;
        }

        return (
          <RenderComponent
            tabKey={tabKey}
            //link={url}
            token={token}
            kpiId={selectedTreeId}
            treeId={treeId}
            setAPICallErrors={setAPICallErrors}

          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default TabRender;
