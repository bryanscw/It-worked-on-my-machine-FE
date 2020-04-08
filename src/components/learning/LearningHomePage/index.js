import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import { listTopics, selectTopics, selectTopicsLoading, selectTopicsFailed } from '../../../redux/ducks/topics';
import { selectUser } from '../../../redux/ducks/auth';
import BasicCard from '../../common/BasicCard';

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
                        ? topics.map(topic => 
                            <BasicCard
                                key={topic.id}
                                editable={false}
                                classes="mb-4"
                                details={topic}
                                link={`/topics/${topic.id}`}
                                />
                        )
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
    topicsFailed: PropTypes.bool,
    /** An array of topic objects loaded by the `listTopics` action creaor */
    topics: PropTypes.array.isRequired,
    /** An action creator for listing topics */
    listTopics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: selectUser(state),
    topicsLoading: selectTopicsLoading(state),
    topicsFailed: selectTopicsFailed(state),
    topics: selectTopics(state),
});

const dispatchers = {
    listTopics,
};

export default connect(mapStateToProps, dispatchers)(LearningHomePage);
