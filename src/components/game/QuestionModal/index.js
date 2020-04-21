import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QuestionForm } from '../QuestionForm';
import { submitAnswer, selectAnswerResult, selectAnswerResultFailed, selectAnswerResultLoading } from '../../../redux/ducks/progress';
import Modal from '../../common/Modal';
import { EMPTY } from '../../../utils/constants';

export class QuestionModal extends Component {
    state = {
        attempts: 0
    };

    handleClose = isCorrect => {
        const penaltyCount = isCorrect ? this.state.attempts - 1 : this.state.attempts;
        this.props.addPenalty(penaltyCount);
        this.props.onClose(isCorrect);

        this.setState({
            attempts: 0
        });
    }

    handleSubmit = answer => {
        const {
            levelId,
            question,
            submitAnswer,
        } = this.props;
        
        submitAnswer(levelId, question.id, answer);

        this.setState({
            attempts: this.state.attempts + 1
        });
    }

    render() {
        const {
            question,
            isVisible,
            answerResult,
        } = this.props;

        const isCorrect = (answerResult.question === question.id) ? answerResult.isCorrect : null;

        if (isCorrect === true) {
            return (
                <Modal
                    title="Correct Answer"
                    isVisible={isVisible}
                    onClose={() => this.handleClose(true)}>
                        <button className="btn btn-success" onClick={() => this.handleClose(true)}>Return to Maze</button>
                </Modal>
            )
        }

        return (
            <Modal
                title={question.questionText}
                isVisible={isVisible}
                onClose={() => this.handleClose(false)}>
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
    addPenalty: PropTypes.func.isRequired,

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
