import {ProductToAdd} from "../index";
import {Product} from "../../../../apis/products";

type CartAction = 'new' | 'increase-quantity' | 'decrease-quantity';
type ResetAction = 'reset';

interface Action {
  type: CartAction,
  product: Product
}

interface NoProductAction {
  type: ResetAction,
}

const reducer = (cartProducts: Map<string, ProductToAdd>, action: Action | NoProductAction) => {

  if (action.type === 'reset') {
    return new Map();
  } else {
    const {product, type} = action;
    const cartProduct = cartProducts.get(product.productName) || {
      quantityToAdd: 0,
      product
    };

    switch (type) {
      case "new":
      case "increase-quantity": {
        const updatedCartProduct = {
          ...cartProduct,
          quantityToAdd: cartProduct.quantityToAdd + 1
        }
        return new Map(cartProducts.set(product.productName, updatedCartProduct));
      }

      case "decrease-quantity": {
        if (cartProduct.quantityToAdd === 0) {
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

}

export default reducer;