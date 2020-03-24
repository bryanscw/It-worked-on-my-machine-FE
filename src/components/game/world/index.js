import React, { Component } from "react";
import Player from "../player";
import Map from "../map";
import { tiles } from "../../../utils/data/maps/1";
import { SPRITE_SIZE } from "../../../utils/constants";
import Popup from "../popup/popup";
/**
 * This component displays the world in the game for the user. It renders the player and map.
 */
class World extends Component {
  constructor(props) {
    super(props);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      tiles: tiles,
      showPopup: false
      // questions: 
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", e => {
      this.handleKeyDown(e);
    });
  }

  hidePopup = () => {
    this.setState({
      showPopup: false
    });
  }

  handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 27:
        this.hidePopup();
        //console.log("SHOWPOPUP: ", this.state.showPopup);
        return;
      default:
        console.log(e.keyCode);
    }
  }

  handleRemoveObstacle = (pos) => {
    var newTiles = this.state.tiles;
    const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
    const x = pos[0] / SPRITE_SIZE;
    newTiles[y][x] = 0;

    this.setState({
      tiles: newTiles,
      showPopup: true
    });
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "640px",
          margin: "20px auto"
        }}
      >
        <Map tiles={this.state.tiles} />
        <Player tiles={this.state.tiles} showPopup={this.state.showPopup} handleRemoveObstacle={this.handleRemoveObstacle} />

        {this.state.showPopup ? (
          <Popup
            //TODO: fetches question according to coordinates
            text="QUIZ QUESTION"
            closePopup={this.hidePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default World;
