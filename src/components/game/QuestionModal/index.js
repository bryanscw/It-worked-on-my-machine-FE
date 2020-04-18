import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QuestionForm } from '../QuestionForm';
import { submitAnswer, selectAnswerResult, selectAnswerResultFailed, selectAnswerResultLoading } from '../../../redux/ducks/progress';
import Modal from '../../common/Modal';
import { EMPTY } from '../../../utils/constants';

export class QuestionModal extends Component {
    handleSubmit = answer => {
        const {
            levelId,
            question,
            submitAnswer,
        } = this.props;
        
        submitAnswer(levelId, question.id, answer);
    }

    render() {
        const {
            question,
            isVisible,
            onClose,
            answerResult,
        } = this.props;

        const isCorrect = (answerResult.question === question.id) ? answerResult.isCorrect : null;

        if (isCorrect === true) {
            return (
                <Modal
                    title="Correct Answer"
                    isVisible={isVisible}
                    onClose={() => onClose(true)}>
                        <button className="btn btn-success" onClick={() => onClose(true)}>Return to Maze</button>
                </Modal>
            )
        }

        return (
            <Modal
                title={question.questionText}
                isVisible={isVisible}
                onClose={() => onClose(false)}>
                    {isCorrect === false && <p className="text-danger">Incorrect Answer</p>}
                    <QuestionForm
                        options={question.options}
                        onSubmit={this.handleSubmit}
                        initialState={isVisible ? EMPTY : null}
                        />
            </Modal>
        )
    }
};

QuestionModal.propTypes = {
    levelId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onIncorrectAnswer: PropTypes.func.isRequired,

    answerResultFailed: PropTypes.bool,
    answerResult: PropTypes.object,

    submitAnswer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    answerResultLoading: selectAnswerResultLoading(state),
    answerResultFailed: selectAnswerResultFailed(state), 
    answerResult: selectAnswerResult(state),
});

const dispatchers = {
    submitAnswer,
};

export default connect(mapStateToProps, dispatchers)(QuestionModal);
