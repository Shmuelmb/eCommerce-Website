import React, { useContext, useEffect, useState } from "react";
import "./EnterPage.css";
import Hero from "./Hero/Hero";
import MyContext from "../../../MyContext";
import { getMultipleRandom } from "../../../functions/functions.js";
import LoadingPage from "../LoadingPage/LoadingPage";
import menCatImg from "../../../images/men-category.png";
import womanCatImg from "../../../images/women-category.png";
import CarrouselProducts from "./CarrouselProducts/CarrouselProducts";
import { useNavigate } from "react-router-dom";

const EnterPage = () => {
  const [carrouselItems, setCarrouselItems] = useState([]);
  const { allProducts, loading } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    const arr = getMultipleRandom(allProducts, 5);
    setCarrouselItems(arr);
  }, [allProducts]);

  return !loading ? (
    <div className="enter-page">
      <Hero />

      <div className="enter-page-carrousel">
        <h1>MOST POPULAR</h1>
        <CarrouselProducts arr={carrouselItems} />
      </div>
      <div className="enter-page-category-link">
        <div className="cat" onClick={() => navigate("category/men")}>
          <div className="img-cat">
            <img src={menCatImg} />
          </div>
          <h1>MEN</h1>
        </div>
        <div className="cat" onClick={() => navigate("category/women")}>
          <div className="img-cat">
            <img src={womanCatImg} />
          </div>
          <h1>WOMEN</h1>
        </div>
      </div>
      <div className="enter-page-jewelery-link">
        <div
          className="jewelery-img"
          onClick={() => navigate("category/jewelery")}
        >
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
