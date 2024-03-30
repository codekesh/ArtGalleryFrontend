import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const updatePage = {
  display: "flex",
  flexDirection: "row",
};

const productlist = {
  width: "80%",
  padding: "10px",
};

const Product = () => {
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div style={updatePage}>
        <AdminMenu />
        <article style={productlist}>
          <Typography variant="h4" align="center" sx={{ mt: 3 }}>
            All Products Lists
          </Typography>
          <Grid container>
            {product.map((p) => (
              <Grid item xs={12} sm={3} key={p._id}>
                <Link to={`/Admin/Admindashboard/product/${p.slug}`}>
                  <Card
                    sx={{
                      maxWidth: 280,
                      margin: "10% 0% 10% 5%",
                      borderRadius: "15px",
                      "&:hover": {
                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="194"
                      image={`/product-photo/${p._id}`}
                      alt={p.name}
                      style={{}}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {p.category.name}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        {p.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        ${p.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </article>
      </div>
      <Footer></Footer>
      <Copyright></Copyright>
    </>
  );
};

export default Product;
