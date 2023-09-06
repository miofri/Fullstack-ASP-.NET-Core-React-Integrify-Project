export interface OrderWithoutId {
  productId: string;
  amount: number;
}

export interface CreateOrder {
  productsAndAmount: OrderWithoutId[];
  status: string;
}
