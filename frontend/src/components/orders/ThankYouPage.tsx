import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "../users/LoginPage";

export const ThankYouPage = () => {
  // const cartFromStore = useSelector((state: RootState) => state.cart.cartItems);
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  if (role === "Admin" || role === "User") {
    return (
      <div>
        <Container maxWidth="md" sx={{ marginTop: 2 }}>
          <LoggedInHeaderBar />
          <Typography variant="h3">Thank you!</Typography>
          <Typography variant="h4">Your order has been placed.</Typography>
        </Container>
      </div>
    );
  } else {
    navigate("/login");
    return <LoginPage />;
  }
};
