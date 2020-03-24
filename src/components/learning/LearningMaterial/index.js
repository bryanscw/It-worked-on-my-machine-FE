import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import { listLearningMaterials, selectLearningMaterialsLoading, selectLearningMaterial, selectLearningMaterialsFailed } from '../../../redux/ducks/learningMaterials';
import './styles.css';
import { YOUTUBE_LINK_PATTERN } from '../../../utils/constants';

/**
 * This component displays the learning materials in the level for a student.
 */
export class LearningMaterial extends Component {
    componentDidMount() {
        const levelId = this.props.levelId;
        this.props.listLearningMaterials(levelId);
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
                            {
                                YOUTUBE_LINK_PATTERN.test(learningMaterial.link) &&
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
                            }
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
LearningMaterial.propTypes = {
    /** A string containing the level ID of the level*/
    levelId: PropTypes.number.isRequired,
    /** A boolean to determine if the learning materials are still being loaded by the `listLearningMaterials` action creator (true: still loading, false: fully loaded) */
    learningMaterialsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the learning materials failed to be loaded by the `listLearningMaterials` action creator (true: still loading or failed to load, false: successful load) */
    learningMaterialsFailed: PropTypes.bool.isRequired,
    /** An array of learning material objects loaded by the `listLearningMaterials` action creator */
    learningMaterial: PropTypes.object,

    /** An action creator for listing learning materials */
    listLearningMaterials: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    learningMaterialsLoading: selectLearningMaterialsLoading(state),
    learningMaterialsFailed: selectLearningMaterialsFailed(state),
    learningMaterial: selectLearningMaterial(state),  
});

const dispatchers = {
    listLearningMaterials,
};

export default connect(mapStateToProps, dispatchers)(LearningMaterial);
