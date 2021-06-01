import React from 'react';
import {fireEvent, render, waitFor} from "@testing-library/react";
import App from "./app";
import WithTheme from "../test-utils/with-theme";

describe('App', () => {

  it('renders correctly', () => {
    const tree = render(<App />)

    expect(tree).toMatchSnapshot();
  });

  it('should render page content', async () => {
    const mockClick = jest.fn();
    const { getByText, queryAllByText } = render(<WithTheme initialWidth='sm'><App /></WithTheme>);

    fireEvent.click(getByText(/Reports/));

    await waitFor(() => expect(queryAllByText(/Hello: reports/).length).toBe(1))
  })
});
