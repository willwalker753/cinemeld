const termReducer = (state = '', action) => {
    if(action.type === 'CHANGE_TERM') {
        return state = action.payload;
    }
    else {
        return state;
    }
}

export default termReducer;