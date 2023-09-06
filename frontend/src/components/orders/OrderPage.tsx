import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";

import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { OrderProduct2DArray } from "../../interface/OrderProduct";
import { mappingOrderProducts, totalVal } from "./OrderPageUtils";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "../users/LoginPage";
import { useEffect, useState } from "react";
import { orderProductSlice } from "../../store/slices/orderProduct";
import { useAppDispatch } from "../../store/hooks";

export const OrderPage = () => {
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const orderProductsInfo = useSelector(
    (state: OrderProduct2DArray) => state.orderProducts.orderProducts
  );
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const products = useSelector((state: RootState) => state.product.products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mappingAmountAndPrice, setMappingAmountAndPrice] = useState<any>([]);
  const [finalVal, setFinalVal] = useState<Number>(0);

  useEffect(() => {
    const updating = async () => {
      if (orderProductsInfo.length > 0 && products.length > 0) {
        dispatch(orderProductSlice.actions.emptyProduct());
        setTimeout(() => {
          const mapping = mappingOrderProducts(orderProductsInfo, products);
          const calculate = totalVal(mapping);

          setMappingAmountAndPrice(mapping);
          setFinalVal(calculate);
        }, 1000);
      }
    };
    updating();
  }, [orderProductsInfo, products]);

  if (bearerToken == "") {
    navigate("/login");
    return <LoginPage />;
  } else {
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
                <Typography variant="h5">{finalVal.toFixed(2)}</Typography>
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
  }
};
