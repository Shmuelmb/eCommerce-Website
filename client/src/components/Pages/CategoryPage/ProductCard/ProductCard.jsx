import React from "react";
import Addbtn from "./Addbtn/Addbtn.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../../../.js/MyContext.js";
import Zoom from "@mui/material/Zoom";
import "./ProductCard.css";
const ProductCard = ({ id, Urlimage, title, price }) => {
  const navigate = useNavigate("products");
  const { setProductID } = useContext(MyContext);
  return (
    <Zoom in={true}>
      <div className="product-card">
        <div className="cardImage">
          <div
            className="card-overlay"
            onClick={() => {
              navigate(`/products/${id}`);
              setProductID(id);
            }}
          >
            <Addbtn id={id} />
          </div>
          <img src={Urlimage} alt={title} />
        </div>
        <div className="card-content">
          <span className="ty">{title}</span>
          <span> ${price}</span>
        </div>
      </div>
    </Zoom>
  );
};

export default ProductCard;
