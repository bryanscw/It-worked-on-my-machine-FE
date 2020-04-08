import React, { Component } from 'react';
import { EMPTY } from '../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export class QuestionForm extends Component {
    emptyState = {
        questionText: '',
        options: [],
        answer: null,
    };
    state = this.emptyState;

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
            questionText,
            options,
            answer,
        } = this.state;

        this.props.onSubmit({
            questionText,
            options,
            answer,
        });

        this.setState(this.emptyState);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeOption = (selectedIndex, value) => {
        this.setState({
            options: this.state.options.map((option, i) => i === selectedIndex ? value : option),
        });
    }

    onChangeAnswer = answer => {
        this.setState({
            answer: answer
        });
    }

    onCreateOption = () => {
        this.setState({
            options: [...this.state.options, ""]
        });
    }

    onDeleteOption = selectedIndex => {
        let answer = this.state.answer;

        if (selectedIndex < answer) {
            answer--;
        } else if (selectedIndex === answer) {
            answer = null;
        }

        this.setState({
            options: this.state.options.filter((option, i) => i !== selectedIndex),
            answer: answer,
        });
    }

    render() {
        const {
            questionText,
            options,
            answer,
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Question Text</label>
                    <input
                        className="form-control"
                        type="text"
                        name="questionText"
                        onChange={this.onChange}
                        value={questionText}
                        />
                </div>
                <p><strong>Options (Select the Correct Option)</strong></p>
                {
                    options.map((option, i) => 
                        <div className="form-group d-flex" key={i}>
                            <div className="form-check mr-1">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="radio"
                                    onChange={e => this.onChangeAnswer(e.target.checked ? i : null)}
                                    checked={answer === parseInt(i)}
                                    />
                            </div>
                            <input
                                className="form-control w-100 mr-2"
                                type="text"
                                name="option"
                                onChange={e => this.onChangeOption(i, e.target.value)}
                                value={option}
                                />
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => this.onDeleteOption(i)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    )
                }
                <button className="btn btn-primary" type="button" onClick={() => this.onCreateOption()}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />Add Option
                </button>
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default QuestionForm
