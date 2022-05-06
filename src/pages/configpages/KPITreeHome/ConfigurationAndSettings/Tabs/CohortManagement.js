import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../../AppProvider";
import KPICohortsMaintenance from "../../../KPISandbox/KPICohortsMaintenance";

const CohortManagement = () => {
  const { token, hasRights } = useContext(AppContext);
  const [cohortsModal, setCohortsModal] = useState(false);
  const toggleCohortsModal = () => {
    setCohortsModal((prevCohortsModal) => !prevCohortsModal);
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
        onClick={() => toggleCohortsModal()}
      >
        Create Cohort
      </Button> */}

      <KPICohortsMaintenance
        cohortsModal={cohortsModal}
        toggleCohortsModal={toggleCohortsModal}
        token={token}
      />
    </div>
  );
};

export default CohortManagement;
