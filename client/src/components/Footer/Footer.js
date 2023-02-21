import React from "react";
import "./Footer.css";
import logo from "../../images/logo-red.jpg";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="footer-content">
        <div className="links">
          <h3>Links</h3>
          <p>Sign in</p>
          <p>Our services</p>
        </div>
        <div className="contact-me">
          <h3>Contact us</h3>
          <p>shmuel.cohen0@gmail.com</p>
        </div>

        <div className="follow-me">
          <h3>Follow me</h3>
          <IconContext.Provider value={{ size: "2rem" }}>
            <div>
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
