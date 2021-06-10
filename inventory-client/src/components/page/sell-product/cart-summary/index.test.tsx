import {ProductToAdd} from "../index";
import matchSnapshot from "../../../../test-utils/match-snapshot";
import CartSummary from "./index";
import {render} from "@testing-library/react";

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

  it('should render', () => {
    matchSnapshot(<CartSummary products={productsInCart}/>)
  });

  it('should show correct total', () => {
    const {getByText} = render(<CartSummary products={productsInCart}/>);
    expect(getByText(/Total: ₹ 50 \/-/)).toBeInTheDocument();
  });

  it('should show correct number of products on checkout', () => {
    const {getByText} = render(<CartSummary products={productsInCart}/>);
    expect(getByText(/Checkout \(2\)/)).toBeInTheDocument();
  })
});