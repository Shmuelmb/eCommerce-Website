import React, { useState, useEffect } from "react";
import "./ManagProdPage.css";
import ProdTable from "./ProdTable/ProdTable";
import AddProd from "./AddProd/AddProd";
const ManagProdPage = () => {
  const [state, setState] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/getAllProducts"
      );
      const data = await response.json();
      setState(data);
    } catch (err) {
      console.log(err);
    }
  };
  const removeItem = async (id) => {
    try {
      const req = await fetch(
        `http://localhost:8000/api/products/deleteProduct/${id}`,
        { method: "DELETE" }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [removeItem]);

  return (
    <div className="manag-prod-page">
      <AddProd />
      <ProdTable />
    </div>
  );
};

export default ManagProdPage;
