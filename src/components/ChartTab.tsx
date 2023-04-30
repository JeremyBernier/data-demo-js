import React from "react";
import ScatterPlot from "./ScatterPlot";

const ChartTab = ({ equation, plotData, lineData }) => {
  return (
    <div>
      <h3>{equation}</h3>
      <ScatterPlot plotData={plotData} lineData={lineData} />
    </div>
  );
};

export default ChartTab;
