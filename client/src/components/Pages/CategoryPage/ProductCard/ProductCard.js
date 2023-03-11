import React from "react";
import Addbtn from "../../EnterPage/Products/Product/btns/Addbtn.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../../../MyContext.js";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Zoom from "@mui/material/Zoom";
import "./ProductCard.css";
const ProductCard = ({ id, Urlimage, title, price }) => {
  const navigate = useNavigate("products");
  const { setProductID } = useContext(MyContext);
  return (
    <Zoom in={true}>
      <Card className="product-card" sx={{ width: 250, height: 400 }}>
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

          <img className="cardImagee" src={Urlimage} alt={title} />
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

export default ProductCard;
