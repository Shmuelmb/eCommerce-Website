import React from "react";
import AddUser from "./AddUser/AddUser";
import UsersTable from "./UsersTable/UsersTable";
const ManagUsers = () => {
  return (
    <div className="manag-prod-page">
      <AddUser />
      <UsersTable />
    </div>
  );
};

export default ManagUsers;
