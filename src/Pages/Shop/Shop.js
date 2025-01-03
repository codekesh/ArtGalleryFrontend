import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Prices } from "../../components/Prices/Prices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartProvider";
import axiosInstance from "../../api/axiosInstance";

const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/category`);
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setChecked([categoryFromUrl]);
    } else {
      getAllProducts();
    }
  }, [categoryFromUrl]);

  const getAllProducts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/product-list/${page}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    nextPage();
  }, [page]);

  const nextPage = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/product-list/${page}`
      );
      setProducts([...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post("/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
      setFilteredTotal(data?.products.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box sx={{ width: "20%", my: 3, border: "1px solid grey" }}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              borderBottom: "2px solid grey",
            }}
          >
            <FormLabel
              sx={{ width: "100%", ml: 3 }}
              id="demo-radio-buttons-group-label"
            >
              Filters By Category
            </FormLabel>
            {categories?.map((c) => (
              <FormControlLabel
                label={c.name}
                key={c._id}
                control={
                  <Checkbox
                    checked={checked.includes(c._id)}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                }
              />
            ))}
          </FormControl>
          <FormControl sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <FormLabel
              sx={{ width: "100%", ml: 3 }}
              id="demo-radio-buttons-group-label"
            >
              Filters By Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((p) => (
                <FormControlLabel
                  key={p._id}
                  value={p.array}
                  control={<Radio />}
                  label={p.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="error"
            sx={{ m: 2 }}
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </Button>
        </Box>
        <Box sx={{ width: "100%", mt: 3, ml: 2 }}>
          <Typography variant="h3" align="center">
            All Products
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
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {products && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {Array.from(
                {
                  length: Math.ceil((checked.length || radio.length ? filteredTotal : total) / 4),
                },
                (_, i) => i + 1
              ).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "contained" : "outlined"}
                  sx={{ mx: 0.5 }}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
            </Box>

          )}
        </Box>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Shop;
