import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import { useAuth } from "../../../context/AuthProvider";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import moment from "moment";
import {
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axiosInstance from "../../../api/axiosInstance";

export const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axiosInstance.put(`/order-status/${orderId}`, { status: value });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ padding: "2rem", display: 'flex' }}>
        <AdminMenu />
        <div style={{ marginLeft: '40px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            All Orders
          </Typography>
          {orders.length === 0 ? (
            <Typography variant="h3" align="center" color="textSecondary">
              No body ordered yet🥺
            </Typography>
          ) : (
            orders.map((o, i) => (
              <Box key={i} mb={4}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Buyer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <Select
                            value={o?.status}
                            onChange={(e) => handleChange(o._id, e.target.value)}
                            fullWidth
                            variant="outlined"
                          >
                            {status.map((s, index) => (
                              <MenuItem key={index} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>{o?.buyer?.name}</TableCell>
                        <TableCell>{moment(o?.createAt).fromNow()}</TableCell>
                        <TableCell>{o?.payment.success ? "Success" : "Failed"}</TableCell>
                        <TableCell>{o?.products?.length}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box className="container">
                  {o?.products?.map((p) => (
                    <Card key={p._id} sx={{ display: "flex", marginBottom: "1rem" }}>
                      <CardMedia
                        component="img"
                        image={`/product-photo/${p._id}`}
                        alt={p.name}
                        sx={{ width: 150, height: 150 }}
                      />
                      <CardContent>
                        <Typography variant="h6">{p.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {p.description.substring(0, 30)}...
                        </Typography>
                        <Typography variant="subtitle1">Price: {p.price}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            ))
          )}
        </div>
      </Box>
      <Footer />
      <Copyright />
    </>
  );
};
