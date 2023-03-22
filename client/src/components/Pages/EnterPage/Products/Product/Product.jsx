import React from "react";
import "./Product.css";
import Addbtn from "./btns/Addbtn.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../../../../MyContext";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Zoom from "@mui/material/Zoom";

const Product = ({ id, Urlimage, title, price }) => {
  const navigate = useNavigate("products");
  const { setProductID } = useContext(MyContext);
  return (
    <Zoom in={true}>
      <Card className="product-card" sx={{ width: 250, height: 300 }}>
        <Stack>
          <div
            className="card-hover"
            onClick={() => {
              navigate(`/products/${id}`);
              setProductID(id);
            }}
          >
            <Addbtn id={id} />
          </div>

          <img className="cardImage" src={Urlimage} alt={title} />
          <CardContent>
            <Typography
              className="ty"
              gutterBottom
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>
            <Typography color="black">${price}</Typography>
          </CardContent>
        </Stack>
      </Card>
    </Zoom>
  );
};

export default Product;
