import React from 'react';
import { Route } from 'react-router-dom';

import LearningHomePage from '../LearningHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import LeaderboardPage from '../LeaderboardPage';
import GamePage from '../../game/GamePage';

const LearningRouter = [
    <Route
        key="LearningHomePage"
        path="/"
        exact
        component={LearningHomePage}
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
        key="LeaderboardPage"
        path="/topics/:topicId/levels/:levelId/leaderboard"
        exact
        component={LeaderboardPage}
        />,
    <Route
        key="GamePage"
        path="/topics/:topicId/levels/:levelId/game"
        exact
        component={GamePage}
        />,
];

export default LearningRouter
