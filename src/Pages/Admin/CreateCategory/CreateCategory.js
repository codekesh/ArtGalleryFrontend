import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { toast, ToastContainer } from "react-toastify";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import CategoryForm from "../../../components/CategoryForm/CategoryForm";
import "./CreateCategory.css";
import { FixedSizeList } from "react-window";
import Backdrop from "@mui/material/Backdrop";
import axiosInstance from "../../../api/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("null");
  const [updatedName, setUpdatedName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post("/create-category", { name });
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(`/update-category/${selected._id}`, {
        name: updatedName,
      });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setOpen(false);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/delete-category/${id}`);
      console.log(data)
      if (data.name) {
        toast.success(`${data.name}} is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEditClick = (categories) => {
    setOpen(true);
    setSelected(categories);
    setUpdatedName(categories.name);
  };

  const handleClose = () => setOpen(false);

  const Row = ({ index, style }) => (
    <ListItem style={style} key={categories[index]._id}>
      <ListItemText primary={categories[index].name} />
      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={() => {
          handleEditClick(categories[index]);
        }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          handleDelete(categories[index]._id);
        }}
      >
        Delete
      </Button>
    </ListItem>
  );

  return (
    <>
      <div className="adminDashboardHeader">
        <AdminMenu />
        <CategoryForm
          headline="Create New Category"
          handleSubmit={handleSubmit}
          category={name}
          setCategory={setName}
          buttonLine="Add Category"
        />
        <Box
          sx={{
            width: 410,
            height: 420,
            maxWidth: 360,
            my: 7,
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: "0px 0px 15px 0px grey",
          }}
        >
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            Show Category
          </Typography>
          <FixedSizeList
            height={350}
            width={350}
            itemSize={46}
            itemCount={categories.length}
          >
            {Row}
          </FixedSizeList>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <CategoryForm
                headline="Edit Category"
                category={updatedName}
                setCategory={setUpdatedName}
                handleSubmit={handleUpdate}
                styleEditForm={true}
                buttonLine="Update Category"
              />
            </Box>
          </Fade>
        </Modal>
      </div>
      <Footer />
      <Copyright />
      <ToastContainer />
    </>
  );
};

export default CreateCategory;
