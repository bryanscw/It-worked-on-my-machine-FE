import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import BasicForm from '../BasicForm';
import DeleteForm from '../DeleteForm';
import { createTopic, updateTopic, deleteTopic, listTopics, selectTopicsLoading, selectTopics, selectTopicFailed } from '../../../redux/ducks/topics';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';
import { selectUser } from '../../../redux/ducks/auth';
import BasicCard from '../../common/BasicCard';

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
                        FormComponent={BasicForm}
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
                        FormComponent={BasicForm}
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
                        ? topics.map(topic => (
                            <BasicCard
                                key={topic.id}
                                editable={true}
                                classes="mb-4"
                                details={topic}
                                link={`/topics/${topic.id}`}
                                handleUpdate={topic => this.openModalForm(UPDATE, topic)}
                                handleDelete={topic => this.openModalForm(DELETE, topic)}
                                />
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
    topicsFailed: PropTypes.bool,
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

const mapStateToProps = state => ({
    user: selectUser(state),
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
