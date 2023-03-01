import React from "react";
import "./ShopMain.css";
import Products from "../Products/Products";
import ShoppingBarTools from "../ShoppingBarTools/ShoppingBarTools";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
import heroImg from "../../images/hero-image.png";

const ShopMain = () => {
  const {
    setLoading,
    setAllProducts,
    setProducts,
    setCartList,
    addKeyForObjState,
  } = useContext(MyContext);

  // actions
  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/getAllProducts"
      );
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
      addKeyForObjState(setCartList, "Amount", 0, data);
      addKeyForObjState(setCartList, "DateCreated", 0, data);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ShopMain">
      <div className="hero-comp">
        <div className="hero-content">
          <h2>New Arrival</h2>
          <h1>THE SPRING COLLECTION</h1>
          <button className="button-6 ">SHOP NOW</button>
        </div>
        <div className="hero-img">
          <img src={heroImg} alt="hero-img" />
        </div>
      </div>
      <ShoppingBarTools />
      <Products />
    </div>
  );
};

export default ShopMain;
