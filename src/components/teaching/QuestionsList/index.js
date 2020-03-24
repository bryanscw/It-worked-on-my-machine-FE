import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import QuestionForm from '../QuestionForm';
import DeleteForm from '../DeleteForm';
import { createQuestion, listQuestions, updateQuestion, deleteQuestion, selectQuestions, selectQuestionsFailed, selectQuestionsLoading } from '../../../redux/ducks/questions';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';

/**
 * This component displays the list of questions for a particular level. Teachers can add, update, and delete questions.
 */
export class QuestionsList extends Component {
    state = {
        modalForm: {
            isVisible: false,
            type: null,
            selectedQuestion: null,
        },
    }

    componentDidMount() {
        const levelId = this.props.levelId
        this.props.listQuestions(levelId);
    }

    openModalForm = (type, selectedQuestion) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedQuestion: selectedQuestion,
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
                selectedQuestion
            },
        } = this.state;

        const {
            levelId
        } = this.props;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Question"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={QuestionForm}
                        initialState={EMPTY}
                        onSubmit={question => this.props.createQuestion(levelId, {...question})}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Question"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={QuestionForm}
                        initialState={selectedQuestion}
                        onSubmit={question => this.props.updateQuestion(levelId, {...question, id: selectedQuestion.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Question"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteQuestion(levelId, selectedQuestion.id)}
                        />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            questionsLoading,
            questionsFailed,
            questions,
            playable,
        } = this.props;

        if (questionsLoading)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();

        return (
            <Fragment>
                {
                    !playable &&
                        <div className="mb-4">
                            <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Question
                            </button>
                        </div>
                }
                <ul className="list-group">
                    {
                        questions.length !== 0 && !questionsFailed
                            ? questions.map((question) => (
                                <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{question.questionText}</span>
                                    {
                                        !playable &&
                                            <div>
                                                <button href="#" className="btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, question)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button href="#" className="btn btn-danger" onClick={() => this.openModalForm(DELETE, question)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                    }
                                </li>
                            ))
                            : <p>No questions found.</p>
                    }
                </ul>
                {modalFormComponent}
            </Fragment>
        )
    }
}

QuestionsList.propTypes = {
    /** A string containing the level ID of the level*/
    levelId: PropTypes.number.isRequired,
    /** A boolean to determine if the questions are still being loaded by the `listQuestions` action creator (true: still loading, false: fully loaded) */
    questionsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the questions failed to be loaded by the `listQuestions` action creator (true: still loading or failed to load, false: successful load) */
    questionsFailed: PropTypes.bool.isRequired,
    /** An array of question objects loaded by the `listQuestions` action creator */
    questions: PropTypes.array,
    /** A boolean to determine if the game is playable or unplayable*/
    playable: PropTypes.bool.isRequired,

    /** An action creator for creating a question*/
    createQuestion: PropTypes.func.isRequired,
    /** An action creator for updating a question*/
    updateQuestion: PropTypes.func.isRequired,
    /** An action creator for deleting a question */
    deleteQuestion: PropTypes.func.isRequired,
    /** An action creator for listing questions */
    listQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    questionsLoading: selectQuestionsLoading(state),
    questionsFailed: selectQuestionsFailed(state),
    questions: selectQuestions(state)
});

const dispatchers = {
    createQuestion,
    listQuestions,
    updateQuestion,
    deleteQuestion
};

export default connect(mapStateToProps, dispatchers)(QuestionsList);
