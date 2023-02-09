import React, { useContext, useEffect } from "react";
import MyContext from "../../../MyContext";
import "./ShoppingCart.css";
import Button from "@mui/material/Button";

const ShoppingCart = () => {
  const { cartList, setCartList } = useContext(MyContext);
  const addAmount = (arr, setArr, eventOfClick) => {
    const newArr = [...arr];
    const clickID = eventOfClick.target.id;
    newArr.map((ev) => {
      if (ev._id === clickID) {
        ev.Amount++;
      }
    });
    setArr(newArr);
  };
  const removeAmount = (arr, setArr, eventOfClick) => {
    const newArr = [...arr];
    const clickID = eventOfClick.target.id;
    newArr.map((ev) => {
      if (ev._id === clickID) {
        ev.Amount--;
        if (ev.Amount === 0) {
          ev.DateCreated = 0;
        }
      }
    });
    setArr(newArr);
  };
  const cartListCopy = [];
  cartList.map((i) => {
    if (i.Amount > 0) {
      cartListCopy.push(i);
      if (i.DateCreated === 0) {
        i.DateCreated = Date.now();
      }
    }
  });
  cartListCopy.sort((a, b) => a.DateCreated - b.DateCreated);

  return (
    <div className="shoppingCart">
      {cartListCopy.map((item, index) => (
        <div key={index} className="itemInCart">
          <img src={item.image} alt={item.title} />
          <h5>{item.title}</h5>
          <p className="p2">Price: {item.price * item.Amount}</p>
          <p className="p2"> Amount: {item.Amount}</p>
          <Button
            size="small"
            color="error"
            variant="contained"
            id={item._id}
            onClick={(event) => removeAmount(cartList, setCartList, event)}>
            -
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            id={item._id}
            onClick={(event) => addAmount(cartList, setCartList, event)}>
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
