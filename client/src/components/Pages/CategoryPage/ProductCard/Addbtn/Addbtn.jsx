import React, { useContext } from "react";
import { GlobalContext } from "../../../../GlobalContext/GlobalContext";
import "./prod-btns.css";
import { upDateUserCartList, addAmount } from "../../../../../.js/functions";
const Addbtn = ({ id }) => {
  const { setCartList, cartList, setUserCartList, userCartList } =
    useContext(GlobalContext);

  return (
    <button
      className="product-card-btn button-6"
      id={id}
      onClick={(event) => {
        addAmount(cartList, setCartList, event);
        upDateUserCartList(cartList, setUserCartList);
        event.stopPropagation();
      }}
    >
      ADD TO CART
    </button>
  );
};

export default Addbtn;
