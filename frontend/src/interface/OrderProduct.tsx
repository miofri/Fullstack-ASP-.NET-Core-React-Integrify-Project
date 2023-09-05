export interface OrderProduct {
  id: string;
  productId: string;
  amount: number;
}
export interface OrderProductArray {
  orderProducts: OrderProduct[];
}

export interface OrderProduct2DArray {
  orderProducts: {
    orderProducts: [OrderProduct[]];
  };
}
