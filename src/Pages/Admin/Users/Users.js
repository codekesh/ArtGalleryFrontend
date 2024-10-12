import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetching users data
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Box sx={{ padding: "2rem", display: 'flex' }}>
        <AdminMenu />
        <div style={{ marginLeft: '40px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            All Users
          </Typography>
          {users.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No users available.😔
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.dob}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.contact}</TableCell>
                      <TableCell>{user.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Box>
      <Footer />
      <Copyright />
    </>
  );
};

export default Users;
