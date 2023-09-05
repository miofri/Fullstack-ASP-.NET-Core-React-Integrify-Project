import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { OrderProduct2DArray } from "../../interface/OrderProduct";

export const OrderPage = () => {
  const orderInfo = useSelector((state: RootState) => state.orders.orderArray);

  const orderProductsInfo = useSelector(
    (state: OrderProduct2DArray) => state.orderProducts.orderProducts
  );
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const products = useSelector((state: RootState) => state.product.products);

  let mappingAmountAndPrice: any = [];
  const mappingOrderProducts = () => {
    orderProductsInfo.forEach((element) => {
      const extract = element.map(({ productId, amount }) => {
        const matchingId = products.find((prod) => prod.id === productId);
        if (matchingId) {
          return { productId, amount, ...matchingId };
        }
      });
      mappingAmountAndPrice = mappingAmountAndPrice.concat(extract);
    });
  };
  mappingOrderProducts();

  let finalVal = 0;
  const totalVal = () => {
    mappingAmountAndPrice.forEach((element: any) => {
      finalVal = element.amount * element.price + finalVal;
    });
  };
  totalVal();

  return (
    <div>
      <LoggedInHeaderBar />
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        <CssBaseline />
        <Box>
          <Typography variant="h1">Orders</Typography>
          <hr></hr>
        </Box>
        <Box sx={{ my: 5 }}>
          {mappingAmountAndPrice.map((prod: any) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                marginBottom: 5,
              }}
              key={prod?.id}
            >
              <Box sx={{ maxWidth: "200px" }}>
                <img style={{ width: "200px" }} src={prod?.images[0]}></img>
              </Box>
              <Box>
                <Typography variant="h4">{prod?.name}</Typography>
                <Typography>{prod?.description}</Typography>
                <Typography>{prod?.price}</Typography>
                <Typography>{prod?.amount}x</Typography>
              </Box>
            </Box>
          ))}
          <hr></hr>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              marginBottom: 5,
            }}
          >
            <Box>
              <Typography variant="h4">Total amount:</Typography>
              <Typography variant="h5">{finalVal}</Typography>
            </Box>
            <Box>
              <Typography variant="h4">Delivery address:</Typography>
              <Typography variant="h5">{userInfo.address}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
