import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../utils/constants';

import Header from '../Header';
import Alert from '../Alert';
import Footer from '../Footer';
import Login from '../../accounts/Login';
import TeachingRouter from '../../teaching/TeachingRouter';
import AccountsRouter from '../../accounts/AccountsRouter';
import LearningRouter from '../../learning/LearningRouter';
import Logout from '../../accounts/Logout';
import NotFoundPage from '../NotFoundPage';

function AppRouter(props) {
    let router = [
        <Route
            key="Login"
            path="/login"
            exact
            component={Login}
            />,
        <Redirect
            key="LoginRedirect"
            from="/"
            exact
            to="/login"
            />,
    ];

    const {
        user
    } = props;

	if (user) {
        switch (user.role) {
            case USER_ROLES.STUDENT:
                router = LearningRouter;
                break;

            case USER_ROLES.TEACHER:
                router = TeachingRouter;
                break;

            case USER_ROLES.ADMIN:
                router = AccountsRouter;
                break;

            default:
                break;
        }
    }

    return (
        <BrowserRouter>
            <Alert />
            <Header />
            <Switch>
                <Route
                    path="/not-found"
                    exact
                    component={NotFoundPage}
                    />
                <Route
                    path="/logout"
                    exact
                    component={Logout}
                    />
                {router}
                <Redirect
                    from="/"
                    to="/not-found"
                    />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps)(AppRouter);