import React from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import Sponsor from "../../components/Sponsor/Sponsor";
import "./Home.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  const head_img = require("../../images/Homes/fantasy.jpg");
  const purch_img = require("../../images/Homes/woman.jpg");
  const events_img = require("../../images/Homes/events.jpg");
  const clct_img = require("../../images/Homes/collection.jpg");
  const news_img = require("../../images/Homes/collection.jpg");
  const own_img1 = require("../../images/Homes/keshav.jpeg");

  return (
    <>
      <section className="header">
        <img src={head_img} alt="" />
      </section>
      <section className="shops">
        <div className="contents">
          <img className="cont_img" src={purch_img} alt="" />
          <div className="cont_dtl">
            <h1 className="cont_head">Found Artwork</h1>
            <p className="cont_para">
              Want your walls to be of portraits or arrange your showcase with
              some good artwork
            </p>
            <NavLink to="/Shop">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  background: "#D0006E",
                  width: "150px",
                }}
              >
                Go to Shop
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="events">
        <div className="evts">
          <img className="evt_img" src={events_img} alt="" />
          <div className="evt_dtl">
            <h1 className="evt_head">Events</h1>
            <p className="evt_para">Explore, participate and enjoy events</p>
            <NavLink to="/Event">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  background: "#D0006E",
                  width: "150px",
                }}
              >
                Check Event
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="collections">
        <div className="clct">
          <img className="clct_img" src={clct_img} alt="" />
          <div className="clct_dtl">
            <h1 className="clct_head">Collections</h1>
            <p className="clct_para">
              We have exciting collections of arts and crafts that'll amaze you.
            </p>
            <NavLink to="/Event">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  background: "#D0006E",
                  width: "150px",
                }}
              >
                Library
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="news">
        <div className="nws">
          <img className="nws_img" src={news_img} alt="" />
          <div className="nws_dtl">
            <h1 className="nws_head">News</h1>
            <p className="nws_para">
              We publish exciting blogs, upcoming events, new products in stock
              on daily basis.
            </p>
            <NavLink to="/News">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  background: "#D0006E",
                  width: "150px",
                }}
              >
                Read
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
      <Sponsor />
      <section className="owners">
        <img src={own_img1} alt="" />
        <h4>"Owners"</h4>
        <p>— Keshav Tulsyan</p>
      </section>
      <Footer />
      <Copyright />
    </>
  );
};

export default Home;
