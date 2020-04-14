import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EMPTY } from '../../../utils/constants';

export class BasicForm extends Component {
    emptyState = {
        title: '',
        description: ''
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
            title,
            description
        } = this.state;

        this.props.onSubmit({
            title,
            description
        });

        this.setState(this.emptyState);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {
            title,
            description
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="simpleForm-title">Title</label>
                    <input
                        id="simpleForm-title"
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="simpleForm-description">Description</label>
                    <textarea
                        id="simpleForm-description"
                        className="form-control"
                        name="description"
                        onChange={this.onChange}
                        value={description}
                        />
                </div>
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

BasicForm.propTypes = {
    /** The initial state of the form. If it's 'EMPTY', then the form will be empty. If it's an object, the form will display the form with initial state's content. */
    initialState: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** The function to call when the form is submitted */
    onSubmit: PropTypes.func.isRequired,
};

export default BasicForm