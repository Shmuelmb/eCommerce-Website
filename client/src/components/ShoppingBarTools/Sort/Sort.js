import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../../MyContext";
import "./Sort.css";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

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
  const marks = [];
  priceList.map((price) => {
    marks.push({
      value: price,
    });
  });
  const minDistance = priceList[0];
  const maxDistance = priceList[priceList.length - 1];
  const [value, setValue] = useState([0, 9999]);

  return (
    <div className="collection-sort">
      <InputLabel>Sort by price:</InputLabel>

      <Slider
        value={value} // הערך שכרגע אני נמצא שם
        onChange={(event) => {
          setValue(event.target.value); // משנה כל רגע את הערך לפי הלחיצות שלי
          setChoosenSortPrice(event.target.value);
        }}
        valueLabelDisplay="auto" // מראה את המספר שאני נמצא בו
        min={minDistance}
        max={maxDistance}
        step={null}
        marks={marks}
      />
      <p>
        from price:{value[0]}$ to price:{value[1]}$
      </p>
      <Button onClick={handleToggleChoosenSort}>
        {isChoosenSortH2L === false ? "High to Low" : "Low to High"}
      </Button>
    </div>
  );
};

export default Sort;
