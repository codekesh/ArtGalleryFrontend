import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import SearchBar from "../SearchBar/SearchBar";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/CartProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const logo = require("../../images/Homes/logo1.png");
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfully");
    localStorage.removeItem("auth");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <SearchBar />
      <div className="nav-title">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/Shop">
          Shops
        </NavLink>
        <Button
          variant="text"
          style={{
            fontSize: "20px",
            marginRight: "30px",
            textDecoration: "none",
            color: "white",
            fontWeight: 600,
            backgroundColor: "transparent",
            transition: "none",
            bottom: "2px",
            textTransform: "none",
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Services
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#303030",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <NavLink
            to={"/categories"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{
                "&:hover": {
                  backgroundColor: "#f50057",
                  color: "white",
                },
              }}
            >
              All Categories
            </MenuItem>
          </NavLink>
          {categories?.map((c) => (
            <NavLink
              to={`/shop?category=${c._id}`}
              key={c._id}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f50057",
                    color: "white",
                  },
                }}
              >
                {c.name}
              </MenuItem>
            </NavLink>
          ))}
        </Menu>
        <NavLink className="nav-link" to="/Event">
          Events
        </NavLink>
        <NavLink className="nav-link" to="/News">
          News
        </NavLink>
        {!auth.user && (
          <NavLink className="nav-link" to="/About">
            About Us
          </NavLink>
        )}
        <NavLink className="nav-link" to="/Cart">
          <Badge badgeContent={cart?.length} color="success">
            <ShoppingCartIcon />
          </Badge>
        </NavLink>
        {!auth.user ? (
          <>
            <NavLink to="/Login">
              <Button
                variant="contained"
                style={{
                  color: "#D0006E",
                  background: "white",
                  margin: "0px 3rem 0px 0px",
                }}
              >
                Log In
              </Button>
            </NavLink>
            <NavLink to="/Signup">
              <Button
                variant="contained"
                style={{ color: "#D0006E", background: "white" }}
              >
                Sign Up
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="nav-link"
              to={`${
                auth?.user?.role === 1
                  ? "/Admin/Admindashboard"
                  : "/User/Userdashboard"
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink onClick={handleLogout} to="/Login">
              <Button
                variant="contained"
                style={{
                  color: "#D0006E",
                  background: "white",
                  margin: "0px 3rem 0px 0px",
                }}
              >
                Log Out
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
