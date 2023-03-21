import React, { useContext } from "react";
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
    localStorage.setItem("usersList", JSON.stringify(cartList));
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
      localStorage.setItem("usersList", JSON.stringify(cartListCopy));

      if (i.DateCreated === 0) {
        i.DateCreated = Date.now();
      }
    }
  });

  return (
    <div className="shoppingCart">
      {cartListCopy.map((item, index) => (
        <div key={index} className="itemInCart">
          <img src={item.url_img} alt={item.title} />
          <h5>{item.goods_name}</h5>
          <p className="p2">Price: {(item.price * item.Amount).toFixed(2)}</p>
          <p className="p2"> Amount: {item.Amount}</p>
          <Button
            size="small"
            color="error"
            variant="contained"
            id={item._id}
            onClick={(event) => removeAmount(cartList, setCartList, event)}
          >
            -
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            id={item._id}
            onClick={(event) => addAmount(cartList, setCartList, event)}
          >
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
