import React, { useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import SearchBar from "./SearchBar/SearchBar";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
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
          ClickFashion
        </h1>
        <div className="btn-navigate">
          <button className="button-6 btn-nav">Home</button>
          <button className="button-6 btn-nav">Men</button>
          <button className="button-6 btn-nav">Woman</button>
          <button className="button-6 btn-nav">Jewelery</button>
          <button className="button-6 btn-nav">About Us</button>
        </div>

        <div className="nav-context">
          {/* <SearchBar /> */}
          <IconButton>
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <Person3OutlinedIcon
              fontSize="large"
              onClick={() => {
                navigate("/login");
              }}
            />
          </IconButton>
          <IconButton>
            <Badge badgeContent={ItemsAmounts} color="error">
              <LocalMallOutlinedIcon
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
