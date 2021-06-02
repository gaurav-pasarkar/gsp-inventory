import renderer from 'react-test-renderer'
import React, { ReactNode } from "react";

const matchSnapshot = (children: ReactNode) => {
  const tree = renderer.create(<>{children}</>).toJSON()
  expect(tree).toMatchSnapshot()
}

export default matchSnapshot;