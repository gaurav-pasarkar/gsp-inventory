import {ProductToAdd} from "../index";
import reducer from "./index";

describe('Cart reducer', () => {

  const product1 = {
    productName: 'Product 1',
    quantity: 10,
    costPrice: 10,
    sellingPrice: 11,
    id: '123'
  };

  const product2 = {
    productName: 'Product 2',
    quantity: 11,
    costPrice: 5,
    sellingPrice: 6,
    id: '234'
  };

  it('should add new product to cart', () => {
    const cartProduct1 = {
      quantityToAdd: 1,
      product: product1
    };

    const cartProducts = new Map<string, ProductToAdd>([
        [ cartProduct1.product.productName, cartProduct1]
    ]);

    const state = reducer(cartProducts, {
      type: "new",
      product: product2
    });

    expect(state.size).toBe(2);
    expect(state.get('Product 1')).toEqual(cartProduct1);
    expect(state.get('Product 2')).toEqual({
      quantityToAdd: 1,
      product: product2
    });
  })

  describe('Increase quantity', () => {

    it('should add product to cart if not found', () => {
      const state = reducer(new Map<string, ProductToAdd>(), {
        type: "increase-quantity",
        product: product1
      });

      expect(state.size).toBe(1);
      expect(state.get('Product 1')).toEqual({
        quantityToAdd: 1,
        product: product1
      });
    })

    it('should increase quantity by 1 of a product if present', () => {
      const cartProduct1 = {
        quantityToAdd: 2,
        product: product1
      };
      const cartProducts = new Map<string, ProductToAdd>([
        [ cartProduct1.product.productName, cartProduct1]
      ]);

      const state = reducer(cartProducts, {
        type: "increase-quantity",
        product: product1
      });

      expect(state.size).toBe(1);
      expect(state.get('Product 1')).toEqual({
        quantityToAdd: 3,
        product: product1
      });
    })
  })

  describe('Decrease quantity', () => {

    it('should do nothing if product is not present', () => {
      const state = reducer(new Map<string, ProductToAdd>(), {
        type: "decrease-quantity",
        product: product1
      });

      expect(state.size).toBe(0);
    });

    it('should remove product from cart if quantity available is 1', () => {
      const cartProduct1 = {
        quantityToAdd: 1,
        product: product1
      };
      const cartProducts = new Map<string, ProductToAdd>([
        [ cartProduct1.product.productName, cartProduct1]
      ]);

      const state = reducer(cartProducts, {
        type: "decrease-quantity",
        product: product1
      });

      expect(state.size).toBe(0);
    });

    it('should reduce quantity by 1 if product is available and quantity > 1', () => {
      const cartProduct1 = {
        quantityToAdd: 2,
        product: product1
      };
      const cartProducts = new Map<string, ProductToAdd>([
        [ cartProduct1.product.productName, cartProduct1]
      ]);

      const state = reducer(cartProducts, {
        type: "decrease-quantity",
        product: product1
      });

      expect(state.size).toBe(1);
      expect(state.get('Product 1')).toEqual({
        quantityToAdd: 1,
        product: product1
      });
    });
  });

  it('should reset the cart', () => {
    const cartProduct1 = {
      quantityToAdd: 1,
      product: product1
    };

    const cartProducts = new Map<string, ProductToAdd>([
      [ cartProduct1.product.productName, cartProduct1]
    ]);

    const state = reducer(cartProducts, {
      type: "reset"
    });

    expect(state.size).toBe(0);
  })
});