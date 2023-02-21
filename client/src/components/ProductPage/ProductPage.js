import React, { useState, useEffect, useContext } from "react";
import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import Addbtn from "../Products/Product/btns/Addbtn";
import Grow from "@mui/material/Grow";

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
      <Grow in={true}>
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
      </Grow>
    </div>
  );
};

export default ProductPage;
