import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { RootState, store } from "../../store/store";
import { Products } from "../../interface/Products";
import { ProductHero } from "./ProductsHero";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { NotLoggedInHeaderBar } from "../extras/NotLoggedInHeaderBar";
import { cartSlice } from "../../store/slices/cartSlice";

export const ProductPage = () => {
  const productFromStore = useSelector(
    (state: RootState) => state.product.products
  );
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const [products, setProducts] = useState<Products[]>(productFromStore);

  useEffect(() => {
    setProducts(productFromStore);
  }, [productFromStore]);

  const handleAddToCart = (data: Products) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  return (
    <>
      {bearerToken !== "" ? <LoggedInHeaderBar /> : <NotLoggedInHeaderBar />}
      <ProductHero />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          maxWidth: "xl",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* columns calculation: sm: 8: on small size, number of columns are 8 / 4 = 2 columns (item xs) */}
            {products.map((prod: Products) => (
              <Grid key={prod.name} item xs={4}>
                <Card sx={{ maxWidth: "sm" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image={prod.images[0]}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" component="div">
                      {prod.name}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {prod.price}
                    </Typography>
                    <Typography variant="body2">{prod.description}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link to={`/singleproduct/${prod.id}`}>
                      <Button size="small">More details</Button>
                    </Link>
                    <Button size="small" onClick={() => handleAddToCart(prod)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
