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
          <h4>"Owners"</h4>
          <p>— Keshav Tulsyan</p>
        </section>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          officia quidem blanditiis hic fugiat velit, commodi excepturi
          doloremque repellendus sint obcaecati? Laudantium nobis neque, ab amet
          esse maiores mollitia temporibus.
        </h1>
      </section>
      <Footer />
      <Copyright />
    </div>
  );
};

export default About;
