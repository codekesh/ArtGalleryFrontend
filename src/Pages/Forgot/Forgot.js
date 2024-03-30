import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Copyright from "../../components/Copyright/Copyright";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/forgotPassword", {
        email,
        newpassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
          Reset your password!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ lineHeight: "1.2", marginBottom: "12px" }}
        >
          Don't lose the password again
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
                label="New Password"
                name="newpassword"
                type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="What is your first born city name?"
                name="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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
                  navigate("/Login");
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
      <Copyright />
    </>
  );
};

export default Forgot;
