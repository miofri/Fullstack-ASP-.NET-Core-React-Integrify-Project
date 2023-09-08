import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  OrderProduct,
  OrderProduct2DArray,
  OrderProductArray,
} from "../../interface/OrderProduct";

const initialStateOrderProducts: OrderProduct2DArray = {
  orderProducts: [[]],
};

export const orderProductSlice = createSlice({
  name: "orderProduct",
  initialState: initialStateOrderProducts,
  reducers: {
    setProduct: (state, action: PayloadAction<[OrderProduct[]]>) => {
      state.orderProducts = [[]];
      // action.payload.forEach((element) => {
      //   state.orderProducts = state.orderProducts.concat(element);
      // });
      state.orderProducts = action.payload;
      console.log(state.orderProducts);
    },
    emptyProduct: (state) => {
      state.orderProducts = [[]];
    },
  },
});
