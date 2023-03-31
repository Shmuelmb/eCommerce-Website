import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../../.js/MyContext";
import "./ShoppingCart.css";
import Button from "@mui/material/Button";
import {
  upDateUserCartList,
  addAmount,
  removeAmount,
} from "../../../.js/functions";
const ShoppingCart = () => {
  const { cartList, setCartList, setUserCartList, userCartList } =
    useContext(MyContext);

  return (
    <div className="shoppingCart">
      {userCartList &&
        userCartList.map((item, index) => (
          <div key={index} className="itemInCart">
            <img src={item.url_img} alt={item.title} />
            <h5>{item.title}</h5>
            <p className="p2">Price: {(item.price * item.Amount).toFixed(2)}</p>
            <p className="p2"> Amount: {item.Amount}</p>
            <Button
              size="small"
              color="error"
              variant="contained"
              id={item._id}
              onClick={(event) => {
                removeAmount(cartList, setCartList, event);
                upDateUserCartList(cartList, setUserCartList);
              }}
            >
              -
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              id={item._id}
              onClick={(event) => {
                addAmount(cartList, setCartList, event);
                upDateUserCartList(cartList, setUserCartList);
              }}
            >
              +
            </Button>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCart;
