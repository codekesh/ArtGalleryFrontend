import React from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import "./About.css";

const About = () => {
  const own_img1 = require("../../images/Homes/keshav.jpeg");
  return (
    <div>
      <section className="about">
        <section className="owner">
          <img src={own_img1} alt="" />
          <h4>"Founder"</h4>
          <p>— Keshav Tulsyan</p>
        </section>
        <h2>
          I am Keshav Tulsyan graduated in 2024 from IIIT Trichy major in CSE. I would like to introduce the best and India's biggest no. 1 platform for sharing magnificent art, purchasing and selling artworks with different categories, regular events and daily blogs. Jump on our platform for experience our services. Thanks!
        </h2>
      </section>
      <Footer />
      <Copyright />
    </div>
  );
};

export default About;
