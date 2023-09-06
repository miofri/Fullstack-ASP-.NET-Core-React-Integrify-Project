import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ThankYouPage = () => {
  const cartFromStore = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3">Thank you!</Typography>
        <Typography variant="h4">Your order has been placed.</Typography>
      </Container>
    </div>
  );
};
