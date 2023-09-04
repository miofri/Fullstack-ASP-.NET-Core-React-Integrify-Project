export interface Order {
  id: string;
  userId: string;
  status: Status;
}

export interface OrderArray {
  orderArray: Order[];
}

export enum Status {
  processing = "processing",
  shipped = "shipped",
}
