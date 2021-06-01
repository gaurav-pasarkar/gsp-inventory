import React from 'react';
import NavBar from "./index";
import {fireEvent, render, waitFor} from "@testing-library/react";
import WithTheme from "../../test-utils/with-theme";
import App from "../app";

describe('Nav bar', () => {

  it('renders correctly', () => {
    const mockOnClick = jest.fn();
    const tree = render(<NavBar onSideMenuSelect={mockOnClick}/>)

    expect(tree).toMatchSnapshot();
  });

  it('should not close side nav on desktop when item is selected', async () => {
    const mockClick = jest.fn();
    const {getByText, getByTestId} = render(
        <WithTheme initialWidth='sm'>
          <NavBar onSideMenuSelect={mockClick}/>
        </WithTheme>
    );

    fireEvent.click(getByText(/Reports/));

    await waitFor(() => {
      expect(mockClick).toHaveBeenCalledWith('reports');
      expect(getByTestId(/desktop_drawer/)).toBeInTheDocument()
    })
  })
});
