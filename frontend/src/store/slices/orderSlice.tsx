import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, OrderArray, Status } from "../../interface/Orders";

const initialStateOrder: OrderArray = {
  orderArray: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStateOrder,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.orderArray = action.payload;
    },
  },
});
