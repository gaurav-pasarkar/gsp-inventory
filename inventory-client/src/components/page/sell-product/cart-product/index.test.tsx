import matchSnapshot from "../../../../test-utils/match-snapshot";
import CartProduct from "./index";
import {Product} from "../../../../apis/products";

describe('Cart product', () => {

  const product: Product = {
    productName: 'Test',
    costPrice: 10,
    sellingPrice: 11,
    quantity: 50
  }

  it('should render', () => {
    matchSnapshot(<CartProduct product={product}/>)
  })
});