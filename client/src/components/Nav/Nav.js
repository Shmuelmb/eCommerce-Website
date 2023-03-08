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
import MyContext from "../../MyContext";

const Nav = () => {
  const { cartList } = useContext(MyContext);

  // state obj
  const [state, setState] = useState({ right: false });
  const [ItemsAmounts, setItemsAmounts] = useState(0);
  const navigate = useNavigate();

  //func
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
    let y = 0;
    cartList.forEach((x) => (y += x.Amount));
    setItemsAmounts(y);
  }, [cartList]);
  return (
    <div className="nav-container">
      <div className="nav">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          CLICK FASHION
        </h1>
        <div className="btn-navigate">
          <button className="button-6 btn-nav">Home</button>
          <button className="button-6 btn-nav">Men</button>
          <button className="button-6 btn-nav">Woman</button>
          <button className="button-6 btn-nav">Jewelery</button>
          <button className="button-6 btn-nav">About Us</button>
        </div>

        <div className="nav-icon">
          {/* <SearchBar /> */}
          <IconButton>
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("/login");
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
      </div>
    </div>
  );
};

export default Nav;
