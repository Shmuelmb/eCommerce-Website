import React, { useEffect } from "react";
import NotFound from "../NotFound/NotFound";
import Cookies from "universal-cookie";

const ProfilePage = () => {
  const cookies = new Cookies();

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
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    auth();
  });

  return (
    <div>
      <h1>Hello</h1>
      <button>Your cart</button>
      <h3>Account setting</h3>
      <div>
        <h4>Personal Information</h4>
        <p>Your full name:</p>
        <p>Your email:</p>
      </div>
      <button>Change Password</button>
      <button>Delete Account</button>
    </div>
  );
};

export default ProfilePage;
