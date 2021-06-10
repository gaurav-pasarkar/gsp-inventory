import matchSnapshot from "../../../../test-utils/match-snapshot";
import CartProduct from "./index";
import {fireEvent, render} from "@testing-library/react";
import ProductActions from "./product-actions";

describe('Cart product', () => {

  const mockAdd = jest.fn();
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  const props = {
    productName: 'Test',
    sellingPrice: 11,
    quantityInCart: 1,
    onAdd: mockAdd,
    onQuantityIncrement: mockIncrement,
    onQuantityDecrement: mockDecrement,
    isInCart: true
  }

  it('should render', () => {
    matchSnapshot(<CartProduct {...props}/>)
  });

  it('should call onQuantityIncrement when quantity is added', () => {
    const {getByLabelText} = render(<ProductActions {...props} />);

    fireEvent.click(getByLabelText(/add to shopping cart/));

    expect(mockIncrement).toHaveBeenCalled();
  });

  it('should call onQuantityDecrement when quantity is subtracted', () => {
    const {getByLabelText} = render(<ProductActions {...props} />);

    fireEvent.click(getByLabelText(/remove from shopping cart/));

    expect(mockDecrement).toHaveBeenCalled();
  });
});