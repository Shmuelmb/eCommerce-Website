import React from "react";
import "./Footer.css";
import logo from "../../images/logo-red.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div class="links">
        <h3>Links</h3>
        <span>Sign in</span>
        <span>Our services</span>
        <span>portfolio</span>
        <span>spanbcdf</span>
        <span>Support</span>
        <span>Term & condition</span>
      </div>
      <div className="contact-us">
        <h3>Contact us</h3>
        <p>awfdkjNEBflhqEWBFLqhweBFlqhwkF QWFH bqwlFJ HQLbjwf LQ wf</p>
        <div className="icons">
          <img />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
