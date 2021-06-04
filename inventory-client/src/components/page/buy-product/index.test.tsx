import matchSnapshot from "../../../test-utils/match-snapshot";
import BuyProduct from "./index";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {act} from 'react-test-renderer';

describe('Buy product', () => {

  it('should render', () => {
    matchSnapshot(<BuyProduct/>);
  });

  it('should render required field validations', async () => {
    const {getByText} = render(<BuyProduct/>);

    fireEvent.click(getByText(/Add product/));

    await waitFor(() => {
      expect(getByText(/Product name required/)).toBeInTheDocument();
      expect(getByText(/Cost price\(per unit\) required/)).toBeInTheDocument();
      expect(getByText(/Selling price\(per unit\) required/)).toBeInTheDocument();
      expect(getByText(/Quantity required/)).toBeInTheDocument();
    });
  })

  it('should add product', async () => {
    await act(async () => {
      const {getByText, getByTestId} = render(<BuyProduct/>);

      fireEvent.change(getByTestId('productName'), {
        target: {value: 'Test'}
      })
      fireEvent.change(getByTestId('costPrice'), {
        target: {value: 10}
      })
      fireEvent.change(getByTestId('sellingPrice'), {
        target: {value: 11}
      })
      fireEvent.change(getByTestId('quantity'), {
        target: {value: 100}
      })

      fireEvent.click(getByText(/Add product/));

      await waitFor(() => {
        expect(getByText(/Product created successfully./)).toBeInTheDocument();
      })
    })
  });
});