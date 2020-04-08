import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import usersReducer from './ducks/users';
import errorsReducer from './ducks/errors';
import topicsReducer from './ducks/topics';
import levelsReducer from './ducks/levels';
import learningMaterialsReducer from './ducks/learningMaterials';
import progressReducer from './ducks/progress';
import questionsReducer from './ducks/questions';

export default combineReducers({
    authReducer,
    usersReducer,
    errorsReducer,
    topicsReducer,
    levelsReducer,
    learningMaterialsReducer,
    progressReducer,
    questionsReducer,
});