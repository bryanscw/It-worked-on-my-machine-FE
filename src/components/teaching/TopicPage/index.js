import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import BasicForm from '../BasicForm';
import DeleteForm from '../DeleteForm';
import { retrieveTopic, selectTopic, selectTopicLoading, selectTopicFailed } from '../../../redux/ducks/topics';
import { createLevel, updateLevel, deleteLevel, listLevels, selectLevelsLoading, selectLevelsFailed, selectLevels } from '../../../redux/ducks/levels';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';
import BasicCard from '../../common/BasicCard';

/**
 * This component displays a topic page for a teacher. It contains a list of levels for the topic. Teachers may add, update, or delete levels.
 */
class TopicPage extends Component {
    state = {
        modalForm: {
            isVisible: false,
            type: null,
            selectedLevel: null,
        },
    }

    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        this.props.retrieveTopic(topicId);
        this.props.listLevels(topicId);
    }

    openModalForm = (type, selectedLevel) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedLevel: selectedLevel,
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
                selectedLevel
            },
        } = this.state;

        const {
            topic
        } = this.props;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={BasicForm}
                        initialState={EMPTY}
                        onSubmit={level => this.props.createLevel(topic.id, level)}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={BasicForm}
                        initialState={selectedLevel}
                        onSubmit={level => this.props.updateLevel(topic.id, {...level, id: selectedLevel.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteLevel(topic.id, selectedLevel.id)}
                        />
                );

            default:
                return null;
        }
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

        const modalFormComponent = this.getModalFormComponent();
        
        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to="/">
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Home
                </Link>
                <h1>{topic.title}</h1>
                <p>{topic.description}</p>
                <h2>Levels</h2>
                <div className="mb-4">
                    <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Level
                    </button>
                </div>
                {
                    levels.length !== 0 && !levelsFailed
                        ? levels.map(level => 
                            <BasicCard
                                key={level.id}
                                editable={true}
                                classes="mb-4"
                                details={level}
                                badge={level.playable ?  <span className="badge badge-success">Playable</span> : <span className="badge badge-secondary">Unplayable</span>}
                                link={`/topics/${topic.id}/levels/${level.id}`}
                                handleUpdate={level => this.openModalForm(UPDATE, level)}
                                handleDelete={level => this.openModalForm(DELETE, level)}
                                />
                        )
                        : <p>No levels found.</p>
                }
                {modalFormComponent}
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
    topicFailed: PropTypes.bool,
    /** A topic object loaded by the `retrieveTopic` action creator */
    topic: PropTypes.object,
    /** A boolean to determine if the levels are still being loaded by the `listLevels` action creator (true: still loading, false: fully loaded) */
    levelsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the topics failed to be loaded by the `listLevels` action creator (true: still loading or failed to load, false: successful load) */
    levelsFailed: PropTypes.bool,
    /** An array of topic objects loaded by the `listLevels` action creaor */
    levels: PropTypes.array.isRequired,

    /** An action creator for retrieving topic name */
    retrieveTopic: PropTypes.func.isRequired,
    /** An action creator for creating a level */
    createLevel: PropTypes.func.isRequired,
    /** An action creator for updating a level */
    updateLevel: PropTypes.func.isRequired,
    /** An action creator for deleting a level */
    deleteLevel: PropTypes.func.isRequired,
    /** An action creator for listing levels */
    listLevels: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    topicLoading: selectTopicLoading(state),
    topicFailed: selectTopicFailed(state),
    topic: selectTopic(state),
    levelsLoading: selectLevelsLoading(state),
    levelsFailed: selectLevelsFailed(state),
    levels: selectLevels(state),
});

const dispatchers = {
    retrieveTopic,
    createLevel,
    updateLevel,
    deleteLevel,
    listLevels
};

export default connect(mapStateToProps, dispatchers)(TopicPage);