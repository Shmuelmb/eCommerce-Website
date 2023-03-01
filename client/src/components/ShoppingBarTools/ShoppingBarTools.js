import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./ShoppingBarTools.css";
const ShoppingBarTools = () => {
  return (
    <div className="ShoppingBarTools">
      {/* <Filter /> */}
      <div className="categories-list">
        <h3>CATEGORIES</h3>

        <p>New Arrivals</p>
        <p>Man</p>
        <p>Woman</p>
        <p>Jewelery</p>
      </div>
      <div className="br"></div>
      <h3>PRICE RANGE</h3>
      <Sort />
    </div>
  );
};

export default ShoppingBarTools;
