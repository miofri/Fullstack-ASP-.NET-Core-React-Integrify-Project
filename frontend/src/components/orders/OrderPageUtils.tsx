import {
  OrderProduct,
  OrderProduct2DArray,
} from "../../interface/OrderProduct";
import { Products } from "../../interface/Products";

export const mappingOrderProducts = (
  orderProductsInfo: OrderProduct2DArray,
  products: Products[]
) => {
  let mappingAmountAndPrice: any = [];
  orderProductsInfo.orderProducts.forEach((element) => {
    const extract = element.map(({ productId, amount }) => {
      const matchingId = products.find((prod) => prod.id === productId);
      if (matchingId) {
        return { productId, amount, ...matchingId };
      }
    });
    mappingAmountAndPrice = mappingAmountAndPrice.concat(extract);
  });

  return mappingAmountAndPrice;
};

export const totalVal = (mappingAmountAndPrice: any) => {
  let finalVal = 0;
  if (mappingAmountAndPrice.length > 0 && mappingAmountAndPrice !== undefined) {
    mappingAmountAndPrice.forEach((element: any) => {
      if (element.amount !== undefined && element.price !== undefined)
        finalVal = element.amount * element.price + finalVal;
    });
  }
  return finalVal;
};
