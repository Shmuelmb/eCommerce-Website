import React, { useContext, useEffect, useState } from "react";
import "./EnterPage.css";
import Hero from "./Hero/Hero";
import MyContext from "../../../MyContext";
import ProductCard from "../CategoryPage/ProductCard/ProductCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import menCatImg from "../../../images/men-category.png";
import womanCatImg from "../../../images/women-category.png";

const EnterPage = () => {
  const [carrouselItems, setCarrouselItems] = useState([]);
  const { allProducts, loading } = useContext(MyContext);
  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  };

  useEffect(() => {
    const arr = getMultipleRandom(allProducts, 5);
    setCarrouselItems(arr);
  }, [allProducts]);

  return !loading ? (
    <div className="enter-page">
      <Hero />

      <div className="enter-page-carrousel">
        <h1>MOST POPULAR</h1>

        <div className="enter-page-carrousel-prods">
          {carrouselItems.map((event, index) => (
            <ProductCard
              category={event.category}
              key={index + 10}
              Urlimage={event.goods_img}
              id={event._id}
              title={event.goods_name}
              price={event.retailPrice.amount}
            />
          ))}
        </div>
      </div>
      <div className="enter-page-category-link">
        <div className="cat ">
          <img className="img-cat" src={menCatImg} />
          <h1>MEN</h1>
        </div>
        <div className="cat ">
          <img className="img-cat" src={womanCatImg} />
          <h1>WOMEN</h1>
        </div>
      </div>
      <div className="enter-page-jewelery-link">
        <div className="jewelery-img">
          <div className="jewelery-img-text">
            <h1>Gold Collection</h1>
            <p>Shop Now</p>
          </div>
        </div>
        <div className="jewelery-text">
          <h2>SEND A GIFT TO SOMEONE YOU ADORE</h2>
          <p>as people say, good things come in small packages</p>
        </div>
      </div>
      <div className="enter-page-shop-on-instagram"></div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default EnterPage;
