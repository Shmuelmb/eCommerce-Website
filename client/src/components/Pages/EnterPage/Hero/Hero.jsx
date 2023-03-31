import React from "react";
import heroImg from "../../../../images/hero-image.png";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero-comp">
      <div className="hero-content">
        <h1>THE SPRING COLLECTION</h1>
        <button className="button-6 ">SHOP NOW</button>
      </div>
      <div className="hero-img">
        <img src={heroImg} alt="hero-img" />
      </div>
    </div>
  );
};

export default Hero;
