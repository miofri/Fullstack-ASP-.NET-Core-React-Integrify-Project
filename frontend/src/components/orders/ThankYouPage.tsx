import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "../users/LoginPage";
import { mainTheme } from "../../theme";

export const ThankYouPage = () => {
  // const cartFromStore = useSelector((state: RootState) => state.cart.cartItems);
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  if (role === "Admin" || role === "User") {
    return (
      <div>
        <Container maxWidth="md" sx={{ marginTop: 2 }}>
          <LoggedInHeaderBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "200px",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Thank you!</Typography>
            <Typography variant="h4">Your order has been placed.</Typography>
            <Button
              href="/"
              variant="outlined"
              sx={{
                borderColor: mainTheme.palette.text.primary,
                color: mainTheme.palette.text.primary,
                my: 3,
              }}
            >
              Return home
            </Button>
          </Box>
        </Container>
      </div>
    );
  } else {
    navigate("/login");
    return <LoginPage />;
  }
};
