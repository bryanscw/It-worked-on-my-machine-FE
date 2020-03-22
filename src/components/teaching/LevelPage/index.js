import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import QuestionsList from '../QuestionsList';
import { retrieveLevel, publishLevel, selectLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.retrieveLevel(topicId, levelId);
    }

    onPublish = () => {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.publishLevel(topicId, levelId);
    }
    
    render() {
        const {
            levelLoading,
            levelFailed,
            level,
        } = this.props;

        if (levelLoading)
            return <Loader />;

        if (levelFailed || !level)
            return <Redirect to="/not-found" />;
        
        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic_id}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Topic Page
                </Link>
                <h1>{level.title} {level.playable ?  <span className="badge badge-success">Playable</span> : <span className="badge badge-secondary">Unplayable</span>}</h1>
                <p>{level.description}</p>
                <div className="mb-4">
                    {
                        level.playable
                            ? <Link className="btn btn-primary" to={`/topics/${level.topic_id}/levels/${level.id}/student-reports`}>
                                View Student Reports
                            </Link>
                            : <button className="btn btn-primary" onClick={this.onPublish}>
                                Publish Level
                            </button>
                    }
                </div>
                <h2>Learning Material</h2>
                <LearningMaterial levelId={level.id} playable={level.playable} />
                <br />
                <h2>Questions</h2>
                <QuestionsList levelId={level.id} playable={level.playable} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    levelLoading: selectLevelLoading(state),
    levelFailed: selectLevelFailed(state),
    level: selectLevel(state),
});

const dispatchers = {
    retrieveLevel,
    publishLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);