import React from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";

const Event = () => {
  const auction = require("../../images/Events/auction.webp");
  const exhibition = require("../../images/Events/exhibition.jpg");
  const workshops = require("../../images/Events/workshops.webp");
  const talk = require("../../images/Events/Talk Show.jpg");
  const sale = require("../../images/Events/ArtSale.jpg");
  return (
    <>
      <Grid
        style={{
          justifyContent: "center",
          marginTop: "10rem",
          marginBottom: "10rem",
        }}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <Card style={{ width: 200, height: 200 }}>
            <CardMedia component="img" image={auction} alt="auction" />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card style={{ width: 200, height: 200 }}>
            <CardMedia component="img" image={exhibition} alt="exhibition" />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card style={{ width: 200, height: 200 }}>
            <CardMedia component="img" image={workshops} alt="workshops" />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card style={{ width: 200, height: 200 }}>
            <CardMedia component="img" image={talk} alt="talk" />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card style={{ width: 200, height: 200 }}>
            <CardMedia component="img" image={sale} alt="sale" />
          </Card>
        </Grid>
      </Grid>
      <Footer />
      <Copyright />
    </>
  );
};

export default Event;
