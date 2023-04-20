import React from "react";
import Filter from "./Filter/Filter";
import "./BarTools.css";
const BarTools = () => {
  return (
    <div className="BarTools">
      <div className="BarTools-container">
        <h3>PRICE RANGE</h3>
        <Filter />
        <div className="br"></div>
      </div>
    </div>
  );
};

export default BarTools;
