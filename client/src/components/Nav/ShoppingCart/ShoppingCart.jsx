import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import "./ShoppingCart.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  upDateUserCartList,
  addAmount,
  removeAmount,
} from "../../../.js/functions";

const ShoppingCart = () => {
  const { cartList, setCartList, setUserCartList, userCartList } =
    useContext(GlobalContext);

  return (
    <ul className="shoppingCart">
      {userCartList &&
        userCartList.map((item, index) => (
          <li key={index} className="itemInCart">
            <img
              src={item.url_img}
              alt={item.title}
              onClick={() => window.open(`/products/${item._id}`, "_blank")}
            />
            <h5>{item.title}</h5>
            <p className="p2">Price: {(item.price * item.Amount).toFixed(2)}</p>
            <p className="p2"> Amount: {item.Amount}</p>

            <AddOutlinedIcon
              fontSize="large"
              id={item._id}
              onClick={(event) => {
                addAmount(cartList, setCartList, event);
                upDateUserCartList(cartList, setUserCartList);
              }}
            />
            <DeleteForeverOutlinedIcon
              fontSize="large"
              id={item._id}
              onClick={(event) => {
                removeAmount(cartList, setCartList, event);
                upDateUserCartList(cartList, setUserCartList);
              }}
            />
          </li>
        ))}
    </ul>
  );
};

export default ShoppingCart;
