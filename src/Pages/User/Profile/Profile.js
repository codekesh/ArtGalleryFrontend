import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/AuthProvider";
import {
  TextField,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  Container,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [answer, setAnswer] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confipass, setConfipass] = useState("");

  useEffect(() => {
    const {
      name,
      dob,
      gender,
      contact,
      email,
      address,
      username,
      password,
      answer,
    } = auth?.user;
    setDob(dob);
    setName(name);
    setEmail(email);
    setGender(gender);
    setAnswer(answer);
    setContact(contact);
    setAddress(address);
    setUsername(username);
    setPassword(password);
  }, [auth?.user]);

  console.log(auth?.user);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/users", {
        name,
        dob,
        gender,
        contact,
        email,
        address,
        username,
        password,
        answer,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="userdashboardHeader">
        <UserMenu />
        <Container component="main" maxWidth="xs" className="signUp">
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: "10px" }}
          >
            Registration
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{ lineHeight: "1.2", marginBottom: "12px" }}
          >
            Wanna Join Artsverse! Then, create your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* DOB */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* gender */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* contact */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Contact"
                  name="contact"
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* address */}
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* username */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={username}
                  type="type"
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* newpassword */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="New Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* confirm password */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Confirm Password"
                  name="confipass"
                  type="password"
                  value={confipass}
                  onChange={(e) => setConfipass(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* answer */}
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Profile;
