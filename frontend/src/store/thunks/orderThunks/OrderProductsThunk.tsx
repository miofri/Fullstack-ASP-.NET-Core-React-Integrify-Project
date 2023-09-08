import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../store";
import { orderProductSlice } from "../../slices/orderProduct";
import { Order } from "../../../interface/Orders";
import { OrderProduct2DArray } from "../../../interface/OrderProduct";

export const orderProductThunk = createAsyncThunk(
  "orderProduct/get",
  async (order: Order[]) => {
    const promises = order.map(async (element) => {
      const orderProductResponse = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/orderproducts/orderid/${element.id}`
      );
      return orderProductResponse.data;
    });
    const arr: any = await Promise.all(promises);
    store.dispatch(orderProductSlice.actions.setProduct(arr));

    return true;
  }
);
