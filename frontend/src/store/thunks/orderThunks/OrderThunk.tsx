import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderDetailsThunk = createAsyncThunk(
  "order/get",
  async (id: string) => {
    const orderResponse = await axios.get(
      `http://localhost:5145/api/v1/orders/${id}`
    );
    return orderResponse.data;
  }
);
