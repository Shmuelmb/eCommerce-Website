import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./ShoppingBarTools.css";
import SearchBar from "./SearchBar/SearchBar";
const ShoppingBarTools = () => {
  return (
    <div className="ShoppingBarTools">
      <Filter />
      <Sort />
      <SearchBar />
    </div>
  );
};

export default ShoppingBarTools;
