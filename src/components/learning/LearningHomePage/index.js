import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import { listTopics, selectTopics, selectTopicsLoading, selectTopicsFailed } from '../../../redux/ducks/topics';
/**
 * This component displays the learning home page for a student. It contains a list of study topics to choose from
 */
class LearningHomePage extends Component {
    componentDidMount() {
        this.props.listTopics();
    }

    render() {
        const {
            topicsLoading,
            topicsFailed,
            topics,
            user
        } = this.props;

        if (topicsLoading)
            return <Loader />
        
        return (
            <div className="container">
                <h1>Welcome {user.name}!</h1>
                <h2>Topics</h2>
                {
                    topics.length !== 0 && !topicsFailed
                        ? topics.map((topic) => (
                            <div href="#" className="card mb-4" key={topic.id}>
                                <div className="card-body">
                                    <Link to={`/topics/${topic.id}`}>
                                        <h3 className="card-title">{topic.title}</h3>
                                    </Link>
                                    <p className="card-text">{topic.description}</p>
                                </div>
                            </div>
                        ))
                        : <p>No topics found.</p>
                }
            </div>
        );
    }
}

LearningHomePage.propTypes = {
    /** The currently logged in user */
    user: PropTypes.object.isRequired,

    /** A boolean to determine if the topics are still being loaded by the `listTopics` action creator (true: still loading, false: fully loaded) */
    topicsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the topics failed to be loaded by the `listTopics` action creator (true: still loading or failed to load, false: successful load) */
    topicsFailed: PropTypes.bool.isRequired,
    /** An array of topic objects loaded by the `listTopics` action creaor */
    topics: PropTypes.array.isRequired,
    /** An action creator for listing topics */
    listTopics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.authReducer.user,
    topicsLoading: selectTopicsLoading(state),
    topicsFailed: selectTopicsFailed(state),
    topics: selectTopics(state),
});

const dispatchers = {
    listTopics,
};

export default connect(mapStateToProps, dispatchers)(LearningHomePage);
