import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export class StudentReportsPage extends Component {
    render() {
        const {
            match
        } = this.props;

        const levelID = parseInt(match.params.levelID);

        let csvData = [
            {
                "Question": "1 + 2",
                "Bob": 2,
                "Joe": 3,
                "Kristen": 3,
            },
            {
                "Question": "1 + 3",
                "Bob": 1,
                "Joe": 3,
                "Kristen": 3,
            }
        ]

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/levels/${levelID}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Level Page
                </Link>
                <h1>Student Reports</h1>
                <div className="mb-4">
                    <CSVLink data={csvData} filename={`student-reports-${levelID}.csv`} className="btn btn-primary">
                        Download CSV
                    </CSVLink>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Question</th>
                            <th scope="col">Average Attempts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            csvData.map(row => {
                                let question = row["Question"]

                                let sum = 0;
                                let counter = 0;

                                for (let key in row) {
                                    if (key !== "Question") {
                                        sum += row[key];
                                        counter++;
                                    }
                                }

                                return (
                                    <tr key={question}>
                                        <th scope="row">{question}</th>
                                        <td>{(sum / counter).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default StudentReportsPage