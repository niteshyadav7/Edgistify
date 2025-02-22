import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form)).then(() => navigate("/login"));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" textAlign="center" mb={2}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth name="name" onChange={handleChange} required />
          <TextField label="Email" fullWidth name="email" onChange={handleChange} required />
          <TextField label="Password" fullWidth type="password" name="password" onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
