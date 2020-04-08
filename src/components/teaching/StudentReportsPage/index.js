import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

import { fetchReport, selectReportLoading, selectReportFailed, selectReport } from '../../../redux/ducks/progress';
import Loader from '../../common/Loader';

/**
 * This component displays the students reports for a teacher. It contains a downloadable csv file.
 */
export class StudentReportsPage extends Component {
    componentDidMount() {
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.fetchReport(levelId);
    }

    render() {
        const {
            match,
            reportLoading,
            reportFailed,
            report
        } = this.props;

        if (reportLoading)
            return <Loader />;

        if (reportFailed || !report)
            return <Redirect to="/not-found" />;

        const topicId = parseInt(match.params.topicId);
        const levelId = parseInt(match.params.levelId);

        // Format CsvData
        let csvData = [];

        for (let i = 0; i < report.length; i++) {
            const {
                question: {
                    questionText
                },
                attempts
            } = report[i];

            let csvRow = {
                Question: questionText,
            };

            for (let j = 0; j < attempts.length; j++) {
                const {
                    user: {
                        name
                    },
                    attemptCount
                } = attempts[i];

                csvRow[name] = attemptCount;
            }

            csvData.push(csvRow);
        }

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${topicId}/levels/${levelId}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Level Page
                </Link>
                <h1>Student Reports</h1>
                <div className="mb-4">
                    <CSVLink data={csvData} filename={`student-reports-${levelId}.csv`} className="btn btn-primary">
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
                            !reportFailed && report.length !== 0 && csvData.length !== 0
                                ? csvData.map(row => {
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
                                : <tr>
                                    <td colSpan="2">No results found.</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

StudentReportsPage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
   match: PropTypes.object.isRequired,

   reportLoading: PropTypes.bool.isRequired,
   reportFailed: PropTypes.bool,
   report: PropTypes.array.isRequired,

   fetchReport: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    reportLoading: selectReportLoading(state),
    reportFailed: selectReportFailed(state),
    report: selectReport(state),
});

const dispatchers = {
    fetchReport,
};

export default connect(mapStateToProps, dispatchers)(StudentReportsPage);