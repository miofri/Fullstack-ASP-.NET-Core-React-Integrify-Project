import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { RootState } from "../../store/store";
import { Products } from "../../interface/Products";
import { ProductHero } from "./ProductsHero";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { NotLoggedInHeaderBar } from "../extras/NotLoggedInHeaderBar";

export const ProductPage = () => {
  const productFromStore = useSelector(
    (state: RootState) => state.product.products
  );
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const [products, setProducts] = useState<Products[]>(productFromStore);

  useEffect(() => {
    setProducts(productFromStore);
  }, [productFromStore]);
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
        {" "}
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
