import React, { useState, useEffect } from "react";
import "./ManagementShopTable.css";
const ManagementShopTable = () => {
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
    <div className="management-shop-table">
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>item</th>
              <th>category</th>
              <th>title</th>
              <th>price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {state.map((val, key) => {
              return (
                <tr key={val._id}>
                  <td>{key + 1}</td>
                  <td>{val.category}</td>
                  <td>{val.title}</td>
                  <td>{val.price}</td>
                  <td>
                    <button onClick={() => removeItem(val._id)}>remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementShopTable;
