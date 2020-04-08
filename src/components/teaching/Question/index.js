import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Question(props) {
    const {
        classes,
        editable,
        question,
        question: {
            questionText,
            options,
            answer,
        },
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            <h3 className="card-header">{questionText}</h3>
            <ul className="list-group list-group-flush">
                {
                    options.map((option, i) =>
                        <li className="list-group-item" key={i}>
                            {option}&nbsp;
                            {
                                i === answer &&
                                    <FontAwesomeIcon icon={faCheck} className="text-success"/>
                            }
                        </li>
                    )
                }
            </ul>
            {
                editable &&
                    <div className="card-body">
                        <button className="btn btn-success mr-2" onClick={() => handleUpdate(question)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(question)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
            }
        </div>
    )
}
