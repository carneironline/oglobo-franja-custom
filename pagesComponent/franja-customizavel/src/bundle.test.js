import bundle from "./bundle"
import FranjaCustomizavel from "./Frame"

describe("bundle", () => {

  it("should have a name", () => {
    expect(bundle.name).toEqual("Franja Customizável")
  })

  it("should have a type", () => {
    expect(bundle.type).toEqual("franja-customizavel")
  })

  it("should have a component", () => {
    expect(bundle.component).toEqual(FranjaCustomizavel)
  })

})