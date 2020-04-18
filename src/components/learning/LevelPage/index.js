import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import LearningMaterialList from '../../teaching/LearningMaterialList';
import { retrieveLevel, selectPlayableLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';
import { retrieveProgress, selectProgress, selectProgressLoading, selectProgressFailed } from '../../../redux/ducks/progress';

/**
 * This component displays the level page for a student. It contains the LearningMaterialList component and an option to play the level and view leaderboard.
 */
export class LevelPage extends Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.retrieveLevel(topicId, levelId);
        this.props.retrieveProgress(levelId);
    }
    
    render() {
        const {
            levelLoading,
            levelFailed,
            level,
            progressLoading,
            progressFailed,
            progress,
        } = this.props;
        
        if (levelLoading || progressLoading)
            return <Loader />;

        if (levelFailed || progressFailed || !level) {
            return <Redirect to="/not-found" />;
        }
        
        // Display learning materials if there's no existing progress
        const viewedBefore = progress !== null;

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Topic Page
                </Link>
                <h1>{level.title}</h1>
                <p>{level.description}</p>
                <div className="mb-4">
                    <Link className="btn btn-primary" to={`/topics/${level.topic}/levels/${level.id}/leaderboard`}>
                        View Leaderboard
                    </Link>
                </div>
                {
                    viewedBefore
                        ? <div>
                            <button className="btn btn-primary mb-4" type="button" data-toggle="collapse" data-target="#learningMaterialCollapse">
                                View Learning Materials
                            </button>
                            <div className="collapse mb-4" id="learningMaterialCollapse">
                                <h2>Learning Materials</h2>
                                <LearningMaterialList levelId={level.id} editable={false} />
                            </div>
                        </div>
                        : <div className="mb-4">
                            <h2>Learning Materials</h2>
                            <LearningMaterialList levelId={level.id} editable={false} />
                        </div>
                }
                <Link className="btn btn-primary mb-4" to={`/topics/${level.topic}/levels/${level.id}/game`}>
                    Play Game
                </Link>
            </div>
        );
    }
}

LevelPage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
    match: PropTypes.object.isRequired,

    /** A boolean to determine if the level is still being loaded by the `retrieveLevel` action creator (true: still loading, false: fully loaded) */
    levelLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the level failed to be loaded by the `retrieveLevel` action creator (true: still loading or failed to load, false: successful load) */
    levelFailed: PropTypes.bool,
    /** A level object loaded by the `retrieveLevel` action creator */
    level: PropTypes.object,

    /** A boolean to determine if the progress is still being loaded by the `retrieveProgress` action creator (true: still loading, false: fully loaded) */
    progressLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the progress failed to be loaded by the `retrieveProgress` action creator (true: still loading or failed to load, false: successful load) */
    progressFailed: PropTypes.bool,
    /** A progress object loaded by the `retrieveProgress` action creator */
    progress: PropTypes.object,

    /** An action creator for retrieving level name */
    retrieveLevel: PropTypes.func.isRequired,
    /** An action creator for retrieving the progress */
    retrieveProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    levelLoading: selectLevelLoading(state),
    levelFailed: selectLevelFailed(state),
    level: selectPlayableLevel(state),

    progressLoading: selectProgressLoading(state),
    progressFailed: selectProgressFailed(state),
    progress: selectProgress(state),
});

const dispatchers = {
    retrieveLevel,
    retrieveProgress,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);