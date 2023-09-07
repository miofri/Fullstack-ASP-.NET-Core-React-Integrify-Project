import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store";
import { orderSlice } from "../../slices/orderSlice";

export const orderDetailsThunk = createAsyncThunk(
  "order/get",
  async (id: string) => {
    const orderResponse = await axios.get(
      `${process.env.URL}/api/v1/orders/userid/${id}`
    );
    // console.log("dispatching orderDetailsThunk");
    store.dispatch(orderSlice.actions.setOrder(orderResponse.data));
    return orderResponse.data;
  }
);
