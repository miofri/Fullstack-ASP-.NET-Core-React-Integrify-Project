import { Products } from "../../interface/Products";

export const handleSortByNameAscending = (
  products: Products[],
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>
) => {
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
  setProducts(sorted);
};

export const handleSortByNameDescending = (
  products: Products[],
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>
) => {
  const sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
  setProducts(sorted);
};

export const handleSortByPriceAscending = (
  products: Products[],
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>
) => {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  setProducts(sorted);
};

export const handleSortByPriceDescending = (
  products: Products[],
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>
) => {
  const sorted = [...products].sort((a, b) => b.price - a.price);
  setProducts(sorted);
};
