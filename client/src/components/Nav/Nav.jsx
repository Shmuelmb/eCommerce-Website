import React, { useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchBar from "./SearchBar/SearchBar";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MyContext from "../../.js/MyContext";
import { upDateUserCartListAfterReload } from "../../.js/functions";

const Nav = () => {
  const {
    loadingAppData,
    cartList,
    isAuth,
    userCartList,
    setUserCartList,
    setCartList,
  } = useContext(MyContext);
  // state obj
  const [state, setState] = useState({ right: false });
  const [ItemsAmounts, setItemsAmounts] = useState();
  const navigate = useNavigate();

  //func
  const toggle = () => {
    const nav = document.getElementById("nav");
    if (nav.className === "nav") {
      nav.className = "responsive";
    } else {
      nav.className = "nav";
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    upDateUserCartListAfterReload(cartList, setCartList);
  }, [loadingAppData]);
  useEffect(() => {
    let y = 0;
    userCartList.forEach((x) => (y += x.Amount));
    setItemsAmounts(y);
  }, [userCartList]);
  return (
    <div className="nav-container">
      <div className="nav" id="nav">
        <div className="btn-navigate">
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/men");
            }}
          >
            MEN
          </button>
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/women");
            }}
          >
            WOMEN
          </button>
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/jewellery");
            }}
          >
            JEWELLERY
          </button>
        </div>
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          BOTTEGA VENETA
        </h1>

        <div className="nav-icon">
          {/* <SearchBar /> */}
          <IconButton>
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => {
              isAuth ? navigate("/profile") : navigate("/login");
            }}
          >
            <PermIdentityOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <Badge badgeContent={ItemsAmounts} color="error">
              <ShoppingBagOutlinedIcon
                fontSize="large"
                onClick={toggleDrawer("right", true)}
              />
            </Badge>
          </IconButton>

          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <ShoppingCart />
          </Drawer>
        </div>
        <div
          className="collapse"
          onClick={() => {
            toggle();
          }}
        >
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default Nav;
