import React, { useContext, useEffect, useState } from "react";
import "./EnterPage.css";
import Hero from "./Hero/Hero";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import menCatImg from "../../../images/men-category.png";
import womanCatImg from "../../../images/women-category.png";
import CarrouselProducts from "./CarrouselProducts/CarrouselProducts";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../.js/functions";
import { useLocation } from "react-router-dom";

const EnterPage = () => {
  const { loading } = useContext(GlobalContext);
  const navigate = useNavigate();

  //scroll the component to top when you enter to the page from route
  useEffect(() => {
    scrollToTop();
  }, []);

  return !loading ? (
    <div className="enter-page">
      <Hero />
      <div className="para-enter-page-mobile">
        <p>~ Click With Your Fashion ~</p>
      </div>
      <CarrouselProducts />
      <div className="enter-page-category-link">
        <div className="cat" onClick={() => navigate("category/men")}>
          <div className="img-cat">
            <img src={menCatImg} />
          </div>
          <h2>men</h2>
        </div>
        <div className="cat" onClick={() => navigate("category/women")}>
          <div className="img-cat">
            <img src={womanCatImg} />
          </div>
          <h2>women</h2>
        </div>
      </div>
      <div className="enter-page-jewelery-link">
        <div
          className="jewelery-img"
          onClick={() => navigate("category/jewellery")}
        >
          <div className="jewelery-img-text">
            <h2>Gold Collection</h2>
            <p>Shop Now</p>
          </div>
        </div>
        <div className="jewelery-text">
          <h2>SEND A GIFT TO SOMEONE YOU ADORE</h2>
          <p>as people say, good things come in small packages</p>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default EnterPage;
