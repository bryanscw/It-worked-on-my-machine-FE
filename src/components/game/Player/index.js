import React, { Component } from "react";
import walkSprite from "./pokemonPlayer.png";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
// import { PropTypes } from 'prop-types';
/**
 * This component defines the player for the user.
 */
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [1, 1],
            spriteLocation: `0px 0px`,
            direction: "east",
            walkIndex: 0
        };
    }

    getNewPosition(oldPos, direction) {
        switch (direction) {
            case "WEST":
                return [oldPos[0] - 1, oldPos[1]];
            case "EAST":
                return [oldPos[0] + 1, oldPos[1]];
            case "NORTH":
                return [oldPos[0], oldPos[1] - 1];
            case "SOUTH":
                return [oldPos[0], oldPos[1] + 1];
            default:
                break;
        }
    }

    getSpriteLocation(direction, walkIndex) {
        switch (direction) {
            case "EAST":
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;

            case "SOUTH":
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;

            case "WEST":
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;

            case "NORTH":
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
            default:
                break;
        }
    }

    getWalkIndex() {
        const walkIndex = this.state.walkIndex;
        return (walkIndex + 1) % 4;
    }

    //true false function
    observeBoundaries(oldPos, newPos) {
        return (
            newPos[0] >= 0 &&
            newPos[0] <= MAP_WIDTH - 1 &&
            newPos[1] >= 0 &&
            newPos[1] <= MAP_HEIGHT - 1
        );
    }

    observeImpassable(oldPos, newPos) {
        const tiles = this.props.tiles;
        const y = newPos[1];
        const x = newPos[0];
        const nextTile = tiles[y][x];
        return nextTile < 3;
    }

    passThroughImpassable(oldPos, newPos) {
        const tiles = this.props.tiles;
        const y = newPos[1];
        const x = newPos[0];
        const nextTile = tiles[y][x];

        return nextTile < 3 || nextTile > 6;
    }

    isObstacle(newPos) {
        const tiles = this.props.tiles;
        const y = newPos[1];
        const x = newPos[0];
        const nextTile = tiles[y][x];

        return nextTile > 6;
    }

    //dispatch
    dispatchMove(direction, newPos) {
        const walkIndex = this.getWalkIndex();
        this.setState({
            position: newPos,
            direction,
            walkIndex,
            spriteLocation: this.getSpriteLocation(direction, walkIndex)
        });
    }

    changeDirection(direction) {
        const walkIndex = this.getWalkIndex();

        this.setState({
            direction,
            walkIndex,
            spriteLocation: this.getSpriteLocation(direction, walkIndex),
        });
    }

    //remove pokemon after pressing spacebar when beside the pokemon
    removeObstacle() {
        const oldPos = this.state.position;
        const direction = this.state.direction;
        const newPos = this.getNewPosition(oldPos, direction);

        if (this.isObstacle(newPos)) {
            this.props.handleEncounterObstacle(newPos);
        }
    }

    attemptMove(direction) {
        const oldPos = this.state.position;
        const newPos = this.getNewPosition(oldPos, direction);

        //TODO: Don't allow player to move if quiz-in-progress aka props.showPopup is true
        if (this.observeBoundaries(oldPos, newPos) && this.observeImpassable(oldPos, newPos) && !this.props.showPopup)
            this.dispatchMove(direction, newPos);
        else
            this.changeDirection(direction);
    }

    handleKeyDown(e) {
        e.preventDefault();

        switch (e.keyCode) {
            case 37:
                return this.attemptMove("WEST");
            case 38:
                return this.attemptMove("NORTH");
            case 39:
                return this.attemptMove("EAST");
            case 40:
                return this.attemptMove("SOUTH");
            case 32: //spacebar
                return this.removeObstacle();

            default:
                break;
        }
    }

    render() {
        return (
            <div
                style={{
                    position: "absolute",
                    top: this.state.position[1] * SPRITE_SIZE,
                    left: this.state.position[0] * SPRITE_SIZE,
                    backgroundImage: `url('${walkSprite}')`,
                    backgroundPosition: this.state.spriteLocation,
                    width: "40px",
                    height: "40px"
                }}
            />
        );
    }

}

export default Player;
