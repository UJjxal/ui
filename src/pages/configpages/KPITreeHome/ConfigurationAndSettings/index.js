import React, { useState } from "react";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { settingTabs } from "../../../../utilities/AllTables";
import GeneralManagement from "./Tabs/GeneralManagement";
import MetricsManagement from "./Tabs/MetricsManagement";
import CohortManagement from "./Tabs/CohortManagement";
import DataCatalogManagement from "./Tabs/DataCatalogManagement";
import ParameterManagement from "./Tabs/ParameterManagement/ParameterManagement";

const ConfigurationAndSettings = () => {
  const [value, setValue] = useState("parameter-management");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mb-5">
      <TabContext value={value} className="tab-context">
        <div className="border-bottom px-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kpi--heading font-weight-bold px-3 py-2">
            Configuration & Settings
            </div>
          </div>
        </div>
        <div className="config-tabs d-flex justify-content-center">
          <TabList
            onChange={handleChange}
            className="tab-list"
            indicatorColor="primary"
            textColor="primary"
          >
            {settingTabs.map((item) => (
              <Tab className="no-outline" key={item.id} label={item.label} value={item.value} />
            ))}
          </TabList>
        </div>
      </TabContext>

      <TabContext value={value} className="tab-context">
        {settingTabs.map((item, i) => (
          <TabPanel key={i} value={item.value} className="container">
            {item.value === "first-business-day" && <GeneralManagement />}
            {item.value === "metrics-management" && <MetricsManagement />}
            {item.value === "cohort-management" && <CohortManagement />}
            {item.value === "data-catalog-management" && (
              <DataCatalogManagement />
            )}
            {item.value === "parameter-management" && <ParameterManagement />}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};

export default ConfigurationAndSettings;
