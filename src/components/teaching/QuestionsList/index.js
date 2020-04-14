import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import QuestionForm from '../QuestionForm';
import DeleteForm from '../DeleteForm';
import { createQuestion, listQuestions, updateQuestion, deleteQuestion, selectQuestionsParsed, selectQuestionsFailed, selectQuestionsLoading } from '../../../redux/ducks/questions';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';
import Question from '../Question';

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
            editable,
        } = this.props;

        if (questionsLoading)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();

        return (
            <Fragment>
                {
                    editable &&
                        <div className="mb-4">
                            <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Question
                            </button>
                        </div>
                }
                {
                    questions.length !== 0 && !questionsFailed
                        ? <div className="card-columns">
                            {
                                questions.map(question =>
                                    <Question
                                        editable={editable}
                                        key={question.id}
                                        question={question}
                                        handleUpdate={question => this.openModalForm(UPDATE, question)}
                                        handleDelete={question => this.openModalForm(DELETE, question)}
                                        />
                                )
                            }
                        </div>
                        : <p>No questions found.</p>
                }
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
    questionsFailed: PropTypes.bool,
    /** An array of question objects loaded by the `listQuestions` action creator */
    questions: PropTypes.array,
    /** A boolean to determine if the game is editable or not editable */
    editable: PropTypes.bool.isRequired,

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
    questions: selectQuestionsParsed(state)
});

const dispatchers = {
    createQuestion,
    listQuestions,
    updateQuestion,
    deleteQuestion
};

export default connect(mapStateToProps, dispatchers)(QuestionsList);
