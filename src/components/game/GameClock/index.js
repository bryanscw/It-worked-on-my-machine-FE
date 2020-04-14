import React from "react";
import formatDuration from "format-duration";

import PokemonClock from "./pokemonClock.png";
import "./styles.css";

export default function GameClock(props) {
    const {
        elapsedTime,
        penaltyTime,
    } = props;

    return (
        <div className="clock d-flex align-items-center">
            <img
                src={PokemonClock}
                alt="Pokemon Clock"
                width="20px"
                height="20px"
                className="mr-2"
            />
            <small className="mr-2">
                {formatDuration(elapsedTime)}
            </small>
            <small className="text-danger">
                Penalty: {penaltyTime / 1000}s
            </small>
        </div>
    );
}
