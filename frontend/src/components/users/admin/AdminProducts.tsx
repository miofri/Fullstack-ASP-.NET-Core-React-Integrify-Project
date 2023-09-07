// User Management: Admins should be able to view and delete users.
// Product Management: Admins should be able to view, edit, delete and add new products.
// Order Management: Admins should be able to view all orders

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Box, Button, Container, Typography } from "@mui/material";

import { Products } from "../../../interface/Products";
import { getProductsThunk } from "../../../store/thunks/productsThunks/productThunks";
import axios from "axios";
import { Link } from "react-router-dom";

export const AdminProducts = () => {
  const [allProducts, setAllProducts] = useState<Products[]>();
  const [updateProductList, setUpdateProductList] = useState<number>(0);
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm(`Delete product with the id ${id}?`)) {
      const deleteProduct = async (id: string) => {
        const postConfig = {
          headers: { Authorization: `Bearer ${bearerToken}` },
        };
        const response = await axios.delete(
          `${process.env.REACT_APP_URL}/api/v1/products/${id}`,
          postConfig
        );
      };
      deleteProduct(id);
      setUpdateProductList(updateProductList + 1);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await dispatch(getProductsThunk());
      setAllProducts(response.payload);
    };
    getProducts();
  }, [updateProductList]);
  if (allProducts !== undefined && allProducts.length > 0) {
    return (
      <Container maxWidth="md">
        <Box>
          {allProducts!.map((product: Products) => (
            <>
              <Box sx={{ my: 2 }}>
                <Typography variant="h5">{product.name}</Typography>
                <hr />
                ID: {product.id} <br />
                Description: {product.description} <br />
                Price: {product.price} <br />
                Images:
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                  }}
                >
                  {product.images.map((img) => (
                    <img src={img} style={{ width: "33%" }}></img>
                  ))}
                </Box>
              </Box>
              <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              <Link to={`/admin/patchproduct/${product.id}`}>
                <Button>Patch</Button>
              </Link>
            </>
          ))}
        </Box>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
};
