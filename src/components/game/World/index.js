import React, { Component } from "react";

import Player from "../Player";
import Map from "../Map";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import QuestionModal from "../QuestionModal";

/**
 * This component displays the world in the game for the user. It renders the player and map.
 */
class World extends Component {
    state = {
        tiles: this.props.tiles,
        questionModal: {
            isVisible: false,
            question: {
                id: null,
                questionText: '',
                options: [],
            },
            pos: null,
        },
    }

    componentDidMount() {
        this.mapRef.focus();
    }

    handleEncounterObstacle = (pos) => {
        const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
        const x = pos[0] / SPRITE_SIZE;

        const question = this.props.questions.find(question => question.coordinates.x === x && question.coordinates.y === y);

        this.setState({
            questionModal: {
                isVisible: true,
                question: question,
                pos: pos,
            },
        });
    }

    handleQuestionModalClose = correctAnswer => {
        this.mapRef.focus();

        this.setState({
            questionModal: {
                ...this.state.questionModal,
                isVisible: false,
            }
        });

        if (correctAnswer) {
            const pos = this.state.questionModal.pos;
            const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
            const x = pos[0] / SPRITE_SIZE;
            var newTiles = this.state.tiles;
            newTiles[y][x] = 0;

            this.setState({
                tiles: newTiles,
            });
        }
    }

    render() {
        const {
            levelId,
        } = this.props;

        const {
            questionModal,
        } = this.state;

        return (
            <div
                style={{
                    position: "relative",
                    width: `${MAP_WIDTH * 40}px`,
                    height: `${MAP_HEIGHT * 40}px`,
                    margin: "20px auto",
                }}
                >
                <Map tiles={this.state.tiles} onKeyDown={e => this.playerRef.handleKeyDown(e)} ref={mapRef => this.mapRef = mapRef} />
                <Player ref={playerRef => this.playerRef = playerRef} tiles={this.state.tiles} showPopup={this.state.questionModal.isVisible} handleEncounterObstacle={this.handleEncounterObstacle} />
                <QuestionModal
                    question={questionModal.question}
                    isVisible={questionModal.isVisible}
                    onClose={this.handleQuestionModalClose}
                    levelId={levelId}
                    />
            </div>
        );
    }
}

export default World;
