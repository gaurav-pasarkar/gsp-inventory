import React from 'react';
import NavBar from "./index";
import {render} from "@testing-library/react";

it('renders correctly', () => {
  const tree = render(<NavBar />)

  expect(tree).toMatchSnapshot();
});