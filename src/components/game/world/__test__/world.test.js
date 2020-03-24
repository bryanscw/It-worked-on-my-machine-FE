import React from "react";
import Player from "../../player";
import Popup from "../../popup/popup";
import Map from "../../map";
// import { mount } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import World from "../../world";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
// import { configure } from "enzyme";

// configure({ adapter: new Adapter() });

// const Map = {
//   keyup: null
// };
// document.addEventListener = jest.fn((event, cb) => {
//   Map[event] = cb;
// });
// const component = mount(<World />);
// const wrapper = shallow(<World />);
// // simulate event
// Map.keyup({ keyCode: 27 });
// expect(component.hidePopup.toHaveBeenCalled());

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<World />, div);
});

describe("World", () => {
  let props;
  let mountedWorldScreen;
  const WorldScreen = () => {
    if (!mountedWorldScreen) {
      mountedWorldScreen = mount(<World {...props} />);
    }
    return mountedWorldScreen;
  };

  it("always renders a Map", () => {
    expect(WorldScreen().find(Map).length).toBe(1);
  });

  it("always renders a Player", () => {
    expect(WorldScreen().find(Player).length).toBe(1);
  });
  it("does not render a Popup", () => {
    expect(WorldScreen().find(Popup).length).toBe(0);
  });
});
