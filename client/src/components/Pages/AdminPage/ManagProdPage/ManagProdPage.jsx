import React from "react";
import "./ManagProdPage.css";
import ProdTable from "./ProdTable/ProdTable";
import AddProd from "./AddProd/AddProd";
const ManagProdPage = () => {
  return (
    <div className="manag-prod-page">
      <AddProd />
      <ProdTable />
    </div>
  );
};

export default ManagProdPage;
