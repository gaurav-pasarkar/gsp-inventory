import React from 'react';
import renderer from 'react-test-renderer';
import SideNav from "./side-nav";

it('renders correctly', () => {
  const tree = renderer
  .create(<SideNav/>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});