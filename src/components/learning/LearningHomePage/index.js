import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import { listTopics, selectTopics, selectTopicsLoading, selectTopicsFailed } from '../../../redux/ducks/topics';

class LearningHomePage extends Component {
    constructor(props) {
        super(props);

        props.listTopics();
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
    match: PropTypes.object.isRequired,

    user: PropTypes.object.isRequired,
    topicsLoading: PropTypes.bool.isRequired,
    topicsFailed: PropTypes.bool.isRequired,
    topics: PropTypes.array.isRequired,

    listTopics: PropTypes.func.isRequired,
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
