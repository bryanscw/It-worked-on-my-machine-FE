import React, { Component } from 'react';
import { EMPTY } from '../../../utils/constants';

export class LearningMaterialForm extends Component {
    emptyState = {
        title: '',
        description: '',
        link: '',
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
            description,
            link,
        } = this.state;

        this.props.onSubmit({
            title,
            description,
            link,
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
            description,
            link,
        } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="learningMaterial-title">Title</label>
                    <input
                        id="learningMaterial-title"
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="learningMaterial-description">Description</label>
                    <textarea
                        id="learningMaterial-description"
                        className="form-control"
                        name="description"
                        onChange={this.onChange}
                        value={description}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="learningMaterial-link">Link</label>
                    <p className="small text-secondary">Must be a youtube embeded link (e.g. https://www.youtube.com/embed/AQ7THUKx6Es)</p>
                    <input
                        id="learningMaterial-link"
                        className="form-control"
                        type="text"
                        name="link"
                        onChange={this.onChange}
                        value={link}
                        />
                </div>
                <div className="form-group mt-4">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default LearningMaterialForm
