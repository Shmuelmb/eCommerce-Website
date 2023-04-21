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
        value={value} // הערך שכרגע אני נמצא שם
        onChange={(event) => {
          setValue(event.target.value); // משנה כל רגע את הערך לפי הלחיצות שלי
        }}
        valueLabelDisplay="auto" // מראה את המספר שאני נמצא בו
        min={minDistance}
        max={maxDistance}
        // step={null}  marks on input range
        // marks={marks}marks on input range
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
