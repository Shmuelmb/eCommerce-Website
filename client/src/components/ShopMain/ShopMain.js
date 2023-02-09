import React from "react";
import "./ShopMain.css";
import Products from "../Products/Products";
import ShoppingBarTools from "../ShoppingBarTools/ShoppingBarTools";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
const ShopMain = () => {
  return (
    <div className="ShopMain">
      <ShoppingBarTools />
      <Products />
    </div>
  );
};

export default ShopMain;
