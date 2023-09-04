import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { orderDetailsThunk } from "../../store/thunks/orderThunks/OrderDetailsThunk";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";

export const OrderPage = () => {
  const orderInfo = useSelector((state: RootState) => state.orders.orderArray);
  const orderProductsInfo = useSelector(
    (state: RootState) => state.orderProducts.orderProducts
  );
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const products = useSelector((state: RootState) => state.product.products);

  const extractProductId = orderProductsInfo.map((prod) => prod.productId);
  const getOrderProducts = products.filter((prod) =>
    extractProductId.includes(prod.id)
  );
  console.log(extractProductId);
  console.log(getOrderProducts);
  return (
    <div>
      <LoggedInHeaderBar />
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        <CssBaseline />
        <Box>
          <Typography variant="h1">Orders</Typography>
          <hr></hr>
        </Box>
      </Container>
    </div>
  );
};
