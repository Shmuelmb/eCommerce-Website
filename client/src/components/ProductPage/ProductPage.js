import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import Addbtn from "../Products/Product/btns/Addbtn";
import Buybtn from "../Products/Product/btns/Buybtn";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/getProduct/${productid}`
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
    <div className="container">
      <div className="card">
        <img src={product.image} alt={product.title} />
        <div className="detlais">
          <div className="text">
            <h4>{product.title}</h4>
            <p>{product.description}</p>

            <h3>${product.price}</h3>
          </div>

          <Addbtn id={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
