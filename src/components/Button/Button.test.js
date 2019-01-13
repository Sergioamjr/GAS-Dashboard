import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";
import renderer from "react-test-renderer";

describe("<Button />", () => {
  it("should create a snapshot file", () => {
    const button = renderer.create(<Button>Botão Padrão</Button>).toJSON();
    const smallButton = renderer
      .create(<Button small>Botão pequeno</Button>)
      .toJSON();
    const primaryButton = renderer
      .create(<Button type="primary">Botão primário</Button>)
      .toJSON();

    expect(button).toMatchSnapshot();
    expect(smallButton).toMatchSnapshot();
    expect(primaryButton).toMatchSnapshot();
  });

  it("should render Button component", () => {
    shallow(<Button />);
  });

  it("should render a small button", () => {
    const wrapper = shallow(<Button small />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.hasClass("btn-small")).toBeTruthy();
  });

  it("should render a button of type primary", () => {
    const wrapper = shallow(<Button type="primary">Primário</Button>);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.hasClass("btn-primary")).toBeTruthy();
  });
});
