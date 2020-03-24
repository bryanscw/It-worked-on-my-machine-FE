import React, { Component } from "react";
import World from "../world";
// import ReactPlayer from "react-player";
import Timer from "../GamePage/timer"
/**
 * This component displays the GamePage for user. It contains the world component.
 */
export class GamePage extends Component {
    render() {
        return (
            <div>
            <World />
            <Timer/>
            {/* <ReactPlayer
              width="0%"
              height="0%"
              url="https://www.youtube.com/watch?v=5O3a5opHbY4&t=18s"
              playing
            /> */}
          </div>
        )
    }
}

export default GamePage
