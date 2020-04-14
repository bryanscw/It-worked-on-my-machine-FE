import React from 'react';
import { Route } from 'react-router-dom';

import TeachingHomePage from './TeachingHomePage';
import TopicPage from './TopicPage';
import LevelPage from './LevelPage';
import StudentReportsPage from './StudentReportsPage';

const TeachingRouter = [
    <Route
        key="TeachingHomePage"
        path="/"
        exact
        component={TeachingHomePage}
        />,
    <Route
        key="TopicPage"
        path="/topics/:topicId"
        exact
        component={TopicPage}
        />,
    <Route
        key="LevelPage"
        path="/topics/:topicId/levels/:levelId"
        exact
        component={LevelPage}
        />,
    <Route
        key="StudentReportsPage"
        path="/topics/:topicId/levels/:levelId/student-reports"
        exact
        component={StudentReportsPage}
        />,
];

export default TeachingRouter
