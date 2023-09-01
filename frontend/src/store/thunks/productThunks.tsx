import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../store";
import axios from "axios";
import { productSlice } from "../slices/productSlice";

export const getProductsThunk = createAsyncThunk(
  "product/waitProduct",
  async () => {
    const response = await axios.get("http://localhost:5145/api/v1/products");
    console.log("in getProductsThunk", response.data);
    store.dispatch(productSlice.actions.setProduct(response.data));
    return response.data;
  }
);
