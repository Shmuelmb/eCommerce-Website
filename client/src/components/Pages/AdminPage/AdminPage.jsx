import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../.js/functions";
import { BASE_URL } from "../../../.js/constant-vars";
import Cookies from "universal-cookie";
import MyContext from "../../../.js/MyContext";
const AdminPage = () => {
  const navigate = useNavigate("");
  const cookies = new Cookies();
  const { setIsAdmin, setIsAuth } = useContext(MyContext);
  const adminAuth = async () => {
    try {
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
        setIsAuth(true);
        setIsAdmin(data.massage.IsAdmin);
      } else {
        setIsAuth(false);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    adminAuth();
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
