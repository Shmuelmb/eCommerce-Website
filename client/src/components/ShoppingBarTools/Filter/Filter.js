import React from "react";
import "./Filter.css";
import MyContext from "../../../MyContext";
import { useContext, useState } from "react";

const Filter = () => {
  const { onFilterChange, categories, setSearchValue, setChoosenSortPrice } =
    useContext(MyContext);

  return (
    <div className="filter">
      <h3>CATEGORIES</h3>
      {categories.map((i, index) => (
        <button
          onClick={(event) => {
            onFilterChange(event);
            setSearchValue("");
            setChoosenSortPrice([0, 999.99]);
          }}
          key={index + 10}
        >
          {i}
        </button>
      ))}
    </div>
  );
};
export default Filter;
