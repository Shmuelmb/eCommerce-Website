import React from "react";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const navigate = useNavigate("");
  return (
    <div>
      <h1>Hello there &#128075;</h1>
      <h3>What you want to do ?</h3>
      <div className="nav-management">
        <button onClick={() => navigate("/admin/product-management")}>
          Product management
        </button>
        <button>User management</button>
      </div>
    </div>
  );
};

export default AdminPage;
