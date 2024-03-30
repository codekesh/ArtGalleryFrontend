import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyleCard = styled(Card)({
  width: "30%",
  height: "700px",
  boxShadow: "0px 0px 15px 0px grey",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginTop: "20px",
});

const StyledBox = styled(Box)({
  height: "50px",
  margin: "60px auto",
  display: "flex",
  flexDirection: "column",
});

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [artists, setArtists] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.productData.name);
      setId(data.productData._id);
      setDescription(data.productData.description);
      setPrice(data.productData.price);
      setArtists(data.productData.artists);
      setQuantity(data.productData.quantity);
      setShipping(data.productData.shipping);
      setCategory(data.productData.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/category");
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("artists", artists);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(`/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product Updated Successfully");
      } else {
        toast.error(data?.message);
        navigate("/Admin/Admindashboard/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-product/${id}`);
      toast.success(`${data} Deleted Successfully`);
      navigate("/Admin/Admindashboard/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <>
      <div className="adminDashboardHeader">
        <AdminMenu />
        <StyleCard sx={{ my: 7, ml: 10 }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ my: 2 }}>
              Update Products
            </Typography>
            <Box sx={{ maxWidth: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {categories?.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div>
              <StyledTextField
                label="Name"
                value={name}
                placeholder="Write a name"
                onChange={(e) => setName(e.target.value)}
              />
              <StyledTextField
                label="Description"
                value={description}
                placeholder="Write a description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <StyledTextField
                label="Price"
                value={price}
                placeholder="Write a price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <StyledTextField
                label="Quantity"
                value={quantity}
                placeholder="Write a quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <StyledTextField
                label="Artists"
                value={artists}
                placeholder="Write artists"
                onChange={(e) => setArtists(e.target.value)}
              />
              <Box sx={{ maxWidth: "100%", my: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="shipping-label">Shipping</InputLabel>
                  <Select
                    labelId="shipping-label"
                    id="shipping-select"
                    value={shipping}
                    label="Select Shipping"
                    onChange={(event) => {
                      setShipping(event.target.value);
                    }}
                  >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div style={{ display: "flex", marginTop: "30px" }}>
                <Button
                  variant="contained"
                  sx={{ display: "block", margin: "auto" }}
                  onClick={handleUpdate}
                >
                  Update PRODUCT
                </Button>
                <Button
                  variant="contained"
                  sx={{ display: "block", margin: "auto" }}
                  onClick={handleDelete}
                >
                  Delete PRODUCT
                </Button>
              </div>
            </div>
          </CardContent>
        </StyleCard>
        <StyledBox mb={2}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="photo-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="photo-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              {photo ? "Change Photo" : "Upload Photo"}
            </Button>
          </label>
        </StyledBox>
        {photo && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              {photo.name}
            </Typography>
            <img
              src={URL.createObjectURL(photo)}
              alt="Product"
              height={"200px"}
            />
          </div>
        )}
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default UpdateProduct;
