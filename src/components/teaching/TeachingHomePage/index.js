import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import SimpleForm from '../SimpleForm';
import DeleteForm from '../DeleteForm';
import { createTopic, updateTopic, deleteTopic, listTopics, selectTopicsLoading, selectTopics, selectTopicFailed } from '../../../redux/ducks/topics';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';

/**
 * This component displays the homepage for a teacher. It contains a welcome greeting and list of topics.
 */
class TeachingHomePage extends Component {
    state = {
        modalForm: {
            isVisible: false,
            type: null,
            selectedTopic: null,
        },
    }

    componentDidMount() {
        this.props.listTopics();
    }

    openModalForm = (type, selectedTopic) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedTopic: selectedTopic,
            }
        });
    }

    handleModalClose = () => {
        this.setState({
            modalForm: {
                ...this.state.modalForm,
                isVisible: false,
            }
        });
    }

    getModalFormComponent = () => {
        const {
            modalForm: {
                isVisible,
                type,
                selectedTopic
            },
        } = this.state;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={EMPTY}
                        onSubmit={this.props.createTopic}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={selectedTopic}
                        onSubmit={topic => this.props.updateTopic({...topic, id: selectedTopic.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteTopic(selectedTopic.id)}
                        />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            topicsLoading,
            topicsFailed,
            topics,
            user
        } = this.props;

        if (topicsLoading)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();
        
        return (
            <div className="container">
                <h1>Welcome {user.name}!</h1>
                <h2>Topics</h2>
                <div className="mb-4">
                    <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Topic
                    </button>
                </div>
                {
                    topics.length !== 0 && !topicsFailed
                        ? topics.map((topic) => (
                            <div href="#" className="card mb-4" key={topic.id}>
                                <div className="card-body">
                                    <Link to={`/topics/${topic.id}`}>
                                        <h3 className="card-title">{topic.title}</h3>
                                    </Link>
                                    <p className="card-text">{topic.description}</p>
                                    <div>
                                        <button className="ml-auto btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, topic)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="ml-auto btn btn-danger" onClick={() => this.openModalForm(DELETE, topic)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>No topics found.</p>
                }
                {modalFormComponent}
            </div>
        );
    }
}

TeachingHomePage.propTypes = {
    /** The currently logged in user */
    user: PropTypes.object.isRequired,

    /** A boolean to determine if the topics are still being loaded by the `listTopics` action creator (true: still loading, false: fully loaded) */
    topicsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the topics failed to be loaded by the `listTopics` action creator (true: still loading or failed to load, false: successful load) */
    topicsFailed: PropTypes.bool.isRequired,
    /** An array of topic objects loaded by the `listTopics` action creaor */
    topics: PropTypes.array.isRequired,

    /** An action creator for creating a topic */
    createTopic: PropTypes.func.isRequired,
    /** An action creator for updating a topic */
    updateTopic: PropTypes.func.isRequired,
    /** An action creator for deleting a topic */
    deleteTopic: PropTypes.func.isRequired,
    /** An action creator for listing topics */
    listTopics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    topicsLoading: selectTopicsLoading(state),
    topicsFailed: selectTopicFailed(state),
    topics: selectTopics(state),
});

const dispatchers = {
    createTopic,
    updateTopic,
    deleteTopic,
    listTopics,
};

export default connect(mapStateToProps, dispatchers)(TeachingHomePage);
