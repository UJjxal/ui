/** configtabs/Therapy/ModelSummary, configtabs/Hypertension/ModelSummaryPatient */
import React, { Component } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

const Chart = (props) => {
  console.log("Chart123", props);
  return (
    <React.Fragment>
      {/* <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Count"
          legendType="none"
          fill="#008efa"
          barSize={55}
          label={{ fill: "white" }}
        />
      </BarChart>
      {props.footerData ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "center",
          }}
        >
          {props.footerData.map((mdl) => (
            <h6>
              {mdl.metrics}={mdl.value}
            </h6>
          ))}
        </div>
      ) : null} */}
    </React.Fragment>
  );
};

export default Chart;
