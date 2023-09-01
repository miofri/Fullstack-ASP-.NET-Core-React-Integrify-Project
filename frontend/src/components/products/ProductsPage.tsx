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

export const ProductPage = () => {
  const productFromStore = useSelector(
    (state: RootState) => state.product.products
  );
  const [products, setProducts] = useState<Products[]>(productFromStore);

  useEffect(() => {
    setProducts(productFromStore);
  }, [productFromStore]);
  return (
    <>
      <ProductHero />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          maxWidth: "xl",
          // backgroundColor: "primary.dark",
        }}
      >
        {" "}
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
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
