import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-header">
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            CLICK FASHION
          </h1>
        </div>
        <div className="footer-nav">
          <div className="footer-links">
            <h3>SHOP</h3>
            <p>Register</p>
            <p>Log in</p>
            <p>My account</p>
          </div>
          <div className="footer-links">
            <h3>SHOP</h3>
            <p>Register</p>
            <p>Log in</p>
            <p>My account</p>
          </div>
          <div className="footer-links">
            <h3>SHOP</h3>
            <p>Register</p>
            <p>Log in</p>
            <p>My account</p>
          </div>
        </div>
        <div className="social-m">
          <h2>JOIN OUR NEWSLETTERS</h2>
          <input />
          <IconContext.Provider value={{ size: "2rem" }}>
            <div className="social-m-icons">
              <AiOutlineLinkedin />
              <AiOutlineGithub />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
