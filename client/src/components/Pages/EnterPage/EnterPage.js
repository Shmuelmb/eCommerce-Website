import React from "react";
import "./EnterPage.css";
import Products from "./Products/Products";
import ShoppingBarTools from "./ShoppingBarTools/ShoppingBarTools";
import MyContext from "../../../MyContext";
import { useContext, useEffect } from "react";
import Hero from "./Hero/Hero";
const EnterPage = () => {
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
      <Hero />
      <div className="products-container">
        <ShoppingBarTools />
        <Products />
      </div>
    </div>
  );
};

export default EnterPage;
