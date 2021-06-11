import {ProductToAdd} from "../index";
import matchSnapshot from "../../../../test-utils/match-snapshot";
import CartSummary, {CartSummaryProps} from "./index";
import {fireEvent, render} from "@testing-library/react";

describe('Cart summary', () => {

  const productsInCart = new Map<string, ProductToAdd>([
    ['Product 1',
      {
        quantityToAdd: 1,
        product: {
          productName: 'Product 1',
          sellingPrice: 10,
          costPrice: 9,
          quantity: 10
        }
      }
    ],
    ['Product 2',
      {
        quantityToAdd: 2,
        product: {
          productName: 'Product 2',
          sellingPrice: 20,
          costPrice: 15,
          quantity: 10
        }
      }
    ]
  ]);

  const mockOnCheckout = jest.fn();

  const props: CartSummaryProps = {
    products: productsInCart,
    view: 'checkout',
    onCheckout: mockOnCheckout
  }

  it('should render', () => {
    matchSnapshot(<CartSummary {...props}/>)
  });

  it('should show correct total', () => {
    const {getByText} = render(<CartSummary {...props}/>);
    expect(getByText(/Total: ₹ 50 \/-/)).toBeInTheDocument();
  });

  it('should show correct number of products on checkout', () => {
    const {getByText, queryByText} = render(<CartSummary {...props}/>);
    expect(queryByText(/Place order/)).not.toBeInTheDocument();
    expect(getByText(/Checkout \(2\)/)).toBeInTheDocument();
  });

  it('should call onCheckout when checkout is clicked', () => {
    const {getByText} = render(<CartSummary {...props}/>);

    fireEvent.click(getByText(/Checkout \(2\)/));

    expect(mockOnCheckout).toHaveBeenCalled();
  });

  it('should show Place order when view is place-order', () => {
    const {getByText, queryByText} = render(<CartSummary {...props} view='place-order'/>);
    expect(queryByText(/Checkout \(\)/)).not.toBeInTheDocument();
    expect(getByText(/Place order/)).toBeInTheDocument();
  });
});