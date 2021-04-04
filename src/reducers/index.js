import mediaReducer from './mediaReducer';
import termReducer from './termReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    mediaType: mediaReducer,
    termName: termReducer
});

export default allReducers;