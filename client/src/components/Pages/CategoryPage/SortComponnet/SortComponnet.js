import React, { useContext } from "react";
import MyContext from "../../../../MyContext";
import "./SortComponnet.css";
const SortComponnet = () => {
  const { setIsChoosenSortH2L, isChoosenSortH2L } = useContext(MyContext);
  return (
    <div className="products-sort">
      <select
        onChange={(event) => {
          event.target.value === "HIGH TO LOW"
            ? setIsChoosenSortH2L(true)
            : setIsChoosenSortH2L(false);
          console.log(isChoosenSortH2L);
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
