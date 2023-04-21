import React, { useContext, useEffect, useState } from "react";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Cookies from "universal-cookie";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./ProfilePage.css";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../.js/constant-vars";
import { scrollToTop, toggleDrawer } from "../../../.js/functions";
import ShoppingCart from "../../Nav/ShoppingCart/ShoppingCart";

const ProfilePage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
  };

  const { setIsAuth, isAuth, setStateDrawer, stateDrawer } =
    useContext(GlobalContext);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: ` ${cookies.get("TOKEN")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.massage);
        setIsAdmin(data.massage.IsAdmin);
      } else {
        setIsAuth(false);
        setIsAdmin(false);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/deleteUser/${id}`, {
        method: "delete",
      });
      const msg = await response.json();
      console.log(msg);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
    //scroll the component to top when you enter to the page from route
    scrollToTop();
  }, []);

  return !loading ? (
    <div className="profile-page">
      <h1>Hello {user.UserName}</h1>
      <div className="profile-page-content">
        <div className="personal-info">
          <h2>Personal Info</h2>
          <p>Email: {user.Email} </p>
          <p>Your ID: {user._id}</p>
        </div>
        <div className="personal-cart">
          <h2>My Cart</h2>
          <ShoppingCart />
        </div>
      </div>
      <div className="profile-btn">
        {isAdmin && (
          <button
            className="product-card-btn button-6"
            onClick={() => navigate("/admin")}
          >
            Click here for the admin dashboard
          </button>
        )}
        <button
          className="product-card-btn button-6 btn-profile-mycart"
          onClick={toggleDrawer("right", true, setStateDrawer, stateDrawer)}
        >
          My Cart
        </button>
        <button
          onClick={() => {
            cookies.remove("TOKEN");
            setIsAuth(false);
            navigate("/login");
          }}
          className="product-card-btn button-6"
        >
          Log Out
        </button>
        <button
          className="product-card-btn button-6"
          onClick={() => setOpenModalDelete(true)}
        >
          Delete Account
        </button>
      </div>
      <Modal className="modal-box" open={openModalDelete} onClose={handleClose}>
        <div className="modal-message">
          <h4>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT ?</h4>
          <div className="delete-user-btn-modal">
            <button
              className="button-6"
              onClick={() => {
                deleteUser(user._id);
                setIsAuth(false);
                cookies.remove("TOKEN");
                navigate("/login");
              }}
            >
              YES
            </button>
            <button className="button-6" onClick={handleClose}>
              NO
            </button>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
