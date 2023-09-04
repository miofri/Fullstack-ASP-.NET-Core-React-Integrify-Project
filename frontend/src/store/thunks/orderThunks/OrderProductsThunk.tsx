import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderProductThunk = createAsyncThunk(
  "orderProduct/get",
  async () => {
    const orderProductResponse = await axios.get(
      "http://localhost:5145/api/v1/orderproducts"
    );
    return orderProductResponse.data;
  }
);
