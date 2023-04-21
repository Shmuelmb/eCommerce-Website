import React, { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext/GlobalContext";
import "./SortComponnet.css";
const SortComponnet = () => {
  const { setIsChoosenSortH2L } = useContext(GlobalContext);
  return (
    <div className="products-sort">
      <select
        onChange={(event) => {
          if (event.target.value === "HIGH TO LOW") {
            setIsChoosenSortH2L(event.target.value);
          } else if (event.target.value === "LOW TO HIGH") {
            setIsChoosenSortH2L(event.target.value);
          }
        }}
      >
        <option hidden={true}>SORT</option>
        <option>HIGH TO LOW</option>
        <option>LOW TO HIGH</option>
      </select>
    </div>
  );
};

export default SortComponnet;
