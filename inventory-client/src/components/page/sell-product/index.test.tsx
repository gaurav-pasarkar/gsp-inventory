import matchSnapshot from "../../../test-utils/match-snapshot";
import SellProduct from "./index";
import {fireEvent, render, waitFor} from "@testing-library/react";
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
    const wrapper = await render(<SellProduct/>)

    await waitFor(() => {
      expect(wrapper.getByText(/Product 1/)).toBeInTheDocument()
      expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
      expect(wrapper.getByText(/Product 3/)).toBeInTheDocument()
    })
    return wrapper;
  }

  it('should render searched product', async () => {
    await act(async () => {
      const wrapper = await initialise();

      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'pRODUct 2'
        }
      })

      await waitFor(() => {
        expect(wrapper.queryByText(/Product 1/)).not.toBeInTheDocument()
        expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
        expect(wrapper.queryByText(/Product 3/)).not.toBeInTheDocument()
      })
    })
  })

  it('should search and add remove products', async () => {
    await act(async () => {
      const wrapper = await initialise();
      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'Product 2'
        }
      })
      await waitFor(() => {
        expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
      })

      fireEvent.click(wrapper.getByText(/Add/));
      await waitFor(() => {
        expect(wrapper.getByText(/Total: ₹ 6 \/-/)).toBeInTheDocument();
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByLabelText(/add to shopping cart/));
      await waitFor(() => {
        expect(wrapper.getByText(/Total: ₹ 12 \/-/)).toBeInTheDocument();
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByLabelText(/remove from shopping cart/));
      await waitFor(() => {
        expect(wrapper.getByText(/Total: ₹ 6 \/-/)).toBeInTheDocument();
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByLabelText(/remove from shopping cart/));
      await waitFor(() => {
        expect(wrapper.queryByText(/Add/)).toBeInTheDocument();
        expect(wrapper.getByText(/Total: ₹ 0 \/-/)).toBeInTheDocument();
        expect(wrapper.getByText(/Checkout \(0\)/)).toBeInTheDocument();
      });
    });
  });

  it('should show checked out products', async () => {
    await act(async () => {
      const wrapper = await initialise();
      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'Product 2'
        }
      })
      await waitFor(() => {
        expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
      })

      fireEvent.click(wrapper.getByText(/Add/));
      await waitFor(() => {
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByText(/Checkout \(1\)/));
      await waitFor(() => {
        expect(wrapper.getByText(/Place order/)).toBeInTheDocument();
      });
      expect(wrapper.getByText(/Product 2/)).toBeInTheDocument();
      expect(wrapper.queryByText(/Product 1/)).not.toBeInTheDocument();
      expect(wrapper.queryByText(/Product 3/)).not.toBeInTheDocument();
      expect((wrapper.getByTestId(/productSearch/) as HTMLInputElement).value).toBe('');
    });
  });

  it('should go back to checkout view when trying to search from place order view', async () => {
    await act(async () => {
      const wrapper = await initialise();
      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'Product 2'
        }
      })
      await waitFor(() => {
        expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
      })

      fireEvent.click(wrapper.getByText(/Add/));
      await waitFor(() => {
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByText(/Checkout \(1\)/));
      await waitFor(() => {
        expect(wrapper.getByText(/Place order/)).toBeInTheDocument();
      });

      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'Product 3'
        }
      });
      await waitFor(() => {
        expect(wrapper.queryByText(/Product 1/)).not.toBeInTheDocument()
        expect(wrapper.queryByText(/Product 2/)).not.toBeInTheDocument()
        expect(wrapper.queryByText(/Product 3/)).toBeInTheDocument()
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      })
    });
  });

  it('should sell products', async () => {
    await act(async () => {
      const wrapper = await initialise();
      fireEvent.change(wrapper.getByTestId(/productSearch/), {
        target: {
          value: 'Product 2'
        }
      })
      await waitFor(() => {
        expect(wrapper.getByText(/Product 2/)).toBeInTheDocument()
      })

      fireEvent.click(wrapper.getByText(/Add/));
      await waitFor(() => {
        expect(wrapper.getByText(/Checkout \(1\)/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByText(/Checkout \(1\)/));
      await waitFor(() => {
        expect(wrapper.getByText(/Place order/)).toBeInTheDocument();
      });

      fireEvent.click(wrapper.getByText(/Place order/));
      await waitFor(() => {
        expect(wrapper.getByText(/Product\(s\) sold successfully./)).toBeInTheDocument();
        expect(wrapper.getByText(/Total: ₹ 0 \/-/)).toBeInTheDocument();
        expect(wrapper.getByText(/Checkout \(0\)/)).toBeInTheDocument();
      })
    });
  });

})