import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./ShoppingBarTools.css";
const ShoppingBarTools = () => {
  return (
    <div className="ShoppingBarTools">
      <Filter />
      <Sort />
    </div>
  );
};

export default ShoppingBarTools;
