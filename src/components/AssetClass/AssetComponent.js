import React, { useContext, useState, useEffect } from "react";
import AssetCard from "./AssetCard";
import { AppContext } from "./../../AppProvider";
import Skeleton from "@material-ui/lab/Skeleton";
import { CONTEXT } from "../../config";
import Carousel, { CarouselItem } from "../Carousel/Carousel";
import { KPIDomainIcons } from "../../utilities/AllTables";

function AssetComponent() {
  const { menuContent, hasRights, mainMenuLoading } = useContext(AppContext);
  const [activeCard, setActiveCard] = useState('')

  const updateActive = (cardTitle) => {
    setActiveCard(cardTitle);
  }


  let homePage = [];

  const checkAuthorizedTreeCount = (children) => {
    let treeCount = 0;
    children.forEach((tab) => {
      if (tab.userGroups) {
        tab.userGroups.forEach((group) => {
          if (hasRights.includes(group)) {
            treeCount++;
          }
        });
      }
    });
    return treeCount;
  };

  const processChildren = (children) => {
    children.length > 0 && children.forEach((child) => processChild(child));
  };

  const processChild = (menu) => {
    if (menu.link === "/") {
      homePage.push(menu);
    } else {
      menu.children &&
        menu.children.length > 0 &&
        processChildren(menu.children);
    }
  };

  menuContent.forEach((menu) => {
    if (menu.link === "/") {
      homePage.push(menu);
    } else {
      menu.children &&
        menu.children.length > 0 &&
        processChildren(menu.children);
    }
  });

  let newChildren = [];
  let assetCardArray = [];
  let assetCardArrayNames = [];

  if (
    homePage.length > 0 &&
    homePage[0].children &&
    homePage[0].children.length > 0
  ) {
    assetCardArray = homePage[0].children
    assetCardArray = assetCardArray.filter((tab) => tab.allowSubmenu === true)
    assetCardArray.forEach((item) => {
      assetCardArrayNames.push(item.displayName)
    })

    homePage[0].children.forEach((tab) => {
      let foundGroup = false;
      if (tab.userGroups) {
        tab.userGroups.forEach((group) => {
          if (hasRights.includes(group)) {
            foundGroup = true;
          }
        });
      } else {
        foundGroup = true;
      }
      if (foundGroup) {
        newChildren.push({ ...tab });
      }
    });
    homePage[0].children = [...newChildren];
  }

  useEffect(() => {
    //setAssetCardNames(assetCardArrayNames)
  }, [])

  return (
    <>
      <div className="custom-container asset-container">
        <div className="h-3">Asset Classes</div>
        <Carousel>
          {mainMenuLoading ? (
            <>
              {[...Array(8)].map(() => (
                <Skeleton
                  variant="rect"
                  width={192}
                  height={144}
                  animation="wave"
                />
              ))}
            </>
          ) : newChildren.length > 0 ? (
            newChildren.map((item, index) => { 
              let treeCount = checkAuthorizedTreeCount(item.children);
              return (
                <CarouselItem key={`${index}-${item.displayName}`}>
                  <AssetCard
                    key={`${index}-${item.displayName}`}
                    title={item.displayName}
                    navLinkTo={CONTEXT + item.link}
                    analysisCount={treeCount}
                    updateActive={updateActive}
                    activeCard={activeCard}
                    icon={
                      KPIDomainIcons[item.displayName]
                        ? KPIDomainIcons[item.displayName]
                        : "account_tree"
                    }
                  />
                </CarouselItem>
              );
            })
          ) : (
            <AssetCard title={"No Children"} navLinkTo={"#"} />
          )}
        </Carousel>
      </div>
    </>
  );
}

export default AssetComponent;
