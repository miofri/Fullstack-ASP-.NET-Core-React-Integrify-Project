// User Management: Admins should be able to view and delete users.
// Product Management: Admins should be able to view, edit, delete and add new products.
// Order Management: Admins should be able to view all orders

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export const AdminProductPatchPage = () => {
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const defaultId = useParams().id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    if (data !== null) {
      const dataToPost = {
        description: data.get("description")?.toString(),
        name: data.get("name")?.toString(),
        price: Number(data.get("price")),
        inventory: Number(data.get("inventory")),
        images: [data.get("image1"), data.get("image2")],
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/v1/products/${data
          .get("id")
          ?.toString()}`,
        dataToPost,
        postConfig
      );
      if (response.status === 200) {
        window.alert("Patch successful");
      }
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Patch product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={defaultId}
              id="id"
              label="Product Id"
              name="id"
              autoComplete="Id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              autoComplete="Price"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="Description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="image1"
              label="Link to image"
              name="image1"
              autoComplete="Images"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="image2"
              label="Link to image"
              name="image2"
              autoComplete="Images"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="inventory"
              label="Inventory"
              name="inventory"
              autoComplete="Inventory"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Patch product
            </Button>
          </Box>
          {/* <Box sx={{ mt: 2, width: "100%" }}>
            {loginStatus == "failed" ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Incorrect login — please try again.
              </Alert>
            ) : (
              <></>
            )}
          </Box> */}
        </Box>
      </Container>
    </div>
  );
};
