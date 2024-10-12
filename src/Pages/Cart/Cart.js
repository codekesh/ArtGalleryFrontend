import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartProvider";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "Error calculating total price";
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      setTimeout(() => {
        navigate("/User/Userdashboard/orders");
      }, 1000);
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ margin: "20px" }}
        >{`Hello! ${auth?.token && auth?.user?.name}`}</Typography>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ marginTop: "10px" }}
        >
          {cart?.length
            ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login in checkout"
            }`
            : "Your cart is empty"}
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row", margin: "40px" }}>
        <Box sx={{ width: "50%" }}>
          {cart?.map((p, i) => (
            <Card
              key={i}
              sx={{
                maxWidth: 400,
                display: "flex",
                margin: "2% 10%",
                borderRadius: "15px",
                "&:hover": {
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="260"
                image={`/product-photo/${p._id}`}
                alt={p.name}
              />
              <div>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {p.description.substring(0, 20)}...
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Price: ${p.price}
                  </Typography>
                  <CardActions>
                    <Button
                      sx={{ backgroundColor: "#d0006e" }}
                      variant="contained"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </CardContent>
              </div>
            </Card>
          ))}
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom textAlign="center">
            Total | Checkout | Payment
          </Typography>
          <hr />
          <Typography variant="h6" gutterBottom>
            <strong>Total</strong> : {totalPrice()}
          </Typography>
          {auth?.user?.address ? (
            <>
              <div>
                <Typography variant="h6" gutterBottom>
                  <strong>Current Address</strong>: {auth.user.address}
                </Typography>
                <Button
                  sx={{ backgroundColor: "#d0006e", margin: "20px 0px" }}
                  variant="contained"
                  onClick={() => navigate("/User/Userdashboard/profile")}
                >
                  Update Address
                </Button>
              </div>
              <div>
                {!auth?.token || !clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <Button
                      sx={{ backgroundColor: "#d0006e", margin: "5px 0px" }}
                      variant="contained"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </Button>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <Button
                sx={{ backgroundColor: "#d0006e", margin: "5px 0px" }}
                variant="contained"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please login to checkout
              </Button>
            </div>
          )}
        </Box>
      </div>
      <Footer />
      <Copyright />
      <ToastContainer />
    </>
  );
};

export default Cart;
