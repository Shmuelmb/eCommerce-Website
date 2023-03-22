import React, { useContext } from "react";
import MyContext from "../../../../../../.js/MyContext";
import "./prod-btns.css";

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
    <button
      className="product-card-btn button-6"
      id={id}
      onClick={(event) => {
        addAmount(cartList, setCartList, event);

        event.stopPropagation();
      }}
    >
      ADD TO CART
    </button>
  );
};

export default Addbtn;
