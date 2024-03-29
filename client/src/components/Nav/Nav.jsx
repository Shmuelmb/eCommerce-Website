import React, { useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SearchBar from "./SearchBar/SearchBar";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import {
  upDateUserCartListAfterReload,
  toggleDrawer,
} from "../../.js/functions";

const Nav = () => {
  const {
    stateDrawer,
    setStateDrawer,
    loadingAppData,
    cartList,
    isAuth,
    userCartList,
    setUserCartList,
    setCartList,
  } = useContext(GlobalContext);
  // state obj
  const [ItemsAmounts, setItemsAmounts] = useState();
  const navigate = useNavigate();

  //func
  const toggle = () => {
    const nav = document.getElementById("nav");
    const collapse = document.querySelector(".collapse");
    const exitBtnNav = document.querySelector("#exit-btn");
    if (nav.className === "nav") {
      nav.className = "responsive";
      collapse.style.display = "none";
      exitBtnNav.style.display = "block";
      exitBtnNav.classList.remove("exit-btn-close");
    } else {
      nav.className = "nav";
      collapse.style.display = "block";
      exitBtnNav.classList.add("exit-btn-close");
    }
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
        <IconButton
          id="exit-btn"
          onClick={() => toggle()}
          className="exit-btn-close"
        >
          <ExitToAppOutlinedIcon fontSize="large" />
        </IconButton>
        <div className="btn-navigate">
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/men");
              nav.className === "responsive" && toggle();
            }}
          >
            MEN
          </button>
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/women");
              nav.className === "responsive" && toggle();
            }}
          >
            WOMEN
          </button>
          <button
            className="button-6 btn-nav"
            onClick={() => {
              navigate("/category/jewellery");
              nav.className === "responsive" && toggle();
            }}
          >
            JEWELLERY
          </button>
        </div>
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          BOTTEGA VENETA
        </h2>
        <div className="nav-icon">
          {/* <SearchBar /> */}
          <IconButton>
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => {
              isAuth ? navigate("/profile") : navigate("/login");
              nav.className === "responsive" && toggle();
            }}
          >
            <PermIdentityOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={toggleDrawer("right", true, setStateDrawer, stateDrawer)}
          >
            <Badge badgeContent={ItemsAmounts} color="error">
              <ShoppingBagOutlinedIcon fontSize="large" />
            </Badge>
          </IconButton>

          <Drawer
            anchor={"right"}
            open={stateDrawer["right"]}
            onClose={toggleDrawer("right", false, setStateDrawer, stateDrawer)}
          >
            <IconButton onClick={() => setStateDrawer(false)}>
              <KeyboardBackspaceOutlinedIcon fontSize="large" />
            </IconButton>
            <ShoppingCart />
          </Drawer>
        </div>
        <Badge className="collapse" badgeContent={ItemsAmounts} color="error">
          <div
            className="collapse"
            onClick={() => {
              toggle();
            }}
          >
            <i className="fa fa-bars"></i>
          </div>
        </Badge>
      </div>
    </div>
  );
};

export default Nav;
