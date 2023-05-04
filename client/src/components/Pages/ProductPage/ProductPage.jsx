import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import Addbtn from "../CategoryPage/ProductCard/Addbtn/Addbtn";
import Grow from "@mui/material/Grow";
import { scrollToTop } from "../../../.js/functions";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products/getProduct/${productid}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [productid]);

  //scroll the component to top when you enter to the page from route
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="product-page-container">
      <Grow in={true}>
        <figure className="prod-page-card">
          <img src={product.url_img} alt={product.title} />
          <figcaption className="details">
            <h4>{product.title}</h4>
            <p>{product.description}</p>

            <h3>${product.price}</h3>

            <Addbtn id={product._id} />
          </figcaption>
        </figure>
      </Grow>
    </div>
  );
};

export default ProductPage;
