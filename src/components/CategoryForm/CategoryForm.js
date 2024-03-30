import React from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

const styleCategoryForm = {
  margin: "auto 7%",
  padding: "30px",
  boxShadow: "0px 0px 15px 0px black",
  borderRadius: "20px",
  width: "22%",
};

const CategoryForm = ({
  headline,
  handleSubmit,
  category,
  setCategory,
  styleEditForm,
  buttonLine,
}) => {
  return (
    <>
      <Container
        style={styleEditForm ? {} : styleCategoryForm}
        component="main"
        maxWidth="xs"
      >
        <Typography
          variant="h6"
          align="center"
          style={{ margin: "auto auto 20px auto" }}
        >
          {headline}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Enter new category"
                name="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ display: "block", margin: "auto" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                {buttonLine}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default CategoryForm;
