import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../../../.js/constant-vars";
const UsersTable = () => {
  const [state, setState] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/getAllUsers`);
      const data = await response.json();
      setState(data);
    } catch (err) {
      console.log(err);
    }
  };
  const removeUser = async (id) => {
    try {
      const req = await fetch(`${BASE_URL}/api/users/deleteUser/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [removeUser]);

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr className="table-head">
            <th>item</th>
            <th>UserName</th>
            <th>Email</th>
            <th>IsAdmin</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {state.map((val, key) => {
            return (
              <tr key={val._id}>
                <td>{key + 1}</td>
                <td>{val.UserName}</td>
                <td>{val.Email}</td>
                <td>{`${val.IsAdmin}`}</td>
                <td>
                  <button onClick={() => removeUser(val._id)}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
