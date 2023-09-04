export interface Order {
  id: string;
  userId: string;
  status: Status;
}

export interface OrderArray {
  orders: Order[];
}

export enum Status {
  processing = "processing",
  shipped = "shipped",
}
