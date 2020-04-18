import React from "react";
import ReactDOM from "react-dom";
import Player from "./index.js";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Player position={[1, 1]} />, div);
});

it("should take a snapshot", () => {
    const { asFragment } = render(<Player position={[1, 1]} />);
    expect(asFragment()).toMatchSnapshot();
});
