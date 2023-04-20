import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../.js/functions";
const AdminPage = () => {
  const navigate = useNavigate("");

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <h1>Hello there &#128075;</h1>
      <h3>What you want to do ?</h3>
      <div className="nav-management">
        <button onClick={() => navigate("/admin/product-management")}>
          Product management
        </button>
        <button onClick={() => navigate("/admin/users-management")}>
          User's management
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
