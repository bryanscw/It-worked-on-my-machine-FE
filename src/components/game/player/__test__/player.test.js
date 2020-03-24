import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "../../Player";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Player />, div);
});

it("should take a snapshot", () => {
  const { asFragment } = render(<Player />);

  expect(asFragment(<Player />)).toMatchSnapshot();
});
