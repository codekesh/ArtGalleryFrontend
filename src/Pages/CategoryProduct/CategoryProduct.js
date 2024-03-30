import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/product-category/${params?.slug}`);
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Category - {category?.name}
      </Typography>
      <Typography variant="h5" align="center">
        {products?.length} result found
      </Typography>
      <Grid container>
        {products?.map((p) => (
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
                image={`/product-photo/${p._id}`}
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
    </div>
  );
};

export default CategoryProduct;
