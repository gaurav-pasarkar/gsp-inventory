import matchSnapshot from "../../../test-utils/match-snapshot";
import SellProduct from "./index";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {act} from "react-test-renderer";

describe('Sell products', () => {
  it('should render', () => {
    matchSnapshot(<SellProduct />);
  });

  it('should render all products by default', async () => {
    await act(async () => {
      const { getByText } = render(<SellProduct/>)

      await waitFor(() => {
        expect(getByText(/Product 1/)).toBeInTheDocument()
        expect(getByText(/Product 2/)).toBeInTheDocument()
        expect(getByText(/Product 3/)).toBeInTheDocument()
      })
    });
  })

  it('should render searched product', async () => {
    await act(async () => {
      const {getByTestId, getByText, queryByText} = render(<SellProduct/>)

      await waitFor(() => {
        expect(getByText(/Product 1/)).toBeInTheDocument()
        expect(getByText(/Product 2/)).toBeInTheDocument()
        expect(getByText(/Product 3/)).toBeInTheDocument()
      })

      fireEvent.change(getByTestId(/productSearch/), {
        target: {
          value: 'pRODUct 2'
        }
      })

      await waitFor(() => {
        expect(queryByText(/Product 1/)).not.toBeInTheDocument()
        expect(getByText(/Product 2/)).toBeInTheDocument()
        expect(queryByText(/Product 3/)).not.toBeInTheDocument()
      })
    })
  })

})