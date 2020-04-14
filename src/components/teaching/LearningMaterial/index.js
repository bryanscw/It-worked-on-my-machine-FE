import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import { YOUTUBE_LINK_PATTERN } from '../../../utils/constants';

export default function LearningMaterial(props) {
    const {
        classes,
        editable,
        learningMaterial,
        learningMaterial: {
            title,
            description,
            link,
        },
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            {
                YOUTUBE_LINK_PATTERN.test(link) &&
                <div className="video-box card-img-top">
                    <div>
                        <iframe
                            title="Learning Material Video"
                            src={link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                    </div>
                </div>
            }
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>
                {
                    editable &&
                    <div>
                        <button className="btn btn-success mr-2" onClick={() => handleUpdate(learningMaterial)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(learningMaterial)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

LearningMaterial.propTypes = {
    classes: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    learningMaterial: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
};