import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Productpage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data?.productData);
      getSimilarProduct(data?.productData._id, data?.productData.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {product._id && (
          <>
            <img
              src={`/product-photo/${product?._id}`}
              alt={product?.name}
              height="300"
              width={"350px"}
            />
            <div>
              <h1>Details</h1>
              <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              {product.category && <p>Category: {product.category.name}</p>}
              <p>Quantity: {product.quantity}</p>
              <Button size="small" variant="contained">
                Add To Cart
              </Button>
            </div>
          </>
        )}
      </div>

      <hr />
      {relatedProducts.length < 1 && <p>No Similar Products found</p>}
      <Grid container>
        {relatedProducts?.map((p) => (
          <Grid item xs={12} sm={3} key={p._id}>
            <Card
              sx={{
                maxWidth: 280,
                margin: "10% 0% 10% 3%",
                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={`/product-photo/${p?._id}`}
                alt={p.name}
                style={{}}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {p.name}
                </Typography>
                <Typography variant="p" color="text.secondary">
                  {p.description.substring(0, 25)}...
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  ${p.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </Button>
                <Button size="small" variant="contained">
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
      <Copyright />
    </>
  );
};

export default Productpage;
