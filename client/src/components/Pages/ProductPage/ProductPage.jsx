import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import Addbtn from "../CategoryPage/ProductCard/Addbtn/Addbtn";
import Grow from "@mui/material/Grow";
import { BASE_URL } from "../../../.js/constant-vars";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/products/getProduct/${productid}`
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
