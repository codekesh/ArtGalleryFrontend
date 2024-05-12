import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartProvider";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
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
      navigate("/User/Userdashboard/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
        <h4>
          {cart?.length
            ? `You have ${cart.length} items in your cart ${
                auth?.token ? "" : "Please login in checkout"
              }`
            : "Your cart is empty"}
        </h4>
      </div>
      <div>
        Cart Item
        {cart?.map((p, i) => (
          <Card
            key={i}
            sx={{
              maxWidth: 1000,
              margin: "1% 0% 1% 3%",
              display: "flex",
              borderRadius: "15px",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={`/product-photo/${p._id}`}
              alt={p.name}
              style={{}}
            />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                {p.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {p.description.substring(0, 20)}...
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Pirce: ${p.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => removeCartItem(p._id)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
        <div>
          <h4>Total | Checkout | Payment</h4>
          <hr />
          <h4>Total : {totalPrice()}</h4>
          {auth?.user?.address ? (
            <>
              <div>
                <h4>Current Address</h4>
                <h5>{auth.user.address}</h5>
                <button onClick={() => navigate("/User/Userdashboard/profile")}>
                  Update Address
                </button>
              </div>
              <div>
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please login to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
