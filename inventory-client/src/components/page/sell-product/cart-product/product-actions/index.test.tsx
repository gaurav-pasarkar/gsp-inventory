import matchSnapshot from "../../../../../test-utils/match-snapshot";
import ProductActions from "./index";
import {fireEvent, render} from "@testing-library/react";

describe('Product actions', () => {

  const mockAdd = jest.fn();
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  const props = {
    quantityInCart: 1,
    onAdd: mockAdd,
    onQuantityIncrement: mockIncrement,
    onQuantityDecrement: mockDecrement,
    isInCart: true
  }

  it('should render', () => {
    matchSnapshot(<ProductActions {...props}/>)
  });

  it('should render Add button if product is not in cart', () => {
    const {queryByText, queryByLabelText} = render(<ProductActions {...props} isInCart={false}/>);

    expect(queryByText(/Add/)).toBeInTheDocument();
    expect(queryByLabelText(/remove from shopping cart/)).not.toBeInTheDocument();
    expect(queryByLabelText(/add to shopping cart/)).not.toBeInTheDocument();
  });

  it('should render increment decrement button if product is in cart', () => {
    const {queryByText, queryByLabelText} = render(<ProductActions {...props} />);

    expect(queryByText(/Add/)).not.toBeInTheDocument();
    expect(queryByLabelText(/remove from shopping cart/)).toBeInTheDocument();
    expect(queryByLabelText(/add to shopping cart/)).toBeInTheDocument();
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