import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./ShoppingBarTools.css";
const ShoppingBarTools = () => {
  return (
    <div className="ShoppingBarTools">
      <div className="shoptools-container">
        <h3>PRICE RANGE</h3>
        <Sort />
        <div className="br"></div>
      </div>
    </div>
  );
};

export default ShoppingBarTools;
