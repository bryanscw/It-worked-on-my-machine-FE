import React from 'react';
import { Route } from 'react-router-dom';

import AdminTable from '../AdminTable';

const AccountsRouter = [
    <Route
        key="AdminTable"
        path= "/"
        exact
        component={AdminTable}
        />,
];

export default AccountsRouter
