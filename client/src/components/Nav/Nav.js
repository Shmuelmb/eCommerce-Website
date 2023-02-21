import React, { useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import SearchBar from "../ShoppingBarTools/SearchBar/SearchBar";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
    <div className="Nav">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        ClickMarket
      </h1>
      <SearchBar />

      <Button
        color="error"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button color="error" onClick={() => navigate("about")}>
        About me
      </Button>
      <IconButton>
        <Badge badgeContent={ItemsAmounts} color="error">
          <ShoppingCartOutlinedIcon
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
  );
};

export default Nav;
