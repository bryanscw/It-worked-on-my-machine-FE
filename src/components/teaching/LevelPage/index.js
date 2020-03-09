import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import QuestionsList from '../QuestionsList';
import { retrieveLevel, selectLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        const levelID = parseInt(props.match.params.levelID);
        props.retrieveLevel(levelID);
    }

    onPublish = () => {
        // TODO: Publish
        console.log("publish");
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
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Topic Page
                </Link>
                <h1>{level.title} {level.isPlayable ?  <span className="badge badge-success">Playable</span> : <span className="badge badge-secondary">Unplayable</span>}</h1>
                <div className="mb-4">
                    {
                        level.isPlayable
                            ? <Link className="btn btn-primary" to={`/levels/${level.id}/student-reports`}>
                                View Student Reports
                            </Link>
                            : <button className="btn btn-primary" onClick={this.onPublish}>
                                Publish Level
                            </button>
                    }
                </div>
                <h2>Learning Material</h2>
                <LearningMaterial levelID={level.id} isPlayable={level.isPlayable} />
                <br />
                <h2>Questions</h2>
                <QuestionsList levelID={level.id} isPlayable={level.isPlayable} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelID = parseInt(ownProps.match.params.levelID);

    return {
        levelLoading: selectLevelLoading(state),
        levelFailed: selectLevelFailed(state),
        level: selectLevel(state, levelID),
    }
};

const dispatchers = {
    retrieveLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);