import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ManagementShopTable = () => {
  const [state, setState] = useState([]);
  const [keys, setKeys] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/getAllProducts"
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div style={{ height: 400, width: "70%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default ManagementShopTable;
