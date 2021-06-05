import matchSnapshot from "../../../test-utils/match-snapshot";
import SellProduct from "./index";
import {render, waitFor} from "@testing-library/react";
import {act} from "react-test-renderer";

describe('Sell products', () => {
  it('should render', () => {
    matchSnapshot(<SellProduct />);
  });

  it('should render Add product by default', async () => {
    await act(async () => {
      const { getAllByText } = render(<SellProduct/>)

      await waitFor(() => {
        expect(getAllByText(/Product Name/).length).toBe(2)
      })
    });
  })
})