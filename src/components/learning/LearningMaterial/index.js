import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import { listLearningMaterials, selectLearningMaterialsLoading, selectLearningMaterial, selectLearningMaterialsFailed } from '../../../redux/ducks/learningMaterials';
import './styles.css';

export class LearningMaterial extends Component {
    constructor(props) {
        super(props);

        props.listLearningMaterials();
    }

    render() {
        const {
            learningMaterialsLoading,
            learningMaterialsFailed,
            learningMaterial
        } = this.props;

        if (learningMaterialsLoading)
            return <Loader />;

        return (
            <Fragment>
                {
                    learningMaterial && !learningMaterialsFailed
                        ? <div className="card">
                            <div className="video-box card-img-top">
                                <div>
                                    <iframe
                                        title="Learning Material Video"
                                        src={learningMaterial.link}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                </div>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{learningMaterial.title}</h3>
                                <p className="card-text">{learningMaterial.description}</p>
                            </div>
                        </div>
                        : <p>No learning material found.</p>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelID = ownProps.level;

    return {
        learningMaterialsLoading: selectLearningMaterialsLoading(state),
        learningMaterialsFailed: selectLearningMaterialsFailed(state),
        learningMaterial: selectLearningMaterial(state, levelID),
    }
};

const dispatchers = {
    listLearningMaterials,
};

export default connect(mapStateToProps, dispatchers)(LearningMaterial);