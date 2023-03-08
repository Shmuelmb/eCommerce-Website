import React, { useContext, useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import Cookies from "universal-cookie";
import MyContext from "../../MyContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./ProfilePage.css";
import Modal from "@mui/material/Modal";

const ProfilePage = () => {
  const cookies = new Cookies();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  const { isAuth, setIsAuth } = useContext(MyContext);

  const auth = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/profile", {
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
          <button className="button-6">Change Password</button>
          <button className="button-6">Delete Account</button>
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
      </div>
    ) : (
      <NotFound />
    )
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
