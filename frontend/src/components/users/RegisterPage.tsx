import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { registerThunk } from "../../store/thunks/userThunks/registerThunk";
import { Alert, AlertTitle } from "@mui/material";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [registrationStatus, setRegistrationStatus] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data !== null) {
      const dataToSend = {
        firstName: data.get("firstName")?.toString() || "",
        lastName: data.get("password")?.toString() || "",
        email: data.get("email")?.toString() || "",
        address: data.get("address")?.toString() || "",
        userName: data.get("username")?.toString() || "",
        password: data.get("password")?.toString() || "",
        avatar: "string",
      };
      const action = await dispatch(registerThunk(dataToSend));
      const status = action.payload as string;

      setRegistrationStatus(status);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <Person2OutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          {registrationStatus === "success" ? (
            <Alert severity="success">
              <AlertTitle>Registration succesful</AlertTitle>
              You have been succesfully registered! Please{" "}
              <a href="/login">login.</a>
            </Alert>
          ) : (
            <></>
          )}
          {registrationStatus === "failed" ? (
            <Alert severity="error">
              <AlertTitle>Registration failed</AlertTitle>
              Email is already registered. Please <a href="/login">login.</a>
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Container>
  );
};
