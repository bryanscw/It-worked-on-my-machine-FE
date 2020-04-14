import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EMPTY } from '../../../utils/constants';

export class QuestionForm extends Component {
    emptyState = {
        answer: null,
    }
    state = this.emptyState

    componentDidMount() {
        const {
            initialState
        } = this.props;
        
        if (initialState) {
            if (initialState === EMPTY)
                this.setState(this.emptyState);

            else
                this.setState(initialState);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            initialState
        } = this.props;

        if (initialState && initialState !== prevProps.initialState) {
            if (initialState === EMPTY)
                this.setState(this.emptyState);
                
            else
                this.setState(initialState);
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const {
            answer,
        } = this.state;

        this.props.onSubmit(answer);

        this.setState({
            answer: null
        });
    }

    onChangeAnswer = answer => {
        this.setState({
            answer: answer
        });
    }

    render() {
        const {
            options
        } = this.props;

        const {
            answer,
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <p><strong>Options</strong></p>
                {
                    Object.keys(options).map(key => {
                        let option = options[key];
                        
                        return (
                            <div className="form-check" key={key}>
                                <input
                                    className="form-check-input"
                                    id={`option-${key}`}
                                    type="radio"
                                    name="radio"
                                    onChange={e => this.onChangeAnswer(e.target.checked ? key : null)}
                                    checked={answer === key}
                                    />
                                <label className="form-check-label" htmlFor={`option-${key}`}>{option}</label>
                            </div>
                        )
                    })
                }
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

QuestionForm.propTypes = {
    /** The initial state of the form. If it's 'EMPTY', then the form will be empty. If it's an object, the form will display the form with initial state's content. */
    initialState: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** The function to call when the form is submitted */
    onSubmit: PropTypes.func.isRequired,
}

export default QuestionForm
