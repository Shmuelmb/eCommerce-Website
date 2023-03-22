import React from "react";
import Addbtn from "../../EnterPage/Products/Product/btns/Addbtn";
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
        <div
          className="card-hover"
          onClick={() => {
            navigate(`/products/${id}`);
            setProductID(id);
          }}
        >
          <Addbtn id={id} />
        </div>
        <img className="cardImage" src={Urlimage} alt={title} />
        <div className="card-content">
          <span className="ty">{title}</span>
          <span> ${price}</span>
        </div>
      </div>
    </Zoom>
  );
};

export default ProductCard;
