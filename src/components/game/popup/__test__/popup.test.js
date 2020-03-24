import React, { Component } from "react";
import ReactDOM from "react-dom";
import Popup from "../popup";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
// import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Popup text="Popup text" closePopup={() => {}} ></Popup>, div);
});

it("should be enabled", () => {
  const { getByTestId } = render(<Popup text="Popup text" closePopup={() => {}}  />);
  expect(getByTestId("BUTTON")).not.toHaveAttribute("disabled");
});

it("should take a snapshot", () => {
  const { asFragment } = render(<Popup text="Popup text" closePopup={() => {}}  />);

  expect(asFragment()).toMatchSnapshot();
});
