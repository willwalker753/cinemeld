import mediaReducer from './mediaReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    mediaType: mediaReducer
});

export default allReducers;