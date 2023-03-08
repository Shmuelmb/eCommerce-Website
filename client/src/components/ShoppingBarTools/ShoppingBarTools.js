import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./ShoppingBarTools.css";
const ShoppingBarTools = () => {
  return (
    <div className="ShoppingBarTools">
      <div className="shoptools-container">
        <Filter />

        <div className="br"></div>
        <h3>PRICE RANGE</h3>
        <Sort />
      </div>
    </div>
  );
};

export default ShoppingBarTools;
