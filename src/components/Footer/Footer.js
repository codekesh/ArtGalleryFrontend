import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const Footer = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const logo = require("../../images/Homes/logo1.png");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post("/create-subscribers", { name, email });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <footer>
      <div className="left-side">
        <img src={logo} alt="" />
        <div className="footer-links">
          <div className="Explore">
            <h3>Explore</h3>
            <NavLink to="/Shop">
              <p>Shops</p>
            </NavLink>
            <NavLink to="/Event">
              <p>Events</p>
            </NavLink>
            <NavLink to="/News">
              <p>News</p>
            </NavLink>
            <NavLink to="/">
              <p>Exhibitions</p>
            </NavLink>
            <NavLink to="/">
              <p>Collections</p>
            </NavLink>
          </div>
          <div className="About Us">
            <h3>About Us</h3>
            <NavLink to="/">
              <p>People</p>
            </NavLink>
            <NavLink to="/">
              <p>Contact us</p>
            </NavLink>
            <NavLink to="/">
              <p>FAQs</p>
            </NavLink>
          </div>
          <div className="Support Us">
            <h3>Support Us</h3>
            <NavLink to="/">
              <p>Follow Us</p>
            </NavLink>
            <NavLink to="/">
              <p>Share link</p>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit} className="form">
          <h2>Subscribe to us to know about events, exhibitions and news</h2>
          <TextField
            label="Full Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            InputProps={{
              style: {
                color: 'white',
                height: '50px',
              }
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              }
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            InputProps={{
              style: {
                color: 'white',
                height: '50px',
              }
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              }
            }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              color: "white",
              background: "#D0006E",
              width: "150px",
              borderRadius: "20px",
            }}
          >
            Subscribe
          </Button>
        </form>
        <div className="icons">
          <i className="fa-brands fa-lg fa-twitter"></i>
          <i className="fa-brands fa-lg fa-facebook-f"></i>
          <i className="fa-brands fa-lg fa-instagram"></i>
          <i className="fa-brands fa-lg fa-linkedin-in"></i>
          <i className="fa-brands fa-lg fa-pinterest"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
