import React, { Component } from 'react';
import { connect } from 'react-redux';

import { QuestionForm } from '../QuestionForm';
import { submitAnswer, selectAnswerResult, selectAnswerResultFailed, selectAnswerResultLoading } from '../../../redux/ducks/progress';
import Modal from '../../common/Modal';
import { EMPTY } from '../../../utils/constants';

export class QuestionModal extends Component {
    state = {
        incorrectAnswer: false,
    }

    handleSubmit = answer => {
        const {
            levelId,
            question,
            submitAnswer,
            answerResult,
            answerResultFailed,
            onClose,
        } = this.props;

        submitAnswer(levelId, question.id, answer)
            .then(() => {
                if (!answerResultFailed && answerResult !== undefined && answerResult !== null) {
                    if (answerResult) {
                        onClose(true);
                    } else {
                        this.setState({
                            incorrectAnswer: true,
                        });
                    }
                }
            })
    }

    render() {
        const {
            question,
            isVisible,
            onClose,
        } = this.props;

        const {
            incorrectAnswer
        } = this.state;

        return (
            <Modal
                title={question.questionText}
                isVisible={isVisible}
                onClose={() => onClose(false)}>
                    {incorrectAnswer && <p>Incorrect Answer</p>}
                    <QuestionForm
                        options={question.options}
                        onSubmit={this.handleSubmit}
                        initialState={isVisible ? EMPTY : null}
                        />
            </Modal>
        )
    }
};

const mapStateToProps = state => ({
    answerResultLoading: selectAnswerResultLoading(state),
    answerResultFailed: selectAnswerResultFailed(state), 
    answerResult: selectAnswerResult(state),
});

const dispatchers = {
    submitAnswer,
};

export default connect(mapStateToProps, dispatchers)(QuestionModal);
