import { combineReducers } from 'redux';

import adminReducer from './ducks/admin';
import authReducer from './ducks/auth';
import errorsReducer from './ducks/errors';
import topicsReducer from './ducks/topics';
import levelsReducer from './ducks/levels';
import learningMaterialsReducer from './ducks/learningMaterials';
import questionsReducer from './ducks/questions';

export default combineReducers({
    authReducer,
    adminReducer,
    errorsReducer,
    topicsReducer,
    levelsReducer,
    learningMaterialsReducer,
    questionsReducer,
});