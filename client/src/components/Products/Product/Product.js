import React from "react";
import "./Product.css";
import Buybtn from "./btns/Buybtn.js";
import Addbtn from "./btns/Addbtn.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../../MyContext";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const Product = ({ id, Urlimage, title, price, category }) => {
  const navigate = useNavigate("products");
  const { setProductID } = useContext(MyContext);
  return (
    <Card className="pCard" sx={{ width: 250, height: 370 }}>
      <Stack>
        <img className="cardImage" src={Urlimage} alt={title} />
        <CardContent>
          <Typography
            className="ty"
            gutterBottom
            variant="body2"
            color="text.secondary">
            {title}
          </Typography>
          <Typography color="black">${price}</Typography>
        </CardContent>
        <Addbtn id={id} />
        <Button
          onClick={() => {
            navigate(`/products/${id}`);
            setProductID(id);
          }}>
          More
        </Button>
      </Stack>
    </Card>
  );
};

export default Product;
