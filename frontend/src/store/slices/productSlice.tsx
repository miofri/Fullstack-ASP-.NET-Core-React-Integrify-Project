import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductState, Products } from "../../interface/Products";

let productsInitialValue: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: productsInitialValue,
  reducers: {
    setProduct: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
  },
});
