import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";

const StyledCard = styled(Card)({
  width: "23%",
  margin: "8% 1% 8% 3%",
  textAlign: "center",
  boxShadow: "0px 0px 15px 0px grey",
  height: "300px",
});

const StyledNavLink = styled(NavLink)({
  color: "black",
  textDecoration: "none",
});

const StyledListItemText = styled(ListItemText)({
  textAlign: "center",
});

const AdminMenu = () => {
  return (
    <>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" style={{ color: "#D0006E" }} gutterBottom>
            Manage Database
          </Typography>
          <nav>
            <List>
              <StyledNavLink to="/Admin/Admindashboard/create-category">
                <ListItem disablePadding>
                  <ListItemButton>
                    <StyledListItemText primary="Create Category" />
                  </ListItemButton>
                </ListItem>
              </StyledNavLink>
              <Divider component="li" />
              <StyledNavLink to="/Admin/Admindashboard/create-product">
                <ListItem disablePadding>
                  <ListItemButton>
                    <StyledListItemText primary="Create Products" />
                  </ListItemButton>
                </ListItem>
              </StyledNavLink>
              <Divider component="li" />
              <StyledNavLink to="/Admin/Admindashboard/products">
                <ListItem disablePadding>
                  <ListItemButton>
                    <StyledListItemText primary="Update Products" />
                  </ListItemButton>
                </ListItem>
              </StyledNavLink>
              <Divider component="li" />
              <StyledNavLink to="/Admin/Admindashboard/users">
                <ListItem disablePadding>
                  <ListItemButton>
                    <StyledListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
              </StyledNavLink>
            </List>
          </nav>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default AdminMenu;
