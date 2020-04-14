import React, { Component } from "react";

import Player from "../Player";
import Map from "../Map";
import { MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import QuestionModal from "../QuestionModal";
import GameClock from "../GameClock";

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
                questionText: "",
                options: [],
            },
            pos: null,
        },
        nonce: 0,
        timingEvents: [],
        penaltyCount: 0,
    };

    constructor(props) {
        super(props);
        this.poll = setInterval(this.tick, 1000);
    }

    componentDidMount() {
        this.mapRef.focus();
        this.addTimerEvent();
    }

    componentWillUnmount() {
        clearInterval(this.poll);
    }

    tick = () => {
        this.setState({
            nonce: this.state.nonce + 1
        });
    }

    addTimerEvent = isPenalty => {
        // Add a penalty for every incorrect answer
        if (isPenalty) {
            this.setState({
                penaltyCount: this.state.penaltyCount + 1,
            });
        }

        this.setState({
            timingEvents: [...this.state.timingEvents, new Date()],
        });
    }

    getTimings = () => {
        var elapsedTime = 0;
    
        for (var i = 0; i < this.state.timingEvents.length; i += 2) {
            const start = this.state.timingEvents[i];
            const stop = this.state.timingEvents[i + 1] || new Date();
            elapsedTime += stop - start;
        }
    
        var penaltyTime = this.state.penaltyCount * 10000;

        var totalTime = elapsedTime + penaltyTime;
    
        return {
            elapsedTime,
            penaltyTime,
            totalTime,
        };
    }

    handleEncounterObstacle = (pos) => {
        this.addTimerEvent(false); //pause the timer
        const y = pos[1];
        const x = pos[0];

        const question = this.props.questions.find(
            (question) => question.coordinates.x === x && question.coordinates.y === y
        );

        this.setState({
            questionModal: {
                isVisible: true,
                question: question,
                pos: pos,
            },
        });
    };

    handleQuestionModalClose = correctAnswer => {
        this.mapRef.focus();

        this.setState({
            questionModal: {
                ...this.state.questionModal,
                isVisible: false,
            },
        });

        if (correctAnswer) {
            const pos = this.state.questionModal.pos;
            const y = pos[1]; //40 divide 40 = 1 step
            const x = pos[0];
            var newTiles = this.state.tiles;
            newTiles[y][x] = 0;

            this.setState({
                tiles: newTiles,
            });
        }

        this.addTimerEvent(false); //add a time event to resume the timer
    };

    render() {
        const {
            levelId
        } = this.props;

        const {
            questionModal,
        } = this.state;

        const timings = this.getTimings();

        return ( 
            <div
                style={{
                    position: "relative",
                    width: `${MAP_WIDTH * 40}px`,
                    height: `${MAP_HEIGHT * 40}px`,
                    margin: "20px auto",
                }}
            >
                <Map
                    tiles={this.state.tiles}
                    onKeyDown={(e) => this.playerRef.handleKeyDown(e)}
                    ref={(mapRef) => (this.mapRef = mapRef)}
                />
                <Player
                    ref={(playerRef) => (this.playerRef = playerRef)}
                    tiles={this.state.tiles}
                    showPopup={this.state.questionModal.isVisible}
                    handleEncounterObstacle={this.handleEncounterObstacle}
                />
                <GameClock elapsedTime={timings.elapsedTime} penaltyTime={timings.penaltyTime} />
                <QuestionModal
                    question={questionModal.question}
                    isVisible={questionModal.isVisible}
                    onClose={this.handleQuestionModalClose}
                    onIncorrectAnswer={() => this.addTimerEvent(true)}
                    levelId={levelId}
                />
            </div>
        );
    }
}

export default World;
