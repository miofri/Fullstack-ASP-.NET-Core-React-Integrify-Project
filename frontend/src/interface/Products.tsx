export interface Products {
  id: string;
  description: string;
  images: string[];
  name: string;
  price: number;
}
export interface ProductState {
  products: Products[];
  status?: string;
  error?: string;
}
