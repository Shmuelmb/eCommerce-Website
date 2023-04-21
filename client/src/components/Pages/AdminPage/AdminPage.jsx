import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../.js/functions";
import { BASE_URL } from "../../../.js/constant-vars";
import Cookies from "universal-cookie";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import LoadingPage from "../LoadingPage/LoadingPage";
const AdminPage = () => {
  const navigate = useNavigate("");
  const cookies = new Cookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const adminAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/users/admin`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: ` ${cookies.get("TOKEN")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    adminAuth();
    scrollToTop();
  }, []);

  return !loading ? (
    isAdmin ? (
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
    ) : (
      <NotFoundPage />
    )
  ) : (
    <LoadingPage />
  );
};

export default AdminPage;
