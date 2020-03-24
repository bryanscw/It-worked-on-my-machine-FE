import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import { retrieveTopic, selectTopic, selectTopicLoading, selectTopicFailed } from '../../../redux/ducks/topics';
import { listLevels, selectLevelsLoading, selectLevelsFailed, selectPlayableLevels } from '../../../redux/ducks/levels';
/**
 * This component displays the topics page for a student. It contains a list of levels for the topic.
 */
class TopicPage extends Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        this.props.retrieveTopic(topicId);
        this.props.listLevels(topicId);
    }

    render() {
        const {
            topicLoading,
            topicFailed,
            topic,
            levelsLoading,
            levelsFailed,
            levels,
        } = this.props;
        
        if (topicLoading || levelsLoading)
            return <Loader />;

        if (topicFailed || !topic)
            return <Redirect to="/not-found" />;
        
        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to="/">
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Home
                </Link>
                <h1>{topic.title}</h1>
                <p>{topic.description}</p>
                <h2>Levels</h2>
                {
                    levels.length !== 0 && !levelsFailed
                        ? levels.map((level) => (
                            <div href="#" className="card mb-4" key={level.id}>
                                <div className="card-body">
                                    <Link to={`/topics/${topic.id}/levels/${level.id}`}>
                                        <h3 className="card-title">{level.title}</h3>
                                    </Link>
                                    <p className="card-text">{level.description}</p>
                                </div>
                            </div>
                        ))
                        : <p>No levels found.</p>
                }
            </div>
        );
    }
}

TopicPage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
    match: PropTypes.object.isRequired,

    /** A boolean to determine if the topic is still being loaded by the `retrieveTopic` action creator (true: still loading, false: fully loaded) */
    topicLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the topic failed to be loaded by the `retrieveTopic` action creator (true: still loading or failed to load, false: successful load) */
    topicFailed: PropTypes.bool.isRequired,
    /** A topic object loaded by the `retrieveTopic` action creator */
    topic: PropTypes.object,
    /** A boolean to determine if the levels are still being loaded by the `listLevels` action creator (true: still loading, false: fully loaded) */
    levelsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the topics failed to be loaded by the `listLevels` action creator (true: still loading or failed to load, false: successful load) */
    levelsFailed: PropTypes.bool.isRequired,
    /** An array of topic objects loaded by the `listLevels` action creaor */
    levels: PropTypes.array.isRequired,

    /** An action creator for retrieving topic name */
    retrieveTopic: PropTypes.func.isRequired,
    /** An action creator for listing levels */
    listLevels: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    topicLoading: selectTopicLoading(state),
    topicFailed: selectTopicFailed(state),
    topic: selectTopic(state),
    levelsLoading: selectLevelsLoading(state),
    levelsFailed: selectLevelsFailed(state),
    levels: selectPlayableLevels(state),
});

const dispatchers = {
    retrieveTopic,
    listLevels
};

export default connect(mapStateToProps, dispatchers)(TopicPage);