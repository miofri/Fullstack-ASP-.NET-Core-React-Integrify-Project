import { useParams } from "react-router-dom";
import { Products } from "../../interface/Products";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { Box, Button, Container, Typography } from "@mui/material";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { cartSlice } from "../../store/slices/cartSlice";
import { mainTheme } from "../../theme";

export const SingleProductPage = () => {
  const routeParams = useParams();
  const productFromStore = useSelector(
    (state: RootState) => state.product.products
  );
  const productDetail = productFromStore.find(
    (prod) => prod.id == routeParams.id
  );
  const handleAddToCart = (data?: Products) => {
    if (data !== undefined) {
      store.dispatch(cartSlice.actions.addProduct(data));
    }
  };
  return (
    <div>
      <LoggedInHeaderBar />
      <Container maxWidth="md" sx={{ my: 15 }}>
        <Box>
          <Typography variant="h4">{productDetail?.name}</Typography>
          <hr></hr>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              marginY: 3,
            }}
          >
            {productDetail!.images.map((img) => (
              <img style={{ width: "31%" }} src={img}></img>
            ))}
          </Box>
          <Typography variant="h5">{productDetail?.description}</Typography>
          <Typography variant="body1">{productDetail?.price}</Typography>
          <Box>
            <Button
              size="medium"
              sx={{
                backgroundColor: mainTheme.palette.action.disabled,
                color: mainTheme.palette.text.primary,
                marginTop: 2,
              }}
              onClick={() => handleAddToCart(productDetail)}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
