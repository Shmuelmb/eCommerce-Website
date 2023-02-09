import React from "react";
import "./btn.css";
import Button from "@mui/material/Button";
const Buybtn = ({ title, id }) => {
  return (
    <Button color="error" name={title} id={id}>
      Buy Now!
    </Button>
  );
};

export default Buybtn;
