import matchSnapshot from "../../../../test-utils/match-snapshot";
import AddProducts from "./index";
import {getProducts} from "../../../../apis/products";
import {act} from "react-test-renderer";
import {fireEvent, render, waitFor, within, screen, wait} from "@testing-library/react";

describe('Add product to cart', () => {

  it('should render', async () => {
    const availableProducts = await getProducts();
    matchSnapshot(<AddProducts availableProducts={availableProducts}/>)
   });

   it('should render products', async () => {
     const availableProducts = await getProducts();
     await act(async () => {
       const {getByTestId} = render(<AddProducts availableProducts={availableProducts}/>);

       const autocomplete = getByTestId('productName');
       const input = within(autocomplete).getByRole('textbox')
       autocomplete.focus()
       fireEvent.change(input, { target: { value: 'P' } })
       fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
       fireEvent.keyDown(autocomplete, { key: 'Enter' })

       await waitFor(() => {
         expect(within(autocomplete).getByRole('textbox')).toHaveValue('Product 1')
       })
     });
   })
})