import React from "react";
import Player from "../Player";
import Popup from "../Popup";
import Map from "../Map";
import { tiles } from "../../../utils/data/maps/1";
// import { mount } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import World from "./index.js";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../../utils/tests";
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

it('renders without crashing', async () => {
    renderWithRedux(<World tiles={tiles} question={[]} levelId={1} />);
})

// describe("World", () => {
//     let props;
//     let mountedWorldScreen;
//     const WorldScreen = () => {
//         if (!mountedWorldScreen) {
//             mountedWorldScreen = mount(<World {...props} />);
//         }
//         return mountedWorldScreen;
//     };

//     it("always renders a Map", () => {
//         expect(WorldScreen().find(Map).length).toBe(1);
//     });

//     it("always renders a Player", () => {
//         expect(WorldScreen().find(Player).length).toBe(1);
//     });
//     it("does not render a Popup", () => {
//         expect(WorldScreen().find(Popup).length).toBe(0);
//     });
// });
