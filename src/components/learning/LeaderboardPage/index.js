import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

/**
 * This component displays the leaderboard for a level for a student. It is ranked based on completion time for a level.
 */
export class LeaderboardPage extends Component {
    render() {
        const {
            match
        } = this.props;

        const topicId = parseInt(match.params.topicId);
        const levelId = parseInt(match.params.levelId);

        let leaderboardData = [
            {
                "name": "Bob",
                "timing": 10.2
            },
            {
                "name": "Joe",
                "timing": 11.2
            },
            {
                "name": "Caleb",
                "timing": 12.1
            },
            {
                "name": "Cathy",
                "timing": 13.1231
            },
            {
                "name": "Sarah",
                "timing": 14.321
            },
            {
                "name": "May",
                "timing": 15.123
            },
            {
                "name": "Harry",
                "timing": 16.143
            },
            {
                "name": "Matthew",
                "timing": 17.341
            },
            {
                "name": "Clyde",
                "timing": 19.241
            },
            {
                "name": "Elizabeth",
                "timing": 21.2321
            }
        ]

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${topicId}/levels/${levelId}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Level Page
                </Link>
                <h1>Leaderboard</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Timing (in minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboardData.map(row =>
                                <tr key={row.name}>
                                    <th scope="row">{row.name}</th>
                                    <td>{row.timing.toFixed(2)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

LeaderboardPage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
   match: PropTypes.object.isRequired,
};

export default LeaderboardPage
