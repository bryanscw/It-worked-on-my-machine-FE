import React from "react";
import { SPRITE_SIZE } from "../../../utils/constants";
import "./styles.css";

//action
function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";

    case 4:
      return "house";

    case 5:
      return "rock";

    case 6:
      return "tree";

    case 7:
      return "snorlax";

    case 8:
      return "pikachu";

    case 9:
      return "charizard";

    case 10:
      return "bulbasaur";

    case 11:
      return "dratini";

    case 12:
      return "jigglypuff";

    case 13:
      return "mario";

    case 14:
      return "farfetch";

    case 15:
      return "whale";
    default:
      break;
  }
}

//action
function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    >
      {/* {props.tile} */}
    </div>
  );
}

//action
function MapRow(props) {
  return (
    <div
      className={"row"}
      style={{
        height: SPRITE_SIZE
      }}
    >
      {props.tiles.map(tile => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}

//action
function Map(props) {
  console.log(props.tiles);
  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        width: "1200px",
        height: "640px",
        border: "4px solid white"
      }}
    >
      {props.tiles.map(row => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}

export default Map;
