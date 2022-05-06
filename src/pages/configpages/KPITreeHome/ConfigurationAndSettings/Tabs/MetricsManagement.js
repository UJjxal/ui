import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../../AppProvider";
import KPIMetricsMaintenance from "../../../KPISandbox/KPIMetricsMaintenance";

const MetricsManagement = () => {
  const { token, hasRights } = useContext(AppContext);
  const [metricsModal, setMetricsModal] = useState(false);
  const toggleMetricsModal = () => {
    setMetricsModal((prevMetricsModal) => !prevMetricsModal);
  };

  return (
    <div className="d-flex justify-content-center">
      {/* <Button
        className="position-absolute"
        variant="contained"
        style={{
          outline: 0,
          display:
            hasRights.includes("Admin") ||
            hasRights.includes("Data Scientist") ||
            hasRights.includes("Data Engineering")
              ? "flex"
              : "none",
        }}
        color="primary"
        onClick={() => toggleMetricsModal()}
      >
        Create Metric
      </Button> */}
      <KPIMetricsMaintenance
        metricsModal={metricsModal}
        toggleMetricsModal={toggleMetricsModal}
        token={token}
      />
    </div>
  );
};

export default MetricsManagement;
