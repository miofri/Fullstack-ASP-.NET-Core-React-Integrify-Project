import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Cart, CartState } from "../../interface/Cart";
import { Products } from "../../interface/Products";

let cartsInitialValue: CartState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartsInitialValue,
  reducers: {
    addProduct: (state, action: PayloadAction<Products>) => {
      const existingItem = state.cartItems.find(
        (data) => data.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: Cart = {
          product: action.payload,
          quantity: 1,
        };
        state.cartItems = state.cartItems.concat(newItem);
      }
    },
    deleteProduct: (state, action: PayloadAction<Products>) => {
      state.cartItems = state.cartItems.filter(
        (data) => data.product.id !== action.payload.id
      );
    },
    reduceQuantity: (state, action: PayloadAction<Products>) => {
      const existingItem = state.cartItems.find(
        (data) => data.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addProduct, deleteProduct, reduceQuantity } = cartSlice.actions;
