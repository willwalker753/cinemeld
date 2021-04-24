import mediaReducer from './mediaReducer';
import termReducer from './termReducer';
import accountReducer from './accountReducer';
import showPopupReducer from './showPopupReducer';
import similarReducer from './similarReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    account: accountReducer,
    mediaType: mediaReducer,
    termName: termReducer,
    showPopup: showPopupReducer,
    similar: similarReducer
});

export default allReducers;