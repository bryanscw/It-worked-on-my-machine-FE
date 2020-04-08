import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function BasicCard(props) {
    const {
        classes,
        editable,
        details,
        details: {
            title,
            description,
        },
        badge,
        link,
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            <div className="card-body">
                <h3 className="card-title">
                    <Link to={link}>{title}</Link> {badge}
                </h3>
                <p className="card-text">{description}</p>
                {
                    editable &&
                        <div>
                            <button className="ml-auto btn btn-success mr-2" onClick={() => handleUpdate(details)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="ml-auto btn btn-danger" onClick={() => handleDelete(details)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}
