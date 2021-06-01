import React from 'react';
import renderer from 'react-test-renderer';
import SideNav from "./index";
import {render} from "@testing-library/react";

describe('Side Nav', () => {
  const mockOnClick = jest.fn();

  it('renders correctly', () => {
    const tree = renderer
      .create(<SideNav onItemSelect={mockOnClick}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick when item is selected', () =>{
    const { getByText } = render(<SideNav onItemSelect={mockOnClick}/>);

    getByText(/Reports/).click();

    expect(mockOnClick).toHaveBeenCalledWith('reports');
  });
})
