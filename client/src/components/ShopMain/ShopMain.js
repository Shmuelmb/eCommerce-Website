import React from "react";
import "./ShopMain.css";
import Products from "../Products/Products";
import ShoppingBarTools from "../ShoppingBarTools/ShoppingBarTools";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
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
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ShopMain">
      <ShoppingBarTools />
      <Products />
    </div>
  );
};

export default ShopMain;
