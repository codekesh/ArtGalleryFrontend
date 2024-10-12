import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";
import moment from "moment";
import {
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
  CardContent
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <>
      <Box sx={{ padding: "2rem", display: 'flex' }}>
        <UserMenu />
        <div style={{ marginLeft: '40px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            All Orders
          </Typography>
          {orders?.map((o, i) => (
            <Box key={i} mb={4}>
              <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
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
                      <TableCell>{o?.status}</TableCell>
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
          ))}
        </div>
      </Box>
      <Footer />
      <Copyright />
    </>
  );
};

export default Orders;
