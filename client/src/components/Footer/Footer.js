import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="logo">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          ClickFashion
        </h1>
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
