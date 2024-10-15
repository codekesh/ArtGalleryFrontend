import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <h1>All Categories</h1>
      <div>
        {categories?.map((c) => (
          <NavLink to={`/shop?category=${c._id}`} key={c._id}>
            <Button>{c.name}</Button>
          </NavLink>
        ))}
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Categories;
