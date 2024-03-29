import React, { useContext } from "react";
import Addbtn from "./Addbtn/Addbtn.jsx";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext/GlobalContext.jsx";
import Zoom from "@mui/material/Zoom";
import "./ProductCard.css";
const ProductCard = ({ id, Urlimage, title, price }) => {
  const navigate = useNavigate("products");
  const { setProductID } = useContext(GlobalContext);

  return (
    <Zoom in={true}>
      <div className="product-card">
        <div
          className="cardImage"
          onClick={() => {
            navigate(`/products/${id}`);
            setProductID(id);
          }}
        >
          <div className="card-overlay">
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
