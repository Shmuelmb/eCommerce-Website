import React, { useContext } from "react";
import MyContext from "../../../../MyContext";
import "./btn.css";
import Button from "@mui/material/Button";

const Addbtn = ({ id }) => {
  const { setCartList, cartList } = useContext(MyContext);

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

  return (
    <Button
      color="success"
      id={id}
      onClick={(event) => {
        addAmount(cartList, setCartList, event);
      }}
      >
      Add to cart
    </Button>
  );
};

export default Addbtn;
