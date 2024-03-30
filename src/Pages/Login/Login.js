import React, { useState } from "react";
import "./Login.css";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className="signUp">
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          Login!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ lineHeight: "1.2", marginBottom: "12px" }}
        >
          Enter your credentials and enjoy the Artsverse
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* email */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/Forgot");
                }}
              >
                Forgot Password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ToastContainer />
      <Footer />
      <Copyright />
    </>
  );
};

export default Login;
