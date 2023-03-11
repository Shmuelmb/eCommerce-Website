import React from "react";
import "./EnterPage.css";
import Products from "./Products/Products";
import ShoppingBarTools from "./ShoppingBarTools/ShoppingBarTools";
import Hero from "./Hero/Hero";
const EnterPage = () => {
  return (
    <div className="ShopMain">
      <Hero />
      <div className="products-container">
        <ShoppingBarTools />
        <Products />
      </div>
    </div>
  );
};

export default EnterPage;
