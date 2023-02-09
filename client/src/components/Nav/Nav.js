import React, { useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h1
            onClick={() => {
              navigate("/");
            }}>
            Shop online
          </h1>
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/login");
          }}>
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
          onClose={toggleDrawer("right", false)}>
          <ShoppingCart />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
