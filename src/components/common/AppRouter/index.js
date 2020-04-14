import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../utils/constants';
import { refreshTokenLogin, selectUserLoading, selectUserFailed, selectUser, selectRefreshToken } from '../../../redux/ducks/auth';

import Header from '../Header';
import Errors from '../Errors';
import Footer from '../Footer';
import LoginPage from '../../accounts/LoginPage';
import teachingRoutes from '../../teaching/teachingRoutes';
import learningRoutes from '../../learning/learningRoutes';
import accountsRoutes from '../../accounts/accountsRoutes';
import LogoutPage from '../../accounts/LogoutPage';
import NotFoundPage from '../NotFoundPage';
import Loader from '../Loader';

class AppRouter extends Component {
    componentDidMount() {
        const {
            refresh_token,
            refreshTokenLogin
        } = this.props;

        if (refresh_token)
            refreshTokenLogin(refresh_token);
    }
    
    render() {
        const {
            userLoading,
            userFailed,
            user,
            refresh_token
        } = this.props;

        if (userLoading && refresh_token)
            return <Loader />;
        
        let routes = [
            <Route
                key="LoginPage"
                path="/login"
                exact
                component={LoginPage}
                />,
            <Redirect
                key="LoginRedirect"
                from="/"
                exact
                to="/login"
                />,
        ];

        if (!userFailed && user && Object.keys(user).length !== 0 && user.constructor === Object) {
            routes = [
                <Redirect
                    key="LoginRedirect"
                    from="/login"
                    to="/"
                    />
            ]

            switch (user.role) {
                case USER_ROLES.STUDENT:
                    routes = routes.concat(learningRoutes);
                    break;

                case USER_ROLES.TEACHER:
                    routes = routes.concat(teachingRoutes);
                    break;

                case USER_ROLES.ADMIN:
                    routes = routes.concat(accountsRoutes);
                    break;

                default:
                    break;
            }
        }

        return (
            <BrowserRouter>
                <Errors />
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
                        component={LogoutPage}
                        />
                    {routes}
                    <Redirect
                        from="/"
                        to="/not-found"
                        />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

AppRouter.propTypes = {
    refresh_token: PropTypes.string,
    
    userLoading: PropTypes.bool.isRequired,
    userFailed: PropTypes.bool,
    user: PropTypes.object,

    refreshTokenLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userLoading: selectUserLoading(state),
    userFailed: selectUserFailed(state),
    user: selectUser(state),
    refresh_token: selectRefreshToken(state),
});

const dispatchers = {
    refreshTokenLogin,
};

export default connect(mapStateToProps, dispatchers)(AppRouter);