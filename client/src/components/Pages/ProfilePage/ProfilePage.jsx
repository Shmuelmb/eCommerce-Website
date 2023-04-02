import React, { useContext, useEffect, useState } from "react";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Cookies from "universal-cookie";
import MyContext from "../../../.js/MyContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./ProfilePage.css";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../.js/constant-vars";

const ProfilePage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
  };

  const { isAuth, setIsAuth } = useContext(MyContext);

  const auth = async () => {
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
        setIsAuth(true);
        setUser(data.massage);
      } else {
        setIsAuth(false);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setLoading(false), 2000);
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
    auth();
  }, []);

  return !loading ? (
    isAuth ? (
      <div className="profile-page">
        <h3>Hello {user.UserName}</h3>
        <h4>What do you wanna do ?</h4>

        <div className="profile-btn">
          <button
            className="button-6"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            My User
          </button>
          <button className="button-6" onClick={() => setOpenModalDelete(true)}>
            Delete Account
          </button>
          <button
            onClick={() => {
              setIsAuth(false);
              cookies.remove("TOKEN");
              navigate("/login");
            }}
            className="button-6"
          >
            Log Out
          </button>
        </div>

        <Modal className="modal-box" open={openModal} onClose={handleClose}>
          <div className="modal-message">
            <h4>Personal Information</h4>
            <p>Your Username: {user.UserName} </p>
            <p>Your email: {user.Email}</p>
            <p>Your ID: {user._id}</p>
            <p>do you admin ?: {user.isAdmin ? "yes" : "no"}</p>
          </div>
        </Modal>
        <Modal
          className="modal-box"
          open={openModalDelete}
          onClose={handleClose}
        >
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
      navigate("/login")
    )
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
