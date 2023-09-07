import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store";
import { orderSlice } from "../../slices/orderSlice";

export const orderDetailsThunk = createAsyncThunk(
  "order/get",
  async (id: string) => {
    const orderResponse = await axios.get(
      `${process.env.REACT_APP_URL}/api/v1/orders/userid/${id}`
    );
    store.dispatch(orderSlice.actions.setOrder(orderResponse.data));
    return orderResponse.data;
  }
);
