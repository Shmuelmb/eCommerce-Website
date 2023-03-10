import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoppingBarTools from "../EnterPage/ShoppingBarTools/ShoppingBarTools";
import "./CategoryPage.css";
import ProductCard from "./ProductCard/ProductCard";
const CategoryPage = () => {
  const { category } = useParams();
  const [list, setList] = useState();
  const Category = category.toUpperCase();

  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/prods/productsByCategoryController/${Category}`
      );
      const data = await response.json();
      setList(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    list && (
      <div className="CategoryPage">
        <h1>{Category}'S COLLECTION</h1>
        <div className="products-container">
          <ShoppingBarTools />
          <div className="p">
            <div className="products-sort">
              <select>
                <option disabled={true} selected={true}>
                  SORT
                </option>
                <option>HIGH TO LOW</option>
                <option>LOW TO HIGH</option>
              </select>
            </div>

            <div className="products-list">
              {list.map((event, index) => {
                return (
                  <ProductCard
                    category={event.category}
                    key={index + 10}
                    Urlimage={event.goods_img}
                    id={event._id}
                    title={event.goods_name}
                    price={event.retailPrice.amount}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CategoryPage;
