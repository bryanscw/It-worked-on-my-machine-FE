import React from 'react';
import { Route } from 'react-router-dom';

import AdminPage from './AdminPage';

const AccountsRouter = [
    <Route
        key="AdminPage"
        path= "/"
        exact
        component={AdminPage}
        />,
];

export default AccountsRouter
