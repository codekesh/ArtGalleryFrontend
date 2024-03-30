import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <h1>All Categories</h1>
      <div>
        {categories?.map((c) => (
          <NavLink to={`/categories/${c.slug}`} key={c._id}>
            <Button>{c.name}</Button>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Categories;
