import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import LearningMaterialForm from '../LearningMaterialForm';
import DeleteForm from '../DeleteForm';
import { createLearningMaterial, listLearningMaterials, updateLearningMaterial, deleteLearningMaterial, selectLearningMaterials, selectLearningMaterialsLoading, selectLearningMaterialsFailed } from '../../../redux/ducks/learningMaterials';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';
import LearningMaterial from '../LearningMaterial';

/**
 * This component displays the learning materials in the level for a teacher. Teachers can add, update, and delete learning materials.
 */
export class LearningMaterialList extends Component {
    state = {
        modalForm: {
            isVisible: false,
            type: null,
            selectedLearningMaterial: null,
        },
    }

    componentDidMount() {
        const levelId = this.props.levelId;
        this.props.listLearningMaterials(levelId);
    }

    openModalForm = (type, selectedLearningMaterial) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedLearningMaterial: selectedLearningMaterial,
            }
        });
    }

    handleModalClose = () => {
        this.setState({
            modalForm: {
                ...this.state.modalForm,
                isVisible: false,
            }
        });
    }

    getModalFormComponent = () => {
        const {
            modalForm: {
                isVisible,
                type,
                selectedLearningMaterial
            },
        } = this.state;

        const {
            levelId
        } = this.props;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={LearningMaterialForm}
                        initialState={EMPTY}
                        onSubmit={question => this.props.createLearningMaterial(levelId, question)}
                    />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={LearningMaterialForm}
                        initialState={selectedLearningMaterial}
                        onSubmit={question => this.props.updateLearningMaterial(levelId, { ...question, id: selectedLearningMaterial.id })}
                    />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteLearningMaterial(levelId, selectedLearningMaterial.id)}
                    />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            learningMaterialsLoading,
            learningMaterialsFailed,
            learningMaterials,
            editable,
        } = this.props;

        if (learningMaterialsLoading)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();
        
        return (
            <>
                {
                    editable &&
                    <div className="mb-4">
                        <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Learning Material
                            </button>
                    </div>
                }
                
                {
                    learningMaterials.length !== 0 && !learningMaterialsFailed
                        ? <div className="row">
                            {
                                learningMaterials.map(learningMaterial => 
                                    <div className="col-lg-6 mb-4" key={learningMaterial.id}>
                                        <LearningMaterial
                                            editable={editable}
                                            classes="h-100"
                                            learningMaterial={learningMaterial}
                                            handleUpdate={learningMaterial => this.openModalForm(UPDATE, learningMaterial)}
                                            handleDelete={learningMaterial => this.openModalForm(DELETE, learningMaterial)}
                                            />
                                    </div>
                                )
                            }
                        </div>
                        : <p>No learning materials found.</p>
                }
                {editable && modalFormComponent}
            </>
        )
    }
}
LearningMaterialList.propTypes = {
    /** A string containing the level ID of the level*/
    levelId: PropTypes.number.isRequired,

    /** A boolean to determine if the learning materials are still being loaded by the `listLearningMaterials` action creator (true: still loading, false: fully loaded) */
    learningMaterialsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the learning materials failed to be loaded by the `listLearningMaterials` action creator (true: still loading or failed to load, false: successful load) */
    learningMaterialsFailed: PropTypes.bool,
    /** An array of learning material objects loaded by the `listLearningMaterials` action creator */
    learningMaterials: PropTypes.array,
    /** A boolean to determine if the game is editable or not editable */
    editable: PropTypes.bool.isRequired,

    /** An action creator for creating learning materials*/
    createLearningMaterial: PropTypes.func.isRequired,
    /** An action creator for updating learning materials */
    updateLearningMaterial: PropTypes.func.isRequired,
    /** An action creator for deleting learning materials */
    deleteLearningMaterial: PropTypes.func.isRequired,
    /** An action creator for listing learning materials */
    listLearningMaterials: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    learningMaterialsLoading: selectLearningMaterialsLoading(state),
    learningMaterialsFailed: selectLearningMaterialsFailed(state),
    learningMaterials: selectLearningMaterials(state),
});

const dispatchers = {
    createLearningMaterial,
    listLearningMaterials,
    updateLearningMaterial,
    deleteLearningMaterial
};

export default connect(mapStateToProps, dispatchers)(LearningMaterialList);
