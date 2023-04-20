import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import Link from "@mui/material/Link";
import { IconContext } from "react-icons";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li>about us</li>
            <li>our services</li>
            <li>privacy policy</li>
            <li>affiliate program</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>get help</h4>
          <ul>
            <li>FAQ</li>
            <li>shipping</li>
            <li>returns</li>
            <li>order status</li>
            <li>payment options</li>
          </ul>
        </div>
        <div className="footer-links ">
          <h4>online shop</h4>
          <ul>
            <li>watch</li>
            <li>bag</li>
            <li>shoes</li>
            <li>dress</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>follow us</h4>
          <IconContext.Provider value={{ size: "2rem" }}>
            <div className="social-m-icons">
              <Link
                href="https://www.linkedin.com/in/shmuel-cohen-b59501228/"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="none"
              >
                <AiOutlineLinkedin className="footer-icon" />
              </Link>
              <Link
                href="https://github.com/Shmuelmb"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="none"
              >
                <AiOutlineGithub className="footer-icon" />
              </Link>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
