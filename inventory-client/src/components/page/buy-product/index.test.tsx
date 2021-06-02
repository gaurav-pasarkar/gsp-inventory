import matchSnapshot from "../../../test-utils/match-snapshot";
import BuyProduct from "./index";
import {fireEvent, render, waitFor} from "@testing-library/react";

describe('Buy product', () => {

  it('should render', () => {
    matchSnapshot(<BuyProduct/>);
  });

  it('should render required field validations', async () => {
    const { getByText } = render(<BuyProduct/>);

    fireEvent.click(getByText(/Add product/));

    await waitFor(() => {
      expect(getByText(/Product name required/)).toBeInTheDocument();
      expect(getByText(/Cost price\(per unit\) required/)).toBeInTheDocument();
      expect(getByText(/Selling price\(per unit\) required/)).toBeInTheDocument();
      expect(getByText(/Quantity required/)).toBeInTheDocument();
    })
  })
});