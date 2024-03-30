import React from "react";
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

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
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
    } catch (error) {}
  };
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {}
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
        {cart?.map((p) => (
          <Card
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
          <h4>Total : {totalPrice()} </h4>
        </div>
      </div>
    </>
  );
};

export default Cart;
