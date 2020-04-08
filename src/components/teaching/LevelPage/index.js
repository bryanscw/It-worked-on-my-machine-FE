import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import LearningMaterialList from '../LearningMaterialList';
import QuestionsList from '../QuestionsList';
import { retrieveLevel, publishLevel, selectLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';

/**
 * This component displays the level page for a teacher. It contains the QuestionsList and LearningMaterialList components.
 */
export class LevelPage extends Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.retrieveLevel(topicId, levelId);
    }

    onPublish = () => {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.publishLevel(topicId, levelId);
    }
    
    render() {
        const {
            levelLoading,
            levelFailed,
            level,
        } = this.props;

        if (levelLoading)
            return <Loader />;

        if (levelFailed || !level)
            return <Redirect to="/not-found" />;
        
        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Topic Page
                </Link>
                <h1>{level.title} {level.playable ?  <span className="badge badge-success">Playable</span> : <span className="badge badge-secondary">Unplayable</span>}</h1>
                <p>{level.description}</p>
                <div className="mb-4">
                    {
                        level.playable
                            ? <Link className="btn btn-primary" to={`/topics/${level.topic}/levels/${level.id}/student-reports`}>
                                View Student Reports
                            </Link>
                            : <button className="btn btn-primary" onClick={this.onPublish}>
                                Publish Level
                            </button>
                    }
                </div>
                <h2>Learning Materials</h2>
                <LearningMaterialList levelId={level.id} editable={!level.playable} />
                <br />
                <h2>Questions</h2>
                <QuestionsList levelId={level.id} editable={!level.playable} />
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

    /** An action creator for retrieving level name */
    retrieveLevel: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    levelLoading: selectLevelLoading(state),
    levelFailed: selectLevelFailed(state),
    level: selectLevel(state),
});

const dispatchers = {
    retrieveLevel,
    publishLevel,
};


export default connect(mapStateToProps, dispatchers)(LevelPage);