import matchSnapshot from "../../../test-utils/match-snapshot";
import SellProduct from "./index";
import {fireEvent, getByLabelText, render, waitFor} from "@testing-library/react";
import {act} from "react-test-renderer";

describe('Sell products', () => {
  const flushPromises = () => new Promise(setImmediate);

  it('should render', () => {
    matchSnapshot(<SellProduct/>);
  });

  it('should render all products by default', async () => {
    await act(async () => {
      const {getByText} = render(<SellProduct/>)

      await waitFor(() => {
        expect(getByText(/Product 1/)).toBeInTheDocument()
        expect(getByText(/Product 2/)).toBeInTheDocument()
        expect(getByText(/Product 3/)).toBeInTheDocument()
      })
    });
  })

  async function initialise() {
    const container = await render(<SellProduct/>)

    await waitFor(() => {
      expect(container.getByText(/Product 1/)).toBeInTheDocument()
      expect(container.getByText(/Product 2/)).toBeInTheDocument()
      expect(container.getByText(/Product 3/)).toBeInTheDocument()
    })
    return container;
  }

  it('should render searched product', async () => {
    await act(async () => {
      const container = await initialise();

      fireEvent.change(container.getByTestId(/productSearch/), {
        target: {
          value: 'pRODUct 2'
        }
      })

      await waitFor(() => {
        expect(container.queryByText(/Product 1/)).not.toBeInTheDocument()
        expect(container.getByText(/Product 2/)).toBeInTheDocument()
        expect(container.queryByText(/Product 3/)).not.toBeInTheDocument()
      })
    })
  })

  it('should search and add remove products', async () => {
    await act(async () => {
      const container = await initialise();
      fireEvent.change(container.getByTestId(/productSearch/), {
        target: {
          value: 'Product 2'
        }
      })
      await waitFor(() => {
        expect(container.getByText(/Product 2/)).toBeInTheDocument()
      })

      fireEvent.click(container.getByText(/Add/));
      await waitFor(() => {
        expect(container.getByText(/Total: ₹ 6 \/-/)).toBeInTheDocument();
        expect(container.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(container.getByLabelText(/add to shopping cart/));
      await waitFor(() => {
        expect(container.getByText(/Total: ₹ 12 \/-/)).toBeInTheDocument();
        expect(container.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(container.getByLabelText(/remove from shopping cart/));
      await waitFor(() => {
        expect(container.getByText(/Total: ₹ 6 \/-/)).toBeInTheDocument();
        expect(container.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(container.getByLabelText(/remove from shopping cart/));
      await waitFor(() => {
        expect(container.queryByText(/Add/)).toBeInTheDocument();
        expect(container.getByText(/Total: ₹ 0 \/-/)).toBeInTheDocument();
        expect(container.getByText(/Checkout \(0\)/)).toBeInTheDocument();
      });
    });
  })

})