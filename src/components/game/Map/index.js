import React, { Component } from "react";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
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
            style={{
                height: SPRITE_SIZE
            }}
        >
            {props.tiles.map((tile, i) => (
                <MapTile key={i} tile={tile} />
            ))}
        </div>
    );
}

//action
class Map extends Component {
    focus() {
        this.mapRef.focus();
    }

    render() {
        return (
            <div
                style={{
                    position: "relative",
                    top: "0px",
                    left: "0px",
                    width: `${MAP_WIDTH * 40}px`,
                    height: `${MAP_HEIGHT * 40}px`,
                    outline: 0,
                }}
                ref={mapRef => this.mapRef = mapRef}
                onKeyDown={this.props.onKeyDown}
                tabIndex="0"
                id="map"
                >
                {this.props.tiles.map((row, i) => (
                    <MapRow key={i} tiles={row} />
                ))}
            </div>
        );
    }
}

export default Map;
