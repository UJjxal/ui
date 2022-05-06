import React, {useContext, useEffect, lazy, Suspense} from "react";
import ReactDynamicImport from "react-dynamic-import";

import { AppContext } from "../AppProvider";
import Frame from "../pages/configpages/Home/Frame";
import { CONTEXT, URL} from "../config";
import HeaderSOISelection from "./HeaderSOISelection";
import Loader from '../utilities/Loader';

const loader = (f) => import(`../pages/configpages${f}.js`);
//SI-262 To set User specified SOI domains - IsSOIDomainBased

// Check in menu if the selected link has children with allowSOIHome- First Menu Level Check only 
const checkMenuForSOIHomeChild = (menu, pageLink) => {
  // console.log(menu, pageLink);
  let returnValue = false;
  let selectedItem = menu.filter((item) => item.link === pageLink);
  if (selectedItem.length > 0) {
    selectedItem[0].children.forEach((child) => {
      if (child.allowSOIHome) {
        returnValue = true;
      }
    });
  }
  return returnValue;
};

const linkToOpen = (page, childIsDomain) => {
  // console.log("PAGE:",page," childIsDomain:", childIsDomain );
  if (page.link === "/") {
    if (!childIsDomain) {
      return "/Home/home";
    } else {
      return "/Home/Blank";
    }
  }

  if (page.allowSubmenu) {
    if (!childIsDomain) {
      if (page.allowSOIHome) {
        return "/Home/Home_KPI_org";
      } else {
        return "/Home/home";
      }
    } else if (childIsDomain) {
      return null;
    }
  } else {
    if(page.internalLink){
      return `/${page.internalLink}`;
    }else{
      return "/Home/NoLink";
    }
  }
  
};

const PageRouter = (props) => {

  const {    match: { url },  } = props;
  const {    location: { pathname },  } = props;


  const getContext = useContext(AppContext)

      let{ token,route,
    setAPICallErrors,
    pageContent,
    authUser,
    IsSOIDomainBased,
    menuContent,
    getPublishedKPIsForSelectedDomain,
    currentPageName,
    setCurrentPageName,
    KPIPublishedTreeListLoading,
    KPISavedTreeListLoading
  } = getContext;

  const selectedRoute = () => {
    let page = getContext.pageContent
      ? getContext.pageContent.filter(path => CONTEXT + path.link === pathname)
      : null;
    getContext.setRoute(page);
    //setCurrentPageName(page[0].displayName)
    // getPublishedKPIsForSelectedDomain(page[0].displayName)
  }

  let t0 = performance.now();
  const page = pageContent
    ? pageContent.filter((page) => CONTEXT + page.link === pathname)
    : null;

  useEffect(() => {
    if (currentPageName !== page[0].displayName) {
      selectedRoute();
    }
  }, [currentPageName])

  let childIsDomain = false;
  if (IsSOIDomainBased && page.length > 0) {
    childIsDomain = checkMenuForSOIHomeChild(menuContent, page[0].link);
  }
  if (page[0].allowExternalLink) {
    return <Frame link={page[0].externalLink} />;
  }

  const _RenderComponent = ReactDynamicImport({
    name:
      linkToOpen(page[0], childIsDomain),
    loader,
  });

  const RenderComponent = lazy(() => import(`../pages/configpages${linkToOpen(page[0], childIsDomain)}.js`));

  let treeID = page[0].treeID ? page[0].treeID : null;
  let KPIdomain = page[0].displayName ? page[0].displayName : "";
  let t1 = performance.now();
  console.log(`${currentPageName} ---Call to ${page[0].displayName} took  ${t1 - t0} milliseconds.`);

  return (
    <Suspense fallback={<div className={`d-flex flex-wrap align-items-center justify-content-center pt-3 ml-4 mt-5`}><Loader /></div>}>
      {(pathname === URL) && <HeaderSOISelection />}
      <RenderComponent
        token={token}
        setAPICallErrors={setAPICallErrors}
        authUser={authUser}
        KPIdomain={KPIdomain}
        pageUrl={pathname}
        treeID={treeID}
      />
    </Suspense>
  );


};

export default PageRouter;
