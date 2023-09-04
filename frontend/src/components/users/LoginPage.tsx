import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { dispatchInfoAndRedirect } from "./LoginPageUtils";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { currentUserInfoThunk } from "../../store/thunks/userThunks/currentUserInfoThunk";
import { useNavigate } from "react-router-dom";
import { NotLoggedInHeaderBar } from "../extras/NotLoggedInHeaderBar";
import { mainTheme } from "../../theme";
import { orderDetailsThunk } from "../../store/thunks/orderThunks/OrderThunk";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [loginStatus, setLoginStatus] = useState("");
  const userFromStore = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data !== null) {
      const dataToSend = {
        email: data.get("email")?.toString() || "",
        password: data.get("password")?.toString() || "",
      };
      const status = await dispatchInfoAndRedirect(dataToSend, dispatch);
      console.log(status, userFromStore);
      setLoginStatus(status);
    }
  };

  useEffect(() => {
    if (userFromStore !== null && loginStatus == "success") {
      const getUserProfile = dispatch(currentUserInfoThunk(userFromStore));
      const getOrderInfo = dispatch(orderDetailsThunk(userFromStore));
      navigate("/profile");
      console.log(getUserProfile);
    }
  }, [loginStatus]);

  return (
    <div>
      <NotLoggedInHeaderBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: mainTheme.palette.primary.light }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2, width: "100%" }}>
            {loginStatus == "failed" ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Incorrect login — please try again.
              </Alert>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};
