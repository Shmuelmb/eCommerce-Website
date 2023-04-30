import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../GlobalContext/GlobalContext";
import "./Filter.css";
import Slider from "@mui/material/Slider";

// l2h === false
// h2l === true
const Filter = () => {
  const {
    products,
    setChoosenSortPrice,
    isChoosenSortH2L,
    setIsChoosenSortH2L,
    listCategoryProducts,
  } = useContext(GlobalContext);

  //func

  //actions
  const priceList = listCategoryProducts
    .map((p) => p.price)
    .filter((value, index, array) => array.indexOf(value) === index);
  priceList.sort((a, b) => a - b);

  const minDistance = Number(priceList[0]);
  const maxDistance = Number(priceList[priceList.length - 1]);
  const [value, setValue] = useState([minDistance, maxDistance]);

  return (
    <div className="sort">
      <Slider
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        valueLabelDisplay="auto"
        min={minDistance}
        max={maxDistance}
      />
      <div className="price-view">
        <p>${value[0]}</p>
        <p>${value[1]}</p>
      </div>
      <button className="button-6" onClick={() => setChoosenSortPrice(value)}>
        FILTER
      </button>
    </div>
  );
};

export default Filter;
