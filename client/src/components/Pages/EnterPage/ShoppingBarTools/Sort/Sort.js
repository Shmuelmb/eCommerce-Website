import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../../../../MyContext";
import "./Sort.css";
import Slider from "@mui/material/Slider";

// l2h === false
// h2l === true
const Sort = () => {
  const {
    products,
    createListOfKey,
    productsFilter,
    setChoosenSortPrice,
    isChoosenSortH2L,
    setIsChoosenSortH2L,
  } = useContext(MyContext);

  //func
  const handleToggleChoosenSort = () => {
    isChoosenSortH2L === false
      ? setIsChoosenSortH2L(true)
      : setIsChoosenSortH2L(false);
  };

  //actions
  const priceList = createListOfKey(products, "price");
  priceList.sort((a, b) => a - b);
  // const marks = []; marks on input range
  // priceList.map((price) => { marks on input range
  //   marks.push({
  //     value: price,
  //   });
  // });
  const minDistance = priceList[0];
  const maxDistance = priceList[priceList.length - 1];
  const [value, setValue] = useState([0, 9999]);

  return (
    <div className="sort">
      <Slider
        value={value} // הערך שכרגע אני נמצא שם
        onChange={(event) => {
          setValue(event.target.value); // משנה כל רגע את הערך לפי הלחיצות שלי
        }}
        valueLabelDisplay="auto" // מראה את המספר שאני נמצא בו
        min={1}
        max={20}
        // step={null}  marks on input range
        // marks={marks}marks on input range
      />
      <div className="price-view">
        <p>{value[0]}$</p>
        <p>{value[1]}$</p>
      </div>
      <button onClick={() => setChoosenSortPrice(value)}>Filter</button>
    </div>
  );
};

export default Sort;
