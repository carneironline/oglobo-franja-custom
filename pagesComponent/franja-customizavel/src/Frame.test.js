import React from "react"
import { shallow } from "enzyme"
import FranjaCustomizavel from "./Frame"

it("renders without crashing", () => {
  const tree = shallow(<FranjaCustomizavel />)
  expect(tree).toMatchSnapshot()
})