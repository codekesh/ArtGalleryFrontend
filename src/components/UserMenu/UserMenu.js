import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          margin: "50px",
        }}
        className="box"
      >
        <h2>User Panel</h2>
        <nav aria-label="main mailbox folders">
          <List>
            <NavLink to="/User/Userdashboard/profile">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to="/User/Userdashboard/orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default UserMenu;
