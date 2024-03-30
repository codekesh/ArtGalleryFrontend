import React from "react";
import { useSearch } from "../../context/SearchProvider";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <div>
      <h1>Search Results</h1>
      <Grid container>
        {values?.results.map((p) => (
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
                <Button size="small" variant="contained">
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

export default Search;
