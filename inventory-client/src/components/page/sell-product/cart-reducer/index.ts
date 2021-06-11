import {ProductToAdd} from "../index";
import {Product} from "../../../../apis/products";

type ProductAction = 'new' | 'increase-quantity' | 'decrease-quantity';

interface Action {
  type: ProductAction,
  product: Product
}

const reducer = (cartProducts: Map<string, ProductToAdd>, {type, product}: Action) => {

  const cartProduct = cartProducts.get(product.productName) || {
    quantityToAdd: 0,
    product
  };

  switch (type) {
    case "new":
    case "increase-quantity":{
      const updatedCartProduct = {
        ...cartProduct,
        quantityToAdd: cartProduct.quantityToAdd + 1
      }
      return new Map(cartProducts.set(product.productName, updatedCartProduct));
    }

    case "decrease-quantity": {
      if(cartProduct.quantityToAdd === 0) {
        cartProducts.delete(product.productName)
        return new Map(cartProducts);
      }

      const updatedCartProduct = {
        ...cartProduct,
        quantityToAdd: cartProduct.quantityToAdd - 1
      }
      if (updatedCartProduct.quantityToAdd === 0) {
        cartProducts.delete(product.productName)
        return new Map(cartProducts);
      }
      return new Map(cartProducts.set(product.productName, updatedCartProduct));
    }

    default:
      return cartProducts;
  }
}

export default reducer;