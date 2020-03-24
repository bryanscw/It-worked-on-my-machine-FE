import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {logout} from '../../../redux/ducks/auth';

/**
 * This component displays the logout page for user.
 */
export class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <div className="container">
                <h1>You have logged out</h1>
                <p>Thanks for visiting.</p>
                <Link className="btn btn-primary" to="/login">Login</Link>
            </div>
        )
    }
}

export default connect(null,{logout})(Logout);
