import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import LearningMaterialForm from '../LearningMaterialForm';
import DeleteForm from '../DeleteForm';
import { createLearningMaterial, listLearningMaterials, updateLearningMaterial, deleteLearningMaterial, selectLearningMaterial, selectLearningMaterialsLoading, selectLearningMaterialsFailed } from '../../../redux/ducks/learningMaterials';
import './styles.css';
import { CREATE, UPDATE, DELETE, EMPTY, YOUTUBE_LINK_PATTERN } from '../../../utils/constants';

export class LearningMaterial extends Component {
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
                        onSubmit={question => this.props.updateLearningMaterial(levelId, {...question, id: selectedLearningMaterial.id})}
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
            learningMaterial,
            playable,
        } = this.props;

        if (learningMaterialsLoading)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();

        return (
            <Fragment>
                {
                    (!learningMaterial && !playable) &&
                        <div className="mb-4">
                            <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Learning Material
                            </button>
                        </div>
                }
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
                                {
                                    !playable &&
                                        <div>
                                            <button href="#" className="btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, learningMaterial)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button href="#" className="btn btn-danger" onClick={() => this.openModalForm(DELETE, learningMaterial)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                        : <p>No learning material found.</p>
                }
                {modalFormComponent}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    learningMaterialsLoading: selectLearningMaterialsLoading(state),
    learningMaterialsFailed: selectLearningMaterialsFailed(state),
    learningMaterial: selectLearningMaterial(state),
});

const dispatchers = {
    createLearningMaterial,
    listLearningMaterials,
    updateLearningMaterial,
    deleteLearningMaterial
};

export default connect(mapStateToProps, dispatchers)(LearningMaterial);
