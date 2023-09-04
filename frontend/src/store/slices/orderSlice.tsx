import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, OrderArray, Status } from "../../interface/Orders";

const initialStateOrder: OrderArray = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStateOrder,
  reducers: {
    setProduct: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});
