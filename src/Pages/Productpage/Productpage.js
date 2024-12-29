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
  Container,
  Divider,
  Paper,
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
      <Container sx={{ py: 2 }}>
        {product._id && (
          <Paper elevation={4} sx={{ p: 3, borderRadius: "10px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <img
                  src={`/product-photo/${product?._id}`}
                  alt={product?.name}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                {product.category && (
                  <Typography variant="subtitle1" color="text.primary">
                    Category: {product.category.name}
                  </Typography>
                )}
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      <Divider sx={{ my: 3 }} />

      <Container>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>

        {relatedProducts.length < 1 && (
          <Typography>No Similar Products found</Typography>
        )}

        <Grid container spacing={4}>
          {relatedProducts?.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p._id}>
              <Card
                sx={{
                  maxWidth: 280,
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
                  sx={{ borderRadius: "10px 10px 0 0" }}
                />
                <CardContent>
                  <Typography variant="h6" color="text.primary">
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description.substring(0, 25)}...
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${p.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 3 }} />

      <Footer />
      <Copyright />
    </>
  );
};

export default Productpage;
