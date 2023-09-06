import { Products } from "./Products";

export interface Cart {
  product: Products;
  quantity: number;
}

export interface CartState {
  cartItems: Cart[];
}
