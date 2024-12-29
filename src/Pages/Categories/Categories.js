import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        All Categories
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories?.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c._id}>
            <NavLink
              to={`/shop?category=${c._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  maxWidth: 250,
                  margin: "30px auto",
                  borderRadius: 0,
                  position: "relative",
                }}
              >
                <CardMedia
                  image={
                    "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                  }
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    backgroundPosition: "center",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                  }}
                />
                <CardActionArea>
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      minHeight={300}
                      color={"common.white"}
                      textAlign={"center"}
                      sx={{
                        "& h2": {
                          color: "#fff",
                          letterSpacing: "2px",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          lineHeight: 1.45,
                          fontFamily: "'Playfair Display', serif",
                          mb: "1rem",
                        },
                      }}
                    >
                      <Button
                        sx={{
                          color: "#000",
                          mt: 2,
                          fontSize: "0.9rem",
                        }}
                      >
                        {c.name}
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </Grid>
        ))}
      </Grid>
      <Footer />
      <Copyright />
    </>
  );
};

export default Categories;
