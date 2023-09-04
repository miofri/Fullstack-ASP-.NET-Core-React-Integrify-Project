import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store";
import { orderProductSlice } from "../../slices/orderProduct";

export const orderProductThunk = createAsyncThunk(
  "orderProduct/get",
  async (id: string) => {
    const orderProductResponse = await axios.get(
      `http://localhost:5145/api/v1/orderproducts/orderid/${id}`
    );
    console.log("Dispatched orderProductsThunk");

    store.dispatch(
      orderProductSlice.actions.setProduct(orderProductResponse.data)
    );
    console.log(orderProductResponse.data);

    return orderProductResponse.data;
  }
);
