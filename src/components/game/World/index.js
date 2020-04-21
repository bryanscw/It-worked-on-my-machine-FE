import React, { Component } from "react";
import { connect } from 'react-redux'

import Player from "../Player";
import Map from "../Map";
import { MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import QuestionModal from "../QuestionModal";
import GameClock from "../GameClock";
import { updateProgress, createOrResetProgress } from "../../../redux/ducks/progress";

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
        position: [1, 1],
    };

    constructor(props) {
        super(props);
        this.poll = setInterval(this.tick, 1000);
    }

    componentDidMount() {
        const {
            createOrResetProgress,
            levelId
        } = this.props;
        
        const progress = this.getCurrentProgress(false);
        createOrResetProgress(levelId, progress);
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

    addPenalty = penaltyCount =>  {
        // Add a penalty for every incorrect answer
        this.setState({
            penaltyCount: this.state.penaltyCount + penaltyCount,
        });
    }

    addTimerEvent = () => {
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

    handleChangePosition = position => {
        this.setState({
            position: position,
        });
    }

    handleEncounterObstacle = pos => {
        this.addTimerEvent(); //pause the timer
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

    handleCompleteGame = () => {
        const {
            updateProgress,
            levelId
        } = this.props;
        const progress = this.getCurrentProgress(true);
        updateProgress(levelId, progress);

        this.props.onCompleteGame();
    }

    handleQuestionModalClose = correctAnswer => {
        this.setState({
            questionModal: {
                ...this.state.questionModal,
                isVisible: false,
            },
        });

        this.mapRef.focus();

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

        // Resume the timer
        this.addTimerEvent();
    };

    getCurrentProgress(isComplete) {
        return {
            position: {
                "x": this.state.position[0],
                "y": this.state.position[1],
            },
            timeTaken: this.getTimings().totalTime,
            complete: isComplete,
        };
    };

    render() {
        const {
            levelId
        } = this.props;

        const {
            tiles,
            questionModal,
            position,
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
                    tiles={tiles}
                    onKeyDown={e => this.playerRef.handleKeyDown(e)}
                    ref={mapRef => this.mapRef = mapRef}
                />
                <Player
                    ref={playerRef => this.playerRef = playerRef}
                    tiles={tiles}
                    showPopup={questionModal.isVisible}
                    onEncounterObstacle={this.handleEncounterObstacle}
                    onChangePosition={this.handleChangePosition}
                    onCompleteGame={this.handleCompleteGame}
                    position={position}
                />
                <GameClock elapsedTime={timings.elapsedTime} penaltyTime={timings.penaltyTime} />
                <QuestionModal
                    question={questionModal.question}
                    isVisible={questionModal.isVisible}
                    onClose={this.handleQuestionModalClose}
                    addPenalty={this.addPenalty}
                    levelId={levelId}
                />
            </div>
        );
    }
}

const dispatchers = {
    createOrResetProgress,
    updateProgress,
};

export default connect(() => ({}), dispatchers)(World);