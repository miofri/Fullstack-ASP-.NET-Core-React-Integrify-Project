import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store";
import { orderProductSlice } from "../../slices/orderProduct";
import { Order } from "../../../interface/Orders";

export const orderProductThunk = createAsyncThunk(
  "orderProduct/get",
  async (order: Order[]) => {
    order.forEach(async (element) => {
      const orderProductResponse = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/orderproducts/orderid/${element.id}`
      );
      store.dispatch(
        orderProductSlice.actions.setProduct(orderProductResponse.data)
      );
    });

    return true;
  }
);
