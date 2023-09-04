import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderProduct, OrderProductArray } from "../../interface/OrderProduct";

const initialStateOrderProducts: OrderProductArray = {
  orderProducts: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStateOrderProducts,
  reducers: {
    setProduct: (state, action: PayloadAction<OrderProduct[]>) => {
      state.orderProducts = action.payload;
    },
  },
});
