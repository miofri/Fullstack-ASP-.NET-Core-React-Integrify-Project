import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../../store";
import { cartSlice } from "../../slices/cartSlice";
import { Cart } from "../../../interface/Cart";
import { CreateOrder, OrderWithoutId } from "../../../interface/CreateOrder";
import { useSelector } from "react-redux";

export const createOrderThunk = createAsyncThunk(
  "order/postNewOrder",
  async (data: any[]) => {
    let toPost: OrderWithoutId[] = [];

    const extractJustProductId = () => {
      for (let index = 0; index < data.length - 1; index++) {
        toPost.push({
          productId: data[index].product.id,
          amount: data[index].quantity,
        });
      }
    };
    extractJustProductId();

    const toPostObject: CreateOrder = {
      productsAndAmount: toPost,
      status: "processing",
    };

    let postConfig = {
      headers: { Authorization: `Bearer ${data[data.length - 1]}` },
    };

    const createOrderResponse = await axios.post(
      `${process.env.REACT_APP_URL}/api/v1/orders`,
      toPostObject,
      postConfig
    );

    return createOrderResponse.data;
  }
);
