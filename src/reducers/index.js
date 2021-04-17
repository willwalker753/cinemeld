import mediaReducer from './mediaReducer';
import termReducer from './termReducer';
import accountReducer from './accountReducer';
import showPopupReducer from './showPopupReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    account: accountReducer,
    mediaType: mediaReducer,
    termName: termReducer,
    showPopup: showPopupReducer
});

export default allReducers;