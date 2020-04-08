import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectUser } from '../../../redux/ducks/auth';
/**
 * This component displays the header of the web application.
 */
export class Header extends Component {
    render() {
        const {
            user
        } = this.props;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mazematics</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        { user ? authLinks : guestLinks }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

export default connect(mapStateToProps)(Header);