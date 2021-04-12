import mediaReducer from './mediaReducer';
import termReducer from './termReducer';
import accountReducer from './accountReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    account: accountReducer,
    mediaType: mediaReducer,
    termName: termReducer
});

export default allReducers;